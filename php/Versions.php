<?php
/**
 * Pattern versions (checkpoints) post type registration.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Registers and wires the pw_versions post type.
 */
class Versions {

	/**
	 * Post type slug for stored checkpoints.
	 */
	public const POST_TYPE = 'pw_versions';

	/**
	 * Core pattern sync meta key (same as wp_block). Value 'unsynced' means unsynced; meta absent means synced.
	 */
	public const PATTERN_SYNC_STATUS_META_KEY = 'wp_pattern_sync_status';

	/**
	 * Bootstrap hooks.
	 *
	 * @return void
	 */
	public function run() {
		add_action( 'init', array( $this, 'register_post_type' ), 6 );
		add_action( 'init', array( $this, 'register_pattern_category_for_versions' ), 7 );
	}

	/**
	 * Use core wp_pattern_category taxonomy on version checkpoints (same as wp_block).
	 *
	 * @return void
	 */
	public function register_pattern_category_for_versions() {
		if ( ! taxonomy_exists( 'wp_pattern_category' ) ) {
			return;
		}
		register_taxonomy_for_object_type( 'wp_pattern_category', self::POST_TYPE );
	}

	/**
	 * Register the pw_versions post type.
	 *
	 * @return void
	 */
	public function register_post_type() {
		$labels = array(
			'name'          => __( 'Pattern versions', 'pattern-wrangler' ),
			'singular_name' => __( 'Pattern version', 'pattern-wrangler' ),
		);

		$args = array(
			'labels'              => $labels,
			'description'         => __( 'Checkpoints for block patterns.', 'pattern-wrangler' ),
			'public'              => false,
			'publicly_queryable'  => false,
			'show_ui'             => false,
			'show_in_menu'        => false,
			'show_in_admin_bar'   => false,
			'show_in_nav_menus'   => false,
			'show_in_rest'        => false,
			'exclude_from_search' => true,
			'capability_type'     => 'post',
			'map_meta_cap'        => true,
			'hierarchical'        => false,
			'supports'            => array( 'title', 'editor', 'excerpt', 'author' ),
			'has_archive'         => false,
			'rewrite'             => false,
			'query_var'           => false,
			'can_export'          => false,
		);

		/**
		 * Filter registration args for the pattern versions post type.
		 *
		 * @param array $args Post type arguments.
		 */
		$args = apply_filters( 'dlx_pw_register_pw_versions_args', $args );

		register_post_type( self::POST_TYPE, $args );
	}
}
