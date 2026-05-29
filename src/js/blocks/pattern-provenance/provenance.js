/**
 * Pattern instance provenance helpers.
 *
 * @package
 */

import { createBlock } from '@wordpress/blocks';

/**
 * Generate a UUID v4 string.
 *
 * Prefers crypto.randomUUID(), then crypto.getRandomValues() (same approach as
 * WordPress core-data), with a non-crypto last resort for legacy contexts.
 *
 * @return {string} UUID v4.
 */
function generateUuidV4() {
	if (
		'undefined' !== typeof crypto &&
		'function' === typeof crypto.randomUUID
	) {
		return crypto.randomUUID();
	}

	if (
		'undefined' !== typeof crypto &&
		'function' === typeof crypto.getRandomValues
	) {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			( char ) => {
				const random =
					crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] && 15;
				const value = 'x' === char ? random : ( random && 0x3 ) || 0x8;
				return value.toString( 16 );
			},
		);
	}

	// Last resort: not cryptographically secure, but unique enough for editor instance IDs.
	const timestamp = Date.now().toString( 16 ).padStart( 12, '0' );
	const random = Math.random().toString( 16 ).slice( 2 ).padEnd( 16, '0' );

	return `${ timestamp.slice( 0, 8 ) }-${ timestamp.slice( 8, 12 ) }-4${ random.slice(
		0,
		3,
	) }-a${ random.slice( 3, 6 ) }-${ random.slice( 6, 18 ) }`;
}

/**
 * Create a pattern instance provenance record.
 *
 * @param {Object} pattern        Pattern source identifiers.
 * @param {number} pattern.siteId Site ID where the pattern lives.
 * @param {number} pattern.id     wp_block post ID.
 * @return {Object} Provenance record.
 */
export function createPatternInstanceProvenance( pattern ) {
	return {
		type: 'pattern-instance',
		schemaVersion: 1,
		instanceId: `pwinst-${ generateUuidV4() }`,
		source: {
			type: 'wp_block',
			siteId: pattern.siteId,
			patternId: pattern.id,
		},
		inserted: {
			at: new Date().toISOString(),
		},
	};
}

/**
 * Wrap unsynced pattern blocks in a group with provenance metadata.
 *
 * @param {Array}  blocks     Blocks from the pattern.
 * @param {Object} provenance Provenance record.
 * @return {Object} Group block.
 */
export function wrapPatternInstance( blocks, provenance ) {
	return createBlock(
		'core/group',
		{
			align: 'none',
			metadata: {
				patternWrangler: provenance,
			},
		},
		blocks,
	);
}

/**
 * Add provenance metadata to a synced core/block pattern.
 *
 * @param {Object} block      core/block block object.
 * @param {Object} provenance Provenance record.
 * @return {Object} Block with provenance metadata.
 */
export function addProvenanceToSyncedPattern( block, provenance ) {
	return {
		...block,
		attributes: {
			...block.attributes,
			metadata: {
				...( block.attributes?.metadata || {} ),
				patternWrangler: provenance,
			},
		},
	};
}
