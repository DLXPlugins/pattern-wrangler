/**
 * WordPress dependencies.
 */
import { memo, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { parse } from '@wordpress/blocks';
import { BlockPreview } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import PatternVersionDropdownMenu from '../PatternVersionDropdownMenu';

/**
 * One saved pattern version row with preview.
 *
 * @param {Object}   props                Props.
 * @param {Object}   props.version        Version object from REST (id, title, content, description, date).
 * @param {Function} props.onPreviewClick The function to call when the preview button is clicked.
 * @param {Function} props.onActionClick  The function to call when a dropdown item is clicked.
 * @return {JSX.Element} Markup.
 */
function PatternVersionCard( { version, onPreviewClick, onActionClick } ) {
	const blocks = useMemo( () => parse( version.content ), [ version.content ] );

	return (
		<div className="dlx-pw-version-item">
			<div className="dlx-pw-version-item-header">
				<h4 className="dlx-pw-version-item-header">{ version.title }</h4>
				<PatternVersionDropdownMenu
					version={ version }
					onActionClick={ onActionClick }
				/>
			</div>
			<div className="dlx-pw-version-item-media">
				<BlockPreview blocks={ blocks } />
				<Button
					variant="link"
					className="dlx-pw-version-item-preview-button"
					label={ __( 'Preview', 'pattern-wrangler' ) }
					onClick={ () => onPreviewClick( version ) }
				/>
			</div>
			<div className="dlx-pw-version-item-content">{ version.description }</div>
			<div className="dlx-pw-version-item-footer">
				<Button
					variant="link"
					label={ __( 'Restore', 'pattern-wrangler' ) }
					onClick={ () => onActionClick( 'restore', version ) }
				>
					{ __( 'Restore', 'pattern-wrangler' ) }
				</Button>
				{ ' | ' }
				<Button
					variant="link"
					isDestructive
					label={ __( 'Delete', 'pattern-wrangler' ) }
					onClick={ () => onActionClick( 'delete', version ) }
				>
					{ __( 'Delete', 'pattern-wrangler' ) }
				</Button>
			</div>
			<div className="dlx-pw-version-item-date">{ version.date }</div>
		</div>
	);
}

const MemoPatternVersionCard = memo( PatternVersionCard );

/**
 * Grid of pattern versions. Memoized so parent state (e.g. modal open) does not re-render previews.
 *
 * @param {Object}   props                Props.
 * @param {Object[]} props.versions       Version rows from REST.
 * @param {Function} props.onPreviewClick The function to call when the preview button is clicked.
 * @param {Function} props.onActionClick  The function to call when a dropdown item is clicked.
 * @return {JSX.Element} Markup.
 */
function PatternVersionCards( { versions, onPreviewClick, onActionClick } ) {
	return (
		<div className="dlx-pw-versions-grid">
			{ versions.map( ( v ) => (
				<MemoPatternVersionCard
					key={ v.id }
					version={ v }
					onPreviewClick={ onPreviewClick }
					onActionClick={ onActionClick }
				/>
			) ) }
		</div>
	);
}

export default memo( PatternVersionCards );
