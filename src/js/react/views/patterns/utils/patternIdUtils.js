/**
 * Pattern id helpers for the patterns view (local numeric IDs vs registered string slugs).
 *
 * Aligns with PHP `DLXPlugins\PatternWrangler\Functions::get_sanitized_pattern_id` character rules.
 */

/**
 * Return a canonical value for strict equality checks, or '' if invalid.
 *
 * Positive integer post IDs normalize to a Number. Registered pattern names keep as string.
 *
 * @param {*} id Raw pattern id from REST, Fancybox URL, or events.
 * @return {number|string} Canonical id, or '' when invalid.
 */
export function canonicalPatternId( id ) {
	if ( null === id || undefined === id ) {
		return '';
	}
	if ( 'number' === typeof id ) {
		if ( Number.isFinite( id ) && id > 0 && Math.floor( id ) === id ) {
			return id;
		}
		return '';
	}
	const s = String( id ).trim();
	if ( '' === s ) {
		return '';
	}
	if ( /^\d+$/.test( s ) ) {
		const n = parseInt( s, 10 );
		return Number.isFinite( n ) && n > 0 ? n : '';
	}
	if ( /^[a-zA-Z0-9/_-]+$/.test( s ) ) {
		return s;
	}
	return '';
}

/**
 * Whether two pattern ids refer to the same pattern (handles 123 vs "123" vs slug).
 *
 * @param {*} a First id.
 * @param {*} b Second id.
 * @return {boolean} True when both canonicalize to the same value and neither is invalid.
 */
export function patternIdsEqual( a, b ) {
	return canonicalPatternId( a ) === canonicalPatternId( b );
}
