/**
 * Effective pattern configuration for the current site.
 *
 * @return {string} Pattern configuration slug.
 */
const getEffectivePatternConfiguration = () => {
	if ( dlxEnhancedPatternsView.effectivePatternConfiguration ) {
		return dlxEnhancedPatternsView.effectivePatternConfiguration;
	}

	return (
		dlxEnhancedPatternsView.networkOptions?.patternConfiguration ||
		'local_only'
	);
};

/**
 * Check if a pattern can be duplicated.
 *
 * @param {Object} pattern The pattern object.
 * @return {boolean} True if the pattern can be duplicated, false otherwise.
 */
export const canDuplicatePattern = ( pattern ) => {
	if (
		dlxEnhancedPatternsView.isMultisite &&
		! dlxEnhancedPatternsView.isNetworkSource
	) {
		return (
			pattern.isLocal &&
			! pattern.disabled &&
			( ( pattern.network && 'hybrid' === pattern.patternConfiguration ) ||
				'local_only' === pattern.patternConfiguration ||
				! pattern.network )
		);
	}
	return pattern.isLocal && ! pattern.isDisabled;
};

/**
 * Check if patterns can be added.
 *
 * @return {boolean} True if patterns can be added, false otherwise.
 */
export const canAddPatterns = () => {
	if (
		dlxEnhancedPatternsView.isMultisite &&
		! dlxEnhancedPatternsView.isNetworkSource
	) {
		const configuration = getEffectivePatternConfiguration();
		return 'hybrid' === configuration || 'local_only' === configuration;
	}
	return true;
};
/**
 * Check if patterns can be imported.
 *
 * @return {boolean} True if patterns can be imported, false otherwise.
 */
export const canImportPatterns = () => {
	if (
		dlxEnhancedPatternsView.isMultisite &&
		! dlxEnhancedPatternsView.isNetworkSource
	) {
		const configuration = getEffectivePatternConfiguration();
		return 'hybrid' === configuration || 'local_only' === configuration;
	}
	return true;
};

/**
 * Check if a pattern can be deleted.
 *
 * @param {Object} pattern The pattern object.
 * @return {boolean} True if the pattern can be deleted, false otherwise.
 */
export const canDeletePattern = ( pattern ) => {
	if (
		dlxEnhancedPatternsView.isMultisite &&
		! dlxEnhancedPatternsView.isNetworkSource
	) {
		return (
			pattern.isLocal &&
			! pattern.network &&
			( 'hybrid' === pattern.patternConfiguration ||
				'local_only' === pattern.patternConfiguration )
		);
	}
	return pattern.isLocal;
};

/**
 * Check if a pattern can be edited.
 *
 * @param {Object} pattern The pattern object.
 * @return {boolean} True if the pattern can be edited, false otherwise.
 */
export const canEditPattern = ( pattern ) => {
	if (
		dlxEnhancedPatternsView.isMultisite &&
		! dlxEnhancedPatternsView.isNetworkSource
	) {
		return (
			pattern.isLocal &&
			! pattern.network &&
			( 'hybrid' === pattern.patternConfiguration ||
				'local_only' === pattern.patternConfiguration )
		);
	}
	return pattern.isLocal;
};

/**
 * Check if a pattern can be disabled.
 *
 * @param {Object} pattern The pattern object.
 * @return {boolean} True if the pattern can be disabled, false otherwise.
 */
export const canDisablePattern = ( pattern ) => {
	if (
		dlxEnhancedPatternsView.isMultisite &&
		! dlxEnhancedPatternsView.isNetworkSource
	) {
		return (
			! pattern.isLocal &&
			! pattern.isDisabled &&
			( 'hybrid' === pattern.patternConfiguration ||
				'local_only' === pattern.patternConfiguration )
		);
	}
	return ! pattern.isLocal && ! pattern.isDisabled;
};
