import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews/wp';
import { Button, Menu } from '@wordpress/components';

const patterns = [
	{
		id: 1,
		title: 'Pattern 1',
		description: 'This is a pattern',
		patternCategories: [
			{ value: 'header', label: __( 'Header', 'dlx-pattern-wrangler' ) },
			{ value: 'footer', label: __( 'Footer', 'dlx-pattern-wrangler' ) },
		],
		author: 'John Doe',
		localPattern: true,
		registered: false,
		enabled: true,
		synced: false,
		previewJson: '',
	},
	{
		id: 2,
		title: 'Pattern 2',
		description: 'This is a pattern',
		patternCategories: [
			{ value: 'header', label: __( 'Header', 'dlx-pattern-wrangler' ) },
			{ value: 'footer', label: __( 'Footer', 'dlx-pattern-wrangler' ) },
		],
		author: 'Jane Doe',
		localPattern: false,
		registered: true,
		enabled: true,
		synced: true,
		previewJson: '',
	},
];
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
			return pattern.localPattern;
		},
		isPrimary: true,
	},
	{
		id: 'delete',
		label: __( 'Delete Pattern', 'dlx-pattern-wrangler' ),
		icon: 'trash',
		isEligible: ( pattern ) => {
			// Pattern must be local.
			return pattern.localPattern;
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
			return pattern.localPattern;
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
	return (
		<div className="dlx-patterns-view-container">
			<DataViews
				data={ patterns }
				fields={ fields }
				actions={ actions }
				label={ __( 'Patterns', 'dlx-pattern-wrangler' ) }
				view={ view }
				onChangeView={ ( newView ) => {
					setView( newView );
				} }
				paginationInfo={ {
					totalItems: patterns.length,
					totalPages: 1,
				} }
				selection={ selectedItems }
				onChangeSelection={ setSelectedItems }
				isLoading={ false }
			/>
		</div>
	);
};

export default PatternsView;
