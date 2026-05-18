<?php
/**
 * GenerateBlocks Pro global styles network compatibility.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler\Compatibility;

use DLXPlugins\PatternWrangler\Functions;
use DLXPlugins\PatternWrangler\Options;
use GenerateBlocks_Pro_Enqueue_Styles;
use GenerateBlocks_Pro_Styles;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Network-wide GenerateBlocks Pro global styles overrides.
 */
class GenerateBlocks {

	/**
	 * Site option storing the network global styles cache version.
	 *
	 * @var string
	 */
	public const NETWORK_VERSION_OPTION = 'dlx_pw_network_gb_global_css_version';

	/**
	 * Per-site option storing the last seen network version.
	 *
	 * @var string
	 */
	public const VERSION_SEEN_OPTION = 'dlx_pw_gb_styles_version_seen';

	/**
	 * Transient key prefix for merged CSS.
	 *
	 * @var string
	 */
	public const MERGED_CSS_TRANSIENT_PREFIX = 'dlx_pw_network_gb_merged_css';

	/**
	 * Merged styles for the current request.
	 *
	 * @var array|null
	 */
	private static $merged_styles_request_cache = null;

	/**
	 * Merged CSS for the current request.
	 *
	 * @var string|null
	 */
	private static $merged_css_request_cache = null;

	/**
	 * The class name of the GenerateBlocks Pro class.
	 *
	 * @var bool|null
	 */
	private static $should_apply_cache = null;

	/**
	 * The result of the should_apply() method.
	 *
	 * @var bool
	 */
	private static $should_rebuild_css_cache = null;

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public static function init() {
		if ( ! Functions::is_multisite( false ) || ! class_exists( 'GenerateBlocks_Pro_Styles' ) ) {
			return;
		}

		add_filter( 'pre_option_generateblocks_style_css', array( __CLASS__, 'filter_pre_option_style_css' ) );
		add_filter( 'pre_update_option_generateblocks_style_css', array( __CLASS__, 'filter_pre_update_option_style_css' ), 10, 2 );
		add_filter( 'generateblocks_global_css', array( __CLASS__, 'filter_global_css' ), 100 );
		add_filter( 'block_editor_settings_all', array( __CLASS__, 'filter_block_editor_settings' ), 25 );

		add_action( 'init', array( __CLASS__, 'maybe_rebuild_gb_css' ), 20 );

		if ( Functions::is_network_patterns_site() ) {
			add_action( 'wp_after_insert_post', array( __CLASS__, 'on_mothership_style_change' ), 101, 2 );
			add_action( 'after_delete_post', array( __CLASS__, 'on_mothership_style_delete' ), 101, 2 );
		}
	}

	/**
	 * Whether network global style overrides should run on the current site.
	 *
	 * @param bool $force Whether to force the result.
	 * @return bool
	 */
	public static function should_apply( bool $force = null ) {
		if ( null !== $force ) {
			self::$should_apply_cache = $force;
			return self::$should_apply_cache;
		} elseif ( null !== self::$should_apply_cache ) {
			return self::$should_apply_cache;
		}

		if ( ! Functions::is_multisite( false ) || ! Functions::is_activated( 'generateblocks-pro/plugin.php', true ) ) {
			return self::should_apply( false );
		}

		$network_options = Options::get_network_options();
		if ( empty( $network_options['applyNetworkGenerateBlocksGlobalStyles'] ) ) {
			return self::should_apply( false );
		}

		// Takes into account the network and individual site pattern configuration.
		$configuration = Functions::get_network_pattern_configuration( get_current_blog_id() );
		if ( ! in_array( $configuration, array( 'hybrid', 'network_only' ), true ) ) {
			return self::should_apply( false );
		}

		if ( Functions::is_network_patterns_site() ) {
			return self::should_apply( false );
		}

		return self::should_apply( self::is_gb_pro_network_active() );
	}

	/**
	 * Check if GenerateBlocks Pro is active on the patterns source site. Assume GB Pro is network activated.
	 *
	 * @return bool
	 */
	public static function is_gb_pro_network_active() {
		return Functions::is_activated( 'generateblocks-pro/plugin.php', true );
	}

	/**
	 * Get global styles for a specific site (meta enriched in the same blog context).
	 *
	 * @param int   $site_id     Site ID.
	 * @param array $custom_args Optional query args for GB.
	 * @return array
	 */
	public static function get_styles_for_blog( $site_id, array $custom_args = array() ) {
		$site_id = absint( $site_id );
		if ( $site_id <= 0 ) {
			return array();
		}

		$load_styles = static function () use ( $site_id, $custom_args ) {
			$styles = \GenerateBlocks_Pro_Styles::get_styles( $custom_args );

			foreach ( $styles as $index => $style ) {
				$styles[ $index ]['blog_id'] = $site_id;

				if ( empty( $style['ID'] ) ) {
					continue;
				}

				$post_id = (int) $style['ID'];

				$styles[ $index ]['gb_style_css']      = get_post_meta( $post_id, 'gb_style_css', true );
				$styles[ $index ]['gb_style_selector'] = get_post_meta( $post_id, 'gb_style_selector', true );

				if ( ! is_string( $styles[ $index ]['gb_style_css'] ) ) {
					$styles[ $index ]['gb_style_css'] = '';
				}
				if ( ! is_string( $styles[ $index ]['gb_style_selector'] ) ) {
					$styles[ $index ]['gb_style_selector'] = '';
				}
			}

			return $styles;
		};

		if ( get_current_blog_id() === $site_id ) {
			return $load_styles();
		}

		switch_to_blog( $site_id );
		$styles = $load_styles();
		restore_current_blog();

		return $styles;
	}

	/**
	 * Build CSS from a styles list (expects gb_style_css on each row).
	 *
	 * @param array $styles Styles list.
	 * @return string
	 */
	public static function build_css_from_styles( array $styles ) {
		$css = '';

		foreach ( (array) $styles as $class ) {
			if ( ! empty( $class['gb_style_css'] ) && is_string( $class['gb_style_css'] ) ) {
				$css .= $class['gb_style_css'];
				continue;
			}

			// Fallback for rows without enriched meta on the current blog only.
			if ( empty( $class['ID'] ) ) {
				continue;
			}

			$site_id = isset( $class['blog_id'] ) ? absint( $class['blog_id'] ) : get_current_blog_id();
			if ( get_current_blog_id() !== $site_id ) {
				continue;
			}

			$class_css = get_post_meta( (int) $class['ID'], 'gb_style_css', true );
			$css      .= is_string( $class_css ) ? $class_css : '';
		}

		return $css;
	}

	/**
	 * Get a dedupe key for a style row.
	 *
	 * @param array $style Style row.
	 * @return string
	 */
	private static function get_style_dedupe_key( array $style ) {
		$selector = '';
		if ( ! empty( $style['gb_style_selector'] ) && is_string( $style['gb_style_selector'] ) ) {
			$selector = $style['gb_style_selector'];
		}

		if ( $selector ) {
			return $selector;
		}

		$blog_id = isset( $style['blog_id'] ) ? absint( $style['blog_id'] ) : get_current_blog_id();

		return 'id_' . $blog_id . '_' . (int) ( $style['ID'] ?? 0 );
	}

	/**
	 * Get merged global styles for the current site.
	 *
	 * @param array $custom_args Optional query args for GB.
	 * @return array
	 */
	public static function get_merged_styles( array $custom_args = array() ) {
		if ( null !== self::$merged_styles_request_cache ) {
			return self::$merged_styles_request_cache;
		}

		$configuration = Functions::get_network_pattern_configuration( get_current_blog_id() );
		$mothership_id = Functions::get_network_default_patterns_site_id();
		$current_id    = get_current_blog_id();

		if ( 'network_only' === $configuration ) {
			self::$merged_styles_request_cache = self::get_styles_for_blog( $mothership_id, $custom_args );
			return self::$merged_styles_request_cache;
		}

		if ( 'hybrid' === $configuration ) {
			// Local styles: no switch when already on the subsite.
			$local_styles = self::get_styles_for_blog( $current_id, $custom_args );

			// Mothership styles: at most one switch_to_blog for this request.
			$network_styles = ( $mothership_id === $current_id )
				? $local_styles
				: self::get_styles_for_blog( $mothership_id, $custom_args );

			$indexed_by_key = array();

			foreach ( $local_styles as $style ) {
				$indexed_by_key[ self::get_style_dedupe_key( $style ) ] = $style;
			}

			foreach ( $network_styles as $style ) {
				$indexed_by_key[ self::get_style_dedupe_key( $style ) ] = $style;
			}

			self::$merged_styles_request_cache = array_values( $indexed_by_key );
			return self::$merged_styles_request_cache;
		}

		self::$merged_styles_request_cache = self::get_styles_for_blog( $current_id, $custom_args );
		return self::$merged_styles_request_cache;
	}

	/**
	 * Get merged global CSS (cached per site + network version).
	 *
	 * @param bool $force_refresh Whether to bypass the transient.
	 * @return string
	 */
	public static function get_merged_css( $force_refresh = false ) {
		if ( ! $force_refresh && null !== self::$merged_css_request_cache ) {
			return self::$merged_css_request_cache;
		}

		$version       = self::get_network_version();
		$transient_key = self::get_merged_css_transient_key( $version );

		if ( ! $force_refresh ) {
			$cached = get_transient( $transient_key );
			if ( is_string( $cached ) ) {
				self::$merged_css_request_cache = $cached;
				return $cached;
			}
		}

		$css = self::build_css_from_styles( self::get_merged_styles() );
		set_transient( $transient_key, $css, WEEK_IN_SECONDS );

		self::$merged_css_request_cache = $css;

		return $css;
	}

	/**
	 * Get the network global styles version.
	 *
	 * @return int
	 */
	public static function get_network_version() {
		return (int) get_site_option( self::NETWORK_VERSION_OPTION, 0 );
	}

	/**
	 * Bump the network global styles version.
	 *
	 * @return void
	 */
	public static function bump_network_version() {
		$version = self::get_network_version() + 1;
		update_site_option( self::NETWORK_VERSION_OPTION, $version );
	}

	/**
	 * Bump version when relevant network settings change.
	 *
	 * @param array $previous Previous network options.
	 * @param array $updated  Updated network options.
	 * @return void
	 */
	public static function maybe_bump_version_on_settings_save( array $previous, array $updated ) {
		$watch_keys = array(
			'applyNetworkGenerateBlocksGlobalStyles',
			'patternNetworkSourceSiteId',
			'patternConfiguration',
		);

		foreach ( $watch_keys as $key ) {
			$prev_value = $previous[ $key ] ?? null;
			$new_value  = $updated[ $key ] ?? null;

			if ( $prev_value !== $new_value ) {
				self::bump_network_version();
				return;
			}
		}
	}

	/**
	 * Clear merged CSS transient for the current site.
	 *
	 * @return void
	 */
	public static function clear_merged_css_cache() {
		$version = self::get_network_version();
		delete_transient( self::get_merged_css_transient_key( $version ) );
		self::$merged_css_request_cache    = null;
		self::$merged_styles_request_cache = null;
	}

	/**
	 * Build transient key for merged CSS.
	 *
	 * @param int $version Network version.
	 * @return string
	 */
	private static function get_merged_css_transient_key( $version ) {
		return self::MERGED_CSS_TRANSIENT_PREFIX . '_' . absint( $version ) . '_' . get_current_blog_id();
	}

	/**
	 * Filter pre_option for generateblocks_style_css.
	 *
	 * @param mixed $pre Option pre value.
	 * @return mixed
	 */
	public static function filter_pre_option_style_css( $pre ) {
		if ( ! self::should_apply() ) {
			return $pre;
		}

		return self::get_merged_css();
	}

	/**
	 * Block subsite updates to generateblocks_style_css when overrides apply.
	 *
	 * @param mixed $value     New option value.
	 * @param mixed $old_value Old option value.
	 * @return mixed
	 */
	public static function filter_pre_update_option_style_css( $value, $old_value ) {
		if ( ! self::should_apply() ) {
			return $value;
		}

		return $old_value;
	}

	/**
	 * Filter global CSS output.
	 *
	 * @param string $css CSS string.
	 * @return string
	 */
	public static function filter_global_css( $css ) {
		if ( ! self::should_apply() ) {
			return $css;
		}

		return self::get_merged_css();
	}

	/**
	 * Replace editor global style entries with merged styles.
	 *
	 * @param array $editor_settings Editor settings.
	 * @return array
	 */
	public static function filter_block_editor_settings( $editor_settings ) {
		if ( ! self::should_apply() ) {
			return $editor_settings;
		}

		if ( ! isset( $editor_settings['styles'] ) || ! is_array( $editor_settings['styles'] ) ) {
			$editor_settings['styles'] = array();
		}

		$editor_settings['styles'] = array_values(
			array_filter(
				$editor_settings['styles'],
				function ( $style ) {
					if ( ! is_array( $style ) || empty( $style['source'] ) ) {
						return true;
					}
					return 0 !== strpos( (string) $style['source'], 'gb_class:' );
				}
			)
		);

		foreach ( self::get_merged_styles() as $class ) {
			if ( empty( $class['ID'] ) ) {
				continue;
			}

			$class_css  = isset( $class['gb_style_css'] ) && is_string( $class['gb_style_css'] ) ? $class['gb_style_css'] : '';
			$class_name = isset( $class['gb_style_selector'] ) && is_string( $class['gb_style_selector'] ) ? $class['gb_style_selector'] : '';

			$editor_settings['styles'][] = array(
				'css'    => $class_css,
				'source' => 'gb_class:' . $class_name,
			);
		}

		return $editor_settings;
	}

	/**
	 * Lazily rebuild GB CSS file when the network version is stale.
	 *
	 * @return void
	 */
	public static function maybe_rebuild_gb_css() {

		if ( ! self::should_apply() || null !== self::$should_rebuild_css_cache ) {
			return;
		}

		$network_version = self::get_network_version();
		$seen_version    = (int) get_option( self::VERSION_SEEN_OPTION, 0 );

		if ( $network_version <= $seen_version ) {
			self::$should_rebuild_css_cache = false;
			return;
		}

		self::clear_merged_css_cache();
		self::get_merged_css( true );

		if ( class_exists( 'GenerateBlocks_Pro_Enqueue_Styles' ) ) {
			GenerateBlocks_Pro_Enqueue_Styles::get_instance()->build_css();
		}

		update_option( self::VERSION_SEEN_OPTION, $network_version );
	}

	/**
	 * Bump network version when a global style is saved on the mothership.
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post    Post object.
	 * @return void
	 */
	public static function on_mothership_style_change( $post_id, $post ) {
		if ( ! $post || 'gblocks_styles' !== $post->post_type ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}

		self::bump_network_version();
	}

	/**
	 * Bump network version when a global style is deleted on the mothership.
	 *
	 * @param int      $post_id Post ID.
	 * @param \WP_Post $post    Post object.
	 * @return void
	 */
	public static function on_mothership_style_delete( $post_id, $post ) {
		if ( ! $post || 'gblocks_styles' !== $post->post_type ) {
			return;
		}

		self::bump_network_version();
	}
}
