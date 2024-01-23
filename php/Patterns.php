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
		
	}
}
