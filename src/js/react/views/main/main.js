// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState, useEffect } from 'react';
import {
	ToggleControl,
	TextControl,
	CheckboxControl,
	ComboboxControl,
	BaseControl,
	SelectControl,
	PanelBody,
	Popover,
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
					<h2>{ __( 'Loading…', 'pattern-wrangler' ) }</h2>
				</>
			}
		>
			<Interface defaults={ defaults } { ...props } />
		</Suspense>
	);
};

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
		if ( category.mappedTo && ! getCategories().find( ( cat ) => cat.value === category.mappedTo ) ) {
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
						{ getLabel() }
						{ ' ' }
						<Button
							variant="link"
							className="dlx-category-row__label-link"
							ref={ setLabelEditButton }
							onClick={ () => setShowLabelPopover( true ) }
						>
							{ __( 'Edit', 'pattern-wrangler' ) }
						</Button>
					</div>
					<div className="dlx-category-row__slug">
						{ category.slug }
					</div>
					<div className="dlx-category-row__count">
						{ category.count } { _n( 'Pattern', 'Patterns', category.count, 'pattern-wrangler' ) }
					</div>
					{
						! category.enabled && (
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
						)
					}
				</div>
			</div>
		</>
	);
};

const Interface = ( props ) => {
	const { defaults } = props;
	const response = defaults();
	const { data } = response.data;

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
			disablePatternImporterBlock: data.disablePatternImporterBlock,
			allowFrontendPatternPreview: data.allowFrontendPatternPreview,
			hideUncategorizedPatterns: data.hideUncategorizedPatterns,
			showCustomizerUI: data.showCustomizerUI,
			loadCustomizerCSSBlockEditor: data.loadCustomizerCSSBlockEditor,
			loadCustomizerCSSFrontend: data.loadCustomizerCSSFrontend,
			hideThemePatterns: data.hideThemePatterns,
			hidePluginPatterns: data.hidePluginPatterns,
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
							<Category category={ category } control={ control } getValues={ getValues } setValue={ setValue } taxCategories={ data.categories } />
						</li>
					);
				} ) }
			</ul>
		);
	};
	return (
		<>
			<div className="dlx-pw-admin-content-heading">
				<h1><span className="dlx-pw-content-heading-text">{ __( 'Settings for Pattern Wrangler', 'pattern-wrangler' ) }</span></h1>
				<p className="description">
					{
						__( 'Configure which patterns are displayed and adjust settings and categories.', 'pattern-wrangler' )
					}
				</p>
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( ( formData ) => { } ) }>
				<div id="dlx-pw-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">
									{ __( 'Pattern Visibility', 'pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="hideAllPatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide All Patterns', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Disable all patterns and the pattern selector.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									{ getValues( 'hideAllPatterns' ) && (
										<div className="dlx-admin__row">
											<Controller
												name="hidePatternsMenu"
												control={ control }
												render={ ( { field: { onChange, value } } ) => (
													<ToggleControl
														label={ __( 'Hide Pattern Wrangler Menu Item', 'pattern-wrangler' ) }
														checked={ value }
														onChange={ ( boolValue ) => {
															onChange( boolValue );
														} }
														help={ __( 'This will disable the top-level menu and move the Patterns menu under Appearance.', 'pattern-wrangler' ) }
													/>
												) }
											/>
										</div>
									) }
									<div className="dlx-admin__row">
										<Controller
											name="hideCorePatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide Core Patterns', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Remove all core patterns from the pattern selector by disabling core patterns.', 'pattern-wrangler' ) }
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
													label={ __( 'Hide Remote Patterns', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Prevent users from searching for remote patterns in the pattern selector.', 'pattern-wrangler' ) }
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
													label={ __( 'Hide Theme Patterns', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Prevent patterns registered by the active theme from displaying in the patterns list.', 'pattern-wrangler' ) }
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
													label={ __( 'Hide Plugin Patterns', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Prevent patterns registered by active plugins from displaying in the patterns list.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="hideUncategorizedPatterns"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Hide Uncategorized Patterns', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Prevent any patterns not in any registered categories from displaying.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Customizer', 'pattern-wrangler' ) }
								</th>
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
													help={ __( 'This will show the customizer UI in the Appearance menu if enabled.', 'pattern-wrangler' ) }
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
													label={ __( 'Load Customizer CSS in the Block Editor', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'This will load any CSS in the customizer in the block editor as well.', 'pattern-wrangler' ) }
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
													label={ __( 'Load Customizer CSS on the Frontend', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'By default, WordPress loads customizer CSS on the frontend. Disable this option to prevent any customizer CSS from loading.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Miscellaneous', 'pattern-wrangler' ) }
								</th>
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
													help={ __( 'This will show the menus UI in the Appearance menu if enabled.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="disablePatternImporterBlock"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Disable Patterns Importer Block', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Disable the pattern importer block, which helps load in remote images.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="allowFrontendPatternPreview"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Enable a Pattern Preview on the Frontend', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'This will enable previews in the patterns post type so you can preview a pattern as if it were on a page.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="makePatternsExportable"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Allow Patterns to be exportable via the WordPress Exporter', 'pattern-wrangler' ) }
													checked={ value }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'This will allow Patterns to be exportable. When you are done exporting, it is advised to switch this back off.', 'pattern-wrangler' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr className="dlx-table-row-categories">
								<th scope="row">
									{ __( 'Pattern Categories', 'pattern-wrangler' ) }
								</th>
								<td>
									{ ( Object.values( getValues( 'categories' ) ).length === 0 ) && (
										<div className="dlx-admin__row dlx-admin__row-full-width" >
											<p>
												{ __( 'No categories have been registered via core, themes or plugins.', 'pattern-wrangler' ) }
											</p>
										</div>
									) }
									{ ( Object.values( getValues( 'categories' ) ).length > 0 ) && (
										<div className="dlx-admin__row dlx-admin__row-full-width" >
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
