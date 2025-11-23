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
 * Network Admin class.
 */
class Network_Admin {

	/**
	 * Class runner.
	 */
	public function run() {

		$options = Options::get_options();

		// Init the network admin menu.
		add_action( 'network_admin_menu', array( $this, 'add_network_admin_menu' ), 100 );

		// Add site state to URL column.
		// add_filter( 'display_site_states', array( $this, 'add_pattern_source_state' ), 10, 2 );

		// Add sites list table column.
		// add_filter( 'wpmu_blogs_columns', array( $this, 'add_patterns_column' ) );

		// Add content to the custom column.
		// add_action( 'manage_sites_custom_column', array( $this, 'manage_patterns_column' ), 10, 2 );

		// add_action( 'network_site_info_form', array( $this, 'add_pattern_configuration_field' ) );

		// For hooking into the save action of the site info screen.
		// add_action( 'wp_update_site', array( $this, 'save_site_configuration' ) );

		// Save pattern configuration.
		// add_action( 'wpmu_update_blog_options', array( $this, 'save_pattern_configuration' ) );
	}

	/**
	 * Add the network admin menu.
	 */
	public function add_network_admin_menu() {
		$hook = add_submenu_page(
			'settings.php',
			__( 'Pattern Settings', 'pattern-wrangler' ),
			__( 'Pattern Settings', 'pattern-wrangler' ),
			'manage_network',
			'pattern-wrangler',
			array( $this, 'network_admin_page' ),
			10
		);

		add_action( 'admin_print_scripts-' . $hook, array( $this, 'enqueue_network_admin_scripts' ) );
	}

	/**
	 * Add pattern source state to the site URL column.
	 *
	 * @param array   $site_states Array of site states.
	 * @param WP_Site $site        Site object.
	 * @return array Modified site states.
	 */
	public function add_pattern_source_state( $site_states, $site ) {

		// Get current site ID.
		$site_id = absint( $site->blog_id );

		$patterns_source_site_id = Functions::get_network_default_patterns_site_id();

		if ( $site_id === $patterns_source_site_id ) {
			$site_states['pattern_source'] = sprintf(
				'<span class="pattern-source">%s</span>',
				esc_html__( 'Patterns Source', 'pattern-wrangler' ),
			);
		}

		return $site_states;
	}

	/**
	 * Render the network admin page.
	 */
	public function network_admin_page() {
		?>
		<div class="dlx-pw-admin-wrap">
			<header class="dlx-pw-admin-header">
				<div class="dlx-pw-logo-wrapper">
					<div class="dlx-pw-logo">
						<h2 id="dlx-pw-admin-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'assets/img/logo.png' ) ); ?>" alt="Pattern Wrangler" />
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
				<div id="dlx-pattern-wrangler-network-admin"></div>
				</div>
			</main>
		</div>
		<?php
	}

	/**
	 * Enqueue scripts for the network admin page.
	 */
	public function enqueue_network_admin_scripts() {
		// Retrieve network options.
		$options = Options::get_network_options();

		// Enqueue admins scripts.
		$deps = require_once Functions::get_plugin_dir( 'dist/dlx-pw-network-admin-settings.asset.php' );
		wp_enqueue_script(
			'dlx-pw-network-admin-settings',
			Functions::get_plugin_url( 'dist/dlx-pw-network-admin-settings.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);

		// Get mothership (default network site) selected data.
		$mothership_site_id        = Functions::get_network_default_patterns_site_id();
		$mothership_site_permalink = get_admin_url( $mothership_site_id );
		$mothership_site_title     = Functions::get_network_site_name( $mothership_site_id );

		// Create the patterns URL for the mothership site.
		$patterns_url = get_admin_url( $mothership_site_id, 'edit.php?post_type=wp_block' );

		wp_localize_script(
			'dlx-pw-network-admin-settings',
			'dlxPatternWranglerNetworkAdminSettings',
			array(
				'getNonce'                => wp_create_nonce( 'dlx-pw-network-admin-get-options' ),
				'saveNonce'               => wp_create_nonce( 'dlx-pw-admin-save-options' ),
				'resetNonce'              => wp_create_nonce( 'dlx-pw-admin-reset-options' ),
				'restEndpoint'            => REST::get_rest_endpoint( 'search/sites' ),
				'restNonce'               => wp_create_nonce( 'wp_rest' ),
				'ajaxurl'                 => admin_url( 'admin-ajax.php' ),
				'options'                 => $options,
				'selectedSite'            => $mothership_site_id,
				'selectedSitePermalink'   => $mothership_site_permalink,
				'selectedSiteTitle'       => $mothership_site_title,
				'selectedSitePatternsUrl' => $patterns_url,
			)
		);
		\wp_set_script_translations( 'dlx-pw-network-admin-settings', 'pattern-wrangler' );

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
	 * Add patterns column to sites list table.
	 *
	 * @param array $columns Array of column names and labels.
	 * @return array Modified columns array.
	 */
	public function add_patterns_column( $columns ) {
		$new_columns = array();

		$network_options = Options::get_network_options();
		if ( 'disabled' === $network_options['patternConfiguration'] || 'network_only' === $network_options['patternConfiguration'] ) {
			return $columns;
		}

		// Insert our column after the URL column.
		foreach ( $columns as $key => $value ) {
			$new_columns[ $key ] = $value;
			if ( 'blogname' === $key ) {
				$new_columns['patterns'] = __( 'Local Patterns', 'pattern-wrangler' );
			}
		}

		return $new_columns;
	}

	/**
	 * Manage content for patterns column.
	 *
	 * @param string $column_name Column being displayed.
	 * @param int    $blog_id     The blog ID.
	 */
	public function manage_patterns_column( $column_name, $blog_id ) {
		if ( 'patterns' !== $column_name ) {
			return;
		}

		$count = wp_cache_get( 'dlx_pw_patterns_count_' . $blog_id, 'dlx_pw_patterns_count' );
		if ( false === $count ) {
			global $wpdb;
			// Get the blog prefix.
			$blog_prefix = $wpdb->get_blog_prefix( $blog_id );

			// Direct query to count published patterns. This is to save time from switching to different sites.
			$table_name = sanitize_text_field( $blog_prefix . 'posts' );
			$query      = "SELECT COUNT(*) 
				FROM {$table_name}
					WHERE post_type = 'wp_block' 
					AND post_status = 'publish'";
			$count      = $wpdb->get_var( $query ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

			if ( null === $count || is_wp_error( $count ) ) {
				$count = 0;
			}
			wp_cache_set( 'dlx_pw_patterns_count_' . $blog_id, $count, 'dlx_pw_patterns_count' );
		}

		// Create patterns admin URL without switching context.
		$patterns_url = get_admin_url( $blog_id, 'edit.php?post_type=wp_block' );

		printf(
			'<a href="%s">%s %s</a>',
			esc_url( $patterns_url ),
			esc_html( number_format_i18n( $count ) ),
			esc_html( _n( 'Local Pattern', 'Local Patterns', $count, 'pattern-wrangler' ) )
		);
	}

	/**
	 * Save site configuration.
	 *
	 * @param WP_Site $site Site object.
	 */
	public function save_site_configuration( $site ) {
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'dlx_pattern_configuration_nonce', \FILTER_SANITIZE_SPECIAL_CHARS ) );
		if ( wp_verify_nonce( $nonce, 'dlx_pattern_configuration_nonce' ) && current_user_can( 'manage_network' ) ) {
			$pattern_config = sanitize_text_field( filter_input( INPUT_POST, 'dlx_pw_pattern_config', \FILTER_SANITIZE_SPECIAL_CHARS ) );
			$site_id = absint( $site->blog_id );
			update_blog_option( $site_id, 'dlx_pw_pattern_config', $pattern_config );
		}
	}

	/**
	 * Add pattern configuration field to site info screen.
	 *
	 * @param int $site_id The site ID.
	 */
	public function add_pattern_configuration_field( $site_id ) {
		$pattern_config_value = \get_blog_option( $site_id, 'dlx_pw_pattern_config', 'inherit' );
		if ( ! empty( $pattern_config_value ) && null !== $pattern_config_value ) {
			$pattern_config = sanitize_text_field( $pattern_config_value );
		} else {
			$pattern_config = 'inherit';
		}
		?>
		<table class="form-table">	
			<tr>
				<th scope="row"><?php esc_html_e( 'Pattern Configuration', 'pattern-wrangler' ); ?></th>
				<td>
					<?php
						wp_nonce_field( 'dlx_pattern_configuration_nonce', 'dlx_pattern_configuration_nonce' );
					?>
					<select name="dlx_pw_pattern_config" id="dlx_pattern_configuration">
						<option value="inherit" <?php selected( $pattern_config, 'inherit' ); ?>>
							<?php esc_html_e( 'Inherit from Network', 'pattern-wrangler' ); ?>
						</option>
						<option value="network_only" <?php selected( $pattern_config, 'network_only' ); ?>>
							<?php esc_html_e( 'Network Only', 'pattern-wrangler' ); ?>
						</option>
						<option value="local_only" <?php selected( $pattern_config, 'local_only' ); ?>>
							<?php esc_html_e( 'Local Only', 'pattern-wrangler' ); ?>
						</option>
						<option value="hybrid" <?php selected( $pattern_config, 'hybrid' ); ?>>
							<?php esc_html_e( 'Hybrid', 'pattern-wrangler' ); ?>
						</option>
						<option value="disabled" <?php selected( $pattern_config, 'disabled' ); ?>>
							<?php esc_html_e( 'Disabled', 'pattern-wrangler' ); ?>
						</option>
					</select>
					<p class="description">
						<?php esc_html_e( 'Configure how patterns work for this site.', 'pattern-wrangler' ); ?>
					</p>
				</td>
			</tr>
		</table>
		<?php
	}

	/**
	 * Save pattern configuration for a site.
	 *
	 * @param int $site_id The site ID.
	 */
	public function save_pattern_configuration( $site_id ) {
	}
}
