import { useRouter, useNavigate } from '@tanstack/react-router';
import { useState, useMemo, useEffect, useRef } from '@wordpress/element';
import { addQueryArgs, getQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import PatternsViewStore from '../store';

const TabItem = ( { label, active, onClick } ) => {
	return (
		<>
			<a href="#" onClick={ onClick } className={ active ? 'active' : '' }>{ label }</a>
		</>
	);
};
const PatternTabs = () => {
	const [ activeTab, setActiveTab ] = useState( 'local' );
	const currentPath = window.location.pathname;

	const router = useRouter();

	const navigate = useNavigate({ from: '/' })

	console.log( router );

	/**
	 * Check if the tab is active.
	 *
	 * @param {string} tabName The tab name.
	 * @param {string} path    The path.
	 * @return {boolean}       True or false.
	 */
	const isTabActive = ( tabName, path ) => {
		if ( tabName === activeTab ) {
			return true;
		}
		const pathOptions = [ path, '/' + path ];
		return pathOptions.includes( currentPath );
	};

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
		<nav className="nav-tab-wrapper">
			<>
				sajklf
			</>
			<TabItem
				label={ __( 'Local Patterns', 'pattern-wrangler' ) }
				active={ isTabActive( 'local', 'patterns' ) }
				onClick={ ( e ) => {
					e.preventDefault();
					navigate( { to: '/local' } );
					//setActiveTab( 'local' );
				} }
			/>
			<TabItem
				label={ __( 'Registered Patterns', 'pattern-wrangler' ) }
				active={ isTabActive( 'registered', 'patterns' ) }
				onClick={ ( e ) => {
					e.preventDefault();
					navigate( { to: '/registered' } );
					//setActiveTab( 'registered' );
				} }
			/>
		</nav>
	);
};

export default PatternTabs;
