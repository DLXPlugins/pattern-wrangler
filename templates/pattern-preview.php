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

/**
 * Filter to get the pattern ID.
 *
 * @since 1.1.0
 */
$pattern_id = apply_filters( 'dlxpw_pattern_preview_id', '' );

$nonce = apply_filters( 'dlxpw_pattern_preview_nonce', '' );

$pattern_content = apply_filters( 'dlxpw_pattern_preview_content', '' );

if ( ! wp_verify_nonce( $nonce, 'preview-pattern_' . $pattern_id ) ) {
	die( 'Invalid nonce.' );
}

if ( '' === $pattern_id || '' === $pattern_content ) {
	die( 'Pattern not found.' );
}

// Perform query.
if ( is_numeric( $pattern_id ) ) {
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
}

// Add inline styles to try to hide the header and footer.
add_action(
	'wp_enqueue_scripts',
	function () {
		wp_register_style(
			'dlxpw-pattern-preview',
			''
		);
		wp_add_inline_style(
			'dlxpw-pattern-preview',
			'header,.header,.site-header,footer,.footer,.site-footer { display: none; } img { max-width: 100%; height: auto; }'
		);
		wp_enqueue_style( 'dlxpw-pattern-preview' );
	}
);

add_action(
	'wp_head',
	function () {
		// Add CORS headers for font loading.
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept' );

		// Add CSP and base tag.
		echo '<meta http-equiv="Content-Security-Policy" content="default-src *; font-src * data:; img-src * data:; style-src * \'unsafe-inline\'; script-src * \'unsafe-inline\' \'unsafe-eval\';">';
		echo '<base href="' . esc_url( home_url() ) . '">';
	},
	1 // Priority 1 to ensure it runs early.
);

// Get header if theme is not FSE theme.
if ( ! wp_is_block_theme() ) {
	$blocks       = do_blocks( $pattern_content );
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
	echo wp_kses_post( $pattern_content );
} else {
	?>
	<!doctype html>
	<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<?php
		// Need to do blocks in head tag for block styles to be output.
		$blocks = do_blocks( $pattern_content );
		?>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?> style="overflow: hidden; transform: scale(.9) !important;
	aspect-ratio: 1 / 1 !important;">
	<?php wp_body_open(); ?>
	<div class="wp-site-blocks">
	<header class="wp-block-template-part site-header">
		<?php block_header_area(); ?>
	</header>
	<?php
	echo wp_kses_post( $pattern_content );
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
