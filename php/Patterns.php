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
		add_action( 'init', array( $this, 'register_local_patterns_post_type' ) );
	}

	/**
	 * Register the local patterns post type.
	 */
	public function register_local_patterns_post_type() {
		$labels = array(
			'name'               => _x( 'Local Patterns', 'post type general name', 'dlx-pattern-wrangler' ),
			'singular_name'      => _x( 'Local Pattern', 'post type singular name', 'dlx-pattern-wrangler' ),
			'menu_name'          => _x( 'Local Patterns', 'admin menu', 'dlx-pattern-wrangler' ),
			'name_admin_bar'     => _x( 'Local Pattern', 'add new on admin bar', 'dlx-pattern-wrangler' ),
			'add_new'            => _x( 'Add New', 'pattern', 'dlx-pattern-wrangler' ),
			'add_new_item'       => __( 'Add New Local Pattern', 'dlx-pattern-wrangler' ),
			'new_item'           => __( 'New Local Pattern', 'dlx-pattern-wrangler' ),
			'edit_item'          => __( 'Edit Local Pattern', 'dlx-pattern-wrangler' ),
			'view_item'          => __( 'View Local Pattern', 'dlx-pattern-wrangler' ),
			'all_items'          => __( 'All Local Patterns', 'dlx-pattern-wrangler' ),
			'search_items'       => __( 'Search Local Patterns', 'dlx-pattern-wrangler' ),
			'parent_item_colon'  => __( 'Parent Local Patterns:', 'dlx-pattern-wrangler' ),
			'not_found'          => __( 'No Local Patterns found.', 'dlx-pattern-wrangler' ),
			'not_found_in_trash' => __( 'No Local Patterns found in Trash.', 'dlx-pattern-wrangler' ),
		);

		$args = array(
			'labels'              => $labels,
			'description'         => __( 'Description.', 'dlx-pattern-wrangler' ),
			'public'              => true,
			'exclude_from_search' => true,
			'show_in_nav_menus'   => false,
			'show_in_admin_bar'   => false,
			'show_in_rest'        => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_menu'        => false,
			'query_var'           => true,
			'rewrite'             => array(
				'slug'       => 'pw-pattern',
				'with_front' => false,
			),
			'capability_type'     => 'post',
			'has_archive'         => false,
			'hierarchical'        => false,
			'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'revisions' ),
		);

		register_post_type( 'pw_pattern', $args );
	}
}
