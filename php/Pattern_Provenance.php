<?php
/**
 * Pattern instance provenance for block editor inserts.
 *
 * @package PatternWrangler
 */

namespace DLXPlugins\PatternWrangler;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Enqueues editor scripts and exposes provenance helpers.
 */
class Pattern_Provenance {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
	}

	/**
	 * Enqueue pattern provenance script when tracking is enabled.
	 */
	public function enqueue_block_editor_assets() {
		$options = Options::get_options();
		if ( empty( $options['trackPatternInstances'] ) ) {
			return;
		}

		$asset_file = Functions::get_plugin_dir( 'build/dlx-pw-pattern-provenance.asset.php' );
		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$deps = require $asset_file;
		wp_enqueue_script(
			'dlx-pw-pattern-provenance',
			Functions::get_plugin_url( 'build/dlx-pw-pattern-provenance.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);

		wp_localize_script(
			'dlx-pw-pattern-provenance',
			'dlxPatternWranglerProvenance',
			array(
				'trackPatternInstances' => true,
				'blogId'                => absint( get_current_blog_id() ),
			)
		);
	}

	/**
	 * Read pattern instance provenance from a parsed block array.
	 *
	 * @param array $block Parsed block from parse_blocks().
	 * @return array|null Provenance record or null.
	 */
	public static function get_pattern_instance_provenance( $block ) {
		if ( empty( $block['attrs']['metadata']['patternWrangler'] ) ) {
			return null;
		}

		$provenance = $block['attrs']['metadata']['patternWrangler'];
		if ( ! is_array( $provenance ) || 'pattern-instance' !== ( $provenance['type'] ?? '' ) ) {
			return null;
		}

		return $provenance;
	}

	/**
	 * Resolve wp_block details from a provenance source record.
	 *
	 * @param array $provenance Provenance record.
	 * @return array|null Pattern details or null if not found.
	 */
	public static function resolve_pattern_instance_source( $provenance ) {
		if ( empty( $provenance['source'] ) || ! is_array( $provenance['source'] ) ) {
			return null;
		}

		$source = $provenance['source'];
		if ( 'wp_block' !== ( $source['type'] ?? '' ) ) {
			return null;
		}

		$site_id    = absint( $source['siteId'] ?? 0 );
		$pattern_id = absint( $source['patternId'] ?? 0 );
		if ( ! $pattern_id ) {
			return null;
		}

		$switched = false;
		if ( is_multisite() && $site_id && get_current_blog_id() !== $site_id ) {
			switch_to_blog( $site_id );
			$switched = true;
		}

		$pattern = get_post( $pattern_id );
		if ( ! $pattern || 'wp_block' !== $pattern->post_type ) {
			if ( $switched ) {
				restore_current_blog();
			}
			return null;
		}

		$sync_status_meta = get_post_meta( $pattern_id, 'wp_pattern_sync_status', true );
		$sync_status      = ( 'unsynced' === $sync_status_meta ) ? 'unsynced' : 'synced';

		$resolved = array(
			'id'         => $pattern_id,
			'title'      => $pattern->post_title,
			'slug'       => $pattern->post_name,
			'status'     => $pattern->post_status,
			'syncStatus' => $sync_status,
			'siteId'     => $site_id ? $site_id : get_current_blog_id(),
		);

		if ( $switched ) {
			restore_current_blog();
		}

		return $resolved;
	}
}
