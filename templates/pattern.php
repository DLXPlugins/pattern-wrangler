<?php
/**
 * Preview a block pattern on the frontend.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}
if ( ! current_user_can( 'edit_posts' ) ) {
	die( 'You do not have permission to preview this pattern.' );
}
$nonce      = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) );
$pattern_id = absint( filter_input( INPUT_GET, 'pattern', FILTER_SANITIZE_SPECIAL_CHARS ) );
if ( ! wp_verify_nonce( $nonce, 'preview-pattern_' . $pattern_id ) ) {
	die( 'Invalid nonce.' );
}

// Perform query.
global $wp_query;
$temp     = $wp_query;
$wp_query = new \WP_Query(
	array(
		'p'         => $pattern_id,
		'post_type' => 'wp_block',
	)
);
if ( ! $wp_query->have_posts() ) {
	die( 'Pattern not found.' );
} else {
	$wp_query->the_post();
}

/**
 * Action to output custom actions.
 */
do_action( 'dlxpw_preview_actions' );

// Get header if theme is not FSE theme.
if ( ! wp_is_block_theme() ) {
	$blocks       = do_blocks( $wp_query->post->post_content );
	$current_post = $wp_query->post;

	/**
	 * Filter to use default header or not.
	 *
	 * @since 1.1.0
	 */
	$use_default_header = apply_filters( 'dlxpw_use_default_header', true );
	if ( ! $use_default_header ) {
		/**
		 * Action to output custom header.
		 */
		do_action( 'dlxpw_default_header' );
	} else {
		get_header();
	}
	\setup_postdata( $current_post );
	the_content();
} else {
	?>
	<!doctype html>
	<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<?php
		// Need to do blocks in head tag for block styles to be output.
		$blocks = do_blocks( $wp_query->post->post_content );
		?>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<div class="wp-site-blocks">
	<header class="wp-block-template-part site-header">
		<?php block_header_area(); ?>
	</header>
	<?php
	the_content();
	?>
	<?php
}

// Render block pattern here.

// Get footer if theme is not FSE theme.
if ( ! wp_is_block_theme() ) {
	/**
	 * Filter to use default footer or not.
	 *
	 * @since 1.1.0
	 */
	$use_default_footer = apply_filters( 'dlxpw_use_default_footer', true );

	if ( ! $use_default_header ) {
		/**
		 * Action to output custom footer.
		 */
		do_action( 'dlxpw_default_footer' );
	} else {
		get_footer();
	}
} else {
	?>
	<footer class="wp-block-template-part site-footer">
		<?php block_footer_area(); ?>
	</footer>
	<?php wp_footer(); ?>
	</div>
	</body>
	</html>
	<?php
}
$wp_query = $temp;
wp_reset_postdata();
