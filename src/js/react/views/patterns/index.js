import { render } from '@wordpress/element';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
	createHashHistory,
	createRouter,
	RouterProvider,
	Outlet,
	createRoute,
	createRootRoute,
} from '@tanstack/react-router';
import PatternTabs from './components/PatternTabs';
import './styles/patterns-view.scss';

const queryClient = new QueryClient();

// Create a hash history instance with the WordPress admin path
const hashHistory = createHashHistory();

// Create the root route
const rootRoute = createRootRoute( {
	component: () => <Outlet />,
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
		queryClient,
	},
} );

const container = document.getElementById( 'dlx-pattern-wrangler-view' );
if ( container ) {
	render(
		<RouterProvider router={ router }>
			<PatternTabs />
		</RouterProvider>,
		container
	);
}
