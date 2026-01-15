// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import {
	ToggleControl,
	TextControl,
	SelectControl,
	PanelBody,
	Popover,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { Info, Heart } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';

// Local imports.
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';
import SendCommand from '../../utils/SendCommand';

const Main = ( props ) => {
	const data = dlxPatternWranglerAdmin.options;
	const networkOptions = dlxPatternWranglerAdmin.networkOptions;

	const [ showRatingsNag, setShowRatingsNag ] = useState( dlxPatternWranglerAdmin.canShowRatingsNag );

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
			hideAllPatterns: data.hideAllPatterns,
			hideCorePatterns: data.hideCorePatterns,
			hidePatternsMenu: data.hidePatternsMenu,
			hideRemotePatterns: data.hideRemotePatterns,
			hideCoreSyncedPatterns: data.hideCoreSyncedPatterns,
			hideCoreUnsyncedPatterns: data.hideCoreUnsyncedPatterns,
			disablePatternImporterBlock: data.disablePatternImporterBlock,
			allowFrontendPatternPreview: data.allowFrontendPatternPreview,
			hideUncategorizedPatterns: data.hideUncategorizedPatterns,
			showCustomizerUI: data.showCustomizerUI,
			loadCustomizerCSSBlockEditor: data.loadCustomizerCSSBlockEditor,
			loadCustomizerCSSFrontend: data.loadCustomizerCSSFrontend,
			hideThemePatterns: data.hideThemePatterns,
			hidePluginPatterns: data.hidePluginPatterns,
			enableEnhancedView: data.enableEnhancedView,
			showMenusUI: data.showMenusUI,
			makePatternsExportable: data.makePatternsExportable,
			saveNonce: dlxPatternWranglerAdmin.saveNonce,
			resetNonce: dlxPatternWranglerAdmin.resetNonce,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	/**
	 * Dismiss the ratings nag.
	 */
	const dismissRatingsNag = async() => {
		SendCommand( 'dlx_pw_dismiss_ratings_nag', {
			nonce: dlxPatternWranglerAdmin.dismissRatingsNagNonce,
		} ).then( () => {
		} );
	};

	/**
	 * Check if local patterns can be shown.
	 *
	 * @return {boolean} True if local patterns can be shown, false otherwise.
	 */
	const canShowLocalPatterns = () => {
		// if ( dlxPatternWranglerAdmin.isMultisite ) {
		// 	return (
		// 		networkOptions.patternConfiguration === 'hybrid' ||
		// 		networkOptions.patternConfiguration === 'network_only'
		// 	);
		// }
		return true;
	};

	/**
	 * Get the show core patterns option.
	 *
	 * @return {boolean} True if core patterns should be shown, false otherwise.
	 */
	const getShowCoreToggleControl = () => {
		const corePatternData = {
			localHidden: false,
			networkHidden: false,
		};
		corePatternData.localHidden = getValues( 'hideCorePatterns' );
		corePatternData.networkHidden = true;
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( 'hide' === networkOptions.hideCorePatterns ) {
					corePatternData.localHidden = true;
					corePatternData.networkHidden = false;
				} else if ( 'show' === networkOptions.hideCorePatterns ) {
					corePatternData.localHidden = false;
					corePatternData.networkHidden = false;
				}
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hideCorePatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __( 'Hide Core Patterns', 'pattern-wrangler' ) }
							checked={ corePatternData.localHidden }
							disabled={ ! corePatternData.networkHidden }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
							help={ __(
								'Remove all core patterns from the pattern selector by disabling core patterns.',
								'pattern-wrangler'
							) }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! corePatternData.networkHidden && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	/**
	 * Get the show remote patterns option.
	 *
	 * @return {React.Component} The remote patterns toggle control.
	 */
	const getShowRemotePatternsToggleControl = () => {
		const remotePatternData = {
			localHidden: false,
			networkHidden: false,
		};
		remotePatternData.localHidden = getValues( 'hideRemotePatterns' );
		remotePatternData.networkHidden = true;
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( 'hide' === networkOptions.hideRemotePatterns ) {
					remotePatternData.localHidden = true;
					remotePatternData.networkHidden = false;
				} else if ( 'show' === networkOptions.hideRemotePatterns ) {
					remotePatternData.localHidden = false;
					remotePatternData.networkHidden = false;
				}
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hideRemotePatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __( 'Hide Remote Patterns', 'pattern-wrangler' ) }
							checked={ remotePatternData.localHidden }
							disabled={ ! remotePatternData.networkHidden }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! remotePatternData.networkHidden && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	/**
	 * Get the show unsynced patterns option.
	 *
	 * @return {React.Component} The unsynced patterns toggle control.
	 */
	const getShowUnsyncedPatternsToggleControl = () => {
		const unsyncedPatternData = {
			localHidden: false,
			networkHidden: false,
		};
		unsyncedPatternData.localHidden = getValues( 'hideCoreUnsyncedPatterns' );
		unsyncedPatternData.networkHidden = true;
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( 'hide' === networkOptions.hideUnsyncedPatternsForNetwork ) {
					unsyncedPatternData.localHidden = true;
					unsyncedPatternData.networkHidden = false;
				} else if ( 'show' === networkOptions.hideUnsyncedPatternsForNetwork ) {
					unsyncedPatternData.localHidden = false;
					unsyncedPatternData.networkHidden = false;
				}
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hideCoreUnsyncedPatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __( 'Hide Unsynced Patterns', 'pattern-wrangler' ) }
							checked={ unsyncedPatternData.localHidden }
							disabled={ ! unsyncedPatternData.networkHidden }
							help={ __(
								'Prevent any unsynced patterns from displaying in the patterns selector. This is useful if you only want to show synced patterns.',
								'pattern-wrangler'
							) }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! unsyncedPatternData.networkHidden && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	/**
	 * Get the show synced patterns option.
	 *
	 * @return {React.Component} The synced patterns toggle control.
	 */
	const getShowSyncedPatternsToggleControl = () => {
		const syncedPatternData = {
			localHidden: false,
			networkHidden: false,
		};
		syncedPatternData.localHidden = getValues( 'hideCoreSyncedPatterns' );
		syncedPatternData.networkHidden = true;
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( 'hide' === networkOptions.hideSyncedPatternsForNetwork ) {
					syncedPatternData.localHidden = true;
					syncedPatternData.networkHidden = false;
				} else if ( 'show' === networkOptions.hideSyncedPatternsForNetwork ) {
					syncedPatternData.localHidden = false;
					syncedPatternData.networkHidden = false;
				}
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hideCoreSyncedPatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __( 'Hide Synced Patterns', 'pattern-wrangler' ) }
							checked={ syncedPatternData.localHidden }
							disabled={ ! syncedPatternData.networkHidden }
							help={ __(
								'Prevent any synced patterns from displaying in the patterns selector. This is useful if you only want to show unsynced patterns.',
								'pattern-wrangler'
							) }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! syncedPatternData.networkHidden && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	/**
	 * Get the show patterns exporter toggle control.
	 *
	 * @return {React.Component} The patterns exporter toggle control.
	 */
	const getShowPatternsExporterToggleControl = () => {
		const patternsExporterData = {
			canExport: getValues( 'makePatternsExportable' ),
			networkCanExport: true,
		};
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( networkOptions.disablePatternExporterForNetwork ) {
					patternsExporterData.canExport = false;
					patternsExporterData.networkCanExport = false;
				} else {
					patternsExporterData.canExport = getValues( 'makePatternsExportable' );
					patternsExporterData.networkCanExport = true;
				}
			} else {
				patternsExporterData.canExport = getValues(
					'disablePatternsExporterBlock'
				);
				patternsExporterData.networkCanExport = getValues(
					'disablePatternsExporterBlock'
				);
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="makePatternsExportable"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __(
								'Allow Patterns to be exportable via the WordPress Exporter',
								'pattern-wrangler'
							) }
							checked={ patternsExporterData.canExport }
							disabled={ ! patternsExporterData.networkCanExport }
							help={ __(
								'Enables or disables the default WordPress export feature for content and patterns.',
								'pattern-wrangler'
							) }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! patternsExporterData.networkCanExport && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	/**
	 * Get the permissions for the pattern importer block.
	 *
	 * @return {React.Component} The patterns exporter toggle control.
	 */
	const getShowPatternsImporterBlock = () => {
		const patternsBlockData = {
			canUseBlock: ! getValues(
				'disablePatternImporterBlock'
			),
			networkCanUseBlock: true,
		};
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( networkOptions.disablePatternImporterBlock ) {
					patternsBlockData.canUseBlock = false;
					patternsBlockData.networkCanUseBlock = false;
				} else {
					patternsBlockData.canUseBlock = true;
					patternsBlockData.networkCanUseBlock = true;
				}
			} else {
				patternsBlockData.canUseBlock = getValues(
					'disablePatternImporterBlock'
				);
				patternsBlockData.networkCanUseBlock = getValues(
					'disablePatternImporterBlock'
				);
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="disablePatternImporterBlock"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __(
								'Allow Patterns to be imported via the Patterns Importer Block',
								'pattern-wrangler'
							) }
							checked={ false === patternsBlockData.canUseBlock ? false : value }
							disabled={ ! patternsBlockData.networkCanUseBlock }
							help={ __(
								'Disable the patterns importer block, which helps load in remote images.',
								'pattern-wrangler'
							) }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! patternsBlockData.networkCanUseBlock && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	const getShowThemePatternsToggleControl = () => {
		const themePatternData = {
			canShow: false,
			networkCanShow: false,
		};
		themePatternData.canShow = getValues( 'hideThemePatterns' );
		themePatternData.networkCanShow = true;
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if ( 'hide' === networkOptions.hideThemePatterns ) {
				themePatternData.canShow = false;
				themePatternData.networkCanShow = false;
			} else if ( 'show' === networkOptions.hideThemePatterns ) {
				themePatternData.canShow = true;
				themePatternData.networkCanShow = false;
			} else {
				themePatternData.canShow = getValues( 'hideThemePatterns' );
				themePatternData.networkCanShow = true;
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hideThemePatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __(
								'Hide Theme Patterns',
								'pattern-wrangler'
							) }
							checked={ value || 'default' === value }
							disabled={ ! themePatternData.networkCanShow }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
							help={ __(
								'Prevent patterns registered by the active theme from displaying in the patterns list.',
								'pattern-wrangler'
							) }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! themePatternData.networkCanShow && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	const getShowPluginPatternsToggleControl = () => {
		const pluginPatternData = {
			canShow: false,
			networkCanShow: false,
		};
		pluginPatternData.canShow = getValues( 'hidePluginPatterns' );
		pluginPatternData.networkCanShow = true;
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if ( 'hide' === networkOptions.hidePluginPatterns ) {
				pluginPatternData.canShow = false;
				pluginPatternData.networkCanShow = false;
			} else if ( 'show' === networkOptions.hidePluginPatterns ) {
				pluginPatternData.canShow = true;
				pluginPatternData.networkCanShow = false;
			}
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hidePluginPatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __(
								'Hide Plugin Patterns',
								'pattern-wrangler'
							) }
							checked={ value || 'default' === 'value' }
							disabled={ ! pluginPatternData.networkCanShow }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
							help={ __(
								'Prevent patterns registered by active plugins from displaying in the patterns list.',
								'pattern-wrangler'
							) }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					! pluginPatternData.networkCanShow && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	/**
	 * Get the Hide All Patterns togggle control.
	 *
	 * @return {React.Component} The patterns exporter toggle control.
	 */
	const getHideAllPatternsToggleControl = () => {
		const hideAllPatternsData = {
			allPatternsDisabled: false,
			networkAllPatternsDisabled: false,
		};
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if ( networkOptions.patternConfiguration === 'disabled' || 'hide' === networkOptions.hideAllPatterns ) {
				hideAllPatternsData.allPatternsDisabled = true;
				hideAllPatternsData.networkAllPatternsDisabled = true;
			} else if ( 'show' === networkOptions.hideAllPatterns ) {
				hideAllPatternsData.allPatternsDisabled = false;
				hideAllPatternsData.networkAllPatternsDisabled = true;
			} else {
				hideAllPatternsData.allPatternsDisabled = getValues( 'hideAllPatterns' );
				hideAllPatternsData.networkAllPatternsDisabled = false;
			}
		} else {
			hideAllPatternsData.allPatternsDisabled = getValues( 'hideAllPatterns' );
			hideAllPatternsData.networkAllPatternsDisabled = false;
		}
		return (
			<div className="dlx-admin__row">
				<Controller
					name="hideAllPatterns"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ToggleControl
							label={ __( 'Hide All Patterns', 'pattern-wrangler' ) }
							checked={ hideAllPatternsData.allPatternsDisabled }
							disabled={ hideAllPatternsData.networkAllPatternsDisabled }
							help={ __(
								'Disable all patterns and the pattern selector.',
								'pattern-wrangler'
							) }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					hideAllPatternsData.networkAllPatternsDisabled && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						{ __(
							'This setting is overridden by the network settings.',
							'pattern-wrangler'
						) }
					</Notice>
				) }
			</div>
		);
	};

	return (
		<>
			<div className="dlx-pw-admin-content-heading">
				<h1>
					<span className="dlx-pw-content-heading-text">
						{ __( 'Settings for Pattern Wrangler', 'pattern-wrangler' ) }
					</span>
				</h1>
				<p className="description">
					{ __(
						'Configure which patterns are displayed and adjust settings.',
						'pattern-wrangler'
					) }
				</p>
				{ showRatingsNag && (
					<Notice
						className="dlx-pw-admin-notice"
						status="rating"
						icon={ () => <Heart /> }
						dismissible={ true }
						onRemove={ () => {
							setShowRatingsNag( false );
							dismissRatingsNag();
						} }
					>
						{ __( 'Thank you for using Pattern Wrangler! Please show your support by leaving a kind review on WordPress.org.', 'pattern-wrangler' ) }
						<div className="dlx-admin-component-row-button buttons-ratings-nag">
							<Button
								variant="secondary"
								href="https://wordpress.org/support/plugin/pattern-wrangler/reviews/#new-post"
								target="_blank"
								className="dlx__btn-rating"
								onClick={ () => {
									setShowRatingsNag( false );
									dismissRatingsNag();
								} }
							>
								{ __( 'Leave a Review', 'pattern-wrangler' ) }
							</Button>
							<Button
								variant="link"
								onClick={ () => {
									setShowRatingsNag( false );
									dismissRatingsNag();
								} }
							>
								{ __( 'Do not show this again', 'pattern-wrangler' ) }
							</Button>
						</div>
					</Notice>
				) }
				{ dlxPatternWranglerAdmin.isMultisite &&
					dlxPatternWranglerAdmin.isUserNetworkAdmin && (
					<Notice
						className="dlx-pw-admin-notice"
						variant="info"
						icon={ () => <Info /> }
					>
						<div>
							{ __(
								'This is a multisite installation. You can manage network settings by clicking the button below.',
								'pattern-wrangler'
							) }
						</div>
						<div>
							<Button
								variant="link"
								href={ dlxPatternWranglerAdmin.networkAdminSettingsUrl }
								target="_blank"
							>
								{ __( 'Network Settings', 'pattern-wrangler' ) }
							</Button>
						</div>
					</Notice>
				) }
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( ( formData ) => {} ) }>
				<div id="dlx-pw-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">{ __( 'Enhanced View', 'pattern-wrangler' ) }</th>
								<td>
									<Controller
										name="enableEnhancedView"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Enable Enhanced Patterns View',
													'pattern-wrangler'
												) }
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'This will enable the enhanced patterns view when viewing all patterns rather than showing a classic interface.',
													'pattern-wrangler'
												) }
											/>
										) }
									/>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Pattern Visibility', 'pattern-wrangler' ) }
								</th>
								<td>
									{ getHideAllPatternsToggleControl() }
									{ canShowLocalPatterns() && (
										<>
											{ getValues( 'hideAllPatterns' ) && (
												<div className="dlx-admin__row">
													<Controller
														name="hidePatternsMenu"
														control={ control }
														render={ ( { field: { onChange, value } } ) => (
															<ToggleControl
																label={ __(
																	'Hide Pattern Wrangler Menu Item',
																	'pattern-wrangler'
																) }
																checked={ value }
																onChange={ ( boolValue ) => {
																	onChange( boolValue );
																} }
																help={ __(
																	'This will disable the top-level menu and move the Patterns menu under Appearance.',
																	'pattern-wrangler'
																) }
															/>
														) }
													/>
												</div>
											) }
											{ getShowCoreToggleControl() }
											{ getShowRemotePatternsToggleControl() }
											{ getShowThemePatternsToggleControl() }
											{ getShowPluginPatternsToggleControl() }
											{ getShowUnsyncedPatternsToggleControl() }
											{ getShowSyncedPatternsToggleControl() }
											<div className="dlx-admin__row">
												<Controller
													name="hideUncategorizedPatterns"
													control={ control }
													render={ ( { field: { onChange, value } } ) => (
														<ToggleControl
															label={ __(
																'Hide Uncategorized Patterns',
																'pattern-wrangler'
															) }
															checked={ value }
															onChange={ ( boolValue ) => {
																onChange( boolValue );
															} }
															help={ __(
																'Prevent any patterns not in any registered categories from displaying.',
																'pattern-wrangler'
															) }
														/>
													) }
												/>
											</div>
										</>
									) }
								</td>
							</tr>
							<tr>
								<th scope="row">{ __( 'Customizer', 'pattern-wrangler' ) }</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="showCustomizerUI"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleGroupControl
													label={ __( 'Show Customizer UI', 'pattern-wrangler' ) }
													isAdaptiveWidth={ true }
													value={ value }
													onChange={ ( newValue ) => {
														onChange( newValue );
													} }
												>
													<ToggleGroupControlOption
														value="hide"
														label={ __( 'Hide', 'pattern-wrangler' ) }
														showTooltip={ true }
														aria-label={ __(
															'Hide Customizer UI',
															'pattern-wrangler'
														) }
													/>
													<ToggleGroupControlOption
														value="default"
														label={ __( 'Default', 'pattern-wrangler' ) }
														showTooltip={ true }
														aria-label={ __( 'No Change.', 'pattern-wrangler' ) }
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
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="loadCustomizerCSSBlockEditor"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Load Customizer CSS in the Block Editor',
														'pattern-wrangler'
													) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'This will load any CSS in the customizer in the block editor as well.',
														'pattern-wrangler'
													) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="loadCustomizerCSSFrontend"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Load Customizer CSS on the Frontend',
														'pattern-wrangler'
													) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'By default, WordPress loads customizer CSS on the frontend. Disable this option to prevent any customizer CSS from loading.',
														'pattern-wrangler'
													) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">{ __( 'Miscellaneous', 'pattern-wrangler' ) }</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="showMenusUI"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Force Show Menus UI', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'This will show the menus UI in the Appearance settings menu if enabled. Disabilng this will not hide the menu item.',
														'pattern-wrangler'
													) }
												/>
											) }
										/>
									</div>
									{ getShowPatternsImporterBlock() }
									<div className="dlx-admin__row">
										<Controller
											name="allowFrontendPatternPreview"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __(
														'Enable a Pattern Preview on the Frontend',
														'pattern-wrangler'
													) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'This will enable previews in the patterns post type so you can preview a pattern as if it were on a page.',
														'pattern-wrangler'
													) }
												/>
											) }
										/>
									</div>
									{ getShowPatternsExporterToggleControl() }
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
