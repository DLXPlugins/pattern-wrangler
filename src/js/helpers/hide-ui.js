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

		// Move up one level.
		current = parent;
	}

	/**
	 * Whether the first pattern block spans the preview edge-to-edge.
	 *
	 * Computed width is a pixel value, so comparing to "100%" never matches.
	 * Use alignfull or a geometric match against the preview container instead.
	 *
	 * @param {Element} child  First pattern block.
	 * @param {Element} parent Preview content container.
	 * @return {boolean} True when the child is visually full-bleed.
	 */
	const isEdgeToEdge = ( child, parent ) => {
		if ( child.classList.contains( 'alignfull' ) ) {
			return false;
		}

		const parentRect = parent.getBoundingClientRect();
		const childRect = child.getBoundingClientRect();
		const tolerance = 2;

		return (
			Math.abs( childRect.left - parentRect.left ) <= tolerance &&
			Math.abs( childRect.right - parentRect.right ) <= tolerance
		);
	};

	// Apply container padding only when the first child is edge-to-edge.
	const firstChild = patternPreviewContent.children[ 0 ] || null;
	if ( firstChild && isEdgeToEdge( firstChild, patternPreviewContent ) ) {
		patternPreviewContent.style.padding = '1.5rem';
	}
} );
