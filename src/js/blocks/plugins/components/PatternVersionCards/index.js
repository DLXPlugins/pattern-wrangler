/**
 * WordPress dependencies.
 */
import { memo, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { parse } from '@wordpress/blocks';
import { BlockPreview } from '@wordpress/block-editor';
import { Button, DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';

/**
 * One saved pattern version row with preview.
 *
 * @param {Object} props         Props.
 * @param {Object} props.version Version object from REST (id, title, content, description, date).
 * @return {JSX.Element} Markup.
 */
function PatternVersionCard( { version } ) {
	const blocks = useMemo( () => parse( version.content ), [ version.content ] );

	return (
		<div className="dlx-pw-version-item">
			<div className="dlx-pw-version-item-header">
				<h4 className="dlx-pw-version-item-header">{ version.title }</h4>
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'More', 'pattern-wrangler' ) }
					toggleProps={ {
						isSmall: true,
					} }
					popoverProps={ {
						placement: 'left-start',
						offset: 5,
						className: 'dlx-pw-version-item-popover-content',
					} }
					controls={ [
						{
							title: __( 'Restore', 'pattern-wrangler' ),
							onClick: () => console.log( 'restore' ),
						},
						{
							title: __( 'Delete', 'pattern-wrangler' ),
							onClick: () => console.log( 'delete' ),
						},
						{
							title: __( 'Export', 'pattern-wrangler' ),
							onClick: () => console.log( 'export' ),
						},
						{
							title: __( 'Copy', 'pattern-wrangler' ),
							onClick: () => console.log( 'copy' ),
						},
					] }
				/>
			</div>
			<div className="dlx-pw-version-item-media">
				<BlockPreview blocks={ blocks } />
			</div>
			<div className="dlx-pw-version-item-content">{ version.description }</div>
			<div className="dlx-pw-version-item-footer">
				<Button variant="link" label={ __( 'Restore', 'pattern-wrangler' ) }>
					{ __( 'Restore', 'pattern-wrangler' ) }
				</Button>
				{ ' | ' }
				<Button
					variant="link"
					isDestructive
					label={ __( 'Delete', 'pattern-wrangler' ) }
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
 * @param {Object}   props          Props.
 * @param {Object[]} props.versions Version rows from REST.
 * @return {JSX.Element} Markup.
 */
function PatternVersionCards( { versions } ) {
	return (
		<div className="dlx-pw-versions-grid">
			{ versions.map( ( v ) => (
				<MemoPatternVersionCard key={ v.id } version={ v } />
			) ) }
		</div>
	);
}

export default memo( PatternVersionCards );
