// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState } from 'react';
import {
	TextControl,
	Modal,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	FormTokenField,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { AlertTriangle } from 'lucide-react';
import { escapeHTML } from '@wordpress/escape-html';
import classnames from 'classnames';
import { __, sprintf } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

// Local imports.
import Notice from '../../../../react/components/Notice';

/**
 * Parse non-negative integer (category / version ids).
 *
 * @param {*} n Value.
 * @return {number} Integer.
 */
function absInt( n ) {
	const i = parseInt( n, 10 );
	return Number.isNaN( i ) ? 0 : i;
}

/**
 * Modal to create a new wp_block from a saved pattern version (clone markup).
 *
 * @param {Object}   props                Props.
 * @param {Object}   props.version        Version row from REST (id, title, content, categoryIds, wp_pattern_sync_status).
 * @param {string}   props.title          Modal title.
 * @param {Function} props.onRequestClose Close handler.
 * @return {JSX.Element} Markup.
 */
const PatternVersionCloneToPatternModal = ( props ) => {
	const { version = {}, title, onRequestClose } = props;
	const preview =
		typeof dlxPatternWranglerPreview !== 'undefined'
			? dlxPatternWranglerPreview
			: {};
	const originalCategories = preview.patternCategories || [];
	const categories = originalCategories.map( ( category ) => {
		return category.label || category.name;
	} );

	const defaultPatternTitle = useMemo( () => {
		const baseTitle = ( version.title || '' ).trim();
		if ( baseTitle ) {
			return sprintf(
				// translators: %s: version checkpoint title.
				__( '%s (copy)', 'pattern-wrangler' ),
				baseTitle
			);
		}
		return sprintf(
			// translators: %d: version post ID.
			__( 'Pattern version %d (copy)', 'pattern-wrangler' ),
			version.id || 0
		);
	}, [ version.title, version.id ] );

	const defaultCategoryLabels = useMemo( () => {
		const allCats = Array.isArray( preview.patternCategories )
			? preview.patternCategories
			: [];
		const ids = Array.isArray( version.categoryIds ) ? version.categoryIds : [];
		const labels = [];
		if ( ids.length && allCats.length ) {
			for ( const id of ids ) {
				const found = allCats.find( ( c ) => absInt( c.id ) === absInt( id ) );
				if ( found?.label ) {
					labels.push( escapeHTML( found.label ) );
				}
			}
		}
		if ( labels.length ) {
			return labels;
		}
		const fallback = preview.currentPatternCategoryLabels || [];
		return fallback.map( ( label ) => escapeHTML( label ) );
	}, [
		version.categoryIds,
		preview.patternCategories,
		preview.currentPatternCategoryLabels,
	] );

	const defaultSyncStatus = useMemo( () => {
		if ( version.wp_pattern_sync_status === 'unsynced' ) {
			return 'unsynced';
		}
		if ( preview.pattern && preview.pattern.syncStatus === 'unsynced' ) {
			return 'unsynced';
		}
		return 'synced';
	}, [ version.wp_pattern_sync_status, preview.pattern ] );

	const [ isSaving, setIsSaving ] = useState( false );
	const [ showExpandedSuggestions, setShowExpandedSuggestions ] = useState( true );

	const { control, handleSubmit, setError } = useForm( {
		defaultValues: {
			patternTitle: defaultPatternTitle,
			patternCategories: defaultCategoryLabels,
			patternSyncStatus: defaultSyncStatus,
		},
	} );
	// eslint-disable-next-line no-unused-vars
	const formValues = useWatch( { control } );
	const { errors } = useFormState( {
		control,
		shouldFocusError: true,
	} );

	/**
	 * Resolve category term id from label.
	 *
	 * @param {string} labelValue Category label.
	 * @return {number} Term id or 0.
	 */
	const getIdByValue = ( labelValue ) => {
		const label = originalCategories.find( ( findLabel ) => {
			const findNewLabel = findLabel.label || findLabel.name;
			return findNewLabel.toLowerCase() === labelValue.toLowerCase();
		} );
		return label ? label.id : 0;
	};

	const onSubmit = async( formData ) => {
		setIsSaving( true );
		try {
			const newCategories = ( formData.patternCategories || [] ).map(
				( category ) => {
					return {
						name: category,
						id: getIdByValue( category ),
					};
				}
			);

			const response = await apiFetch( {
				path: '/dlxplugins/pattern-wrangler/v1/patterns/create/',
				method: 'POST',
				data: {
					nonce: preview.createNonce,
					patternTitle: formData.patternTitle,
					patternCategories: newCategories,
					patternSyncStatus: formData.patternSyncStatus,
					patternCopyId: 0,
					disableRegisteredPattern: false,
					patternContent: version.content ?? '',
				},
			} );
			if ( response?.error ) {
				setError( 'patternTitle', { message: response.error } );
			} else {
				const patternId = response.patternId;
				const redirectUrl = encodeURIComponent( window.location.href );
				window.location.href = `${ preview.getSiteBaseUrl }post.php?post=${ patternId }&action=edit&redirect_to=${ redirectUrl }`;
			}
		} catch ( err ) {
			setError( 'patternTitle', {
				message:
					err?.message || __( 'Could not create pattern.', 'pattern-wrangler' ),
			} );
		} finally {
			setIsSaving( false );
		}
	};

	const getButtonText = () => {
		if ( isSaving ) {
			return __( 'Creating pattern…', 'pattern-wrangler' );
		}
		return __( 'Create pattern', 'pattern-wrangler' );
	};

	return (
		<>
			<Modal
				title={ title || __( 'Clone Version to New Pattern', 'pattern-wrangler' ) }
				onRequestClose={ onRequestClose }
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
									<>
										<TextControl
											label={ __( 'Pattern title', 'pattern-wrangler' ) }
											help={ __(
												'Enter the title of the new pattern.',
												'pattern-wrangler'
											) }
											className={ classnames( {
												'is-required': true,
												'has-error': errors?.patternTitle,
											} ) }
											value={ field.value }
											onChange={ ( value ) => field.onChange( value ) }
											disabled={ isSaving }
											ref={ field.ref }
										/>
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
									</>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="patternCategories"
								render={ ( { field } ) => (
									<>
										<FormTokenField
											label={ __( 'Categories', 'pattern-wrangler' ) }
											help={ __(
												'Enter the categories of the pattern.',
												'pattern-wrangler'
											) }
											value={ field.value }
											onChange={ ( tokens ) => {
												field.onChange( tokens );
												setShowExpandedSuggestions( false );
											} }
											tokenizeOnBlur={ true }
											tokenizeOnSpace={ false }
											allowMultiple={ true }
											placeholder={ __( 'Add a category', 'pattern-wrangler' ) }
											suggestions={ categories }
											disabled={ isSaving }
											__experimentalShowHowTo={ false }
											maxSuggestions={ 20 }
											onInputChange={ ( input ) => {
												if ( input.length > 1 ) {
													setShowExpandedSuggestions( false );
												} else {
													setShowExpandedSuggestions( true );
												}
											} }
											__experimentalExpandOnFocus={
												( field.value.length === 0 && showExpandedSuggestions ) ||
												showExpandedSuggestions
											}
										/>
										<p className="description">
											{ __(
												'Separate with commas or press the Enter key.',
												'pattern-wrangler'
											) }
										</p>
									</>
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row">
							<Controller
								control={ control }
								name="patternSyncStatus"
								render={ ( { field } ) => (
									<ToggleGroupControl
										label={ __( 'Sync status', 'pattern-wrangler' ) }
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
								) }
							/>
						</div>
						<div className="dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons">
							<Button variant="primary" type="submit" disabled={ isSaving }>
								{ getButtonText() }
							</Button>
							<Button
								variant="secondary"
								onClick={ onRequestClose }
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

export default PatternVersionCloneToPatternModal;
