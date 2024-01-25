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
		// Deregister any disabled pattern categories.
		add_action( 'init', array( $this, 'maybe_deregister_pattern_categories' ), 999 );

		// Map any disabled patterns to uncategorized or custom category.
		add_action( 'init', array( $this, 'maybe_deregister_and_map_patterns' ), 1000 );

		// Change pattern category labels.
		add_action( 'init', array( $this, 'change_pattern_category_labels' ), 1001 );

		// Deregister any patterns that are uncategorized.
		add_action( 'init', array( $this, 'maybe_deregister_uncategorized_patterns' ), 1002 );

		// Modify term query in REST to disable any deactivated terms.
		add_filter( 'rest_wp_pattern_category_query', array( $this, 'modify_term_query' ), 10, 2 );

		/**
		 * Filters WP_Query arguments when querying posts via the REST API.
		 *
		 * The dynamic portion of the hook name, `$this->post_type`, refers to the post type slug.
		 *
		 * Possible hook names include:
		 *
		 *  - `rest_post_query`
		 *  - `rest_page_query`
		 *  - `rest_attachment_query`
		 *
		 * Enables adding extra arguments or setting defaults for a post collection request.
		 *
		 * @since 4.7.0
		 * @since 5.7.0 Moved after the `tax_query` query arg is generated.
		 *
		 * @link https://developer.wordpress.org/reference/classes/wp_query/
		 *
		 * @param array           $args    Array of arguments for WP_Query.
		 * @param WP_REST_Request $request The REST API request.
		 */
		// $args       = apply_filters( "rest_{$this->post_type}_query", $args, $request );
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
				unregister_block_pattern( $pattern['slug'] );
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
}
