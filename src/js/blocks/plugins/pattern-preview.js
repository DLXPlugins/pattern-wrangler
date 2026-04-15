import { useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/editor';
import { getQueryArg } from '@wordpress/url';
import { subscribe } from '@wordpress/data';
import './pattern-code.js';

/**
 * Render a Preview Button.
 *
 * @return {Object} The rendered component.
 */
const PatternPreviewButton = () => {
	return (
		<PluginPostStatusInfo
			icon="external"
			label={ __( 'Preview Pattern', 'pattern-wrangler' ) }
			className="dlx-pw-preview-sidebar"
		>
			<div className="dlx-pw-preview-sidebar-content">
				<Tooltip
					text={ __( 'Preview Pattern in new tab', 'pattern-wrangler' ) }
				>
					<Button
						variant="tertiary"
						href={ dlxPatternWranglerPreview.previewUrl }
						target="_blank"
						icon="external"
						iconPosition="right"
						rel="noopener noreferrer"
						className="button button-secondary"
						showTooltip={ true }
						style={ {
							margin: 0,
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '0.5em 1em',
							fontSize: '1em',
							fontWeight: 'normal',
							lineHeight: '1.5',
							textDecoration: 'none',
						} }
						aria-label={ __( 'Preview Pattern in new tab', 'pattern-wrangler' ) }
					>
						{ __( 'Preview Pattern', 'pattern-wrangler' ) }
					</Button>
				</Tooltip>
			</div>
		</PluginPostStatusInfo>
	);
};

registerPlugin( 'dlx-pattern-wrangler-preview-button', {
	render: PatternPreviewButton,
} );

// This takes in a redirect_to query arg and stores it in localStorage. It then subscribes to the block editor data, and when the back button is finally rendered, it will redirect to the stored redirect_to URL.
const RedirectToPatternsPage = () => {
	const redirectTo = useMemo( () => getQueryArg( window.location.href, 'redirect_to' ), [] );
	useEffect( () => {
		if ( redirectTo ) {
			localStorage.setItem( 'dlx-pw-redirect-to', redirectTo );
		}
	}, [ redirectTo ] );
	return null;
};

registerPlugin( 'dlx-pattern-wrangler-redirect-to-patterns-page', {
	render: RedirectToPatternsPage,
} );

/**
 * Subscribe to data.
 *
 * @return {Function} The subscription function.
 */
const subscribeToData = () => {
	const unsubscribe = subscribe( () => {
		const backButton = document.querySelector( '.edit-post-fullscreen-mode-close' );
		if ( backButton ) {
			const redirecTo = localStorage.getItem( 'dlx-pw-redirect-to' );
			if ( redirecTo ) {
				backButton.href = decodeURIComponent( localStorage.getItem( 'dlx-pw-redirect-to' ) );
				localStorage.removeItem( 'dlx-pw-redirect-to' );
			}
			unsubscribe();
		}
	} );
	return unsubscribe;
};

subscribeToData();
