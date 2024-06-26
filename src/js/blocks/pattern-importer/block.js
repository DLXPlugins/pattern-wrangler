/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 * External dependencies
 */

import classnames from 'classnames';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash.uniqueid';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	TextControl,
	Button,
	ButtonGroup,
	RangeControl,
	BaseControl,
	TextareaControl,
	Card,
	CardHeader,
	CardFooter,
	CardBody,
	Spinner,
	CheckboxControl,
} from '@wordpress/components';

import { parse } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	insertBlocks,
	store,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';
import SendCommand from '../utils/SendCommand';

// Image RegEx.
const imageUrlRegex = /(http(?:s?):)([\/|.|@|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp|avif)/gi;
const uniqueIdRegex = /\"uniqueId\"\:\"([^"]+)\"/gi;

// Unique ID storing.
const uniqueIds = [];

// For storing the number of images imported.
let imageCount = 0;

const escapeRegExp = ( content ) => {
	return content.replace( /[.*+\-?^${}()|[\]\\]/g, '\\$&' ); // $& means the whole matched string
};

const PatternImporter = ( props ) => {
	// Shortcuts.
	const { attributes, setAttributes, clientId } = props;

	const [ patternText, setPatternText ] = useState( '' );
	const [ patternImages, setPatternImages ] = useState( [] );
	const [ patternBackgroundImages, setPatternBackgroundImages ] = useState( [] );
	const [ importing, setImporting ] = useState( false );
	const [ imageProcessingCount, setImageProcessingCount ] = useState( 0 );
	const [ doNotImportRemoteImages, setDoNotImportRemoteImages ] = useState( false );

	const { replaceBlock } = useDispatch( store );

	const onPatternSubmit = async() => {
		setImporting( true );
		const processImage = async( imgUrl, imgAlt ) => {
			const response = await SendCommand(
				dlxPWPatternInserter.restNonce,
				{
					imgUrl,
					imgAlt,
				},
				dlxPWPatternInserter.restUrl + '/process_image'
			);
			return response;
		};

		/**
		 * Import a pattern.
		 *
		 * @param {string} pattern The pattern.
		 */
		const importPattern = ( pattern ) => {
			pattern = replaceUniqueIds( pattern );

			// Convert pattern to blocks.
			try {
				const patternBlocks = parse( pattern );

				replaceBlock( clientId, patternBlocks );

				// Insert block in place of this one.
				//replaceInnerBlocks( clientId, patternBlocks );
			} catch ( error ) {
			}
		};

		const matches = [ ...patternText.matchAll( imageUrlRegex ) ];
		const imagesToProcess = [];
		let localPatternText = patternText;

		if ( ! doNotImportRemoteImages ) {
			// If there are matches, we need to process them.
			if ( matches.length ) {
				matches.forEach( ( match ) => {
					// Push if not a duplicate.
					if ( ! imagesToProcess.includes( match[ 0 ] ) ) {
						imagesToProcess.push( match[ 0 ] );
					}
				} );
				setPatternImages( imagesToProcess );
			}

			const imagesProcessed = [];
			let imagePromises = [];

			// Let's loop through images and process.
			if ( imagesToProcess.length ) {
				imagePromises = imagesToProcess.map( ( image ) => {
					try {
						const response = processImage( image, '' );
						response.then( ( restResponse ) => {
							imagesProcessed.push( image );
							const { data, success } = restResponse.data;
							if ( success ) {
								imageCount++;
								setImageProcessingCount( imageCount );

								// Get the image URL and replace in pattern.
								const newImageUrl = data.attachmentUrl;

								// Replace old URL with new URL.
								localPatternText = localPatternText.replace( image, newImageUrl );
								setPatternText( localPatternText );
							} else {
								// Fail silently.
								imageCount++;
								setImageProcessingCount( imageCount );
							}
						} ).catch( ( error ) => {
							// Fail silently.
							imageCount++;
							setImageProcessingCount( imageCount );
						} );
						return response;
					} catch ( error ) {
						// Fail silently.
						imageCount++;
						setImageProcessingCount( imageCount );
					}
				} );
			}

			Promise.all( imagePromises ).then( () => {
				importPattern( localPatternText );
			} ).catch( ( error ) => {
				importPattern( localPatternText );
			} );
		} else {
			importPattern( localPatternText );
		}
	};

	/**
	 * Return and generate a new unique ID.
	 *
	 * @param {string} blockPatternText The block pattern text.
	 *
	 * @return {string} The blockPatternText.
	 */
	const replaceUniqueIds = ( blockPatternText ) => {
		const pwUniqueIdMatches = [ ...blockPatternText.matchAll( uniqueIdRegex ) ];

		if ( pwUniqueIdMatches.length ) {
			// Loop through matches, generate unique ID, and replace.
			pwUniqueIdMatches.forEach( ( match ) => {
				const newUniqueId = generateUniqueId();
				uniqueIds.push( newUniqueId );
				blockPatternText.replace( match[ 1 ], `"uniqueId":"${ newUniqueId }"` );
			} );
		}
		return blockPatternText;
	};

	/**
	 * Return and generate a new unique ID.
	 *
	 * @return {string} The uniqueId.
	 */
	const generateUniqueId = () => {
		// Get the substr of current client ID for prefix.
		const prefix = clientId.substring( 2, 9 ).replace( '-', '' );
		const newUniqueId = uniqueId( prefix );

		// Make sure it isn't in the array already. Recursive much?
		if ( uniqueIds.includes( newUniqueId ) ) {
			return generateUniqueId();
		}
		return newUniqueId;
	};

	const block = (
		<>
			<Card className="dlx-pattern-inserter">
				<CardHeader>
					{ __( 'Pattern Importer', 'pattern-wrangler' ) }
				</CardHeader>
				<CardBody>
					<TextareaControl
						label={ __( 'Paste your pattern here', 'pattern-wrangler' ) }
						placeholder={ __( 'Paste your pattern here', 'pattern-wrangler' ) }
						value={ patternText }
						onChange={ ( value ) => setPatternText( value ) }
						disabled={ importing }
					/>
					<CheckboxControl
						label={ __( 'Do not import remote images', 'pattern-wrangler' ) }
						checked={ doNotImportRemoteImages }
						onChange={ ( value ) => setDoNotImportRemoteImages( value ) }
						disabled={ importing }
					/>
				</CardBody>
				<CardFooter>
					<Button
						variant="primary"
						disabled={ ! patternText || importing }
						onClick={ onPatternSubmit }
					>
						{ __( 'Import', 'pattern-wrangler' ) }
					</Button>
					{ importing && (
						<span className="gb-pattern-importer-image">
							<Spinner />
							{
								`Processing ${ imageCount } of ${ patternImages.length } images.`
							}
						</span>
					) }
				</CardFooter>
			</Card>
		</>
	);

	const blockProps = useBlockProps( { className: 'dlx-pattern-inserter-wrapper' } );

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PatternImporter;
