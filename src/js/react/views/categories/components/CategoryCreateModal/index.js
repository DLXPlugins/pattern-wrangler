// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import { TextControl, Modal, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { cleanForSlug } from '@wordpress/url';

import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classnames from 'classnames';

// Local imports.
import Notice from '../../../../components/Notice';

/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                The props.
 * @param {string}   props.title          The title of the modal.
 * @param {string}   props.termId         The id of the term.
 * @param {string}   props.termNonce      The nonce of the term.
 * @param {string}   props.termTitle      The title of the term.
 * @param {Function} props.onRequestClose The function to call when the modal is closed.
 * @param {Function} props.onCreate       The function to call when the term is created.
 * @return {Object} The rendered component.
 */
const CategoryCreateModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isEditMode, setIsEditMode ] = useState( props.isEditMode || false );

	const { control, handleSubmit, setError, setValue } = useForm( {
		defaultValues: {
			termId: props.termId || 0,
			termNonce: props.termNonce || '',
			termTitle: props.termTitle || '',
			termSlug: cleanForSlug( props.termTitle || '' ),
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	const onSubmit = async( formData ) => {
		setIsSaving( true );

		const path = isEditMode
			? '/dlxplugins/pattern-wrangler/v1/categories/update/'
			: '/dlxplugins/pattern-wrangler/v1/categories/create/';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				termId: formData.termId,
				termNonce: formData.termNonce,
				nonce: dlxEnhancedCategoriesView.createNonce,
				termTitle: formData.termTitle,
				termSlug: formData.termSlug,
			},
		} );
		if ( response?.error ) {
			setError( 'termTitle', { message: response.error } );
		} else {
			props.onCreate( response );
		}
		setIsSaving( false );
	};

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = __( 'Add Category', 'pattern-wrangler' );
		if ( isEditMode ) {
			buttonText = __( 'Save Category', 'pattern-wrangler' );
		}
		if ( isSaving ) {
			buttonText = __( 'Saving Category…', 'pattern-wrangler' );
		}
		return buttonText;
	};

	const hasErrors = Object.values( errors ).length > 0;

	return (
		<>
			<Modal
				title={ props.title || __( 'Add Category', 'pattern-wrangler' ) }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<div className="dlx-pw-modal-admin-row dlx-admin__row">
							<Controller
								control={ control }
								name="termTitle"
								rules={ {
									required: __(
										'Category title is required.',
										'pattern-wrangler'
									),
								} }
								render={ ( { field } ) => (
									<TextControl
										label={ __( 'Category Title', 'pattern-wrangler' ) }
										help={ __(
											'Enter the title of the category.',
											'pattern-wrangler'
										) }
										className={
											classnames( {
												'is-required': true,
												'is-error': errors?.termTitle,
												'has-error': errors?.termTitle,
											} )
										}
										value={ field.value }
										onChange={ ( value ) => field.onChange( value ) }
										disabled={ isSaving }
									/>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row dlx-admin__row">
							<Controller
								control={ control }
								name="termSlug"
								rules={ {
									required: __(
										'Category slug is required.',
										'pattern-wrangler'
									),
								} }
								render={ ( { field } ) => (
									<TextControl
										label={ __( 'Category Slug', 'pattern-wrangler' ) }
										help={ __(
											'Enter the slug of the category.',
											'pattern-wrangler'
										) }
										value={ field.value }
										onChange={ ( value ) => field.onChange( value ) }
										onBlur={ () => {
											const slug = cleanForSlug( field.value );
											if ( slug !== field.value ) {
												setValue( 'termSlug', slug );
											}
										} }
										disabled={ isSaving }
										className={
											classnames( {
												'is-required': true,
												'is-error': errors?.termSlug,
												'has-error': errors?.termSlug,
											} )
										}
									/>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
							<Button variant="primary" type="submit" disabled={ isSaving || hasErrors }>
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
						{ hasErrors && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ false }
							>
								{ Object.values( errors ).map( ( error ) => <p key={ error.message }>{ error.message }</p> ) }
							</Notice>
						) }
					</form>
				</div>
			</Modal>
		</>
	);
};

export default CategoryCreateModal;
