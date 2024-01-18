<?php

/**
 * Options class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class that updates and stores the options.
 */
class Options {


	/**
	 * Array holding the options.
	 *
	 * @var array
	 */
	protected static $options = false;

	/**
	 * The key used to store the options.
	 *
	 * @var string
	 */
	protected static $options_key = 'dlx_pw_options';

	/**
	 * Update options via sanitization
	 *
	 * @since 1.0.0
	 * @access public
	 * @param array $options array of options to save.
	 * @return array $options.
	 */
	public static function update_options( $options ) {
		$force           = true;
		$current_options = self::get_options( $force );
		foreach ( $options as $key => &$option ) {
			switch ( $key ) {
				case 'enabled':
					$option = filter_var( $options[ $key ], FILTER_VALIDATE_BOOLEAN );
					break;
				default:
					if ( is_array( $option ) ) {
						$option = Functions::sanitize_array_recursive( $option );
					} else {
						$option = sanitize_text_field( $options[ $key ] );
					}
					break;
			}
		}
		$options = wp_parse_args( $options, $current_options );
		if ( Functions::is_multisite() ) {
			update_site_option( self::$options_key, $options );
		} else {
			update_option( self::$options_key, $options );
		}
		self::$options = $options;
		return $options;
	}

	/**
	 * Return a list of options.
	 *
	 * @param bool $force Whether to get options from cache or not.
	 *
	 * @return array Array of options.
	 */
	public static function get_options( $force = false ) {
		if ( is_array( self::$options ) && ! $force ) {
			return self::$options;
		}
		if ( Functions::is_multisite() ) {
			$options = get_site_option( self::$options_key, array() );
		} else {
			$options = get_option( self::$options_key, array() );
		}

		$defaults      = self::get_defaults();
		$options       = wp_parse_args( $options, $defaults );
		self::$options = $options;
		return $options;
	}

	/**
	 * Get defaults for SCE options
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array default options
	 */
	public static function get_defaults() {

		$defaults = array(
			'disableCoreCategories' => false,
			'disableThirdPartyCategories' => false,
			'hideAllPatterns' => false,
			'hideCorePatterns' => false,
			'hideThemePatterns' => false,
			'hideRemotePatterns' => false,
			'disableSyncedPatterns' => false,
			'showSyncedPatternsUI' => false,
			'disablePatternImporterBlock' => false,
			'categories' => array(),
		);
		return $defaults;
	}
}
