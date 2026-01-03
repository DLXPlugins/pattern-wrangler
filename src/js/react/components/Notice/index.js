// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
import { Notice as WPNotice } from '@wordpress/components';
import classNames from 'classnames';

const Notice = ( props ) => {
	const { message = '', status = 'info', politeness = 'polite', icon = null, className = '', inline = false, children = null, hasToTop = false, dismissible = false, onRemove = () => {} } = props;

	useEffect( () => {
		speak( message, politeness );
	}, [ message, status, politeness ] );

	const hasIcon = () => {
		return icon !== null;
	};
	const getIcon = ( Icon ) => {
		return <Icon width={ 16 } height={ 16 } fill="#6c757d" />;
	};

	const containerClasses = classNames( className, 'dlx-pw-admin__notice', {
		'dlx-pw-admin__notice--has-icon': hasIcon(),
		[ `dlx-pw-admin__notice-type--${ status }` ]: true,
		[ `dlx-pw-admin__notice-appearance--inline` ]: inline,
		[ `dlx-pw-admin__notice-appearance--block` ]: ! inline,
	} );

	const actions = [
		{
			label: __( 'Back to Top', 'wp-dlx-pw-comments' ),
			url: '#dlx-pw-admin-header',
			variant: 'link',
			className: 'dlx-pw-admin__notice-action dlx-pw-admin__notice-action--to-top',
		} ];
	return (
		<div className={ containerClasses }>
			<WPNotice isDismissible={ dismissible } spokenMessage={ message } actions={ hasToTop ? actions : [] } { ...props } onRemove={ () => {
				if ( dismissible ) {
					onRemove();
				}
			} }>
				{ hasIcon() &&
					<div className="dlx-pw-admin__notice-icon">{ getIcon( icon ) }</div>
				}
				<div className="dlx-pw-admin__notice-message"><>{ message } { children } </></div>
			</WPNotice>
		</div>
	);
};

export default Notice;
