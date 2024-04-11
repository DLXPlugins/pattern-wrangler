import {Fancybox }  from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

document.addEventListener("DOMContentLoaded", function () {
	const patternPreviews = document.querySelectorAll( '.admin-fancybox' );
	if ( null !== patternPreviews ) {
		patternPreviews.forEach( function ( patternPreview ) {
			patternPreview.addEventListener( 'click', function ( event ) {
				event.preventDefault();
				const anchor = event.target.closest( 'a' );
				Fancybox.show( [ {
					src: anchor.href,
					caption: anchor.title,
					type: 'image',
					zoom: false,
					compact: true,
					width: '60%',
				} ] );
			} );
		} );
	}
} );