import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/editor';

/**
 * Render a Preview Button.
 *
 * @return {Object} The rendered component.
 */
const PatternPreviewButton = () => {
	return (
		<PluginPostStatusInfo
			icon="external"
			label={ __( 'Preview Pattern', 'pattern-wrangler' ) }
			className="dlx-pw-preview-sidebar"
		>
			<div className="dlx-pw-preview-sidebar-content">
				<Tooltip
					text={ __( 'Preview Pattern in new tab', 'pattern-wrangler' ) }
				>
					<Button
						variant="tertiary"
						href={ dlxPatternWranglerPreview.previewUrl }
						target="_blank"
						icon="external"
						iconPosition="right"
						rel="noopener noreferrer"
						className="button button-secondary"
						showTooltip={ true }
						style={ {
							margin: 0,
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '0.5em 1em',
							fontSize: '1em',
							fontWeight: 'normal',
							lineHeight: '1.5',
							textDecoration: 'none',
						} }
						aria-label={ __( 'Preview Pattern in new tab', 'pattern-wrangler' ) }
					>
						{ __( 'Preview Pattern', 'pattern-wrangler' ) }
					</Button>
				</Tooltip>
			</div>
		</PluginPostStatusInfo>
	);
};

registerPlugin( 'dlx-pattern-wrangler-preview-button', {
	render: PatternPreviewButton,
} );
