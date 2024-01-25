import React from 'react';

import { createRoot } from 'react-dom/client';
import { Popover, SlotFillProvider } from '@wordpress/components';
import Main from './main';

const container = document.getElementById( 'dlx-pattern-wrangler' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<SlotFillProvider>
			<Main />
			<Popover.Slot />
		</SlotFillProvider>
	</React.StrictMode>
);
