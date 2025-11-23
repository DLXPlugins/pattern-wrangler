import { useRouter, useNavigate } from '@tanstack/react-router';
import { useState, useMemo, useEffect, lazy } from '@wordpress/element';
import { addQueryArgs, getQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
const PatternsGrid = /* webpackChunkName: "PatternsGrid-0.0.1" */ lazy( () => import( './PatternsGrid' ) );

const PatternsView = () => {
	const [ activeTab, setActiveTab ] = useState( 'local' );
	const currentPath = window.location.pathname;

	const router = useRouter();

	const navigate = useNavigate( { from: '/' } );

	/**
	 * Set the current tab/path.
	 */
	useEffect( () => {
		// const queryArgs = getQueryArgs( window.location.href );
		// if ( queryArgs.tab ) {
		// 	setActiveTab( queryArgs.tab );
		// }
	}, [] );

	return (
		<>
			<PatternsGrid />
		</>
	);
};

export default PatternsView;
