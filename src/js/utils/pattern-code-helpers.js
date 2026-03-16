/**
 * Shared helpers for pattern shortcode, PHP, and Synced Pattern Popups code generation.
 * Used by Pattern Get Code modal and the Pattern Code sidebar panel.
 */

/**
 * Get the pattern shortcode. Adds a site_id parameter if the site is multisite.
 *
 * @param {string}  slug        Pattern slug (post_name).
 * @param {number}  siteId      Site ID for multisite.
 * @param {boolean} isMultisite Whether the site is multisite.
 * @return {string} The pattern shortcode.
 */
export function getPatternShortcode( slug, siteId, isMultisite ) {
	if ( isMultisite && siteId ) {
		return `[wp_block slug="${ slug }" site_id="${ siteId }"]`;
	}
	return `[wp_block slug="${ slug }"]`;
}

/**
 * Get the pattern PHP function.
 *
 * @param {string}  slug        Pattern slug (post_name).
 * @param {number}  siteId      Site ID for multisite.
 * @param {boolean} isMultisite Whether the site is multisite.
 * @return {string} The PHP snippet.
 */
export function getPatternPHPFunction( slug, siteId, isMultisite ) {
	if ( isMultisite && siteId ) {
		return `<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '${ slug }', ${ siteId }, $echo = true ) : ''; ?>`;
	}
	return `<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '${ slug }', null, $echo = true ) : ''; ?>`;
}

/**
 * Get the Synced Pattern Popups trigger code.
 *
 * @param {number} id Pattern (post) ID.
 * @return {string} The trigger code.
 */
export function getPatternPopupTriggerCode( id ) {
	return `spp-trigger-${ id }`;
}

/**
 * Get the Synced Pattern Popups trigger anchor HTML.
 *
 * @param {number} id Pattern (post) ID.
 * @return {string} The anchor code.
 */
export function getPatternPopupTriggerAnchorCode( id ) {
	return `<a href="#spp-trigger-${ id }">Open the Popup</a>`;
}

/**
 * Copy text to the clipboard. Uses navigator.clipboard with execCommand fallback.
 *
 * @param {string} text Text to copy.
 * @return {Promise<boolean>} Resolves to true if copy succeeded, false otherwise.
 */
export async function copyToClipboard( text ) {
	if ( navigator.clipboard && typeof navigator.clipboard.writeText === 'function' ) {
		try {
			await navigator.clipboard.writeText( text );
			return true;
		} catch ( err ) {
			return false;
		}
	}
	// Fallback for older Safari / insecure contexts.
	try {
		const textarea = document.createElement( 'textarea' );
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		textarea.style.pointerEvents = 'none';
		document.body.appendChild( textarea );
		textarea.select();
		const copied = document.execCommand( 'copy' );
		document.body.removeChild( textarea );
		return !! copied;
	} catch ( err ) {
		return false;
	}
}
