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
const PatternCreateModal = ( props ) => {
	const originalCategories = props.categories || [];
	const categories = ( props.categories || [] ).map( ( category ) => {
		return category.label || category.name;
	} );
	const localPatternCategories = ( props.patternCategories || [] ).map( ( category ) => {
		return category.label || category.name;
	} );
	const [ copyPatternId ] = useState( props.copyPatternId || 0 );
	const [ syncedDefaultStatus ] = useState( props.syncedDefaultStatus || 'synced' );
	const [ syncedDisabled ] = useState( props.syncedDisabled || false );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ isEditMode, setIsEditMode ] = useState( props.isEditMode || false );

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
			patternId: props.patternId || 0,
			patternNonce: props.patternNonce || '',
			patternTitle: props.patternTitle || '',
			patternCategories: localPatternCategories || [],
			patternSyncStatus: props.patternSyncStatus || syncedDefaultStatus,
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
			( findLabel ) => {
				const findNewLabel = findLabel.label || findLabel.name;
				return findNewLabel.toLowerCase() === labelValue.toLowerCase();
			}
		);
		return label ? label.id : 0;
	};

	const onSubmit = async( formData ) => {
		setIsSaving( true );

		const newCategories = formData.patternCategories.map( ( category ) => {
			return {
				name: category,
				id: getIdByValue( category ),
			};
		} );

		const path = isEditMode
			? '/dlxplugins/pattern-wrangler/v1/patterns/update/'
			: '/dlxplugins/pattern-wrangler/v1/patterns/create/';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				patternId: formData.patternId,
				patternNonce: formData.patternNonce,
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
			if ( ! isEditMode ) {
				const redirectUrl = encodeURIComponent( window.location.href );
				window.location.href = `${ dlxEnhancedPatternsView.getSiteBaseUrl }post.php?post=${ patternId }&action=edit&redirect_to=${ redirectUrl }`;
			} else {
				props.onEdit( response );
			}
		}
		setIsSaving( false );
	};

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = __( 'Add Pattern', 'pattern-wrangler' );
		if ( isEditMode ) {
			buttonText = __( 'Save Pattern', 'pattern-wrangler' );
		}
		if ( isSaving ) {
			buttonText = __( 'Saving Pattern…', 'pattern-wrangler' );
		}
		return buttonText;
	};

	return (
		<>
			<Modal
				title={ props.title || __( 'Add Pattern', 'pattern-wrangler' ) }
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
									required: __(
										'Pattern title is required.',
										'pattern-wrangler'
									),
								} }
								render={ ( { field } ) => (
									<TextControl
										label={ __( 'Pattern Title', 'pattern-wrangler' ) }
										help={ __(
											'Enter the title of the pattern.',
											'pattern-wrangler'
										) }
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
											disabled={ isSaving || syncedDisabled }
										>
											<ToggleGroupControlOption
												value="synced"
												label={ __( 'Synced', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __( 'Synced', 'pattern-wrangler' ) }
												disabled={ syncedDisabled }
											/>
											<ToggleGroupControlOption
												value="unsynced"
												label={ __( 'Unsynced', 'pattern-wrangler' ) }
												showTooltip={ true }
												aria-label={ __( 'Unsynced', 'pattern-wrangler' ) }
												disabled={ syncedDisabled }
											/>
										</ToggleGroupControl>
									</>
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

export default PatternCreateModal;
