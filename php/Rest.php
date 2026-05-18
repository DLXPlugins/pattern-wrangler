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
						return current_user_can( 'edit_others_posts' );
					},

				),
			)
		);

		/**
		 * For retrieving site patterns for a site.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/network',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'rest_get_network_patterns' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_others_posts' );
					},
					'args'                => array(
						'source_site_id' => array(
							'type'              => 'integer',
							'required'          => true,
							'sanitize_callback' => 'absint',
						),
					),
				),
			)
		);

		/**
		 * For retrieving sites in the network.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/search/sites',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'rest_get_sites' ),
					'permission_callback' => function () {
						return current_user_can( 'manage_network' );
					},
					'args'                => array(
						'search' => array(
							'type'              => 'string',
							'validate_callback' => function ( $param, $request, $key ) {
								return is_string( $param );
							},
							'sanitize_callback' => function ( $param ) {
								return sanitize_text_field( $param );
							},
							'required'          => false,
						),
					),
				),

			)
		);

		/**
		 * For retrieving site pattern categories for a site.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/all',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'rest_get_all_categories' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_others_posts' );
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
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For duplicating a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/duplicate',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_duplicate_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For updating a pattern category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_update_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For creating a pattern category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_create_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For pausing/disabling a registeredpattern category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/edit-registered',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_edit_registered_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For deleting a pattern category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_delete_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For pausing/disabling a registeredpattern category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/disable',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_disable_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For re-enabling a registered pattern category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/enable',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_enable_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For mapping disabled registered pattern categories to a local category.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/categories/map',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_map_category' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
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
					return current_user_can( 'delete_others_posts' );
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
					return current_user_can( 'publish_posts' );
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
					return current_user_can( 'publish_posts' );
				},
			)
		);

		/**
		 * For assigning a category to a pattern.
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/patterns/tag',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_tag_pattern' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_others_posts' );
				},
			)
		);

		/**
		 * For retrieving a pattern by ID. Useful when importing patterns via json.
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
					return current_user_can( 'publish_posts' );
				},
			)
		);

		/**
		 * Pattern version checkpoints (pw_versions).
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/versions',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'rest_get_pattern_versions' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_others_posts' );
					},
					'args'                => array(
						'parent' => array(
							'type'              => 'integer',
							'required'          => true,
							'sanitize_callback' => 'absint',
						),
					),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'rest_create_pattern_version' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_others_posts' );
					},
				),
				array(
					'methods'             => 'DELETE',
					'callback'            => array( $this, 'rest_delete_pattern_version' ),
					'args'                => array(
						'id' => array(
							'type'     => 'integer',
							'required' => true,
						),
					),
					'permission_callback' => function () {
						return current_user_can( 'delete_others_posts' );
					},
				),
			)
		);
		/**
		 * Restore a pattern version checkpoint (pw_versions).
		 */
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/versions/restore',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'rest_restore_pattern_version' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_others_posts' );
					},
					'args'                => array(
						'id' => array(
							'type'     => 'integer',
							'required' => true,
						),
					),
				),
			)
		);
	}

	/**
	 * Delete a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_delete_pattern( $request ) {

		$items             = $request->get_param( 'items' );
		$do_not_show_again = filter_var( $request->get_param( 'doNotShowAgain' ), FILTER_VALIDATE_BOOLEAN );

		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			if ( ! current_user_can( 'delete_post', $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'User does not have permission to delete pattern ' . $pattern_id ) );
			}

			// Delete the pattern.
			wp_delete_post( $pattern_id, true );
		}

		if ( $do_not_show_again ) {
			if ( current_user_can( 'publish_posts' ) ) {
				update_user_meta( get_current_user_id(), 'dlx_pw_do_not_show_again', true );
			}
		}

		return rest_ensure_response( array( 'success' => true ) );
	}

	/**
	 * Delete a category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_delete_category( $request ) {

		$items             = $request->get_param( 'items' );
		$do_not_show_again = filter_var( $request->get_param( 'doNotShowAgain' ), FILTER_VALIDATE_BOOLEAN );

		$term_ids_deleted = array();
		foreach ( $items as $item ) {
			$category_id = absint( $item['id'] );
			$nonce       = sanitize_text_field( $item['nonce'] );

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-edit-category-' . $category_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for category ' . $category_id ) );
			}

			if ( ! current_user_can( 'delete_term', $category_id ) ) {
				return rest_ensure_response( array( 'error' => 'User does not have permission to delete category ' . $category_id ) );
			}

			// Delete the category.
			wp_delete_term( $category_id, 'wp_pattern_category' );
			$term_ids_deleted[] = $category_id;
		}

		if ( $do_not_show_again ) {
			if ( current_user_can( 'publish_posts' ) ) {
				update_user_meta( get_current_user_id(), 'dlx_pw_do_not_show_again', true );
			}
		}

		// Get fresh categories.
		$categories = $this->get_all_categories();
		return rest_ensure_response(
			array(
				'success'        => true,
				'categories'     => $categories['all'],
				'termIdsDeleted' => $term_ids_deleted,
			)
		);
	}

	/**
	 * Disable a registered category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_disable_category( $request ) {

		$items           = $request->get_param( 'items' );
		$mapping_enabled = filter_var( $request->get_param( 'mappingEnabled' ), FILTER_VALIDATE_BOOLEAN );
		$mapped_to       = absint( $request->get_param( 'mappedTo' ) );

		$options           = Options::get_options();
		$option_categories = $options['categories'] ?? array();
		$categories        = $this->get_all_categories();

		$registered_categories_disabled = array();
		foreach ( $items as $item ) {
			$category_slug = sanitize_text_field( $item['slug'] );
			$nonce         = sanitize_text_field( $item['nonce'] );

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-edit-category-' . $category_slug ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for category ' . $category_slug ) );
			}

			if ( ! current_user_can( 'edit_others_posts' ) ) {
				return rest_ensure_response( array( 'error' => 'User does not have permission to disable category ' . $category_slug ) );
			}
			$mapped_to_slug = false;
			if ( $mapping_enabled ) {
				$mapped_to_term = get_term( $mapped_to, 'wp_pattern_category' );
				if ( ! $mapped_to_term ) {
					return rest_ensure_response( array( 'error' => 'Mapped to term not found ' . $mapped_to ) );
				}
				$mapped_to_slug = sanitize_title( $mapped_to_term->slug );
			}

			// Find the category in the categories array.
			$registered_category = $categories['registered'][ $category_slug ] ?? null;
			if ( ! $registered_category ) {
				continue;
			}

			// Failsafe.
			$category = $option_categories[ $category_slug ] ?? null;
			if ( ! $category ) {
				$category = array(
					'slug'        => $category_slug,
					'label'       => $registered_category['label'],
					'customLabel' => $registered_category['customLabel'] ?? $registered_category['label'],
					'enabled'     => false,
					'count'       => $registered_category['count'],
					'mappedTo'    => $mapped_to_slug,
				);
			} else {
				$category['enabled']  = false;
				$category['mappedTo'] = $mapped_to_slug;
			}

			$option_categories[ $category_slug ] = $category;
		}

		$options['categories'] = Functions::sanitize_array_recursive( $option_categories );
		Options::update_options( $options );

		// Forcefully retrieve new categories.
		$categories = $this->get_all_categories();
		return rest_ensure_response(
			array(
				'success'    => true,
				'categories' => $categories['all'],
			)
		);
	}

	/**
	 * Re-enable a registered category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_enable_category( $request ) {

		$items = $request->get_param( 'items' );

		$options           = Options::get_options();
		$option_categories = $options['categories'] ?? array();
		$categories        = $this->get_all_categories();

		foreach ( $items as $item ) {
			$category_slug = sanitize_text_field( $item['slug'] );
			$nonce         = sanitize_text_field( $item['editNonce'] );

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-edit-category-' . $category_slug ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for category ' . $category_slug ) );
			}

			if ( ! current_user_can( 'edit_others_posts' ) ) {
				return rest_ensure_response( array( 'error' => 'User does not have permission to disable category ' . $category_slug ) );
			}

			// Find the category in the categories array.
			$registered_category = $categories['registered'][ $category_slug ] ?? null;
			if ( ! $registered_category ) {
				continue;
			}

			// Failsafe.
			$category = $option_categories[ $category_slug ] ?? null;
			if ( ! $category ) {
				$category = array(
					'slug'        => $category_slug,
					'label'       => $registered_category['label'],
					'customLabel' => $registered_category['customLabel'] ?? $registered_category['label'],
					'enabled'     => true,
					'count'       => $registered_category['count'],
					'mappedTo'    => false,
				);
			} else {
				$category['enabled']  = true;
				$category['mappedTo'] = false;
			}

			$option_categories[ $category_slug ] = $category;
		}

		$options['categories'] = Functions::sanitize_array_recursive( $option_categories );
		Options::update_options( $options );

		// Forcefully retrieve new categories.
		$categories = $this->get_all_categories();
		return rest_ensure_response(
			array(
				'success'    => true,
				'categories' => $categories['all'],
			)
		);
	}

	/**
	 * Re-enable a registered category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_map_category( $request ) {

		$items           = $request->get_param( 'items' );
		$mapping_enabled = filter_var( $request->get_param( 'mappingEnabled' ), FILTER_VALIDATE_BOOLEAN );
		$mapped_to       = absint( $request->get_param( 'mappedTo' ) );

		$options           = Options::get_options();
		$option_categories = $options['categories'] ?? array();
		$categories        = $this->get_all_categories();

		foreach ( $items as $item ) {
			$category_slug = sanitize_text_field( $item['slug'] );
			$nonce         = sanitize_text_field( $item['nonce'] );

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-edit-category-' . $category_slug ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for category ' . $category_slug ) );
			}

			if ( ! current_user_can( 'edit_others_posts' ) ) {
				return rest_ensure_response( array( 'error' => 'User does not have permission to disable category ' . $category_slug ) );
			}
			$mapped_to_slug = false;
			if ( $mapping_enabled ) {
				$mapped_to_term = get_term( $mapped_to, 'wp_pattern_category' );
				if ( ! $mapped_to_term ) {
					return rest_ensure_response( array( 'error' => 'Mapped to term not found ' . $mapped_to ) );
				}
				$mapped_to_slug = sanitize_title( $mapped_to_term->slug );
			}

			// Find the category in the categories array.
			$registered_category = $categories['registered'][ $category_slug ] ?? null;
			if ( ! $registered_category ) {
				continue;
			}

			// Failsafe.
			$category = $option_categories[ $category_slug ] ?? null;
			if ( ! $category ) {
				$category = array(
					'slug'        => $category_slug,
					'label'       => $registered_category['label'],
					'customLabel' => $registered_category['customLabel'] ?? $registered_category['label'],
					'enabled'     => false,
					'count'       => $registered_category['count'],
					'mappedTo'    => $mapping_enabled ? $mapped_to_slug : false,
				);
			} else {
				$category['enabled']  = false;
				$category['mappedTo'] = $mapping_enabled ? $mapped_to_slug : false;
			}

			$option_categories[ $category_slug ] = $category;
		}

		$options['categories'] = Functions::sanitize_array_recursive( $option_categories );
		Options::update_options( $options );

		// Forcefully retrieve new categories.
		$categories = $this->get_all_categories();
		return rest_ensure_response(
			array(
				'success'    => true,
				'categories' => $categories['all'],
			)
		);
	}

	/**
	 * Pause a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_pause_pattern( $request ) {

		$items             = $request->get_param( 'items' );
		$do_not_show_again = filter_var( $request->get_param( 'doNotShowAgain' ), FILTER_VALIDATE_BOOLEAN );

		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			if ( is_numeric( $pattern_id ) && 0 !== $pattern_id ) {
				if ( ! current_user_can( 'edit_post', $pattern_id ) ) {
					return rest_ensure_response( array( 'error' => 'User does not have permission to publish pattern ' . $pattern_id ) );
				}
				wp_update_post(
					array(
						'ID'          => $pattern_id,
						'post_status' => 'draft',
					)
				);
			} else {
				if ( ! current_user_can( 'edit_others_posts' ) ) {
					return rest_ensure_response( array( 'error' => 'User does not have permission to disable pattern ' . $pattern_id ) );
				}
				$disabled_patterns   = Options::get_disabled_patterns();
				$disabled_patterns[] = sanitize_text_field( $pattern_id );
				$disabled_patterns   = array_unique( $disabled_patterns );
				Options::set_disabled_patterns( $disabled_patterns );
			}
		}
		if ( $do_not_show_again ) {
			if ( current_user_can( 'publish_posts' ) ) {
				update_user_meta( get_current_user_id(), 'dlx_pw_do_not_show_again', true );
			}
		}

		return rest_ensure_response( array( 'success' => true ) );
	}

	/**
	 * Publish a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_publish_pattern( $request ) {

		$items             = $request->get_param( 'items' );
		$do_not_show_again = filter_var( $request->get_param( 'doNotShowAgain' ), FILTER_VALIDATE_BOOLEAN );

		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			if ( is_numeric( $pattern_id ) && 0 !== $pattern_id ) {
				if ( ! current_user_can( 'edit_post', $pattern_id ) ) {
					return rest_ensure_response( array( 'error' => 'User does not have permission to publish pattern ' . $pattern_id ) );
				}
				wp_update_post(
					array(
						'ID'          => $pattern_id,
						'post_status' => 'publish',
					)
				);
			} else {
				if ( ! current_user_can( 'edit_others_posts' ) ) {
					return rest_ensure_response( array( 'error' => 'User does not have permission to publish pattern ' . $pattern_id ) );
				}
				// Not numeric, so a slug, so let's remove it from the disabled patterns.
				$disabled_patterns = Options::get_disabled_patterns();
				$disabled_patterns = array_diff( $disabled_patterns, array( sanitize_text_field( $pattern_id ) ) );
				Options::set_disabled_patterns( array_values( $disabled_patterns ) );
			}
		}
		if ( $do_not_show_again ) {
			if ( current_user_can( 'publish_posts' ) ) {
				update_user_meta( get_current_user_id(), 'dlx_pw_do_not_show_again', true );
			}
		}

		return rest_ensure_response( array( 'success' => true ) );
	}

	/**
	 * Assign a category to a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_tag_pattern( $request ) {

		$items              = $request->get_param( 'items' );
		$pattern_categories = $request->get_param( 'patternCategories' );

		// Set categories.
		$terms_to_add = array();
		foreach ( $pattern_categories as $category ) {
			if ( is_numeric( $category['id'] ) && 0 !== $category['id'] ) {
				$terms_to_add[] = absint( $category['id'] );
			} else {
				$terms_to_add[] = sanitize_text_field( $category['name'] );
			}
		}

		$terms_affected = array();
		$items_affected = array();
		foreach ( $items as $item ) {
			$pattern_id = $item['id'];
			$nonce      = $item['nonce'];

			if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) ) {
				return rest_ensure_response( array( 'error' => 'Invalid nonce for pattern ' . $pattern_id ) );
			}

			if ( is_numeric( $pattern_id ) && 0 !== $pattern_id ) {
				if ( ! current_user_can( 'edit_post', $pattern_id ) ) {
					return rest_ensure_response( array( 'error' => 'User does not have permission to publish pattern ' . $pattern_id ) );
				}

				// Clear post terms.
				wp_delete_object_term_relationships( $pattern_id, 'wp_pattern_category' );

				$items_affected[] = array(
					'patternId'    => $pattern_id,
					'patternTitle' => sanitize_text_field( get_the_title( $pattern_id ) ),
				);

				// Add terms.
				$terms_affected_ids = wp_set_post_terms( $pattern_id, $terms_to_add, 'wp_pattern_category' );

				// Get terms from IDs.
				foreach ( $terms_affected_ids as $term_id ) {
					$category_term = get_term( $term_id, 'wp_pattern_category' );
					if ( $category_term ) {
						// Decode HTML entities to prevent double encoding in React.
						$category_name = wp_specialchars_decode( $category_term->name, ENT_QUOTES );
						$terms_affected[ sanitize_title( $category_term->slug ) ] = array(
							'label'       => sanitize_text_field( $category_name ),
							'customLabel' => sanitize_text_field( $category_name ),
							'slug'        => sanitize_title( $category_term->slug ),
							'enabled'     => true,
							'count'       => absint( $category_term->count ),
							'mappedTo'    => false,
							'registered'  => false,
							'id'          => absint( $category_term->term_id ),
						);
					}
				}
			}
		}

		// Return the new categories.
		return rest_ensure_response(
			array(
				'newCategories' => $terms_affected,
				'itemsAffected' => $items_affected,
			)
		);
	}

	/**
	 * Create a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_create_pattern( $request ) {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-create-pattern' ) || ! current_user_can( 'publish_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to create patterns.' ) );
		}

		$create_forbidden = Network::assert_can_create_local_patterns();
		if ( $create_forbidden ) {
			return rest_ensure_response( array( 'error' => $create_forbidden->get_error_message() ) );
		}

		$pattern_title              = sanitize_text_field( $request->get_param( 'patternTitle' ) );
		$pattern_categories         = Functions::sanitize_array_recursive( $request->get_param( 'patternCategories' ) ); // Cats are in format, [name, id].
		$pattern_sync_status        = sanitize_text_field( $request->get_param( 'patternSyncStatus' ) );
		$pattern_copy_id            = sanitize_text_field( $request->get_param( 'patternCopyId' ) ); // 0 if not copying.
		$disable_registered_pattern = filter_var( $request->get_param( 'disableRegisteredPattern' ), FILTER_VALIDATE_BOOLEAN );
		$pattern_content_override   = $request->get_param( 'patternContent' );

		// Get categories into right format.
		$categories = array();

		$content = '';
		if ( is_string( $pattern_content_override ) && '' !== trim( $pattern_content_override ) ) {
			$content = $pattern_content_override;
		} else {
			$maybe_pattern_content = Functions::get_pattern_by_id( $pattern_copy_id );
			if ( null !== $maybe_pattern_content ) {
				$content = $maybe_pattern_content;
			}
		}
		$content = Functions::resolve_pattern_markup_for_storage( $content );

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

		// If disable registered pattern, disable the pattern.
		if ( $disable_registered_pattern ) {
			$disabled_patterns   = Options::get_disabled_patterns();
			$disabled_patterns[] = sanitize_text_field( $pattern_copy_id );
			$disabled_patterns   = array_unique( $disabled_patterns );
			Options::set_disabled_patterns( $disabled_patterns );
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
	 * Duplicate a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_duplicate_pattern( $request ) {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-duplicate-pattern-' . absint( $request->get_param( 'patternId' ) ) ) || ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to duplicate patterns.' ) );
		}

		$create_forbidden = Network::assert_can_create_local_patterns();
		if ( $create_forbidden ) {
			return rest_ensure_response( array( 'error' => $create_forbidden->get_error_message() ) );
		}

		$pattern_title       = sanitize_text_field( $request->get_param( 'patternTitle' ) );
		$pattern_categories  = Functions::sanitize_array_recursive( $request->get_param( 'patternCategories' ) ); // Cats are in format, [name, id].
		$pattern_sync_status = sanitize_text_field( $request->get_param( 'patternSyncStatus' ) );
		$pattern_id          = absint( $request->get_param( 'patternId' ) );
		$pattern_site_id     = absint( $request->get_param( 'patternSiteId' ) );
		// Get the original pattern.
		$maybe_pattern_content = Functions::get_pattern_by_id( $pattern_id, $pattern_site_id );
		$content               = '';
		if ( null !== $maybe_pattern_content ) {
			$content = $maybe_pattern_content;
		}
		$content = Functions::resolve_pattern_markup_for_storage( $content );
		if ( empty( $content ) ) {
			return rest_ensure_response( array( 'error' => 'Failed to get pattern content or pattern content is empty.' ) );
		}

		// Get categories into right format.
		$categories = array();

		// Create the pattern.
		$pattern_id = wp_insert_post(
			array(
				'post_title'   => $pattern_title,
				'post_content' => wp_slash( $content ),
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
		 * Action: dlx_pw_pattern_duplicated
		 *
		 * @param int $pattern_id The pattern ID.
		 * @param array $terms_affected_ids The terms affected IDs.
		 */
		do_action( 'dlx_pw_pattern_duplicated', $pattern_id, $terms_affected_ids );

		// Return the pattern ID.
		return rest_ensure_response( array( 'patternId' => $pattern_id ) );
	}

	/**
	 * Create a pattern.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_update_pattern( $request ) {
		// Check nonce and permissions.
		$nonce      = sanitize_text_field( $request->get_param( 'patternNonce' ) );
		$pattern_id = absint( $request->get_param( 'patternId' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-edit-pattern-' . $pattern_id ) || ! current_user_can( 'edit_post', $pattern_id ) ) {
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
				// Decode HTML entities to prevent double encoding in React.
				$category_name          = wp_specialchars_decode( $category_term->name, ENT_QUOTES );
				$terms_affected_slugs[] = sanitize_text_field( $category_name );
				$terms_affected[ sanitize_title( $category_term->slug ) ] = array(
					'label'       => sanitize_text_field( $category_name ),
					'customLabel' => sanitize_text_field( $category_name ),
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
	 * Create a category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_create_category( $request ) {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-create-category' ) || ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to create patterns.' ) );
		}

		$create_forbidden = Network::assert_can_create_local_patterns();
		if ( $create_forbidden ) {
			return rest_ensure_response( array( 'error' => $create_forbidden->get_error_message() ) );
		}

		$term_title = sanitize_text_field( wp_strip_all_tags( $request->get_param( 'termTitle' ) ) );
		$term_slug  = sanitize_title( $request->get_param( 'termSlug' ) );

		// See if the term already exists.
		$maybe_term = get_term_by( 'slug', $term_slug, 'wp_pattern_category' );
		if ( $maybe_term ) {
			return rest_ensure_response( array( 'error' => 'Category already exists.' ) );
		}

		// Create the category.
		$maybe_term = wp_insert_term( $term_title, 'wp_pattern_category', array( 'slug' => $term_slug ) );

		if ( is_wp_error( $maybe_term ) ) {
			return rest_ensure_response( array( 'error' => 'Failed to create category.' ) );
		}
		$term_id = $maybe_term['term_id'];

		$term = get_term_by( 'id', $term_id, 'wp_pattern_category' );
		if ( ! $term ) {
			return rest_ensure_response( array( 'error' => 'Failed to create and retrieve category.' ) );
		}

		$category = array(
			'label'       => wp_specialchars_decode( $term->name, ENT_QUOTES ),
			'customLabel' => wp_specialchars_decode( $term->name, ENT_QUOTES ),
			'slug'        => sanitize_title( $term->slug ),
			'enabled'     => true,
			'count'       => 0,
			'mappedTo'    => false,
			'registered'  => false,
			'id'          => absint( $term_id ),
			'editNonce'   => wp_create_nonce( 'dlx-pw-categories-view-edit-category-' . $term_id ),
		);

		// Return the category ID.
		return rest_ensure_response(
			array(
				'termId'   => $term_id,
				'category' => $category,
			)
		);
	}

	/**
	 * Edit a registered category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_edit_registered_category( $request ) {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( $request->get_param( 'termNonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-edit-category-' . sanitize_text_field( $request->get_param( 'termSlug' ) ) ) || ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to create patterns.' ) );
		}

		$term_title = sanitize_text_field( wp_strip_all_tags( $request->get_param( 'termTitle' ) ) );
		$term_slug  = sanitize_text_field( $request->get_param( 'termSlug' ) );

		// Get registered categories.
		$categories            = Functions::get_pattern_categories( false );
		$registered_categories = $categories['registered'];

		$registered_category = array_filter(
			$registered_categories,
			function ( $category ) use ( $term_slug ) {
				return $category['slug'] === $term_slug;
			}
		);
		if ( empty( $registered_category ) ) {
			return rest_ensure_response( array( 'error' => 'Category not found.' ) );
		}
		$registered_category   = current( $registered_category );
		$category              = array(
			'label'       => sanitize_text_field( $registered_category['label'] ),
			'customLabel' => sanitize_text_field( $term_title ),
			'slug'        => sanitize_text_field( $registered_category['slug'] ),
			'enabled'     => $registered_category['enabled'],
			'count'       => $registered_category['count'],
			'mappedTo'    => $registered_category['mappedTo'],
		);
		$category              = Functions::sanitize_array_recursive( $category );
		$options               = Options::get_options();
		$options['categories'] = $options['categories'] ?? array();
		$options['categories'][ sanitize_text_field( $registered_category['slug'] ) ] = $category;

		Options::update_options( $options );

		// Add extra options to the category.
		$category['editNonce']  = wp_create_nonce( 'dlx-pw-categories-view-edit-category-' . $term_slug );
		$category['registered'] = true;

		// Return the category ID.
		return rest_ensure_response(
			array(
				'category' => $category,
			)
		);
	}

	/**
	 * Update a category.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_update_category( $request ) {
		// Check nonce and permissions.
		$nonce   = sanitize_text_field( $request->get_param( 'termNonce' ) );
		$term_id = absint( $request->get_param( 'termId' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-edit-category-' . $request->get_param( 'termId' ) ) || ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to create patterns.' ) );
		}

		$term_title = sanitize_text_field( wp_strip_all_tags( $request->get_param( 'termTitle' ) ) );
		$term_slug  = sanitize_title( $request->get_param( 'termSlug' ) );

		// See if the term already exists.
		$maybe_term = get_term_by( 'id', $term_id, 'wp_pattern_category' );
		if ( ! $maybe_term ) {
			return rest_ensure_response( array( 'error' => 'Category not found.' ) );
		}

		// Update the category.
		$maybe_term = wp_update_term(
			$term_id,
			'wp_pattern_category',
			array(
				'name' => $term_title,
				'slug' => $term_slug,
			)
		);

		if ( is_wp_error( $maybe_term ) ) {
			return rest_ensure_response( array( 'error' => 'Failed to update category. It may already exist.' ) );
		}

		$term = get_term_by( 'id', $term_id, 'wp_pattern_category' );
		if ( ! $term ) {
			return rest_ensure_response( array( 'error' => 'Failed to update and retrieve category.' ) );
		}

		$category = array(
			'label'       => wp_specialchars_decode( $term->name, ENT_QUOTES ),
			'customLabel' => wp_specialchars_decode( $term->name, ENT_QUOTES ),
			'slug'        => sanitize_title( $term->slug ),
			'enabled'     => true,
			'count'       => absint( $term->count ),
			'mappedTo'    => false,
			'registered'  => false,
			'id'          => absint( $term_id ),
			'editNonce'   => wp_create_nonce( 'dlx-pw-categories-view-edit-category-' . $term_id ),
		);

		// Return the category ID.
		return rest_ensure_response(
			array(
				'termId'   => $term_id,
				'category' => $category,
			)
		);
	}

	/**
	 * Get all patterns with previews.
	 */
	public function rest_get_all_patterns() {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_UNSAFE_RAW ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-patterns-view-get-patterns' ) || ! current_user_can( 'edit_others_posts' ) ) {
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

		// Get network configuration.
		$is_multisite                      = Functions::is_multisite( false );
		$network_patterns_data             = array();
		$current_site_id                   = get_current_blog_id();
		$is_network_source                 = Functions::is_network_patterns_site();
		$pattern_configuration             = ! $is_multisite ? 'local_only' : Functions::get_network_pattern_configuration( $current_site_id );
		$registrated_pattern_configuration = ! $is_multisite ? 'allow_all' : Options::get_network_options()['registeredPatternConfiguration'] ?? 'allow_all';
		$local_pattern_configuration       = ! $is_multisite ? 'both' : Options::get_network_options()['localPatternConfiguration'] ?? 'both';
		if ( $is_multisite && ! $is_network_source ) {
			if ( 'network_only' === $pattern_configuration || 'hybrid' === $pattern_configuration ) {
				$network_source_site_id = Functions::get_network_default_patterns_site_id();
				$network_request        = new \WP_REST_Request(
					'GET',
					'/dlxplugins/pattern-wrangler/v1/patterns/network'
				);
				$network_request->set_param( 'nonce', wp_create_nonce( 'dlx_pw_get_network_patterns' ) );
				$network_request->set_param( 'source_site_id', $network_source_site_id );
				$network_pattern_response = rest_do_request( $network_request );
				if ( ! $network_pattern_response->is_error() ) {
					$network_patterns_data = $network_pattern_response->get_data();
					if ( ! is_array( $network_patterns_data ) ) {
						$network_patterns_data = array();
					}
				}
			}
		}

		// Get local/DB patterns if network allows it.
		$local_patterns = array();
		if ( is_multisite() && ( in_array( $pattern_configuration, array( 'local_only', 'hybrid' ), true ) || $is_network_source ) ) {
			$post_args      = array(
				'post_type'      => 'wp_block',
				'posts_per_page' => 500, /* if there are more than 500 patterns, we need to paginate */
				'post_status'    => array( 'publish', 'draft' ),
			);
			$post_args      = Patterns::get_instance()->modify_blocks_rest_query( $post_args, null );
			$local_patterns = get_posts( $post_args );
		}

		// Get registered and local categories pre filters.
		$categories = Functions::get_pattern_categories( false );

		// Merge the registered and local categories.
		$registered_categories = $categories['registered'];
		$local_categories      = $categories['categories'];

		if ( is_multisite() && ! $is_network_source && 'network_only' === $pattern_configuration ) {
			$local_categories = array();
		}

		$mapped_to = array();
		// Get registered categories into shape. Registerd are label arrays.
		$registered_categories_arr = array();
		foreach ( $registered_categories as $registered_category ) {
			// Get Mapped To Count.
			if ( $registered_category['mappedTo'] && isset( $registered_category['count'] ) ) {
				if ( ! isset( $mapped_to[ $registered_category['mappedTo'] ] ) ) {
					$mapped_to[ $registered_category['mappedTo'] ] = 0;
				}
				$mapped_to[ $registered_category['mappedTo'] ] += $registered_category['count'];
			}
			// Skip disabled or empty categories.
			if ( ! (bool) $registered_category['enabled'] || 0 === $registered_category['count'] ) {
				continue;
			}
			// Decode HTML entities to prevent double encoding in React.
			$category_label        = wp_specialchars_decode( $registered_category['label'], ENT_QUOTES );
			$category_custom_label = isset( $registered_category['customLabel'] ) ? wp_specialchars_decode( $registered_category['customLabel'], ENT_QUOTES ) : $category_label;
			$registered_categories_arr[ sanitize_title( $registered_category['slug'] ) ] = array(
				'label'                => $category_label,
				'customLabel'          => $category_custom_label,
				'slug'                 => $registered_category['slug'],
				'enabled'              => isset( $registered_category['enabled'] ) ? $registered_category['enabled'] : true,
				'count'                => isset( $registered_category['count'] ) ? $registered_category['count'] : 0,
				'mappedTo'             => $registered_category['mappedTo'] ?? false,
				'registered'           => true,
				'id'                   => 0,
				'network'              => false,
				'currentSiteId'        => $current_site_id,
				'patternConfiguration' => $pattern_configuration,
			);
		}

		// Get local categories into shape. Terms are objects.
		$local_categories_arr = array();
		foreach ( $local_categories as $local_category ) {
			if ( isset( $mapped_to[ $local_category->slug ] ) ) {
				$local_category->count += $mapped_to[ $local_category->slug ];
			}
			// Decode HTML entities to prevent double encoding in React.
			$category_name = wp_specialchars_decode( $local_category->name, ENT_QUOTES );
			$local_categories_arr[ sanitize_title( $local_category->slug ) ] = array(
				'label'                => $category_name,
				'customLabel'          => $category_name,
				'slug'                 => $local_category->slug,
				'enabled'              => true,
				'count'                => $local_category->count,
				'mappedTo'             => false,
				'registered'           => false,
				'id'                   => $local_category->term_id,
				'network'              => false,
				'currentSiteId'        => $current_site_id,
				'patternConfiguration' => $pattern_configuration,
			);
		}

		// Merge the registered and local categories.
		$all_categories = Functions::sort_pattern_categories( array_merge( $registered_categories_arr, $local_categories_arr ) ); // We don't care about duplicates here.

		set_transient( 'dlx_all_categories_cache', $all_categories, HOUR_IN_SECONDS );

		// Placeholder for patterns.
		$patterns = array();

		/**
		 * Filter the default viewport width for pattern previews.
		 *
		 * @param int $default_viewport_width The default viewport width.
		 */
		$default_viewport_width = apply_filters( 'dlxpw_pattern_preview_viewport_width', 1400 );

		// Get active theme.
		$active_theme      = wp_get_theme()->get_stylesheet();
		$active_theme_name = wp_get_theme()->get( 'Name' );

		// Get active plugin slugs.
		$active_plugin_slugs = array();
		$plugins             = get_option( 'active_plugins', array() );
		foreach ( $plugins as $plugin_file ) {
			$plugin_path = WP_PLUGIN_DIR . '/' . $plugin_file;
			$info        = get_plugin_data( $plugin_path );

			$active_plugin_slugs[ sanitize_key( dirname( $plugin_file ) ) ] = sanitize_text_field( $info['Name'] );
		}

		// Get Assets.
		$assets = array(); // key/pair of theme name and array of assets.

		$stored_registered_patterns = array();
		// Process registered patterns. Skip if user isn't editor or above.
		if ( current_user_can( 'edit_others_posts' ) ) {
			foreach ( $registered_patterns as $pattern ) {
				// If pattern is remote, or doesn't have an inserter, ignore it.
				if ( isset( $pattern['inserter'] ) && false === $pattern['inserter'] && isset( $pattern['source'] ) && 'theme' !== $pattern['source'] ) {
					continue;
				}

				// Check if pattern is from the theme.
				$has_asset  = false;
				$asset_slug = '';
				if ( str_starts_with( $pattern['name'], $active_theme ) ) {
					$has_asset               = true;
					$asset_slug              = $active_theme;
					$assets[ $active_theme ] = array(
						'label' => $active_theme_name,
						'slug'  => $active_theme,
					);
				}

				// Check if pattern is from an active plugin. Try to match slug.
				foreach ( $active_plugin_slugs as $plugin_slug => $plugin_name ) {
					if ( str_starts_with( $pattern['name'], $plugin_slug ) || ( isset( $pattern['source'] ) && strstr( $pattern['source'], $plugin_slug ) ) ) {
						$has_asset              = true;
						$asset_slug             = $plugin_slug;
						$assets[ $plugin_slug ] = array(
							'label' => $plugin_name,
							'slug'  => $plugin_slug,
						);
						break;
					}
				}

				if ( isset( $pattern['source_url'] ) && strstr( $pattern['source_url'], 'wooblockpatterns' ) ) {
					$has_asset             = true;
					$asset_slug            = 'woocommerce';
					$assets[ $asset_slug ] = array(
						'label' => 'WooCommerce',
						'slug'  => $asset_slug,
					);
				}

				// Map categories to their names.
				$categories     = array();
				$category_slugs = array();
				foreach ( $pattern['categories'] as $category ) {
					if ( array_key_exists( sanitize_title( $category ), $all_categories ) ) {
						$cat              = $all_categories[ sanitize_title( $category ) ];
						$categories[]     = $cat['label'];
						$category_slugs[] = sanitize_title( $cat['slug'] );
					}
				}

				$stored_registered_patterns[ $pattern['name'] ] = array(
					'id'                   => Functions::get_sanitized_pattern_id( $pattern['name'] ),
					'title'                => $pattern['title'],
					'slug'                 => $pattern['name'],
					'content'              => $pattern['content'],
					'categories'           => $categories,
					'categorySlugs'        => $category_slugs,
					'isDisabled'           => in_array( $pattern['name'], Options::get_disabled_patterns(), true ),
					'isLocal'              => false,
					'syncStatus'           => 'registered',
					'viewportWidth'        => isset( $pattern['viewportWidth'] ) ? $pattern['viewportWidth'] : $default_viewport_width,
					'patternType'          => 'registered',
					'editNonce'            => wp_create_nonce( 'dlx-pw-patterns-view-edit-pattern-' . Functions::get_sanitized_pattern_id( $pattern['name'] ) ),
					'asset'                => $has_asset ? $asset_slug : null,
					'duplicateNonce'       => '',
					'previewNonce'         => wp_create_nonce( 'dlx-pw-patterns-view-preview-pattern-' . Functions::get_sanitized_pattern_id( $pattern['name'] ) ),
					'network'              => false,
					'currentSiteId'        => $current_site_id,
					'siteAdminAjaxUrl'     => esc_url_raw( admin_url( 'admin-ajax.php' ) ),
					'patternConfiguration' => $pattern_configuration,
				);
			}
		}

		$stored_local_patterns = array();
		// Process local patterns.
		foreach ( $local_patterns as $pattern ) {
			if ( ! current_user_can( 'edit_post', $pattern->ID ) ) {
				continue;
			}
			$categories      = get_the_terms( $pattern->ID, 'wp_pattern_category' );
			$category_labels = array();
			$category_slugs  = array();
			foreach ( $categories as $category ) {
				$category_labels[] = sanitize_text_field( $category->name );
				$category_slugs[]  = sanitize_title( $category->slug );
			}
			$stored_local_patterns[ $pattern->post_name ] = array(
				'id'                   => $pattern->ID,
				'title'                => $pattern->post_title,
				'slug'                 => $pattern->post_name,
				'content'              => $pattern->post_content,
				'categories'           => $category_labels,
				'categorySlugs'        => $category_slugs,
				'isDisabled'           => 'draft' === $pattern->post_status,
				'isLocal'              => true,
				'syncStatus'           => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
				// Unsynced patterns are explicitly set in post meta, whereas synced are not and assumed synced.
				'patternType'          => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
				'editNonce'            => wp_create_nonce( 'dlx-pw-patterns-view-edit-pattern-' . $pattern->ID ),
				'duplicateNonce'       => wp_create_nonce( 'dlx-pw-patterns-view-duplicate-pattern-' . $pattern->ID ),
				'previewNonce'         => wp_create_nonce( 'dlx-pw-patterns-view-preview-pattern-' . $pattern->ID ),
				'asset'                => null,
				'network'              => false,
				'currentSiteId'        => $current_site_id,
				'siteAdminAjaxUrl'     => esc_url_raw( admin_url( 'admin-ajax.php' ) ),
				'patternConfiguration' => $pattern_configuration,
			);
		}

		if ( ! empty( $network_patterns_data ) ) {
			$network_patterns          = isset( $network_patterns_data['patterns'] ) ? $network_patterns_data['patterns'] : array();
			$network_categories        = isset( $network_patterns_data['categories'] ) ? $network_patterns_data['categories'] : array();
			$network_disabled_patterns = isset( $network_patterns_data['disabledPatterns'] ) ? $network_patterns_data['disabledPatterns'] : array();

			if ( 'synced' === $local_pattern_configuration ) {
				$network_patterns = array_filter(
					$network_patterns,
					function ( $pattern ) {
						return 'synced' === $pattern['syncStatus'];
					}
				);
			} elseif ( 'unsynced' === $local_pattern_configuration ) {
				$network_patterns = array_filter(
					$network_patterns,
					function ( $pattern ) {
						return 'unsynced' === $pattern['syncStatus'];
					}
				);
			}
			switch ( $pattern_configuration ) {
				case 'network_only':
					$stored_local_patterns = $network_patterns;
					$all_categories        = $network_categories;
					break;
				case 'hybrid':
					$stored_local_patterns = array_merge( $stored_local_patterns, $network_patterns );
					$all_categories        = array_merge( $all_categories, $network_categories );
					break;

				default:
			}
			// Strip out disabled patterns from the registered patterns if network_only or hybrid.
			if ( 'network_only' === $pattern_configuration || 'hybrid' === $pattern_configuration ) {
				if ( 'inherit' === $registrated_pattern_configuration ) {
					$stored_registered_patterns = array_filter(
						$stored_registered_patterns,
						function ( $pattern ) use ( $network_disabled_patterns ) {
							return ! in_array( $pattern['slug'], $network_disabled_patterns, true );
						}
					);
				} elseif ( 'disable' === $registrated_pattern_configuration ) {
					$stored_registered_patterns = array();
				}
			}

			$all_categories = Functions::sort_pattern_categories( $all_categories );
		}

		$patterns = array_merge( $stored_registered_patterns, $stored_local_patterns );

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
				'assets'     => $assets,
			)
		);
	}

	/**
	 * Get all network patterns for a site.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_get_network_patterns( $request ) {
		$source_site_id  = absint( $request->get_param( 'source_site_id' ) ); // This is the passed network site id to retrieve patterns for.
		$current_site_id = get_current_blog_id();
		// Check transient first.
		$patterns              = get_site_transient( 'dlx_network_patterns_cache' );
		$all_categories        = get_site_transient( 'dlx_network_categories_cache' );
		$disabled_patterns     = get_site_transient( 'dlx_network_disabled_patterns_cache' );
		$pattern_configuration = Options::get_network_options()['patternConfiguration'] ?? 'local_only';
		$site_ajax_url         = admin_url( 'admin-ajax.php' );
		if ( false !== $patterns && false !== $all_categories && false !== $disabled_patterns ) {
			return rest_ensure_response(
				array(
					'patterns'         => $patterns,
					'categories'       => $all_categories,
					'disabledPatterns' => $disabled_patterns,
				)
			);
		}

		if ( 0 === $source_site_id ) {
			return rest_ensure_response(
				array(
					'patterns'   => array(),
					'categories' => array(),
				)
			);
		}

		switch_to_blog( $source_site_id );

		// Run the pattern class filters.
		Patterns::get_instance()->maybe_deregister_pattern_categories();
		Patterns::get_instance()->maybe_deregister_theme_patterns();
		Patterns::get_instance()->maybe_deregister_plugin_patterns();
		Patterns::get_instance()->maybe_deregister_uncategorized_patterns();
		Patterns::get_instance()->maybe_deregister_all_patterns();

		// Get local/DB patterns.
		$post_args      = array(
			'post_type'      => 'wp_block',
			'posts_per_page' => 500, /* if there are more than 500 patterns, we need to paginate */
			'post_status'    => array( 'publish' ),
		);
		$post_args      = Patterns::get_instance()->modify_blocks_rest_query( $post_args, null );
		$local_patterns = get_posts( $post_args );

		// Get registered and local categories pre filters.
		$local_categories = Functions::get_pattern_categories_from_taxonomy();

		$mapped_to = array();

		// Get local categories into shape. Terms are objects.
		$local_categories_arr = array();
		foreach ( $local_categories as $local_category ) {
			if ( isset( $mapped_to[ $local_category->slug ] ) ) {
				$local_category->count += $mapped_to[ $local_category->slug ];
			}
			// Decode HTML entities to prevent double encoding in React.
			$category_name = wp_specialchars_decode( $local_category->name, ENT_QUOTES );
			$local_categories_arr[ sanitize_title( $local_category->slug ) ] = array(
				'label'                => $category_name,
				'customLabel'          => $category_name,
				'slug'                 => $local_category->slug,
				'enabled'              => true,
				'count'                => $local_category->count,
				'mappedTo'             => false,
				'registered'           => false,
				'id'                   => $local_category->term_id,
				'network'              => true,
				'sourceSiteId'         => $source_site_id,
				'currentSiteId'        => $current_site_id,
				'siteAdminAjaxUrl'     => esc_url_raw( $site_ajax_url ),
				'patternConfiguration' => $pattern_configuration,
			);
		}

		// Merge the local categories.
		$all_categories = array_merge( $local_categories_arr ); // We don't care about duplicates here.

		// Sort by label.
		uasort(
			$all_categories,
			function ( $a, $b ) {
				return strcasecmp( $a['label'], $b['label'] );
			}
		);

		set_site_transient( 'dlx_network_categories_cache', $all_categories, HOUR_IN_SECONDS );

		// Placeholder for patterns.
		$patterns = array();

		// Process local patterns.
		foreach ( $local_patterns as $pattern ) {
			$categories      = get_the_terms( $pattern->ID, 'wp_pattern_category' );
			$category_labels = array();
			$category_slugs  = array();
			foreach ( $categories as $category ) {
				$category_labels[] = sanitize_text_field( $category->name );
				$category_slugs[]  = sanitize_title( $category->slug );
			}
			$patterns[ $pattern->post_name ] = array(
				'id'                   => $pattern->ID,
				'title'                => $pattern->post_title,
				'slug'                 => $pattern->post_name,
				'content'              => $pattern->post_content,
				'categories'           => $category_labels,
				'categorySlugs'        => $category_slugs,
				'isDisabled'           => 'draft' === $pattern->post_status,
				'isLocal'              => true,
				'syncStatus'           => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
				// Unsynced patterns are explicitly set in post meta, whereas synced are not and assumed synced.
				'patternType'          => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
				'sourceSiteId'         => $source_site_id,
				'currentSiteId'        => $current_site_id,
				'asset'                => null,
				'network'              => true,
				'siteAdminAjaxUrl'     => esc_url_raw( $site_ajax_url ),
				'patternConfiguration' => $pattern_configuration,
				'previewNonce'         => wp_create_nonce( 'dlx-pw-patterns-view-preview-pattern-' . $pattern->ID ),
				'duplicateNonce'       => wp_create_nonce( 'dlx-pw-patterns-view-duplicate-pattern-' . $pattern->ID ),
			);
		}

		// Sort patterns by title ascending.
		usort(
			$patterns,
			function ( $a, $b ) {
				return strcmp( $a['title'], $b['title'] );
			}
		);

		// Cache for 1 hour.
		set_site_transient( 'dlx_network_patterns_cache', $patterns, HOUR_IN_SECONDS );

		$disabled_patterns = Options::get_disabled_patterns();
		set_site_transient( 'dlx_network_disabled_patterns_cache', $disabled_patterns, HOUR_IN_SECONDS );

		restore_current_blog();

		return rest_ensure_response(
			array(
				'patterns'         => $patterns,
				'categories'       => $all_categories,
				'disabledPatterns' => $disabled_patterns,
			)
		);
	}

	/**
	 * Get all categories.
	 *
	 * @param bool $after_filters Whether to get categories after filters.
	 * @return array The categories.
	 */
	private function get_all_categories( $after_filters = false ) {
		// Check transient first.
		$all_categories = get_transient( 'dlx_all_categories_cache' );
		if ( false !== $all_categories && false ) {
			return rest_ensure_response(
				array(
					'categories' => $all_categories,
				)
			);
		}

		// Get registered categories.
		$registered_categories = \WP_Block_Pattern_Categories_Registry::get_instance()->get_all_registered();

		// Get registered and local categories.
		$registered_patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		$categories          = Functions::get_pattern_categories( $after_filters );

		// Merge the registered and local categories.
		$registered_categories = $categories['registered'];
		$local_categories      = $categories['categories'];

		// Get registered categories into shape. Registerd are label arrays.
		$patterns_mapped_to        = array();
		$registered_categories_arr = array();
		foreach ( $registered_categories as $registered_category ) {
			// Decode HTML entities to prevent double encoding in React.
			$category_label        = wp_specialchars_decode( $registered_category['label'], ENT_QUOTES );
			$category_custom_label = isset( $registered_category['customLabel'] ) ? wp_specialchars_decode( $registered_category['customLabel'], ENT_QUOTES ) : $category_label;
			$registered_categories_arr[ sanitize_title( 'registered-' . $registered_category['slug'] ) ] = array(
				'label'       => $category_label,
				'customLabel' => $category_custom_label,
				'slug'        => $registered_category['slug'],
				'enabled'     => $registered_category['enabled'] ?? true,
				'count'       => isset( $registered_category['count'] ) ? $registered_category['count'] : 0,
				'mappedTo'    => $registered_category['mappedTo'] ?? false,
				'registered'  => true,
				'id'          => 0,
				'editNonce'   => wp_create_nonce( 'dlx-pw-categories-view-edit-category-' . $registered_category['slug'] ),
			);
			if ( $registered_category['mappedTo'] && isset( $registered_category['count'] ) ) {
				if ( ! isset( $patterns_mapped_to[ $registered_category['mappedTo'] ] ) ) {
					$patterns_mapped_to[ $registered_category['mappedTo'] ] = array();
				}
				foreach ( $registered_patterns as $pattern ) {
					$pattern_categories = isset( $pattern['categories'] ) ? $pattern['categories'] : array();
					if ( in_array( $registered_category['slug'], $pattern_categories, true ) || in_array( $registered_category['mappedTo'], $pattern_categories, true ) ) {
						$patterns_mapped_to[ $registered_category['mappedTo'] ][] = $pattern;
					}
				}
			}
		}

		// Make sure array and each key is unique.
		$patterns_mapped_to = array_unique( $patterns_mapped_to, SORT_REGULAR );
		foreach ( $patterns_mapped_to as $key => $value ) {
			$patterns_mapped_to[ $key ] = array_unique( $value, SORT_REGULAR );
		}

		// Get local categories into shape. Terms are objects.
		$local_categories_arr = array();
		foreach ( $local_categories as $local_category ) {
			if ( isset( $patterns_mapped_to[ $local_category->slug ] ) ) {
				$local_category->count += count( $patterns_mapped_to[ $local_category->slug ] );
			}
			// Decode HTML entities to prevent double encoding in React.
			$category_name = wp_specialchars_decode( $local_category->name, ENT_QUOTES );
			$local_categories_arr[ sanitize_title( $local_category->slug ) ] = array(
				'label'       => $category_name,
				'customLabel' => $category_name,
				'slug'        => $local_category->slug,
				'enabled'     => true,
				'count'       => $local_category->count,
				'mappedTo'    => false,
				'registered'  => false,
				'id'          => $local_category->term_id,
				'editNonce'   => wp_create_nonce( 'dlx-pw-categories-view-edit-category-' . $local_category->term_id ),
			);
		}

		// Merge the registered and local categories.
		$all_categories = array_merge( $registered_categories_arr, $local_categories_arr ); // We don't care about duplicates here.

		// Sort by label.
		uasort(
			$all_categories,
			function ( $a, $b ) {
				return strcasecmp( $a['label'], $b['label'] );
			}
		);

		set_transient( 'dlx_all_categories_cache', $all_categories, HOUR_IN_SECONDS );

		return array(
			'all'        => $all_categories,
			'registered' => $registered_categories,
			'local'      => $local_categories,
		);
	}

	/**
	 * Get all categories.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_get_all_categories() {
		// Check nonce and permissions.
		$nonce = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_UNSAFE_RAW ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-categories-view-get-categories' ) || ! current_user_can( 'edit_others_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to view categories.' ) );
		}

		$categories = $this->get_all_categories();

		return rest_ensure_response(
			array(
				'categories'           => $categories['all'],
				'registeredCategories' => $categories['registered'],
				'localCategories'      => $categories['local'],
			)
		);
	}

	/**
	 * Returns the available sites in the network.
	 *
	 * @param \WP_REST_Request $request The REST Request data.
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
	 * Get a pattern by ID.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return \WP_REST_Response The REST response.
	 */
	public function rest_get_pattern( $request ) {
		// Check nonce and permissions.
		if ( ! current_user_can( 'publish_posts' ) ) {
			return rest_ensure_response( array( 'error' => 'Invalid nonce or user does not have permission to delete patterns.' ) );
		}

		$pattern_id = $request->get_param( 'id' );

		if ( ! current_user_can( 'edit_post', $pattern_id ) ) {
			return rest_ensure_response( array( 'error' => 'User does not have permission to get pattern ' . $pattern_id ) );
		}

		$pattern = get_post( $pattern_id );

		$pattern_configuration = Options::get_network_options()['patternConfiguration'] ?? 'local_only';

		// Process local patterns.
		$return_pattern = array(
			'id'                   => $pattern->ID,
			'title'                => $pattern->post_title,
			'slug'                 => $pattern->post_name,
			'content'              => $pattern->post_content,
			'categories'           => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
			'categorySlugs'        => get_the_terms( $pattern->ID, 'wp_pattern_category' ),
			'isDisabled'           => 'draft' === $pattern->post_status,
			'isLocal'              => true,
			'syncStatus'           => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
			// Unsynced patterns are explicitly set in post meta, whereas synced are not and assumed synced.
			'patternType'          => 'unsynced' === get_post_meta( $pattern->ID, 'wp_pattern_sync_status', true ) ? 'unsynced' : 'synced',
			'editNonce'            => wp_create_nonce( 'dlx-pw-patterns-view-edit-pattern-' . $pattern->ID ),
			'currentSiteId'        => get_current_blog_id(),
			'asset'                => null,
			'network'              => false,
			'siteAdminAjaxUrl'     => esc_url_raw( admin_url( 'admin-ajax.php' ) ),
			'patternConfiguration' => $pattern_configuration,

		);

		return rest_ensure_response( $return_pattern );
	}


	/**
	 * Get the REST endpoint.
	 *
	 * @param string $endpoint The endpoint to get.
	 * @param bool   $relative_path Whether to return a relative path.
	 * @return string The REST endpoint.
	 */
	public static function get_rest_endpoint( $endpoint, $relative_path = false ) {
		if ( $relative_path ) {
			return sprintf( '/dlxplugins/pattern-wrangler/v1/%s', $endpoint );
		}
		return Functions::get_rest_url( sprintf( 'dlxplugins/pattern-wrangler/v1/%s', $endpoint ) );
	}

	/**
	 * Makes sure the search string is valid
	 *
	 * @param \WP_REST_Request $request The REST request.
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
	 * @param \WP_REST_Request $request The REST request.
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
	 * @param \WP_REST_Request $request The REST request.
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
	 * @param \WP_REST_Request $request The REST request.
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
	 * List pattern versions for a parent wp_block.
	 *
	 * @param \WP_REST_Request $request REST request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_get_pattern_versions( $request ) {
		$options = Options::get_options();
		if ( empty( $options['enableVersionsModule'] ) ) {
			return new \WP_Error(
				'dlx_pw_versions_disabled',
				__( 'Pattern versions are disabled.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$parent_id = absint( $request->get_param( 'parent' ) );
		if ( ! $parent_id || ! current_user_can( 'edit_post', $parent_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You cannot view versions for this pattern.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$parent = get_post( $parent_id );
		if ( ! $parent || 'wp_block' !== $parent->post_type ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Invalid pattern.', 'pattern-wrangler' ),
				array( 'status' => 400 )
			);
		}

		$posts = get_posts(
			array(
				'post_type'      => Versions::POST_TYPE,
				'post_parent'    => $parent_id,
				'post_status'    => 'publish',
				'orderby'        => 'post_date',
				'order'          => 'DESC',
				'posts_per_page' => 100,
			)
		);

		$sync_status_key = Versions::PATTERN_SYNC_STATUS_META_KEY;
		$versions        = array();
		foreach ( $posts as $post ) {
			$term_ids = wp_get_post_terms( $post->ID, 'wp_pattern_category', array( 'fields' => 'ids' ) );
			if ( is_wp_error( $term_ids ) || ! is_array( $term_ids ) ) {
				$term_ids = array();
			}
			$cat_ids                  = array_values( array_unique( array_map( 'absint', $term_ids ) ) );
			$pattern_sync_status_meta = get_post_meta( $post->ID, $sync_status_key, true );
			$pattern_sync_status_meta = ( 'unsynced' === $pattern_sync_status_meta ) ? 'unsynced' : '';
			$versions[]               = array(
				'id'             => absint( $post->ID ),
				'title'          => sanitize_text_field( wp_unslash( get_the_title( $post ) ) ),
				'description'    => wp_trim_words( sanitize_textarea_field( wp_unslash( $post->post_excerpt ) ), 35 ),
				'date'           => esc_html( Functions::get_i18n_date( $post->post_date, true ) ),
				'categoryIds'    => $cat_ids,
				'content'        => wp_unslash( $post->post_content ),
				$sync_status_key => $pattern_sync_status_meta,
				'deleteNonce'    => wp_create_nonce( 'dlx-pw-versions-delete-version-' . $post->ID ),
				'restoreNonce'   => wp_create_nonce( 'dlx-pw-versions-restore-version-' . $post->ID ),
			);
		}

		return rest_ensure_response( array( 'versions' => $versions ) );
	}

	/**
	 * Create a pattern version checkpoint (pw_versions).
	 *
	 * @param \WP_REST_Request $request REST request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_create_pattern_version( $request ) {
		$options = Options::get_options();
		if ( empty( $options['enableVersionsModule'] ) ) {
			return new \WP_Error(
				'dlx_pw_versions_disabled',
				__( 'Pattern versions are disabled.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$parent_id = absint( $request->get_param( 'parentId' ) );
		if ( ! $parent_id || ! current_user_can( 'edit_post', $parent_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You cannot create versions for this pattern.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-versions-create-version-' . $parent_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You do not have permission to create versions for this pattern.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$parent = get_post( $parent_id );
		if ( ! $parent || 'wp_block' !== $parent->post_type ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Invalid pattern.', 'pattern-wrangler' ),
				array( 'status' => 400 )
			);
		}

		$content = Functions::resolve_pattern_markup_for_storage( $parent->post_content );
		if ( '' === trim( $content ) ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Version content cannot be empty.', 'pattern-wrangler' ),
				array( 'status' => 400 )
			);
		}

		$title = sanitize_text_field( wp_unslash( $request->get_param( 'title' ) ) );
		if ( '' === $title ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Title is required.', 'pattern-wrangler' ),
				array( 'status' => 400 )
			);
		}
		$excerpt = sanitize_textarea_field( (string) wp_unslash( $request->get_param( 'description' ) ) );

		$current_user = wp_get_current_user();

		$version_id = wp_insert_post(
			array(
				'post_title'   => $title,
				'post_content' => wp_slash( $content ),
				'post_excerpt' => wp_slash( $excerpt ),
				'post_status'  => 'publish',
				'post_type'    => Versions::POST_TYPE,
				'post_parent'  => absint( $parent_id ),
				'post_author'  => absint( $current_user->ID ),
			),
			true
		);

		if ( is_wp_error( $version_id ) ) {
			return $version_id;
		}

		$sync_status_key   = Versions::PATTERN_SYNC_STATUS_META_KEY;
		$parent_terms      = wp_get_post_terms( $parent_id, 'wp_pattern_category', array( 'fields' => 'ids' ) );
		$category_term_ids = array();
		if ( ! is_wp_error( $parent_terms ) && is_array( $parent_terms ) ) {
			$category_term_ids = array_values( array_unique( array_map( 'absint', $parent_terms ) ) );
		}

		$parent_sync              = get_post_meta( $parent_id, $sync_status_key, true );
		$pattern_sync_status_meta = ( 'unsynced' === $parent_sync ) ? 'unsynced' : '';

		wp_set_post_terms( $version_id, $category_term_ids, 'wp_pattern_category', false );

		if ( 'unsynced' === $pattern_sync_status_meta ) {
			update_post_meta( $version_id, $sync_status_key, 'unsynced' );
		} else {
			delete_post_meta( $version_id, $sync_status_key );
		}

		return rest_ensure_response(
			array(
				'id'    => absint( $version_id ),
				'title' => $title,
			)
		);
	}

	/**
	 * Delete a pattern version checkpoint (pw_versions).
	 *
	 * @param \WP_REST_Request $request REST request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_delete_pattern_version( $request ) {
		$options = Options::get_options();
		if ( empty( $options['enableVersionsModule'] ) ) {
			return new \WP_Error(
				'dlx_pw_versions_disabled',
				__( 'Pattern versions are disabled.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$version_id = absint( $request->get_param( 'id' ) );
		if ( ! $version_id || ! current_user_can( 'delete_post', $version_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You cannot delete this version.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-versions-delete-version-' . $version_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You do not have permission to delete this version.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$version = get_post( $version_id );
		if ( ! $version || Versions::POST_TYPE !== $version->post_type ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Invalid version.', 'pattern-wrangler' ),
				array( 'status' => 400 )
			);
		}

		wp_delete_post( $version_id, true );

		return rest_ensure_response(
			array(
				'id' => absint( $version_id ),
			)
		);
	}

	/**
	 * Restore a pattern version checkpoint (pw_versions).
	 *
	 * @param \WP_REST_Request $request REST request.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_restore_pattern_version( $request ) {
		$options = Options::get_options();
		if ( empty( $options['enableVersionsModule'] ) ) {
			return new \WP_Error(
				'dlx_pw_versions_disabled',
				__( 'Pattern versions are disabled.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$version_id = absint( $request->get_param( 'id' ) );
		if ( ! $version_id || ! current_user_can( 'edit_post', $version_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You cannot restore this version.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}
		$pattern_id = absint( $request->get_param( 'patternId' ) );
		if ( ! $pattern_id || ! current_user_can( 'edit_post', $pattern_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You cannot restore this version.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$nonce = sanitize_text_field( $request->get_param( 'nonce' ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-versions-restore-version-' . $version_id ) ) {
			return new \WP_Error(
				'rest_forbidden',
				__( 'You do not have permission to restore this version.', 'pattern-wrangler' ),
				array( 'status' => 403 )
			);
		}

		$version = get_post( $version_id );
		if ( ! $version || Versions::POST_TYPE !== $version->post_type ) {
			return new \WP_Error(
				'rest_invalid_param',
				__( 'Invalid version.', 'pattern-wrangler' ),
				array( 'status' => 400 )
			);
		}

		$can_create_snapshot = boolval( $request->get_param( 'shouldCreateSnapshot' ) );
		$snapshot_id         = null;
		if ( $can_create_snapshot ) {
			$pattern = get_post( $pattern_id );
			if ( ! $pattern || 'wp_block' !== $pattern->post_type ) {
				return new \WP_Error(
					'rest_invalid_param',
					__( 'Invalid pattern.', 'pattern-wrangler' ),
					array( 'status' => 400 )
				);
			}
			$content = Functions::resolve_pattern_markup_for_storage( $pattern->post_content );
			if ( '' === trim( $content ) ) {
				return new \WP_Error(
					'rest_invalid_param',
					__( 'Version content cannot be empty.', 'pattern-wrangler' ),
					array( 'status' => 400 )
				);
			}

			$title   = esc_html__( 'Snapshot Before Restore', 'pattern-wrangler' );
			$excerpt = esc_html__( 'This is a snapshot of the pattern before it was restored.', 'pattern-wrangler' );

			$current_user = wp_get_current_user();

			$snapshot_id = wp_insert_post(
				array(
					'post_title'   => $title,
					'post_content' => wp_slash( $content ),
					'post_excerpt' => wp_slash( $excerpt ),
					'post_status'  => 'publish',
					'post_type'    => Versions::POST_TYPE,
					'post_parent'  => absint( $pattern_id ),
					'post_author'  => absint( $current_user->ID ),
				),
				true
			);

			if ( is_wp_error( $snapshot_id ) ) {
				return $snapshot_id;
			}

			$sync_status_key   = Versions::PATTERN_SYNC_STATUS_META_KEY;
			$parent_terms      = wp_get_post_terms( $pattern_id, 'wp_pattern_category', array( 'fields' => 'ids' ) );
			$category_term_ids = array();
			if ( ! is_wp_error( $parent_terms ) && is_array( $parent_terms ) ) {
				$category_term_ids = array_values( array_unique( array_map( 'absint', $parent_terms ) ) );
			}

			$parent_sync              = get_post_meta( $pattern_id, $sync_status_key, true );
			$pattern_sync_status_meta = ( 'unsynced' === $parent_sync ) ? 'unsynced' : '';

			wp_set_post_terms( $snapshot_id, $category_term_ids, 'wp_pattern_category', false );

			if ( 'unsynced' === $pattern_sync_status_meta ) {
				update_post_meta( $snapshot_id, $sync_status_key, 'unsynced' );
			} else {
				delete_post_meta( $snapshot_id, $sync_status_key );
			}
		}

		$updated = wp_update_post(
			array(
				'ID'           => $pattern_id,
				'post_content' => wp_slash( $version->post_content ),
			)
		);

		// Set the version categories.
		$version_categories = wp_get_post_terms( $version_id, 'wp_pattern_category', array( 'fields' => 'ids' ) );
		if ( ! is_wp_error( $version_categories ) && is_array( $version_categories ) ) {
			wp_set_post_terms( $pattern_id, $version_categories, 'wp_pattern_category', false );
			$version_categories = array_values( array_unique( array_map( 'absint', $version_categories ) ) );
		} else {
			$version_categories = array();
		}

		if ( is_wp_error( $updated ) ) {
			return $updated;
		}

		return rest_ensure_response(
			array(
				'content'    => wp_unslash( $version->post_content ),
				'snapshotId' => absint( $snapshot_id ),
				'categories' => $version_categories,
			)
		);
	}
}
