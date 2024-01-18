/* eslint-disable no-undef */
/* eslint-disable camelcase */
import axios from 'axios';
import qs from 'qs';

/**
 * Send a REST request via JS.
 *
 * @param {string} nonce        The REST nonce.
 * @param {Object} data         The REST data to pass.
 * @param {string} restEndPoint The REST endpoint to use.
 * @param {string} method       The REST method to use. Defaults to 'post'.
 * @return {Promise} The REST request promise.
 */
export default function SendCommand( nonce, data, restEndPoint, method = 'post' ) {
	if ( 'undefined' === typeof data ) {
		data = {};
	}

	const options = {
		method,
		url: restEndPoint,
		params: data,
		headers: {
			'X-WP-Nonce': nonce,
		},
		data,
	};

	return axios( options );
}
