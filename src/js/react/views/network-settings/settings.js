// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import {
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	SelectControl,
	BaseControl,
	PanelBody,
} from '@wordpress/components';
import { AlertCircle, Info } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import SaveResetButtons from '../../components/SaveResetButtons';
import SitePicker from '../../components/SitePicker';
import Notice from '../../components/Notice';

const Settings = () => {
	const data = dlxPatternWranglerNetworkAdminSettings.options;

	// eslint-disable-next-line no-unused-vars
	const [ selectedSitePermalink, setSelectedSitePermalink ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSitePermalink,
	);
	// eslint-disable-next-line no-unused-vars
	const [ selectedSiteTitle, setSelectedSiteTitle ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSiteTitle,
	);

	const [ selectedSiteId, setSelectedSiteId ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSite,
	);
	const [ selectedSitePatternsUrl, setSelectedSitePatternsUrl ] = useState(
		dlxPatternWranglerNetworkAdminSettings.selectedSitePatternsUrl,
	);
	const { control, handleSubmit, reset, setError, trigger, setValue } =
		useForm( {
			defaultValues: {
				patternConfiguration: data.patternConfiguration,
				registeredPatternConfiguration:
					data.registeredPatternConfiguration,
				patternNetworkSourceSiteId: data.patternNetworkSourceSiteId,
				saveNonce: dlxPatternWranglerNetworkAdminSettings.saveNonce,
				resetNonce: dlxPatternWranglerNetworkAdminSettings.resetNonce,
				hideSyncedPatternsForNetwork: data.hideSyncedPatternsForNetwork,
				hideUnsyncedPatternsForNetwork:
					data.hideUnsyncedPatternsForNetwork,
				disablePatternImporterBlock: data.disablePatternImporterBlock,
				disablePatternExporterForNetwork:
					data.disablePatternExporterForNetwork,
				disablePatternRevisionsForNetwork:
					data.disablePatternRevisionsForNetwork,
				hideCorePatterns: data.hideCorePatterns,
				hideRemotePatterns: data.hideRemotePatterns,
				hideAllPatterns: data.hideAllPatterns,
				hideThemePatterns: data.hideThemePatterns,
				hidePluginPatterns: data.hidePluginPatterns,
				hideUncategorizedPatterns: data.hideUncategorizedPatterns,
				localPatternConfiguration: data.localPatternConfiguration,
				showNetworkPatternColumns: data.showNetworkPatternColumns,
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
			case 'custom':
				return (
					<div className="dlx-admin__row">
						<BaseControl
							id="dlx-pw-network-settings-default-patterns-source"
							label={ __(
								'Default Patterns Source (Required)',
								'pattern-wrangler',
							) }
							help={ __(
								'Select the site that will be used as the source of truth for patterns across the network. This will only be used for hybrid, network only, or custom site configurations.',
								'pattern-wrangler',
							) }
						>
							<SitePicker
								restEndpoint={
									dlxPatternWranglerNetworkAdminSettings.restEndpoint
								}
								restNonce={
									dlxPatternWranglerNetworkAdminSettings.restNonce
								}
								selectedSite={ selectedSiteId }
								savedTitle={ selectedSiteTitle }
								savedPermalink={ selectedSitePermalink }
								selectedSitePatternsUrl={
									selectedSitePatternsUrl
								}
								onItemSelect={ ( e, valueSuggestion ) => {
									// If value is not null, parse it as an integer.
									const newValue = valueSuggestion.id
										? parseInt( valueSuggestion.id )
										: null;
									if ( newValue ) {
										setValue(
											'patternNetworkSourceSiteId',
											newValue,
										);
										setSelectedSiteId( newValue );
										setSelectedSitePatternsUrl(
											valueSuggestion.selectedSitePatternsUrl,
										);
									} else {
										setValue(
											'patternNetworkSourceSiteId',
											0,
										);
										setSelectedSiteId( null );
										setSelectedSitePatternsUrl( '' );
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

	const canShowRegisteredPatternConfiguration = () => {
		return (
			formValues.patternConfiguration === 'hybrid' ||
			formValues.patternConfiguration === 'network_only' ||
			formValues.patternConfiguration === 'custom'
		);
	};

	return (
		<>
			<div className="dlx-pw-admin-content-heading">
				<h1>
					<span className="dlx-pw-content-heading-text">
						{ __(
							'Network Settings for Pattern Wrangler',
							'pattern-wrangler',
						) }
					</span>
				</h1>
				<p className="description">
					{ __(
						'Configure the source-of-truth for patterns and adjust site and network settings.',
						'pattern-wrangler',
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
														'Shared Pattern Library Configuration',
														'pattern-wrangler',
													) }
													help={ __(
														"Select the pattern configuration for the network. Choose `Local Only (default)` to allow each site to manage their patterns independently. You can configure each site's pattern configuration individually by editing the site's settings under Network Admin > Sites -> All Sites.",
														'pattern-wrangler',
													) }
													value={ field.value }
													onChange={ field.onChange }
													options={ [
														{
															label: __(
																'Network Only (Experimental)',
																'pattern-wrangler',
															),
															value: 'network_only',
														},
														{
															label: __(
																'Local Only (default)',
																'pattern-wrangler',
															),
															value: 'local_only',
														},
														{
															label: __(
																'Hybrid (Experimental)',
																'pattern-wrangler',
															),
															value: 'hybrid',
														},
														{
															label: __(
																'Custom (Experimental)',
																'pattern-wrangler',
															),
															value: 'custom',
														},
													] }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<PanelBody
											title={ __(
												'Pattern Configuration Help',
												'pattern-wrangler',
											) }
											initialOpen={ false }
										>
											<div className="dlx-admin__row">
												<p>
													{ __(
														'You can share local patterns across the network by selecting a source Pattern Library. Each site within the network can either control their own patterns, or inherit the Pattern Library from the source site.',
														'pattern-wrangler',
													) }
												</p>
											</div>
											<div className="dlx-admin__row">
												<table className="pw-pub-url-input__suggestion-table">
													<thead>
														<tr>
															<th>
																{ __(
																	'Pattern Configuration',
																	'pattern-wrangler',
																) }
															</th>
															<th>
																{ __(
																	'Description',
																	'pattern-wrangler',
																) }
															</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>
																{ __(
																	'Network Only (Experimental)',
																	'pattern-wrangler',
																) }
															</td>
															<td>
																{ __(
																	'Only allow patterns from the source Pattern Library to be used on the network.',
																	'pattern-wrangler',
																) }
															</td>
														</tr>
														<tr>
															<td>
																{ __(
																	'Local Only (default)',
																	'pattern-wrangler',
																) }
															</td>
															<td>
																{ __(
																	'Allow each site to manage their own patterns independently. This is the default behavior.',
																	'pattern-wrangler',
																) }
															</td>
														</tr>
														<tr>
															<td>
																{ __(
																	'Hybrid (Experimental)',
																	'pattern-wrangler',
																) }
															</td>
															<td>
																{ __(
																	'Allow each site to manage their own patterns independently, but also inherits patterns from the source Pattern Library.',
																	'pattern-wrangler',
																) }
															</td>
														</tr>
														<tr>
															<td>
																{ __(
																	'Custom (Experimental)',
																	'pattern-wrangler',
																) }
															</td>
															<td>
																{ __(
																	'Same as Local Only, but allows you to specify a different pattern configuration for each site, and configure registered patterns for the network.',
																	'pattern-wrangler',
																) }
															</td>
														</tr>
													</tbody>
												</table>
												<div className="dlx-admin__row">
													<Notice
														message={ __(
															'Pattern Wrangler can not ensure that all patterns look consistent across the network, as each site can have their own plugin and theme configurations.',
															'pattern-wrangler',
														) }
														status="warning"
														icon={ () => (
															<AlertCircle />
														) }
													/>
												</div>
												<div className="dlx-admin__row">
													<Notice
														message={ __(
															"You can force certain sites to have a different pattern configuration (e.g., Network Only or Hybrid) by editing the site's settings under Network Admin > Sites -> All Sites. This only applies to hybrid, network only, or custom site configurations.",
															'pattern-wrangler',
														) }
														status="info"
														icon={ () => <Info /> }
													/>
												</div>
											</div>
										</PanelBody>
									</div>
									{ canShowRegisteredPatternConfiguration() && (
										<>
											<div className="dlx-admin__row">
												<Controller
													control={ control }
													name="registeredPatternConfiguration"
													render={ ( { field } ) => (
														<SelectControl
															label={ __(
																'Registered Pattern Configuration',
																'pattern-wrangler',
															) }
															help={ __(
																"Select how registered patterns are handled across the network. Choose `Allow All` to allow a site's registered patterns to be used. Choose `Inherit` to use the source site's registered pattern settings. Choose `Disable` to disable registered patterns across the network.",
																'pattern-wrangler',
															) }
															value={ field.value }
															onChange={
																field.onChange
															}
															options={ [
																{
																	label: __(
																		'Allow All',
																		'pattern-wrangler',
																	),
																	value: 'allow_all',
																},
																{
																	label: __(
																		'Inherit',
																		'pattern-wrangler',
																	),
																	value: 'inherit',
																},
																{
																	label: __(
																		'Disable',
																		'pattern-wrangler',
																	),
																	value: 'disable',
																},
															] }
														/>
													) }
												/>
											</div>
										</>
									) }
									{ canShowRegisteredPatternConfiguration() && (
										<>
											<div className="dlx-admin__row">
												<Controller
													control={ control }
													name="localPatternConfiguration"
													render={ ( { field } ) => (
														<>
															<ToggleGroupControl
																label={ __(
																	'Network Source Pattern Configuration',
																	'pattern-wrangler',
																) }
																help={ __(
																	'Select which source patterns are visible when selecting patterns. If, for example, you select "Unsynced", only unsynced local patterns from the source site will be visible.',
																	'pattern-wrangler',
																) }
																isAdaptiveWidth={
																	true
																}
																value={
																	field.value
																}
																onChange={ (
																	value,
																) => {
																	field.onChange(
																		value,
																	);
																} }
															>
																<ToggleGroupControlOption
																	value="unsynced"
																	label={ __(
																		'Unsynced',
																		'pattern-wrangler',
																	) }
																	showTooltip={
																		true
																	}
																	aria-label={ __(
																		'Unsynced Local Patterns',
																		'pattern-wrangler',
																	) }
																/>
																<ToggleGroupControlOption
																	value="both"
																	label={ __(
																		'Both',
																		'pattern-wrangler',
																	) }
																	showTooltip={
																		true
																	}
																	aria-label={ __(
																		'Both Local and Synced Patterns',
																		'pattern-wrangler',
																	) }
																/>
																<ToggleGroupControlOption
																	value="synced"
																	label={ __(
																		'Synced',
																		'pattern-wrangler',
																	) }
																	showTooltip={
																		true
																	}
																	aria-label={ __(
																		'Synced Local Patterns',
																		'pattern-wrangler',
																	) }
																/>
															</ToggleGroupControl>
														</>
													) }
												/>
											</div>
										</>
									) }
									{ getSitePicker() }
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="showNetworkPatternColumns"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __(
														'Show Network Admin Site Pattern Columns',
														'pattern-wrangler',
													) }
													help={ __(
														'If enabled, site-admins can see the pattern count of each site and configuration columns in the sites list table in the network admin.',
														'pattern-wrangler',
													) }
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
									{ __(
										'Global Visibility Settings',
										'pattern-wrangler',
									) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											control={ control }
											name="hideAllPatterns"
											render={ ( { field } ) => (
												<>
													<ToggleGroupControl
														label={ __(
															'Hide All Patterns',
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide All Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change. Let site admins decide.',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show All Patterns',
																'pattern-wrangler',
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
														label={ __(
															'Hide Core Patterns',
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Core Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show Core Patterns',
																'pattern-wrangler',
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
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Remote Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show Remote Patterns',
																'pattern-wrangler',
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
														label={ __(
															'Hide Theme Patterns',
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Theme Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show Theme Patterns',
																'pattern-wrangler',
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
														label={ __(
															'Hide Plugin Patterns',
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Plugin Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show Plugin Patterns',
																'pattern-wrangler',
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
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Synced Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show Synced Patterns',
																'pattern-wrangler',
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
															'pattern-wrangler',
														) }
														isAdaptiveWidth={ true }
														value={ field.value }
														onChange={ ( value ) => {
															field.onChange(
																value,
															);
														} }
													>
														<ToggleGroupControlOption
															value="hide"
															label={ __(
																'Hide',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Hide Unsynced Patterns',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="default"
															label={ __(
																'Default',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'No Change',
																'pattern-wrangler',
															) }
														/>
														<ToggleGroupControlOption
															value="show"
															label={ __(
																'Show',
																'pattern-wrangler',
															) }
															showTooltip={ true }
															aria-label={ __(
																'Show Unsynced Patterns',
																'pattern-wrangler',
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
													label={ __(
														'Disable Patterns Importer Block',
														'pattern-wrangler',
													) }
													help={ __(
														'If enabled, the Patterns Importer block will be disabled for all sites in the network.',
														'pattern-wrangler',
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
														'pattern-wrangler',
													) }
													help={ __(
														'If enabled, the Pattern Exporter will be disabled for all sites in the network.',
														'pattern-wrangler',
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
											name="disablePatternRevisionsForNetwork"
											render={ ( { field } ) => (
												<ToggleControl
													label={ __(
														'Disable Pattern Revisions',
														'pattern-wrangler',
													) }
													help={ __(
														'If enabled, revisions are turned off for the Patterns (wp_block) post type on all sites. This overrides each site’s Pattern Wrangler setting.',
														'pattern-wrangler',
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
