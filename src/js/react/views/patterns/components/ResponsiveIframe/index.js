import { useRef, useState, useEffect } from 'react';
import { useResizeObserver } from '@wordpress/compose';
import { addQueryArgs } from '@wordpress/url';
import { __, _x } from '@wordpress/i18n';
import ZoomIcon from '../Icons/ZoomIcon';
import { ReactSpinner3 } from '@mediaron/react-spinners';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import {
	canonicalPatternId,
	patternIdsEqual,
} from '../../utils/patternIdUtils';
import {
	canDeletePattern,
	canEditPattern,
	canDisablePattern,
} from '../../utils/common';

/** Patterns available for the open preview (single row or gallery). */
let previewToolbarPatterns = [];
let previewDeviceMode = 'desktop';

const PREVIEW_DEVICE_MOBILE_WIDTH = 425;
const PREVIEW_DEVICE_TABLET_WIDTH = 768;

/**
 * @param {Array} patterns Pattern rows for toolbar resolution.
 */
const setPreviewToolbarPatterns = ( patterns ) => {
	previewToolbarPatterns = Array.isArray( patterns ) ? patterns : [];
};

/**
 * @param {string} mode Preview mode slug.
 * @return {number|null} Viewport width or null for unconstrained desktop.
 */
const getPreviewModeViewportWidth = ( mode ) => {
	if ( 'mobile' === mode ) {
		return PREVIEW_DEVICE_MOBILE_WIDTH;
	}
	if ( 'tablet' === mode ) {
		return PREVIEW_DEVICE_TABLET_WIDTH;
	}
	return null;
};

/**
 * @param {Object} fancybox Fancybox instance.
 * @return {HTMLElement|null} Fancybox container.
 */
const getFancyboxContainer = ( fancybox ) => {
	if ( fancybox && 'function' === typeof fancybox.getContainer ) {
		return fancybox.getContainer();
	}
	return document.querySelector( '.fancybox__container' );
};

/**
 * @param {Object} fancybox Fancybox instance.
 */
const syncPreviewToolbarDeviceState = ( fancybox ) => {
	const root = getFancyboxContainer( fancybox );
	if ( ! root ) {
		return;
	}
	root.setAttribute( 'data-dlxpw-preview-device', previewDeviceMode );

	const toolbarModes = [ 'desktop', 'tablet', 'mobile' ];
	toolbarModes.forEach( ( mode ) => {
		const el = root.querySelector( `[data-dlxpw-toolbar="preview-${ mode }"]` );
		if ( ! el ) {
			return;
		}
		const isSelected = previewDeviceMode === mode;
		el.classList.toggle( 'is-selected', isSelected );
		el.setAttribute( 'aria-pressed', isSelected ? 'true' : 'false' );
	} );
};

/**
 * @param {string} src Preview iframe URL.
 * @return {string|null} Raw `pattern_id` query value, or null.
 */
const parsePatternIdFromSlideSrc = ( src ) => {
	if ( ! src || 'string' !== typeof src ) {
		return null;
	}
	try {
		const u = new URL( src, window.location.origin );
		const raw = u.searchParams.get( 'pattern_id' );
		return null !== raw && '' !== raw ? raw : null;
	} catch ( e ) {
		const match = src.match( /[?&]pattern_id=([^&]+)/ );
		if ( ! match ) {
			return null;
		}
		try {
			return decodeURIComponent( match[ 1 ].replace( /\+/g, ' ' ) );
		} catch ( err ) {
			return match[ 1 ];
		}
	}
};

/**
 * Resolves the pattern row for the current Fancybox slide preview URL.
 *
 * @return {Object|undefined} Matching pattern or undefined.
 */
const getActivePreviewPattern = () => {
	const slide =
		'function' === typeof Fancybox.getSlide ? Fancybox.getSlide() : null;
	const raw = parsePatternIdFromSlideSrc( slide?.src );
	if ( null === raw || '' === canonicalPatternId( raw ) ) {
		return undefined;
	}
	return previewToolbarPatterns.find( ( p ) => patternIdsEqual( p.id, raw ) );
};

/**
 * Dispatches a preview-toolbar custom event on document.
 *
 * @param {string}        name      Event name.
 * @param {number|string} patternId Pattern post ID.
 */
const dispatchPreviewToolbarEvent = ( name, patternId ) => {
	if ( '' === canonicalPatternId( patternId ) ) {
		return;
	}
	document.dispatchEvent(
		new CustomEvent( name, {
			bubbles: true,
			detail: { patternId },
		} ),
	);
};

/**
 * Copy the active pattern block markup to the system clipboard from the preview toolbar.
 *
 * @param {Object|undefined} pattern Pattern row from previewToolbarPatterns.
 * @return {Promise<void>} Resolves when the copy attempt finishes.
 */
const copyPatternMarkupToClipboard = async( pattern ) => {
	if ( ! pattern || 'string' !== typeof pattern.content ) {
		return;
	}
	const text = pattern.content.trim();
	if ( '' === text ) {
		return;
	}
	let copied = false;
	try {
		if ( navigator.clipboard?.writeText ) {
			await navigator.clipboard.writeText( text );
			copied = true;
		}
	} catch ( e ) {
		// Use textarea fallback below.
	}
	if ( ! copied ) {
		const textarea = document.createElement( 'textarea' );
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		textarea.style.pointerEvents = 'none';
		document.body.appendChild( textarea );
		textarea.select();
		try {
			// eslint-disable-next-line-deprecation
			document.execCommand( 'copy' );
			copied = true;
		} catch ( err ) {
			copied = false;
		}
		document.body.removeChild( textarea );
	}
};

/**
 * Visibility map for Fancybox preview toolbar keys (`data-dlxpw-toolbar`).
 * Aligns with PatternsGrid quick links: local edit only when enabled; export always when a row exists.
 *
 * @param {Object|undefined} pattern Active pattern row from previewToolbarPatterns.
 * @return {Object<string, boolean>} Keys disable, delete, edit, export, copy.
 */
const getPreviewToolbarButtonVisibility = ( pattern ) => {
	if ( ! pattern ) {
		return {
			disable: false,
			delete: false,
			edit: false,
			export: false,
			copy: false,
		};
	}
	const hasCopyableContent =
		'string' === typeof pattern.content && pattern.content.trim();
	return {
		disable: canDisablePattern( pattern ),
		delete: canDeletePattern( pattern ),
		edit: canEditPattern( pattern ),
		export: true,
		copy: !! hasCopyableContent,
	};
};

/**
 * Show or hide toolbar controls from the active slide pattern.
 *
 * @param {Object} fancybox Fancybox instance from event callbacks.
 */
const syncPreviewToolbarButtons = ( fancybox ) => {
	const root = getFancyboxContainer( fancybox );
	if ( ! root ) {
		return;
	}

	const pattern = getActivePreviewPattern();
	const visibility = getPreviewToolbarButtonVisibility( pattern );

	const setBtn = ( key, visible ) => {
		const el = root.querySelector( `[data-dlxpw-toolbar="${ key }"]` );
		if ( ! el ) {
			return;
		}
		el.hidden = ! visible;
		el.removeAttribute( 'disabled' );
		el.setAttribute( 'aria-hidden', visible ? 'false' : 'true' );
	};

	setBtn( 'disable', visibility.disable );
	setBtn( 'delete', visibility.delete );
	setBtn( 'edit', visibility.edit );
	setBtn( 'export', visibility.export );
	setBtn( 'copy', visibility.copy );
	syncPreviewToolbarDeviceState( fancybox );
};

/**
 * @param {Object} fancybox Fancybox instance.
 * @param {string} mode     Device mode slug (`desktop`, `tablet`, `mobile`).
 */
const setPreviewDeviceMode = ( fancybox, mode ) => {
	previewDeviceMode = mode;
	syncPreviewToolbarDeviceState( fancybox );
};

/**
 * Builds Fancybox instance options (second argument to Fancybox.show).
 * Fancybox v6 does not read plugins, Sidebar, Carousel, closeButton, or startIndex from slide items.
 *
 * Merges `extra.Carousel` so gallery options (e.g. infinite) do not replace Toolbar config.
 *
 * @param {Object} extra Partial options merged after defaults.
 * @return {Object} Options for Fancybox.show.
 */
const getPatternPreviewFancyboxOptions = ( extra = {} ) => {
	const { Carousel: extraCarousel = {}, ...restExtra } = extra;

	const toolbarItems = {
		disablePattern: {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Disable pattern',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="disable" aria-label="${ __(
				'Disable pattern',
				'pattern-wrangler',
			) }"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></button>`,
			click: () => {
				const id = getActivePreviewPattern()?.id;
				Fancybox.close();
				dispatchPreviewToolbarEvent(
					'dlxpw-pattern-preview-disable-request',
					id,
				);
			},
		},
		deletePattern: {
			tpl: `<button type="button" class="f-button pattern-preview-fancybox-toolbar-btn--destructive" title="${ __(
				'Delete pattern',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="delete" aria-label="${ __(
				'Delete pattern',
				'pattern-wrangler',
			) }"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>`,
			click: () => {
				const id = getActivePreviewPattern()?.id;
				if ( '' === canonicalPatternId( id ) ) {
					return;
				}
				Fancybox.close();
				dispatchPreviewToolbarEvent(
					'dlxpw-pattern-preview-delete-request',
					id,
				);
			},
		},
		editPattern: {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Edit pattern',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="edit" aria-label="${ __(
				'Edit pattern',
				'pattern-wrangler',
			) }"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>`,
			click: () => {
				const id = getActivePreviewPattern()?.id;
				Fancybox.close();
				dispatchPreviewToolbarEvent(
					'dlxpw-pattern-preview-edit-request',
					id,
				);
			},
		},
		exportPattern: {
			tpl: `<button type="button" class="f-button" title="${ _x(
				'Export',
				'Export pattern file',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="export" aria-label="${ _x(
				'Export',
				'Export pattern file',
				'pattern-wrangler',
			) }"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></button>`,
			click: () => {
				const id = getActivePreviewPattern()?.id;
				dispatchPreviewToolbarEvent(
					'dlxpw-pattern-preview-export-request',
					id,
				);
			},
		},
		copyPattern: {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Copy pattern markup',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="copy" aria-label="${ __(
				'Copy pattern markup',
				'pattern-wrangler',
			) }"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>`,
			click: () => {
				const pattern = getActivePreviewPattern();
				void copyPatternMarkupToClipboard( pattern );
			},
		},
		previewDesktop: {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Desktop preview',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="preview-desktop" aria-label="${ __(
				'Desktop preview',
				'pattern-wrangler',
			) }" aria-pressed="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg></button>`,
			click: ( event, button ) => {
				setPreviewDeviceMode( button?.fancybox, 'desktop' );
			},
		},
		previewTablet: {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Tablet preview',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="preview-tablet" aria-label="${ __(
				'Tablet preview',
				'pattern-wrangler',
			) }" aria-pressed="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg></button>`,
			click: ( event, button ) => {
				setPreviewDeviceMode( button?.fancybox, 'tablet' );
			},
		},
		previewMobile: {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Mobile preview',
				'pattern-wrangler',
			) }" data-dlxpw-toolbar="preview-mobile" aria-label="${ __(
				'Mobile preview',
				'pattern-wrangler',
			) }" aria-pressed="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="8" y="2" width="8" height="20" rx="2"/><line x1="11" y1="19" x2="13" y2="19"/></svg></button>`,
			click: ( event, button ) => {
				setPreviewDeviceMode( button?.fancybox, 'mobile' );
			},
		},
	};

	return {
		closeButton: false,
		on: {
			ready: ( fb ) => {
				syncPreviewToolbarButtons( fb );
			},
			'Carousel.change': ( fb ) => {
				syncPreviewToolbarButtons( fb );
			},
		},
		Carousel: {
			Toolbar: {
				absolute: false,
				enabled: true,
				display: {
					left: [ 'disablePattern', 'deletePattern' ],
					middle: [ 'editPattern', 'exportPattern', 'copyPattern' ],
					right: [
						'previewDesktop',
						'previewTablet',
						'previewMobile',
						'close',
					],
				},
				items: toolbarItems,
			},
			...extraCarousel,
		},
		...restExtra,
	};
};

const buildPatternPreviewSlide = ( patternItem ) => {
	const viewportWidth =
		getPreviewModeViewportWidth( previewDeviceMode ) ??
		patternItem.viewportWidth ??
		null;
	const previewArgs = {
		action: 'dlxpw_pattern_preview',
		pattern_id: patternItem.id,
		site_id: patternItem.siteId,
		current_site_id: patternItem.currentSiteId ?? 0,
		nonce: patternItem.previewNonce,
	};
	if ( null !== viewportWidth ) {
		previewArgs.viewport_width = viewportWidth;
	}
	const previewUrl = patternItem?.id
		? addQueryArgs( patternItem.siteAdminAjaxUrl, previewArgs )
		: '';

	return {
		src: previewUrl,
		caption: patternItem.title,
		type: 'iframe',
	};
};

const popPatternPreview = ( item, galleryItems ) => {
	previewDeviceMode = 'desktop';
	const listForToolbar =
		galleryItems && galleryItems.length >= 2 ? galleryItems : [ item ];
	setPreviewToolbarPatterns( listForToolbar );

	if ( ! galleryItems || galleryItems.length < 2 ) {
		Fancybox.show(
			[ buildPatternPreviewSlide( item ) ],
			getPatternPreviewFancyboxOptions(),
		);
		return;
	}

	const slides = galleryItems.map( ( patternItem ) =>
		buildPatternPreviewSlide( patternItem ),
	);
	let startIndex = galleryItems.findIndex( ( p ) =>
		patternIdsEqual( p.id, item.id ),
	);
	if ( startIndex < 0 ) {
		startIndex = 0;
	}

	Fancybox.show(
		slides,
		getPatternPreviewFancyboxOptions( {
			startIndex,
			Carousel: {
				infinite: false,
			},
		} ),
	);
};

const ResponsiveIframe = ( {
	src,
	title,
	item,
	galleryItems = null,
	onPreviewSettled = null,
	onPreviewError = null,
	queueGeneration = 0,
} ) => {
	const iframeRef = useRef( null );
	const containerRef = useRef( null );
	const hasSettledRef = useRef( false );
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ scale, setScale ] = useState( 1 );
	const [ iframeWidth, setIframeWidth ] = useState( 0 );
	const [ iframeMinHeight, setIframeMinHeight ] = useState( 0 );
	const [ aspectRatio, setAspectRatio ] = useState( 1 );

	const markPreviewSettled = () => {
		if ( hasSettledRef.current ) {
			return;
		}

		hasSettledRef.current = true;

		if ( 'function' === typeof onPreviewSettled ) {
			onPreviewSettled( item?.id, queueGeneration );
		}
	};

	const markPreviewError = () => {
		if ( hasSettledRef.current ) {
			return;
		}

		hasSettledRef.current = true;

		if ( 'function' === typeof onPreviewError ) {
			onPreviewError( item?.id, queueGeneration );
		}
	};

	useEffect( () => {
		hasSettledRef.current = false;
		setIsLoaded( false );
	}, [ src ] );

	useEffect( () => {
		const iframe = iframeRef.current;
		if ( ! iframe ) {
			return;
		}

		const handleLoad = () => {
			setIsLoaded( true );
			setIframeWidth( item.viewportWidth || iframe.offsetWidth );
			markPreviewSettled();
		};

		iframe.addEventListener( 'load', handleLoad );

		return () => {
			iframe.removeEventListener( 'load', handleLoad );
		};
	}, [ src, item.viewportWidth ] );

	const [ resizeListener, { width: containerWidth, height: containerHeight } ] =
		useResizeObserver();

	useEffect( () => {
		if (
			typeof containerWidth === 'undefined' ||
			! isLoaded ||
			iframeWidth === 0
		) {
			return;
		}

		const newScale = containerWidth / ( iframeWidth || 800 );
		const newAspectRatio = containerWidth / containerHeight;
		const newIframeMinHeight = Math.max( iframeWidth * newAspectRatio, 100 );

		setIframeMinHeight( newIframeMinHeight );
		setScale( newScale );
		setAspectRatio( newAspectRatio );
	}, [ containerWidth, containerHeight, isLoaded, iframeWidth ] );

	useEffect( () => {
		if ( iframeRef.current ) {
			setIframeWidth( iframeRef.current.offsetWidth );
		}
	}, [ iframeMinHeight ] );

	return (
		<a
			href={ src }
			className="pattern-preview-iframe-link"
			target="_blank"
			rel="noopener noreferrer"
			onClick={ ( e ) => {
				e.preventDefault();
				popPatternPreview( item, galleryItems );
			} }
			aria-hidden="true"
		>
			{ isLoaded && (
				<div className="pattern-preview-zoom-icon">
					<ZoomIcon />
				</div>
			) }

			<div
				className="pattern-preview-iframe-scale-container-wrapper"
				ref={ containerRef }
				style={ { transform: `scale(${ scale })` } }
			>
				<div className="pattern-preview-iframe-scale-wrapper">
					<div className="pattern-preview-iframe-scale-container">
						{ resizeListener }

						<div className="pattern-preview-iframe-wrapper">
							{ ! isLoaded && (
								<div
									className="pattern-preview-loading-label"
									style={ {
										position: 'absolute',
										top: '40%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										zIndex: 2,
										padding: '6px 10px',
										background: 'rgba(255, 255, 255, 0.9)',
										borderRadius: '4px',
									} }
								>
									<ReactSpinner3
										size={ 40 }
										speedMultiplier={ 1.75 }
										color="#9ca0a5"
									/>
								</div>
							) }

							<iframe
								ref={ iframeRef }
								key={ `preview-${ item.id }` }
								src={ src }
								tabIndex={ -1 }
								title={ title }
								sandbox="allow-same-origin allow-scripts allow-forms"
								loading="lazy"
								onError={ () => {
									setIsLoaded( true );
									markPreviewError();
								} }
								style={ {
									position: 'absolute',
									top: 0,
									left: 0,
									width: item.viewportWidth || 800,
									aspectRatio,
									height: `${ iframeMinHeight }px`,
									maxHeight: '1200px',
									overflow: 'visible',
								} }
							/>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

export default ResponsiveIframe;
