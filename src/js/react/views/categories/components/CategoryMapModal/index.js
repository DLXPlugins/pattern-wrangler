// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo } from 'react';
import {
	Modal,
	Button,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';
import store from '../../store/index';
import { useSelect } from '@wordpress/data';
import { __, _n } from '@wordpress/i18n';
import { useForm, useWatch, useFormState, Controller } from 'react-hook-form';

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
const CategoryMapModal = ( props ) => {
	const [ isSaving, setIsSaving ] = useState( false );

	const localCategories = useSelect( ( select ) => {
		const allCategories = select( store ).getCategories();
		return Object.values( allCategories ).filter(
			( category ) => ! category.registered
		);
	} );

	const getLocalCategoryOptions = () => {
		const localCategoryOptions = [];
		localCategoryOptions.push( {
			label: __( 'Select a category', 'pattern-wrangler' ),
			value: 'none',
		} );
		localCategories.forEach( ( category ) => {
			localCategoryOptions.push( {
				label: category.label,
				value: category.id,
			} );
		} );
		return localCategoryOptions;
	};

	const commonMappedToValue = useMemo( () => {
		let mappedTo = 'none';
		if ( props.items.length > 0 ) {
			// Find the common mappedTo category.
			const commonMappedTo = props.items
				.map( ( item ) => item.mappedTo )
				.filter( ( mappedToValue ) => mappedToValue !== 'none' )
				.reduce( ( acc, mappedToValue ) => {
					if ( acc[ mappedToValue ] ) {
						acc[ mappedToValue ]++;
					} else {
						acc[ mappedToValue ] = 1;
					}
					return acc;
				}, {} );
			// Sort by count.
			const sortedCommonMappedTo = Object.keys( commonMappedTo ).sort( ( a, b ) => {
				return commonMappedTo[ b ] - commonMappedTo[ a ];
			} );
			mappedTo = sortedCommonMappedTo[ 0 ] || 'none';

			// Get the mappedTo category ID.
			const mappedToCategoryId = localCategories.find( ( category ) => category.slug === mappedTo )?.id;
			if ( mappedToCategoryId ) {
				mappedTo = mappedToCategoryId;
			} else {
				mappedTo = 'none';
			}
		}
		return mappedTo;
	}, [] );

	const { control, handleSubmit } = useForm( {
		defaultValues: {
			items: props.items || [],
			mappingEnabled: true,
			mappedTo: commonMappedToValue || 'none',
		},
	} );
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = async( formData ) => {
		setIsSaving( true );

		const itemSlugsAndNonces = formData.items.map( ( item ) => {
			return {
				slug: item.slug,
				nonce: item.editNonce,
			};
		} );
		const path = '/dlxplugins/pattern-wrangler/v1/categories/map/';

		const response = await apiFetch( {
			path,
			method: 'POST',
			data: {
				items: itemSlugsAndNonces,
				mappingEnabled: formData.mappingEnabled,
				mappedTo: formData.mappedTo,
			},
		} );
		props.onMapCategory( response, itemSlugsAndNonces );
		setIsSaving( false );
	};

	/**
	 * Get the button text.
	 *
	 * @return {string} The button text.
	 */
	const getButtonText = () => {
		let buttonText = _n(
			'Map Category',
			'Map Categories',
			props.items.length,
			'pattern-wrangler'
		);
		if ( isSaving ) {
			buttonText = _n(
				'Mapping Category…',
				'Mapping Categories…',
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
			return __( 'Map Category', 'pattern-wrangler' );
		}
		return _n(
			'Map Category',
			'Map Categories',
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
							<p>
								{ _n(
									'Choose a local category to map this disabled category to.',
									'Choose a local category to map these disabled categories to.',
									props.items.length,
									'pattern-wrangler'
								) }
							</p>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="mappingEnabled"
								render={ ( { field } ) => (
									<>
										<ToggleControl
											label={ _n(
												'Map this disabled category to a local category.',
												'Map these disabled categories to a local category.',
												props.items.length,
												'pattern-wrangler'
											) }
											checked={ field.value }
											onChange={ ( value ) => field.onChange( value ) }
											disabled={ isSaving }
											help={ __(
												'This is useful if you have a similar local category to move registered patterns categories to.',
												'pattern-wrangler'
											) }
										/>
									</>
								) }
							/>
						</div>
						{ formValues.mappingEnabled && (
							<>
								<div className="dlx-pw-modal-admin-row">
									<Controller
										control={ control }
										name="mappedTo"
										render={ ( { field } ) => {
											return (
												<SelectControl
													label={ __( 'Map to Local Category', 'pattern-wrangler' ) }
													value={ field.value }
													onChange={ ( value ) => field.onChange( value ) }
													options={ getLocalCategoryOptions() }
												/>
											);
										} }
									/>
								</div>
							</>
						) }
						<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
							<Button
								variant="primary"
								isDestructive={ true }
								type="submit"
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
						{ errors?.mappedTo && (
							<Notice
								className="dlx-pw-admin-notice"
								status="error"
								inline={ true }
								icon={ () => <AlertTriangle /> }
							>
								{ errors?.mappedTo?.message }
							</Notice>
						) }
					</form>
				</div>
			</Modal>
		</>
	);
};

export default CategoryMapModal;
