<?php
/**
 * Plugin Name:       Pattern Wrangler
 * Plugin URI:        https://dlxplugins.com/plugins/pattern-wrangler/
 * Description:       Manage your block patterns.
 * Version:           2.0.0-RC2
 * Requires at least: 6.5
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pattern-wrangler
 * Network:           true
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

require_once __DIR__ . '/functions.php';

define( 'DLXPW_PATTERN_WRANGLER_VERSION', '2.0.0-RC2' );
define( 'DLXPW_PATTERN_WRANGLER_FILE', __FILE__ );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * PatternWrangler class.
 */
class PatternWrangler {

	/**
	 * Holds the class instance.
	 *
	 * @var PatternWrangler $instance
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the ReflectorDLX Class.
	 *
	 * @since 1.0.0
	 *
	 * @return PatternWrangler class instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class initializer.
	 */
	public function plugins_loaded() {

		$admin = new Admin();
		$admin->run();

		$patterns = new Patterns();
		$patterns->run();

		$drafts = new Drafts();
		$drafts->run();

		$preview = new Preview();
		$preview->run();

		$rest = new Rest();
		$rest->run();

		if ( Functions::is_multisite( true ) ) {
			$network_admin = new Network_Admin();
			$network_admin->run();
		}

		// Determine if blocks can run or not.
		$options            = Options::get_options();
		$can_disable_blocks = ! (bool) $options['disablePatternImporterBlock'];
		if ( ! $can_disable_blocks ) {
			$blocks = new Blocks();
			$blocks->run();
		}

		/**
		 * When PatternWrangler can be extended.
		 *
		 * Filter when PatternWrangler can be extended.
		 *
		 * @since 1.0.0
		 */
		do_action( 'dlxplugins_pw_loaded' );
	}

	/**
	 * Init all the things.
	 */
	public function init() {

		// Nothing here yet.
	}
}

class RonBlocks extends \WP_REST_Blocks_Controller {

}

function ron_blocks_prepare_item_for_response( $response, $post, $request ) {
	$id   = (int) $request['id'];
	$post = get_post( $id );
	if ( ! $post || $post->post_type !== 'wp_block' ) {
		switch_to_blog( 1 );
		$post = get_post( $id );
		restore_current_blog();
	}

	$ron_blocks = new RonBlocks();
	if ( $post ) {
		$response = $ron_blocks->prepare_item_for_response( $post, $request );
		$response = rest_ensure_response( $response );
		return $response;
	} else {
		return new WP_Error( 'block_not_found', 'Block not found', array( 'status' => 404 ) );
	}
}

add_action(
	'plugins_loaded',
	function () {
		$pattern_wrangler = PatternWrangler::get_instance();
		$pattern_wrangler->plugins_loaded();
	}
);

add_filter(
	'rest_endpoints',
	function ( $endpoints ) {
		return $endpoints;
		$route = '/wp/v2/blocks/(?P<id>[\d]+)';
		if ( empty( $endpoints[ $route ] ) ) {
			return $endpoints;
		}

		foreach ( $endpoints[ $route ] as $i => $def ) {
			if ( empty( $def['callback'] ) ) {
				continue;
			}

			// Normalize: is this a READABLE (GET) endpoint?
			$methods     = isset( $def['methods'] ) ? $def['methods'] : 0;
			$is_readable = is_int( $methods )
			? (bool) ( $methods & \WP_REST_Server::READABLE )
			: ( false !== strpos( (string) $methods, 'GET' ) );

			if ( ! $is_readable ) {
				continue;
			}

			$orig_cb   = $def['callback'];
			$orig_perm = isset( $def['permission_callback'] ) ? $def['permission_callback'] : '__return_true';

			// 1) Wrap permission check so our callback can run even if the local block is missing.
			$endpoints[ $route ][ $i ]['permission_callback'] = function ( \WP_REST_Request $request ) use ( $orig_perm ) {
				$perm = call_user_func( $orig_perm, $request );

				// If core denies because the local block/ID isn't valid,
				// allow editors so we can proxy from the mothership.
				if ( is_wp_error( $perm ) && $perm->get_error_code() === 'rest_post_invalid_id' ) {
					return current_user_can( 'edit_posts' );
				}

				return $perm;
			};

			// 2) Replace the route callback. IMPORTANT: accept only WP_REST_Request.
			$endpoints[ $route ][ $i ]['callback'] = function ( \WP_REST_Request $request ) use ( $orig_cb ) {
				$id   = (int) $request['id'];
				$post = get_post( $id );

				// If the block doesn't exist locally, try the mothership (site 1).
				if ( ! $post || 'wp_block' !== $post->post_type ) {
					switch_to_blog( 1 );
					$remote = get_post( $id );

					if ( $remote && $remote->post_type === 'wp_block' ) {
						$controller = new \WP_REST_Blocks_Controller( 'wp_block' ); // has wp_block type baked in
						$response   = $controller->prepare_item_for_response( $remote, $request );
						restore_current_blog();

						return rest_ensure_response( $response );
					}

					restore_current_blog();
					// Fall through to original if nothing found remotely.
				}

				// Default: original behavior.
				return call_user_func( $orig_cb, $request );
			};
		}

		return $endpoints;
	},
	20
);

/**
 * Frontend fallback for reusable blocks across Multisite.
 * If a core/block {"ref":ID} isn't found locally, we try site #1.
 */
add_filter(
	'pre_render_block',
	function ( $pre_render, $parsed_block ) {
		return $pre_render;
		// Only intercept reusable blocks.
		if ( empty( $parsed_block['blockName'] ) || 'core/block' !== $parsed_block['blockName'] ) {
			return $pre_render; // continue normal rendering
		}

		$ref = isset( $parsed_block['attrs']['ref'] ) ? (int) $parsed_block['attrs']['ref'] : 0;
		if ( ! $ref ) {
			return $pre_render;
		}

		// If it exists locally, let core handle it.
		$local = get_post( $ref );
		if ( $local && 'wp_block' === $local->post_type ) {
			return $pre_render; // allow default render
		}

		// Prevent infinite recursion (e.g., a block referencing itself).
		static $render_stack = array();
		if ( isset( $render_stack[ $ref ] ) ) {
			return ''; // bail hard; cyclic reference detected
		}
		$render_stack[ $ref ] = true;

		// Per-request memoization to avoid multiple switches for the same ref.
		static $html_cache = array();
		if ( isset( $html_cache[ $ref ] ) ) {
			unset( $render_stack[ $ref ] );
			return $html_cache[ $ref ];
		}

		$html = '';

		// Try mothership (site 1).
		switch_to_blog( 1 );
		$remote = get_post( $ref );

		if ( $remote && 'wp_block' === $remote->post_type ) {
			// Mirror core's reusable-block render: parse + render its inner content.
			$blocks = parse_blocks( $remote->post_content );
			foreach ( $blocks as $b ) {
				$html .= render_block( $b ); // this will recurse and trigger this filter again if needed
			}
		}
		restore_current_blog();

		// Optional: if still empty, you could render a placeholder or comment.
		// $html = $html ?: '<!-- missing reusable block ' . esc_html( $ref ) . ' -->';

		$html_cache[ $ref ] = $html;
		unset( $render_stack[ $ref ] );

		// Returning a string from pre_render_block short-circuits core's renderer.
		return $html ?? $pre_render;
	},
	10,
	2
);
