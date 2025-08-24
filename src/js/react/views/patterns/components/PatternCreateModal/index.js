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

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setError,
		trigger,
		setValue,
	} = useForm( {
		defaultValues: {
			patternTitle: props.patternTitle || '',
			patternDescription: props.patternDescription || '',
			patternCategories: props.patternCategories || [],
			patternSyncStatus: props.patternSyncStatus || 'synced',
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
			( findLabel ) => findLabel.label === labelValue
		);
		return label ? label.id : null;
	};

	return (
		<>
			<Modal
				title={ __( 'Add Pattern', 'pattern-wrangler' ) }
				onRequestClose={ props.onRequestClose }
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( ( formData ) => {} ) }>
						<div className="dlx-pw-modal-admin-row">
							<TextControl
								label={ __( 'Pattern Title', 'pattern-wrangler' ) }
								help={ __( 'Enter the title of the pattern.', 'pattern-wrangler' ) }
								value={ formValues.patternTitle }
								onChange={ ( value ) => setValue( 'patternTitle', value ) }
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
										tokenizeOnSpace={ true }
										allowMultiple={ true }
										placeholder={ __( 'Add a category', 'pattern-wrangler' ) }
										suggestions={ categories }
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
					</form>
				</div>
			</Modal>
		</>
	);
};

export default PatternCreateModal;
