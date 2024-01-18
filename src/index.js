import { useEffect, useState } from 'react';
import { setDefaultBlockName, cloneBlock } from '@wordpress/blocks';
import { addAction } from '@wordpress/hooks';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useSelect, select, useDispatch, store } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import uniqueId from 'lodash.uniqueid';
import './js/blocks/pattern-importer/index.js';
import './js/blocks/commands/index.js';
import ContainerLogo from './js/blocks/components/icons/ContainerLogo.js';
import ReplaceIcon from './js/blocks/components/icons/ReplaceIcon.js';
import { settings } from '@wordpress/icons';

let previousBlocks = [];

// Run on load.
( function( wp ) {
	/**
	 * Add a toolbar option to wrap selected blocks in a container.
	 */
	registerPlugin( 'dlx-gb-hacks-wrap-container', {
		render: () => {
			const [ clientIds, setClientIds ] = useState( [] );

			// Get the selected block clientIds.

			const selectedBlocks = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getMultiSelectedBlocks();
			}, [] );

			const { replaceBlocks } = useDispatch( store )( 'core/block-editor' );

			useEffect( () => {
				setClientIds( selectedBlocks );
			}, [ selectedBlocks ] );

			// If no blocks are selected, return.
			if ( clientIds.length === 0 ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to wrap container.
			if ( clientIds.length > 1 ) {
				return (
					<PluginBlockSettingsMenuItem
						icon={ <ContainerLogo /> }
						label="Wrap in Container"
						onClick={ () => {
							const innerBlocks = [];
							clientIds.forEach( ( clientId ) => {
								innerBlocks.push( cloneBlock( clientId ) );
							} );
							replaceBlocks(
								select( 'core/block-editor' ).getMultiSelectedBlockClientIds(),
								wp.blocks.createBlock(
									'generateblocks/container', {}, innerBlocks
								)
							);
						} }
					/>
				);
			}
			return null;
		},
	} );

	// Unique ID storing.
	const uniqueIds = [];
	/**
	 * Generate New Unique IDs for selected blocks.
	 */
	registerPlugin( 'dlx-gb-hacks-generate-unique-ids', {
		render: () => {
			const selectedBlock = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getSelectedBlock();
			}, [] );

			/**
			 * Return and generate a new unique ID.
			 *
			 * @param {string} clientId The client ID of the block.
			 *
			 * @return {string} The uniqueId.
			 */
			const generateUniqueId = ( clientId ) => {
				// Get the substr of current client ID for prefix.
				const prefix = clientId.substring( 2, 9 ).replace( '-', '' );
				const newUniqueId = uniqueId( prefix );

				// Make sure it isn't in the array already. Recursive much?
				if ( uniqueIds.includes( newUniqueId ) ) {
					return generateUniqueId();
				}
				return newUniqueId;
			};

			/**
			 * Replace uniqueId attribute with new uniqueId.
			 *
			 * @param {Object} block The block object.
			 */
			const replaceUniqueId = ( block ) => {
				const blockClientId = block.clientId;
				const blockAttributes = block.attributes;

				// If block has a `uniqueId` attribute, generate a new one.
				if ( 'undefined' !== typeof blockAttributes.uniqueId ) {
					const newUniqueId = generateUniqueId( blockClientId );
					wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( blockClientId, { uniqueId: newUniqueId } );
				}

				// Now check if block has innerBlocks.
				if ( 'undefined' !== typeof block.innerBlocks && block.innerBlocks.length > 0 ) {
					block.innerBlocks.forEach( ( innerBlock ) => {
						replaceUniqueId( innerBlock );
					} );
				}
			};

			/**
			 * Return early if no block is selected.
			 */
			if ( null === selectedBlock ) {
				return null;
			}

			// Get the block name.
			const { name } = selectedBlock;

			// If name contains `generateblocks`, proceed.
			if ( name.indexOf( 'generateblocks' ) === -1 ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to replace the Unique ID.
			return (
				<PluginBlockSettingsMenuItem
					icon={ <ReplaceIcon /> }
					label="Generate New Unique IDs"
					onClick={ () => {
						replaceUniqueId( selectedBlock ); // This gets the selected block and all innerBlocks.
					} }
				/>
			);
		},
	} );

	/**
	 * Allow transform from group block.
	 */
	wp.hooks.addFilter( 'blocks.registerBlockType', 'generateblocks/transform/group', ( blockSettings ) => {
		if ( blockSettings.name === 'core/group' ) {
			const transformsTo = blockSettings.transforms?.to || [];
			transformsTo.push( {
				type: 'block',
				blocks: [ 'generateblocks/container' ],
				transform: ( attributes, innerBlocks ) => {
					return wp.blocks.createBlock( 'generateblocks/container', {}, innerBlocks );
				},
			} );
			blockSettings.transforms.to = transformsTo;
		}
		return blockSettings;
	} );
	// Check to see if the default block is a headline. If not, return.
	const defaultHeadlineBlockEnabled = gbHacksPatternInserter.defaultHeadlineBlockEnabled;
	if ( ! defaultHeadlineBlockEnabled ) {
		return;
	}

	// Get the default element name.
	const defaultHeadlineElement = gbHacksPatternInserter.defaultHeadlineBlockElement;

	wp.data.subscribe( () => {
		// Try to find if the paragraph needs to be converted to a headline.
		const currentBlocks = wp.data.select( 'core/block-editor' ).getBlocks();
		const currentBlock = wp.data.select( 'core/block-editor' ).getSelectedBlock();

		// Set the default block. Needs to run every render otherwise is forgotten.
		setDefaultBlockName( 'generateblocks/headline' );

		// If no block is selected, no need to go further.
		if ( null === currentBlock || 'undefined' === typeof currentBlock ) {
			previousBlocks = currentBlocks;
			return;
		}

		// Check that selected block's client ID is not in previous blocks.
		if ( previousBlocks.includes( currentBlock.clientId ) ) {
			previousBlocks = currentBlocks;
			return;
		}
		previousBlocks = currentBlocks;

		// Get the block's index.
		const blockIndex = wp.data.select( 'core/block-editor' ).getBlockIndex( currentBlock.clientId );

		// If previous block is a headline, then the next block should be a headline too.
		if ( blockIndex > 0 ) {
			const previousSelectedBlock = wp.data.select( 'core/block-editor' ).getBlocks();
			const previousBlock = previousSelectedBlock[ blockIndex - 1 ] || null;
			if ( null !== previousBlock && previousBlock.name === 'generateblocks/headline' && currentBlock.name === 'core/paragraph' && currentBlock.attributes.content === '' ) {
				wp.data.dispatch( 'core/block-editor' ).replaceBlocks( currentBlock.clientId, [
					wp.blocks.createBlock( 'generateblocks/headline', {
						uniqueId: '',
						content: currentBlock.attributes.content,
						element: defaultHeadlineElement,
					} ),
				] );
			} else if ( null !== previousBlock && previousBlock.name === 'core/paragraph' && currentBlock.name === 'core/paragraph' && currentBlock.attributes.content === '' ) {
				wp.data.dispatch( 'core/block-editor' ).replaceBlocks( currentBlock.clientId, [
					wp.blocks.createBlock( 'generateblocks/headline', {
						uniqueId: '',
						content: currentBlock.attributes.content,
						element: defaultHeadlineElement,
					} ),
				] );
			}
		}
	} );

	/**
	 * Change default headline element to paragraph.
	 */
	addAction( 'generateblocks.editor.renderBlock', 'generateblocks/editor/renderBlock', function( props ) {
		if ( props.attributes.uniqueId === '' ) {
			props.attributes.element = defaultHeadlineElement;

			// Max iterations.
			const maxIterations = 50;
			let currentIteration = 0;

			const intervalId = setInterval( function() {
				if ( currentIteration > maxIterations ) {
					clearInterval( intervalId );
				}
				if ( 'undefined' !== typeof props.headlineRef && props.headlineRef.current !== null ) {
					const headline = props.headlineRef.current;
					headline.querySelector( '.block-editor-rich-text__editable' ).focus();
					clearInterval( intervalId );
				}
				currentIteration++;
			}, 200 );
		}
	} );
}( window.wp ) );
