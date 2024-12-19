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
import { AlertTriangle, CheckCircle } from 'lucide-react';

import { __, _n } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';

const retrieveOptions = () => {
	return SendCommand( 'dlx_pw_get_network_options', {
		nonce: dlxPatternWranglerNetworkAdminSettings.getNonce,
	} );
};

const Setings = ( props ) => {
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
										Test row
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

export default Setings;
