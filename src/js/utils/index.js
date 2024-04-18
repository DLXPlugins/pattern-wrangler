( function() {
	'use strict';

	const { __ } = wp.i18n;
	const { speak } = wp.a11y;

	/**
	 * Determine if an element is visible or not.
	 *
	 * @param {Element} element The element to check if visible or not.
	 * @return {boolean} true if visible, false if not.
	 */
	const isVisible = ( element ) => {
		const style = window.getComputedStyle( element );
		return (
			style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0'
		);
	};

	// Set up copy event.
	const copyShortcodeButtons = document.querySelectorAll( '.dlxpw-copy-shortcode' );

	const clipboardSupported = typeof ClipboardItem !== 'undefined';
	if ( clipboardSupported && copyShortcodeButtons ) {
		copyShortcodeButtons.forEach( ( button ) => {
			button.classList.remove( 'dlx-copy-shortcode-hidden' );

			button.addEventListener( 'click', ( event ) => {
				event.preventDefault();

				// Get the value of the previous input element.
				const input = button.previousElementSibling;
				if ( input && input.tagName.toLowerCase() === 'input' ) {
					const shortcodeValue = input.value;

					// Copy the value to the clipboard.
					navigator.clipboard.writeText( shortcodeValue ).then( () => {
						// Logs success message  in console.

						// a11y text here.
						speak( __( 'Shortcode copied to clipboard', 'pattern-wrangler' ), 'assertive' );

						const buttonIcon = button.querySelector( 'span' );

						// Replace button content with "Copied" text.
						buttonIcon.classList.remove( 'dashicons-clipboard' );
						buttonIcon.classList.add( 'dashicons-yes' );

						// Revert back to original state after 3 seconds.
						setTimeout( () => {
							buttonIcon.classList.remove( 'dashicons-yes' );
							buttonIcon.classList.add( 'dashicons-clipboard' );
						}, 3000 );
					} ).catch( ( error ) => {
						// Logs error message  in console.
						console.error( 'Error copying shortcode to clipboard:', error );
					} );
				}
			} );
		} );
	}
}() );
