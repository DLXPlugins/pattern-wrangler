/**
 * Classic Patterns list featured-image lightbox (Yet Another React Lightbox).
 *
 * @package
 */

import { createRoot, useCallback, useEffect, useState } from '@wordpress/element';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

const PREVIEW_LINK_SELECTOR = '.dlxpw-pattern-image-preview';

/**
 * Image preview lightbox for the classic wp_block list table.
 *
 * @return {JSX.Element} Lightbox root.
 */
const PatternListImageLightbox = () => {
	const [ open, setOpen ] = useState( false );
	const [ slides, setSlides ] = useState( [] );

	const close = useCallback( () => {
		setOpen( false );
	}, [] );

	useEffect( () => {
		const onDocumentClick = ( event ) => {
			const anchor = event.target.closest( PREVIEW_LINK_SELECTOR );
			if ( ! anchor ) {
				return;
			}

			event.preventDefault();

			const src = anchor.getAttribute( 'href' );
			if ( ! src ) {
				return;
			}

			const title =
				anchor.getAttribute( 'title' ) ||
				anchor.querySelector( 'img' )?.getAttribute( 'alt' ) ||
				'';

			setSlides( [
				{
					src,
					alt: title,
					title,
				},
			] );
			setOpen( true );
		};

		document.addEventListener( 'click', onDocumentClick );
		return () => {
			document.removeEventListener( 'click', onDocumentClick );
		};
	}, [] );

	return (
		<Lightbox
			open={ open }
			close={ close }
			slides={ slides }
			plugins={ [ Captions ] }
			carousel={ { finite: true } }
			controller={ { closeOnBackdropClick: true } }
			className="dlxpw-pattern-list-lightbox"
			render={ {
				buttonPrev: () => null,
				buttonNext: () => null,
			} }
		/>
	);
};

const mountNode = document.createElement( 'div' );
mountNode.id = 'dlxpw-pattern-list-lightbox-root';
document.body.appendChild( mountNode );

const root = createRoot( mountNode );
root.render( <PatternListImageLightbox /> );
