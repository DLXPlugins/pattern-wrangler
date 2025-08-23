/* eslint-disable react/no-unknown-property */
import {
	useState,
	useMemo,
	useEffect,
	useRef,
	Suspense,
} from '@wordpress/element';
import { useResizeObserver, useRefEffect } from '@wordpress/compose';
import { downloadBlob } from '@wordpress/blob';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';
import { escapeAttribute } from '@wordpress/escape-html';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useQuery } from '@tanstack/react-query';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews';
import apiFetch from '@wordpress/api-fetch';
import { useAsyncResource } from 'use-async-resource';
import { useRouter } from '@tanstack/react-router';
import { addQueryArgs, getQueryArgs, safeDecodeURI, removeQueryArgs, cleanForSlug } from '@wordpress/url';
import { dispatch, select, useDispatch } from '@wordpress/data';
import PatternsViewStore from '../store';
import ErrorBoundary from '../../../components/ErrorBoundary';
import Snackbar from './Snackbar';

// Enhanced iframe component that works with the existing PHP scaling system.
const ResponsiveIframe = ( { src, title, item } ) => {
	const iframeRef = useRef( null );
	const containerRef = useRef( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ scale, setScale ] = useState( 1 );
	const [ iframeWidth, setIframeWidth ] = useState( 0 );
	const [ iframeHeight, setIframeHeight ] = useState( 0 );
	const [ iframeMinHeight, setIframeMinHeight ] = useState( 0 );
	const [ aspectRatio, setAspectRatio ] = useState( 1 );

	// Handle iframe load and setup communication with PHP scaling system.
	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		const handleLoad = () => {
			setIsLoaded( true );
			setIframeWidth( item.viewportWidth || iframe.offsetWidth );
			setIframeHeight( iframe.offsetHeight );

			// The PHP template will handle scaling automatically.
			// We just need to ensure the container is ready for the scaling calculations.
		};

		iframe.addEventListener( 'load', handleLoad );

		return () => {
			iframe.removeEventListener( 'load', handleLoad );
		};
	}, [ src ] );

	// Use ResizeObserver to detect container size changes and trigger PHP scaling recalculation.
	const [ resizeListener, { width: containerWidth, height: containerHeight } ] =
		useResizeObserver();

	useEffect( () => {
		if (
			typeof containerWidth === 'undefined' ||
			! isLoaded ||
			iframeWidth === 0
		) {
			return;
		}

		const newScale = containerWidth / ( iframeWidth || 800 );
		const newAspectRatio = containerWidth / containerHeight;
		const newIframeMinHeight = Math.max( iframeWidth * newAspectRatio, 100 );
		setIframeMinHeight( newIframeMinHeight );
		setScale( newScale );
		setAspectRatio( newAspectRatio );

		// Trigger the PHP scaling system to recalculate when container size changes.
		// Dispatch the event on the current window since React and iframe are in the same context.
		const event = new CustomEvent( 'dlxPatternPreviewResize', {
			detail: { width: containerWidth },
		} );

		window.dispatchEvent( event );

		// Also try dispatching on parent window as fallback
		try {
			window.parent.dispatchEvent( event );
		} catch ( e ) {
			// Could not dispatch on parent window.
		}
	}, [ containerWidth, isLoaded ] );

	useEffect( () => {
		if ( iframeRef.current ) {
			setIframeWidth( iframeRef.current.offsetWidth );
			setIframeHeight( iframeRef.current.offsetHeight );
		}
	}, [ iframeRef, iframeMinHeight ] );

	return (
		<a
			href={ src }
			className="pattern-preview-iframe-link"
			target="_blank"
			rel="noopener noreferrer"
			onClick={ ( e ) => {
				e.preventDefault();
				popPatternPreview( item );
			} }
			aria-hidden="true"
		>
			<div
				className="pattern-preview-iframe-scale-container-wrapper"
				ref={ containerRef }
				style={ { transform: `scale(${ scale })` } }
			>
				<div className="pattern-preview-iframe-scale-wrapper">
					<div className="pattern-preview-iframe-scale-container">
						{ resizeListener }

						<div className="pattern-preview-iframe-wrapper">
							<iframe
								ref={ iframeRef }
								key={ `preview-${ item.id }` }
								src={ src }
								title={ title }
								sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
								loading="lazy"
								style={ {
									position: 'absolute',
									top: 0,
									left: 0,
									width: item.viewportWidth || 800,
									aspectRatio,
									height: iframeMinHeight + 'px',
									maxHeight: '1200px',
									overflow: 'visible',
								} }
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

const popPatternPreview = ( item ) => {
	const viewportWidth = item.viewportWidth || 1200;

	const previewUrl = item?.id
		? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${ item.id }&viewport_width=${ viewportWidth }`
		: '';

	Fancybox.show( [
		{
			src: previewUrl,
			caption: item.title,
			type: 'iframe',
			zoom: true,
			compact: true,
			width: '80%',
		},
	] );
};

const defaultLayouts = {
	grid: {
		layout: {
			titleField: 'title',
			mediaField: 'pattern-view-json',
			columns: 2,
			columnGap: '24px',
			rowGap: '24px',
			showMedia: true,
			viewConfigOptions: {},
		},
	},
};

/**
 * Retrieve all the patterns.
 *
 * @return {Promise<Object>} The patterns.
 */
const retrieveAllPatterns = async() => {
	return await apiFetch( {
		path: addQueryArgs( '/dlxplugins/pattern-wrangler/v1/patterns/all/', {
			nonce: dlxEnhancedPatternsView.getNonce,
		} ),
		method: 'GET',
	} );
};

const PatternsGrid = ( props ) => {
	const [ defaults, getDefaults ] = useAsyncResource( retrieveAllPatterns, [] );
	return (
		<ErrorBoundary
			fallback={
				<p>
					{ __( 'Could not load block patterns.', 'quotes-dlx' ) }
					<br />
					<a
						href="https://dlxplugins.com/support/"
						target="_blank"
						rel="noopener noreferrer"
					>
						DLX Plugins Support
					</a>
				</p>
			}
		>
			<Suspense
				fallback={
					<div className="has-admin-container-body__content">loading...</div>
				}
			>
				<Interface defaults={ defaults } { ...props } />
			</Suspense>
		</ErrorBoundary>
	);
};

// Get query args from current URL.
const queryArgs = getQueryArgs( window.location.href );

const Interface = ( props ) => {
	const { defaults } = props;
	const data = defaults();

	const [ selectedItems, setSelectedItems ] = useState( [] );
	const [ patterns, setPatterns ] = useState( [] );
	const [ patternsDisplay, setPatternsDisplay ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ snackbar, setSnackbar ] = useState( {
		isVisible: false,
		message: '',
		title: '',
		type: '',
	} );

	const { setViewType } = useDispatch( PatternsViewStore );

	const [ view, setView ] = useState( {
		type: 'grid',
		previewSize: 'large',
		paginationInfo: {
			totalItems: patterns.length,
			totalPages: 0,
		},
		page: parseInt( getQueryArgs( window.location.href ).paged ) || 1,
		perPage: parseInt( getQueryArgs( window.location.href ).perPage ) || 12,
		defaultPerPage: 12,
		sort: {
			field: escapeAttribute( getQueryArgs( window.location.href ).orderby || 'title' ),
			direction: escapeAttribute( getQueryArgs( window.location.href ).order || 'asc' ),
		},
		titleField: 'title',
		mediaField: 'pattern-view-json',
		layout: defaultLayouts.grid.layout,
		fields: [ 'title', 'pattern-view-json' ],
		search: escapeAttribute( getQueryArgs( window.location.href )?.search || '' ),
	} );

	const fields = [
		{
			id: 'title',
			label: __( 'Title', 'pattern-wrangler' ),
			render: ( { item } ) => {

				if ( ! item?.categorySlugs || item.categorySlugs.length === 0 ) {
					return (
						<div className="no-categories">
							{ __( 'No categories', 'pattern-wrangler' ) }
						</div>
					);
				}

				return (
					<div className="pattern-title-categories">
						<div className="pattern-title">{ item.title }</div>
						{ item.categorySlugs.length > 0 && Object.values( categories ).length > 0 && (
							<div className="pattern-categories">
								{ item.categorySlugs.map( ( category, index ) => {
									if ( ! categories.hasOwnProperty( category ) ) {
										return null;
									}

									const catLabel = categories[ category ].label || categories[ category ].name;

									return (
										<span
											key={ `category-${ index }` }
											className="pattern-category"
										>
											{ catLabel } { index < item.categorySlugs.length - 1 && ', ' }
										</span>
									);
								} ) }
							</div>
						) }
					</div>
				);
			},
			enableSorting: true,
			enableHiding: false,
			enableGlobalSearch: true,
		},
		{
			id: 'pattern-view-json',
			label: __( 'Preview', 'pattern-wrangler' ),
			getValue: ( { item } ) => {
				const viewportWidth = item.viewportWidth || 1200;

				const previewUrl = item?.id
					? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${ item.id }&viewport_width=${ viewportWidth }`
					: '';

				// Determine badge type based on pattern properties.
				let badgeText = __( 'Local', 'pattern-wrangler' );
				let badgeClass = 'pattern-badge-local';

				if ( ! item.isLocal ) {
					badgeText = __( 'Registered', 'pattern-wrangler' );
					badgeClass = 'pattern-badge-registered';
				} else if ( 'synced' === item.patternType ) {
					badgeText = __( 'Local Synced', 'pattern-wrangler' );
					badgeClass = 'pattern-badge-synced';
				} else {
					badgeText = __( 'Local Unsynced', 'pattern-wrangler' );
					badgeClass = 'pattern-badge-unsynced';
				}

				const Badge = (
					<>
						<div className="pattern-badge-wrapper">
							<span className={ `pattern-badge ${ badgeClass }` }>{ badgeText }</span>
						</div>
					</>
				);
				return (
					<>
						{ Badge }
						<div className="pattern-preview-wrapper">
							<ResponsiveIframe
								src={ previewUrl }
								title={ `Preview: ${ item.title }` }
								item={ item }
							/>
						</div>
					</>
				);
			},
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: 'categories',
			label: __( 'Categories', 'pattern-wrangler' ),
			render: ( { item } ) => {
				return null;
			},
			enableSorting: false,
			enableHiding: false,
			enableGlobalSearch: true,
			type: 'array',
			filterBy: {
				operators: [ 'isAny', 'isNone' ],
			},
			elements: Object.values( categories ).map( ( category ) => {
				return {
					label: category.label || category.name,
					value: category.slug,
				};
			} ),
		},
		{
			elements: [
				{
					label: __( 'All Patterns', 'pattern-wrangler' ),
					value: 'all',
				},
				{
					label: __( 'Local Patterns', 'pattern-wrangler' ),
					value: 'local',
				},
				{
					label: __( 'Registered Patterns', 'pattern-wrangler' ),
					value: 'registered',
				},
				{
					label: __( 'Unsynced Patterns', 'pattern-wrangler' ),
					value: 'unsynced',
				},
				{
					label: __( 'Synced Patterns', 'pattern-wrangler' ),
					value: 'synced',
				},
			],
			enableHiding: false,
			enableSorting: false,
			enableGlobalSearch: true,
			filterBy: {
				operators: [ 'is' ],
			},
			default: 'all',
			type: 'dropdown',
			id: 'patternType',
			label: __( 'Pattern Type', 'pattern-wrangler' ),
		},
	];

	const actions = [
		{
			id: 'edit',
			label: __( 'Edit', 'pattern-wrangler' ),
			icon: 'edit',
			callback: () => {
				// TODO: Implement edit functionality.
			},
			isEligible: ( pattern ) => {
				return pattern.isLocal;
			},
			isPrimary: true,
		},
		{
			id: 'delete',
			label: __( 'Delete Pattern', 'pattern-wrangler' ),
			icon: 'trash',
			isEligible: ( pattern ) => {
				// Pattern must be local.
				return pattern.isLocal;
			},
			callback: () => {
				// TODO: Implement delete functionality.
			},
			isPrimary: false,
			isDestructive: true,
		},
		{
			id: 'delete',
			label: __( 'Preview Pattern', 'pattern-wrangler' ),
			icon: 'edit',
			isEligible: () => {
				// Pattern must be local.
				return true;
			},
			callback: ( items ) => {
				// Get the first item.
				const item = items[ 0 ];
				popPatternPreview( item );
			},
			isPrimary: false,
			isDestructive: true,
		},
		{
			id: 'copy-to-local',
			label: __( 'Copy to Local Pattern', 'pattern-wrangler' ),
			icon: 'edit',
			callback: () => {
				// TODO: Implement copy to local functionality.
			},
			isEligible: ( pattern ) => {
				return ! pattern.isLocal;
			},
			isPrimary: false,
			isDestructive: false,
		},
		{
			id: 'disable-preview',
			label: __( 'Disable Pattern', 'pattern-wrangler' ),
			icon: 'controls-pause',
			callback: () => {
				// TODO: Implement disable preview functionality.
			},
			isEligible: ( item ) => {
				return ! item.isLocal;
			},
			isDestructive: true,
			supportsBulk: true,
			isPrimary: false,
		},
		{
			id: 'delete-pattern',
			label: __( 'Delete Pattern', 'pattern-wrangler' ),
			icon: 'trash',
			callback: () => {
				// TODO: Implement delete pattern functionality.
			},
			isEligible: ( item ) => {
				return item.isLocal;
			},
			isDestructive: true,
			supportsBulk: true,
			isPrimary: false,
		},
		{
			id: 'copy',
			label: __( 'Copy Pattern', 'pattern-wrangler' ),
			icon: 'edit',
			callback: ( items ) => {
				const copyContent = items[ 0 ].content.trim();
				try {
					const copyBlob = new Blob( [ copyContent ], { type: 'text/html' } );
					const data = [ new ClipboardItem( { [ copyBlob.type ]: copyBlob } ) ];
					navigator.clipboard.write( data );

					setSnackbar( {
						isVisible: true,
						message: __( 'Pattern copied to clipboard', 'pattern-wrangler' ),
						title: __( 'Pattern Copied', 'pattern-wrangler' ),
						type: 'success',
						onClose: () => {
							setSnackbar( {
								isVisible: false,
							} );
						},
					} );
				} catch ( e ) {
					// Copying is not supported on Mozilla (firefox).
				}
			},
			isEligible: ( pattern ) => {
				return true;
			},
			isPrimary: false,
			isDestructive: false,
		},
		{
			id: 'export',
			label: __( 'Export to JSON', 'pattern-wrangler' ),
			icon: 'edit',
			callback: ( items ) => {
				const isLocal = items[ 0 ].isLocal;
				const title = items[ 0 ].title;
				let syncStatus = '';
				if ( isLocal ) {
					syncStatus = 'unsynced';
				} else if ( 'synced' === items[ 0 ].patternType ) {
					syncStatus = 'synced';
				}
				const fileContent = JSON.stringify(
					{
						__file: 'wp_block',
						title,
						content: items[ 0 ].content,
						syncStatus,
					},
					null,
					2
				);
				downloadBlob( `${ title }.json`, fileContent, 'application/json' );
			},
			isEligible: () => {
				return true;
			},
			isPrimary: false,
			isDestructive: false,
		},
	];

	// const { data, isLoading, error } = useQuery( {
	// 	queryKey: [ 'all-patterns', view.perPage, view.page, view.search, view.sort ],
	// 	queryFn: () =>
	// 		fetchPatterns( {
	// 			perPage: view.perPage,
	// 			page: view.page,
	// 			search: view.search,
	// 			sort: view.sort,
	// 		} ),
	// } );

	/**
	 * Retrieve a list of modified patterns based on query vars and the current view.
	 *
	 * @param {Object} newView The new view object.
	 * @return {Array} The patterns for display.
	 */
	const getPatternsForDisplay = ( newView ) => {
		let patternsCopy = [ ...patterns ];

		if ( null === patternsCopy || 0 === patternsCopy.length ) {
			patternsCopy = [ ...data.patterns ];
		}

		const orderBy = newView?.sort?.field;
		const order = newView?.sort?.direction;

		if ( 'title' === orderBy ) {
			if ( 'desc' === order ) {
				patternsCopy.sort( ( a, b ) => b.title.localeCompare( a.title ) );
			} else {
				patternsCopy.sort( ( a, b ) => a.title.localeCompare( b.title ) );
			}
		}

		// Filter by categories.
		const filters = newView?.filters || [];
		if ( filters.length > 0 ) {
			filters.forEach( ( filter ) => {
				switch ( filter.field ) {
					case 'categories':
						if ( filter.value ) {
							// filter.value is an array.
							// Clean the filter values once for efficiency
							const cleanedFilterValues = filter.value.map( ( value ) =>
								cleanForSlug( value )
							);

							if ( filter.operator === 'isAny' ) {
								patternsCopy = patternsCopy.filter( ( pattern ) => {
									const patternCategories = pattern.categorySlugs || [];
									return patternCategories.some( ( category ) => {
										const categoryToCheck =
											category.name || cleanForSlug( category );
										return cleanedFilterValues.includes( categoryToCheck );
									} );
								} );
							} else if ( filter.operator === 'isNone' ) {
								patternsCopy = patternsCopy.filter( ( pattern ) => {
									const patternCategories = pattern.categorySlugs || [];

									// Exclude patterns that have ANY of the categories in filter.value
									// Check if this pattern has any excluded categories
									const hasExcludedCategory = patternCategories.some(
										( category ) => {
											const categoryToCheck =
												category.name || cleanForSlug( category );
											return cleanedFilterValues.includes( categoryToCheck );
										}
									);

									// Return true to keep the pattern only if it has NO excluded categories
									return ! hasExcludedCategory;
								} );
							}
						}
						break;
					case 'patternType':
						if ( filter.value ) {
							switch ( filter.value ) {
								case 'all':
									break;
								case 'local':
									patternsCopy = patternsCopy.filter( ( pattern ) => pattern.isLocal );
									break;
								case 'registered':
									patternsCopy = patternsCopy.filter( ( pattern ) => ! pattern.isLocal );
									break;
								case 'unsynced':
									patternsCopy = patternsCopy.filter( ( pattern ) => {
										if ( pattern.syncStatus ) {
											return pattern.syncStatus === 'unsynced' && pattern.isLocal;
										}
										return false;
									} );
									break;
								case 'synced':
									patternsCopy = patternsCopy.filter( ( pattern ) => {
										if ( pattern.syncStatus ) {
											return pattern.syncStatus === 'synced' && pattern.isLocal;
										}
										return false;
									} );
									break;
							}
						}
						break;
				}
			} );
		}

		// Do search.
		const searchField = newView?.search || '';

		if ( 'undefined' !== searchField && '' !== searchField ) {
			patternsCopy = patternsCopy.filter( ( pattern ) => {
				const patternLabel = pattern.label || pattern.title;
				return patternLabel
					.toLowerCase()
					.includes( ( newView.search || searchField ).toLowerCase() );
			} );
		}

		// Return the patterns for display with pagination.
		return patternsCopy.slice(
			( newView.page - 1 ) * newView.perPage,
			newView.page * newView.perPage
		);
	};

	/**
	 * When a view is changed, we need to adjust the fields and showMedia based on the view type.
	 *
	 * @param {Object} newView The new view object.
	 */
	const onChangeView = ( newView ) => {
		// Create query args object with view state.
		const changeQueryArgs = getQueryArgs( window.location.href );
		changeQueryArgs.paged = newView.page || 1;
		changeQueryArgs.perPage = newView.perPage;

		// Only add search if it exists.
		if ( newView.search ) {
			changeQueryArgs.search = newView.search;
		}

		// Add sort parameters if they exist.
		if ( newView.sort?.field ) {
			changeQueryArgs.orderby = newView.sort.field;
			changeQueryArgs.order = newView.sort.direction;
		}

		// Update URL without page reload using addQueryArgs.
		let newUrl = addQueryArgs( window.location.pathname, changeQueryArgs );
		if ( getQueryArgs( window.location.href ).search && ! newView.search ) {
			newUrl = removeQueryArgs( newUrl, 'search' );
		}

		setPatternsDisplay( getPatternsForDisplay( newView ) );

		window.history.pushState( {}, '', newUrl );

		// Unset and reset page from changeQueryArgs.
		changeQueryArgs.page = changeQueryArgs.paged;

		console.log( 'newView', newView );
		console.log( 'changeQueryArgs', changeQueryArgs );
		setView( {
			...newView,
			...changeQueryArgs,
		} );

		// Update the view state.
		//setView( newView );
	};

	useEffect( () => {
		if ( data && data.hasOwnProperty( 'patterns' ) ) {
			if ( data.categories ) {
				// Find the index of the pattern-categories field.
				const fieldsIndex = fields.findIndex(
					( field ) => field.id === 'categories'
				);
				let maybeDuplicateLabel = '';
				fields[ fieldsIndex ].elements = Object.values( data.categories ).map(
					( category ) => {
						let catLabel = category.label;
						if ( maybeDuplicateLabel === category.label ) {
							catLabel = `${ catLabel } (${ category.count + 1 })`;
						}
						maybeDuplicateLabel = category.label;
						return {
							label: catLabel,
							value: category.slug,
						};
					}
				);
				const newViewCopy = {
					...view,
					fields: [ ...fields ],
				};
				// Force view to re-render.
				setCategories( data.categories );
				setView( newViewCopy );

				// Now filter the patterns.
				if ( data.patterns && ! patternsDisplay.length ) {
					setPatterns( data.patterns );
					if ( data.patterns !== patternsDisplay ) {
						const patternsToShow = getPatternsForDisplay( view );
						setPatternsDisplay( patternsToShow );
					}
				}
				setLoading( false );
			}
		}
	}, [ data ] );

	if ( loading ) {
		return <>Loading...</>;
	}

	console.log( 'view', view );

	return (
		<div className="dlx-patterns-view-container">
			<DataViews
				data={ patternsDisplay }
				fields={ fields }
				actions={ actions }
				label={ __( 'Patterns', 'pattern-wrangler' ) }
				view={ view }
				onChangeView={ onChangeView }
				paginationInfo={ {
					totalItems: ( view?.filters?.length > 0 || view?.search ) ? patternsDisplay.length : patterns.length,
					totalPages: Math.ceil( ( view?.filters?.length > 0 || view?.search ) ? patternsDisplay.length / view.perPage : patterns.length / view.perPage ),
				} }
				perPageSizes={ [ 12, 24, 48, 96 ] }
				selection={ selectedItems }
				onChangeSelection={ setSelectedItems }
				defaultLayouts={ defaultLayouts }
				searchLabel={ __( 'Search Patterns', 'pattern-wrangler' ) }
			/>
			{ snackbar.isVisible && (
				<Snackbar
					isVisible={ snackbar.isVisible }
					message={ snackbar.message }
					title={ snackbar.title }
					type={ snackbar.type }
					onClose={ () => {
						setSnackbar( {
							isVisible: false,
						} );
					} }
				/>
			) }
		</div>
	);
};

export default PatternsGrid;
