=== Pattern Wrangler - Manage Block Patterns and Pattern Categories ===
Contributors: ronalfy
Tags: patterns, block patterns, pattern, pattern builder, synced patterns
Requires at least: 6.8
Tested up to: 7.0
Requires PHP: 7.2
Stable tag: 2.5.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Curate, build, and manage your block patterns, registered patterns, synced patterns, and pattern categories efficiently with Pattern Wrangler.

== Description ==

Pattern Wrangler is a pattern manager which helps curates a bloated pattern library, and makes managing a complicated WordPress block pattern library a breeze. If you manage dozens of layouts, are in love with reusable blocks (or synced patterns), you will love this plugin.

This handy plugin is designed for both classic and modern themes, block themes (including FSE - Full-site editing), and is compatible with page builders through its shortcode support and PHP code snippets. Pattern Wrangler allows you to manage a complicated and heavy library for your clients, controlling down to the block pattern and category what the client sees in the block editor when building layouts.

The plugin features several pattern builder helpers, such as duplicating a pattern, deleting reusable blocks, copying theme templates to a synced pattern, version control snapshots (similar to pattern revisions), and much more. This not only helps you manage patterns, but build them as well.

https://www.youtube.com/watch?v=tFnnki9ZOLg

Here are the major features:

* **Comprehensive Pattern Grid View** - This view shows at a glance all of the available items for your site. You can sort through both local (synced and unsynced) and registered layouts, and selectively disable or enable whatever items you'd like your client to see. A real-time preview is available by clicking on the pattern.
* **Hide All Patterns** - Completely hide items from the block editor in one click. This also hides the menu item.
* **Disable Patterns One-by-One** - Hide core, remote, theme, or plugin items while keeping your custom ones visible. You can also hide synced and unsynced layouts together or separately. You can disable each pattern individually, or in bulk.
* **Pattern Category Management** - Disable, map, and rename registered pattern categories from themes and plugins for better organization. This will help you keep local and registered items organized together. For example, you'd like to create a "Call to Action" category for a local pattern, but a registered category already exists, resulting in a duplicate. In this case, map the registered category to the local one and remove the duplicate one.
* **Output Anywhere** - Use a shortcode or PHP function to a local pattern in page builders, widgets, your theme, or in other blocks. This works well in Multisite and allows you to use reusable blocks across the network.
* **Pattern Preview** - Preview a pattern as it would appear on the frontend with shortcuts in the block editor.
* **Pattern Builder Features** - Quickly duplicate a pattern, copy a local pattern to a synced pattern, delete, copy, and export as needed.
* **Version Control Features** - Save a snapshot as you build patterns, for quick restoration later. These differ from pattern revisions in that revisions are stored per save, whereas "Pattern Versions" are more explicit. As a result, you can restore, export, copy, and create a new item from any stored version.
* **Cross-Site Pattern Copying** - Transfer any pattern, including the remote images, between WordPress sites effortlessly using this built-in block. Paste in a block pattern, and it'll do some sanity checking, and download any remote images to your media library. This is useful if you're copying a pattern from production to local, and need to bring along the images.

Available features include:

* Sort between Local and Registered items.
* Filter between pattern categories and pattern source.
* Bulk-assign pattern categories for easier sorting and organization.
* Click a pattern to view a real-time preview in a lightbox.
* Copy theme layouts to a local database-stored copy.
* Export any pattern to JSON, whether it is a registered or synced pattern.
* Copy a pattern to the clipboard.
* Disable each pattern individually.
* Quickly edit unsynced layouts and reusable blocks.
* Shortcuts to quickly create, edit, export, and import items.
* Quickly build patterns and preview them as needed, in a friendly user-interface.

Available features on the Pattern Categories screen include:

* Sort between local and registered categories.
* Disable and map registered categories to local ones.
* Easily create new categories.
* Delete local categories as needed.
* Bulk options allow you to disable, and enable registered categories.

=== Quick Links ===

<a href="https://docs.dlxplugins.com/v/pattern-wrangler">All Features and Documentation</a> | <a href="https://github.com/sponsors/DLXPlugins">Sponsor Us</a> | <a href="https://dlxplugins.com/plugins/pattern-wrangler/">Pattern Wrangler Home</a>

> Source code is available on <a href="https://github.com/DLXPlugins/pattern-wrangler">GitHub</a>. Code contributions and sponsorships appreciated.

=== Requirements and Compatibility ===

Requires WordPress 6.8 or higher. 6.9 is recommended.

This plugin is fully compatible with most themes, including block themes and the Full-Site Editor. It is ideal for hybrid setups (blocks + classic) and/or page builders. A common use-case is if you need to use a block plugin in a non-block layout. You can create a new pattern, configure the block, and use the built-in shortcode to display it. If you need to use the pattern in a template, you can use the built-in PHP function, which is available for all unsynced and synced patterns. If you're on a network, the built-in shortcodes and PHP functions work network-wide, so you can have a synced pattern from Site A show up on Site B.

This plugin has been tested almost exclusively with <a href="https://wordpress.org/themes/ollie/">the Ollie theme</a>, which is a phenomenal block theme. All the 202x themes have also been tested, as well as Blocksy, Astra, and GeneratePress.

If you have any issues with the previews, please be patient in your support requests, and also specific as to which themes or plugins may be involved.

=== Integrations ===

This plugin integrates well with the following:

* <a href="https://wordpress.org/plugins/synced-pattern-popups/">Synced Pattern Popups</a>: Synced Pattern Popups helps you create popups using the WordPress editor you already know, not yet another builder.
* <a href="https://wordpress.org/plugins/block-visibility/">Block Visibility</a>: Easily create dynamic content in WordPress that will increase conversions, enhance the user experience, and improve your workflow.
* Spectra, Kadence, and GenerateBlocks.

If you have an idea for other integrations, please leave a support thread.

=== Help This Plugin Grow ===

❤️ Please help spread the word about this plugin through your kind review and by telling others about this plugin.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/pattern-wrangler` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Find the Patterns menu item, and begin creating.

== Frequently Asked Questions ==

= What is Pattern Wrangler used for? =

Pattern Wrangler is often used to curate the client experience when adding layouts via the block editor or full-site editor. It can be used to enable/disable various pattern types, as well as allow  you to individually enable or disable a specific pattern, whether registered or local.

By doing this, you can trim a pattern library that is in the hundreds down to a more manageable number that are actively being used.

Others have used this plugin to disable the pattern library completely. An excessive library can slow down the block editor. With Multisite support, you can even disable patterns network-wide.

= How can I view the old wp_block post type screen? =

You can still visit it by adding `override=1`: `https://yourdomain.com/wp-admin/edit.php?post_type=wp_block&override=1`

= Can I disable the new Grid View screen? =

Yes. In the Pattern Wrangler settings, toggle the Enhanced option to off, save, and refresh. The original WordPress block pattern screen will display.

= Can I embed Patterns in page builders like Elementor? =

Yes! You can use the `[wp_block slug="pattern-slug"]` shortcode <a href="https://docs.dlxplugins.com/pattern-wrangler/features/the-pattern-importer-block">to output block layouts anywhere</a> in your theme or other blocks. The Pattern must be a local pattern (i.e., reusable block or unsynced pattern).

= Does this work with Block Themes? =

Yes, Pattern Wrangler sits outside of the Full-site Editor in a top-level menu item. This screen allows you to configure both local and registered items together, curating what is shown inside FSE. 

= Does this plugin work on WordPress.(com)? =

No, this plugin works best with self-hosted installs (normal installs).

This plugin uses newer APIs (DataViews) that WordPress.com doesn't allow a custom version of, and the one that ships with Core isn't at the latest version, so the plugin can't get rid of the dependency.

= The preview for a pattern isn't working or is formatted wrong. =

I've done my best for previews in 2.0, and I know the finished result isn't perfect. The preview feature took several months of solo-developer time, and I've put my best foot forward. I know there will be preview bugs, but with patience, I'm sure we can fix the quirks together.

If you can, please be detailed in any support requests as to which plugin or theme might be causing the pattern issue. I don't advise pasting pattern code on .org, so the best way to reach me is via my support form, which you can find in the Pattern Wrangler admin settings.

That being said, some layouts are unsalvageable, and should just be disabled or deleted if not being used.

== Screenshots ==

1. Enhanced Grid View Screen, showing local and registered layouts together in an easily sortable interface.
2. Contextual shortcuts allow you to quickly edit, disable, and enable items. Shortcuts such as Copy Pattern to Clipboard and Export to JSON are also present.
3. Filter by all available registered and local categories, or even plugins such as WooCommerce.
4. Admin option to disable all patterns, disabling remote, theme, plugin, unsynced, synced, and uncategorized items.
5. Customizer options such as hiding or showing the customizer UI. Miscellaneous options such as showing the menus UI, and allowing items to be exported.
6. Map registered categories to local categories to prevent duplicates when viewing the block layouts.
7. An organized pattern library, demonstrating a trimmed down view and less category clutter.

== Changelog ==

= 2.4.6 =
* Released 2026-05-09
* Fix: Previews would prevent blocks with header/footer markup from displaying.
* Fix: Previews wouldn't strip out excess space above the preview markup.

= 2.4.5 =
* Released 2026-05-07
* New: Lightbox pattern preview has a quick toolbar, allowing you to edit, delete, export, and copy a pattern from the preview.
* New: Lightbox preview now acts as a gallery/carousel for visible patterns.
* New: Lightbox preview has mobile|tablet|desktop quick switcher.
* New: Categories bulk action view now matches the Patterns View screen.
* New: Can set the default patterns view from the admin settings. This is saved per user.
* New: Can disable pattern revisions network or site-wide.
* New: Delete button for local patterns is much more prominent (feature request) on the card, bulk actions, and preview modal.
* New: Copying a pattern to local now inherits the title and categories, saving some time.
* New: You can skip editing a pattern when creating, copying, or duplicating a pattern and stay on the current screen.
* Fix: Refreshing on the Patterns View screen wouldn't always take you to the correct view.
* Fix: Resolving certain theme categories from not displaying due to a conflicting variable.
* Fix: Copying certain full-page patterns would lose the reference when switching themes.
* Update: Updated DataViews component to 14.2.0.
* Update: Updated Fancybox to 6.1.4.

= 2.4.0 =
* Released 2026-04-15
* New: DataView Grid has been updated to the latest, allowing for more view customization and better accessibility.
* New: Dedicated sticky bar to handle pattern actions and pagination.
* New: Can Duplicate a synced/unsynced pattern from the Quick Action menu.
* New: Added Zoom icon to previews.
* New: Added Spectra blocks compatibility.
* New: Added Kandence Blocks compatibility.
* New: Added GeneratePress One and GenerateBlocks compatibility.
* New: Added Block Visibility compatibility.
* Fix: Preview now runs JavaScript and is much more reliable.
* Fix: Pattern preview iFrame loading states and queuing have been added for heavy pattern libraries such as WooCommerce.
* Fix: Editing a pattern now returns you back to the Patterns View screen reliably.

= 2.3.5 =
* Released 2026-03-16
* Fix: Dropdown list for categories would not appear right away and it was confusing what categories were available.
* Fix: Title of local patterns is now blue to indicate it can be clicked on.
* New: Get the Pattern code from the pattern's sidebar in the block editor.

= 2.3.1 =
* Released 2026-03-08
* Fix: Registered patterns can now be exported/imported with the proper sync status (unsynced).
* Fix: Synced patterns can now be imported without error and losing its sync status.
* Fix: Synced patterns now show the proper synce status when exported.

= 2.3.0 =
* Released 2026-01-21
* New feature: Categories View - A new dedicated Categories screen that unifies local and registered pattern categories in one place, making it easier to manage and organize your pattern categories.
* New feature: Bulk category operations - You can now enable, disable, pause, and map multiple categories at once using bulk actions.
* New feature: Category mapping - Map registered categories to local categories to prevent duplicates and better organize your pattern library.
* New feature: Integration with <a href="https://wordpress.org/plugins/synced-pattern-popups/">Synced Pattern Popups plugin</a> for copying code snippets.
* Enhancement: Category cards now show pattern counts and mapped status at a glance.
* Bug fix: Fixed issue where registered categories weren't showing due to slug mismatches.
* Bug fix: Resolved duplicate category count display.
* Bug fix: Fixed core pattern hiding functionality in Functions.
* Bug fix: Improved handling of categories with special characters in quick edit mode.
* ❤️ Please help spread the word about this plugin through your kind review.

= 2.2.2 =
* Released 2026-01-10
* Bug fix: Registered categories weren't displaying in the card view.
* Bug fix: Local categories when renamed with special characters were erroring in quick-edit view.
* Bug fix: Empty categories are no longer shown in the filter view.

= 2.2.1 =
* Released 2026-01-08
* Bug fix: Local categories weren't displaying correctly when filtering.
* Bug fix: Clicking reset when filtering now returns to the default view (Showing All, Enabled).

= 2.2.0 =
* Released 2026-01-03
* Enhancement: Pagination now displays the total number of patterns.
* Enhancement: When copying a registered pattern to a local pattern, you can optionally disable the registered pattern.
* Enhancement: Added a "Don't show again" option for pattern deletion confirmations (stored per user).
* Bug Fix: Resolved an issue where mapped categories were not displaying correctly in the Patterns View.
* Bug Fix: Fixed an error that could occur when a pattern was unregistered and no longer present in the registry.
* Bug Fix: Categories in the Patterns View are now sorted alphabetically.

= 2.1.3 =
* Released 2025-12-31
* Bug fix: Fixed category names with special characters (such as >) displaying as HTML entities in the pattern grid view.

= 2.1.2 =
* Released 2025-12-31
* Bug fix: Fixed category names with special characters (such as >) displaying as HTML entities in the pattern grid view.

= 2.1.1 =
* Released 2025-12-22
* Hot fix: Disabling/enabling patterns would error out on some installs.

= 2.1.0 =
* Released 2025-12-22
* Bug fix: Disabling the enhanced patterns view could lead to a white screen because of a mis-placed PHP exit module.
* Bug fix: Removing JS debug error notices.
* Bug fix: There was a trailing slash added to admin-ajax.php causing previews to 404 on some installs, particularly Local.

= 2.0.5 =
* Released 2025-12-20
* Bug fix: Multisite installs wouldn't show a proper override for hiding patterns.
* New feature: Can disable the customizer if needed on single and Multisite installs.

= 2.0.2 =
* Released 2025-11-30
* Wording update: Changed copy local patterns to "Copy to New Pattern." Changed Copy Pattern to "Copy Pattern to Clipboard".
* Bug fix: Changing default view to "All|Enabled" as some were asking why I was still showing disabled/paused patterns.
* Bug fix: Remove filters if there aren't any to filter by.
* Bug fix: Preview was rendering as an admin request, preventing some block plugins from rendering.
* Bug fix: Preview was setting post data, causing some block plugins to output wrong styles.
* Bug fix: Fixing undefined variable in REST call.

= 2.0.0 =
* Released 2025-11-29
* New Patterns View screen, showing local and registered patterns together. This new screen allows you to selectively disable or enable individual patterns, as well as perform a variety of shortcuts to aid in the pattern curation experience. The ability to filter through categories and pattern sources (such as WooCommerce) allows for quick searching, particularly if you have dozens if not hundreds of patterns. A real-time preview is available for each pattern, and shortcuts such as copying a registered pattern to a local one are available.
* New feature: Multisite support. This plugin must be network-activated on a network. With this, you can quickly disable patterns network-wide with just a few clicks if needed. The network settings also allow you to set what you'd like a site admin to be in control of, such as being able to hide or show theme patterns.
* Bug fix: The preview button for local patterns is working again. I've used a more permanent approach this time.

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

= 2.4.6 =
Fixing header/footer preview markup from being displayed. Fixing excess top spacing in some previews.