import { useState, useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DataViews } from '@wordpress/dataviews/wp';
import {
	BlockPreview,
	__experimentalUseBlockPreview as useBlockPreview,
	BlockEditorProvider,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addQueryArgs } from '@wordpress/url';
import { parse } from '@wordpress/block-serialization-default-parser';
import { registerCoreBlocks } from '@wordpress/block-library';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

const defaultLayout = {
	table: {
		layout: {
			primaryField: 'pattern-title',
		},
	},
	grid: {
		layout: {
			primaryField: 'pattern-title',
			columns: 2,
			columnGap: '24px',
			rowGap: '24px',
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
		getValue: ( { item } ) => item.content,
		render: ( { item } ) => {
			// Generate preview URL instead of using srcDoc
			const previewUrl = item?.id
				? `${ ajaxurl }/?action=dlxpw_pattern_preview&pattern_id=${
					item.id
				  }&content=${ JSON.stringify( item.content ) }`
				: '';

			return (
				<div className="pattern-preview-wrapper">
					<iframe
						key={ `preview-${ item.id }` }
						src={ previewUrl }
						title={ `Preview: ${ item.title }` }
						style={ {
							width: item.viewportWidth + 'px' || '100%',
							height: '400px',
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

/**
 * Transform the block format to the correct format.
 *
 * @param {Object} block The block to transform.
 * @return {Object} The transformed block.
 */
const transformBlockFormat = ( block ) => {
	if ( ! block ) {
		return null;
	}

	return {
		clientId: block.clientId || '',
		name: block.blockName,
		attributes: block.attrs || {},
		innerBlocks: Array.isArray( block.innerBlocks )
			? block.innerBlocks.map( transformBlockFormat )
			: [],
		isValid: true,
	};
};

// Add this function to get default settings
const getDefaultSettings = () => {
	return {
		iso: true,
		styles: [],
		__experimentalFeatures: {},
		__experimentalReusableBlocks: [],
		alignWide: true,
		supportsLayout: true,
	};
};

const PatternsView = () => {
	const queryClient = useQueryClient();
	const [ selectedItems, setSelectedItems ] = useState( [] );
	const [ patterns, setPatterns ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );

	const [ view, setView ] = useState( {
		type: 'grid',
		search: '',
		perPage: 10,
		previewSize: 'large',
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

	// Memoize patterns that need HTML updates
	const patternsNeedingHtml = useMemo( () => {
		if ( ! data?.patterns ) {
			return [];
		}
		return data.patterns.filter( ( pattern ) => ! pattern.html );
	}, [ data?.patterns ] );

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
