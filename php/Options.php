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
	 * Array holding the network options.
	 *
	 * @var array
	 */
	protected static $network_options = false;

	/**
	 * The key used to store the options.
	 *
	 * @var string
	 */
	protected static $options_key = 'dlx_pw_options';

	/**
	 * The key used to store the network options.
	 *
	 * @var string
	 */
	protected static $network_options_key = 'dlx_pw_network_options';

	/**
	 * The key used to store the pattern statuses.
	 *
	 * @var string
	 */
	protected static $pattern_statuses_key = 'dlx_pw_disabled_patterns';

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
				case 'hideAllPatterns':
				case 'hidePatternsMenu':
				case 'hideCorePatterns':
				case 'hideRemotePatterns':
				case 'hideThemePatterns':
				case 'hidePluginPatterns':
				case 'hideCoreSyncedPatterns':
				case 'hideCoreUnsyncedPatterns':
				case 'disablePatternImporterBlock':
				case 'allowFrontendPatternPreview':
				case 'hideUncategorizedPatterns':
				case 'showCustomizerUI':
				case 'loadCustomizerCSSBlockEditor':
				case 'loadCustomizerCSSFrontend':
				case 'makePatternsExportable':
				case 'enableEnhancedView':
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
		update_option( self::$options_key, $options );
		self::$options = $options;
		return $options;
	}

	/**
	 * Update network options via sanitization
	 *
	 * @since 1.3.0
	 * @access public
	 * @param array $options array of options to save.
	 * @return array $options.
	 */
	public static function update_network_options( $options ) {
		$force           = true;
		$current_options = self::get_network_options( $force );
		foreach ( $options as $key => &$option ) {
			switch ( $key ) {
				case 'disablePatternImporterBlock':
				case 'disablePatternExporterForNetwork':
				case 'enableEnhancedView':
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
		update_site_option( self::$network_options_key, $options );
		self::$network_options = $options;
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
		$options = get_option( self::$options_key, array() );

		$defaults      = self::get_defaults();
		$options       = wp_parse_args( $options, $defaults );
		self::$options = $options;
		return $options;
	}

	/**
	 * Get network options.
	 *
	 * @param bool $force Whether to get options from cache or not.
	 *
	 * @return array Array of network options.
	 */
	public static function get_network_options( $force = false ) {
		if ( is_array( self::$network_options ) && ! $force ) {
			return self::$network_options;
		}
		$options               = get_site_option( self::$network_options_key, array() );
		$defaults              = self::get_network_defaults();
		$options               = wp_parse_args( $options, $defaults );
		self::$network_options = $options;
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
			'hideAllPatterns'              => false,
			'hidePatternsMenu'             => false, /* only if hideAllPatterns is true, place in the Appearance menu */
			'hideCorePatterns'             => false,
			'hideRemotePatterns'           => false,
			'hideThemePatterns'            => false,
			'hidePluginPatterns'           => false,
			'hideCoreSyncedPatterns'       => false,
			'hideCoreUnsyncedPatterns'     => false,
			'disablePatternImporterBlock'  => false,
			'categories'                   => array(),
			'allowFrontendPatternPreview'  => true,
			'hideUncategorizedPatterns'    => false,
			'showCustomizerUI'             => true,
			'showMenusUI'                  => true,
			'loadCustomizerCSSBlockEditor' => false,
			'loadCustomizerCSSFrontend'    => true,
			'makePatternsExportable'       => false,
			'enableEnhancedView'           => true,
		);

		/**
		 * Allow options to be extended by plugins.
		 *
		 * @param array $defaults Default options.
		 * @return array Modified options.
		 */
		$defaults = apply_filters( 'dlx_pw_options_defaults', $defaults );
		return $defaults;
	}

	/**
	 * Get defaults for network options.
	 *
	 * @return array Default network options.
	 */
	public static function get_network_defaults() {
		$defaults = array(
			'patternMothershipSiteId'          => 1,
			'patternConfiguration'             => 'hybrid', // Can be `nework_only`, `local_only`, `hybrid`, or `disabled`.
			'hideSyncedPatternsForNetwork'     => 'default', // If patternConfiguration is `hybrid`, site-admins can still show/hide synced local and network patterns. If `local_only`, site-admins can only show/hide local patterns. IF `network_only`, site-admins will not see a synced patterns option.
			'hideUnsyncedPatternsForNetwork'   => 'default', // If patternConfiguration is `hybrid`, site-admins can still show/hide unsynced local and network patterns. If `local_only`, site-admins can only show/hide local patterns. IF `network_only`, site-admins will not see an unsynced patterns option.
			'disablePatternImporterBlock'      => false, // If false, site admins can still configure this option per site.
			'disablePatternExporterForNetwork' => false, // If true, site admins will not see a pattern exporter option.
			'hideCorePatterns'                 => 'default',
			'hideRemotePatterns'               => 'default',
			'enableEnhancedView'               => true,
			'hideAllPatterns'                  => 'default',
			'hideThemePatterns'                => 'default',
			'hidePluginPatterns'               => 'default',
			'hideUncategorizedPatterns'        => 'default',
		);
		/**
		 * Allow options to be extended by plugins.
		 *
		 * @param array $defaults Default options.
		 * @return array Modified options.
		 */
		$defaults = apply_filters( 'dlx_pw_network_options_defaults', $defaults );
		return $defaults;
	}

	/**
	 * Get the disabled patterns.
	 *
	 * @return array The disabled patterns.
	 */
	public static function get_disabled_patterns() {
		$disabled_patterns = get_option( self::$pattern_statuses_key, array() );
		return $disabled_patterns;
	}

	/**
	 * Set the disabled patterns.
	 *
	 * @param array $patterns The disabled patterns.
	 */
	public static function set_disabled_patterns( $patterns ) {
		update_option( self::$pattern_statuses_key, $patterns );
	}
}
