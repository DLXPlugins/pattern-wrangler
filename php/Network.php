<?php
/**
 * Network class and helpers.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Network Admin class.
 */
class Network {

	/**
	 * Initialize post actions. Intended to be called from a class instance.
	 */
	public function init_post_actions() {
		add_action( 'save_post_wp_block', array( self::class, 'clear_network_pattern_cache' ) );
		add_action( 'trashed_post', array( self::class, 'clear_network_pattern_cache' ) );
		add_action( 'untrashed_post', array( self::class, 'clear_network_pattern_cache' ) );
		add_action( 'before_delete_post', array( self::class, 'clear_network_pattern_cache' ) );
		add_action( 'deleted_post', array( self::class, 'clear_network_pattern_cache' ) );
		add_action( 'publish_post', array( self::class, 'clear_network_pattern_cache' ) );
	}

	/**
	 * Register network-only create restrictions on all sites in the network.
	 *
	 * @return void
	 */
	public static function init_restrictions() {
		if ( ! Functions::is_multisite( false ) ) {
			return;
		}

		add_filter( 'map_meta_cap', array( self::class, 'map_meta_cap' ), 10, 4 );
		add_filter( 'pre_insert_term', array( self::class, 'filter_pre_insert_term' ), 10, 2 );
		add_filter( 'rest_pre_insert_wp_block', array( self::class, 'filter_rest_pre_insert_wp_block' ), 10, 2 );
		add_action( 'load-post-new.php', array( self::class, 'maybe_block_wp_block_post_new' ) );
		add_action( 'admin_menu', array( self::class, 'maybe_block_admin_menu' ), 101 );
	}

	/**
	 * Maybe block the admin menu.
	 *
	 * @return void
	 */
	public static function maybe_block_admin_menu() {
		if ( ! Functions::is_multisite( false ) ) {
			return;
		}

		if ( ! self::can_create_local_patterns() ) {
			$options              = Options::get_options();
			$enable_enhanced_view = (bool) $options['enableEnhancedView'] ?? false;
			if ( ! $enable_enhanced_view ) {
				remove_menu_page( 'edit.php?post_type=wp_block' );
				remove_menu_page( 'edit-tags.php?taxonomy=wp_pattern_category&post_type=wp_block' );
				$admin = new Admin();
				$hook  = add_options_page(
					__( 'Patterns', 'pattern-wrangler' ),
					__( 'Patterns', 'pattern-wrangler' ),
					'manage_options',
					'pattern-wrangler',
					array( $admin, 'admin_page' ),
					6
				);
				add_action( 'admin_print_scripts-' . $hook, array( $admin, 'enqueue_admin_scripts' ) );
			}
		}

		return;
	}

	/**
	 * Whether the site may create local patterns and pattern categories.
	 *
	 * @param int|null $site_id Optional site ID. Defaults to current blog.
	 * @return bool
	 */
	public static function can_create_local_patterns( $site_id = null ) {
		if ( ! Functions::is_multisite( false ) ) {
			return true;
		}

		$site_id = null === $site_id ? get_current_blog_id() : absint( $site_id );
		if ( $site_id <= 0 ) {
			return true;
		}

		$mothership_id = Functions::get_network_default_patterns_site_id();
		if ( $mothership_id === $site_id ) {
			return true;
		}

		if ( 'network_only' !== Functions::get_network_pattern_configuration( $site_id ) ) {
			return true;
		}

		/**
		 * Filter whether local patterns and categories can be created on a site.
		 *
		 * @param bool $can_create Whether creation is allowed.
		 * @param int  $site_id    Site ID.
		 */
		return (bool) apply_filters( 'dlx_pw_can_create_local_patterns', false, $site_id );
	}

	/**
	 * Return a REST-friendly error when local creation is forbidden.
	 *
	 * @param int|null $site_id Optional site ID.
	 * @return \WP_Error|null Null when creation is allowed.
	 */
	public static function assert_can_create_local_patterns( $site_id = null ) {
		if ( self::can_create_local_patterns( $site_id ) ) {
			return null;
		}

		return new \WP_Error(
			'dlx_pw_network_only_create_forbidden',
			__( 'Local patterns and categories cannot be created on this site while network-only pattern configuration is in effect.', 'pattern-wrangler' ),
			array( 'status' => 403 )
		);
	}

	/**
	 * Restrict capabilities that would create wp_block posts.
	 *
	 * @param array  $caps    Required capabilities.
	 * @param string $cap     Capability name.
	 * @param int    $user_id User ID.
	 * @param array  $args    Capability arguments.
	 * @return array
	 */
	public static function map_meta_cap( $caps, $cap, $user_id, $args ) {
		if ( self::can_create_local_patterns() ) {
			return $caps;
		}

		if ( 'create_posts' === $cap && ! empty( $args[0] ) && 'wp_block' === $args[0] ) {
			return array( 'do_not_allow' );
		}

		return $caps;
	}

	/**
	 * Block creating wp_block posts via the core REST API.
	 *
	 * @param \stdClass        $prepared_post Prepared post object.
	 * @param \WP_REST_Request $request       REST request.
	 * @return \stdClass|\WP_Error
	 */
	public static function filter_rest_pre_insert_wp_block( $prepared_post, $request ) {
		if ( self::can_create_local_patterns() ) {
			return $prepared_post;
		}

		if ( $request->get_param( 'id' ) ) {
			return $prepared_post;
		}

		$error = self::assert_can_create_local_patterns();
		if ( $error ) {
			return $error;
		}

		return $prepared_post;
	}

	/**
	 * Block inserting local pattern categories when network-only applies.
	 *
	 * @param string|\WP_Error $term     Term name or error.
	 * @param string           $taxonomy Taxonomy slug.
	 * @return string|\WP_Error
	 */
	public static function filter_pre_insert_term( $term, $taxonomy ) {
		if ( 'wp_pattern_category' !== $taxonomy || self::can_create_local_patterns() ) {
			return $term;
		}

		return new \WP_Error(
			'dlx_pw_network_only_create_forbidden',
			__( 'Local pattern categories cannot be created on this site while network-only pattern configuration is in effect.', 'pattern-wrangler' ),
			array( 'status' => 403 )
		);
	}

	/**
	 * Block the core new-pattern screen on restricted subsites.
	 *
	 * @return void
	 */
	public static function maybe_block_wp_block_post_new() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$post_type = isset( $_GET['post_type'] ) ? sanitize_key( wp_unslash( $_GET['post_type'] ) ) : '';
		if ( 'wp_block' !== $post_type || self::can_create_local_patterns() ) {
			return;
		}

		wp_die(
			esc_html__(
				'Local patterns cannot be created on this site while network-only pattern configuration is in effect.',
				'pattern-wrangler'
			),
			esc_html__( 'Pattern creation disabled', 'pattern-wrangler' ),
			array( 'response' => 403 )
		);
	}

	/**
	 * Clear network pattern cache.
	 *
	 * @param int|null $post_id (Optional) The post ID.
	 */
	public static function clear_network_pattern_cache( $post_id = null ) {
		Functions::clear_network_pattern_cache();
	}
}
