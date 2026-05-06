import { useRef, useState, useEffect } from 'react';
import { useResizeObserver } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import ZoomIcon from '../Icons/ZoomIcon';
import { ReactSpinner3 } from '@mediaron/react-spinners';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/fancybox/fancybox.sidebar.css';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import { Sidebar } from '@fancyapps/ui/dist/fancybox/fancybox.sidebar.js';

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
	const { Carousel: extraCarousel = {}, item, ...restExtra } = extra;

	const items = {};
	if ( item?.isLocal ) {
		items.deletePattern = {
			tpl: `<button type="button" class="f-button" title="${ __(
				'Delete pattern',
				'pattern-wrangler'
			) }" data-dlxpw-toolbar-delete aria-label="${ __(
				'Delete pattern',
				'pattern-wrangler'
			) }"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>`,
			click: () => {
				Fancybox.close();
				document.dispatchEvent(
					new CustomEvent( 'dlxpw-pattern-preview-delete-request', {
						bubbles: true,
						detail: { patternId: item.id },
					} )
				);
			},
		};
	}

	return {
		closeButton: false,
		Carousel: {
			Toolbar: {
				absolute: true,
				enabled: true,
				display: {
					left: [],
					middle: [ 'deletePattern' ],
					right: [ 'close' ],
				},
				items,
			},
			...extraCarousel,
		},
		...restExtra,
	};
};

const buildPatternPreviewSlide = ( patternItem ) => {
	const viewportWidth = patternItem.viewportWidth || 1200;
	const previewUrl = patternItem?.id
		? `${ ajaxurl }?action=dlxpw_pattern_preview&pattern_id=${ patternItem.id }&viewport_width=${ viewportWidth }`
		: '';

	return {
		src: previewUrl,
		caption: patternItem.title,
		type: 'iframe',
	};
};

const popPatternPreview = ( item, galleryItems ) => {
	if ( ! galleryItems || galleryItems.length < 2 ) {
		Fancybox.show(
			[ buildPatternPreviewSlide( item ) ],
			getPatternPreviewFancyboxOptions()
		);
		return;
	}

	const slides = galleryItems.map( ( patternItem ) =>
		buildPatternPreviewSlide( patternItem )
	);
	let startIndex = galleryItems.findIndex( ( p ) => p.id === item.id );
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
			item,
		} )
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
										top: '50%',
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
