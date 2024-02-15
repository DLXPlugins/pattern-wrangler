( function() {
	'use strict';

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
	const copyShortcodeButtons = document.querySelectorAll( '.pw-copy-clipboard' );
	if ( copyShortcodeButtons ) {
		copyShortcodeButtons.forEach( ( button ) => {
			// Check if both button and its previous input are visible
			if ( isVisible( button ) && isVisible( button.previousElementSibling ) ) {
				// Remove copy element if ClipboardItem is undefined.
				const clipboardSupported = typeof ClipboardItem !== 'undefined';
				if ( ! clipboardSupported ) {
					button.remove();
					return;
				}

				button.addEventListener( 'click', ( event ) => {
					event.preventDefault();

					// Get the value of the previous input element.
					const input = button.previousElementSibling;
					if ( input && input.tagName.toLowerCase() === 'input' ) {
						const shortcodeValue = input.value;

						// Copy the value to the clipboard.
						navigator.clipboard.writeText( shortcodeValue ).then( () => {
							// Logs success message  in console.
							console.log( 'Shortcode copied to clipboard:', shortcodeValue );

							// Replace button content with "Copied" text.
							button.innerHTML = 'Copied';

							// Find and remove dashicon class from button.
							const spanElement = button.querySelector( 'span' );
							if ( spanElement ) {
								spanElement.classList.remove( 'dashicons', 'dashicons-clipboard' );
							}

							// Revert back to original state after 3 seconds.
							setTimeout( () => {
								button.innerHTML = '<span class="dashicons dashicons-clipboard"></span>';
							}, 3000 );
						} ).catch( ( error ) => {
							// Logs error message  in console.
							console.error( 'Error copying shortcode to clipboard:', error );
						} );
					}
				} );
			}
		} );
	}
}() );
