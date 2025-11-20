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
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
			hideAllPatterns: data.hideAllPatterns,
			hideThemePatterns: data.hideThemePatterns,
			hidePluginPatterns: data.hidePluginPatterns,
			hideUncategorizedPatterns: data.hideUncategorizedPatterns,
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
							{ /* <tr>
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
							</tr> */ }
							<tr>
								<th scope="row">
									{ __( 'Global Visibility Settings', 'pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideAllPatterns"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __( 'Hide All Patterns', 'pattern-wrangler' ) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide All Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change. Let site admins decide.', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show All Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideCorePatterns"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __( 'Hide Core Patterns', 'pattern-wrangler' ) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Core Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show Core Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideRemotePatterns"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __(
															'Hide Remote Patterns',
															'pattern-wrangler'
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Remote Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show Remote Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideThemePatterns"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __( 'Hide Theme Patterns', 'pattern-wrangler' ) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Theme Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show Theme Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hidePluginPatterns"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __( 'Hide Plugin Patterns', 'pattern-wrangler' ) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Plugin Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show Plugin Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideSyncedPatternsForNetwork"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __(
															'Hide Synced Patterns',
															'pattern-wrangler'
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Synced Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show Synced Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideUnsyncedPatternsForNetwork"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __(
															'Hide Unsynced Patterns',
															'pattern-wrangler'
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange( value );
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __( 'Hide', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Unsynced Patterns',
																'pattern-wrangler'
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __( 'Default', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __( 'No Change', 'pattern-wrangler' ) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __( 'Show', 'pattern-wrangler' ) }
															showTooltip={ true }
															aria-label={ __(
																'Show Unsynced Patterns',
																'pattern-wrangler'
															) }
														/>
													</ToggleGroupControl>
												</>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">{ __( 'Misc Settings', 'pattern-wrangler' ) }</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="disablePatternImporterBlock"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __(
														'Disable Patterns Importer Block',
														'pattern-wrangler'
													) }
													help={ __(
														'If enabled, the Patterns Importer block will be disabled for all sites in the network.',
														'pattern-wrangler'
													) }
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
													label={ __(
														'Disable Pattern Exporter',
														'pattern-wrangler'
													) }
													help={ __(
														'If enabled, the Pattern Exporter will be disabled for all sites in the network.',
														'pattern-wrangler'
													) }
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
