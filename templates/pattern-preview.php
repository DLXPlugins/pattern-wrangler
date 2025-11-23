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
$pattern_id = urldecode( apply_filters( 'dlxpw_pattern_preview_id', '' ) );

$nonce = apply_filters( 'dlxpw_pattern_preview_nonce', '' );

$pattern_content = apply_filters( 'dlxpw_pattern_preview_content', '' );

if ( ! wp_verify_nonce( $nonce, 'preview-pattern_' . $pattern_id ) ) {
	die( 'Invalid nonce.' );
}

if ( '' === $pattern_id ) {
	die( 'Pattern not found.' );
}

$scale          = 1;
$aspect_ratio   = 1 / 1;
$viewport_width = 1600;

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
		$pattern_content = $wp_query->post->post_content;
	}
} elseif ( empty( $pattern_content ) && $pattern_id ) {
	$registered_patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();
	foreach ( $registered_patterns as $pattern ) {
		if ( $pattern_id === $pattern['slug'] || $pattern_id === $pattern['name'] ) {
			$pattern_content = $pattern['content'];
			$viewport_width  = absint( $pattern['viewportWidth'] );
			break;
		}
	}
	if ( ! isset( $pattern_content ) ) {
		die( 'Pattern not found.' );
	}
} else {
	die( 'Invalid pattern ID.' );
}

/**
 * Get first published post with featured image and set query to it. This is so blog posts and such can be displayed in the preview.
 */
$posts = get_posts(
	array(
		'post_type'      => 'any',
		'posts_per_page' => 1,
		'post_status'    => 'publish',
		'meta_query'     => array(
			array(
				'key'     => '_thumbnail_id',
				'compare' => 'EXISTS',
			),
		),
	)
);
// If empty, try to get first one without featured image.
if ( empty( $posts ) ) {
	$posts = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => 1,
			'post_status'    => 'publish',
		)
	);
}
// This is so blog posts and such can be displayed in the preview by overriding the query.
if ( ! empty( $posts ) ) {
	global $wp_query, $post;
	$wp_query = new \WP_Query(
		array(
			'p'         => $posts[0]->ID,
			'post_type' => 'any',
		)
	);
	$post     = $posts[0];
	\setup_postdata( $posts[0] );

}
/**
 * Filter to get the scale.
 *
 * @since 1.1.0
 */
$scale = apply_filters( 'dlxpw_pattern_preview_scale', 1, $viewport_width );

// Calculate scale as opposed to aspect ratio and viewport width.
$scale = round( min( $viewport_width, ( $viewport_width / $aspect_ratio ) ) / 1600, 2 );

// Add inline styles to try to hide the header and footer.
add_action(
	'wp_enqueue_scripts',
	function () {
		// Enqueue core block styles.
		wp_enqueue_style( 'wp-block-library' ); // needed for preview.
		wp_enqueue_style( 'wp-block-library-theme' ); // needed for preview.

		// Get block styles.
		if ( function_exists( 'wp_get_global_stylesheet' ) ) { // needed for preview.

			$global_styles = wp_get_global_stylesheet( array( 'variables' ) );
			wp_add_global_styles_for_blocks();
			if ( ! empty( $global_styles ) && wp_style_is( 'global-styles', 'registered' ) ) {
				wp_register_style( 'dlxpw-global-styles', false, array(), Functions::get_plugin_version() );
				wp_add_inline_style( 'dlxpw-global-styles', $global_styles );
				wp_enqueue_style( 'dlxpw-global-styles' );
			}
		}

		// Load dashicons for social icons fallbacks.
		wp_enqueue_style( 'dashicons' ); // needed for preview.

		wp_register_style(
			'dlxpw-pattern-preview',
			'',
			array(),
			Functions::get_plugin_version()
		);
		wp_add_inline_style(
			'dlxpw-pattern-preview',
			'body { display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; } header,.header,.site-header,footer,.footer,.site-footer { display: none; } img { max-width: 100%; height: auto; } .pattern-preview-wrapper > *:first-child:not(.wp-block-group) { padding-top: 0 !important; } .pattern-preview-wrapper > *:first-child { margin-top: 0 !important; } .pattern-preview-wrapper { margin-top: 0 !important; padding-top: 0 !important; } .wp-site-blocks { margin-top: 0 !important; padding-top: 0 !important; }'
		);
		wp_enqueue_style( 'dlxpw-pattern-preview' );

		wp_register_script(
			'dlxpw-pattern-preview-js',
			null,
			array(),
			Functions::get_plugin_version(),
			true
		);
		wp_localize_script(
			'dlxpw-pattern-preview-js',
			'dlxPatternPreviewVars',
			array(
				'viewportWidth' => 1600,
				'layout'        => 'grid',
				'retrieveNonce' => 'dlx-pattern-wrangler-get-all-patterns',
			)
		);
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


// Calculate aspect ratio from pattern viewport..

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
	?>
	<div id="pattern-preview-content" class="pattern-preview-wrapper" style="max-width: 1600px;">
		<?php
		if ( wp_is_block_theme() ) {
			echo wp_kses( $pattern_content, Functions::get_kses_allowed_html( true ) );
		} else {
			echo wp_kses_post( do_blocks( $pattern_content ) );
		}
		?>
	</div>
	<?php
} else {
	?>
	<!doctype html>
	<html <?php language_attributes(); ?> style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">

	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<?php
		// Need to do blocks in head tag for block styles to be output.
		$blocks = do_blocks( $pattern_content );
		?>
		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?> style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; display: relative; box-sizing: border-box; width: 100%; padding: 24px;">
	<?php wp_body_open(); ?>
	<div class="wp-site-blocks">
		<header class="wp-block-template-part site-header">
			<?php block_header_area(); ?>
		</header>
		<div id="pattern-preview-content" class="pattern-preview-wrapper" style="max-width: 1400px; margin: 0 auto; aspect-ratio: 1/1;">
			<?php
			if ( wp_is_block_theme() ) {
				echo wp_kses( $blocks, Functions::get_kses_allowed_html( true ) );
			} else {
				echo wp_kses_post( do_blocks( $pattern_content ) );
			}
			?>
		</div>
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
		wp_reset_postdata();
