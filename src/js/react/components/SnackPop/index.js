import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Snackbar as WPSnackBar, Modal, Button } from '@wordpress/components';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import Notice from '../Notice';

/**
 * SnackPop is a component which handles alerts and notifications for the user.
 * It can handle multiple alerts at once, toggles and forms, and will display the notifications in a queue.
 *
 * @param {Object} props Component props.
 *
 * @return {Element} JSX markup for the component.
 */
const SnackPop = ( props ) => {
	const { ajaxOptions, loadingMessage } = props;

	const snackbarDefaults = {
		type: 'info',
		message: '',
		title: '',
		isDismissable: false,
		isPersistent: false,
		isSuccess: false,
		loadingMessage,
		politeness: 'polite', /* can also be assertive */
	};

	const [ notificationOptions, setNotificationOptions ] = useState( snackbarDefaults );
	const [ isBusy, setIsBusy ] = useState( false );
	const [ isModalVisible, setIsModalVisible ] = useState( false );
	const [ isSnackbarVisible, setIsSnackbarVisible ] = useState( false );
	const [ snackbarTimeout, setSnackbarTimeout ] = useState( null );

	useEffect( () => {
		const getPromise = async () => {
			const response = await ajaxOptions;
			return response;
		};
		if ( ajaxOptions instanceof Promise ) {
			// Set state to busy.
			setNotificationOptions( snackbarDefaults );
			setIsSnackbarVisible( true );
			setIsBusy( true );

			getPromise().then( ( response ) => {
				const { data } = response;
				const { success: isSuccess } = data;
				const { data: responseData } = data;

				// Get the type of notification. (error, info, success, warning, critical, confirmation).
				const type = responseData.type || 'info';

				// Get the message.
				const message = responseData.message || '';

				// Get the title.
				const title = responseData.title || ''; /* title of snackbar or modal */

				// Get whether the notification is dismissable.
				const isDismissable = responseData.dismissable || false; /* whether the snackbar or modal is dismissable */

				// Get whether the notification is persistent.
				const isPersistent = responseData.persistent || false; /* whether the snackbar or modal is persistent */

				// Get the politeness based on if successful.
				const politeness = isSuccess ? 'polite' : 'assertive';

				// Set state with the notification.
				setNotificationOptions( {
					type,
					message,
					title,
					isDismissable,
					isBusy: false,
					isPersistent,
					politeness,
				} );

				if ( isSuccess ) {
					//onSuccess( notificationOptions );
				} else {
					//onError( notificationOptions );
				}
				if ( 'critical' === type ) {
					setIsSnackbarVisible( false );
					setIsModalVisible( true );
				} else {
					clearTimeout( snackbarTimeout );
					setSnackbarTimeout( setTimeout( () => {
						setIsSnackbarVisible( false );
						setNotificationOptions( snackbarDefaults );
					}, 6000 ) );
				}
			} ).catch( ( error ) => {
				// Handle error
				setNotificationOptions( {
					type: 'critical',
					message: error.message,
					title: __( 'An Error Has Occurred', 'dlx-pattern-wrangler' ),
					isDismissable: false,
					isBusy: false,
					isPersistent: true,
					politeness: 'assertive',
				} );
				//onError( notificationOptions );
			} ).then( () => {
				// Set state to not busy.
				setIsBusy( false );
			} );
		}
	}, [ ajaxOptions ] );

	// Bail if no promise.
	if ( null === ajaxOptions ) {
		return (
			<></>
		);
	}

	/**
	 * Gets the icon for the notification.
	 *
	 * @return {Element} JSX markup for the icon.
	 */
	const getIcon = () => {
		switch ( notificationOptions.type ) {
			case 'success':
				return <CheckCircle2 />;
			case 'error':
			case 'critical':
				return <AlertCircle />;
			default:
				return <Loader2 />;
		}
	};

	const getSnackbarActions = () => {
		const actions = [];
		if ( notificationOptions.type === 'success' ) {
			actions.push( {
				label: __( 'Back to Top', 'dlx-pattern-wrangler' ),
				url: '#dlx-pw-admin-header',
				variant: 'link',
				className: 'dlx-pw-admin__notice-action dlx-pw-admin__notice-action--to-top',
			} );
		}
		return actions;
	};

	const getSnackBar = () => {
		return (
			<WPSnackBar
				className={
					classnames(
						`dlx-pw-snackbar dlx-pw-snackbar-${ notificationOptions.type }`,
						{
							'dlx-pw-snackbar-loading': isBusy,
						}
					)
				}
				actions={ getSnackbarActions() }
				icon={ getIcon() }
				onDismiss={ () => setIsSnackbarVisible( false ) }
				explicitDismiss={ notificationOptions.isDismissable }
			>
				{ isBusy ? loadingMessage : notificationOptions.message }
			</WPSnackBar>
		);
	};

	const getModal = () => {
		if ( 'critical' === notificationOptions.type ) {
			return (
				<Modal
					className={
						classnames(
							`dlx-pw-modal dlx-pw-modal-${ notificationOptions.type }`,
							{
								'dlx-pw-modal-loading': isBusy,
							}
						)
					}
					bodyOpenClassName={ 'dlx-pw-modal-body-open' }
					title={ notificationOptions.title }
					onRequestClose={ () => {
						setIsModalVisible( false );
					} }
					isDismissible={ true }
					shouldCloseOnClickOutside={ notificationOptions.isPersistent }
					shouldCloseOnEsc={ notificationOptions.isPersistent }
				>
					<Notice
						message={ notificationOptions.message }
						status={ notificationOptions.type }
						politeness={ notificationOptions.politeness }
						icon={ getIcon }
						inline={ false }
					/>
					<div className="dlx-pw-modal-button-group">
						<Button
							className="button button-error"
							variant="secondary"
							onClick={ () => {
								setIsModalVisible( false );
							} }
						>
							{ __( 'OK', 'dlx-pattern-wrangler' ) }
						</Button>
					</div>
				</Modal>
			);
		}
	};

	return (
		<>
			{ isSnackbarVisible && getSnackBar() } { /* Show snackbar */ }
			{ isModalVisible && getModal() } { /* Show modal */ }
		</>
	);
};
export default SnackPop;
