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

		// todo - for multisite site pattern library.
		// register_rest_route(
		// 'dlxplugins/pattern-wrangler/v1',
		// '/search/sites',
		// array(
		// 'methods'             => 'POST',
		// 'permission_callback' => array( $this, 'rest_get_users_permissions_callback' ),
		// 'callback'            => array( $this, 'rest_get_sites' ),
		// 'sanitize_callback'   => array( $this, 'rest_api_sanitize' ),
		// 'validate_callback'   => array( $this, 'rest_api_validate' ),
		// )
		// );

		/**
		 * For retrieving site patterns for a site.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/all',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'rest_get_all_patterns' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},

				),
			)
		);

		/**
		 * For creating a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_create_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		/**
		 * For retrieving a pattern by ID.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/get/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_pattern' ),
				'args'                => array(
					'id' => array(
						'type'     => 'integer',
						'required' => true,
					),
				),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		/**
		 * For updating a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_update_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For deleting a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_delete_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For pausing a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/pause',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_pause_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For publishing a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/publish',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_publish_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);
	}

	/**
	 * Get a pattern by ID.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function rest_get_pattern( $request ) {
		// Check nonce and permissions.
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to delete patterns.' ) );
		}

		$pattern_id = $request->get_param( 'id' );

		$pattern = get_post( $pattern_id );

		// Process local patterns.
		$preview_image  = $this->get_pattern_preview( $pattern->post_title, $pattern->post_name, $pattern->ID );
		$return_pattern = array(
			'id'            => $pattern->ID,
			'title'         => $pattern->post_title,
			'slug'          => $pattern->post_name,
			'content'       => $pattern->post_content,
			'categories'    => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
			'categorySlugs' => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
			'isDisabled'    => 'draft' === $pattern->post_status,
			'isLocal'       => true,
			'syncStatus'    => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
			'preview'       => $preview_image,
			// Unsynced patterns are explicitly set in post meta, whereas synced are not and assumed synced.
			'patternType'   => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
			'editNonce'     => wp_create_nonce( 'dlx-pw-patterns-view-edit-pattern-' . $pattern->ID ),
		);

		return rest_ensure_response( $return_pattern );
	}

	/**
	 * Delete a pattern.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function rest_delete_pattern( $request ) {
		// Check nonce and permissions.
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to delete patterns.' ) );
		}

		$items = $request->get_param( 'items' );

		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			// Delete the pattern.
			wp_delete_post( $pattern_id, true );
		}

		return rest_ensure_response( array( 'success' => true ) );
	}

	/**
	 * Pause a pattern.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function rest_pause_pattern( $request ) {
		// Check nonce and permissions.
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to pause patterns.' ) );
		}

		$items = $request->get_param( 'items' );

		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			if ( is_numeric( $pattern_id ) && 0 !== $pattern_id ) {
				wp_update_post(
					array(
						'ID'          => $pattern_id,
						'post_status' => 'draft',
					)
				);
			} else {
				$disabled_patterns   = Options::get_disabled_patterns();
				$disabled_patterns[] = sanitize_text_field( $pattern_id );
				$disabled_patterns   = array_unique( $disabled_patterns );
				Options::set_disabled_patterns( $disabled_patterns );
			}
		}

		return rest_ensure_response( array( 'success' => true ) );
	}

	/**
	 * Publish a pattern.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function rest_publish_pattern( $request ) {
		// Check nonce and permissions.
		if ( ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to publish patterns.' ) );
		}

		$items = $request->get_param( 'items' );

		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			if ( is_numeric( $pattern_id ) && 0 !== $pattern_id ) {
				wp_update_post(
					array(
						'ID'          => $pattern_id,
						'post_status' => 'publish',
					)
				);
			} else {
				// Not numeric, so a slug, so let's remove it from the disabled patterns.
				$disabled_patterns = Options::get_disabled_patterns();
				$disabled_patterns = array_diff( $disabled_patterns, array( sanitize_text_field( $pattern_id ) ) );
				Options::set_disabled_patterns( array_values( $disabled_patterns ) );
			}
		}

		return rest_ensure_response( array( 'success' => true ) );
	}

	/**
	 * Create a pattern.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function rest_create_pattern( $request ) {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-create-pattern' ) || ! current_user_can( 'manage_options' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to create patterns.' ) );
		}

		$pattern_title       = sanitize_text_field( $request->get_param( 'patternTitle' ) );
		$pattern_categories  = Functions::sanitize_array_recursive( $request->get_param( 'patternCategories' ) ); // Cats are in format, [name, id].
		$pattern_sync_status = sanitize_text_field( $request->get_param( 'patternSyncStatus' ) );
		$pattern_copy_id     = sanitize_text_field( $request->get_param( 'patternCopyId' ) ); // 0 if not copying.

		// Get categories into right format.
		$categories = array();

		$maybe_pattern_content = Functions::get_pattern_by_id( $pattern_copy_id );
		$content               = '';
		if ( null !== $maybe_pattern_content ) {
			$content = $maybe_pattern_content;
		}

		// Create the pattern.
		$pattern_id = wp_insert_post(
			array(
				'post_title'   => $pattern_title,
				'post_content' => $content,
				'post_status'  => 'publish',
				'post_type'    => 'wp_block',
			)
		);

		// If unsynced, set the sync status.
		if ( 'unsynced' === $pattern_sync_status ) {
			update_post_meta( $pattern_id, 'wp_pattern_sync_status', 'unsynced' );
		}

		// Set categories.
		$terms_to_add = array();
		foreach ( $pattern_categories as $category ) {
			if ( is_numeric( $category['id'] ) && 0 !== $category['id'] ) {
				$terms_to_add[] = absint( $category['id'] );
			} else {
				$terms_to_add[] = sanitize_text_field( $category['name'] );
			}
		}

		// Add terms.
		$terms_affected_ids = wp_set_post_terms( $pattern_id, $terms_to_add, 'wp_pattern_category' );

		/**
		 * Action: dlx_pw_pattern_created
		 *
		 * @param int $pattern_id The pattern ID.
		 * @param array $terms_affected_ids The terms affected IDs.
		 */
		do_action( 'dlx_pw_pattern_created', $pattern_id, $terms_affected_ids );

		// Return the pattern ID.
		return rest_ensure_response( array( 'patternId' => $pattern_id ) );
	}

	/**
	 * Create a pattern.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response The REST response.
	 */
	public function rest_update_pattern( $request ) {
		// Check nonce and permissions.
		$nonce      = sanitize_text_field( $request->get_param( 'patternNonce' ) );
		$pattern_id = absint( $request->get_param( 'patternId' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to edit patterns.' ) );
		}

		$pattern_title      = sanitize_text_field( $request->get_param( 'patternTitle' ) );
		$pattern_categories = Functions::sanitize_array_recursive( $request->get_param( 'patternCategories' ) ); // Cats are in format, [name, id].

		// Update the pattern.
		$pattern_id = wp_update_post(
			array(
				'ID'         => $pattern_id,
				'post_title' => $pattern_title,
			)
		);

		// Clear post terms.
		wp_delete_object_term_relationships( $pattern_id, 'wp_pattern_category' );

		$terms_affected = array();

		// Set categories.
		$terms_to_add = array();
		foreach ( $pattern_categories as $category ) {
			if ( is_numeric( $category['id'] ) && 0 !== $category['id'] ) {
				$terms_to_add[] = absint( $category['id'] );
			} else {
				$terms_to_add[] = sanitize_text_field( $category['name'] );
			}
		}

		// Add terms.
		$terms_affected_ids = wp_set_post_terms( $pattern_id, $terms_to_add, 'wp_pattern_category' );

		// Get terms from IDs.
		foreach ( $terms_affected_ids as $term_id ) {
			$category_term = get_term( $term_id, 'wp_pattern_category' );
			if ( $category_term ) {
				$terms_affected_slugs[]                                   = sanitize_text_field( $category_term->name );
				$terms_affected[ sanitize_title( $category_term->slug ) ] = array(
					'label'       => sanitize_text_field( $category_term->name ),
					'customLabel' => sanitize_text_field( $category_term->name ),
					'slug'        => sanitize_title( $category_term->slug ),
					'enabled'     => true,
					'count'       => absint( $category_term->count ),
					'mappedTo'    => false,
					'registered'  => false,
					'id'          => absint( $category_term->term_id ),
				);
			}
		}

		/**
		 * Action: dlx_pw_pattern_updated
		 *
		 * @param int   $pattern_id The pattern ID.
		 * @param array $terms_affected The terms affected.
		 */
		do_action( 'dlx_pw_pattern_updated', $pattern_id, $terms_affected );

		// Return the pattern ID.
		return rest_ensure_response(
			array(
				'patternId'     => $pattern_id,
				'patternTitle'  => sanitize_text_field( $pattern_title ),
				'categories'    => $terms_affected,
				'categorySlugs' => array_values( $terms_affected ),
			)
		);
	}

	/**
	 * Get all patterns with previews.
	 */
	public function rest_get_all_patterns() {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_UNSAFE_RAW ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-get-patterns' ) || ! current_user_can( 'manage_options' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to view patterns.' ) );
		}

		// Check transient first.
		$patterns       = get_transient( 'dlx_all_patterns_cache' );
		$all_categories = get_transient( 'dlx_all_categories_cache' );
		if ( false !== $patterns && false !== $all_categories && false ) {
			return rest_ensure_response(
				array(
					'patterns'   => $patterns,
					'categories' => $all_categories,
				)
			);
		}

		// Run the pattern class filters.
		Patterns::get_instance()->maybe_deregister_pattern_categories();
		Patterns::get_instance()->maybe_deregister_theme_patterns();
		Patterns::get_instance()->maybe_deregister_plugin_patterns();
		Patterns::get_instance()->maybe_deregister_uncategorized_patterns();
		Patterns::get_instance()->maybe_deregister_all_patterns();

		// Get registered patterns.
		$registered_patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		// Get local/DB patterns.
		$post_args      = array(
			'post_type'      => 'wp_block',
			'posts_per_page' => 500, /* if there are more than 500 patterns, we need to paginate */
			'post_status'    => array( 'publish', 'draft' ),
		);
		$post_args      = Patterns::get_instance()->modify_blocks_rest_query( $post_args, null );
		$local_patterns = get_posts( $post_args );

		// Get registered and local categories.
		$categories = Functions::get_pattern_categories();

		// Merge the registered and local categories.
		$registered_categories = $categories['registered'];
		$local_categories      = $categories['categories'];

		// Get registered categories into shape. Registerd are label arrays.
		$registered_categories_arr = array();
		foreach ( $registered_categories as $registered_category ) {
			$registered_categories_arr[ sanitize_title( $registered_category['slug'] ) ] = array(
				'label'       => $registered_category['label'],
				'customLabel' => $registered_category['label'],
				'slug'        => $registered_category['slug'],
				'enabled'     => true,
				'count'       => 0,
				'mappedTo'    => false,
				'registered'  => true,
				'id'          => 0,
			);
		}

		// Get local categories into shape. Terms are objects.
		$local_categories_arr = array();
		foreach ( $local_categories as $local_category ) {
			$local_categories_arr[ sanitize_title( $local_category->slug ) ] = array(
				'label'       => $local_category->name,
				'customLabel' => $local_category->name,
				'slug'        => $local_category->slug,
				'enabled'     => true,
				'count'       => $local_category->count,
				'mappedTo'    => false,
				'registered'  => false,
				'id'          => $local_category->term_id,
			);
		}

		// Merge the registered and local categories.
		$all_categories = array_merge( $registered_categories_arr, $local_categories_arr ); // We don't care about duplicates here.

		set_transient( 'dlx_all_categories_cache', $all_categories, HOUR_IN_SECONDS );

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
			// If pattern is remote, ignore it.
			if ( false === $pattern['inserter'] ) {
				continue;
			}

			// Map categories to their names.
			$categories     = array();
			$category_slugs = array();
			foreach ( $pattern['categories'] as $category ) {
				$category_registry = \WP_Block_Pattern_Categories_Registry::get_instance();
				$category          = $category_registry->get_registered( $category );
				if ( $category ) {
					$categories[]     = $category['label'];
					$category_slugs[] = sanitize_title( $category['name'] );
				}
			}

			$preview_image                = $this->get_pattern_preview( $pattern['name'], $pattern['name'] );
			$patterns[ $pattern['name'] ] = array(
				'id'            => Functions::get_sanitized_pattern_id( $pattern['name'] ),
				'title'         => $pattern['title'],
				'slug'          => $pattern['name'],
				'content'       => $pattern['content'],
				'categories'    => $categories,
				'categorySlugs' => $category_slugs,
				'isDisabled'    => in_array( $pattern['name'], Options::get_disabled_patterns(), true ),
				'isLocal'       => false,
				'syncStatus'    => 'registered',
				'preview'       => $preview_image,
				'viewportWidth' => isset( $pattern['viewportWidth'] ) ? $pattern['viewportWidth'] : $default_viewport_width,
				'patternType'   => 'registered',
				'editNonce'     => wp_create_nonce( 'dlx-pw-patterns-view-edit-pattern-' . Functions::get_sanitized_pattern_id( $pattern['name'] ) ),
				'siteId'        => get_current_blog_id(),
			);
		}

		// Process local patterns.
		foreach ( $local_patterns as $pattern ) {
			$preview_image                   = $this->get_pattern_preview( $pattern->post_title, $pattern->post_name, $pattern->ID );
			$patterns[ $pattern->post_name ] = array(
				'id'            => $pattern->ID,
				'title'         => $pattern->post_title,
				'slug'          => $pattern->post_name,
				'content'       => $pattern->post_content,
				'categories'    => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
				'categorySlugs' => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
				'isDisabled'    => 'draft' === $pattern->post_status,
				'isLocal'       => true,
				'syncStatus'    => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
				'preview'       => $preview_image,
				// Unsynced patterns are explicitly set in post meta, whereas synced are not and assumed synced.
				'patternType'   => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
				'editNonce'     => wp_create_nonce( 'dlx-pw-patterns-view-edit-pattern-' . $pattern->ID ),
				'siteId'        => get_current_blog_id(),
			);
		}

		// Sort patterns by title ascending.
		usort(
			$patterns,
			function ( $a, $b ) {
				return strcmp( $a['title'], $b['title'] );
			}
		);

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
		return Functions::get_rest_url( sprintf( 'dlxplugins/pattern-wrangler/v1/%s', $endpoint ) );
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
}
