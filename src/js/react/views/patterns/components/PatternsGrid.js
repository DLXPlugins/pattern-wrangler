/* eslint-disable react/no-unknown-property */
import {
	useState,
	useMemo,
	useEffect,
	useRef,
	Suspense,
} from '@wordpress/element';
import { useResizeObserver } from '@wordpress/compose';
import { downloadBlob } from '@wordpress/blob';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';
import { escapeAttribute } from '@wordpress/escape-html';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { __ } from '@wordpress/i18n';
import {
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	FormFileUpload,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { DataViews } from '@wordpress/dataviews';
import {
	addQueryArgs,
	getQueryArgs,
	removeQueryArgs,
	cleanForSlug,
} from '@wordpress/url';
import { BookPlus, Play } from 'lucide-react';
import { useDispatch, useSelect, dispatch, select } from '@wordpress/data';
import Snackbar from './Snackbar';
import PatternCreateModal from './PatternCreateModal';
import PatternPauseModal from './PatternPauseModal';
import PatternPublishModal from './PatternPublishModal';
import PatternUnpauseModal from './PatternUnpauseModal';
import PatternDeleteModal from './PatternDeleteModal';
import PatternGetCodeModal from './PatternGetCodeModal';
import patternsStore from '../store';
import createPatternFromFile from '../utils/createPatternFromFile';

// Enhanced iframe component that works with the existing PHP scaling system.
const ResponsiveIframe = ( { src, title, item } ) => {
	const iframeRef = useRef( null );
	const containerRef = useRef( null );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ scale, setScale ] = useState( 1 );
	const [ iframeWidth, setIframeWidth ] = useState( 0 );
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
			closeButton: true,
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

const PatternsGrid = ( props ) => {
	const { data, loading, error } = useSelect( ( select ) => {
		return {
			data: select( patternsStore ).getData(),
			loading: select( patternsStore ).getLoading(),
			error: select( patternsStore ).getError(),
		};
	} );

	useEffect( () => {
		dispatch( patternsStore ).fetchData();
	}, [] );

	// Show loading state.
	if ( loading ) {
		return (
			<div className="dlx-patterns-view-loading">
				<p>{ __( 'Loading patterns…', 'pattern-wrangler' ) }</p>
			</div>
		);
	}

	// Show error state.
	if ( error ) {
		return (
			<div className="dlx-patterns-view-error">
				<p>
					{ __( 'Error loading patterns:', 'pattern-wrangler' ) } { error }
				</p>
				<Button
					variant="primary"
					onClick={ () => dispatch( patternsStore ).fetchData() }
				>
					{ __( 'Retry', 'pattern-wrangler' ) }
				</Button>
			</div>
		);
	}

	// Show empty state.
	if ( ! data || ! data.patterns || data.patterns.length === 0 ) {
		return (
			<div className="dlx-patterns-view-empty">
				<p>{ __( 'No patterns found.', 'pattern-wrangler' ) }</p>
			</div>
		);
	}
	return <Interface data={ data } { ...props } />;
};

// Get query args from current URL.
// const queryArgs = getQueryArgs( window.location.href );

const Interface = ( props ) => {
	const { data } = props;

	const [ selectedItems, setSelectedItems ] = useState( [] );
	const { patterns } = useSelect( ( select ) => {
		return {
			patterns: select( patternsStore ).getPatterns(),
		};
	} );

	const [ patternsDisplay, setPatternsDisplay ] = useState( [] );

	const { categories } = useSelect( () => {
		return {
			categories: select( patternsStore ).getCategories(),
		};
	} );

	const [ localCategories, setLocalCategories ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ snackbar, setSnackbar ] = useState( {
		isVisible: false,
		message: '',
		title: '',
		type: '',
	} );
	const [ isAddNewPatternModalOpen, setIsAddNewPatternModalOpen ] =
		useState( false );
	const [ isCopyToLocalModalOpen, setIsCopyToLocalModalOpen ] = useState( false );
	const [ copyPatternId, setCopyPatternId ] = useState( 0 );
	const [ isQuickEditModalOpen, setIsQuickEditModalOpen ] = useState( null );
	const [ isPauseModalOpen, setIsPauseModalOpen ] = useState( null );
	const [ isPublishModalOpen, setIsPublishModalOpen ] = useState( null );
	const [ isUnpauseModalOpen, setIsUnpauseModalOpen ] = useState( null );
	const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( null );
	const [ isGetCodeModalOpen, setIsGetCodeModalOpen ] = useState( null );
	const exportPattern = ( item ) => {
		const isLocal = item.isLocal;
		const title = item.title;
		let syncStatus = '';
		if ( isLocal ) {
			syncStatus = 'unsynced';
		} else if ( 'synced' === item.patternType ) {
			syncStatus = 'synced';
		}
		const fileContent = JSON.stringify(
			{
				__file: 'wp_block',
				title,
				content: item.content,
				syncStatus,
			},
			null,
			2
		);
		downloadBlob( `${ title }.json`, fileContent, 'application/json' );
	};

	/**
	 * Returns a default view with query vars. Useful for setting or refreshing the view.
	 *
	 * @return {Object} The default view.
	 */
	const getDefaultView = () => {
		return {
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
				field: escapeAttribute(
					getQueryArgs( window.location.href ).orderby || 'title'
				),
				direction: escapeAttribute(
					getQueryArgs( window.location.href ).order || 'asc'
				),
			},
			titleField: 'title',
			mediaField: 'pattern-view-json',
			layout: defaultLayouts.grid.layout,
			fields: [ 'title', 'pattern-view-json' ],
			search: escapeAttribute( getQueryArgs( window.location.href )?.search || '' ),
			filters: [
				{
					field: 'patternType',
					value: getQueryArgs( window.location.href )?.patternType || 'all',
				},
				{
					field: 'patternStatus',
					value: getQueryArgs( window.location.href )?.patternStatus || 'both',
				},
				{
					field: 'patternLocalStatus',
					value:
						getQueryArgs( window.location.href )?.patternLocalStatus || 'both',
				},
				{
					field: 'patternRegisteredStatus',
					value:
						getQueryArgs( window.location.href )?.patternRegisteredStatus ||
						'both',
				},
				{
					field: 'patternLocalRegisteredStatus',
					value:
						getQueryArgs( window.location.href )?.patternLocalRegisteredStatus ||
						'both',
				},
			],
		};
	};

	/**
	 * Returns the quick links for a pattern.
	 * @param {Object} item - The pattern item.
	 * @returns {JSX.Element|null} The quick links JSX element or null if no quick links are needed.
	 */
	const getQuickLinks = ( item ) => {
		return (
			<>
				<div className="pattern-quick-links">
					{ item.isLocal && (
						<>
							<Button
								variant="link"
								onClick={ ( e ) => {
									e.preventDefault();
									setIsQuickEditModalOpen( { item } );
								} }
							>
								{ __( 'Quick Edit', 'pattern-wrangler' ) }
							</Button>
							{ ' | ' }
							<Button
								variant="link"
								onClick={ ( e ) => {
									e.preventDefault();
									setIsGetCodeModalOpen( { item } );
								} }
							>
								{ __( 'Get Code', 'pattern-wrangler' ) }
							</Button>
							{ ' | ' }
							<Button
								variant="link"
								onClick={ ( e ) => {
									e.preventDefault();
									exportPattern( item );
								} }
							>
								{ __( 'Export Pattern', 'pattern-wrangler' ) }
							</Button>
						</>
					) }
					{ ! item.isLocal && (
						<>
							<Button
								variant="link"
								onClick={ ( e ) => {
									e.preventDefault();
									setCopyPatternId( item.id );
									setIsCopyToLocalModalOpen( { item } );
								} }
							>
								{ __( 'Copy to Local', 'pattern-wrangler' ) }
							</Button>
							{ ' | ' }
							<Button
								variant="link"
								onClick={ ( e ) => {
									e.preventDefault();
									exportPattern( item );
								} }
							>
								{ __( 'Export Pattern', 'pattern-wrangler' ) }
							</Button>
						</>
					) }
				</div>
			</>
		);
	};

	const [ view, setView ] = useState( getDefaultView() );

	const fields = useMemo(
		() => [
			{
				id: 'title',
				label: __( 'Title', 'pattern-wrangler' ),
				render: ( { item } ) => {
					if ( ! item?.categorySlugs || item.categorySlugs.length === 0 ) {
						return (
							<div className="pattern-title-categories">
								<div className="pattern-title">
									{ item.isLocal && (
										<Button
											variant="link"
											onClick={ ( e ) => {
												e.preventDefault();
												const redirectUrl = encodeURIComponent(
													window.location.href
												);
												window.location.href = `${ dlxEnhancedPatternsView.getSiteBaseUrl }post.php?post=${ item.id }&action=edit&redirect_to=${ redirectUrl }`;
											} }
										>
											{ item.title }
										</Button>
									) }
									{ ! item.isLocal && (
										<span className="pattern-title">{ item.title }</span>
									) }
								</div>
								<div className="pattern-categories">
									{ __( 'No categories', 'pattern-wrangler' ) }
								</div>
								{ getQuickLinks( item ) }
							</div>
						);
					}

					const currentCategories = select( patternsStore ).getCategories();

					return (
						<>
							<div className="pattern-title-categories">
								<div className="pattern-title">
									{ item.isLocal && (
										<Button
											variant="link"
											onClick={ ( e ) => {
												e.preventDefault();
												const redirectUrl = encodeURIComponent(
													window.location.href
												);
												window.location.href = `${ dlxEnhancedPatternsView.getSiteBaseUrl }post.php?post=${ item.id }&action=edit&redirect_to=${ redirectUrl }`;
											} }
										>
											{ item.title }
										</Button>
									) }
									{ ! item.isLocal && (
										<span className="pattern-title">{ item.title }</span>
									) }
								</div>
								{ item.categorySlugs.length > 0 &&
									Object.values( currentCategories ).length > 0 && (
									<div className="pattern-categories">
										{ __( 'Categories:', 'pattern-wrangler' ) }{ ' ' }
										{ item.categorySlugs.map( ( category, index ) => {
											const catSlug = category?.slug || category.toString();
											if ( ! currentCategories.hasOwnProperty( catSlug ) ) {
												return null;
											}

											const catLabel =
													currentCategories[ catSlug ]?.label ||
													currentCategories[ catSlug ]?.name;

											return (
												<span
													key={ `category-${ index }` }
													className="pattern-category"
												>
													{ catLabel }{ ' ' }
													{ index < item.categorySlugs.length - 1 && ', ' }
												</span>
											);
										} ) }
									</div>
								) }
								{ getQuickLinks( item ) }
							</div>
						</>
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

					let badgeDisabledText = __( 'Disabled', 'pattern-wrangler' );
					const badgeDisabledClass = 'pattern-badge-disabled';
					let showDisabledBadge = true;
					if ( item.isDisabled && item.isLocal ) {
						badgeDisabledText = __( 'Draft', 'pattern-wrangler' );
					} else if ( ! item.isDisabled && item.isLocal ) {
						showDisabledBadge = false;
					} else if ( ! item.isDisabled && ! item.isLocal ) {
						showDisabledBadge = false;
					}

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
								{ showDisabledBadge && (
									<span className={ `pattern-badge ${ badgeDisabledClass }` }>
										{ badgeDisabledText }
									</span>
								) }
								<span className={ `pattern-badge ${ badgeClass }` }>
									{ badgeText }
								</span>
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
					console.log( 'item', item );
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
				],
				enableHiding: false,
				enableSorting: false,
				enableGlobalSearch: false,
				filterBy: {
					operators: [ 'is' ],
				},
				default: 'all',
				type: 'array',
				id: 'patternType',
				label: __( 'Pattern Type', 'pattern-wrangler' ),
			},
			{
				elements: [
					{
						label: __( 'Unsynced Patterns', 'pattern-wrangler' ),
						value: 'unsynced',
					},
					{
						label: __( 'Synced Patterns', 'pattern-wrangler' ),
						value: 'synced',
					},
					{
						label: __( 'Both', 'pattern-wrangler' ),
						value: 'both',
					},
				],
				enableHiding: false,
				enableSorting: false,
				enableGlobalSearch: false,
				filterBy: {
					operators: [ 'is' ],
				},
				type: 'array',
				id: 'patternStatus',
				label: __( 'Pattern Status', 'pattern-wrangler' ),
			},
			{
				elements: [
					{
						label: __( 'Paused Patterns', 'pattern-wrangler' ),
						value: 'paused',
					},
					{
						label: __( 'Unpaused Patterns', 'pattern-wrangler' ),
						value: 'unpaused',
					},
					{
						label: __( 'Both', 'pattern-wrangler' ),
						value: 'both',
					},
				],
				enableHiding: false,
				enableSorting: false,
				enableGlobalSearch: false,
				filterBy: {
					operators: [ 'is' ],
				},
				type: 'array',
				id: 'patternRegisteredStatus',
				label: __( 'Pattern Registered Status', 'pattern-wrangler' ),
			},
			{
				elements: [
					{
						label: __( 'Draft Patterns', 'pattern-wrangler' ),
						value: 'draft',
					},
					{
						label: __( 'Published Patterns', 'pattern-wrangler' ),
						value: 'published',
					},
					{
						label: __( 'Both', 'pattern-wrangler' ),
						value: 'both',
					},
				],
				enableHiding: false,
				enableSorting: false,
				enableGlobalSearch: false,
				filterBy: {
					operators: [ 'is' ],
				},
				type: 'array',
				id: 'patternLocalStatus',
				label: __( 'Pattern Local Status', 'pattern-wrangler' ),
			},
		],
		{
			elements: [
				{
					label: __( 'Disabled Patterns', 'pattern-wrangler' ),
					value: 'disabled',
				},
				{
					label: __( 'Enabled Patterns', 'pattern-wrangler' ),
					value: 'enabled',
				},
				{
					label: __( 'Both', 'pattern-wrangler' ),
					value: 'both',
				},
			],
			enableHiding: false,
			enableSorting: false,
			enableGlobalSearch: false,
			filterBy: {
				operators: [ 'is' ],
			},
			type: 'array',
			id: 'patternLocalRegisteredStatus',
			label: __( 'Pattern Local and Registered Status', 'pattern-wrangler' ),
		},
		[]
	);

	const actions = useMemo(
		() => [
			{
				id: 'quick-edit',
				label: __( 'Quick Edit', 'pattern-wrangler' ),
				icon: 'edit',
				callback: ( items ) => {
					setIsQuickEditModalOpen( { item: items[ 0 ] } );
				},
				isEligible: ( pattern ) => {
					return pattern.isLocal;
				},
				isPrimary: true,
			},
			{
				id: 'get-code',
				label: __( 'Get Code', 'pattern-wrangler' ),
				icon: 'code',
				callback: ( items ) => {
					setIsGetCodeModalOpen( { item: items[ 0 ] } );
				},
				isEligible: ( item ) => {
					return item.isLocal;
				},
				isPrimary: false,
				supportsBulk: false,
			},
			{
				id: 'delete',
				label: __( 'Delete Pattern', 'pattern-wrangler' ),
				icon: 'trash',
				isEligible: ( pattern ) => {
					// Pattern must be local and disabled.
					return pattern.isLocal && pattern.isDisabled;
				},
				callback: ( items ) => {
					setIsDeleteModalOpen( { items } );
				},
				isPrimary: false,
				isDestructive: true,
				supportsBulk: true,
			},
			{
				id: 'publish',
				label: __( 'Publish Pattern', 'pattern-wrangler' ),
				icon: <BookPlus />,
				isEligible: ( pattern ) => {
					// Pattern must be local and disabled.
					return pattern.isLocal && pattern.isDisabled;
				},
				callback: ( items ) => {
					setIsPublishModalOpen( { items } );
				},
				isPrimary: false,
				isDestructive: false,
				supportsBulk: true,
			},
			{
				id: 'unpause',
				label: __( 'Re-enable Pattern', 'pattern-wrangler' ),
				icon: <Play />,
				isEligible: ( pattern ) => {
					// Pattern must be local and enabled.
					return ! pattern.isLocal && pattern.isDisabled;
				},
				callback: ( items ) => {
					setIsUnpauseModalOpen( { items } );
				},
				isPrimary: false,
				isDestructive: false,
				supportsBulk: true,
			},
			{
				id: 'copy-to-local',
				label: __( 'Copy to Local Pattern', 'pattern-wrangler' ),
				icon: 'edit',
				callback: ( items ) => {
					const item = items[ 0 ];
					setCopyPatternId( item.id );
					setIsCopyToLocalModalOpen( { item } );
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
				callback: ( items ) => {
					setIsPauseModalOpen( { items } );
				},
				isEligible: ( item ) => {
					return ! item.isDisabled;
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
		],
		[ categories, patterns ]
	);

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
	 * Get the total count of filtered patterns without pagination.
	 *
	 * @param {Object} newView The new view object.
	 * @return {number} The total count of filtered patterns.
	 */
	const getFilteredPatternsCount = ( newView ) => {
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
									patternsCopy = patternsCopy.filter(
										( pattern ) => pattern.isLocal
									);
									break;
								case 'registered':
									patternsCopy = patternsCopy.filter(
										( pattern ) => ! pattern.isLocal
									);
									break;
							}
						}
						break;
					case 'patternStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'local' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'unsynced':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											if ( pattern.syncStatus ) {
												return (
													pattern.syncStatus === 'unsynced' && pattern.isLocal
												);
											}
											return false;
										} );
										break;
									case 'synced':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											if ( pattern.syncStatus ) {
												return (
													pattern.syncStatus === 'synced' && pattern.isLocal
												);
											}
											return false;
										} );
										break;
									case 'both':
										break;
								}
							}
						}
						break;
					case 'patternLocalStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'local' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'draft':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return pattern.isDisabled && pattern.isLocal;
										} );
										break;
									case 'published':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return ! pattern.isDisabled && pattern.isLocal;
										} );
										break;
									case 'both':
										break;
								}
							}
						}
						break;
					case 'patternRegisteredStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'registered' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'paused':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return pattern.isDisabled && ! pattern.isLocal;
										} );
										break;
									case 'unpaused':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return ! pattern.isDisabled && ! pattern.isLocal;
										} );
										break;
									case 'both':
										break;
								}
							}
						}
						break;
					case 'patternLocalRegisteredStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'all' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'disabled':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return pattern.isDisabled;
										} );
										break;
									case 'enabled':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return ! pattern.isDisabled;
										} );
										break;
									case 'both':
										break;
								}
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

		// Return the total count without pagination.
		return patternsCopy.length;
	};

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
									patternsCopy = patternsCopy.filter(
										( pattern ) => pattern.isLocal
									);
									break;
								case 'registered':
									patternsCopy = patternsCopy.filter(
										( pattern ) => ! pattern.isLocal
									);
									break;
							}
						}
						break;
					case 'patternStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'local' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'unsynced':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											if ( pattern.syncStatus ) {
												return (
													pattern.syncStatus === 'unsynced' && pattern.isLocal
												);
											}
											return false;
										} );
										break;
									case 'synced':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											if ( pattern.syncStatus ) {
												return (
													pattern.syncStatus === 'synced' && pattern.isLocal
												);
											}
											return false;
										} );
										break;
									case 'both':
										break;
								}
							}
						}
						break;
					case 'patternLocalStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'local' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'draft':
									case 'paused':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return pattern.isDisabled && pattern.isLocal;
										} );
										break;
									case 'published':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return ! pattern.isDisabled && pattern.isLocal;
										} );
										break;
									case 'both':
										break;
								}
							}
						}
						break;
					case 'patternRegisteredStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'registered' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'paused':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return pattern.isDisabled && ! pattern.isLocal;
										} );
										break;
									case 'unpaused':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return ! pattern.isDisabled && ! pattern.isLocal;
										} );
										break;
									case 'both':
										break;
								}
							}
						}
						break;
					case 'patternLocalRegisteredStatus':
						if ( filter.value ) {
							const patternTypeFilter = filters.find(
								( f ) => f.field === 'patternType'
							);
							if (
								patternTypeFilter &&
								patternTypeFilter.value === 'all' &&
								filter.value
							) {
								switch ( filter.value ) {
									case 'disabled':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return pattern.isDisabled;
										} );
										break;
									case 'enabled':
										patternsCopy = patternsCopy.filter( ( pattern ) => {
											return ! pattern.isDisabled;
										} );
										break;
									case 'both':
										break;
								}
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

		// Get pattern type and status from filters.
		const patternTypeFilter = newView.filters?.find(
			( filter ) => filter.field === 'patternType'
		);
		const patternStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'patternStatus'
		);
		if ( patternTypeFilter ) {
			changeQueryArgs.patternType = patternTypeFilter.value;
		}
		if ( patternStatusFilter ) {
			changeQueryArgs.patternStatus = patternStatusFilter.value;
		}

		// Get registered/local pattern disabled/enabled status from filters.
		const patternRegisteredStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'patternRegisteredStatus'
		);
		const patternLocalStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'patternLocalStatus'
		);
		const patternLocalRegisteredStatusFilter = newView.filters?.find(
			( filter ) => filter.field === 'patternLocalRegisteredStatus'
		);
		if ( patternRegisteredStatusFilter && ! patternLocalRegisteredStatusFilter ) {
			changeQueryArgs.patternRegisteredStatus =
				patternRegisteredStatusFilter.value;
		}
		if ( patternLocalStatusFilter && ! patternLocalRegisteredStatusFilter ) {
			changeQueryArgs.patternLocalStatus = patternLocalStatusFilter.value;
		}
		if ( patternLocalRegisteredStatusFilter ) {
			changeQueryArgs.patternLocalRegisteredStatus =
				patternLocalRegisteredStatusFilter.value;
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
		setView( {
			...newView,
			...changeQueryArgs,
		} );

		// Update the view state.
		//setView( newView );
	};

	/**
	 * Listen for any history changes.
	 */
	useEffect( () => {
		// Listen for any history changes.
		window.addEventListener( 'popstate', () => {
			onChangeView( getDefaultView() );
		} );
	}, [ view ] );

	useEffect( () => {
		if ( data && data.hasOwnProperty( 'patterns' ) ) {
			if ( data.categories ) {
				// Find the index of the pattern-categories field.
				const fieldsIndex = fields.findIndex(
					( field ) => field.id === 'categories'
				);
				const originalLocalCategories = [];
				let maybeDuplicateLabel = '';
				fields[ fieldsIndex ].elements = Object.values( data.categories ).map(
					( category ) => {
						let catLabel = category.label;
						if ( maybeDuplicateLabel === category.label ) {
							catLabel = `${ catLabel } (${ category.count + 1 })`;
						}
						maybeDuplicateLabel = category.label;
						if ( ! category.registered ) {
							originalLocalCategories.push( {
								id: category.id,
								label: category.label,
							} );
						}
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
				setLocalCategories( originalLocalCategories );
				setView( newViewCopy );

				// Now filter the patterns.
				if ( data.patterns ) {
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

	return (
		<div className="dlx-patterns-view-container-wrapper">
			<div className="dlx-patterns-view-container">
				<DataViews
					data={ patternsDisplay }
					fields={ fields }
					actions={ actions }
					label={ __( 'Patterns', 'pattern-wrangler' ) }
					view={ view }
					onChangeView={ onChangeView }
					paginationInfo={ {
						totalItems: getFilteredPatternsCount( view ),
						totalPages: Math.ceil(
							getFilteredPatternsCount( view ) / view.perPage
						),
					} }
					perPageSizes={ [ 12, 24, 48, 96 ] }
					selection={ selectedItems }
					onChangeSelection={ setSelectedItems }
					defaultLayouts={ defaultLayouts }
					searchLabel={ __( 'Search Patterns', 'pattern-wrangler' ) }
				>
					<div className="dlx-patterns-view-container-header">
						<h1>{ __( 'Pattern Library', 'pattern-wrangler' ) }</h1>
					</div>
					<div className="dlx-patterns-view-quick-buttons-wrapper">
						<Button
							variant="primary"
							className="dlx-patterns-view-quick-button"
							onClick={ () => {
								setIsAddNewPatternModalOpen( true );
							} }
						>
							{ __( 'Add New Pattern', 'pattern-wrangler' ) }
						</Button>
						<FormFileUpload
							accept=".json"
							variant="secondary"
							className="dlx-patterns-view-quick-button"
							onChange={ async( event ) => {
								const file = event.target.files[ 0 ];
								try {
									// Post the new pattern to the REST API
									const pattern = await createPatternFromFile( file );

									// Now POST it to the REST API
									const response = await apiFetch( {
										path: '/wp/v2/blocks',
										method: 'POST',
										data: {
											title: pattern.title,
											content: pattern.content,
											status: 'publish',
											meta: {
												wp_pattern_sync_status: pattern.syncStatus,
											},
										},
									} );
									if ( response?.id ) {
										const getPatternResponse = await apiFetch( {
											path: `/dlxplugins/pattern-wrangler/v1/patterns/get/${ response.id }`,
											method: 'GET',
										} );
										if ( getPatternResponse ) {
											dispatch( patternsStore ).addPattern( getPatternResponse );
										}
									}
								} catch ( err ) {}
							} }
						>
							{ __( 'Import Pattern From JSON File', 'pattern-wrangler' ) }
						</FormFileUpload>
					</div>
					<div className="dlx-patterns-view-grid">
						<div className="dlx-patterns-view-search-filters-wrapper">
							<DataViews.Search />
							<DataViews.FiltersToggle />
						</div>
						<div className="dlx-patterns-view-button-actions-wrapper">
							<ToggleGroupControl
								label={ __( 'Pattern Type', 'pattern-wrangler' ) }
								isAdaptiveWidth={ true }
								hideLabelFromVision={ true }
								value={
									view?.filters?.find(
										( filter ) => filter.field === 'patternType'
									)?.value || 'all'
								}
								onChange={ ( value ) => {
									const myNewView = { ...view };
									// Merge with existing filters, replacing patternType if it exists
									const existingFilters =
										myNewView.filters?.filter(
											( filter ) => filter.field !== 'patternType'
										) || [];
									myNewView.filters = [
										...existingFilters,
										{ field: 'patternType', operator: 'is', value },
									];
									// Reset to first page when filter changes
									myNewView.page = 1;
									onChangeView( myNewView );

									let patternUrl = window.location.href;
									switch ( value ) {
										case 'all':
											patternUrl = removeQueryArgs( patternUrl, 'patternStatus' );
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternRegisteredStatus'
											);
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternLocalStatus'
											);
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternLocalRegisteredStatus'
											);
											window.history.pushState( {}, '', patternUrl );
											break;
										case 'local':
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternRegisteredStatus'
											);
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternLocalRegisteredStatus'
											);
											window.history.pushState( {}, '', patternUrl );
											break;
										case 'registered':
											patternUrl = removeQueryArgs( patternUrl, 'patternStatus' );
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternLocalStatus'
											);
											patternUrl = removeQueryArgs(
												patternUrl,
												'patternLocalRegisteredStatus'
											);
											window.history.pushState( {}, '', patternUrl );
											break;
										default:
											break;
									}
								} }
							>
								<ToggleGroupControlOption
									value="local"
									label={ __( 'Local', 'pattern-wrangler' ) }
									showTooltip={ true }
									aria-label={ __(
										'Show Only Local Patterns',
										'pattern-wrangler'
									) }
								/>
								<ToggleGroupControlOption
									value="all"
									label={ __( 'All', 'pattern-wrangler' ) }
									showTooltip={ true }
									aria-label={ __( 'Show All Patterns', 'pattern-wrangler' ) }
								/>
								<ToggleGroupControlOption
									value="registered"
									label={ __( 'Registered', 'pattern-wrangler' ) }
									showTooltip={ true }
									aria-label={ __(
										'Show Only Registered Patterns',
										'pattern-wrangler'
									) }
								/>
							</ToggleGroupControl>
							{
								// If patttern type is local, show synced|both|unsynced buttons.
								view?.filters?.find( ( filter ) => filter.field === 'patternType' )
									?.value === 'registered' && (
									<>
										<ToggleGroupControl
											label={ __( 'Registered Status', 'pattern-wrangler' ) }
											isAdaptiveWidth={ true }
											hideLabelFromVision={ true }
											value={
												view?.filters?.find(
													( filter ) => filter.field === 'patternRegisteredStatus'
												)?.value || 'both'
											}
											onChange={ ( value ) => {
												const myNewView = { ...view };
												// Merge with existing filters, replacing patternStatus if it exists
												const existingFilters =
													myNewView.filters?.filter(
														( filter ) =>
															filter.field !== 'patternRegisteredStatus'
													) || [];
												myNewView.filters = [
													...existingFilters,
													{
														field: 'patternRegisteredStatus',
														operator: 'is',
														value,
													},
												];
												// Reset to first page when filter changes
												myNewView.page = 1;
												onChangeView( myNewView );
											} }
										>
											<ToggleGroupControlOption
												value="paused"
												label={ __( 'Disabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Disabled Patterns',
													'pattern-wrangler'
												) }
											/>
											<ToggleGroupControlOption
												value="both"
												label={ __( 'Both', 'pattern-wrangler' ) }
												aria-label={ __(
													'Show Both Disabled and Enabled Patterns',
													'pattern-wrangler'
												) }
												showTooltip={ true }
											/>
											<ToggleGroupControlOption
												value="unpaused"
												label={ __( 'Enabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Enabled Patterns',
													'pattern-wrangler'
												) }
											/>
										</ToggleGroupControl>
									</>
								)
							}
							{
								// If patttern type is local, show synced|both|unsynced buttons.
								view?.filters?.find( ( filter ) => filter.field === 'patternType' )
									?.value === 'local' && (
									<>
										<ToggleGroupControl
											label={ __( 'Pattern Status', 'pattern-wrangler' ) }
											isAdaptiveWidth={ true }
											hideLabelFromVision={ true }
											value={
												view?.filters?.find(
													( filter ) => filter.field === 'patternStatus'
												)?.value || 'both'
											}
											onChange={ ( value ) => {
												const myNewView = { ...view };
												// Merge with existing filters, replacing patternStatus if it exists
												const existingFilters =
													myNewView.filters?.filter(
														( filter ) => filter.field !== 'patternStatus'
													) || [];
												myNewView.filters = [
													...existingFilters,
													{ field: 'patternStatus', operator: 'is', value },
												];
												// Reset to first page when filter changes
												myNewView.page = 1;
												onChangeView( myNewView );
											} }
										>
											<ToggleGroupControlOption
												value="unsynced"
												label={ __( 'Unsynced', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Unsynced Patterns',
													'pattern-wrangler'
												) }
											/>
											<ToggleGroupControlOption
												value="both"
												label={ __( 'Both', 'pattern-wrangler' ) }
												aria-label={ __(
													'Show Both Synced and Unsynced Patterns',
													'pattern-wrangler'
												) }
												showTooltip={ true }
											/>
											<ToggleGroupControlOption
												value="synced"
												label={ __( 'Synced', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Synced Patterns',
													'pattern-wrangler'
												) }
											/>
										</ToggleGroupControl>
										<ToggleGroupControl
											label={ __( 'Published Status', 'pattern-wrangler' ) }
											isAdaptiveWidth={ true }
											hideLabelFromVision={ true }
											value={
												view?.filters?.find(
													( filter ) => filter.field === 'patternLocalStatus'
												)?.value || 'both'
											}
											onChange={ ( value ) => {
												const myNewView = { ...view };
												// Merge with existing filters, replacing patternStatus if it exists
												const existingFilters =
													myNewView.filters?.filter(
														( filter ) => filter.field !== 'patternLocalStatus'
													) || [];
												myNewView.filters = [
													...existingFilters,
													{
														field: 'patternLocalStatus',
														operator: 'is',
														value,
													},
												];
												// Reset to first page when filter changes
												myNewView.page = 1;
												onChangeView( myNewView );
											} }
										>
											<ToggleGroupControlOption
												value="draft"
												label={ __( 'Draft', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Draft Patterns',
													'pattern-wrangler'
												) }
											/>
											<ToggleGroupControlOption
												value="both"
												label={ __( 'Both', 'pattern-wrangler' ) }
												aria-label={ __(
													'Show Both Draft and Published Patterns',
													'pattern-wrangler'
												) }
												showTooltip={ true }
											/>
											<ToggleGroupControlOption
												value="published"
												label={ __( 'Published', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Published Patterns',
													'pattern-wrangler'
												) }
											/>
										</ToggleGroupControl>
									</>
								)
							}
							{
								// If patttern type is local, show synced|both|unsynced buttons.
								view?.filters?.find( ( filter ) => filter.field === 'patternType' )
									?.value === 'all' && (
									<>
										<ToggleGroupControl
											label={ __( 'Disabled Status', 'pattern-wrangler' ) }
											isAdaptiveWidth={ true }
											hideLabelFromVision={ true }
											value={
												view?.filters?.find(
													( filter ) =>
														filter.field === 'patternLocalRegisteredStatus'
												)?.value || 'both'
											}
											onChange={ ( value ) => {
												const myNewView = { ...view };
												// Merge with existing filters, replacing patternStatus if it exists
												const existingFilters =
													myNewView.filters?.filter(
														( filter ) =>
															filter.field !== 'patternLocalRegisteredStatus'
													) || [];
												myNewView.filters = [
													...existingFilters,
													{
														field: 'patternLocalRegisteredStatus',
														operator: 'is',
														value,
													},
												];
												// Reset to first page when filter changes
												myNewView.page = 1;
												onChangeView( myNewView );
											} }
										>
											<ToggleGroupControlOption
												value="disabled"
												label={ __( 'Disabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Disabled Local and Registered Patterns',
													'pattern-wrangler'
												) }
											/>
											<ToggleGroupControlOption
												value="both"
												label={ __( 'Both', 'pattern-wrangler' ) }
												aria-label={ __(
													'Show Both Disabled and Enabled Local and Registered Patterns',
													'pattern-wrangler'
												) }
												showTooltip={ true }
											/>
											<ToggleGroupControlOption
												value="enabled"
												label={ __( 'Enabled', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __(
													'Show Only Enabled Local and Registered Patterns',
													'pattern-wrangler'
												) }
											/>
										</ToggleGroupControl>
									</>
								)
							}
						</div>
						<div className="dlx-patterns-view-layout-pagination-wrapper">
							<DataViews.ViewConfig />
							<DataViews.LayoutSwitcher />
						</div>
					</div>
					<div className="dlx-patterns-view-filters-wrapper">
						<DataViews.Filters />
					</div>
					<DataViews.Layout />
					<DataViews.BulkActionToolbar />
					<DataViews.Pagination />
				</DataViews>

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
			{ isAddNewPatternModalOpen && (
				<PatternCreateModal
					isOpen={ isAddNewPatternModalOpen }
					onRequestClose={ () => setIsAddNewPatternModalOpen( false ) }
					categories={ localCategories }
					title={ __( 'Create New Pattern', 'pattern-wrangler' ) }
				/>
			) }
			{ isCopyToLocalModalOpen && (
				<PatternCreateModal
					isOpen={ isCopyToLocalModalOpen }
					onRequestClose={ () => setIsCopyToLocalModalOpen( false ) }
					categories={ localCategories }
					title={ __( 'Copy Pattern to Local', 'pattern-wrangler' ) }
					syncedDefaultStatus={ 'unsynced' }
					copyPatternId={ isCopyToLocalModalOpen.item.id }
				/>
			) }
			{ isQuickEditModalOpen && (
				<PatternCreateModal
					isOpen={ isQuickEditModalOpen }
					onRequestClose={ () => setIsQuickEditModalOpen( null ) }
					pattern={ isQuickEditModalOpen.item }
					patternTitle={ isQuickEditModalOpen.item.title }
					categories={ localCategories }
					patternCategories={ isQuickEditModalOpen.item.categories }
					title={ __( 'Quick Edit Pattern', 'pattern-wrangler' ) }
					syncedDisabled={ true }
					patternId={ isQuickEditModalOpen.item.id }
					patternNonce={ isQuickEditModalOpen.item.editNonce }
					isEditMode={ true }
					onEdit={ ( editResponse ) => {
						dispatch( patternsStore ).upsertCategory( editResponse.categories );
						dispatch( patternsStore ).setPattern(
							editResponse.patternId,
							editResponse.patternTitle,
							editResponse.categorySlugs,
							editResponse.categorySlugs
						);
						setIsQuickEditModalOpen( null );
					} }
				/>
			) }
			{ isPauseModalOpen && (
				<PatternPauseModal
					items={ isPauseModalOpen.items }
					onPause={ ( pauseResponse, itemIdsAndNonces ) => {
						dispatch( patternsStore ).disablePatterns( itemIdsAndNonces );
						setIsPauseModalOpen( null );
					} }
					onRequestClose={ () => setIsPauseModalOpen( null ) }
				/>
			) }
			{ isPublishModalOpen && (
				<PatternPublishModal
					items={ isPublishModalOpen.items }
					onPublish={ ( publishResponse, itemIdsAndNonces ) => {
						dispatch( patternsStore ).enablePatterns( itemIdsAndNonces );
						setIsPublishModalOpen( null );
					} }
					onRequestClose={ () => setIsPublishModalOpen( null ) }
				/>
			) }
			{ isUnpauseModalOpen && (
				<PatternUnpauseModal
					items={ isUnpauseModalOpen.items }
					onReenable={ ( reenableResponse, itemIdsAndNonces ) => {
						dispatch( patternsStore ).enablePatterns( itemIdsAndNonces );
						setIsUnpauseModalOpen( null );
					} }
					onRequestClose={ () => setIsUnpauseModalOpen( null ) }
				/>
			) }
			{ isDeleteModalOpen && (
				<PatternDeleteModal
					items={ isDeleteModalOpen.items }
					onDelete={ ( deleteResponse, itemIdsAndNonces ) => {
						dispatch( patternsStore ).deletePatterns( itemIdsAndNonces );
						setIsDeleteModalOpen( null );
					} }
					onRequestClose={ () => setIsDeleteModalOpen( null ) }
				/>
			) }
			{ isGetCodeModalOpen && (
				<PatternGetCodeModal
					item={ isGetCodeModalOpen.item }
					onRequestClose={ () => setIsGetCodeModalOpen( null ) }
				/>
			) }
		</div>
	);
};

export default PatternsGrid;
