// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState } from 'react';
import {
	ToggleControl,
	TextControl,
	CheckboxControl,
	ComboboxControl,
	BaseControl,
	SelectControl,
	PanelBody,
	Button,
} from '@wordpress/components';
import { useAsyncResource } from 'use-async-resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation as TriangleExclamation, faCircleCheck as CircleCheck, faEye, faExternalLink as ExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation as CircularExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';

const retrieveOptions = () => {
	return SendCommand( 'dlx_pw_get_options', {
		nonce: dlxPatternWranglerAdmin.getNonce,
	} );
};

const Main = ( props ) => {
	const [ defaults ] = useAsyncResource(
		retrieveOptions,
		[]
	);
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Loading…', 'dlx-pattern-wrangler' ) }</h2>
				</>
			}
		>
			<Interface defaults={ defaults } { ...props } />
		</Suspense>
	);
};

const Interface = ( props ) => {
	const { defaults } = props;
	const response = defaults();
	const { data } = response.data;

	const [ licenseValid ] = useState( data.licenseValid );

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
			disableCoreCategories: data.disableCoreCategories,
			disableThirdPartyCategories: data.disableThirdPartyCategories,
			hideAllPatterns: data.hideAllPatterns,
			hideCorePatterns: data.hideCorePatterns,
			hideThemePatterns: data.hideThemePatterns,
			hideRemotePatterns: data.hideRemotePatterns,
			disableSyncedPatterns: data.disableSyncedPatterns,
			showSyncedPatternsUI: data.showSyncedPatternsUI,
			disablePatternImporterBlock: data.disablePatternImporterBlock,
			categories: data.categories ?? [],
			saveNonce: dlxPatternWranglerAdmin.saveNonce,
			resetNonce: dlxPatternWranglerAdmin.resetNonce,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	// Retrieve a prompt based on the license status.
	const getPrompt = () => {
		// Check to see if the license nag is disabled.
		if ( 'valid' === licenseValid && ! getValues( 'enableLicenseAlerts' ) ) {
			return null;
		}
		if ( 'valid' === licenseValid ) {
			return (
				<Notice
					message={ __( 'Thank you for supporting this plugin. Your license key is active and you are receiving updates and support.', 'dlx-pattern-wrangler' ) }
					status="success"
					politeness="assertive"
					inline={ false }
					icon={ () => <FontAwesomeIcon icon={ CircleCheck } style={ { color: 'currentColor' } } /> }
				/>
			);
		}
		return (
			<Notice
				message={ __( 'Your license key is not active. Please activate your license key to receive updates and support.', 'dlx-pattern-wrangler' ) }
				status="warning"
				politeness="assertive"
				inline={ false }
				icon={ () => <FontAwesomeIcon size="1x" icon={ TriangleExclamation } style={ { color: 'currentColor' } } /> }
			/>
		);
	};
	const getCategories = () => {
		const categories = getValues( 'categories' );
		console.log( categories );
		if ( ! categories ) {
			return null;
		}
		return (
			<ul className="dlx-category-list">
				{ Object.values( categories ).map( ( category, index ) => {
					return (
						<li key={ category.slug }>
							<div className="dlx-category__controls">
								<div className="dlx-category__controls__grid">
									<div className="dlx-category__drag-handle">
										drag
									</div>
									<div className="dlx-category__label-wrapper">
										<div className="dlx-category__label">
											{ category.label }
											<span className="dlx-category__edit">
												<FontAwesomeIcon icon={ faEye } />
											</span>
										</div>
										<div className="dlx-category__slug">
											{ category.slug }
										</div>
									</div>
									<div className="dlx-category__toggle">
										<Controller
											name={ `categories.${ category.slug }.enabled` }
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													aria-label={ category.label }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
												/>
											) }
										/>
									</div>
								</div>
								{
									category.custom && (
										<div className="dlx-category__remove">
											<FontAwesomeIcon icon={ CircularExclamation } />
										</div>
									)
								}
							</div>
						</li>
					);
				} ) }
			</ul>
		)

	}
	return (
		<>
			<div className="dlx-pw-admin-content-heading">
				<h1><span className="dlx-pw-content-heading-text">{ __( 'Settings for Pattern Wrangler', 'dlx-pattern-wrangler' ) }</span></h1>
				<p className="description">
					{
						__( 'Configure which patterns are displayed and adjust settings and categories.', 'dlx-pattern-wrangler' )
					}
				</p>
				{
					getPrompt()
				}
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( ( formData ) => { } ) }>
				<div id="dlx-pw-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">
									{ __( 'Pattern Visibility', 'dlx-pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="hideAllPatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide All Patterns', 'dlx-pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Disable all patterns and the pattern selector.', 'dlx-pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="hideCorePatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide Core Patterns', 'dlx-pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Remove all core patterns from the pattern selector by disabling core patterns.', 'dlx-pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="hideRemotePatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide Remote Patterns', 'dlx-pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Prevent users from searching for remote patterns in the pattern selector.', 'dlx-pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="hideThemePatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide Theme Patterns', 'dlx-pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Disable any patterns registered from the theme you are using.', 'dlx-pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Synced Patterns', 'dlx-pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="disableSyncedPatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Disable Synced Patterns', 'dlx-pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Prevent users from creating synced patterns.', 'dlx-pattern-wrangler' ) }
												/>
											) }
										/>
										<Controller
											name="showSyncedPatternsUI"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Show Synced Patterns UI', 'dlx-pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Display a synced patterns menu item, so you can edit the synced and unsynced patterns like you would regular posts.', 'dlx-pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Pattern Categories', 'dlx-pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										{ getCategories() }
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<SaveResetButtons
						formValues={ formValues }
						setError={ setError }
						reset={ reset }
						errors={ errors }
						isDirty={ isDirty }
						dirtyFields={ dirtyFields }
						trigger={ trigger }
					/>
				</div>
			</form>
		</>
	);
};

export default Main;
