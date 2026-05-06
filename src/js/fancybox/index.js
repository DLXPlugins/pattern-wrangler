import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

document.addEventListener( 'DOMContentLoaded', () => {
	const patternPreviews = document.querySelectorAll( '.admin-fancybox' );
	if ( null !== patternPreviews ) {
		patternPreviews.forEach( ( patternPreview ) => {
			patternPreview.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				const anchor = event.target.closest( 'a' );
				Fancybox.show( [
					{
						src: anchor.href,
						caption: anchor.title,
						type: 'image',
						zoom: false,
						compact: true,
						width: '60%',
					},
				] );
			} );
		} );
	}
} );
