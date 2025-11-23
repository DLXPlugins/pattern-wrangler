=== Pattern Wrangler - Manage Block Patterns and Reusable Blocks ===
Contributors: ronalfy
Tags: patterns, reusable blocks, block editor, shortcode, block management
Requires at least: 6.5
Tested up to: 6.9
Requires PHP: 7.2
Stable tag: 2.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Manage your block patterns and reusable blocks efficiently with Pattern Wrangler.

== Description ==

Pattern Wrangler makes managing WordPress block patterns simple and efficient, with features that cater to both beginners and advanced users. Whether you're organizing patterns for a complex site, a hybrid setup, or just hiding ones you don't need, Pattern Wrangler has you covered.

Here are the major features:

* **Hide All Patterns** - Completely hide patterns from the block editor in one click. This also hides the Patterns menu item.
* **Selective Hiding** - Hide core, remote, theme, or plugin patterns while keeping your custom patterns visible. You can also hide synced and unsynced patterns together or separately.
* **Category Management** - Disable, map, and rename registered categories from themes and plugins for better organization. This will help you keep local and registered patterns organized together.
* **Output Patterns Anywhere** - Use a shortcode to display local patterns in page builders, widgets, your theme,or other blocks.
* **Pattern Preview** - Preview a pattern on the frontend with shortcuts in the block editor or from the Patterns post list view.
* **Cross-Site Pattern Copying** - Transfer patterns, including the remote images, between WordPress sites effortlessly. This is useful if you're copying a pattern from one site to another or copying a pattern from a production site to a development site.

> Pattern Wrangler integrates seamlessly with block-based and classic themes offering a hybrid setup with unmatched flexibility.

=== Quick Links ===

<a href="https://docs.dlxplugins.com/v/pattern-wrangler">All Features and Documentation</a> | <a href="https://github.com/sponsors/DLXPlugins">Sponsor Us</a> | <a href="https://dlxplugins.com/plugins/pattern-wrangler/">Pattern Wrangler Home</a>

> Source code is available on <a href="https://github.com/DLXPlugins/pattern-wrangler">GitHub</a>.

=== Requirements and Compatibility ===

Requires WordPress 6.5 or higher. 6.7 is recommended.

Fully compatible with most themes, including block themes. Ideal for hybrid setups.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/pattern-wrangler` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the plugin through the block editor by adding new patterns or importing existing ones.

== Frequently Asked Questions ==

= Can I import Patterns from any WordPress site? =

Yes! If you have the pattern's code, <a href="https://docs.dlxplugins.com/pattern-wrangler/features/the-pattern-importer-block">Pattern Wrangler can import it</a> and localize any associated images.

= Can I use Patterns in page builders like Elementor? =

Yes! You can use the `[wp_block slug="pattern-slug"]` shortcode <a href="https://docs.dlxplugins.com/pattern-wrangler/features/the-pattern-importer-block">to output block patterns anywhere</a> in your theme or other blocks.

= Does this work with Block Themes? =

Yes. Although it is designed for hybrid setups, it works with block themes, allowing you to merge theme and plugin-based patterns with your own local patterns stored in your database.

Pattern Wrangler simply makes visible the default `wp_block` post type and category, which is where local patterns are stored.

The Patterns view of this plugin uses the classic Patterns screen, with plans to eventually modernize it and put it on par with the Patterns viewer in the Full-Site Editor.

== Screenshots ==

1. An example of an organized Patterns screen.
2. Enhanced Patterns List View with shortcode and category/sync columns.
3. Map registered categories to terms, or rename for better organization or translations.
4. Enable the Customizer UI, and load Additional CSS in the block editor.
5. Hide all patterns, or hide them from core, remote, themes, or plugins.
6. Preview a Pattern on the frontend.

== Changelog ==

= 1.2.0 =
* Released 2024-12-18
* New Feature: Show or hide all unsynced (non-reusable) patterns.
* New Feature: Show or hide all synced (reusable) patterns.
* New Feature: Disable both unsynced and synced patterns to completely disable all local patterns.
* Bug fix: Preview button in the block editor has been fixed for WP 6.7.
* Note: The next major version of Pattern Wrangler (i.e., 1.3.0) will only be compatible with WP 6.7 or higher. The 1.2.x series will involve minor improvements and bug fixes.

= 1.1.2 =
* Released 2024-08-16
* Loading script translations is now working.

= 1.1.1 =
* Released 2024-08-16
* Fixing admin script enqueueing for other language support.

= 1.1.0 =
* Released 2024-05-22
* Updated Pattern Importer icon.
* Added hooks to load custom headers/footers for the preview.

= 1.0.10 =
* Released 2024-04-18
* Added miscelleanous option to make Patterns exportable via the WP exporter.
* Fixed categories not showing when resetting options.

= 1.0.9 =
* Released 2024-04-14
* Removed old dead code.
* Fixing settings and docs links.
* Initial WordPress.org release!

= 1.0.7 =
* Released 2024-04-12
* Fixing sanitization issues.
* Added Fancybox to Patterns screen. See @fancyapps/ui for more information.
* Fixed issue with mapped patterns would not show up if a category was empty.

= 1.0.3 =
* Released 2024-04-09
* Refactored categories so only registed categories can be mapped to terms.

= 1.0.1 =
* Added variable height preview image to Patterns screen.
* Added Pattern Categories to Patterns menu item.
* Removing unneeded code.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.2.0 =
New features: Show or hide all synced or unsynced patterns, or disable both to completely disable all local patterns. Bug fix: Preview has been fixed for WP 6.7. Note: To keep up with the pace of WP development, the nex major version (i.e., 1.3.0) will have WP 6.7 and above as a requirement.