// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import { Modal, Button, CheckboxControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, useWatch, useFormState } from 'react-hook-form';

// Local imports.
import Notice from '../../../../components/Notice';

/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                The props.
 * @param {string}   props.title          The title of the modal.
 * @param {Function} props.onRequestClose The function to call when the modal is closed.
 * @param {Function} props.onDelete       The function to call when the category is deleted.
 * @param {Array}    props.items          The items to delete.
 * @return {Object} The rendered component.
 */
const CategoryDeleteModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ doNotShowAgain, setDoNotShowAgain ] = useState(
		props.doNotShowAgain || false
	);
	const { control, handleSubmit } = useForm( {
		defaultValues: {
			items: props.items || [],
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
		const path = '/dlxplugins/pattern-wrangler/v1/categories/delete/';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				items: itemIdsAndNonces,
			},
		} );
		props.onDelete( response, itemIdsAndNonces );
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
		let buttonText = _n(
			'Delete Category',
			'Delete Categories',
			props.items.length,
			'pattern-wrangler'
		);
		if ( isSaving ) {
			buttonText = _n(
				'Deleting Category…',
				'Deleting Categories…',
				props.items.length,
				'pattern-wrangler'
			);
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
			return __( 'Delete Category', 'pattern-wrangler' );
		}
		return _n(
			'Delete Category',
			'Delete Categories',
			props.items.length,
			'pattern-wrangler'
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
								{
									props.items.length > 1 ? __( 'Are you sure you want to delete these categories? This action cannot be undone.', 'pattern-wrangler' ) : __( 'Are you sure you want to delete this category? This action cannot be undone.', 'pattern-wrangler' )
								}
							</p>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<CheckboxControl
								label={ __(
									'Do not show this confirmation again.',
									'pattern-wrangler'
								) }
								checked={ doNotShowAgain }
								onChange={ ( value ) => setDoNotShowAgain( value ) }
								disabled={ isSaving }
							/>
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
						{ errors?.categoryTitle && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ true }
								icon={ () => <AlertTriangle /> }
							>
								{ errors.categoryTitle.message }
							</Notice>
						) }
					</form>
				</div>
			</Modal>
		</>
	);
};

export default CategoryDeleteModal;
