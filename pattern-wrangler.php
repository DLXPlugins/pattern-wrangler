<?php
/**
 * Plugin Name:       Pattern Wrangler
 * Plugin URI:        https://dlxplugins.com/plugins/pattern-wrangler/
 * Description:       Manage your block patterns.
 * Version:           1.2.0
 * Requires at least: 6.5
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pattern-wrangler
 * Domain Path:       /languages
 * Network:           true
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

define( 'DLXPW_PATTERN_WRANGLER_VERSION', '1.2.0' );
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
		load_plugin_textdomain(
			'pattern-wrangler',
			false,
			basename( __DIR__ ) . '/languages'
		);

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

		if ( Functions::is_multisite( true ) ) {
			$network_admin = new Network_Admin();
			$network_admin->run();
		}

		// Determine if blocks can run or not.
		$options            = Options::get_options();
		$can_disable_blocks = (bool) $options['disablePatternImporterBlock'];
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
	}

	/**
	 * Init all the things.
	 */
	public function init() {

		// Nothing here yet.
	}
}

add_action(
	'plugins_loaded',
	function () {
		$pattern_wrangler = PatternWrangler::get_instance();
		$pattern_wrangler->plugins_loaded();
	}
);
