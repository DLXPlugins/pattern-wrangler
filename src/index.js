import { getQueryArg } from '@wordpress/url';
import './js/blocks/pattern-importer/index';

/**
 * Register a plugin that intercepts the back button if a redirect is in place.
 */
wp.domReady( () => {
	const redirectTo = getQueryArg( window.location.href, 'redirect_to' );
	let tries = 0;
	if ( redirectTo ) {
		// Function to find and update back button
		const updateBackButton = () => {
			// Try to find the back button in the current document
			const backButton = document.querySelector( '.edit-post-fullscreen-mode-close' );
			if ( backButton ) {
				backButton.href = decodeURIComponent( redirectTo );
				return true;
			}

			return false;
		};

		// Try immediately
		if ( ! updateBackButton() ) {
			// If not found, wait a bit and try again
			setTimeout( () => {
				tries++;
				if ( tries < 3 && ! updateBackButton() ) {
					// Try one more time after a longer delay
					setTimeout( updateBackButton, 1000 );
				} else if ( tries >= 3 ) {
					console.error( 'Pattern Wrangler: Failed to find back button after 3 tries.' );
				}
			}, 500 );
		}
	}
} );