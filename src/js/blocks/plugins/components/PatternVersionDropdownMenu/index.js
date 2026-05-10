import { DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * A dropdown menu for a pattern version.
 *
 * @param {Object} props         The props.
 * @param {Object} props.version The version object from REST (id, title, content, description, date).
 * @return {JSX.Element} The dropdown menu.
 */
export default function PatternVersionDropdownMenu( { version } ) {
	return (
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
	);
}
