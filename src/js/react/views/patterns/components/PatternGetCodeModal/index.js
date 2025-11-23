// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { TextControl, Modal, Button } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
const PatternGetCodeModal = ( props ) => {
	const [ isMultisite ] = useState( dlxEnhancedPatternsView.isMultisite );
	const [ shortcodeInputRef, setShortcodeInputRef ] = useState( null );
	const [ phpFunctionInputRef, setPhpFunctionInputRef ] = useState( null );

	const addCopyClipboardButton = async( inputRef, text ) => {
		const copyButton = document.createElement( 'button' );
		copyButton.classList.add( 'dlx-pw-copy-shortcode' );
		copyButton.innerHTML =
			'<span class="dashicons dashicons-clipboard"></span>';

		const handleCopy = async() => {
			let copied = false;

			// Modern API attempt first
			if ( navigator.clipboard?.writeText ) {
				try {
					await navigator.clipboard.writeText( text );
					copied = true;
				} catch ( err ) {
					// Fail silently and fall back
				}
			}

			// Fallback for older Safari / insecure contexts
			if ( ! copied ) {
				const textarea = document.createElement( 'textarea' );
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				textarea.style.pointerEvents = 'none';
				document.body.appendChild( textarea );

				textarea.select();
				try {
					document.execCommand( 'copy' );
					copied = true;
				} catch ( err ) {
					// worst case, no copy
				}

				document.body.removeChild( textarea );
			}

			if ( copied ) {
				copyButton.innerHTML = '<span class="dashicons dashicons-yes"></span>';
				setTimeout( () => {
					copyButton.innerHTML =
						'<span class="dashicons dashicons-clipboard"></span>';
				}, 1500 );
			}
		};

		copyButton.addEventListener( 'click', handleCopy );
		inputRef.parentElement.appendChild( copyButton );

		return () => {
			copyButton.removeEventListener( 'click', handleCopy );
			copyButton.remove();
		};
	};

	/**
	 * Copy the shortcode to the clipboard when the shortcode input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! shortcodeInputRef ) {
			return;
		}

		addCopyClipboardButton( shortcodeInputRef, getPatternShortcode() );
	}, [ shortcodeInputRef ] );

	/**
	 * Copy the PHP function to the clipboard when the PHP function input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! phpFunctionInputRef ) {
			return;
		}

		addCopyClipboardButton( phpFunctionInputRef, getPatternPHPFunction() );
	}, [ phpFunctionInputRef ] );

	/**
	 * Get the modal title.
	 *
	 * @return {string} The modal title.
	 */
	const getModalTitle = () => {
		return __( 'Get Code', 'pattern-wrangler' );
	};

	/**
	 * Get the pattern shortcode. Adds a site_id parameter if the site is multisite.
	 *
	 * @return {string} The pattern shortcode.
	 */
	const getPatternShortcode = () => {
		if ( isMultisite && props.item.siteId ) {
			return `[wp_block slug="${ props.item.slug }" site_id="${ props.item.siteId }"]`;
		}
		return `[wp_block slug="${ props.item.slug }"]`;
	};

	/**
	 * Get the pattern PHP function.
	 *
	 * @return {string} The pattern PHP function.
	 */
	const getPatternPHPFunction = () => {
		if ( isMultisite && props.item.siteId ) {
			return `<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '${ props.item.slug }', ${ props.item.siteId }, $echo = true ) : ''; ?>`;
		}
		return `<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '${ props.item.slug }', null, $echo = true ) : ''; ?>`;
	};
	return (
		<>
			<Modal
				title={ getModalTitle() }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<p className="description">
						{ __(
							'Use the fields below to get a shortcode or PHP function to output the pattern on your site.',
							'pattern-wrangler'
						) }
					</p>
					<div className="dlx-pw-modal-admin-row">
						<TextControl
							label={ __( 'Pattern Shortcode', 'pattern-wrangler' ) }
							value={ getPatternShortcode() }
							disabled={ true }
							ref={ setShortcodeInputRef }
							className="dlx-pw-modal-admin-row-input"
						/>
					</div>
					<div className="dlx-pw-modal-admin-row">
						<TextControl
							label={ __( 'Pattern PHP Function', 'pattern-wrangler' ) }
							value={ getPatternPHPFunction() }
							disabled={ true }
							ref={ setPhpFunctionInputRef }
							className="dlx-pw-modal-admin-row-input"
						/>
					</div>
					<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
						<Button variant="secondary" onClick={ props.onRequestClose }>
							{ __( 'Cancel', 'pattern-wrangler' ) }
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default PatternGetCodeModal;
