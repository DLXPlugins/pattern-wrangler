import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews/wp';
import { Button, Menu } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useQuery } from '@tanstack/react-query';
import { addQueryArgs } from '@wordpress/url';

const defaultLayout = {
	table: {
		layout: {
			primaryField: 'pattern-title',
		},
	},
	grid: {
		layout: {
			primaryField: 'pattern-title',
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
		getValue: ( { item } ) => item.previewJson,
		render: ( { item } ) => {
			return <span>{ item.previewJson }</span>;
		},
		enableSorting: false,
	},
	{
		id: 'pattern-categories',
		label: __( 'Categories', 'dlx-pattern-wrangler' ),
		getValue: ( { item } ) => item.category,
		render: ( { item } ) => {
			return <span>{ item.category }</span>;
		},
		enableSorting: false,
	},
	{
		id: 'author',
		label: __( 'Author', 'dlx-pattern-wrangler' ),
		type: 'text',
		getValue: ( { item } ) => item.author,
		render: ( { item } ) => {
			return <span>{ item.author }</span>;
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
const patternCategories = [
	{ value: 'header', label: __( 'Header', 'dlx-pattern-wrangler' ) },
	{ value: 'footer', label: __( 'Footer', 'dlx-pattern-wrangler' ) },
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

	// Go through each pattern and get the preview image.
	// response.patterns.forEach( ( pattern ) => {
	// 	if ( ! pattern.preview ) {
	// 		fetchPreviewImage( pattern );
	// 	}
	// } );
	return response;
};

const fetchPreviewImage = async( pattern ) => {
	const response = await apiFetch( {
		path: `/dlxplugins/pattern-wrangler/v1/patterns/get_preview/`,
		method: 'POST',
		data: {
			content: pattern.content,
			slug: pattern.slug,
			title: pattern.title,
			id: pattern.id,
			...pattern,
		},
	} );
	return response;
};

const PatternsView = () => {
	const [ selectedItems, setSelectedItems ] = useState( [] );
	const [ view, setView ] = useState( {
		type: 'grid',
		search: '',
		perPage: 10,
		page: 1,
		filters: [
			{
				field: 'pattern-categories',
				operator: 'in',
				value: patternCategories,
			},
		],
		sort: {
			field: 'pattern-title',
			direction: 'asc',
		},
		titleField: 'pattern-title',
		mediaField: 'pattern-view-json',
		fields: [ 'pattern-view-json', 'pattern-categories', 'author' ],
		layout: defaultLayout.grid.layout,
	} );

	const {
		data: { patterns = [], categories = [] } = {},
		isLoading,
		error,
	} = useQuery( {
		queryKey: [ 'all-patterns', view.perPage, view.page, view.search, view.sort ],
		queryFn: () =>
			fetchPatterns( {
				perPage: view.perPage,
				page: view.page,
				search: view.search,
				sort: view.sort,
			} ),
	} );

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
				onChangeView={ setView }
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
