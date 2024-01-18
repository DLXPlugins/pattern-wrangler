import { registerBlockType, createBlock } from '@wordpress/blocks';
import Edit from './block';
import metaData from './block.json';

const PatternIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
	>
		<path fill="currentColor" d="M0 3v8h11V0H3a3 3 0 0 0-3 3ZM0 21a3 3 0 0 0 3 3h8V13H0ZM13 13v11h8a3 3 0 0 0 3-3v-8ZM17 11h2V7h4V5h-4V1h-2v4h-4v2h4v4z" />
	</svg>
);

registerBlockType(metaData, {
	edit: Edit,
	save() {
		return null;
	},
	icon: PatternIcon,
} );
