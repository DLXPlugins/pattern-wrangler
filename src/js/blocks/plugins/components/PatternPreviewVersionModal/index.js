// eslint-disable-next-line no-unused-vars
import React, { useMemo } from 'react';
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { parse } from '@wordpress/blocks';
import { BlockPreview } from '@wordpress/block-editor';
import PatternVersionDropdownMenu from '../PatternVersionDropdownMenu';

/**
 * Pattern Create Modal.
 *
 * @param {Object}   props               The props.
 * @param {Object}   props.version       The version object from REST (id, title, content, description, date).
 * @param {Function} props.onActionClick The function to call when a dropdown item is clicked.
 * @return {Object} The rendered component.
 */
const PatternPreviewVersionModal = ( props ) => {
	const blocks = useMemo(
		() => parse( props.version.content ),
		[ props.version.content ]
	);

	return (
		<>
			<Modal
				title={ props.version.title ?? __( 'Preview Version', 'pattern-wrangler' ) }
				onRequestClose={ props.onRequestClose }
				focusOnMount="firstContentElement"
				isFullScreen={ true }
				headerActions={
					<PatternVersionDropdownMenu
						version={ props.version }
						onActionClick={ props.onActionClick }
					/>
				}
			>
				<div className="dlx-pw-modal-content">
					<BlockPreview blocks={ blocks } />
				</div>
			</Modal>
		</>
	);
};

export default PatternPreviewVersionModal;
