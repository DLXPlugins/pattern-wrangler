// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect, useMemo } from 'react';
import {
	ToggleControl,
	TextControl,
	Modal,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	FormTokenField,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';
import { escapeHTML } from '@wordpress/escape-html';

import { __, _n } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { cleanForSlug } from '@wordpress/url';

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
const PatternTagModal = ( props ) => {
	const originalCategories = props.categories || [];
	const categories = ( props.categories || [] ).map( ( category ) => {
		return category.label || category.name;
	} );
	const localIntersectedCategories = useMemo( () => {
		const items = props.items || [];
		if ( items.length === 0 ) {
			return [];
		}

		// Get categories from all items.
		const allItemCategories = items.map( ( item ) => item.categories || [] );

		// If no items or no categories, return empty array.
		if ( allItemCategories.length === 0 || allItemCategories[ 0 ].length === 0 ) {
			return [];
		}

		// Start with categories from the first item.
		let commonCategories = allItemCategories[ 0 ];

		// For each subsequent item, filter to only keep categories that exist in that item too.
		for ( let i = 1; i < allItemCategories.length; i++ ) {
			const currentItemCategories = allItemCategories[ i ];
			commonCategories = commonCategories.filter( ( category ) => {
				return currentItemCategories.some( ( currentCat ) => currentCat === category );
			} );
		}
		// Filter to only include categories that exist in originalCategories, and return labels.
		return commonCategories
			.filter( ( category ) =>
				originalCategories.some( ( originalCategory ) => {
					return originalCategory.label === category;
				} )
			);
	}, [ props.items, originalCategories ] );

	const [ isSaving, setIsSaving ] = useState( false );

	const {
		control,
		handleSubmit,
	} = useForm( {
		defaultValues: {
			items: props.items || [],
			patternCategories: localIntersectedCategories || [],
		},
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
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

		const itemIdsAndNonces = formData.items.map( ( item ) => {
			return {
				id: item.id,
				nonce: item.editNonce,
			};
		} );
		const path = '/dlxplugins/pattern-wrangler/v1/patterns/tag/';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				items: itemIdsAndNonces,
				patternCategories: newCategories,
			},
		} );
		const responseNewCategories = response.newCategories || {};
		const affectedSlugs = Object.values( responseNewCategories ).map( ( category ) => category.slug );
		props.onTag( response, itemIdsAndNonces, response.itemsAffected, responseNewCategories, affectedSlugs );
		setIsSaving( false );
	};

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = _n( 'Assign Category to Pattern', 'Assign Categories to Pattern', props.items.length, 'pattern-wrangler' );
		if ( isSaving ) {
			buttonText = _n( 'Saving Category…', 'Saving Categories…', props.items.length, 'pattern-wrangler' );
		}
		return buttonText;
	};

	return (
		<>
			<Modal
				title={ _n( 'Assign Category to Pattern', 'Assign Categories to Pattern', props.items.length, 'pattern-wrangler' ) }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
			>
				<div className="dlx-pw-modal-content">
					<form onSubmit={ handleSubmit( onSubmit ) }>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="patternCategories[]"
								render={ ( { field } ) => (
									<>
										<FormTokenField
											label={ __( 'Categories', 'pattern-wrangler' ) }
											help={ __(
												'Enter the categories to assign to the pattern.',
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
											__experimentalShowHowTo={ false }
										/>
										<p className="description">
											{ __( 'Separate with commas or press the Enter key.', 'pattern-wrangler' ) }
										</p>
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
						{ errors?.patternCategories && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ true }
								icon={ () => <AlertTriangle /> }
							>
								{ errors.patternCategories.message }
							</Notice>
						) }
					</form>
				</div>
			</Modal>
		</>
	);
};

export default PatternTagModal;
