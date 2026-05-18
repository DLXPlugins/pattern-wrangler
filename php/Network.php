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
	 * Clear network pattern cache.
	 *
	 * @param int|null $post_id (Optional) The post ID.
	 */
	public static function clear_network_pattern_cache( $post_id = null ) {
		Functions::clear_network_pattern_cache();
	}
}
