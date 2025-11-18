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
	setPattern( patternId, patternTitle, patternCategories, patternCategorySlugs ) {
		return {
			type: 'SET_PATTERN',
			patternId,
			patternTitle,
			patternCategories,
			patternCategorySlugs,
		};
	},
	disablePatterns( patternIdsAndNonces ) {
		return {
			type: 'DISABLE_PATTERNS',
			patternIdsAndNonces,
		};
	},
	enablePatterns( patternIdsAndNonces ) {
		return {
			type: 'ENABLE_PATTERNS',
			patternIdsAndNonces,
		};
	},
	setCategory( categoryId, categoryTermData ) {
		return {
			type: 'SET_CATEGORY',
			categoryId,
			categoryTermData,
		};
	},
	upsertCategory( categoryData ) {
		return {
			type: 'UPSERT_CATEGORY',
			categoryData,
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
			case 'UPSERT_CATEGORY':
				const { categoryData } = action;

				const updatedCategories = { ...categoryData, ...state.categories };

				console.log( 'updatedCategories', updatedCategories );

				return {
					...state,
					categories: updatedCategories,
					data: {
						...state.data,
						categories: updatedCategories,
					},
				};
			case 'SET_PATTERN':
				const { patternCategories, patternCategorySlugs } = action;
				const newPatterns = state.patterns.map( ( pattern ) => {
					if ( pattern.id === action.patternId ) {
						return {
							...pattern,
							...{ title: action.patternTitle, categories: patternCategories, categorySlugs: patternCategorySlugs },
						};
					}
					return pattern;
				} );
				return {
					...state,
					patterns: newPatterns,
					data: {
						...state.data,
						patterns: newPatterns,
					},
				};
			case 'SET_CATEGORY':
				const newCategories = state.categories.map( ( category ) => {
					if ( category.id === action.categoryId ) {
						return { ...category, ...action.categoryTermData };
					}
					return category;
				} );
				return {
					...state,
					categories: newCategories,
					data: {
						...state.data,
						categories: newCategories,
					},
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
			case 'DISABLE_PATTERNS':
				const { patternIdsAndNonces: disabledPatternIdsAndNonces } = action;
				// Mark matching pattern IDs as disabled.
				const updatedPatterns = [];
				state.patterns.forEach( ( pattern ) => {
					if ( disabledPatternIdsAndNonces.some( ( patternIdAndNonce ) => patternIdAndNonce.id === pattern.id ) ) {
						pattern.isDisabled = true;
					}
					updatedPatterns.push( pattern );
				} );

				return {
					...state,
					patterns: [ ...updatedPatterns ],
					data: {
						...state.data,
						patterns: [ ...updatedPatterns ],
					},
				};
			case 'ENABLE_PATTERNS':
				const { patternIdsAndNonces: enabledPatternIdsAndNonces } = action;
				const updatedEnabledPatterns = [];
				state.patterns.forEach( ( pattern ) => {
					if ( enabledPatternIdsAndNonces.some( ( patternIdAndNonce ) => patternIdAndNonce.id === pattern.id ) ) {
						pattern.isDisabled = false;
					}
					updatedEnabledPatterns.push( pattern );
				} );
				return {
					...state,
					patterns: [ ...updatedEnabledPatterns ],
					data: {
						...state.data,
						patterns: [ ...updatedEnabledPatterns ],
					},
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
