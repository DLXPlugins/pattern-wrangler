<?php
/**
 * Preview class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

/**
 * Preview class.
 */
class Preview {

	/**
	 * Class runner.
	 */
	public function run() {
		$options              = Options::get_options();
		$can_preview_frontend = (bool) $options['allowFrontendPatternPreview'];
		if ( ! $can_preview_frontend ) {
			return;
		}
		// Add a preview button to the quick actions for the wp_block post type.
		add_filter( 'post_row_actions', array( $this, 'add_preview_button_quick_action' ), 10, 2 );

		// Add preview query var to frontend.
		add_filter( 'query_vars', array( $this, 'add_preview_query_var' ) );

		// Override the template for the wp_block post type.
		add_filter( 'template_include', array( $this, 'maybe_override_template' ) );
	}

	/**
	 * Override the template for the wp_block post type.
	 *
	 * @param string $template Template path.
	 *
	 * @return string Updated path.
	 */
	public function maybe_override_template( $template ) {
		$preview = get_query_var( 'dlxpw_preview' );
		if ( ! $preview ) {
			return $template;
		}
		$template = Functions::get_plugin_dir( 'templates/pattern.php' );
		return $template;
	}

	/**
	 * Add preview query var to frontend.
	 *
	 * @param array $query_vars Array of query vars.
	 *
	 * @return array updated query vars.
	 */
	public function add_preview_query_var( $query_vars ) {
		$query_vars[] = 'dlxpw_preview';
		return $query_vars;
	}

	/**
	 * Add a preview button to the quick actions for the wp_block post type.
	 *
	 * @param array   $actions Array of actions.
	 * @param WP_Post $post Post object.
	 *
	 * @return array
	 */
	public function add_preview_button_quick_action( $actions, $post ) {
		if ( 'wp_block' === $post->post_type ) {
			$actions['preview_pattern'] = sprintf(
				'<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
				esc_url_raw( Functions::get_pattern_preview_url( $post->ID ) ),
				esc_html__( 'Preview', 'dlx-pattern-wrangler' )
			);
		}
		return $actions;
	}
}
