<?php
/**
 * Preview class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

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

		// Add a preview button to the top toolbar section.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_preview_toolbar_scripts' ) );

		// Add a preview for the patterns list view.
		add_action( 'wp_ajax_dlxpw_pattern_preview', array( $this, 'pattern_preview' ) );
	}

	/**
	 * Get the pattern preview HTML.
	 */
	public function pattern_preview() {
		$pattern_id = Functions::get_sanitized_pattern_id( filter_input( INPUT_GET, 'pattern_id', FILTER_UNSAFE_RAW ) );
		if ( 0 === $pattern_id ) {
			die( 'Invalid pattern ID.' );
		}
		add_filter(
			'dlxpw_pattern_preview_id',
			function () use ( $pattern_id ) {
				return urlencode( $pattern_id );
			}
		);

		add_filter(
			'dlxpw_pattern_preview_nonce',
			function () use ( $pattern_id ) {
				return wp_create_nonce( 'preview-pattern_' . $pattern_id );
			}
		);

		// Get the pattern preview HTML.
		ob_start();
		load_template( Functions::get_plugin_dir( 'templates/pattern-preview.php' ), false );
		$html = ob_get_clean();

		echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		wp_die();
	}

	/**
	 * Enqueue the preview toolbar scripts.
	 */
	public function enqueue_preview_toolbar_scripts() {
		$screen = get_current_screen();
		if ( 'wp_block' !== $screen->post_type ) {
			return;
		}
		$deps = require_once Functions::get_plugin_dir( 'build/dlx-pw-preview.asset.php' );
		wp_enqueue_script(
			'dlx-pattern-wrangler-preview',
			Functions::get_plugin_url( 'build/dlx-pw-preview.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
		wp_localize_script(
			'dlx-pattern-wrangler-preview',
			'dlxPatternWranglerPreview',
			array(
				'previewUrl' => Functions::get_pattern_preview_url( get_the_ID() ),
			)
		);
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
				esc_html__( 'Preview', 'pattern-wrangler' )
			);
		}
		return $actions;
	}
}
