import { render } from '@wordpress/element';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PatternsView from './components/PatternsView';
import './styles/patterns-view.scss';

const queryClient = new QueryClient();

// Wait for DOM to be ready.
document.addEventListener( 'DOMContentLoaded', () => {
	const container = document.getElementById( 'dlx-pattern-wrangler-view' );
	if ( container ) {
		render(
			<QueryClientProvider client={ queryClient }>
				<PatternsView />
			</QueryClientProvider>,
			container
		);
	}
} );
