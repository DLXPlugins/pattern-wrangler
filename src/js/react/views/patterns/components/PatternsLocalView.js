/* eslint-disable react/no-unknown-property */
import { useState, useMemo, useEffect, useRef } from '@wordpress/element';
import { useResizeObserver, useRefEffect } from '@wordpress/compose';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useQuery } from '@tanstack/react-query';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews';
import apiFetch from '@wordpress/api-fetch';
import { useRouter } from '@tanstack/react-router';
import { addQueryArgs, getQueryArgs } from '@wordpress/url';
import { dispatch, select, useDispatch } from '@wordpress/data';
import PatternsViewStore from '../store';

const popPatternPreview = ( item ) => {
	const viewportWidth = item.viewportWidth || 1200;

	const previewUrl = item?.id
		? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${ item.id }&viewport_width=${ viewportWidth }`
		: '';

	Fancybox.show( [ {
		src: previewUrl,
		caption: item.title,
		type: 'iframe',
		zoom: true,
		compact: true,
		width: '80%',
	} ] );
};

const defaultLayouts = {
	grid: {
		layout: {
			titleField: 'pattern-title',
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
				? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${ item.id }#pattern-preview-content`
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
		id: 'delete',
		label: __( 'Preview Pattern', 'dlx-pattern-wrangler' ),
		icon: 'edit',
		isEligible: ( pattern ) => {
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
		label: __( 'Copy to Local Pattern', 'dlx-pattern-wrangler' ),
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
		label: __( 'Disable Pattern', 'dlx-pattern-wrangler' ),
		icon: 'edit',
		callback: ( items ) => {
			console.log( 'Disable Preview', items );
		},
		isEligible: ( pattern ) => {
			return ! pattern.isLocal;
		},
		isPrimary: false,
		isDestructive: false,
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

// Get query args from current URL.
const queryArgs = getQueryArgs( window.location.href );

const PatternsLocalView = () => {
	const [ selectedItems, setSelectedItems ] = useState( [] );
	const [ patterns, setPatterns ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );

	const { setViewType } = useDispatch( PatternsViewStore );

	const fields = useMemo( () => [
		{
			id: 'pattern-title',
			label: __( 'Title', 'dlx-pattern-wrangler' ),
			render: ( { item } ) => {
				return <span>{ item.title }</span>;
			},
			enableSorting: true,
			enableHiding: false,
			enableGlobalSearch: true,
		},
		{
			id: 'pattern-view-json',
			label: __( 'Preview', 'dlx-pattern-wrangler' ),
			getValue: ( { item } ) => {
				const viewportWidth = item.viewportWidth || 1200;

				const previewUrl = item?.id
					? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${ item.id }&viewport_width=${ viewportWidth }`
					: '';
				return (
					<div className="pattern-preview-wrapper">
						<div className="pattern-preview-iframe-wrapper">
							<a
								href={ previewUrl }
								className="pattern-preview-iframe-link"
								target="_blank" rel="noopener noreferrer" onClick={ ( e ) => {
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
										border: '1px solid #ddd',
										borderRadius: '4px',
										backgroundColor: '#fff',
										overflow: 'hidden',
										scrolling: 'no',
									} }
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
									loading="lazy"
								>
								</iframe>
							</div>
							</a>
						</div>
					</div>
				);
			},
			enableSorting: false,
			enableHiding: false,
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
			enableHiding: true,
		},
		{
			id: 'author',
			label: __( 'Author', 'dlx-pattern-wrangler' ),
			type: 'text',
			getValue: ( { item } ) => {
				return item.author;
			},
			enableSorting: false,
			enableHiding: true,
		},
	], [ view ] );

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
		layout: defaultLayouts.grid.layout,
		fields: [ ...fields ],
		viewConfigOptions: {},
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
				defaultLayouts={ defaultLayouts }
				searchLabel={ __( 'Search Patterns', 'dlx-pattern-wrangler' ) }
			/>``
		</div>
	);
};

export default PatternsLocalView;
