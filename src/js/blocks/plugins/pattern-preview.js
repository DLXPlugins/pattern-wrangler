import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Render a Preview Button.
 *
 * @return {Object} The rendered component.
 */
const PatternPreviewButton = () => {
	useEffect( () => {
		const headerToolbar = document.querySelector( '.edit-post-header' );
		if ( null === headerToolbar ) {
			return;
		}

		// Get the left toolbar and add to it.
		const settingsToolbar = headerToolbar.querySelector( '.edit-post-header__settings' );
		if ( null === settingsToolbar ) {
			return;
		}

		// Create the button.
		const button = document.createElement( 'a' );
		button.className = 'dlx-button-preview components-button has-icon';
		button.ariaLabel = __( 'Preview', 'dlx-pattern-wrangler' );
		button.href = dlxPatternWranglerPreview.previewUrl;
		button.target = '_blank';
		button.rel = 'noopener noreferrer';

		// Add icon.
		const icon = document.createElement( 'svg' );
		icon.className = 'dlx-pattern-wrangler-preview-icon';
		icon.innerHTML = '<svg width="16" height="16" style="display: inline-block; margin-right: 8px;"><use xlink:href="#dlx-pattern-wrangler-preview-icon" /></svg>';
		button.prepend( icon );
		// Add the button to the toolbar as the first child.
		settingsToolbar.prepend( button );
	}, [] );

	return (
		<>
			<svg height="0" width="0" xmlns="http://www.w3.org/2000/svg" style={ { display: 'none' } } aria-hidden="true">
				<symbol id="dlx-pattern-wrangler-preview-icon"
					width="16"
					height="16"
					viewBox="0 0 512 512"
				>
					<path fill="currentColor" d="M304 24c0 13.3 10.7 24 24 24h102.1L207 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l223-223V184c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24H328c-13.3 0-24 10.7-24 24zM72 32C32.2 32 0 64.2 0 104v336c0 39.8 32.2 72 72 72h336c39.8 0 72-32.2 72-72V312c0-13.3-10.7-24-24-24s-24 10.7-24 24v128c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h128c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z" />
				</symbol>
			</svg>
		</>
	);
};
registerPlugin( 'dlx-pattern-wrangler-preview-button', {
	render: PatternPreviewButton,
} );

