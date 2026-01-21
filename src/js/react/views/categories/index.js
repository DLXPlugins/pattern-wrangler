import { createRoot } from 'react-dom';
import CategoriesListView from './components/CategoriesListView';
import './styles/pattern-categories.scss';

const container = document.getElementById( 'dlx-pattern-wrangler-categories-view' );

if ( container ) {
	const root = createRoot( container );
	root.render(
		<CategoriesListView />
	);
}
