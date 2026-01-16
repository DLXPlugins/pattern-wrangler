import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs, cleanForSlug } from '@wordpress/url';

const DEFAULT_STATE = {
	categories: [],
	loading: true,
	error: null,
	doNotShowAgain: dlxEnhancedCategoriesView.doNotShowAgain || false,
};

const actions = {
	setCategories( categories ) {
		return {
			type: 'SET_CATEGORIES',
			categories,
		};
	},
	setLoading( loading ) {
		return {
			type: 'SET_LOADING',
			loading,
		};
	},
	setError( error ) {
		return {
			type: 'SET_ERROR',
			error,
		};
	},
	setDoNotShowAgain( doNotShowAgain ) {
		return {
			type: 'SET_DO_NOT_SHOW_AGAIN',
			doNotShowAgain,
		};
	},
	fetchData() {
		return async( { dispatch } ) => {
			try {
				dispatch( actions.setLoading( true ) );
				dispatch( actions.setError( null ) );

				const response = await apiFetch( {
					path: addQueryArgs(
						'/dlxplugins/pattern-wrangler/v1/categories/all/',
						{
							nonce: dlxEnhancedCategoriesView.getNonce,
						}
					),
					method: 'GET',
				} );

				if ( response ) {
					dispatch( actions.setCategories( response.categories ) );
				} else {
					dispatch( actions.setError( 'Failed to fetch data' ) );
				}
			} catch ( error ) {
				dispatch( actions.setError( error.message || 'Network error occurred' ) );
			} finally {
				dispatch( actions.setLoading( false ) );
			}
		};
	},
	addCategory( category ) {
		return {
			type: 'ADD_CATEGORY',
			category,
		};
	},
	updateCategory( category ) {
		return {
			type: 'UPDATE_CATEGORY',
			category,
		};
	},
	updateRegisteredCategory( category ) {
		return {
			type: 'UPDATE_REGISTERED_CATEGORY',
			category,
		};
	},
};

const categoriesStore = createReduxStore(
	'dlxplugins/pattern-wrangler/categories',
	{
		reducer( state = DEFAULT_STATE, action ) {
			switch ( action.type ) {
				case 'SET_CATEGORIES':
					return {
						...state,
						categories: action.categories,
					};
				case 'SET_LOADING':
					return {
						...state,
						loading: action.loading,
					};
				case 'SET_ERROR':
					return {
						...state,
						error: action.error,
					};
				case 'SET_DO_NOT_SHOW_AGAIN':
					return {
						...state,
						doNotShowAgain: action.doNotShowAgain,
					};
				case 'ADD_CATEGORY':
					const currentCategories = { ...state.categories };
					currentCategories[ action.category.slug ] = action.category;

					// Sort by label while preserving slug keys.
					const sortedCategories = Object.fromEntries(
						Object.entries( currentCategories ).sort( ( [ , a ], [ , b ] ) =>
							a.label.localeCompare( b.label )
						)
					);
					return {
						...state,
						categories: sortedCategories,
					};
				case 'UPDATE_CATEGORY':
					const currentUpdatedCategories = { ...state.categories };

					// Retrieve by ID and get the old slug.
					const categorySlug = Object.values( currentUpdatedCategories ).find( ( category ) => category.id === action.category.id )?.slug;
					// Unset the category with the old slug as the slug might've changed.
					delete currentUpdatedCategories[ categorySlug ];

					// Set the new category with the new slug.
					currentUpdatedCategories[ action.category.slug ] = action.category;

					// Sort by label while preserving slug keys.
					const sortedUpdatedCategories = Object.fromEntries(
						Object.entries( currentUpdatedCategories ).sort(
							( [ , a ], [ , b ] ) => a.label.localeCompare( b.label )
						)
					);

					return {
						...state,
						categories: sortedUpdatedCategories,
					};
				case 'UPDATE_REGISTERED_CATEGORY':
					const currentUpdatedRegisteredCategories = { ...state.categories };

					// Retrieve by ID and get the old slug.
					let registeredCategorySlug = Object.values( currentUpdatedRegisteredCategories ).find( ( category ) => category.slug === action.category.slug && category.registered )?.slug;

					registeredCategorySlug = cleanForSlug( 'registered-' + registeredCategorySlug );

					delete currentUpdatedRegisteredCategories[ registeredCategorySlug ];

					// Set the new category with the new slug.
					currentUpdatedRegisteredCategories[ registeredCategorySlug ] = action.category;

					// Sort by label while preserving slug keys.
					const sortedUpdatedRegisteredCategories = Object.fromEntries(
						Object.entries( currentUpdatedRegisteredCategories ).sort(
							( [ , a ], [ , b ] ) => a.label.localeCompare( b.label )
						)
					);

					return {
						...state,
						categories: sortedUpdatedRegisteredCategories,
					};
				default:
					return state;
			}
		},
		actions,
		selectors: {
			getCategories( state ) {
				return state.categories;
			},
			getRegisteredCategories( state ) {
				return state.registeredCategories;
			},
			getLocalCategories( state ) {
				return state.localCategories;
			},
			getLoading( state ) {
				return state.loading;
			},
			getError( state ) {
				return state.error;
			},
			getDoNotShowAgain( state ) {
				return state.doNotShowAgain;
			},
		},
	}
);

register( categoriesStore );

export default categoriesStore;
