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

	const [ selectedSiteId, setSelectedSiteId ] = useState( dlxPatternWranglerNetworkAdminSettings.selectedSite );
	const [ selectedSitePermalink, setSelectedSitePermalink ] = useState( dlxPatternWranglerNetworkAdminSettings.selectedSitePermalink );
	const [ selectedSiteTitle, setSelectedSiteTitle ] = useState( dlxPatternWranglerNetworkAdminSettings.selectedSiteTitle );

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
			patternMothershipSiteId: data.patternMothershipSiteId,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	return (
		<>
			<div className="dlx-pw-admin-content-heading">
				<h1><span className="dlx-pw-content-heading-text">{ __( 'Network Settings for Pattern Wrangler', 'pattern-wrangler' ) }</span></h1>
				<p className="description">
					{
						__( 'Configure the source-of-truth for patterns and adjust site and network settings.', 'pattern-wrangler' )
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
									{ __( 'Network Settings', 'pattern-wrangler' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<BaseControl
											id="dlx-pw-network-settings-default-patterns-source"
											label={ __( 'Default Patterns Source', 'pattern-wrangler' ) }
											help={ __( 'Select the site that will be used as the source of truth for patterns across the network.', 'pattern-wrangler' ) }
										>
											<SitePicker
												restEndpoint={ dlxPatternWranglerNetworkAdminSettings.restEndpoint }
												restNonce={ dlxPatternWranglerNetworkAdminSettings.restNonce }
												selectedSite={ selectedSiteId }
												savedTitle={ selectedSiteTitle }
												savedPermalink={ selectedSitePermalink }
												onItemSelect={ ( item ) => {
													console.log( 'item', item );
												} }
											/>
										</BaseControl>
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

export default Settings;
