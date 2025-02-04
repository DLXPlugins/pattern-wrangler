import { useState, useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews/wp';
import apiFetch from '@wordpress/api-fetch';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addQueryArgs, getQueryArgs } from '@wordpress/url';
import { dispatch, select, useDispatch } from '@wordpress/data';
import PatternsViewStore from '../store';

const defaultLayout = {
	table: {
		layout: {
			titleField: 'pattern-title',
			showMedia: false,
		},
	},
	grid: {
		layout: {
			titleField: 'pattern-title',
			mediaField: 'pattern-view-json',
			columns: 2,
			columnGap: '24px',
			rowGap: '24px',
		},
	},
	list: {
		layout: {
			titleField: 'pattern-title',
			showMedia: false,
		},
	},
};
const fields = [
	{
		id: 'pattern-title',
		label: __( 'Title', 'dlx-pattern-wrangler' ),
		render: ( { item } ) => {
			return <span>{ item.title }</span>;
		},
		enableSorting: true,
	},
	{
		id: 'pattern-view-json',
		label: __( 'Preview', 'dlx-pattern-wrangler' ),
		getValue: ( { item } ) => {
			// Generate preview URL instead of using srcDoc
			// todo: secure with nonce.
			const previewUrl = item?.id
				? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${ item.id }`
				: '';
			return (
				<div className="pattern-preview-wrapper">
					<iframe
						key={ `preview-${ item.id }` }
						src={ previewUrl }
						title={ `Preview: ${ item.title }` }
						style={ {
							width: item.viewportWidth + 'px' || '100%',
							height: '100%',
							aspectRatio: '16/9',
							border: '1px solid #ddd',
							borderRadius: '4px',
							backgroundColor: '#fff',
							overflow: 'hidden',
							scrolling: 'no',
						} }
						sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
						loading="lazy"
					/>
				</div>
			);
		},
		isVisible: ( newView ) => {
			return false;
		},
		enableSorting: false,
	},
	{
		id: 'pattern-categories',
		label: __( 'Categories', 'dlx-pattern-wrangler' ),
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
	},
	{
		id: 'author',
		label: __( 'Author', 'dlx-pattern-wrangler' ),
		type: 'text',
		getValue: ( { item } ) => {
			return item.author;
		},
	},
];
const actions = [
	{
		id: 'edit',
		label: __( 'Edit', 'dlx-pattern-wrangler' ),
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
		label: __( 'Delete Pattern', 'dlx-pattern-wrangler' ),
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
		id: 'copy',
		label: __( 'Copy Pattern', 'dlx-pattern-wrangler' ),
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
		label: __( 'Export', 'dlx-pattern-wrangler' ),
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

const fetchPatterns = async( { perPage, page, search, sort } ) => {
	const response = await apiFetch( {
		path: addQueryArgs( '/dlxplugins/pattern-wrangler/v1/patterns/all/', {
			perPage,
			page,
			search,
			orderby: sort.field,
			order: sort.direction,
		} ),
		method: 'GET',
	} );

	return response;
};

const PatternsView = () => {
	const queryClient = useQueryClient();
	const [ selectedItems, setSelectedItems ] = useState( [] );
	const [ patterns, setPatterns ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );

	const { setViewType } = useDispatch( PatternsViewStore );

	const [ view, setView ] = useState( {
		type: 'grid',
		search: '',
		perPage: 10,
		previewSize: 'large',
		page: 1,
		sort: {
			field: 'pattern-title',
			direction: 'asc',
		},
		titleField: 'pattern-title',
		mediaField: 'pattern-view-json',
		fields: [ 'pattern-categories', 'author' ],
		layout: defaultLayout.grid.layout,
	} );

	const { data, isLoading, error } = useQuery( {
		queryKey: [ 'all-patterns', view.perPage, view.page, view.search, view.sort ],
		queryFn: () =>
			fetchPatterns( {
				perPage: view.perPage,
				page: view.page,
				search: view.search,
				sort: view.sort,
			} ),
	} );

	/**
	 * When a view is changed, we need to adjust the fields and showMedia based on the view type.
	 *
	 * @param {Object} newView The new view object.
	 */
	const onChangeView = ( newView ) => {
		// Adjust fields based on view type
		if ( newView.type === 'grid' ) {
			newView.fields = [ 'pattern-categories', 'author' ];
			newView.showMedia = true;
		} else {
			newView.fields = [ 'pattern-view-json', 'pattern-categories', 'author' ];
			newView.showMedia = false;
		}

		// Create query args object with view state.
		const queryArgs = {
			page: getQueryArgs( window.location.href ).page,
			paged: newView.page,
			per_page: newView.perPage,
			view_type: newView.type,
		};

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
		setView( newView );
	};

	// Add effect to initialize view from URL params.
	useEffect( () => {
		// Get query args from current URL.
		const queryArgs = getQueryArgs( window.location.href );

		// Update initial view state from URL parameters.
		setView( ( prevView ) => ( {
			...prevView,
			type: queryArgs.view_type || prevView.type,
			page: parseInt( queryArgs.page ) || prevView.page,
			perPage: parseInt( queryArgs.per_page ) || prevView.perPage,
			search: queryArgs.search || prevView.search,
			sort: {
				field: queryArgs.orderby || prevView.sort.field,
				direction: queryArgs.order || prevView.sort.direction,
			},
			showMedia: 'grid' === queryArgs.view_type ? true : false,
		} ) );
		if ( queryArgs.view_type ) {
			setViewType( queryArgs.view_type );
		}
	}, [] ); // Run once on component mount.

	useEffect( () => {
		if ( data && data.hasOwnProperty( 'patterns' ) ) {
			if ( data.patterns ) {
				if ( data.patterns !== patterns ) {
					setPatterns( data.patterns );
				}
			}
			if ( data.categories ) {
				setCategories( data.categories );
			}
		}
	}, [ data ] );

	if ( error ) {
		return (
			<div className="dlx-patterns-error">
				{ __( 'Error loading patterns:', 'dlx-pattern-wrangler' ) } { error.message }
			</div>
		);
	}

	return (
		<div className="dlx-patterns-view-container">
			<DataViews
				data={ patterns }
				fields={ fields }
				actions={ actions }
				label={ __( 'Patterns', 'dlx-pattern-wrangler' ) }
				view={ view }
				onChangeView={ onChangeView }
				paginationInfo={ {
					totalItems: patterns.length,
					totalPages: 1, // Would come from API headers
				} }
				selection={ selectedItems }
				onChangeSelection={ setSelectedItems }
				isLoading={ isLoading }
			/>
		</div>
	);
};

export default PatternsView;
