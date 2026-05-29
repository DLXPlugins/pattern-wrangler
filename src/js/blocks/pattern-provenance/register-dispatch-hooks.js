/**
 * Wrap block editor insert/replace dispatch to attach pattern provenance.
 *
 * @package
 */

import { dispatch } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { enhanceBlocksForPatternInsert } from './enhance-blocks';

/**
 * Register dispatch hooks for pattern provenance on inserter inserts.
 *
 * @param {number} siteId Current site ID.
 */
export function registerPatternProvenanceDispatchHooks( siteId ) {
	const blockEditorDispatch = dispatch( blockEditorStore );
	const originalInsertBlocks = blockEditorDispatch.insertBlocks;
	const originalReplaceBlocks = blockEditorDispatch.replaceBlocks;

	blockEditorDispatch.insertBlocks = (
		blocks,
		index,
		rootClientId,
		updateSelection = true,
		initialPosition = 0,
		meta,
	) => {
		if ( null !== initialPosition && 'object' === typeof initialPosition ) {
			meta = initialPosition;
			initialPosition = 0;
		}

		const enhancedBlocks = enhanceBlocksForPatternInsert(
			blocks,
			meta,
			siteId,
		);

		return originalInsertBlocks(
			enhancedBlocks,
			index,
			rootClientId,
			updateSelection,
			initialPosition,
			meta,
		);
	};

	blockEditorDispatch.replaceBlocks = (
		clientIds,
		blocks,
		indexToSelect,
		initialPosition = 0,
		meta,
	) => {
		const enhancedBlocks = enhanceBlocksForPatternInsert(
			blocks,
			meta,
			siteId,
		);

		return originalReplaceBlocks(
			clientIds,
			enhancedBlocks,
			indexToSelect,
			initialPosition,
			meta,
		);
	};
}
