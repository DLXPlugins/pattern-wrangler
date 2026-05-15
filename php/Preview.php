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
		if ( $can_preview_frontend ) {
			// Add a preview button to the quick actions for the wp_block post type.
			add_filter( 'post_row_actions', array( $this, 'add_preview_button_quick_action' ), 10, 2 );

			// Add preview query var to frontend.
			add_filter( 'query_vars', array( $this, 'add_preview_query_var' ) );

			// Override the template for the wp_block post type.
			add_filter( 'template_include', array( $this, 'maybe_override_template' ) );

			// Add a preview for the patterns list view.
			add_action( 'wp_ajax_dlxpw_pattern_preview', array( $this, 'pattern_preview' ) );
		}

		// Block editor toolbar (preview button, pattern code, versions) when preview or versions module is on.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_preview_toolbar_scripts' ) );
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
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_die( 'You do not have permission to preview this pattern.' );
		}

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
		if ( ! $screen || 'wp_block' !== $screen->post_type ) {
			return;
		}

		$options     = Options::get_options();
		$versions_on = ! empty( $options['enableVersionsModule'] );
		$preview_on  = ! empty( $options['allowFrontendPatternPreview'] );

		if ( ! $versions_on && ! $preview_on ) {
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
		wp_enqueue_style(
			'dlx-pw-patterns-editor',
			Functions::get_plugin_url( 'dist/dlx-pw-patterns-editor.css' ),
			array(),
			$deps['version'],
			'all'
		);
		$post             = get_post();
		$post_id          = $post ? absint( $post->ID ) : 0;
		$sync_status_meta = $post_id ? get_post_meta( $post_id, 'wp_pattern_sync_status', true ) : '';
		$sync_status      = ( 'unsynced' === $sync_status_meta ) ? 'unsynced' : 'synced';

		$pattern_categories         = array();
		$current_pattern_cat_labels = array();
		if ( $versions_on ) {
			$terms = get_terms(
				array(
					'taxonomy'   => 'wp_pattern_category',
					'hide_empty' => false,
				)
			);
			if ( ! is_wp_error( $terms ) ) {
				foreach ( $terms as $term ) {
					$pattern_categories[] = array(
						'id'    => absint( $term->term_id ),
						'label' => html_entity_decode( $term->name, ENT_QUOTES, 'UTF-8' ),
						'name'  => sanitize_title( $term->slug ),
					);
				}
			}
			if ( $post_id ) {
				$post_terms = wp_get_post_terms( $post_id, 'wp_pattern_category', array( 'fields' => 'all' ) );
				if ( ! is_wp_error( $post_terms ) ) {
					foreach ( $post_terms as $term ) {
						$current_pattern_cat_labels[] = html_entity_decode( $term->name, ENT_QUOTES, 'UTF-8' );
					}
				}
			}
		}

		wp_localize_script(
			'dlx-pattern-wrangler-preview',
			'dlxPatternWranglerPreview',
			array(
				'previewUrl'                   => $preview_on ? Functions::get_pattern_preview_url( get_the_ID() ) : '',
				'showFrontendPreviewButton'    => $preview_on,
				'pattern'                      => array(
					'id'         => $post_id ? absint( $post_id ) : 0,
					'slug'       => $post ? sanitize_title( $post->post_name ) : '',
					'syncStatus' => sanitize_text_field( $sync_status ),
					'siteId'     => absint( get_current_blog_id() ),
					'title'      => $post ? $post->post_title : '',
				),
				'isMultisite'                  => is_multisite(),
				'syncedPatternPopupsActive'    => Functions::is_activated( 'synced-pattern-popups/sppopups.php' ),
				'syncedPatternPopupsUrl'       => esc_url_raw( admin_url( 'themes.php?page=simplest-popup-patterns' ) ),
				'versions'                     => array(
					'enabled' => $versions_on,
				),
				'restUrl'                      => untrailingslashit( Functions::get_rest_url( 'dlxplugins/pattern-wrangler/v1' ) ),
				'createNonce'                  => wp_create_nonce( 'dlx-pw-patterns-view-create-pattern' ),
				'createVersionNonce'           => wp_create_nonce( 'dlx-pw-versions-create-version-' . $post_id ),
				'getSiteBaseUrl'               => admin_url(),
				'patternCategories'            => $pattern_categories,
				'currentPatternCategoryLabels' => $current_pattern_cat_labels,
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
