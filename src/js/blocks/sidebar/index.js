import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody } from '@wordpress/components';
import GBHacksIcon from '../components/GBHacksIcon';
const MySidebar = () => (
	<PluginSidebar
		name="gb-hacks"
		title="GB Hacks"
	>
		<PanelBody>
			asdfsadf
		</PanelBody>
	</PluginSidebar>
);

registerPlugin( 'dlx-gb-sidebar', {
	icon: <GBHacksIcon />,
	render: MySidebar,
} );
