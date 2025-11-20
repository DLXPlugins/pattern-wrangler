<?php
/**
 * Functions for the plugin.
 *
 * @package PatternWrangler
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

use DLXPlugins\PatternWrangler\Patterns;

/**
 * Display a block pattern.
 *
 * @param string $slug The slug of the pattern to display.
 * @param int    $site_id The site ID to display the pattern on.
 * @param bool   $echo_output Whether to echo the output or return it.
 * @return string The pattern HTML.
 */
function pw_wp_block( $slug, $site_id = 1, $echo_output = false ) {
	$block_content = Patterns::get_instance()->shortcode_pattern_callback(
		array(
			'slug'    => $slug,
			'site_id' => $site_id,
		)
	);
	if ( $echo_output ) {
		echo wp_kses_post( $block_content );
	}
	return $block_content;
}
