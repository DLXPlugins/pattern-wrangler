import { DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * A dropdown menu for a pattern version.
 *
 * @param {Object}   props               The props.
 * @param {Object}   props.version       Version object from REST (id, title, content, description, date).
 * @param {Function} props.onActionClick The function to call when a dropdown item is clicked.
 * @return {JSX.Element} The dropdown menu.
 */
export default function PatternVersionDropdownMenu( {
	version = {},
	onActionClick = () => {},
} ) {
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
					onClick: () => onActionClick( 'restore', version ),
				},
				{
					title: __( 'Delete', 'pattern-wrangler' ),
					onClick: () => onActionClick( 'delete', version ),
				},
				{
					title: __( 'Export', 'pattern-wrangler' ),
					onClick: () => onActionClick( 'export', version ),
				},
				{
					title: __( 'Copy', 'pattern-wrangler' ),
					onClick: () => onActionClick( 'copy', version ),
				},
			] }
		/>
	);
}
