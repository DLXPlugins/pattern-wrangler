<?php
/**
 * Set up the blocks and their attributes.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

/**
 * Helper class for registering blocks.
 */
class Blocks {

	/**
	 * Main class runner.
	 *
	 * @return Blocks.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( $self, 'init' ) );
		add_action( 'rest_api_init', array( $self, 'init_rest_api' ) );
		return $self;
	}

	/**
	 * Register the rest routes needed.
	 */
	public function init_rest_api() {
		register_rest_route(
			'dlxplugins/pattern-wrangler/v1',
			'/process_image',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_add_remote_image' ),
				'permission_callback' => array( $this, 'rest_image_sideload_permissions' ),
			)
		);
	}

	/**
	 * Process a list of images for a pattern.
	 *
	 * @param WP_Rest $request REST request.
	 */
	public function rest_add_remote_image( $request ) {
		$image_url = filter_var( $request->get_param( 'imgUrl' ), FILTER_VALIDATE_URL );
		$image_alt = sanitize_text_field( $request->get_param( 'imgAlt' ) );

		if ( $image_url ) {
			// Check file extension.
			$extension = pathinfo( $image_url, PATHINFO_EXTENSION );

			// Strip query vars from extension.
			$extension = preg_replace( '/\?.*/', '', $extension );

			// Get current domain.
			$domain = parse_url( $image_url, PHP_URL_HOST );

			// If we're on same domain, bail successfully.
			if ( $domain === $_SERVER['HTTP_HOST'] ) {
				\wp_send_json_success(
					array(
						'attachmentId'  => 0,
						'attachmentUrl' => esc_url( $image_url ),
					)
				);
			}

			if ( ! $extension ) {
				\wp_send_json_error(
					array(
						'message' => __( 'File extension not found.', 'dlx-pattern-wrangler' ),
					),
					400
				);
			}
			$valid_extensions = Functions::get_supported_file_extensions();
			if ( ! in_array( $extension, $valid_extensions, true ) ) {
				\wp_send_json_error(
					array(
						'message' => __( 'Invalid file extension.', 'dlx-pattern-wrangler' ),
					),
					400
				);
			}

			// Save the image to the media library.
			if ( ! function_exists( 'media_sideload_image' ) ) {
				require_once ABSPATH . 'wp-admin/includes/image.php';
				require_once ABSPATH . 'wp-admin/includes/file.php';
				require_once ABSPATH . 'wp-admin/includes/media.php';
			}
			$attachment_id = media_sideload_image( $image_url, 0, '', 'id' );

			// Add order to attachment.
			if ( ! is_wp_error( $attachment_id ) ) {

				// Get attachment URL.
				$attachment_url_src = wp_get_attachment_image_src( $attachment_id, 'full' );
				$attachment_url     = $attachment_url_src[0];

				// Update alt attribute.
				update_post_meta( $attachment_id, '_wp_attachment_image_alt', $image_alt );

				// Send success.
				\wp_send_json_success(
					array(
						'attachmentId'  => absint( $attachment_id ),
						'attachmentUrl' => esc_url( $attachment_url ),
					)
				);
			} else {
				\wp_send_json_error(
					array(
						'message' => $attachment_id->get_error_message(),
					),
					400
				);
			}
		}
		\wp_send_json_error(
			array(
				'message' => __( 'Invalid image URL.', 'dlx-pattern-wrangler' ),
			),
			400
		);
	}

	/**
	 * Check if user has access to REST API for retrieving and sideloading images.
	 */
	public function rest_image_sideload_permissions() {
		return current_user_can( 'publish_posts' );
	}

	/**
	 * Init action callback.
	 */
	public function init() {

		register_block_type(
			Functions::get_plugin_dir( 'build/js/blocks/pattern-importer/block.json' ),
			array(
				'render_callback' => '__return_empty_string',
			)
		);

		// Enqueue block assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_block_editor_scripts' ) );
	}

	/**
	 * Register the block editor script with localized vars.
	 */
	public function register_block_editor_scripts() {

		$deps = require_once Functions::get_plugin_dir( 'build/index.asset.php' );

		wp_register_script(
			'dlx-pw-pattern-inserter-block',
			Functions::get_plugin_url( 'build/index.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);

		wp_localize_script(
			'dlx-pw-pattern-inserter-block',
			'dlxPWPatternInserter',
			array(
				'restUrl'                     => rest_url( 'dlxplugins/pattern-wrangler/v1' ),
				'restNonce'                   => wp_create_nonce( 'wp_rest' ),
			)
		);
	}
}
