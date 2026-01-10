/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
(function () {
  'use strict';

  var __ = wp.i18n.__;
  var speak = wp.a11y.speak;

  /**
   * Determine if an element is visible or not.
   *
   * @param {Element} element The element to check if visible or not.
   * @return {boolean} true if visible, false if not.
   */
  var isVisible = function isVisible(element) {
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  };

  // Set up copy event.
  var copyShortcodeButtons = document.querySelectorAll('.dlxpw-copy-shortcode');
  var clipboardSupported = typeof ClipboardItem !== 'undefined';
  if (clipboardSupported && copyShortcodeButtons) {
    copyShortcodeButtons.forEach(function (button) {
      button.classList.remove('dlx-copy-shortcode-hidden');
      button.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the value of the previous input element.
        var input = button.previousElementSibling;
        if (input && input.tagName.toLowerCase() === 'input') {
          var shortcodeValue = input.value;

          // Copy the value to the clipboard.
          navigator.clipboard.writeText(shortcodeValue).then(function () {
            // Logs success message  in console.

            // a11y text here.
            speak(__('Shortcode copied to clipboard', 'pattern-wrangler'), 'assertive');
            var buttonIcon = button.querySelector('span');

            // Replace button content with "Copied" text.
            buttonIcon.classList.remove('dashicons-clipboard');
            buttonIcon.classList.add('dashicons-yes');

            // Revert back to original state after 3 seconds.
            setTimeout(function () {
              buttonIcon.classList.remove('dashicons-yes');
              buttonIcon.classList.add('dashicons-clipboard');
            }, 3000);
          })["catch"](function (error) {
            // Logs error message  in console.
            console.error('Error copying shortcode to clipboard:', error);
          });
        }
      });
    });
  }
})();
/******/ })()
;
//# sourceMappingURL=dlx-pw-post-utilities.js.map