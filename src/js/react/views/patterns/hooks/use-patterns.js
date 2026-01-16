import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const usePatterns = () => {
	const [ patterns, setPatterns ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		fetchPatterns();
	}, [] );

	const fetchPatterns = async() => {
		try {
			setIsLoading( true );
			const response = await apiFetch( {
				path: '/wp/v2/dlx-patterns', // Adjust this to your actual endpoint.
				method: 'GET',
			} );

			setPatterns( response );
		} catch ( error ) {
			console.error( 'Error fetching patterns:', error );
		} finally {
			setIsLoading( false );
		}
	};

	return { patterns, isLoading };
};

export default usePatterns;
