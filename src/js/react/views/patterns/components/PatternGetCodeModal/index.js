// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { TextControl, Modal, Button } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
	getPatternShortcode,
	getPatternPHPFunction,
	getPatternPopupTriggerCode,
	getPatternPopupTriggerAnchorCode,
} from '../../../../../utils/pattern-code-helpers';

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

	const shortcode = getPatternShortcode(
		props.item?.slug ?? '',
		props.item?.siteId ?? null,
		isMultisite
	);
	const phpCode = getPatternPHPFunction(
		props.item?.slug ?? '',
		props.item?.siteId ?? null,
		isMultisite
	);
	const popupTriggerCode = getPatternPopupTriggerCode( id );
	const popupTriggerAnchorCode = getPatternPopupTriggerAnchorCode( id );

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

		addCopyClipboardButton( shortcodeInputRef, shortcode );
	}, [ shortcodeInputRef, shortcode ] );

	/**
	 * Copy the PHP function to the clipboard when the PHP function input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! phpFunctionInputRef ) {
			return;
		}

		addCopyClipboardButton( phpFunctionInputRef, phpCode );
	}, [ phpFunctionInputRef, phpCode ] );

	/**
	 * Copy the popup trigger code to the clipboard when the popup trigger input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! popupTriggerInputRef ) {
			return;
		}

		addCopyClipboardButton( popupTriggerInputRef, popupTriggerCode );
	}, [ popupTriggerInputRef, popupTriggerCode ] );

	/**
	 * Copy the popup trigger anchor code to the clipboard when the popup trigger anchor input is focused.
	 *
	 * @return {void}
	 */
	useEffect( () => {
		if ( ! popupTriggerAnchorInputRef ) {
			return;
		}

		addCopyClipboardButton( popupTriggerAnchorInputRef, popupTriggerAnchorCode );
	}, [ popupTriggerAnchorInputRef, popupTriggerAnchorCode ] );

	/**
	 * Get the modal title.
	 *
	 * @return {string} The modal title.
	 */
	const getModalTitle = () => {
		return __( 'Get Code', 'pattern-wrangler' );
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
							value={ shortcode }
							disabled={ true }
							ref={ setShortcodeInputRef }
							className="dlx-pw-modal-admin-row-input"
						/>
					</div>
					<div className="dlx-pw-modal-admin-row">
						<TextControl
							label={ __( 'Pattern PHP Function', 'pattern-wrangler' ) }
							value={ phpCode }
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
										'Synced Pattern Popups Trigger Code',
										'pattern-wrangler'
									) }
									value={ popupTriggerCode }
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
										'Synced Pattern Popups Trigger Anchor Code',
										'pattern-wrangler'
									) }
									value={ popupTriggerAnchorCode }
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
										{ __( 'Synced Pattern Popups documentation', 'pattern-wrangler' ) }
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
