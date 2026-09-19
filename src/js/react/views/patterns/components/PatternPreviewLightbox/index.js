/**
 * Pattern preview lightbox using Yet Another React Lightbox.
 *
 * @package
 */

import { useMemo, useState, useEffect, useCallback } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { canonicalPatternId } from '../../utils/patternIdUtils';

/* eslint-disable no-undef */

/**
 * Visibility map for preview toolbar actions.
 *
 * @param {Object|undefined} pattern Active pattern row.
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
		disable: ! pattern.isLocal && ! pattern.isDisabled,
		delete: !! pattern.isLocal,
		edit: !! pattern.isLocal && ! pattern.isDisabled,
		export: true,
		copy: !! hasCopyableContent,
	};
};

/**
 * Copy pattern block markup to the clipboard.
 *
 * @param {Object|undefined} pattern Pattern row.
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
		} catch ( err ) {
			// Ignore copy failures.
		}
		document.body.removeChild( textarea );
	}
};

/**
 * Build an iframe slide from a pattern row.
 *
 * @param {Object} patternItem Pattern row.
 * @return {Object} YARL slide.
 */
const buildPatternPreviewSlide = ( patternItem ) => {
	const previewArgs = {
		action: 'dlxpw_pattern_preview',
		pattern_id: patternItem.id,
	};
	if ( patternItem.viewportWidth ) {
		previewArgs.viewport_width = patternItem.viewportWidth;
	}
	const previewUrl = patternItem?.id
		? addQueryArgs( ajaxurl, previewArgs )
		: '';

	return {
		type: 'iframe',
		src: previewUrl,
		title: patternItem.title || '',
		pattern: patternItem,
	};
};

/**
 * Toolbar icon button for pattern preview actions.
 *
 * @param {Object}          props             Component props.
 * @param {string}          props.label       Accessible label.
 * @param {string}          props.toolbar     data-dlxpw-toolbar value.
 * @param {Function}        props.onClick     Click handler.
 * @param {boolean}         props.destructive Whether to use destructive styling.
 * @param {boolean}         props.pressed     Toggle pressed state.
 * @param {React.ReactNode} props.children    Icon markup.
 * @return {JSX.Element} Button element.
 */
const ToolbarIconButton = ( {
	label,
	toolbar,
	onClick,
	destructive = false,
	pressed = null,
	children,
} ) => {
	const className = [
		'yarl__button',
		'dlxpw-pattern-preview-lightbox__toolbar-btn',
		destructive
			? 'dlxpw-pattern-preview-lightbox__toolbar-btn--destructive'
			: '',
		null !== pressed && pressed
			? 'dlxpw-pattern-preview-lightbox__toolbar-btn--selected is-selected'
			: '',
	]
		.filter( Boolean )
		.join( ' ' );

	const pressedProps =
		null === pressed
			? {}
			: { 'aria-pressed': pressed ? 'true' : 'false' };

	return (
		<button
			type="button"
			className={ className }
			title={ label }
			aria-label={ label }
			data-dlxpw-toolbar={ toolbar }
			onClick={ onClick }
			{ ...pressedProps }
		>
			{ children }
		</button>
	);
};

/**
 * Pattern preview lightbox.
 *
 * @param {Object}   props               Component props.
 * @param {boolean}  props.open          Whether the lightbox is open.
 * @param {Function} props.onClose       Close callback.
 * @param {Array}    props.items         Pattern rows for the gallery.
 * @param {number}   props.index         Current slide index.
 * @param {Function} props.onIndexChange Index change callback.
 * @param {Function} props.onDisable     Disable pattern callback.
 * @param {Function} props.onDelete      Delete pattern callback.
 * @param {Function} props.onEdit        Edit pattern callback.
 * @param {Function} props.onExport      Export pattern callback.
 * @return {JSX.Element|null} Lightbox or null.
 */
const PatternPreviewLightbox = ( {
	open,
	onClose,
	items = [],
	index = 0,
	onIndexChange,
	onDisable,
	onDelete,
	onEdit,
	onExport,
} ) => {
	const [ deviceMode, setDeviceMode ] = useState( 'desktop' );
	const [ currentIndex, setCurrentIndex ] = useState( index );

	useEffect( () => {
		if ( open ) {
			setDeviceMode( 'desktop' );
			setCurrentIndex( index );
		}
	}, [ open, index ] );

	const slides = useMemo(
		() => items.map( ( patternItem ) => buildPatternPreviewSlide( patternItem ) ),
		[ items ]
	);

	const activePattern = items[ currentIndex ] || items[ 0 ];
	const visibility = getPreviewToolbarButtonVisibility( activePattern );

	const handleView = useCallback(
		( { index: viewIndex } ) => {
			setCurrentIndex( viewIndex );
			if ( 'function' === typeof onIndexChange ) {
				onIndexChange( viewIndex );
			}
		},
		[ onIndexChange ]
	);

	const handleDisable = useCallback( () => {
		const patternId = activePattern?.id;
		onClose();
		if ( 'function' === typeof onDisable ) {
			onDisable( patternId );
		}
	}, [ activePattern, onClose, onDisable ] );

	const handleDelete = useCallback( () => {
		const patternId = activePattern?.id;
		if ( '' === canonicalPatternId( patternId ) ) {
			return;
		}
		onClose();
		if ( 'function' === typeof onDelete ) {
			onDelete( patternId );
		}
	}, [ activePattern, onClose, onDelete ] );

	const handleEdit = useCallback( () => {
		const patternId = activePattern?.id;
		onClose();
		if ( 'function' === typeof onEdit ) {
			onEdit( patternId );
		}
	}, [ activePattern, onClose, onEdit ] );

	const handleExport = useCallback( () => {
		const patternId = activePattern?.id;
		if ( 'function' === typeof onExport ) {
			onExport( patternId );
		}
	}, [ activePattern, onExport ] );

	const handleCopy = useCallback( () => {
		void copyPatternMarkupToClipboard( activePattern );
	}, [ activePattern ] );

	const toolbarButtons = useMemo( () => {
		const left = [];
		const middle = [];
		const right = [];

		if ( visibility.disable ) {
			left.push(
				<ToolbarIconButton
					key="disable"
					label={ __( 'Disable pattern', 'pattern-wrangler' ) }
					toolbar="disable"
					onClick={ handleDisable }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<rect x="6" y="4" width="4" height="16" />
						<rect x="14" y="4" width="4" height="16" />
					</svg>
				</ToolbarIconButton>
			);
		}

		if ( visibility.delete ) {
			left.push(
				<ToolbarIconButton
					key="delete"
					label={ __( 'Delete pattern', 'pattern-wrangler' ) }
					toolbar="delete"
					destructive
					onClick={ handleDelete }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
						<line x1="10" y1="11" x2="10" y2="17" />
						<line x1="14" y1="11" x2="14" y2="17" />
					</svg>
				</ToolbarIconButton>
			);
		}

		if ( visibility.edit ) {
			middle.push(
				<ToolbarIconButton
					key="edit"
					label={ __( 'Edit pattern', 'pattern-wrangler' ) }
					toolbar="edit"
					onClick={ handleEdit }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
					</svg>
				</ToolbarIconButton>
			);
		}

		if ( visibility.export ) {
			middle.push(
				<ToolbarIconButton
					key="export"
					label={ _x(
						'Export',
						'Export pattern file',
						'pattern-wrangler'
					) }
					toolbar="export"
					onClick={ handleExport }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="7 10 12 15 17 10" />
						<line x1="12" y1="15" x2="12" y2="3" />
					</svg>
				</ToolbarIconButton>
			);
		}

		if ( visibility.copy ) {
			middle.push(
				<ToolbarIconButton
					key="copy"
					label={ __( 'Copy pattern markup', 'pattern-wrangler' ) }
					toolbar="copy"
					onClick={ handleCopy }
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<rect x="9" y="9" width="13" height="13" rx="2" />
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
					</svg>
				</ToolbarIconButton>
			);
		}

		right.push(
			<ToolbarIconButton
				key="preview-desktop"
				label={ __( 'Desktop preview', 'pattern-wrangler' ) }
				toolbar="preview-desktop"
				pressed={ 'desktop' === deviceMode }
				onClick={ () => setDeviceMode( 'desktop' ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<rect x="3" y="4" width="18" height="12" rx="1" />
					<line x1="9" y1="20" x2="15" y2="20" />
					<line x1="12" y1="16" x2="12" y2="20" />
				</svg>
			</ToolbarIconButton>
		);

		right.push(
			<ToolbarIconButton
				key="preview-tablet"
				label={ __( 'Tablet preview', 'pattern-wrangler' ) }
				toolbar="preview-tablet"
				pressed={ 'tablet' === deviceMode }
				onClick={ () => setDeviceMode( 'tablet' ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<rect x="6" y="3" width="12" height="18" rx="2" />
					<line x1="11" y1="18" x2="13" y2="18" />
				</svg>
			</ToolbarIconButton>
		);

		right.push(
			<ToolbarIconButton
				key="preview-mobile"
				label={ __( 'Mobile preview', 'pattern-wrangler' ) }
				toolbar="preview-mobile"
				pressed={ 'mobile' === deviceMode }
				onClick={ () => setDeviceMode( 'mobile' ) }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<rect x="8" y="2" width="8" height="20" rx="2" />
					<line x1="11" y1="19" x2="13" y2="19" />
				</svg>
			</ToolbarIconButton>
		);

		right.push(
			<ToolbarIconButton
				key="close"
				label={ __( 'Close', 'pattern-wrangler' ) }
				toolbar="close"
				onClick={ onClose }
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</ToolbarIconButton>
		);

		return [
			<div
				key="toolbar-groups"
				className="dlxpw-pattern-preview-lightbox__toolbar-groups"
			>
				<div className="dlxpw-pattern-preview-lightbox__toolbar-group dlxpw-pattern-preview-lightbox__toolbar-group--left">
					{ left }
				</div>
				<div className="dlxpw-pattern-preview-lightbox__toolbar-group dlxpw-pattern-preview-lightbox__toolbar-group--middle">
					{ middle }
				</div>
				<div className="dlxpw-pattern-preview-lightbox__toolbar-group dlxpw-pattern-preview-lightbox__toolbar-group--right">
					{ right }
				</div>
			</div>,
		];
	}, [
		visibility,
		deviceMode,
		handleDisable,
		handleDelete,
		handleEdit,
		handleExport,
		handleCopy,
		onClose,
	] );

	if ( ! slides.length ) {
		return null;
	}

	return (
		<Lightbox
			open={ open }
			close={ onClose }
			index={ currentIndex }
			slides={ slides }
			plugins={ [ Captions ] }
			carousel={ { finite: true } }
			controller={ { closeOnBackdropClick: true } }
			className={ `dlxpw-pattern-preview-lightbox device-${ deviceMode }` }
			portal={ {
				container: {
					'data-dlxpw-preview-device': deviceMode,
				},
			} }
			toolbar={ { buttons: toolbarButtons } }
			on={ { view: handleView } }
			render={ {
				buttonClose: () => null,
				slide: ( { slide } ) => {
					if ( 'iframe' !== slide.type ) {
						return undefined;
					}
					return (
						<iframe
							src={ slide.src }
							title={ slide.title || '' }
							className="dlxpw-pattern-preview-lightbox__iframe"
							sandbox="allow-same-origin allow-scripts allow-forms"
						/>
					);
				},
			} }
		/>
	);
};

export default PatternPreviewLightbox;
