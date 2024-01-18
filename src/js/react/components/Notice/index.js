// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // ES6
import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
import { Notice as WPNotice } from '@wordpress/components';
import classNames from 'classnames';

const Notice = ( props ) => {
	const { message, status, politeness, icon, className, inline, children, hasToTop = false } = props;

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
			<WPNotice isDismissible={ false } spokenMessage={ message } actions={ hasToTop ? actions : [] } { ...props }>
				{ hasIcon() &&
					<div className="dlx-pw-admin__notice-icon">{ getIcon( icon ) }</div>
				}
				<div className="dlx-pw-admin__notice-message"><>{ message } { children } </></div>
			</WPNotice>
		</div>
	);
};

Notice.defaultProps = {
	message: '',
	status: 'info',
	politeness: 'polite',
	icon: null,
	className: '',
	inline: false,
	hasToTop: false,
};

Notice.propTypes = {
	message: PropTypes.string.isRequired,
	status: PropTypes.oneOf( [ 'info', 'warning', 'success', 'error' ] ),
	politeness: PropTypes.oneOf( [ 'assertive', 'polite' ] ),
	icon: PropTypes.func,
	className: PropTypes.string,
	inline: PropTypes.bool,
	hasToTop: PropTypes.bool,
};

export default Notice;
