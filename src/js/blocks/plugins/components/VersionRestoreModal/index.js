// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import { Modal, Button, ToggleControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import { useForm, useWatch, useFormState, Controller } from 'react-hook-form';

// Local imports.
import Notice from '../../../../react/components/Notice';

/**
 * Version Delete Modal.
 *
 * @param {Object}   props                      The props.
 * @param {string}   props.id                   The id of the version.
 * @param {string}   props.nonce                The nonce of the version.
 * @param {boolean}  props.shouldCreateSnapshot Whether to show the modal again.
 * @param {boolean}  props.isEditedPostDirty    Whether the edited post is dirty. Used to determine if a snapshot can be created.
 * @param {Function} props.onRequestClose       The function to call when the modal is closed.
 * @param {Function} props.onRestore            The function to call when the version is restored.
 * @return {Object} The rendered component.
 */
const VersionRestoreModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ canCreateSnapshot ] = useState( ! props.isEditedPostDirty );
	const { control, handleSubmit, setError } = useForm( {
		defaultValues: {
			shouldCreateSnapshot: canCreateSnapshot,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = async() => {
		setIsSaving( true );

		const path = '/dlxplugins/pattern-wrangler/v1/versions/restore';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				id: props.id,
				patternId: props.patternId,
				nonce: props.nonce,
				shouldCreateSnapshot: formValues.shouldCreateSnapshot,
			},
		} );
		if ( response.error ) {
			setError( 'versionTitle', response.error );
		}
		props.onRestore( response, formValues.shouldCreateSnapshot );
		setIsSaving( false );
	};

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = __( 'Restore Version', 'pattern-wrangler' );
		if ( isSaving ) {
			buttonText = __( 'Restoring Version…', 'pattern-wrangler' );
		}
		return buttonText;
	};

	/**
	 * Get the modal title.
	 *
	 * @return {string} The modal title.
	 */
	const getModalTitle = () => {
		return __( 'Restore Version', 'pattern-wrangler' );
	};

	const getSnapshotToggle = () => {
		return (
			<div className="dlx-pw-modal-admin-row">
				{ props.isEditedPostDirty && (
					<Notice
						className="dlx-pw-admin-notice"
						status="warning"
						inline={ true }
						icon={ () => <AlertTriangle /> }
					>
						{ __(
							'The existing pattern must be saved before creating a snapshot.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
				<Controller
					control={ control }
					name="shouldCreateSnapshot"
					render={ ( { field } ) => (
						<ToggleControl
							label={ __(
								'Create Snapshot of the current pattern',
								'pattern-wrangler'
							) }
							checked={ field.value }
							onChange={ ( value ) => field.onChange( value ) }
							disabled={ isSaving || ! canCreateSnapshot }
						/>
					) }
				/>
			</div>
		);
	};

	return (
		<>
			<Modal
				title={ getModalTitle() }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<div className="dlx-pw-modal-admin-row">
							<p className="description">
								{ __(
									'Are you sure you want to restore this version?',
									'pattern-wrangler'
								) }
							</p>
						</div>
						{ getSnapshotToggle() }
						<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
							<Button
								variant="primary"
								type="submit"
								isDestructive={ true }
								disabled={ isSaving }
							>
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
					</form>
				</div>
			</Modal>
		</>
	);
};

export default VersionRestoreModal;
