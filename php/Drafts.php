<?php
/**
 * Drafts class. Useful for switching to draft/undraft.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

/**
 * Drafts class.
 */
class Drafts {

	/**
	 * Class runner.
	 */
	public function run() {
		// Add a draft/publish button to the quick actions for the wp_block post type.
		add_filter( 'post_row_actions', array( $this, 'add_draft_button_quick_action' ), 10, 2 );

		// Intercept draft/publish actions.
		add_action( 'admin_init', array( $this, 'intercept_draft_publish' ) );

		// Add an admin notice when a pattern is unpublished or published.
		add_action( 'admin_notices', array( $this, 'add_admin_notice' ) );
	}

	/**
	 * Add an admin notice when a pattern is unpublished or published.
	 */
	public function add_admin_notice() {
		$notice_action = sanitize_text_field( filter_input( INPUT_GET, 'notice_action', FILTER_DEFAULT ) );
		if ( ! $notice_action ) {
			return;
		}
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}
		$notice_message = '';
		switch ( $notice_action ) {
			case 'draft_pattern':
				$notice_message = esc_html__( 'Pattern unpublished.', 'pattern-wrangler' );
				break;
			case 'publish_pattern':
				$notice_message = esc_html__( 'Pattern published.', 'pattern-wrangler' );
				break;
		}
		printf(
			'<div class="notice notice-success is-dismissible"><p>%s</p></div>',
			esc_html( $notice_message )
		);
	}

	/**
	 * Intercept draft/publish actions.
	 */
	public function intercept_draft_publish() {
		$action  = sanitize_text_field( filter_input( INPUT_GET, 'action', FILTER_DEFAULT ) );
		$nonce   = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ) );
		$post_id = absint( filter_input( INPUT_GET, 'post', FILTER_DEFAULT ) );

		if ( ! $action ) {
			return;
		}
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}
		$notice_action = 'draft_pattern';
		switch ( $action ) {
			case 'draft_pattern':
				if ( ! wp_verify_nonce( $nonce, 'draft-pattern_' . $post_id ) ) {
					return;
				}
				wp_update_post(
					array(
						'ID'          => $post_id,
						'post_status' => 'draft',
					)
				);
				break;
			case 'publish_pattern':
				if ( ! wp_verify_nonce( $nonce, 'publish-pattern_' . $post_id ) ) {
					return;
				}
				$notice_action = 'publish_pattern';
				wp_update_post(
					array(
						'ID'          => $post_id,
						'post_status' => 'publish',
					)
				);
				break;
			default:
				return;
		}

		// Build redirect URL.
		$redirect_url = add_query_arg(
			array(
				'post_type'     => 'wp_block',
				'notice_action' => $notice_action,
			),
			admin_url( 'edit.php' )
		);
		wp_safe_redirect( esc_url_raw( $redirect_url ) );
		exit;
	}

	/**
	 * Add a draft button to the quick actions for the wp_block post type.
	 *
	 * @param array   $actions Array of actions.
	 * @param WP_Post $post Post object.
	 *
	 * @return array
	 */
	public function add_draft_button_quick_action( $actions, $post ) {
		if ( 'wp_block' !== $post->post_type ) {
			return $actions;
		}
		if ( ! current_user_can( 'edit_posts' ) ) {
			return $actions;
		}
		$draft_disable_url = add_query_arg(
			array(
				'action' => 'draft_pattern',
				'nonce'  => wp_create_nonce( 'draft-pattern_' . $post->ID ),
				'post'   => $post->ID,
			),
			admin_url( 'edit.php?post_type=wp_block' )
		);
		$draft_publish_url = add_query_arg(
			array(
				'action' => 'publish_pattern',
				'nonce'  => wp_create_nonce( 'publish-pattern_' . $post->ID ),
				'post'   => $post->ID,
			),
			admin_url( 'edit.php?post_type=wp_block' )
		);
		if ( 'draft' === $post->post_status ) {
			$actions['draft_pattern'] = sprintf(
				'<a href="%s">%s</a>',
				esc_url_raw( $draft_publish_url ),
				esc_html__( 'Publish', 'pattern-wrangler' )
			);
		}
		if ( 'publish' === $post->post_status ) {
			$actions['preview_pattern'] = sprintf(
				'<a href="%s">%s</a>',
				esc_url_raw( $draft_disable_url ),
				esc_html__( 'Switch to Draft', 'pattern-wrangler' )
			);
		}
		return $actions;
	}
}
