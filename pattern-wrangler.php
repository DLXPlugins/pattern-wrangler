<?php
/**
 * Plugin Name:       Pattern Wrangler
 * Plugin URI:        https://dlxplugins.com/plugins/pattern-wrangler/
 * Description:       Manage your block patterns.
 * Version:           2.5.0-beta3
 * Requires at least: 6.8
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pattern-wrangler
 * Network:           true
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

require_once __DIR__ . '/functions.php';

define( 'DLXPW_PATTERN_WRANGLER_VERSION', '2.5.0-beta3' );
define( 'DLXPW_PATTERN_WRANGLER_CACHE_VERSION', '0.0.3' );
define( 'DLXPW_PATTERN_WRANGLER_FILE', __FILE__ );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * PatternWrangler class.
 */
class PatternWrangler {

	/**
	 * Holds the class instance.
	 *
	 * @var PatternWrangler $instance
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the ReflectorDLX Class.
	 *
	 * @since 1.0.0
	 *
	 * @return PatternWrangler class instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class initializer.
	 */
	public function plugins_loaded() {

		$admin = new Admin();
		$admin->run();

		$patterns = new Patterns();
		$patterns->run();

		$drafts = new Drafts();
		$drafts->run();

		$preview = new Preview();
		$preview->run();

		$rest = new Rest();
		$rest->run();

		$versions = new Versions();
		$versions->run();

		if ( Functions::is_multisite( true ) ) {
			$network_admin = new Network_Admin();
			$network_admin->run();
		}

		// Initialize network and helpers.
		if ( is_multisite() ) {

			// Allow GB Pro global styles to be output network wide by Pattern Wrangler.
			if ( class_exists( 'GenerateBlocks_Pro_Styles' ) ) {
				Compatibility\GenerateBlocks::init();
				add_filter(
					'dlxpw_gb_class',
					function () {
						return __NAMESPACE__ . '\Compatibility\GenerateBlocks';
					}
				);
			}

			add_action(
				'init',
				function () {
					$options = Options::get_network_options();
					if ( 'local_only' !== $options['patternConfiguration'] ) {
						if ( Functions::is_network_patterns_site() ) {
							$network = new Network();
							$network->init_post_actions();
						}
					}
				}
			);

		}

		// Determine if blocks can run or not.
		$options            = Options::get_options();
		$can_disable_blocks = ! (bool) $options['disablePatternImporterBlock'];
		if ( ! $can_disable_blocks ) {
			$blocks = new Blocks();
			$blocks->run();
		}

		/**
		 * When PatternWrangler can be extended.
		 *
		 * Filter when PatternWrangler can be extended.
		 *
		 * @since 1.0.0
		 */
		do_action( 'dlxplugins_pw_loaded' );

		add_action( 'init', array( $this, 'init' ), 1 );
	}

	/**
	 * Init all the things.
	 */
	public function init() {

		// If doing Ajax and admin preview.
		if ( wp_doing_ajax() && 'dlxpw_pattern_preview' === sanitize_text_field( filter_input( INPUT_GET, 'action', FILTER_SANITIZE_SPECIAL_CHARS ) ) ) {
			// Set global current screen to not is admin request. This should only apply to the PW preview screen Ajax request.
			if ( ! isset( $GLOBALS['current_screen'] ) ) {
				$GLOBALS['current_screen'] = new class() {
					/**
					 * Check if in admin.
					 *
					 * @return bool
					 */
					public function in_admin() {
						return false;
					}
				};
			}
		}
	}
}

add_action(
	'plugins_loaded',
	function () {
		$pattern_wrangler = PatternWrangler::get_instance();
		$pattern_wrangler->plugins_loaded();
	},
	15
);

/**
 * Run action on activation.
 */
register_activation_hook(
	__FILE__,
	function () {
		update_option( 'dlx_pw_activation_date', time() );
	}
);
