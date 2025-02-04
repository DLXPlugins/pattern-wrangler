import { createReduxStore, register } from '@wordpress/data';
const DEFAULT_STATE = {
	viewType: 'grid',
};
const actions = {
	setViewType( viewType ) {
		return {
			type: 'SET_VIEW_TYPE',
			viewType,
		};
	},
};

const PatternsViewStore = createReduxStore(
	'dlxplugins/pattern-wrangler/patterns',
	{
		reducer( state = DEFAULT_STATE, action ) {
			switch ( action.type ) {
				case 'SET_VIEW_TYPE':
					return {
						...state,
						viewType: action.viewType,
					};
				default:
					return state;
			}
		},
		actions,
		selectors: {
			/**
			 * Get the view type from the patterns store.
			 *
			 * @param {Object} state The current state of the patterns store.
			 * @return {string} The view type.
			 */
			getViewType( state ) {
				return state.viewType;
			},
		},
	}
);

register( PatternsViewStore );

export default PatternsViewStore;
