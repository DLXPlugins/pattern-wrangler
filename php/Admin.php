<?php
/**
 * Admin class.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Admin class.
 */
class Admin {

	/**
	 * Class runner.
	 */
	public function run() {

		$options = Options::get_options();

		// Init the admin menu.
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ), 100 );

		add_action( 'current_screen', array( $this, 'set_category_submenu_current' ) );

		// For retrieving the options.
		add_action( 'wp_ajax_dlx_pw_get_options', array( $this, 'ajax_get_options' ) );

		// For saving the options.
		add_action( 'wp_ajax_dlx_pw_save_options', array( $this, 'ajax_save_options' ) );

		// For resetting the options.
		add_action( 'wp_ajax_dlx_pw_reset_options', array( $this, 'ajax_reset_options' ) );

		// For initializing settings links on the plugins screen.
		add_action( 'admin_init', array( $this, 'init_settings_links' ) );

		// Add a synced/unsynced page column for pattern blocks.
		add_filter( 'manage_wp_block_posts_columns', array( $this, 'add_pattern_sync_column' ) );

		// Output synced vs. unsynced.
		add_action( 'manage_wp_block_posts_custom_column', array( $this, 'output_pattern_sync_column' ), 10, 2 );

		if ( (bool) $options['loadCustomizerCSSBlockEditor'] ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_customizer_css_block_editor' ), PHP_INT_MAX );
		}
		// Since by default wp_custom_css_cb is add_action wp_head, just remove_action.
		if ( ! (bool) $options['loadCustomizerCSSFrontend'] ) {
			remove_action( 'wp_head', 'wp_custom_css_cb', 101 );
		}
	}

	/**
	 * Initialize the setting links for the plugin page.
	 */
	public function init_settings_links() {
		$prefix = Functions::is_multisite() ? 'network_admin_' : '';
		add_action( $prefix . 'plugin_action_links_' . plugin_basename( DLXPW_PATTERN_WRANGLER_FILE ), array( $this, 'plugin_settings_link' ) );
	}

	/**
	 * Adds plugin settings page link to plugin links in WordPress Dashboard Plugins Page
	 *
	 * @since 1.0.0
	 *
	 * @param array $settings Uses $prefix . "plugin_action_links_$plugin_file" action.
	 * @return array Array of settings
	 */
	public function plugin_settings_link( $settings ) {
		$setting_links = array(
			'settings' => sprintf( '<a href="%s">%s</a>', esc_url( Functions::get_settings_url() ), esc_html__( 'Settings', 'pattern-wrangler' ) ),
			'docs'     => sprintf( '<a href="%s">%s</a>', esc_url( 'https://docs.dlxplugins.com/v/pattern-wrangler' ), esc_html__( 'Docs', 'pattern-wrangler' ) ),
			'site'     => sprintf( '<a href="%s" style="color: #f60098;">%s</a>', esc_url( 'https://dlxplugins.com/plugins/pattern-wrangler/' ), esc_html__( 'Plugin Home', 'pattern-wrangler' ) ),
		);
		if ( ! is_array( $settings ) ) {
			return $setting_links;
		} else {
			return array_merge( $setting_links, $settings );
		}
	}

	/**
	 * Save the options via Ajax.
	 */
	public function ajax_save_options() {
		// Get form data.
		$form_data = filter_input( INPUT_POST, 'formData', FILTER_SANITIZE_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY );

		$nonce = $form_data['saveNonce'] ?? false;
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-admin-save-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'pattern-wrangler' ),
					'type'        => 'critical',
					'dismissable' => true,
					'title'       => __( 'Error', 'pattern-wrangler' ),
				)
			);
		}

		// Get array values.
		$form_data = Functions::sanitize_array_recursive( $form_data );

		// Update options.
		Options::update_options( $form_data );

		// Send success message.
		wp_send_json_success(
			array(
				'message'     => __( 'Options saved.', 'pattern-wrangler' ),
				'type'        => 'success',
				'dismissable' => true,
			)
		);
	}

	/**
	 * Reset the options.
	 */
	public function ajax_reset_options() {
		// Get form data.
		$form_data = filter_input( INPUT_POST, 'formData', FILTER_SANITIZE_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY );

		$nonce = $form_data['resetNonce'] ?? false;
		if ( ! wp_verify_nonce( $nonce, 'dlx-pw-admin-reset-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'pattern-wrangler' ),
					'type'        => 'error',
					'dismissable' => true,
					'title'       => __( 'Error', 'pattern-wrangler' ),
				)
			);
		}

		// Get existing options.
		$options = Options::get_options();

		// Get defaults and reset.
		$default_options = Options::get_defaults();

		Options::update_options( $default_options );

		// Pull in nonces to default options before returning.
		$default_options['saveNonce']  = $options['saveNonce'];
		$default_options['resetNonce'] = $options['resetNonce'];

		// Send success message.
		wp_send_json_success(
			array(
				'message'     => __( 'Options reset.', 'pattern-wrangler' ),
				'type'        => 'success',
				'dismissable' => true,
				'formData'    => $default_options,
			)
		);
	}

	/**
	 * Retrieve options via Ajax.
	 */
	public function ajax_get_options() {
		// Get nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_SPECIAL_CHARS ) );

		// Verify nonce.
		$nonce_action = 'dlx-pw-admin-get-options';
		if ( ! wp_verify_nonce( $nonce, $nonce_action ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'pattern-wrangler' ),
					'type'        => 'error',
					'dismissable' => true,
					'title'       => __( 'Error', 'pattern-wrangler' ),
				)
			);
		}
		$options = Options::get_options();

		$categories            = Functions::get_pattern_categories();
		$options['registered'] = $categories['registered'];
		$options['categories'] = $categories['categories'];

		wp_send_json_success( $options );
	}

	/**
	 * Add synced/unsynced status to patterns.
	 *
	 * @param array $columns Columns.
	 *
	 * @return array Updated columns.
	 */
	public function add_pattern_sync_column( $columns ) {
		$new_column['pattern_sync'] = __( 'Synced', 'pattern-wrangler' );

		// Add new column before last item of array.
		$columns = array_slice( $columns, 0, -1, true ) + $new_column + array_slice( $columns, -1, null, true );
		return $columns;
	}

	/**
	 * Output synced vs unsynced for post column.
	 *
	 * @param string $column Column name.
	 * @param int    $post_id Post ID.
	 */
	public function output_pattern_sync_column( $column, $post_id ) {
		if ( 'pattern_sync' === $column ) {
			$synced = get_post_meta( $post_id, 'wp_pattern_sync_status', true );
			if ( 'unsynced' === $synced ) {
				// Unsynced patterns are explicitly set in post meta, whereas synced are not and assumed synced.
				echo '<span class="dashicons dashicons-editor-unlink"></span> ' . esc_html__( 'Unsynced Pattern', 'pattern-wrangler' );
			} else {
				echo '<span class="dashicons dashicons-admin-links"></span> ' . esc_html__( 'Synced Pattern', 'pattern-wrangler' );
			}
		}
	}

	/**
	 * Add the admin menu.
	 */
	public function add_admin_menu() {
		$options            = Options::get_options();
		$hide_all_patterns  = (bool) $options['hideAllPatterns'] ?? false;
		$hide_patterns_menu = (bool) $options['hidePatternsMenu'] ?? false;

		remove_submenu_page( 'themes.php', 'edit.php?post_type=wp_block' ); // Remove from Appearance in WP 6.5.
		remove_submenu_page( 'generateblocks', 'edit.php?post_type=wp_block' ); // Remove from GenerateBlocks screen.

		if ( $hide_all_patterns && $hide_patterns_menu ) {
			$hook = add_submenu_page(
				'themes.php',
				__( 'Patterns', 'pattern-wrangler' ),
				__( 'Patterns', 'pattern-wrangler' ),
				'manage_options',
				'pattern-wrangler',
				array( $this, 'admin_page' ),
				4
			);
			add_action( 'admin_print_scripts-' . $hook, array( $this, 'enqueue_scripts' ) );
			return;
		}
		add_menu_page(
			__( 'Patterns', 'pattern-wrangler' ),
			__( 'Patterns', 'pattern-wrangler' ),
			'manage_options',
			'edit.php?post_type=wp_block',
			'',
			'dashicons-layout',
			6
		);

		add_submenu_page(
			'edit.php?post_type=wp_block',
			__( 'Categories', 'pattern-wrangler' ),
			__( 'Categories', 'pattern-wrangler' ),
			'edit_posts',
			'edit-tags.php?taxonomy=wp_pattern_category&post_type=wp_block',
			'',
			5
		);

		$hook = add_submenu_page(
			'edit.php?post_type=wp_block',
			__( 'Settings', 'pattern-wrangler' ),
			__( 'Settings', 'pattern-wrangler' ),
			'edit_posts',
			'pattern-wrangler',
			array( $this, 'admin_page' ),
			10
		);
		add_action( 'admin_print_scripts-' . $hook, array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Set the category submenu as current.
	 *
	 * @param WP_Screen $screen The current screen.
	 */
	public function set_category_submenu_current( $screen ) {
		if ( ! is_admin() ) {
			return;
		}
		// Check if current page is pattern categories and mark categories as curent if slug matches.
		$current_screen = get_current_screen();
		if ( 'edit-wp_pattern_category' === $current_screen->id ) {
			// Doing JS here because there are no filters for marking submenus as current.
			?>
			<script>
				document.addEventListener('DOMContentLoaded', function() {
					const patternMenuLIs = document.querySelectorAll( '#toplevel_page_edit-post_type-wp_block.wp-has-current-submenu li' );

					// Set the menu after .wp-first-item as the category is the third item.
					if ( null !== patternMenuLIs ) {
						const patternCategoryLI = patternMenuLIs[2] || null;
						if ( null === patternCategoryLI ) {
							return;
						}
						patternCategoryLI.classList.add( 'current' );
					}
				});
			</script>
			<?php
		}
	}

	/**
	 * Enqueue scripts for the admin page.
	 */
	public function enqueue_scripts() {
		$options     = Options::get_options();
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab || 'settings' === $current_tab ) {
			// Enqueue main scripts.
			$deps = require_once Functions::get_plugin_dir( 'dist/dlx-pw-admin.asset.php' );
			wp_enqueue_script(
				'dlx-pw-admin',
				Functions::get_plugin_url( 'dist/dlx-pw-admin.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);

			wp_localize_script(
				'dlx-pw-admin',
				'dlxPatternWranglerAdmin',
				array(
					'getNonce'     => wp_create_nonce( 'dlx-pw-admin-get-options' ),
					'saveNonce'    => wp_create_nonce( 'dlx-pw-admin-save-options' ),
					'resetNonce'   => wp_create_nonce( 'dlx-pw-admin-reset-options' ),
					'previewNonce' => wp_create_nonce( 'dlx-pw-admin-preview' ),
					'ajaxurl'      => admin_url( 'admin-ajax.php' ),
				)
			);
			\wp_set_script_translations( 'dlx-pw-admin', 'pattern-wrangler' );
		}

		// Enqueue admin styles.
		wp_enqueue_style(
			'dlx-pw-admin-css',
			Functions::get_plugin_url( 'dist/dlx-pw-admin-css.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Render the admin page.
	 */
	public function admin_page() {
		?>
		<div class="dlx-pw-admin-wrap">
			<header class="dlx-pw-admin-header">
				<div class="dlx-pw-logo-wrapper">
					<div class="dlx-pw-logo">
						<h2 id="dlx-pw-admin-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'assets/img/logo.png' ) ); ?>" alt="GenerateBlocks Hacks" />
						</h2>
					</div>
					<div class="header__btn-wrap">
						<a href="<?php echo esc_url( 'https://docs.dlxplugins.com/v/pattern-wrangler' ); ?>" target="_blank" rel="noopener noreferrer" class="has__btn-primary"><?php esc_html_e( 'Docs', 'pattern-wrangler' ); ?></a>
						<a href="<?php echo esc_url( 'https://dlxplugins.com/support/' ); ?>" target="_blank" rel="noopener noreferrer" class="has__btn-primary"><?php esc_html_e( 'Support', 'pattern-wrangler' ); ?></a>
					</div>
				</div>
			</header>
			<?php
			$current_tab = Functions::get_admin_tab();
			?>
			<main class="dlx-pw-admin-body-wrapper">
				<div class="dlx-pw-body__content">
					<?php
					if ( null === $current_tab || 'settings' === $current_tab ) {
						?>
							<div id="dlx-pattern-wrangler"></div>
						<?php
					}
					?>
				</div>
			</main>
		</div>
		<?php
	}

	/**
	 * Enqueue customizer CSS for the block editor.
	 */
	public function enqueue_customizer_css_block_editor() {
		$custom_css = wp_get_custom_css();
		if ( ! empty( $custom_css ) && is_admin() ) {
			wp_register_style(
				'dlx-pw-customizer-css-block-editor',
				false
			);
			wp_enqueue_style( 'dlx-pw-customizer-css-block-editor' );
			wp_add_inline_style( 'dlx-pw-customizer-css-block-editor', $custom_css );
		}
	}
}
