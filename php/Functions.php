<?php
/**
 * Helper functions for the plugin.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class Functions
 */
class Functions {

	/**
	 * Checks if the plugin is on a multisite install.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $network_admin Check if in network admin.
	 *
	 * @return true if multisite, false if not.
	 */
	public static function is_multisite( $network_admin = false ) {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		$is_network_admin = false;
		if ( $network_admin ) {
			if ( is_network_admin() ) {
				if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
					return true;
				}
			} else {
				return false;
			}
		}
		if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Sanitize an attribute based on type.
	 *
	 * @param array  $attributes Array of attributes.
	 * @param string $attribute  The attribute to sanitize.
	 * @param string $type       The type of sanitization you need (values can be integer, text, float, boolean, url).
	 *
	 * @return mixed Sanitized attribute. wp_error on failure.
	 */
	public static function sanitize_attribute( $attributes, $attribute, $type = 'text' ) {
		if ( isset( $attributes[ $attribute ] ) ) {
			switch ( $type ) {
				case 'raw':
					return $attributes[ $attribute ];
				case 'post_text':
				case 'post':
					return wp_kses_post( $attributes[ $attribute ] );
				case 'string':
				case 'text':
					return sanitize_text_field( $attributes[ $attribute ] );
				case 'bool':
				case 'boolean':
					return filter_var( $attributes[ $attribute ], FILTER_VALIDATE_BOOLEAN );
				case 'int':
				case 'integer':
					return absint( $attributes[ $attribute ] );
				case 'float':
					if ( is_float( $attributes[ $attribute ] ) ) {
						return $attributes[ $attribute ];
					}
					return 0;
				case 'url':
					return esc_url( $attributes[ $attribute ] );
				case 'default':
					return new \WP_Error( 'pattern_wrangler_unknown_type', __( 'Unknown type.', 'alerts-dlx' ) );
			}
		}
		return new \WP_Error( 'pattern_wrangler_attribute_not_found', __( 'Attribute not found.', 'alerts-dlx' ) );
	}

	/**
	 * Get the pattern categories from the taxonomy.
	 *
	 * @return array The pattern categories.
	 */
	public static function get_pattern_categories_from_taxonomy() {
		$categories = get_terms(
			array(
				'taxonomy'   => 'wp_pattern_category',
				'hide_empty' => false,
				'count'      => true,
			)
		);
		return $categories;
	}

	/**
	 * Get the pattern categories.
	 *
	 * @return array The pattern categories.
	 */
	public static function get_pattern_categories() {
		$options = Options::get_options();

		// Get registered block categories.
		$pattern_categories = \WP_Block_Pattern_Categories_Registry::get_instance();
		$pattern_categories = $pattern_categories->get_all_registered();

		// Get all registered block patterns. We'll use this for a count.
		$pattern_registry = \WP_Block_Patterns_Registry::get_instance();
		$pattern_registry = $pattern_registry->get_all_registered();

		// Get all pattern categories from the built-in WP taxonomy.
		$pattern_categories_taxonomy = self::get_pattern_categories_from_taxonomy();

		// Get saved category data.
		$custom_pattern_categories = $options['categories'];

		// Loop through custom categories, and determine if a category is on or off.
		$all_categories = array();

		// Exclude these categories as they are deprecated in WordPress core.
		$excluded_cats = array(
			'buttons',
			'columns',
			'query',
		);

		foreach ( $pattern_categories as $category ) {
			/* Excluded Categories */
			if ( in_array( $category['name'], $excluded_cats, true ) ) {
				continue;
			}

			// Loop through custom categories, and determine if a category is on or off.
			$category_enabled                    = isset( $custom_pattern_categories[ $category['name'] ]['enabled'] ) ? (bool) $custom_pattern_categories[ $category['name'] ]['enabled'] : true;
			$category_custom                     = isset( $custom_pattern_categories[ $category['name'] ]['customLabel'] ) ? $custom_pattern_categories[ $category['name'] ]['customLabel'] : $category['label'];
			$category_mapped_to                  = isset( $custom_pattern_categories[ $category['name'] ]['mappedTo'] ) ? $custom_pattern_categories[ $category['name'] ]['mappedTo'] : false;
			$all_categories[ $category['name'] ] = array(
				'label'       => $category['label'],
				'customLabel' => ! empty( $category_custom ) ? $category_custom : $category['label'],
				'enabled'     => $category_enabled,
				'slug'        => $category['name'],
				'count'       => $category['count'] ?? 0,
				'mappedTo'    => $category_mapped_to,
			);
		}

		// Ensure all categories are unique.
		$all_categories = array_unique( $all_categories, SORT_REGULAR );

		// Sort by label.
		uasort(
			$all_categories,
			function ( $a, $b ) {
				return strcasecmp( $a['customLabel'], $b['customLabel'] );
			}
		);

		// Loop through all patterns and increment a count for each category. Since core tax pattern categories have a count for core patterns.
		foreach ( $pattern_registry as $pattern ) {
			$pattern_categories = $pattern['categories'];
			foreach ( $pattern_categories as $category ) {
				if ( isset( $all_categories[ $category ] ) ) {
					++$all_categories[ $category ]['count'];
				}
			}
		}

		return array(
			'registered' => $all_categories,
			'categories' => $pattern_categories_taxonomy,
		);
	}

	/**
	 * Check if a pattern is synced.
	 *
	 * @param int $pattern_id The pattern ID.
	 *
	 * @return bool true if synced, false if not.
	 */
	public static function is_pattern_synced( $pattern_id ) {
		$synced = get_post_meta( $pattern_id, 'wp_pattern_sync_status', true );
		if ( 'unsynced' === $synced ) {
			return false;
		}
		return true;
	}

	/**
	 * Get preview URL for previewing a pattern.
	 *
	 * @param int $post_id The post ID.
	 *
	 * @return string The preview URL (unescaped).
	 */
	public static function get_pattern_preview_url( $post_id ) {
		$preview_url = add_query_arg(
			array(
				'dlxpw_preview' => '1',
				'action'        => 'preview',
				'pattern'       => $post_id,
				'nonce'         => wp_create_nonce( 'preview-pattern_' . $post_id ),
			),
			home_url()
		);
		return $preview_url;
	}

	/**
	 * Get the plugin's supported file extensions.
	 *
	 * @since 1.0.0
	 *
	 * @return array The supported file extensions.
	 */
	public static function get_supported_file_extensions() {
		$file_extensions = array(
			'jpeg',
			'jpg',
			'gif',
			'png',
			'webp',
			'avif',
		);
		/**
		 * Filter the valid file extensions for the photo block.
		 *
		 * @param array $file_extensions The valid mime types.
		 */
		$file_extensions = apply_filters( 'dlxpw_block_file_extensions', $file_extensions );

		return $file_extensions;
	}

	/**
	 * Get the current admin tab.
	 *
	 * @return null|string Current admin tab.
	 */
	public static function get_admin_tab() {
		$tab = filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_SPECIAL_CHARS );
		if ( $tab && is_string( $tab ) ) {
			return sanitize_text_field( sanitize_title( $tab ) );
		}
		return null;
	}

	/**
	 * Return the URL to the admin screen
	 *
	 * @param string $tab     Tab path to load.
	 * @param string $sub_tab Subtab path to load.
	 *
	 * @return string URL to admin screen. Output is not escaped.
	 */
	public static function get_settings_url( $tab = '', $sub_tab = '' ) {
		$options            = Options::get_options();
		$hide_all_patterns  = (bool) $options['hideAllPatterns'] ?? false;
		$hide_patterns_menu = (bool) $options['hidePatternsMenu'] ?? false;
		$options_url        = admin_url( 'edit.php?post_type=wp_block&page=pattern-wrangler' );
		if ( $hide_all_patterns && $hide_patterns_menu ) {
			$options_url = admin_url( 'themes.php?page=pattern-wrangler' );
		}

		if ( ! empty( $tab ) ) {
			$options_url = add_query_arg( array( 'tab' => sanitize_title( $tab ) ), $options_url );
			if ( ! empty( $sub_tab ) ) {
				$options_url = add_query_arg( array( 'subtab' => sanitize_title( $sub_tab ) ), $options_url );
			}
		}
		return $options_url;
	}

	/**
	 * Checks to see if an asset is activated or not.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path to the asset.
	 * @param string $type Type to check if it is activated or not.
	 *
	 * @return bool true if activated, false if not.
	 */
	public static function is_activated( $path, $type = 'plugin' ) {

		// Gets all active plugins on the current site.
		$active_plugins = self::is_multisite() ? get_site_option( 'active_sitewide_plugins' ) : get_option( 'active_plugins', array() );
		if ( in_array( $path, $active_plugins, true ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Take a _ separated field and convert to camelcase.
	 *
	 * @param string $field Field to convert to camelcase.
	 *
	 * @return string camelCased field.
	 */
	public static function to_camelcase( string $field ) {
		return str_replace( '_', '', lcfirst( ucwords( $field, '_' ) ) );
	}

	/**
	 * Return the plugin slug.
	 *
	 * @return string plugin slug.
	 */
	public static function get_plugin_slug() {
		return dirname( plugin_basename( DLXPW_PATTERN_WRANGLER_FILE ) );
	}

	/**
	 * Return the basefile for the plugin.
	 *
	 * @return string base file for the plugin.
	 */
	public static function get_plugin_file() {
		return plugin_basename( DLXPW_PATTERN_WRANGLER_FILE );
	}

	/**
	 * Return the version for the plugin.
	 *
	 * @return float version for the plugin.
	 */
	public static function get_plugin_version() {
		return DLXPW_PATTERN_WRANGLER_VERSION;
	}

	/**
	 * Returns appropriate html for KSES.
	 *
	 * @param bool $svg Whether to add SVG data to KSES.
	 */
	public static function get_kses_allowed_html( $svg = true ) {
		$allowed_tags = wp_kses_allowed_html();

		$allowed_tags['nav']        = array(
			'class' => array(),
		);
		$allowed_tags['a']['class'] = array();
		$allowed_tags['input']      = array(
			'type'     => array(),
			'name'     => array(),
			'value'    => array(),
			'class'    => array(),
			'readonly' => array(),
		);
		$allowed_tags['button']     = array(
			'type'  => array(),
			'name'  => array(),
			'value' => array(),
			'class' => array(),
			'title' => array(),
		);
		$allowed_tags['div']        = array(
			'class' => array(),
		);
		$allowed_tags['span']       = array(
			'class' => array(),
		);

		if ( ! $svg ) {
			return $allowed_tags;
		}
		$allowed_tags['svg'] = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
			'class'       => array(),
		);

		$allowed_tags['path'] = array(
			'd'       => array(),
			'fill'    => array(),
			'opacity' => array(),
		);

		$allowed_tags['g'] = array();

		$allowed_tags['use'] = array(
			'xlink:href' => array(),
		);

		$allowed_tags['symbol'] = array(
			'aria-hidden' => array(),
			'viewBox'     => array(),
			'id'          => array(),
			'xmls'        => array(),
		);

		return $allowed_tags;
	}

	/**
	 * Array data that must be sanitized.
	 *
	 * @param array $data Data to be sanitized.
	 *
	 * @return array Sanitized data.
	 */
	public static function sanitize_array_recursive( array $data ) {
		$sanitized_data = array();
		foreach ( $data as $key => $value ) {
			if ( '0' === $value ) {
				$value = 0;
			}
			if ( 'true' === $value ) {
				$value = true;
			} elseif ( 'false' === $value ) {
				$value = false;
			}
			if ( is_array( $value ) ) {
				$value                  = self::sanitize_array_recursive( $value );
				$sanitized_data[ $key ] = $value;
				continue;
			}
			if ( is_bool( $value ) ) {
				$sanitized_data[ $key ] = (bool) $value;
				continue;
			}
			if ( is_int( $value ) ) {
				$sanitized_data[ $key ] = (int) $value;
				continue;
			}
			if ( is_string( $value ) ) {
				$sanitized_data[ $key ] = sanitize_text_field( $value );
				continue;
			}
		}
		return $sanitized_data;
	}

	/**
	 * Get the plugin directory for a path.
	 *
	 * @param string $path The path to the file.
	 *
	 * @return string The new path.
	 */
	public static function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path( DLXPW_PATTERN_WRANGLER_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Return a plugin URL path.
	 *
	 * @param string $path Path to the file.
	 *
	 * @return string URL to to the file.
	 */
	public static function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url( DLXPW_PATTERN_WRANGLER_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Gets the highest priority for a filter.
	 *
	 * @param int $subtract The amount to subtract from the high priority.
	 *
	 * @return int priority.
	 */
	public static function get_highest_priority( $subtract = 0 ) {
		$highest_priority = PHP_INT_MAX;
		$subtract         = absint( $subtract );
		if ( 0 === $subtract ) {
			--$highest_priority;
		} else {
			$highest_priority = absint( $highest_priority - $subtract );
		}
		return $highest_priority;
	}
}
