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
$aspect_ratio   = 16 / 9;
$viewport_width = 1280;

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
		if ( $pattern_id === $pattern['slug'] ) {
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
 * Filter to get the scale.
 *
 * @since 1.1.0
 */
$scale = apply_filters( 'dlxpw_pattern_preview_scale', 1, $viewport_width );

// Calculate scale as opposed to aspect ratio and viewport width.
$scale = round( min( $viewport_width, ( $viewport_width / $aspect_ratio ) ) / 1440, 2 );

// Add inline styles to try to hide the header and footer.
add_action(
	'wp_enqueue_scripts',
	function () {
		// Enqueue core block styles.
		wp_enqueue_style( 'wp-block-library' );
		wp_enqueue_style( 'wp-block-library-theme' );

		// Enqueue block styles.
		if ( function_exists( 'wp_enqueue_global_styles' ) ) {
			wp_enqueue_global_styles();
		}

		// Get theme styles.
		if ( wp_style_is( 'global-styles', 'registered' ) ) {
			wp_enqueue_style( 'global-styles' );
		}

		// Get block styles.
		if ( function_exists( 'wp_get_global_stylesheet' ) ) {
			$styles = wp_get_global_stylesheet();
			if ( ! empty( $styles ) ) {
				wp_register_style( 'dlxpw-global-styles', false );
				wp_add_inline_style( 'dlxpw-global-styles', $styles );
				wp_enqueue_style( 'dlxpw-global-styles' );
			}
		}

		// Load dashicons for social icons fallbacks.
		wp_enqueue_style( 'dashicons' );

		wp_register_style(
			'dlxpw-pattern-preview',
			''
		);
		wp_add_inline_style(
			'dlxpw-pattern-preview',
			'header,.header,.site-header,footer,.footer,.site-footer { display: none; } img { max-width: 100%; height: auto; } .pattern-preview-wrapper > *:first-child { margin-top: 0 !important; padding-top: 0 !important; } .pattern-preview-wrapper { margin-top: 0 !important; padding-top: 0 !important; } .wp-site-blocks { margin-top: 0 !important; padding-top: 0 !important; }'
		);
		wp_enqueue_style( 'dlxpw-pattern-preview' );

		// Output viewport Width from query var.
		$viewport_width = isset( $_GET['viewport_width'] ) ? absint( $_GET['viewport_width'] ) : 1280;
		$layout         = isset( $_GET['layout'] ) ? sanitize_text_field( $_GET['layout'] ) : 'grid';
		wp_register_script(
			'dlxpw-pattern-preview-js',
			null
		);
		wp_localize_script(
			'dlxpw-pattern-preview-js',
			'dlxPatternPreviewVars',
			array(
				'viewportWidth' => $viewport_width,
				'layout'        => $layout,
			)
		);
		wp_print_scripts( 'dlxpw-pattern-preview-js' );
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
	<div id="pattern-preview-content" class="pattern-preview-wrapper" style="max-width: 1200px; aspect-ratio: 1/1; transform: scale(.9) !important;">
		<?php
		echo wp_kses_post( $pattern_content );
		?>
	</div>
	<?php
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
	<body <?php body_class(); ?> style="overflow: hidden;">
	<body <?php body_class(); ?> style="overflow: hidden;
	aspect-ratio: <?php echo esc_attr( $aspect_ratio ); ?> !important;">
	<?php wp_body_open(); ?>
	<div class="wp-site-blocks">
	<header class="wp-block-template-part site-header">
		<?php block_header_area(); ?>
	</header>
	<div id="pattern-preview-content" class="pattern-preview-wrapper" style="max-width: 1200px; aspect-ratio: 1/1; transform: scale(.9) !important;">
		<?php
		echo wp_kses_post( $pattern_content );
		?>
	</div>
	<?php
	echo apply_filters( 'the_content', do_blocks( $pattern_content ) );
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
	<script>
		document.addEventListener( 'DOMContentLoaded', () => {
		// Get the width and height of body content.
		const containerWidth = document.body.offsetWidth;
		const contentHeight = Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.body.clientHeight,
			document.documentElement.clientHeight
		);
		const viewportWidth = dlxPatternPreviewVars.viewportWidth;
		const layout = dlxPatternPreviewVars.layout;

		const scale = 'grid' === layout ? containerWidth / viewportWidth : 96 / viewportWidth; // 96px is the width of the list view.
		const aspectRatio = contentHeight
			? containerWidth / ( contentHeight * scale )
			: 0;

		try {
			// 1. Get the window.parent (the parent window)
			const parentWindow = window.parent;

			// 2. Find THIS iframe inside the parent document.
			const iframes = parentWindow.document.querySelectorAll('iframe');
			let thisIframe = null;

			for (const iframe of iframes) {
				if (iframe.contentWindow === window) {
					thisIframe = iframe;
					break;
				}
			}

			if (!thisIframe) {
				// No iframe found, so we can't scale.
				return;
			}

			// 3. Get the DIRECT parent of the iframe.
			const iframeScaleContainer = thisIframe.closest('.pattern-preview-iframe-scale-container');

			// 4. (Optional) Ensure it has the expected class if you want.
			if (iframeScaleContainer) {
				iframeScaleContainer.style.scale = scale;
				iframeScaleContainer.style.aspectRatio = aspectRatio;
			}

			// Set the iframe styles.
			thisIframe.style.position = 'absolute';
			thisIframe.style.width = viewportWidth + 'px';
			thisIframe.style.pointerEvents = 'none';
			thisIframe.style.height = contentHeight + 'px';
		} catch (error) {
			console.error('Error communicating with parent document:', error);
		}
	});
	</script>
	</body>
	</html>
	<?php
}
$wp_query = $temp;
wp_reset_postdata();
