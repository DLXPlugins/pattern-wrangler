=== Pattern Wrangler - Manage Reusable Blocks and Patterns ===
Contributors: ronalfy
Tags: patterns, manage, shortcode, reusable, block
Requires at least: 6.5
Tested up to: 6.6
Requires PHP: 7.2
Stable tag: 1.1.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Manage your block patterns efficiently with Pattern Wrangler.

== Description ==

Pattern Wrangler enhances your experience with WordPress block patterns by adding a few features that let you:

* Hide All Patterns - If you need to hide patterns completely from the block editor, you can do so with a single click.
* Hide Core and Remote Patterns - If you only want to show patterns you've created, you can hide all core and remote patterns.
* Hide Theme and Plugin Patterns - If you only want to show patterns you've created, you can hide all patterns from themes and plugins.
* Map and Rename Registered Categories - If you have a lot of patterns, you can map them to categories and rename the categories to something more meaningful.
* Output Patterns With a Shortcode - If you want to output a pattern in a page builder or widget, you can do so with a shortcode. This is compatible with most block plugins.
* Copy Patterns From Site to Site - If you have a post on one site, you can copy it over, including the images, using the Pattern Importer block.

=== Quick Links ===

<a href="https://docs.dlxplugins.com/v/pattern-wrangler">All Features and Documentation</a> | <a href="https://github.com/sponsors/DLXPlugins">Sponsor Us</a> | <a href="https://dlxplugins.com/plugins/pattern-wrangler/">Pattern Wrangler Home</a>

> Source code is available on <a href="https://github.com/DLXPlugins/pattern-wrangler">GitHub</a>.

=== Requirements and Compatibility ===

Requires WordPress 6.5 or higher.

Compatible with most themes, including block themes.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/pattern-wrangler` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the plugin through the block editor by adding new patterns or importing existing ones.

== Frequently Asked Questions ==

= Can Pattern Wrangler import patterns from any WordPress site? =

Yes, as long as you have the pattern's code, Pattern Wrangler can import it and localize any images found within.

== Screenshots ==

1. An example of an organized Patterns screen.
2. Enhanced Patterns List View with shortcode and category/sync columns.
3. Map registered categories to terms, or rename for better organization or translations.
4. Enable the Customizer UI, and load Additional CSS in the block editor.
5. Hide all patterns, or hide them from core, remote, themes, or plugins.
6. Preview a Pattern on the frontend.

== Changelog ==

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

= 1.1.2 =
Loading script translations is now working.