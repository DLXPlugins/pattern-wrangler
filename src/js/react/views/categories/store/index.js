import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

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
					path: addQueryArgs( '/dlxplugins/pattern-wrangler/v1/categories/all/', {
						nonce: dlxEnhancedCategoriesView.getNonce,
					} ),
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
};

const categoriesStore = createReduxStore( 'dlxplugins/pattern-wrangler/categories', {
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

				// Sort by label.
				const sortedCategories = Object.values( currentCategories ).sort( ( a, b ) => a.label.localeCompare( b.label ) );
				return {
					...state,
					categories: sortedCategories,
				};
			case 'UPDATE_CATEGORY':
				return {
					...state,
					categories: state.categories.map( ( category ) => category.id === action.category.id ? action.category : category ),
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
} );

register( categoriesStore );

export default categoriesStore;
