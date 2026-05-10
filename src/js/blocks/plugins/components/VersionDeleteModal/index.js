// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import { Modal, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import { useForm, useWatch, useFormState } from 'react-hook-form';

// Local imports.
import Notice from '../../../../react/components/Notice';

/**
 * Version Delete Modal.
 *
 * @param {Object}   props                      The props.
 * @param {string}   props.id                   The id of the version.
 * @param {string}   props.nonce                The nonce of the version.
 * @param {boolean}  props.shouldCreateSnapshot Whether to show the modal again.
 * @param {Function} props.onRequestClose       The function to call when the modal is closed.
 * @param {Function} props.onDelete             The function to call when the version is deleted.
 * @return {Object} The rendered component.
 */
const VersionDeleteModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );
	const { control, handleSubmit, setError } = useForm( {
		defaultValues: {
			shouldCreateSnapshot: true,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = async() => {
		setIsSaving( true );

		const path = '/dlxplugins/pattern-wrangler/v1/versions';

		const response = await apiFetch( {
			path,
			method: 'DELETE',
			data: {
				id: props.id,
				nonce: props.nonce,
			},
		} );
		if ( response.error ) {
			setError( 'versionTitle', response.error );
		}
		props.onDelete( response );
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
		let buttonText = __( 'Delete Version', 'pattern-wrangler' );
		if ( isSaving ) {
			buttonText = __( 'Deleting Version…', 'pattern-wrangler' );
		}
		return buttonText;
	};

	/**
	 * Get the modal title.
	 *
	 * @return {string} The modal title.
	 */
	const getModalTitle = () => {
		return __( 'Delete Version', 'pattern-wrangler' );
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
									'Are you sure you want to delete this version? This action cannot be undone.',
									'pattern-wrangler'
								) }
							</p>
						</div>
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

export default VersionDeleteModal;
