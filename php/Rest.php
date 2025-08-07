<?php

/**
 * REST class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

use WP_Block_Type_Registry;

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

		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/all',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'rest_get_all_patterns' ),
					'permission_callback' => function () {
						return true; // current_user_can( 'edit_posts' );
					},

				),
			)
		);

		// Register route for generating a pattern preview image.
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/get_preview',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_get_pattern_preview' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback'   => array( $this, 'rest_preview_image_sanitize' ),
				'validate_callback'   => array( $this, 'rest_preview_image_validate' ),
			)
		);
	}

	/**
	 * Get all patterns with previews.
	 */
	public function rest_get_all_patterns() {
		// Check transient first.
		$patterns = false; // get_transient( 'dlx_all_patterns_cache' );
		if ( false !== $patterns ) {
			return rest_ensure_response( $patterns );
		}
		// Get registered patterns.
		$registered_patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		// Get local/DB patterns.
		$local_patterns = get_posts(
			array(
				'post_type'      => 'wp_block',
				'posts_per_page' => 500, /* if there are more than 500 patterns, we need to paginate */
				'post_status'    => 'publish',
			)
		);

		// Get registered and local categories.
		$categories = Functions::get_pattern_categories();

		// Merge the registered and local categories.
		$registered_categories = $categories['registered'];
		$local_categories      = $categories['categories'];

		// Get registered categories into shape. Registerd are label arrays.
		$registered_categories_arr = array();
		foreach ( $registered_categories as $registered_category ) {
			$registered_categories_arr[ $registered_category['label'] ] = array(
				'label'       => $registered_category['label'],
				'customLabel' => $registered_category['label'],
				'slug'        => $registered_category['slug'],
				'enabled'     => true,
				'count'       => 0,
				'mappedTo'    => false,
			);
		}

		// Get local categories into shape. Terms are objects.
		$local_categories_arr = array();
		foreach ( $local_categories as $local_category ) {
			$local_categories_arr[ $local_category->name ] = array(
				'label'       => $local_category->name,
				'customLabel' => $local_category->name,
				'slug'        => $local_category->slug,
				'enabled'     => true,
				'count'       => $local_category->count,
				'mappedTo'    => false,
			);
		}

		// Merge the registered and local categories.
		$all_categories = array_unique( array_merge( $registered_categories_arr, $local_categories_arr ), SORT_REGULAR );

		// Placeholder for patterns.
		$patterns = array();

		/**
		 * Filter the default viewport width for pattern previews.
		 *
		 * @param int $default_viewport_width The default viewport width.
		 */
		$default_viewport_width = apply_filters( 'dlxpw_pattern_preview_viewport_width', 1200 );

		// Process registered patterns.
		foreach ( $registered_patterns as $pattern ) {
			$preview_image                 = $this->get_pattern_preview( $pattern['name'], $pattern['name'] );
			$patterns[ $pattern['title'] ] = array(
				'id'            => Functions::get_sanitized_pattern_id( $pattern['name'] ),
				'title'         => $pattern['title'],
				'slug'          => $pattern['name'],
				'content'       => $pattern['content'],
				'categories'    => $pattern['categories'] ?? array(),
				'isLocal'       => false,
				'preview'       => $preview_image,
				'viewportWidth' => isset( $pattern['viewportWidth'] ) ? $pattern['viewportWidth'] : $default_viewport_width,
				'patternType'   => 'registered',
			);
		}

		// Process local patterns.
		foreach ( $local_patterns as $pattern ) {
			$preview_image                    = $this->get_pattern_preview( $pattern->post_title, $pattern->post_name, $pattern->ID );
			$patterns[ $pattern->post_title ] = array(
				'id'          => $pattern->ID,
				'title'       => $pattern->post_title,
				'slug'        => $pattern->post_name,
				'content'     => $pattern->post_content,
				'categories'  => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
				'isLocal'     => true,
				'preview'     => $preview_image,
				'patternType' => 'synced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'synced' : 'unsynced',
			);
		}

		// Sort patterns by title.
		ksort( $patterns );

		// Reindex array.
		$patterns = array_values( $patterns );

		// Cache for 1 hour.
		set_transient( 'dlx_all_patterns_cache', $patterns, HOUR_IN_SECONDS );

		return rest_ensure_response(
			array(
				'patterns'   => $patterns,
				'categories' => $all_categories,
			)
		);
	}

	/**
	 * Get the pattern preview image for a pattern.
	 *
	 * @param string $title The pattern title.
	 * @param string $slug The pattern slug.
	 * @param int    $pattern_id The pattern ID.
	 * @return string The pattern preview image URL. Empty string if no preview image is found.
	 */
	private function get_pattern_preview( $title, $slug, $pattern_id = 0 ) {
		$upload_dir  = wp_upload_dir();
		$preview_dir = $upload_dir['basedir'] . '/pw-pattern-previews';

		// Create directory if it doesn't exist.
		if ( ! file_exists( $preview_dir ) ) {
			return '';
		}

		$filename     = sanitize_file_name( $slug . '-' . md5( sanitize_text_field( $title ) . sanitize_title( $slug ) . $pattern_id ) . '.png' );
		$preview_path = $preview_dir . '/' . $filename;
		$preview_url  = $upload_dir['baseurl'] . '/pw-pattern-previews/' . $filename;

		// Return existing preview if it exists.
		if ( file_exists( $preview_path ) ) {
			return $preview_url;
		}

		return '';
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

	/**
	 * Sanitizes the pattern preview image.
	 *
	 * @param WP_REST_Request $request The REST request.
	 * @return array Sanitized pattern preview image.
	 */
	public function rest_preview_image_sanitize( $request ) {
		return array(
			'content' => $request->get_param( 'content' ),
			'slug'    => sanitize_title( $request->get_param( 'slug' ) ),
			'title'   => sanitize_text_field( $request->get_param( 'title' ) ),
			'id'      => sanitize_text_field( $request->get_param( 'id' ) ),
		);
	}

	/**
	 * Validates the pattern preview image.
	 *
	 * @param WP_REST_Request $request The REST request.
	 * @return bool Whether the pattern preview image is valid.
	 */
	public function rest_preview_image_validate( $request ) {
		// Ensure responses for content, slug, title, and id are present.
		$content = $request->get_param( 'content' );
		$slug    = $request->get_param( 'slug' );
		$title   = $request->get_param( 'title' );
		$id      = $request->get_param( 'id' );
		if ( ! $content || ! $slug || ! $title || ! $id ) {
			return false;
		}
		return true;
	}

	/**
	 * Get the HTML head content for preview rendering.
	 *
	 * @return string The HTML head content.
	 */
	private function get_preview_head_html() {
		// Get theme styles.
		$styles       = '';
		$block_styles = wp_get_global_stylesheet();
		if ( $block_styles ) {
			$styles .= '<style>' . $block_styles . '</style>';
		}

		// Add theme stylesheet.
		$styles .= '<link rel="stylesheet" href="' . get_stylesheet_uri() . '">';

		// Add admin styles for proper block rendering.
		$styles .= '<link rel="stylesheet" href="' . includes_url( 'css/dist/block-library/style.min.css' ) . '">';
		$styles .= '<link rel="stylesheet" href="' . includes_url( 'css/dist/block-library/theme.min.css' ) . '">';

		return sprintf(
			'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">%s',
			$styles
		);
	}
}
