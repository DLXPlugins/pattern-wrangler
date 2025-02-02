// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import {
	ToggleControl,
	TextControl,
	Tooltip,
	SelectControl,
	PanelBody,
	Popover,
	Button,
} from '@wordpress/components';
import { useAsyncResource } from 'use-async-resource';
import { Info, AlertTriangle } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';

const usePatternCategories = ( props ) => {
	const { getValues } = props;

	const getEnabledCategories = () => {
		const categories = getValues( 'categories' );
		if ( ! categories ) {
			return null;
		}
		return Object.values( categories ).filter( ( category ) => category.enabled );
	};

	return {
		enabledCategories: getEnabledCategories(),
	};
};

const Category = ( props ) => {
	const [ showLabelPopover, setShowLabelPopover ] = useState( false );
	const [ labelEditButton, setLabelEditButton ] = useState( false );
	const { category, control, getValues, setValue, taxCategories } = props;
	const { enabledCategories } = usePatternCategories( { getValues } );

	const getCategories = () => {
		const localCategories = taxCategories.map( ( cat ) => {
			return {
				label: cat.name + ' (' + cat.slug + ')',
				value: cat.slug,
			};
		} );
		localCategories.push( {
			label: __( 'None', 'pattern-wrangler' ),
			value: 'none',
		} );
		return localCategories;
	};

	/**
	 * Make sure mapped to category is valid, especially if a mapped category is disabled.
	 */
	useEffect( () => {
		if (
			category.mappedTo &&
			! getCategories().find( ( cat ) => cat.value === category.mappedTo )
		) {
			setValue( `categories.${ category.slug }.mappedTo`, 'none' );
		}
	}, [ enabledCategories ] );

	/**
	 * Get the label to display.
	 *
	 * @return {string} The label to display.
	 */
	const getLabel = () => {
		if ( category.customLabel && category.customLabel.length > 0 ) {
			return category.customLabel;
		}
		return category.label;
	};

	return (
		<>
			{ showLabelPopover && (
				<Popover
					placement="right-start"
					onClose={ () => setShowLabelPopover( false ) }
					anchor={ labelEditButton }
					noArrow={ false }
					offset={ 10 }
				>
					<div className="dlx-category-popover">
						<Controller
							name={ `categories.${ category.slug }.customLabel` }
							control={ control }
							render={ ( { field: { onChange, value } } ) => (
								<TextControl
									label={ __( 'Category Label', 'pattern-wrangler' ) }
									value={ value }
									onChange={ ( newValue ) => {
										onChange( newValue );
									} }
								/>
							) }
						/>
					</div>
				</Popover>
			) }
			<div className="dlx-category-row">
				<div className="dlx-category-row__toggle">
					<Controller
						name={ `categories.${ category.slug }.enabled` }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								aria-label={ category.label }
								checked={ value }
								onChange={ ( boolValue ) => {
									// If disabled and mapped slug to uncategorized.
									if ( ! boolValue && ! category.mappedTo ) {
										setValue( `categories.${ category.slug }.mappedTo`, 'none' );
									}
									onChange( boolValue );
								} }
							/>
						) }
					/>
				</div>
				<div className="dlx-category-row__label">
					<div className="dlx-category-row__label-text">
						{ getLabel() }{ ' ' }
						<Button
							variant="link"
							className="dlx-category-row__label-link"
							ref={ setLabelEditButton }
							onClick={ () => setShowLabelPopover( true ) }
						>
							{ __( 'Edit', 'pattern-wrangler' ) }
						</Button>
					</div>
					<div className="dlx-category-row__slug">{ category.slug }</div>
					<div className="dlx-category-row__count">
						{ category.count }{ ' ' }
						{ _n( 'Pattern', 'Patterns', category.count, 'pattern-wrangler' ) }
					</div>
					{ ! category.enabled && (
						<div className="dlx-category-row__map">
							<Controller
								name={ `categories.${ category.slug }.mappedTo` }
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<SelectControl
										label={ __( 'Map to Category', 'pattern-wrangler' ) }
										value={ value }
										onChange={ ( newValue ) => {
											onChange( newValue );
										} }
										options={ getCategories() }
									/>
								) }
							/>
						</div>
					) }
				</div>
			</div>
		</>
	);
};

const Main = ( props ) => {
	const data = dlxPatternWranglerAdmin.options;
	const networkOptions = dlxPatternWranglerAdmin.networkOptions;

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
			categories: data.registered ?? [],
			makePatternsExportable: data.makePatternsExportable,
			saveNonce: dlxPatternWranglerAdmin.saveNonce,
			resetNonce: dlxPatternWranglerAdmin.resetNonce,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	const getCategories = () => {
		const categories = getValues( 'categories' );

		return (
			<ul className="dlx-category-list">
				{ Object.values( categories ).map( ( category ) => {
					return (
						<li key={ category.slug }>
							<Category
								category={ category }
								control={ control }
								getValues={ getValues }
								setValue={ setValue }
								taxCategories={ data.categories }
							/>
						</li>
					);
				} ) }
			</ul>
		);
	};

	/**
	 * Check if local patterns can be shown.
	 *
	 * @return {boolean} True if local patterns can be shown, false otherwise.
	 */
	const canShowLocalPatterns = () => {
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			return (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			);
		}
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
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( networkOptions.hideCorePatterns ) {
					corePatternData.localHidden = true;
					corePatternData.networkHidden = true;
				} else {
					corePatternData.localHidden = getValues( 'hideCorePatterns' );
					corePatternData.networkHidden = false;
				}
			}
		} else {
			corePatternData.localHidden = getValues( 'hideCorePatterns' );
			corePatternData.networkHidden = getValues( 'hideCorePatterns' );
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
							disabled={ corePatternData.networkHidden }
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
					corePatternData.networkHidden && (
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
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( networkOptions.hideRemotePatterns ) {
					remotePatternData.localHidden = true;
					remotePatternData.networkHidden = true;
				} else {
					remotePatternData.localHidden = getValues( 'hideRemotePatterns' );
					remotePatternData.networkHidden = false;
				}
			}
		} else {
			remotePatternData.localHidden = getValues( 'hideRemotePatterns' );
			remotePatternData.networkHidden = getValues( 'hideRemotePatterns' );
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
							disabled={ remotePatternData.networkHidden }
							onChange={ ( boolValue ) => {
								onChange( boolValue );
							} }
						/>
					) }
				/>
				{ dlxPatternWranglerAdmin.isMultisite &&
					remotePatternData.networkHidden && (
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
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( networkOptions.hideUnsyncedPatternsForNetwork ) {
					unsyncedPatternData.localHidden = true;
					unsyncedPatternData.networkHidden = true;
				} else {
					unsyncedPatternData.localHidden = getValues(
						'hideCoreUnsyncedPatterns'
					);
					unsyncedPatternData.networkHidden = false;
				}
			}
		} else {
			unsyncedPatternData.localHidden = getValues( 'hideCoreUnsyncedPatterns' );
			unsyncedPatternData.networkHidden = getValues( 'hideCoreUnsyncedPatterns' );
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
							disabled={ unsyncedPatternData.networkHidden }
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
					unsyncedPatternData.networkHidden && (
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
		if ( dlxPatternWranglerAdmin.isMultisite ) {
			if (
				networkOptions.patternConfiguration === 'hybrid' ||
				networkOptions.patternConfiguration === 'network_only'
			) {
				if ( networkOptions.hideSyncedPatternsForNetwork ) {
					syncedPatternData.localHidden = true;
					syncedPatternData.networkHidden = true;
				} else {
					syncedPatternData.localHidden = getValues( 'hideCoreSyncedPatterns' );
					syncedPatternData.networkHidden = false;
				}
			}
		} else {
			syncedPatternData.localHidden = getValues( 'hideCoreSyncedPatterns' );
			syncedPatternData.networkHidden = getValues( 'hideCoreSyncedPatterns' );
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
							disabled={ syncedPatternData.networkHidden }
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
					syncedPatternData.networkHidden && (
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
			canExport: false,
			networkCanExport: false,
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
								'Disable the patterns exporter block, which helps export patterns to other sites.',
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
			canUseBlock: false,
			networkCanUseBlock: false,
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
							checked={ patternsBlockData.canUseBlock }
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
			if ( networkOptions.patternConfiguration === 'disabled' ) {
				hideAllPatternsData.allPatternsDisabled = false;
				hideAllPatternsData.networkAllPatternsDisabled = false;
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
						'Configure which patterns are displayed and adjust settings and categories.',
						'pattern-wrangler'
					) }
				</p>
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
															checked={ value }
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
											</div>
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
															checked={ value }
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
											</div>
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
												<ToggleControl
													label={ __( 'Show Customizer UI', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'This will show the customizer UI in the Appearance menu if enabled.',
														'pattern-wrangler'
													) }
												/>
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
													label={ __( 'Show Menus UI', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __(
														'This will show the menus UI in the Appearance menu if enabled.',
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
							<tr className="dlx-table-row-categories">
								<th scope="row">
									{ __( 'Pattern Categories', 'pattern-wrangler' ) }
								</th>
								<td>
									{ Object.values( getValues( 'categories' ) ).length === 0 && (
										<div className="dlx-admin__row dlx-admin__row-full-width">
											<p>
												{ __(
													'No categories have been registered via core, themes or plugins.',
													'pattern-wrangler'
												) }
											</p>
										</div>
									) }
									{ Object.values( getValues( 'categories' ) ).length > 0 && (
										<div className="dlx-admin__row dlx-admin__row-full-width">
											<PanelBody
												title={ __( 'Pattern Categories', 'pattern-wrangler' ) }
												initialOpen={ false }
											>
												{ getCategories() }
											</PanelBody>
										</div>
									) }
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
