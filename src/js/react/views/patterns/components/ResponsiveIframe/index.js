/**
 * Scaled pattern thumbnail iframe for the patterns grid.
 *
 * @package
 */

import { useRef, useState, useEffect } from 'react';
import { useResizeObserver } from '@wordpress/compose';
import ZoomIcon from '../Icons/ZoomIcon';
import { ReactSpinner3 } from '@mediaron/react-spinners';

/**
 * Responsive pattern preview thumbnail.
 *
 * @param {Object}   props                  Component props.
 * @param {string}   props.src              Preview iframe URL.
 * @param {string}   props.title            Iframe title.
 * @param {Object}   props.item             Pattern row.
 * @param {Array}    props.galleryItems     Gallery patterns for lightbox.
 * @param {Function} props.onOpenPreview    Opens the pattern preview lightbox.
 * @param {Function} props.onPreviewSettled Called when preview loads.
 * @param {Function} props.onPreviewError   Called when preview errors.
 * @param {number}   props.queueGeneration  Preview queue generation.
 * @return {JSX.Element} Thumbnail link with scaled iframe.
 */
const ResponsiveIframe = ( {
	src,
	title,
	item,
	galleryItems = null,
	onOpenPreview = null,
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
				if ( 'function' === typeof onOpenPreview ) {
					onOpenPreview( item, galleryItems );
				}
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
									pointerEvents: 'none',
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
