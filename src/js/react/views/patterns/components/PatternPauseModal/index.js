// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
	Modal,
	Button,
	CheckboxControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, useWatch, useFormState } from 'react-hook-form';

// Local imports.
import Notice from '../../../../components/Notice';

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
const PatternPauseModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ doNotShowAgain, setDoNotShowAgain ] = useState( props.doNotShowAgain || false );
	const {
		control,
		handleSubmit,
	} = useForm( {
		defaultValues: {
			items: props.items || [],
			patternNonce: props.patternNonce || '',
			forceDelete: false,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = async( formData ) => {
		setIsSaving( true );

		const itemIdsAndNonces = formData.items.map( ( item ) => {
			return {
				id: item.id,
				nonce: item.editNonce,
			};
		} );
		const path = '/dlxplugins/pattern-wrangler/v1/patterns/pause/';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				items: itemIdsAndNonces,
				doNotShowAgain,
			},
		} );
		props.onPause( response, itemIdsAndNonces, doNotShowAgain );
		setIsSaving( false );
	};

	useEffect( () => {
		if ( props.doNotShowAgain ) {
			onSubmit( formValues );
		}
	}, [] );

	if ( props.doNotShowAgain ) {
		return null;
	}

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = _n( 'Disable Pattern', 'Disable Patterns', props.items.length, 'pattern-wrangler' );
		if ( isSaving ) {
			buttonText = _n( 'Disabling Pattern…', 'Disabling Patterns…', props.items.length, 'pattern-wrangler' );
		}
		return buttonText;
	};

	/**
	 * Get the modal title.
	 *
	 * @return {string} The modal title.
	 */
	const getModalTitle = () => {
		if ( props.items.length === 1 ) {
			return __( 'Disable Pattern', 'pattern-wrangler' );
		}
		return _n( 'Disable Pattern', 'Disable Patterns', props.items.length, 'pattern-wrangler' );
	};

	return (
		<>
			<Modal
				title={ getModalTitle() }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( onSubmit )}>
						<div className="dlx-pw-modal-admin-row">
							<p>
								{ __( 'Are you sure you want to disable this pattern? You can always re-enable it later.', 'pattern-wrangler' ) }
							</p>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<CheckboxControl
								label={ __( 'Do not show this confirmation again.', 'pattern-wrangler' ) }
								checked={ doNotShowAgain }
								onChange={ ( value ) => setDoNotShowAgain( value ) }
								disabled={ isSaving }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
							<Button variant="primary" type="submit" disabled={ isSaving }>
								{ getButtonText() }
							</Button>
							<Button
								variant="secondary"
								onClick={ props.onRequestClose }
								disabled={ isSaving }
							>
								{ __( 'Cancel', 'pattern-wrangler' ) }
							</Button>
						</div>
						{ errors?.patternTitle && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ true }
								icon={ () => <AlertTriangle /> }
							>
								{ errors.patternTitle.message }
							</Notice>
						) }
					</form>
				</div>
			</Modal>
		</>
	);
};

export default PatternPauseModal;
