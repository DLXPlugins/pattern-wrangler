/**
 * Enhance blocks with pattern instance provenance on inserter insert.
 *
 * @package
 */

import {
	createPatternInstanceProvenance,
	wrapPatternInstance,
	addProvenanceToSyncedPattern,
} from './provenance';

const USER_PATTERN_META = /^core\/block\/(\d+)$/;

/**
 * Attach provenance when a local wp_block pattern is inserted from the inserter.
 *
 * @param {Array}  blocks Blocks being inserted.
 * @param {*}      meta   Insert meta from the block editor (pattern name for inserter).
 * @param {number} siteId Current site ID.
 * @return {Array} Original or enhanced blocks.
 */
export function enhanceBlocksForPatternInsert( blocks, meta, siteId ) {
	if ( typeof meta === 'object' && meta.patternName ) {
		meta = meta.patternName;
	}
	if ( ! meta || 'string' !== typeof meta ) {
		return blocks;
	}

	const match = meta.match( USER_PATTERN_META );
	if ( ! match ) {
		return blocks;
	}

	const patternId = parseInt( match[ 1 ], 10 );
	if ( ! patternId ) {
		return blocks;
	}

	const provenance = createPatternInstanceProvenance( {
		siteId,
		id: patternId,
	} );

	const isSyncedPattern =
		1 === blocks.length &&
		'core/block' === blocks[ 0 ].name &&
		blocks[ 0 ].attributes?.ref;

	if ( isSyncedPattern ) {
		return [ addProvenanceToSyncedPattern( blocks[ 0 ], provenance ) ];
	}

	return [ wrapPatternInstance( blocks, provenance ) ];
}
