import { render } from '@wordpress/element';
import PatternsView from './components/PatternsView';
import './styles/patterns-view.scss';

// Wait for DOM to be ready.
document.addEventListener( 'DOMContentLoaded', () => {
	const container = document.getElementById( 'dlx-pattern-wrangler-view' );
	if ( container ) {
		render( <PatternsView />, container );
	}
} );
