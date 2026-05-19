/**
 * Effective pattern configuration for the current site.
 *
 * @param {Object} viewGlobals Localized view globals.
 * @return {string} Pattern configuration slug.
 */
const getEffectivePatternConfiguration = ( viewGlobals ) => {
	if ( viewGlobals.effectivePatternConfiguration ) {
		return viewGlobals.effectivePatternConfiguration;
	}

	return viewGlobals.networkOptions?.patternConfiguration || 'local_only';
};

/**
 * Check if local pattern categories can be added.
 *
 * @return {boolean} True if categories can be added, false otherwise.
 */
export const canAddCategories = () => {
	const viewGlobals = dlxEnhancedCategoriesView;

	if ( viewGlobals.isMultisite && ! viewGlobals.isNetworkSource ) {
		const configuration = getEffectivePatternConfiguration( viewGlobals );
		return (
			'hybrid' === configuration ||
			'local_only' === configuration ||
			'custom' === configuration
		);
	}

	return true;
};

export default canAddCategories;
