// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { TextControl, Modal, Button } from '@wordpress/components';

import { __, sprintf } from '@wordpress/i18n';

/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                The props.
 * @param {Object}   props.items          The items to get the code for. Should be an array of one item.
 * @param {Function} props.onRequestClose The function to call when the modal is closed.
 * @return {Object} The rendered component.
 */
const PatternGetCodeModal = ( props ) => {
	const { item } = props;
	const { id = 0, syncStatus = 'unsynced' } = item || {};

	const [ isMultisite ] = useState( dlxEnhancedPatternsView.isMultisite );
	const [ shortcodeInputRef, setShortcodeInputRef ] = useState( null );
	const [ phpFunctionInputRef, setPhpFunctionInputRef ] = useState( null );
	const [ popupTriggerInputRef, setPopupTriggerInputRef ] = useState( null );
	const [ popupTriggerAnchorInputRef, setPopupTriggerAnchorInputRef ] = useState( null );
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
	 * Copy the popup trigger code to the clipboard when the popup trigger input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! popupTriggerInputRef ) {
			return;
		}

		addCopyClipboardButton( popupTriggerInputRef, getPatternPopupTriggerCode() );
	}, [ popupTriggerInputRef ] );

	/**
	 * Copy the popup trigger anchor code to the clipboard when the popup trigger anchor input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! popupTriggerAnchorInputRef ) {
			return;
		}

		addCopyClipboardButton( popupTriggerAnchorInputRef, getPatternPopupTriggerAnchorCode() );
	}, [ popupTriggerAnchorInputRef ] );

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

	const getPatternPopupTriggerCode = () => {
		return `spp-trigger-${ id }`;
	};

	const getPatternPopupTriggerAnchorCode = () => {
		return `<a href="#spp-trigger-${ id }">Open the Popup</a>`;
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
					{ dlxEnhancedPatternsView.syncedPatternPopupsActive &&
						syncStatus === 'synced' && (
						<>
							<div className="dlx-pw-modal-admin-row">
								<TextControl
									label={ __(
										'Synced Patterns Popup Trigger Code',
										'pattern-wrangler'
									) }
									value={ getPatternPopupTriggerCode() }
									disabled={ true }
									ref={ setPopupTriggerInputRef }
									className="dlx-pw-modal-admin-row-input"
									help={ __(
										'This is the code to trigger the Synced Pattern Popup on your site.',
										'pattern-wrangler'
									) }
								/>
								<TextControl
									label={ __(
										'Synced Patterns Popup Trigger Anchor Code',
										'pattern-wrangler'
									) }
									value={ getPatternPopupTriggerAnchorCode() }
									disabled={ true }
									ref={ setPopupTriggerAnchorInputRef }
									className="dlx-pw-modal-admin-row-input"
									help={ __(
										'This is the code to add to the anchor of the Synced Pattern Popup on your site.',
										'pattern-wrangler'
									) }
								/>
								<p className="description">
									<a href={ `${ dlxEnhancedPatternsView.syncedPatternPopupsUrl }#how-to-use` } target="_blank" rel="noreferrer">
										{ __( 'Synced Patterns Popup documentation', 'pattern-wrangler' ) }
									</a>
								</p>
							</div>
						</>
					) }
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
