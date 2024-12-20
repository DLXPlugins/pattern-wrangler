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
	Button,
} from '@wordpress/components';
import { useAsyncResource } from 'use-async-resource';
import { AlertTriangle, CheckCircle } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';
import SitePicker from '../../components/SitePicker';

const Settings = ( props ) => {
	const data = dlxPatternWranglerNetworkAdminSettings.options;

	const [ selectedSiteId, setSelectedSiteId ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSite
	);
	const [ selectedSitePermalink, setSelectedSitePermalink ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSitePermalink
	);
	const [ selectedSiteTitle, setSelectedSiteTitle ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSiteTitle
	);
	const [ selectedSitePatternsUrl, setSelectedSitePatternsUrl ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSitePatternsUrl
	);
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
			patternConfiguration: data.patternConfiguration,
			patternMothershipSiteId: data.patternMothershipSiteId,
			saveNonce: dlxPatternWranglerNetworkAdminSettings.saveNonce,
			resetNonce: dlxPatternWranglerNetworkAdminSettings.resetNonce,
			hideSyncedPatternsForNetwork: data.hideSyncedPatternsForNetwork,
			hideUnsyncedPatternsForNetwork: data.hideUnsyncedPatternsForNetwork,
			disablePatternImporterBlock: data.disablePatternImporterBlock,
			disablePatternExporterForNetwork: data.disablePatternExporterForNetwork,
			hideCorePatterns: data.hideCorePatterns,
			hideRemotePatterns: data.hideRemotePatterns,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	/**
	 * Get the Site Picker.
	 *
	 * @return {React.ReactNode} The Site Picker.
	 */
	const getSitePicker = () => {
		switch ( formValues.patternConfiguration ) {
			case 'network_only':
			case 'hybrid':
				return (
					<div className="dlx-admin__row">
						<BaseControl
							id="dlx-pw-network-settings-default-patterns-source"
							label={ __( 'Default Patterns Source', 'pattern-wrangler' ) }
							help={ __(
								'Select the site that will be used as the source of truth for patterns across the network.',
								'pattern-wrangler'
							) }
						>
							<SitePicker
								restEndpoint={
									dlxPatternWranglerNetworkAdminSettings.restEndpoint
								}
								restNonce={ dlxPatternWranglerNetworkAdminSettings.restNonce }
								selectedSite={ selectedSiteId }
								savedTitle={ selectedSiteTitle }
								savedPermalink={ selectedSitePermalink }
								selectedSitePatternsUrl={ selectedSitePatternsUrl }
								onItemSelect={ ( e, valueSuggestion ) => {
									// If value is not null, parse it as an integer.
									const newValue = valueSuggestion.id
										? parseInt( valueSuggestion.id )
										: null;
									if ( newValue ) {
										setValue( 'patternMothershipSiteId', newValue );
										setSelectedSiteId( newValue );
										setSelectedSitePatternsUrl(
											valueSuggestion.selectedSitePatternsUrl
										);
									}
								} }
							/>
						</BaseControl>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<div className="dlx-pw-admin-content-heading">
				<h1>
					<span className="dlx-pw-content-heading-text">
						{ __( 'Network Settings for Pattern Wrangler', 'pattern-wrangler' ) }
					</span>
				</h1>
				<p className="description">
					{ __(
						'Configure the source-of-truth for patterns and adjust site and network settings.',
						'pattern-wrangler'
					) }
				</p>
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( ( formData ) => {} ) }>
				<div id="dlx-pw-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">
									{ __( 'Network Settings', 'pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="patternConfiguration"
											render={ ( { field } ) => (
												<SelectControl
													label={ __(
														'Pattern Configuration',
														'pattern-wrangler'
													) }
													help={ __(
														'Select the pattern configuration for the network. Choose `Disabled` to disable patterns for the entire network.',
														'pattern-wrangler'
													) }
													value={ field.value }
													onChange={ field.onChange }
													options={ [
														{
															label: __( 'Network Only', 'pattern-wrangler' ),
															value: 'network_only',
														},
														{
															label: __( 'Local Only', 'pattern-wrangler' ),
															value: 'local_only',
														},
														{
															label: __( 'Hybrid', 'pattern-wrangler' ),
															value: 'hybrid',
														},
														{
															label: __( 'Disabled', 'pattern-wrangler' ),
															value: 'disabled',
														},
													] }
												/>
											) }
										/>
									</div>
									{ getSitePicker() }
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Global Visibility Settings', 'pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideCorePatterns"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Hide Core Patterns', 'pattern-wrangler' ) }
													help={ __( 'If enabled, core patterns will be hidden from the network.', 'pattern-wrangler' ) }
													checked={ field.value }
													onChange={ field.onChange }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideRemotePatterns"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Hide Remote Patterns', 'pattern-wrangler' ) }
													help={ __( 'If enabled, remote patterns will be hidden from the network.', 'pattern-wrangler' ) }
													checked={ field.value }
													onChange={ field.onChange }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideSyncedPatternsForNetwork"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Hide Synced Patterns', 'pattern-wrangler' ) }
													help={ __( 'If enabled, synced patterns will be hidden from the network.', 'pattern-wrangler' ) }
													checked={ field.value }
													onChange={ field.onChange }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideUnsyncedPatternsForNetwork"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Hide Unsynced Patterns', 'pattern-wrangler' ) }
													help={ __( 'If enabled, unsynced patterns will be hidden from the network.', 'pattern-wrangler' ) }
													checked={ field.value }
													onChange={ field.onChange }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Misc Settings', 'pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="disablePatternImporterBlock"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Disable Patterns Importer Block', 'pattern-wrangler' ) }
													help={ __( 'If enabled, the Patterns Importer block will be disabled for all sites in the network.', 'pattern-wrangler' ) }
													checked={ field.value }
													onChange={ field.onChange }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="disablePatternExporterForNetwork"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __( 'Disable Pattern Exporter', 'pattern-wrangler' ) }
													help={ __( 'If enabled, the Pattern Exporter will be disabled for all sites in the network.', 'pattern-wrangler' ) }
													checked={ field.value }
													onChange={ field.onChange }
												/>
											) }
										/>
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
						saveAction="dlx_pw_save_network_settings"
						resetAction="dlx_pw_reset_network_settings"
					/>
				</div>
			</form>
		</>
	);
};

export default Settings;
