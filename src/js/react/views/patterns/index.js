import { render } from '@wordpress/element';
import {
	createHashHistory,
	createRouter,
	RouterProvider,
	createRoute,
	createRootRoute,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PatternTabs from './components/PatternTabs';
import './styles/patterns-view.scss';

// Create a hash history instance with the WordPress admin path
const hashHistory = createHashHistory( {
	initialEntries: [ '/' ],
} );
// Create the root route
const rootRoute = createRootRoute( {
	component: () => <PatternTabs />,
} );

// Define your routes with different components or views
const indexRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: '/',
	component: PatternTabs,
} );

// Local root.
const localRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: '/local',
	component: PatternTabs,
} );

const registeredPatternsRoute = createRoute( {
	getParentRoute: () => rootRoute,
	path: '/registered',
	component: PatternTabs,
} );

// Include all routes in the route tree
const routeTree = rootRoute.addChildren( [ indexRoute, localRoute, registeredPatternsRoute ] );

// Create a router instance
const router = createRouter( {
	routeTree,
	history: hashHistory,
	context: {
		history: hashHistory,
	},
} );

const container = document.getElementById( 'dlx-pattern-wrangler-view' );
const queryClient = new QueryClient();
if ( container ) {
	render(
		<QueryClientProvider client={ queryClient }>
			<RouterProvider router={ router } />
		</QueryClientProvider>,
		container
	);
}
