import { useState, useEffect, useCallback } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/editor';
import { Button, Spinner, PanelBody, BaseControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import PatternVersionCreateModal from './components/PatternVersionCreateModal';
import PatternVersionCards from './components/PatternVersionCards';
import PatternPreviewVersionModal from './components/PatternPreviewVersionModal';

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

	useEffect( () => {
		fetchVersions();
	}, [ fetchVersions ] );

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
								onActionClick={ ( action, version ) => {
									console.log( 'action', action, version );
								} }
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
					onActionClick={ ( action, version ) => {
						console.log( 'action', action, version );
					} }
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
