import { useState } from 'react';
import { useCommand } from '@wordpress/commands';
import { registerPlugin } from '@wordpress/plugins';
import { settings, upload } from '@wordpress/icons';
import {
	Modal,
	SelectControl,
	TextControl,
	Spinner,
} from '@wordpress/components';
import SendCommand from '../utils/SendCommand';

const GBCommands = () => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ groupsLoading, setGroupsLoading ] = useState( false );
	const [ groups, setGroups ] = useState( [] );

	useCommand( {
		name: 'dlx-gb-admin-settings',
		label: 'Go to GenerateBlocks Settings',
		icon: settings,
		callback: () => {
			document.location.href = 'admin.php?page=generateblocks-settings';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-local-patterns',
		label: 'Go to GenerateBlocks Local Patterns',
		icon: settings,
		callback: () => {
			document.location.href = 'edit.php?post_type=gblocks_templates';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-global-styles',
		label: 'Go to GenerateBlocks Global Styles',
		icon: settings,
		callback: () => {
			document.location.href = 'edit.php?post_type=gblocks_templates';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-hacks-Settings',
		label: 'Go to GenerateBlocks (GB) Hacks Settings',
		icon: settings,
		callback: () => {
			document.location.href = 'admin.php?page=dlx-gb-hacks';
		},
		context: 'block-editor',
	} );
	// useCommand( {
	// 	name: 'dlx-gb-svg-add-asset-library',
	// 	label: 'Add an SVG to the GenerateBlocks Asset Library',
	// 	icon: upload,
	// 	callback: async() => {
	// 		setIsModalOpen( true );
	// 		setGroupsLoading( true );
	// 		const response = await SendCommand(
	// 			gbHacksPatternInserter.restNonce,
	// 			{},
	// 			gbHacksPatternInserter.restUrl + '/get_asset_icon_groups',
	// 			'get'
	// 		);
	// 		// Extract out data.
	// 		const { data, success } = response.data;
	// 		if ( success ) {
	// 			setGroups( data.groups );
	// 		}
	// 		setGroupsLoading( false );
	// 	},
	// 	context: 'block-editor',
	// } );

	// const getGroups = () => {

	// }
	return (
		<>
			{ isModalOpen && (
				<Modal
					isDismissible={ true }
					shouldCloseOnClickOutside={ false }
					shouldCloseOnEsc={ true }
					title="Save SVG to Asset Library"
					onRequestClose={ () => {
						setIsModalOpen( false );
					} }
				>
					{ groupsLoading && (
						<>
							<Spinner />
						</>
					) }
				</Modal>
			) }
		</>
	);
};

registerPlugin( 'dlxgb-commands', {
	render: GBCommands,
} );
