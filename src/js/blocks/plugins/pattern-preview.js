import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';

// Try to get ActionItem, but don't fail if it's not available
let PluginPreviewMenuItem;
try {
	const { PluginPreviewMenuItem: ImportedPluginPreviewMenuItem } = require( '@wordpress/editor' );
	PluginPreviewMenuItem = ImportedPluginPreviewMenuItem;
} catch ( e ) {
	// ActionItem not available
}

console.log( PluginPreviewMenuItem );

/**
 * Render a Preview Button.
 *
 * @return {Object|null} The rendered component or null if ActionItem not available.
 */
const PatternPreviewButton = () => {
	// Return early if ActionItem isn't available
	if ( ! PluginPreviewMenuItem ) {
		return null;
	}

	return (
		<PluginPreviewMenuItem
			icon="external"
			label={ __( 'Preview Pattern', 'pattern-wrangler' ) }
			onClick={ () => {
				window.open( dlxPatternWranglerPreview.previewUrl, '_blank' );
			} }
		>
			{ __( 'Preview Pattern', 'pattern-wrangler' ) }
		</PluginPreviewMenuItem>
	);
};

// Only register if ActionItem is available
if ( PluginPreviewMenuItem ) {
	registerPlugin( 'dlx-pattern-wrangler-preview-button', {
		render: PatternPreviewButton,
	} );
}

