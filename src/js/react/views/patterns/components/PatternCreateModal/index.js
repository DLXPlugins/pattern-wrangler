// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import {
	ToggleControl,
	TextControl,
	Tooltip,
	SelectControl,
	PanelBody,
	Popover,
	BaseControl,
	Modal,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	FormTokenField,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useAsyncResource } from 'use-async-resource';
import { AlertTriangle, CheckCircle } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classnames from 'classnames';

// Local imports.
import SendCommand from '../../../../utils/SendCommand';
import Notice from '../../../../components/Notice';

const PatternCreateModal = ( props ) => {
	const originalCategories = props.categories || [];
	const categories = ( props.categories || [] ).map( ( category ) => category.label );
	const [ copyPatternId ] = useState( props.copyPatternId || 0 );

	const [ isSaving, setIsSaving ] = useState( false );

	const {
		control,
		getValues,
		handleSubmit,
		reset,
		setError,
		trigger,
		setValue,
	} = useForm( {
		defaultValues: {
			patternTitle: props.patternTitle || '',
			patternCategories: props.patternCategories || [],
			patternSyncStatus: props.patternSyncStatus || 'synced',
			patternCopyId: copyPatternId,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	/**
	 * Get the label id by value.
	 *
	 * @param {string} labelValue The label value.
	 *
	 * @return {string|null} The label id.
	 */
	const getIdByValue = ( labelValue ) => {
		const label = originalCategories.find(
			( findLabel ) => findLabel.label.toLowerCase() === labelValue.toLowerCase()
		);
		return label ? label.id : 0;
	};

	const onSubmit = async ( formData ) => {
		setIsSaving( true );

		const newCategories = formData.patternCategories.map( ( category ) => {
			return {
				name: category,
				id: getIdByValue( category ),
			};
		} );

		const response = await apiFetch( {
			path: '/dlxplugins/pattern-wrangler/v1/patterns/create/',
			method: 'POST',
			data: {
				nonce: dlxEnhancedPatternsView.createNonce,
				patternTitle: formData.patternTitle,
				patternCategories: newCategories,
				patternSyncStatus: formData.patternSyncStatus,
				patternCopyId: formData.patternCopyId,
			},
		} );
		if ( response?.error ) {
			setError( 'patternTitle', { message: response.error } );
		} else {
			const patternId = response.patternId;
			const redirectUrl = encodeURIComponent( window.location.href );
			window.location.href = `${ dlxEnhancedPatternsView.getSiteBaseUrl }post.php?post=${ patternId }&action=edit&redirect_to=${ redirectUrl }`;
		}
		setIsSaving( false );
	};

	return (
		<>
			<Modal
				title={ __( 'Add Pattern', 'pattern-wrangler' ) }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="patternTitle"
								rules={ { 
									required: __( 'Pattern title is required.', 'pattern-wrangler' ) 
								} }
								render={ ( { field } ) => (
									<TextControl
										label={ __( 'Pattern Title', 'pattern-wrangler' ) }
										help={ __( 'Enter the title of the pattern.', 'pattern-wrangler' ) }
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
								name="patternCategories[]"
								render={ ( { field } ) => (
									<FormTokenField
										label={ __( 'Categories', 'pattern-wrangler' ) }
										help={ __(
											'Enter the categories of the pattern.',
											'pattern-wrangler'
										) }
										value={ field.value }
										onChange={ ( tokens ) => {
											field.onChange( tokens );
										} }
										tokenizeOnSpace={ false }
										allowMultiple={ true }
										placeholder={ __( 'Add a category', 'pattern-wrangler' ) }
										suggestions={ categories }
										disabled={ isSaving }
									/>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="patternSyncStatus"
								render={ ( { field } ) => (
									<>
										<ToggleGroupControl
											label={ __( 'Sync Status', 'pattern-wrangler' ) }
											isAdaptiveWidth={ true }
											value={ field.value }
											onChange={ ( value ) => {
												field.onChange( value );
											} }
											disabled={ isSaving }
										>
											<ToggleGroupControlOption
												value="synced"
												label={ __( 'Synced', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __( 'Synced', 'pattern-wrangler' ) }
											/>
											<ToggleGroupControlOption
												value="unsynced"
												label={ __( 'Unsynced', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __( 'Unsynced', 'pattern-wrangler' ) }
											/>
										</ToggleGroupControl>
									</>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
							<Button
								variant="primary"
								type="submit"
								disabled={ isSaving }
							>
								{ isSaving ? __( 'Adding Pattern…', 'pattern-wrangler' ) : __( 'Add Pattern', 'pattern-wrangler' ) }
							</Button>
							<Button
								variant="secondary"
								onClick={ props.onRequestClose }
								disabled={ isSaving }
							>
								{ __( 'Cancel', 'pattern-wrangler' ) }
							</Button>
						</div>
						{
							errors?.patternTitle && (
								<Notice
									className="dlx-pw-admin-notice"
									status="error"
									inline={ true }
									icon={ () => <AlertTriangle /> }
								>
									{ errors.patternTitle.message }
								</Notice>
							)
						}
					</form>
				</div>
			</Modal>
		</>
	);
};

export default PatternCreateModal;
