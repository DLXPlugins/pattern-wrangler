<?php
/**
 * Patterns class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

/**
 * Patterns class.
 */
class Patterns {

	/**
	 * Class runner.
	 */
	public function run() {
		$options = Options::get_options();

		// Enqueue scripts for the wp_block post_type.
		add_action( 'admin_enqueue_scripts', array( $this, 'add_post_type_enqueue_scripts' ) );

		// Deregister any disabled pattern categories.
		add_action( 'init', array( $this, 'maybe_deregister_pattern_categories' ), 999 );

		// Deregister any patterns from the active or child theme.
		add_action( 'init', array( $this, 'maybe_deregister_theme_patterns' ), 1000 );

		// Deregister any patterns from active plugins.
		add_action( 'init', array( $this, 'maybe_deregister_plugin_patterns' ), 1000 );

		// Map any disabled patterns to uncategorized or custom category.
		add_action( 'init', array( $this, 'maybe_deregister_and_map_patterns' ), 1001 );

		// Change pattern category labels.
		add_action( 'init', array( $this, 'change_pattern_category_labels' ), 1002 );

		// Deregister any patterns that are uncategorized.
		add_action( 'init', array( $this, 'maybe_deregister_uncategorized_patterns' ), 1003 );

		// Deregister all pattenrs if all patterns are disabled.
		add_action( 'init', array( $this, 'maybe_deregister_all_patterns' ), 2000 );

		// Modify term query in REST to disable any deactivated terms.
		add_filter( 'rest_wp_pattern_category_query', array( $this, 'modify_term_query' ), 10, 2 );

		// Modify REST query to exclude any patterns if disabled.
		add_filter( 'rest_wp_block_query', array( $this, 'modify_blocks_rest_query' ), 10, 2 );

		// Add a featured image to the wp_block post type.
		add_action( 'init', array( $this, 'add_featured_image_support' ) );

		// Add an author to the wp_block post type.
		add_action( 'init', array( $this, 'add_post_author_support' ) );

		// Change post type label for featured image.
		add_filter( 'post_type_labels_wp_block', array( $this, 'change_featured_image_label' ) );

		// Add post type column for shortcode.
		add_filter( 'manage_wp_block_posts_columns', array( $this, 'add_post_type_columns' ) );

		// Add a featured image to the wp_block post type column.
		add_action( 'manage_wp_block_posts_custom_column', array( $this, 'add_post_type_columns_content' ), 10, 2 );

		// Add bulk action for making patterns a draft.
		add_filter( 'bulk_actions-edit-wp_block', array( $this, 'add_draft_bulk_actions' ) );

		// Handle bulk actions for making patterns a draft.
		add_action( 'handle_bulk_actions-edit-wp_block', array( $this, 'handle_bulk_actions' ), 10, 3 );

		// Add the wp_block shortcode.
		add_shortcode( 'wp_block', array( $this, 'shortcode_pattern_callback' ) );

		// Show the customizer UI if enabled.
		$show_customizer_ui = (bool) $options['showCustomizerUI'];
		if ( $show_customizer_ui ) {
			add_action( 'customize_register', '__return_true' );
		}

		// Show the menu UI if enabled.
		$show_menu_ui = (bool) $options['showMenusUI'];
		if ( $show_menu_ui ) {
			add_action( 'after_setup_theme', array( $this, 'enable_menus_ui' ), 100 );
		}

		$hide_all_patterns = (bool) $options['hideAllPatterns'];
		if ( $hide_all_patterns ) {
			add_action( 'init', array( $this, 'remove_core_patterns' ), 9 );
			add_filter( 'should_load_remote_block_patterns', '__return_false' );
		}

		// Check if remote patterns is disabled.
		$hide_remote_patterns = (bool) $options['hideRemotePatterns'];
		if ( $hide_remote_patterns ) {
			add_filter( 'should_load_remote_block_patterns', '__return_false' );
		}

		// Check if core patterns is disabled.
		$hide_core_patterns = (bool) $options['hideCorePatterns'];
		if ( $hide_core_patterns ) {
			add_action( 'init', array( $this, 'remove_core_patterns' ), 9 );
			remove_action( 'init', '_register_core_block_patterns_and_categories' );
		}
	}

	/**
	 * Attempt to deregister any patterns from the active or child theme.
	 */
	public function maybe_deregister_theme_patterns() {
		$options = Options::get_options();

		$hide_theme_patterns = (bool) $options['hideThemePatterns'];
		if ( $hide_theme_patterns ) {
			// Get the active theme.
			$theme = wp_get_theme();

			// Let's get some theme data.
			$paths_to_search = array(
				$theme->stylesheet,
			);

			// Check if this is a child theme.
			if ( $theme->parent() ) {
				$parent_theme      = wp_get_theme( $theme->parent()->template );
				$paths_to_search[] = $parent_theme->template;
			}
			$paths_to_search = array_unique( $paths_to_search );

			// Get all registered patterns.
			$patterns     = \WP_Block_Patterns_Registry::get_instance();
			$all_patterns = $patterns->get_all_registered();

			// Loop through all patterns and deregister any that are from the active or child theme.
			foreach ( $all_patterns as $index => $pattern ) {
				$file_path = $pattern['filePath'] ?? '';
				if ( empty( $file_path ) ) {
					continue;
				}

				// Check if the pattern is from the active or child theme.
				foreach ( $paths_to_search as $path ) {
					if ( false !== strpos( $file_path, 'themes/' . $path ) ) {
						unregister_block_pattern( $pattern['name'] );
					}
				}
			}
		}
	}

	/**
	 * Attempt to deregister any patterns from active plugins.
	 */
	public function maybe_deregister_plugin_patterns() {
		$options = Options::get_options();

		$hide_plugin_patterns = (bool) $options['hidePluginPatterns'];
		if ( $hide_plugin_patterns ) {

			// Get all registered patterns.
			$patterns     = \WP_Block_Patterns_Registry::get_instance();
			$all_patterns = $patterns->get_all_registered();

			// Loop through all patterns and deregister any that are from active plugins.
			foreach ( $all_patterns as $index => $pattern ) {
				// Check the path for the `plugins` folder.
				$file_path = $pattern['filePath'] ?? '';
				if ( empty( $file_path ) ) {
					continue;
				}

				// Deregister any with the plugin in their path.
				if ( false !== strpos( $file_path, '/plugins' ) ) {
					unregister_block_pattern( $pattern['name'] );
				}
			}
		}
	}

	/**
	 * Callback for the shortcode for displaying block patterns.
	 *
	 * @param array $atts Shortcode defaults.
	 *
	 * @return string shortcode output.
	 */
	public function shortcode_pattern_callback( $atts = array() ) {
		// Set default attributes.
		$atts = shortcode_atts(
			array(
				'slug' => '',
			),
			$atts,
			'wp_block'
		);

		// Get the post by slug.
		$post = get_page_by_path( $atts['slug'], OBJECT, 'wp_block' );

		// If no post is found, return nothing.
		if ( ! $post ) {
			return '';
		}

		// Get the post content.
		$content = do_blocks( $post->post_content );

		// Return the post content.
		return $content;
	}

	/**
	 * Handle bulk actions.
	 *
	 * @param string $redirect_to Redirect URL.
	 * @param string $doaction Action to perform.
	 * @param array  $post_ids Array of post IDs.
	 *
	 * @return string
	 */
	public function handle_bulk_actions( $redirect_to, $doaction, $post_ids ) {
		// Check if action is draft pattern.
		if ( 'draft_pattern' !== $doaction ) {
			return $redirect_to;
		}

		// Loop through post IDs and update status.
		foreach ( $post_ids as $post_id ) {
			wp_update_post(
				array(
					'ID'          => $post_id,
					'post_status' => 'draft',
				)
			);
		}

		// Build redirect URL.
		$redirect_url = add_query_arg(
			array(
				'post_type'     => 'wp_block',
				'notice_action' => 'draft_pattern',
			),
			admin_url( 'edit.php' )
		);
		return esc_url_raw( $redirect_url );
	}

	/**
	 * Add draft bulk actions.
	 *
	 * @param array $actions Array of actions.
	 *
	 * @return array Updated actions.
	 */
	public function add_draft_bulk_actions( $actions ) {
		$actions['draft_pattern'] = __( 'Set as Draft', 'pattern-wrangler' );
		return $actions;
	}

	/**
	 * Enable menus UI.
	 */
	public function enable_menus_ui() {
		add_theme_support( 'menus' );
	}

	/**
	 * Add featured image to wp_block post type column.
	 *
	 * @param string $column_name Column name.
	 * @param int    $post_id Post ID.
	 */
	public function add_post_type_columns_content( $column_name, $post_id ) {
		if ( 'featured_image' === $column_name ) {
			$thumbnail = get_the_post_thumbnail( $post_id, array( 150, 0 ) );
			echo wp_kses_post( $thumbnail );
			return;
		}
		if ( 'shortcode' === $column_name ) {
			$post = get_post( $post_id );
			if ( 'publish' === $post->post_status ) {

				$shortcode = '<div class="dlxpw-copy-shortcode-container">';

				// Generate the shortcode for the readonly input.
				$shortcode .= sprintf(
					'<input type="text" value="%s" readonly>',
					esc_attr( sprintf( '[wp_block slug="%s"]', $post->post_name ) )
				);

				// Generate the shortcode for the button with dashicon.
				$shortcode .= sprintf(
					'<button type="button" aria-label="%1$s" class="dlxpw-copy-shortcode dlx-copy-shortcode-hidden" title="%1$s">%2$s</button>',
					esc_attr__( 'Copy shortcode', 'pattern-wrangler' ),
					'<span class="dashicons dashicons-clipboard"></span>'
				);

				$shortcode .= '</div>';

				// Output the combined shortcode with allowed HTML tags.
				echo wp_kses( $shortcode, Functions::get_kses_allowed_html( false ) );
			}
		}
	}

	/**
	 * Add featured image column to wp_block post type.
	 *
	 * @param array $columns Array of columns.
	 *
	 * @return array Updated columns.
	 */
	public function add_post_type_columns( $columns ) {
		// Add featured image to 2nd column.
		$columns = array_slice( $columns, 0, 2, true ) + array( 'featured_image' => __( 'Pattern Preview', 'pattern-wrangler' ) ) + array_slice( $columns, 1, count( $columns ) - 1, true );

		// Add shortcode to 3rd column.
		$columns = array_slice( $columns, 0, 3, true ) + array( 'shortcode' => __( 'Shortcode', 'pattern-wrangler' ) ) + array_slice( $columns, 2, count( $columns ) - 1, true );
		return $columns;
	}

	/**
	 * Change featured image label for wp_block post type.
	 *
	 * @param object $labels Object of labels.
	 *
	 * @return object Updated labels.
	 */
	public function change_featured_image_label( $labels ) {
		$labels->featured_image     = __( 'Pattern Preview', 'pattern-wrangler' );
		$labels->set_featured_image = __( 'Set pattern preview', 'pattern-wrangler' );
		return $labels;
	}

	/**
	 * Add featured image support to wp_block post type.
	 */
	public function add_featured_image_support() {
		add_post_type_support( 'wp_block', 'thumbnail' );
	}

	/**
	 * Add post author support to wp_block post type.
	 */
	public function add_post_author_support() {
		add_post_type_support( 'wp_block', 'author' );
	}

	/**
	 * Remove core patterns.
	 */
	public function remove_core_patterns() {
		remove_theme_support( 'core-block-patterns' );
	}

	/**
	 * Deregister all patterns if all patterns are disabled.
	 */
	public function maybe_deregister_all_patterns() {
		// Get options.
		$options = Options::get_options();

		$hide_all_patterns = (bool) $options['hideAllPatterns'];

		// Exit early if not enabled.
		if ( ! $hide_all_patterns ) {
			return;
		}

		// Retrieve all patterns.
		$patterns     = \WP_Block_Patterns_Registry::get_instance();
		$all_patterns = $patterns->get_all_registered();

		// Loop through all patterns and deregister any that are uncategorized.
		foreach ( $all_patterns as $index => $pattern ) {
			unregister_block_pattern( $pattern['name'] );
		}
	}

	/**
	 * Modify REST query to exclude any patterns if disabled.
	 *
	 * @param array           $args    Array of arguments for WP_Query.
	 * @param WP_REST_Request $request The REST API request.
	 *
	 * @return array
	 */
	public function modify_blocks_rest_query( $args, $request ) {
		// Get options.
		$options = Options::get_options();

		$hide_all_patterns = (bool) $options['hideAllPatterns'];

		// Exit early if not enabled.
		if ( $hide_all_patterns ) {
			$args['post__in'] = array( -1 ); // -1 so no patterns are returned.
		}

		return $args;
	}

	/**
	 * Modify term query in REST to disable any deactivated terms.
	 *
	 * @param array           $args    Array of arguments for WP_Query.
	 * @param WP_REST_Request $request The REST API request.
	 *
	 * @return array
	 */
	public function modify_term_query( $args, $request ) {
		// Get options.
		$options    = Options::get_options();
		$categories = $options['categories'] ?? array();

		$core_pattern_categories = Functions::get_pattern_categories_from_taxonomy();

		// Add disabled categories to the exclude array.
		foreach ( $categories as $category ) {
			$category_slug    = $category['slug'];
			$category_enabled = (bool) $category['enabled'];

			if ( ! $category_enabled && $core_pattern_categories ) {
				// See if slug matches core pattern categories.
				foreach ( $core_pattern_categories as $core_category ) {
					if ( $core_category->slug === $category_slug ) {
						$args['exclude'][] = $core_category->term_id;
					}
				}
			}
		}

		return $args;
	}

	/**
	 * Deregister any uncategorized patterns.
	 */
	public function maybe_deregister_uncategorized_patterns() {
		// Get options.
		$options                    = Options::get_options();
		$hide_uncategorized_enabled = (bool) $options['hideUncategorizedPatterns'];

		// Exit early if not enabled.
		if ( ! $hide_uncategorized_enabled ) {
			return;
		}

		// Retrieve all patterns.
		$patterns     = \WP_Block_Patterns_Registry::get_instance();
		$all_patterns = $patterns->get_all_registered();

		// Loop through all patterns and deregister any that are uncategorized.
		foreach ( $all_patterns as $index => $pattern ) {
			if ( ! isset( $pattern['categories'] ) || empty( $pattern['categories'] ) ) {
				unregister_block_pattern( $pattern['name'] );
			} else {
				$found            = false;
				$block_categories = $pattern['categories'] ?? array();
				foreach ( $block_categories as $block_category ) {
					$categories = \WP_Block_Pattern_Categories_Registry::get_instance();
					if ( $categories->is_registered( $block_category ) ) {
						$found = true;
					}
				}
				if ( ! $found ) {
					unregister_block_pattern( $pattern['name'] );
				}
			}
		}
	}

	/**
	 * Change any pattern labels that are custom.
	 */
	public function change_pattern_category_labels() {
		$options    = Options::get_options();
		$categories = $options['categories'] ?? array();

		if ( empty( $categories ) ) {
			return;
		}

		// Exclude Ajax requests as this will prevent changing in admin options.
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		// Loop through categories, and unregister slugs if disabled.
		foreach ( $categories as $category ) {
			if ( ! $category['enabled'] ) {
				continue;
			}
			$updated_category      = $category;
			$category_slug         = $category['slug'];
			$category_label        = $category['label'];
			$category_custom_label = $category['customLabel'];

			if ( $category_label !== $category_custom_label && ! empty( $category_custom_label ) ) {
				$updated_category['label'] = $category_custom_label;

				// Re-register it with the updated label.
				register_block_pattern_category( $category_slug, $updated_category );
			}
		}
	}

	/**
	 * Deregister, re-register, and map patterns if disabled.
	 */
	public function maybe_deregister_and_map_patterns() {
		$options             = Options::get_options();
		$categories          = $options['categories'] ?? array();
		$disabled_categories = array();

		$patterns_to_deregister = wp_cache_get( 'dlx_patterns_to_deregister', 'dlx_block_patterns' );
		if ( ! $patterns_to_deregister ) {
			$patterns_to_deregister = array();

			// Get a list of disabled categories and their slugs.
			foreach ( $categories as $category ) {
				$category_slug    = $category['slug'];
				$category_enabled = (bool) $category['enabled'];
				if ( ! $category_enabled ) {
					$disabled_categories[] = $category_slug;
				}
			}

			// Loop through all registered patterns and update the category.
			$patterns     = \WP_Block_Patterns_Registry::get_instance();
			$all_patterns = $patterns->get_all_registered();

			$patterns_to_slugs = array();
			foreach ( $all_patterns as $pattern_index => $pattern ) {
				$pattern_categories                    = $pattern['categories'] ?? array();
				$patterns_to_slugs[ $pattern['name'] ] = $pattern;
				foreach ( $pattern_categories as $index => $pattern_category ) {
					if ( in_array( $pattern_category, $disabled_categories, true ) ) {

						// Reindex.
						$pattern['categories'] = array_values( $pattern['categories'] );

						// Update any mapping.
						$mapped_to_slug = isset( $categories[ $pattern_category ]['mappedTo'] ) ? $categories[ $pattern_category ]['mappedTo'] : 'none';

						// Unset the category.
						unset( $pattern['categories'][ $index ] );

						if ( 'none' !== $mapped_to_slug ) {
							$pattern['categories'][] = $mapped_to_slug;
						}

						// Store the pattern to deregister and reregister.
						$patterns_to_deregister[ $pattern['name'] ] = $pattern;
					}
				}
			}

			wp_cache_set( 'dlx_patterns_to_deregister', $patterns_to_deregister, 'dlx_block_patterns', HOUR_IN_SECONDS );
		}

		// Deregister and re-register patterns.
		foreach ( $patterns_to_deregister as $slug => $pattern ) {

			// Check if category is empty, and if so, map to uncategorized.
			$pattern['categories'] = array_values( array_unique( $pattern['categories'] ) );

			register_block_pattern( $slug, $pattern );
		}
	}

	/**
	 * Deregister pattern categories if disabled.
	 */
	public function maybe_deregister_pattern_categories() {
		$options    = Options::get_options();
		$categories = $options['categories'] ?? array();

		if ( empty( $categories ) ) {
			return;
		}

		// Exclude if doing AJAX.
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		// Loop through categories, and unregister slugs if disabled.
		foreach ( $categories as $category ) {
			$category_slug    = $category['slug'];
			$category_enabled = (bool) $category['enabled'];
			if ( ! $category_enabled ) {
				// Check if registerd.
				$category_registry = \WP_Block_Pattern_Categories_Registry::get_instance();
				if ( $category_registry->is_registered( $category_slug ) ) {
					unregister_block_pattern_category( $category_slug );
				}
			}
		}
	}

	/**
	 * Enqueue scripts for the wp_block post type.
	 *
	 * @param string $hook The current post type page.
	 */
	public function add_post_type_enqueue_scripts( $hook ) {
		$post = get_post();
		// Only proceed if we are on a valid page and the current post is not null.
		if ( 'edit.php' !== $hook || ! $post ) {
			return;
		}

		// Check if the current post type is wp_block.
		if ( 'wp_block' === $post->post_type ) {
			// Load asset file to get dependencies and version.
			$asset_file = Functions::get_plugin_dir( 'dist/dlx-pw-admin.asset.php' );

			// Check if asset file exists and is readable.
			if ( file_exists( $asset_file ) && is_readable( $asset_file ) ) {
				// Retrieve dependencies and version from asset file.
				$deps = require $asset_file;

				// Enqueue script with retrieved dependencies and version.
				wp_enqueue_script(
					'dlx-pw-post-utilities',
					Functions::get_plugin_url( 'dist/dlx-pw-post-utilities.js' ),
					$deps['dependencies'],
					$deps['version'],
					true
				);
			}

			// Enqueue admin styles.
			wp_enqueue_style(
				'dlx-pw-admin-css',
				Functions::get_plugin_url( 'dist/dlx-pw-admin-utils-css.css' ),
				array(),
				Functions::get_plugin_version(),
				'all'
			);
		}
	}
}
