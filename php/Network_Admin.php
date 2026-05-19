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
		// Init the network admin menu.
		add_action( 'network_admin_menu', array( $this, 'add_network_admin_menu' ), 100 );

		if ( ! Functions::is_multisite( false ) ) {
			return;
		}

		$options               = Options::get_network_options();
		$pattern_configuration = $options['patternConfiguration'] ?? 'local_only';

		if ( 'local_only' !== $pattern_configuration ) {
			add_filter( 'display_site_states', array( $this, 'add_pattern_source_state' ), 10, 2 );
			add_action( 'network_site_info_form', array( $this, 'add_pattern_configuration_field' ) );
			add_action( 'admin_init', array( $this, 'maybe_save_site_pattern_configuration' ) );
		}

		if ( (bool) $options['showNetworkPatternColumns'] ) {
			add_filter( 'manage_sites-network_columns', array( $this, 'add_patterns_column' ) );
			add_action( 'manage_sites_custom_column', array( $this, 'manage_patterns_column' ), 10, 2 );
			add_action( 'manage_sites_custom_column', array( $this, 'manage_patterns_configuration_column' ), 10, 2 );
		}
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
	 * @param array    $site_states Array of site states.
	 * @param \WP_Site $site        Site object.
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

		// Get network_source (default network site) selected data.
		$network_source_site_id        = Functions::get_network_default_patterns_site_id();
		$network_source_site_permalink = get_admin_url( $network_source_site_id );
		$network_source_site_title     = Functions::get_network_site_name( $network_source_site_id );

		// Create the patterns URL for the network_source site.
		$patterns_url = get_admin_url( $network_source_site_id, 'edit.php?post_type=wp_block' );

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
				'selectedSite'            => $network_source_site_id,
				'selectedSitePermalink'   => $network_source_site_permalink,
				'selectedSiteTitle'       => $network_source_site_title,
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
		// Insert our column after the URL column.
		foreach ( $columns as $key => $value ) {
			$new_columns[ $key ] = $value;
			if ( 'blogname' === $key ) {
				$new_columns['pattern_count']         = esc_html__( 'Local Patterns', 'pattern-wrangler' );
				$new_columns['pattern_configuration'] = esc_html__( 'Patterns Configuration', 'pattern-wrangler' );

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
		if ( 'pattern_count' !== $column_name ) {
			return;
		}

		$count = get_site_transient( 'dlx_pw_patterns_count_' . $blog_id );
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
			set_site_transient( 'dlx_pw_patterns_count_' . $blog_id, $count, 5 * MINUTE_IN_SECONDS );
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
	 * Manage content for patterns configuration column.
	 *
	 * @param string $column_name Column being displayed.
	 * @param int    $blog_id     The blog ID.
	 */
	public function manage_patterns_configuration_column( $column_name, $blog_id ) {
		if ( 'pattern_configuration' !== $column_name ) {
			return;
		}

		$options = Options::get_network_options();

		// Get network pattern configuration.
		$network_pattern_configuration = $options['patternConfiguration'];

		$configuration = get_site_transient( 'dlx_pw_patterns_configuration_' . $blog_id );
		if ( false === $configuration ) {
			$configuration = Functions::get_network_pattern_configuration( $blog_id );
			set_site_transient( 'dlx_pw_patterns_configuration_' . $blog_id, $configuration, 5 * MINUTE_IN_SECONDS );
		}

		// If site and network pattern configuration are the same, show inherit from network. Only show the network configuration if it is different from the site configuration.
		if ( $network_pattern_configuration === $configuration ) {
			echo esc_html__( 'Inherit from Network', 'pattern-wrangler' );
			return;
		}

		switch ( $configuration ) {
			case 'network_only':
				echo esc_html__( 'Network Only', 'pattern-wrangler' );
				break;
			case 'local_only':
				echo esc_html__( 'Local Only', 'pattern-wrangler' );
				break;
			case 'hybrid':
				echo esc_html__( 'Hybrid', 'pattern-wrangler' );
				break;
			case 'inherit':
				echo esc_html__( 'Inherit from Network', 'pattern-wrangler' );
				break;
			default:
				echo esc_html__( 'Inherit from Network', 'pattern-wrangler' );
				break;
		}
	}

	/**
	 * Save per-site pattern configuration when the network site info form is submitted.
	 *
	 * @return void
	 */
	public function maybe_save_site_pattern_configuration() {
		if ( ! is_network_admin() || ! current_user_can( 'manage_network' ) ) {
			return;
		}

		$post_action = sanitize_text_field( wp_unslash( filter_input( INPUT_POST, 'dlx_pw_action', FILTER_SANITIZE_SPECIAL_CHARS ) ) );
		$site_id     = absint( wp_unslash( filter_input( INPUT_POST, 'id', FILTER_VALIDATE_INT ) ) );

		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		if ( empty( $post_action ) || 'update-site' !== $post_action ) {
			return;
		}

		if ( $site_id <= 0 ) {
			return;
		}

		$this->save_site_configuration( $site_id );
	}

	/**
	 * Save site pattern configuration.
	 *
	 * @param int|\WP_Site $site Site ID or site object.
	 * @return void
	 */
	public function save_site_configuration( $site ) {
		$site_id = is_object( $site ) ? absint( $site->blog_id ) : absint( $site );
		if ( $site_id <= 0 ) {
			return;
		}

		if ( Functions::is_network_patterns_site( $site_id ) ) {
			return;
		}

		$nonce = sanitize_text_field( wp_unslash( filter_input( INPUT_POST, 'dlx_pattern_configuration_nonce', FILTER_SANITIZE_SPECIAL_CHARS ) ) );
		if ( ! wp_verify_nonce( $nonce, 'dlx_pattern_configuration_nonce' ) || ! current_user_can( 'manage_network' ) ) {
			return;
		}

		$pattern_config = sanitize_text_field( wp_unslash( filter_input( INPUT_POST, 'dlx_pw_pattern_config', FILTER_SANITIZE_SPECIAL_CHARS ) ) );
		$allowed        = array( 'inherit', 'network_only', 'local_only', 'hybrid' );
		if ( ! in_array( $pattern_config, $allowed, true ) ) {
			$pattern_config = 'inherit';
		}

		update_blog_option( $site_id, 'dlx_pattern_configuration', $pattern_config );
		delete_site_transient( 'dlx_pw_patterns_configuration_' . $site_id );
	}

	/**
	 * Add pattern configuration field to site info screen.
	 *
	 * @param int $site_id The site ID.
	 */
	public function add_pattern_configuration_field( $site_id ) {
		$site_id = absint( $site_id );
		if ( $site_id <= 0 ) {
			return;
		}
		if ( Functions::is_network_patterns_site( $site_id ) ) {
			return;
		}

		$pattern_config_value = get_blog_option( $site_id, 'dlx_pattern_configuration', '' );
		if ( ! empty( $pattern_config_value ) && 'inherit' !== $pattern_config_value ) {
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
					<input type="hidden" name="dlx_pw_action" value="update-site" />
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
					</select>
					<p class="description">
						<?php esc_html_e( 'Configure how patterns work for this site.', 'pattern-wrangler' ); ?>
					</p>
				</td>
			</tr>
		</table>
		<?php
	}
}
