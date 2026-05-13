import { useState, useEffect, useCallback } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/editor';
import { Button, Spinner, PanelBody, BaseControl } from '@wordpress/components';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { parse } from '@wordpress/blocks';
import apiFetch from '@wordpress/api-fetch';
import { downloadBlob } from '@wordpress/blob';
import { copyToClipboard } from '../../utils/pattern-code-helpers';
import PatternVersionCreateModal from './components/PatternVersionCreateModal';
import PatternVersionCards from './components/PatternVersionCards';
import PatternPreviewVersionModal from './components/PatternPreviewVersionModal';
import VersionDeleteModal from './components/VersionDeleteModal/index';
import VersionRestoreModal from './components/VersionRestoreModal/index';

const PatternWranglerIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 538 556"
		fillRule="evenodd"
		clipRule="evenodd"
		strokeLinejoin="round"
		strokeMiterlimit={ 2 }
		width="24px"
		height="24px"
	>
		<path
			d="m537.48 116.82-66.686 42.182-83.734 52.984v.017l-118.594 75.036-34.676-19.5-167.502-94.106L.017 136.188 269.129 0z"
			fill="currentColor"
			fillRule="nonzero"
		/>
		<path
			d="m537.48 206.254-66.653 42.182-.1.05-83.684 52.951-118.593 75.036-118.428-66.554-83.717-47.053c-.033-.016-.05-.033-.083-.049L.017 225.622l60.754-30.75 78.764 44.253 83.751 47.053 40.243 22.615a10.8 10.8 0 0 0 5.252 1.375c1.988 0 3.976-.547 5.716-1.657l123.994-78.449 78.946-49.952z"
			fill="currentColor"
			fillRule="nonzero"
		/>
		<path
			d="m537.48 295.704-66.653 42.165c-.033.034-.083.05-.116.083L268.45 465.923 66.288 352.333a.4.4 0 0 0-.083-.05L0 315.089l60.755-30.751 78.763 44.253 123.995 69.668a10.7 10.7 0 0 0 5.235 1.376c1.988 0 3.976-.547 5.716-1.657l123.994-78.449 78.946-49.953z"
			fill="currentColor"
			fillRule="nonzero"
		/>
		<path
			d="M537.48 385.138 268.45 555.356.017 404.522l60.754-30.75L263.529 487.71a10.7 10.7 0 0 0 5.236 1.375c1.988 0 3.976-.547 5.716-1.657l202.94-128.418z"
			fill="currentColor"
			fillRule="nonzero"
		/>
	</svg>
);

/**
 * Build a safe download filename base for a version JSON export.
 *
 * @param {string} title     Version title.
 * @param {number} versionId Version post ID when title is empty.
 * @return {string} File base without extension.
 */
const getVersionExportFileBase = ( title, versionId ) => {
	let base = ( title || '' ).trim();
	if ( ! base ) {
		base = sprintf( 'pattern-version-%d', versionId );
	}
	base = base
		.replace( /[/\\?%*:|"<>]+/g, '-' )
		.replace( /\s+/g, '-' )
		.replace( /^-+|-+$/g, '' );
	if ( ! base ) {
		base = sprintf( 'pattern-version-%d', versionId );
	}
	return base;
};

/**
 * Pattern versions sidebar for wp_block.
 *
 * @return {JSX.Element} Markup.
 */
const PatternVersionsSidebar = () => {
	const { postId, hasUnsavedChanges } = useSelect( ( selectStore ) => {
		const editor = selectStore( 'core/editor' );
		return {
			postId: editor.getCurrentPostId(),
			hasUnsavedChanges: editor.isEditedPostDirty(),
		};
	}, [] );

	const { createNotice } = useDispatch( 'core/notices' );

	const [ versions, setVersions ] = useState( [] );
	const [ loadingList, setLoadingList ] = useState( false );
	const [ createVersionModalOpen, setCreateVersionModalOpen ] = useState( false );
	const [ previewVersionModalOpen, setPreviewVersionModalOpen ] = useState( null );
	const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState( false );
	const [ isRestoreModalOpen, setIsRestoreModalOpen ] = useState( false );

	const fetchVersions = useCallback( async() => {
		if ( ! postId ) {
			setVersions( [] );
			return;
		}
		setLoadingList( true );
		try {
			const res = await apiFetch( {
				path: `/dlxplugins/pattern-wrangler/v1/versions?parent=${ postId }`,
			} );
			setVersions( res.versions || [] );
		} catch ( err ) {
			const message =
				err?.message || __( 'Could not load versions.', 'pattern-wrangler' );
			createNotice( 'error', message, {
				type: 'snackbar',
				isDismissible: true,
			} );
		} finally {
			setLoadingList( false );
		}
	}, [ postId, createNotice ] );

	const closeAllModals = useCallback( () => {
		setCreateVersionModalOpen( false );
		setPreviewVersionModalOpen( null );
	}, [] );

	useEffect( () => {
		fetchVersions();
	}, [ fetchVersions ] );

	const handleActionClick = useCallback(
		async( action, version ) => {
			switch ( action ) {
				case 'delete':
					closeAllModals();
					setIsDeleteModalOpen( { version } );
					break;
				case 'export': {
					try {
						const syncStatus =
							version.wp_pattern_sync_status === 'unsynced' ? 'unsynced' : '';
						const fileContent = JSON.stringify(
							{
								__file: 'wp_block',
								title: version.title,
								content: version.content ?? '',
								syncStatus,
							},
							null,
							2
						);
						const fileBase = getVersionExportFileBase(
							version.title,
							version.id
						);
						downloadBlob( `${ fileBase }.json`, fileContent, 'application/json' );
						createNotice(
							'success',
							__( 'Version exported.', 'pattern-wrangler' ),
							{ type: 'snackbar', isDismissible: true }
						);
					} catch ( err ) {
						createNotice(
							'error',
							__( 'Could not export version.', 'pattern-wrangler' ),
							{ type: 'snackbar', isDismissible: true }
						);
					}
					break;
				}
				case 'copy': {
					const ok = await copyToClipboard( version.content ?? '' );
					if ( ok ) {
						createNotice(
							'success',
							__( 'Version copied to clipboard.', 'pattern-wrangler' ),
							{ type: 'snackbar', isDismissible: true }
						);
					} else {
						createNotice(
							'error',
							__( 'Could not copy to clipboard.', 'pattern-wrangler' ),
							{ type: 'snackbar', isDismissible: true }
						);
					}
					break;
				}
				case 'restore':
					closeAllModals();
					setIsRestoreModalOpen( { version } );
					break;
			}
		},
		[ closeAllModals, createNotice, setIsRestoreModalOpen ]
	);

	return (
		<>
			<PluginSidebar
				name="dlx-pattern-wrangler-versions"
				title={ __( 'Pattern Wrangler', 'pattern-wrangler' ) }
				className="dlx-pw-preview-sidebar"
				icon={ PatternWranglerIcon }
			>
				<PanelBody title={ __( 'Pattern versions', 'pattern-wrangler' ) }>
					<div className="dlx-pw-admin-row">
						<BaseControl
							id="dlx-pw-versions-save-version"
							label={ __( 'Save Version', 'pattern-wrangler' ) }
							help={
								hasUnsavedChanges
									? __(
										'Save or update the pattern in the editor before creating a version.',
										'pattern-wrangler'
									  )
									: undefined
							}
						>
							<Button
								variant="secondary"
								onClick={ () => setCreateVersionModalOpen( true ) }
								disabled={ ! postId || hasUnsavedChanges }
							>
								{ __( 'Save New Version', 'pattern-wrangler' ) }
							</Button>
						</BaseControl>
					</div>
					<div className="dlx-pw-admin-row">
						{ loadingList && <Spinner /> }
						{ ! loadingList && versions.length > 0 && (
							<PatternVersionCards
								versions={ versions }
								onPreviewClick={ ( version ) => {
									setPreviewVersionModalOpen( { version } );
								} }
								onActionClick={ handleActionClick }
							/>
						) }
						{ ! loadingList && postId && versions.length === 0 && (
							<p className="description">
								{ __( 'No versions yet.', 'pattern-wrangler' ) }
							</p>
						) }
					</div>
				</PanelBody>
			</PluginSidebar>
			{ createVersionModalOpen && (
				<PatternVersionCreateModal
					title={ __( 'Create new version', 'pattern-wrangler' ) }
					patternId={ postId }
					patternNonce={ dlxPatternWranglerPreview.createVersionNonce }
					onRequestClose={ () => setCreateVersionModalOpen( false ) }
					onCreate={ ( response ) => {
						setCreateVersionModalOpen( false );
						createNotice(
							'success',
							sprintf(
								// translators: %s: the version title.
								__( 'Pattern Version %s created.', 'pattern-wrangler' ),
								response.title
							),
							{ type: 'snackbar', isDismissible: true }
						);
						fetchVersions();
					} }
				/>
			) }
			{ previewVersionModalOpen && (
				<PatternPreviewVersionModal
					version={ previewVersionModalOpen.version }
					onRequestClose={ () => setPreviewVersionModalOpen( false ) }
					onActionClick={ handleActionClick }
				/>
			) }
			{ isDeleteModalOpen && (
				<VersionDeleteModal
					id={ isDeleteModalOpen.version.id }
					nonce={ isDeleteModalOpen.version.deleteNonce }
					onRequestClose={ () => setIsDeleteModalOpen( false ) }
					onDelete={ () => {
						setIsDeleteModalOpen( false );
						createNotice(
							'success',
							sprintf(
								// translators: %s: the version title.
								__( 'Pattern Version %s deleted.', 'pattern-wrangler' ),
								isDeleteModalOpen.version.title
							),
							{ type: 'snackbar', isDismissible: true }
						);
						setVersions(
							versions.filter(
								( version ) => version.id !== isDeleteModalOpen.version.id
							)
						);
					} }
				/>
			) }
			{ isRestoreModalOpen && (
				<VersionRestoreModal
					id={ isRestoreModalOpen.version.id }
					nonce={ isRestoreModalOpen.version.restoreNonce }
					patternId={ postId }
					onRequestClose={ () => setIsRestoreModalOpen( false ) }
					onRestore={ ( { content, categories }, shouldCreateSnapshot ) => {
						const blocks = parse( content );
						dispatch( 'core/editor' ).resetEditorBlocks( blocks );
						dispatch( 'core/editor' ).editPost( { categories } );
						dispatch( 'core/editor' ).savePost();
						if ( shouldCreateSnapshot ) {
							fetchVersions();
						}
						setIsRestoreModalOpen( false );
					} }
					isEditedPostDirty={ hasUnsavedChanges }
				/>
			) }
		</>
	);
};

const PatternVersionsPlugin = () => {
	if ( ! dlxPatternWranglerPreview?.versions?.enabled ) {
		return null;
	}
	return <PatternVersionsSidebar />;
};

registerPlugin( 'dlx-pattern-wrangler-versions', {
	render: PatternVersionsPlugin,
} );
