/**
 * Patterns Library default view presets (user meta) merged into URL query args.
 */

export const PATTERN_FILTER_QUERY_KEYS = [
	'patternType',
	'patternStatus',
	'patternLocalStatus',
	'patternRegisteredStatus',
	'patternLocalRegisteredStatus',
];

/**
 * Whether the URL already specifies at least one pattern filter param.
 *
 * @param {Object} queryArgs Parsed query args.
 * @return {boolean} True if explicit.
 */
export function urlHasExplicitPatternFilters( queryArgs ) {
	if ( ! queryArgs || typeof queryArgs !== 'object' ) {
		return false;
	}
	return PATTERN_FILTER_QUERY_KEYS.some( ( key ) =>
		Object.prototype.hasOwnProperty.call( queryArgs, key )
	);
}

/**
 * Apply a saved preset slug when the URL has no explicit pattern filter keys.
 *
 * @param {Object} queryArgs Parsed query args from the current URL.
 * @param {string} slug      Preset slug from localized script.
 * @return {Object} Query args for getNormalizedStatusFilters.
 */
export function mergePresetIntoQueryArgs( queryArgs, slug ) {
	const base = { ...queryArgs };

	if ( urlHasExplicitPatternFilters( base ) ) {
		return base;
	}

	switch ( slug ) {
		case 'all_local':
			base.patternType = 'local';
			base.patternStatus = 'both';
			base.patternLocalStatus = 'published';
			break;
		case 'synced_local':
			base.patternType = 'local';
			base.patternStatus = 'synced';
			base.patternLocalStatus = 'published';
			break;
		case 'unsynced_local':
			base.patternType = 'local';
			base.patternStatus = 'unsynced';
			base.patternLocalStatus = 'published';
			break;
		case 'registered':
			base.patternType = 'registered';
			base.patternRegisteredStatus = 'unpaused';
			break;
		case 'all':
		default:
			break;
	}

	return base;
}
