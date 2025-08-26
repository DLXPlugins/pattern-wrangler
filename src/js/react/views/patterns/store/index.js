import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const DEFAULT_STATE = {
	patterns: [],
	categories: null,
	data: null,
	loading: false,
	error: null,
};

const actions = {
	setPatterns( patterns ) {
		return {
			type: 'SET_PATTERNS',
			patterns,
		};
	},
	setCategories( categories ) {
		return {
			type: 'SET_CATEGORIES',
			categories,
		};
	},
	setData( data ) {
		return {
			type: 'SET_DATA',
			data,
		};
	},
	setAllData( patterns, categories, data ) {
		return {
			type: 'SET_ALL_DATA',
			patterns,
			categories,
			data,
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
	fetchData() {
		return async( { dispatch } ) => {
			try {
				dispatch( actions.setLoading( true ) );
				dispatch( actions.setError( null ) );

				const response = await apiFetch( {
					path: addQueryArgs( '/dlxplugins/pattern-wrangler/v1/patterns/all/', {
						nonce: dlxEnhancedPatternsView.getNonce,
					} ),
					method: 'GET',
				} );

				if ( response ) {
					dispatch( actions.setAllData( response.patterns, response.categories, response ) );
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
};

const patternsStore = createReduxStore( 'dlxplugins/pattern-wrangler/patterns', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_ALL_DATA':
				return {
					...state,
					patterns: action.patterns,
					categories: action.categories,
					data: action.data,
					loading: false,
					error: null,
				};
			case 'SET_PATTERNS':
				return {
					...state,
					patterns: action.patterns,
				};
			case 'SET_CATEGORIES':
				return {
					...state,
					categories: action.categories,
				};
			case 'SET_DATA':
				return {
					...state,
					data: action.data,
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
			default:
				return state;
		}
	},
	actions,
	selectors: {
		getPatterns( state ) {
			return state.patterns;
		},
		getCategories( state ) {
			return state.categories;
		},
		getData( state ) {
			return state.data;
		},
		getLoading( state ) {
			return state.loading;
		},
		getError( state ) {
			return state.error;
		},
	},
} );

register( patternsStore );

export default patternsStore;
