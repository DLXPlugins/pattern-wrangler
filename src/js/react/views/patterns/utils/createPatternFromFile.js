import { serialize } from '@wordpress/blocks';

export async function createPatternFromFile( file ) {
	// 1. Read file
	const fileText = await file.text();

	// 2. Parse JSON
	let patternJSON;
	try {
		patternJSON = JSON.parse( fileText );
	} catch ( err ) {
		throw new Error( 'Invalid JSON file (cannot parse)' );
	}

	// 3. Validate minimally
	if ( ! patternJSON.title ) {
		throw new Error( 'Pattern JSON missing a title' );
	}

	// 4. Determine content source
	let content = '';

	if ( typeof patternJSON.content === 'string' ) {
		// Already serialized HTML
		content = patternJSON.content;
	} else if ( Array.isArray( patternJSON.blocks ) ) {
		// Convert block AST → HTML
		content = serialize( patternJSON.blocks );
	} else {
		throw new Error( 'Pattern JSON missing content or blocks array' );
	}

	// 5. Normalize sync status
	const syncStatus =
		typeof patternJSON.syncStatus === 'string'
			? patternJSON.syncStatus
			: 'unsynced';

	return {
		title: patternJSON.title,
		content,
		syncStatus,
	};
}

export default createPatternFromFile;
