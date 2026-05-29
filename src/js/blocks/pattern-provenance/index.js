/**
 * Pattern instance provenance — block editor bootstrap.
 *
 * @package
 */

/* eslint-disable no-undef */

import { registerPatternProvenanceDispatchHooks } from './register-dispatch-hooks';

if ( dlxPatternWranglerProvenance?.trackPatternInstances ) {
	registerPatternProvenanceDispatchHooks( dlxPatternWranglerProvenance.blogId );
}
