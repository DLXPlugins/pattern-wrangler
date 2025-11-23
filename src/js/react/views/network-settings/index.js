import React from 'react';

import { createRoot } from 'react-dom';
import { Popover, SlotFillProvider } from '@wordpress/components';
import Settings from './settings';

const container = document.getElementById( 'dlx-pattern-wrangler-network-admin' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<SlotFillProvider>
			<Settings />
			<Popover.Slot />
		</SlotFillProvider>
	</React.StrictMode>
);
