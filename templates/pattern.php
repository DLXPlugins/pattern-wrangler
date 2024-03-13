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
	die( 'You do not have permissioni to preview this pattern.' );
}
$nonce      = sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ) );
$pattern_id = absint( filter_input( INPUT_GET, 'pattern', FILTER_DEFAULT ) );
if ( ! wp_verify_nonce( $nonce, 'preview-pattern_' . $pattern_id ) ) {
	die( 'Invalid nonce.' );
}

// Perform query.
$pattern = get_post( $pattern_id );
if ( ! $pattern || 'wp_block' !== get_post_type( $pattern ) ) {
	die( 'Pattern not found.' );
}

// Get header if theme is not FSE theme.
if ( ! wp_is_block_theme() ) {
	get_header();
	$blocks = do_blocks( $pattern->post_content );
	echo wp_kses_post( $blocks );
} else {
	?>
	<!doctype html>
	<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<?php
		// Need to do blocks in head tag for block styles to be output.
		$blocks = do_blocks( $pattern->post_content );
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
	echo wp_kses_post( $blocks );
	?>
	<?php
}

// Render block pattern here.

// Get footer if theme is not FSE theme.
if ( ! wp_is_block_theme() ) {
	get_footer();
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
