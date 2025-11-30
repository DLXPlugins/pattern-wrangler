import { render } from '@wordpress/element';
import PatternsGrid from './components/PatternsGrid';
import './styles/patterns-view.scss';

const container = document.getElementById( 'dlx-pattern-wrangler-view' );

if ( container ) {
	render(
		<PatternsGrid />,
		container
	);
}
