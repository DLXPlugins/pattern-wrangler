document.addEventListener( 'DOMContentLoaded', () => {
	const patternPreviewContent = document.getElementById(
		'pattern-preview-content'
	);
	if ( ! patternPreviewContent ) {
		return;
	}
	// Get parent element of pattern preview content. If it's not a body tag, hide its siblings.
	let current = patternPreviewContent;

	while (
		current &&
		current.parentElement &&
		current.parentElement.tagName !== 'BODY'
	) {
		const parent = current.parentElement;
		const grandparent = parent.parentElement;

		if ( ! grandparent ) {
			break;
		}

		Array.from( grandparent.children ).forEach( ( element ) => {
			if ( element !== parent ) {
				element.style.display = 'none';
			} else {
				element.style.padding = 0;
				element.style.marginTop = 0;
				element.style.marginBottom = 0;
			}
		} );

		// Move up one level
		current = parent;
	}
} );
