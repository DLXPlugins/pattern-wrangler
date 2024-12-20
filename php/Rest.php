<?php
/**
 * REST class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class Rest
 */
class Rest {

	/**
	 * Register Rest actions.
	 */
	public function run() {
		// Rest API.
		add_action( 'rest_api_init', array( $this, 'rest_api_register' ) );
	}

	/**
	 * Gets permissions for the get users rest api endpoint.
	 *
	 * @return bool true if the user has permission, false if not
	 **/
	public function rest_get_users_permissions_callback() {
		return current_user_can( 'manage_nework' );
	}

	/**
	 * Registers REST API endpoints
	 */
	public function rest_api_register() {

		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/search/sites',
			array(
				'methods'             => 'POST',
				'permission_callback' => array( $this, 'rest_get_users_permissions_callback' ),
				'callback'            => array( $this, 'rest_get_sites' ),
				'sanitize_callback'   => array( $this, 'rest_api_sanitize' ),
				'validate_callback'   => array( $this, 'rest_api_validate' ),
			)
		);
	}

	/**
	 * Returns the available sites in the network.
	 *
	 * @param WP_REST_Request $request The REST Request data.
	 **/
	public function rest_get_sites( $request ) {
		$search      = sanitize_text_field( urldecode( $request->get_param( 'search' ) ) );
		$search_args = array(
			'number'  => 20,
			'offset'  => 0,
			'orderby' => 'domain',
			'order'   => 'ASC',
			'search'  => $search,
		);
		$sites       = get_sites( $search_args ); // Can return an array of sites or an empty array.

		$return = array();
		if ( is_array( $sites ) ) {
			foreach ( $sites as $site ) {
				$return[] = array(
					'id'          => $site->blog_id,
					'name'        => $site->blogname,
					'permalink'   => get_admin_url( $site->blog_id ),
					'patternsUrl' => get_admin_url( $site->blog_id, 'edit.php?post_type=wp_block' ),
				);
			}
		}

		wp_send_json_success( $return );
	}

	/**
	 * Get the REST endpoint.
	 *
	 * @param string $endpoint The endpoint to get.
	 * @return string The REST endpoint.
	 */
	public static function get_rest_endpoint( $endpoint ) {
		return rest_url( sprintf( 'dlxplugins/pattern-wrangler/v1/%s', $endpoint ) );
	}

	/**
	 * Makes sure the search string is valid
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return bool Whether to the parameter is numeric or not.
	 **/
	public function rest_api_validate( $request ) {
		$search = $request->get_param( 'search' );
		$search = sanitize_text_field( urldecode( $search ) );
		if ( is_string( $search ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Sanitizes search string
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return string Sanitized search string.
	 **/
	public function rest_api_sanitize( $request ) {
		$search = $request->get_param( 'search' );
		return sanitize_text_field( urldecode( $search ) );
	}
}
