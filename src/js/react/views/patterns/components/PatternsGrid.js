/* eslint-disable react/no-unknown-property */
import { useState, useMemo, useEffect, useRef, Suspense } from '@wordpress/element';
import { useResizeObserver, useRefEffect } from '@wordpress/compose';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useQuery } from '@tanstack/react-query';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews';
import apiFetch from '@wordpress/api-fetch';
import { useAsyncResource } from 'use-async-resource';
import { useRouter } from '@tanstack/react-router';
import { addQueryArgs, getQueryArgs } from '@wordpress/url';
import { dispatch, select, useDispatch } from '@wordpress/data';
import PatternsViewStore from '../store';
import ErrorBoundary from '../../../components/ErrorBoundary';

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
const fields = [
	{
		id: 'title',
		label: __( 'Title', 'pattern-wrangler' ),
		render: ( { item } ) => {
			return <span>{ item.title }</span>;
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
				badgeText = __( 'Synced', 'pattern-wrangler' );
				badgeClass = 'pattern-badge-synced';
			} else {
				badgeText = __( 'Unsynced', 'pattern-wrangler' );
				badgeClass = 'pattern-badge-unsynced';
			}

			const Badge = (
				<span className={ `pattern-badge ${ badgeClass }` }>{ badgeText }</span>
			);
			return (
				<>
					{ Badge }
					<div className="pattern-preview-wrapper">
						<div className="pattern-preview-iframe-wrapper">
							<a
								href={ previewUrl }
								className="pattern-preview-iframe-link"
								target="_blank"
								rel="noopener noreferrer"
								onClick={ ( e ) => {
									e.preventDefault();
									popPatternPreview( item );
								} }
								aria-hidden="true"
							>
								<div className="pattern-preview-iframe-scale-container">
									<iframe
										key={ `preview-${ item.id }` }
										src={ previewUrl }
										title={ `Preview: ${ item.title }` }
										style={ {
											backgroundColor: '#FFF',
											overflow: 'hidden',
											scrolling: 'no',
											marginTop: '32px',
										} }
										sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
										loading="lazy"
									>hi there</iframe>
								</div>
							</a>
						</div>
					</div>
				</>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'pattern-categories',
		label: __( 'Categories', 'pattern-wrangler' ),
		render: ( { item } ) => {
			return item?.categories?.map( ( category, index ) => {
				// If cat is object, get category.name, otherwise just use the category.
				const catName = typeof category === 'object' ? category.name : category;
				// Convert to title case.
				const titleCase = catName
					.split( ' ' )
					.map(
						( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase()
					)
					.join( ' ' );
				return (
					<>
						<span key={ category }>{ titleCase }</span>
						{ index < item.categories.length - 1 && ', ' }
					</>
				);
			} );
		},
		enableSorting: false,
		enableHiding: false,
		enableGlobalSearch: true,
		type: 'array',
	},
	{
		id: 'author',
		label: __( 'Author', 'pattern-wrangler' ),
		type: 'text',
		getValue: ( { item } ) => {
			return item.author;
		},
		enableSorting: false,
		enableHiding: true,
		enableGlobalSearch: false,
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
		callback: ( items ) => {
			console.log( 'Edit', items );
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
		callback: ( items ) => {
			console.log( 'Delete', items );
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
		callback: ( items ) => {
			console.log( 'Copy to Local', items );
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
		icon: 'edit',
		callback: ( items ) => {
			console.log( 'Disable Preview', items );
		},
		isEligible: ( pattern ) => {
			return true;
		},
		isPrimary: false,
		isDestructive: true,
	},
	{
		id: 'copy',
		label: __( 'Copy Pattern', 'pattern-wrangler' ),
		icon: 'edit',
		callback: ( items ) => {
			console.log( 'Copy', items );
		},
		isEligible: ( pattern ) => {
			return true;
		},
		isPrimary: false,
		isDestructive: false,
	},
	{
		id: 'export',
		label: __( 'Export', 'pattern-wrangler' ),
		icon: 'edit',
		callback: ( items ) => {
			console.log( 'Export', items );
		},
		isEligible: () => {
			return true;
		},
		isPrimary: false,
		isDestructive: false,
	},
];

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
					<div className="has-admin-container-body__content">
						loading...
					</div>
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
	const [ loadingFrame, setLoadingFrame ] = useState( null );

	const { setViewType } = useDispatch( PatternsViewStore );

	const [ view, setView ] = useState( {
		type: 'grid',
		search: '',
		previewSize: 'large',
		paginationInfo: {
			totalItems: patterns.length,
			totalPages: 0,
		},
		page: 1,
		perPage: 10,
		sort: {
			field: 'title',
			direction: 'asc',
		},
		titleField: 'title',
		mediaField: 'pattern-view-json',
		layout: defaultLayouts.grid.layout,
		fields: [ ...fields ],
	} );

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
	 * When a view is changed, we need to adjust the fields and showMedia based on the view type.
	 *
	 * @param {Object} newView The new view object.
	 */
	const onChangeView = ( newView ) => {
		// Adjust fields based on view type
		if ( newView.type === 'grid' ) {
			newView.fields = [ 'pattern-badge', 'pattern-categories', 'author' ];
			newView.showMedia = true;
		} else {
			newView.fields = [
				'pattern-badge',
				'pattern-view-json',
				'pattern-categories',
				'author',
			];
			newView.showMedia = false;
		}

		// Create query args object with view state.
		const changeQueryArgs = {
			page: parseInt( getQueryArgs( window.location.href ).paged ) || 1,
			per_page: newView.perPage,
			view_type: newView.type,
		};

		// Calculate new patterns based on pagination and current page.
		const patternsToShow = patterns.slice(
			( newView.page - 1 ) * changeQueryArgs.per_page,
			newView.page * changeQueryArgs.per_page
		);
		setPatternsDisplay( patternsToShow );
		setView( { ...newView, paginationInfo: {
			totalItems: patterns.length,
			totalPages: Math.ceil( patterns.length / newView.perPage ),
			page: changeQueryArgs.page + 1,
			perPage: changeQueryArgs.per_page,
		} } );

		// Only add search if it exists.
		if ( newView.search ) {
			queryArgs.search = newView.search;
		}

		// Add sort parameters if they exist.
		if ( newView.sort?.field ) {
			queryArgs.orderby = newView.sort.field;
			queryArgs.order = newView.sort.direction;
		}

		// Update URL without page reload using addQueryArgs.
		const newUrl = addQueryArgs( window.location.pathname, queryArgs );
		window.history.pushState( {}, '', newUrl );

		// Update the view state.
		//setView( newView );
	};

	useEffect( () => {
		if ( data && data.hasOwnProperty( 'patterns' ) ) {
			if ( data.patterns && ! patternsDisplay.length ) {
				setPatterns( data.patterns );
				if ( data.patterns !== patternsDisplay ) {
					// Calculate which patterns to show based off query and view information.
					const currentPage = parseInt( getQueryArgs( window.location.href ).page ) || 1;
					const patternsToShow = data.patterns.slice(
						( currentPage - 1 ) * view.perPage,
						currentPage * view.perPage
					);
					setPatternsDisplay( patternsToShow );
				}
			}
			if ( data.categories ) {
				// Find the index of the pattern-categories field.
				const fieldsIndex = fields.findIndex(
					( field ) => field.id === 'pattern-categories'
				);
				fields[ fieldsIndex ].elements = Object.values( data.categories ).map(
					( category ) => {
						return {
							label: category.label,
							value: category.slug,
						};
					}
				);
				view.fields = [ ...fields ];
				// Force view to re-render.
				setCategories( data.categories );
				setView( view );
				setLoading( false );
			}
		}
	}, [ data ] );

	if ( loading ) {
		return <>Loading...</>;
	}

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
					totalItems: patterns.length,
					totalPages: Math.ceil( patterns.length / view.perPage ),
				} }
				perPageSizes={ [ 10, 25, 50 ] }
				selection={ selectedItems }
				onChangeSelection={ setSelectedItems }
				defaultLayouts={ defaultLayouts }
				searchLabel={ __( 'Search Patterns', 'pattern-wrangler' ) }
			/>
		</div>
	);
};

export default PatternsGrid;
