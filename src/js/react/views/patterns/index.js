import { createRoot } from 'react-dom';
import PatternsGrid from './components/PatternsGrid';
import './styles/patterns-view.scss';

const container = document.getElementById( 'dlx-pattern-wrangler-view' );

if ( container ) {
	const root = createRoot( container );
	root.render(
		<PatternsGrid />
	);
}
