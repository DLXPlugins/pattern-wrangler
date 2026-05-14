// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
	TextControl,
	Modal,
	Button,
	TextareaControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';
import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

// Local imports.
import Notice from '../../../../react/components/Notice';

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
const PatternVersionCreateModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isEditMode ] = useState( props.isEditMode || false );

	const { control, handleSubmit, setError } = useForm( {
		defaultValues: {
			versionTitle: props.versionTitle ?? '',
			versionDescription: props.versionDescription ?? '',
		},
	} );
	// eslint-disable-next-line no-unused-vars
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = async( formData ) => {
		setIsSaving( true );

		apiFetch( {
			path: '/dlxplugins/pattern-wrangler/v1/versions',
			method: 'POST',
			data: {
				parentId: props.patternId,
				title: formData.versionTitle,
				description: formData.versionDescription,
				nonce: props.patternNonce,
			},
		} )
			.then( ( response ) => {
				if ( response?.error ) {
					setError( 'versionTitle', { message: response.error } );
				} else {
					props.onCreate( response );
				}
			} )
			.catch( ( error ) => {
				setError( 'versionTitle', { message: error.message } );
			} )
			.finally( () => {
				setIsSaving( false );
			} );
	};

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = __( 'Create Version', 'pattern-wrangler' );
		if ( isEditMode ) {
			buttonText = __( 'Save Version', 'pattern-wrangler' );
		}
		if ( isSaving ) {
			buttonText = __( 'Saving Version…', 'pattern-wrangler' );
		}
		return buttonText;
	};

	return (
		<>
			<Modal
				title={ props.title || __( 'Create New Version', 'pattern-wrangler' ) }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="versionTitle"
								rules={ {
									required: __(
										'Version title is required.',
										'pattern-wrangler'
									),
								} }
								render={ ( { field } ) => (
									<TextControl
										label={ __( 'Version Title', 'pattern-wrangler' ) }
										help={ __(
											'Enter the title of the version.',
											'pattern-wrangler'
										) }
										className={ classnames( {
											'is-required': true,
											'is-error': errors?.versionTitle,
											'has-error': errors?.versionTitle,
										} ) }
										value={ field.value }
										onChange={ ( value ) => field.onChange( value ) }
										disabled={ isSaving }
									/>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="versionDescription"
								render={ ( { field } ) => (
									<TextareaControl
										label={ __(
											'Version Description (optional)',
											'pattern-wrangler'
										) }
										help={ __(
											'Enter the description of the version.',
											'pattern-wrangler'
										) }
										value={ field.value }
										onChange={ ( value ) => field.onChange( value ) }
										disabled={ isSaving }
										rows={ 3 }
										placeholder={ __(
											'Enter the description of the version.',
											'pattern-wrangler'
										) }
									/>
								) }
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
						{ errors?.versionTitle && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ true }
								icon={ () => <AlertTriangle /> }
							>
								{ errors.versionTitle.message }
							</Notice>
						) }
						{ errors?.versionDescription && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ true }
								icon={ () => <AlertTriangle /> }
							>
								{ errors.versionDescription.message }
							</Notice>
						) }
					</form>
				</div>
			</Modal>
		</>
	);
};

export default PatternVersionCreateModal;
