import React, { useState } from 'react';
import { Loader2, ClipboardCheck } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { Button, Snackbar } from '@wordpress/components';
import Notice from '../Notice';
import SendCommand from '../../utils/SendCommand';
import SnackPop from '../SnackPop';

export function onSave( formData, setError ) {

}

export function onReset( { formValues, setError, reset } ) {

}

const SaveResetButtons = ( props ) => {
	// Gather props.
	const {
		formValues,
		setError,
		reset,
		errors,
		isDirty,
		dirtyFields,
		trigger,
	} = props;

	const [ saving, setSaving ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );
	const [ savePromise, setSavePromise ] = useState( null );
	const [ resetPromise, setResetPromise ] = useState( null );

	/**
	 * Save the options by setting promise as state.
	 */
	const saveOptions = async () => {
		const saveOptionsPromise = SendCommand( 'dlx_pw_save_options', { formData: formValues } );
		setSavePromise( saveOptionsPromise );
		setSaving( true );
		await saveOptionsPromise;
		setSaving( false );
	};

	/**
	 * Reset the options by setting promise as state.
	 */
	const resetOptions = async () => {
		const resetOptionsPromise = SendCommand( 'dlx_pw_reset_options', { formData: formValues } );
		setResetPromise( resetOptionsPromise );
		setResetting( true );
		const resetResponse = await resetOptionsPromise;
		reset(
			resetResponse.data.data.formData,
			{
				keepErrors: false,
				keepDirty: false,
			},
		);
		setResetting( false );
	};

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const getSaveIcon = () => {
		if ( saving ) {
			return () => <Loader2 />;
		}
		if ( isSaved ) {
			return () => <ClipboardCheck />;
		}
		return false;
	};

	const getSaveText = () => {
		if ( saving ) {
			return __( 'Saving…', 'dlx-pattern-wrangler' );
		}
		if ( isSaved ) {
			return __( 'Saved', 'dlx-pattern-wrangler' );
		}
		return __( 'Save Options', 'dlx-pattern-wrangler' );
	};

	const getResetText = () => {
		if ( resetting ) {
			return __( 'Resetting to Defaults…', 'dlx-pattern-wrangler' );
		}
		if ( isReset ) {
			return __( 'Options Restored to Defaults', 'dlx-pattern-wrangler' );
		}
		return __( 'Reset to Defaults', 'dlx-pattern-wrangler' );
	};

	return (
		<>
			<div className="dlx-pw-admin-buttons">
				<Button
					className={ classNames(
						'dlx-gb_hacks__btn dlx-gb_hacks__btn-primary dlx-gb_hacks__btn--icon-right',
						{ 'has-error': hasErrors() },
						{ 'has-icon': saving || isSaved },
						{ 'is-saving': saving && ! isSaved },
						{ 'is-saved': isSaved },
					) }
					variant="primary"
					type="button"
					text={ getSaveText() }
					icon={ getSaveIcon() }
					iconSize="18"
					iconPosition="right"
					disabled={ saving }
					onClick={ async ( e ) => {
						e.preventDefault();
						const validationResult = await trigger();
						if ( validationResult ) {
							saveOptions();
						}
					} }
				/>
				<Button
					className={ classNames(
						'dlx-gb_hacks__btn dlx-gb_hacks__btn-danger dlx-gb_hacks__btn--icon-right',
						{ 'has-icon': resetting },
						{ 'is-resetting': { resetting } },
					) }
					variant="secondary"
					type="button"
					text={ getResetText() }
					icon={ resetting ? <Loader2 /> : false }
					iconSize="18"
					iconPosition="right"
					isDestructive={ true }
					disabled={ saving || resetting }
					onClick={ ( e ) => {
						e.preventDefault();
						resetOptions();
					} }
				/>
			</div>
			<div className="dlx-pw-admin-notices-bottom">
				<SnackPop
					ajaxOptions={ savePromise }
					loadingMessage={ __( 'Saving Options…', 'dlx-pattern-wrangler' ) }
				/>
				<SnackPop
					ajaxOptions={ resetPromise }
					loadingMessage={ __( 'Resetting to defaults…', 'dlx-pattern-wrangler' ) }
				/>
				{ hasErrors() && (
					<Notice
						message={ __(
							'There are form validation errors. Please correct them above.',
							'dlx-pattern-wrangler',
						) }
						status="error"
						politeness="polite"
					/>
				) }
			</div>
		</>
	);
};
export default SaveResetButtons;
