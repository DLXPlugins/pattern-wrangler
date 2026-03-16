/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/blocks/plugins/pattern-code.js"
/*!***********************************************!*\
  !*** ./src/js/blocks/plugins/pattern-code.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_pattern_code_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/pattern-code-helpers */ "./src/js/utils/pattern-code-helpers.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }







/**
 * Row with read-only value and copy button.
 *
 * @param {Object}   opts             Options.
 * @param {string}   opts.label       Field label.
 * @param {string}   opts.value       Value to show and copy.
 * @param {string}   opts.copiedId    Which field just had "Copied!" (for button text).
 * @param {string}   opts.thisId      This field's id for copied state.
 * @param {Function} opts.setCopiedId Setter for copied id.
 * @param {string}   opts.help        Optional help text.
 * @return {Object} The rendered row.
 */
var CodeRow = function CodeRow(_ref) {
  var label = _ref.label,
    value = _ref.value,
    copiedId = _ref.copiedId,
    thisId = _ref.thisId,
    setCopiedId = _ref.setCopiedId,
    help = _ref.help;
  var handleCopy = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var ok;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return (0,_utils_pattern_code_helpers__WEBPACK_IMPORTED_MODULE_5__.copyToClipboard)(value);
          case 1:
            ok = _context.v;
            if (ok) {
              setCopiedId(thisId);
              setTimeout(function () {
                return setCopiedId(null);
              }, 1500);
            }
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleCopy() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "dlx-pw-pattern-code-row",
    style: {
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("style", null, "\n\t\t\t\t\t.dlx-pw-pattern-code-row {\n\t\t\t\t\t\tdisplay: grid;\n\t\t\t\t\t\tgrid-template-columns: 1fr auto;\n\t\t\t\t\t\talign-items: end;\n\t\t\t\t\t}\n\t\t\t\t\t.dlx-pw-pattern-code-row .components-base-control__field {\n\t\t\t\t\t\tmargin-bottom: 0 !important;\n\t\t\t\t\t\tpadding-bottom: 0 !important;\n\t\t\t\t\t}\n\t\t\t\t\t.dlx-pw-pattern-code-row .components-text-control__input {\n\t\t\t\t\t\tmargin-bottom: 0 !important;\n\t\t\t\t\t}\n\t\t\t\t\t.dlx-pw-pattern-code-row .components-button {\n\t\t\t\t\t\theight: 32px !important;\n\t\t\t\t\t}\n\t\t\t\t"), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: label,
    value: value,
    readOnly: true,
    help: help,
    className: "dlx-pw-pattern-code-input",
    style: {
      marginBottom: '4px'
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    text: copiedId === thisId ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Copied!', 'pattern-wrangler') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Copy', 'pattern-wrangler')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: "clipboard",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Copy', 'pattern-wrangler'),
    variant: "secondary",
    onClick: handleCopy
  })));
};

/**
 * Render a Pattern Code Panel.
 *
 * @return {Object} The rendered component.
 */
var PatternCodePanel = function PatternCodePanel() {
  var _pattern$id, _pattern$slug, _pattern$syncStatus, _pattern$siteId, _config$isMultisite, _config$syncedPattern, _config$syncedPattern2;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    copiedId = _useState2[0],
    setCopiedId = _useState2[1];
  var config = typeof window.dlxPatternWranglerPreview !== 'undefined' ? window.dlxPatternWranglerPreview : {};
  var pattern = config.pattern || {};
  var id = (_pattern$id = pattern.id) !== null && _pattern$id !== void 0 ? _pattern$id : 0;
  var slug = (_pattern$slug = pattern.slug) !== null && _pattern$slug !== void 0 ? _pattern$slug : '';
  var syncStatus = (_pattern$syncStatus = pattern.syncStatus) !== null && _pattern$syncStatus !== void 0 ? _pattern$syncStatus : 'unsynced';
  var siteId = (_pattern$siteId = pattern.siteId) !== null && _pattern$siteId !== void 0 ? _pattern$siteId : null;
  var isMultisite = (_config$isMultisite = config.isMultisite) !== null && _config$isMultisite !== void 0 ? _config$isMultisite : false;
  var syncedPatternPopupsActive = (_config$syncedPattern = config.syncedPatternPopupsActive) !== null && _config$syncedPattern !== void 0 ? _config$syncedPattern : false;
  var syncedPatternPopupsUrl = (_config$syncedPattern2 = config.syncedPatternPopupsUrl) !== null && _config$syncedPattern2 !== void 0 ? _config$syncedPattern2 : '';
  var showCode = id && slug;
  if (!showCode) {
    return /*#__PURE__*/React.createElement(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
      name: "dlx-pattern-wrangler-code-panel",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pattern Code', 'pattern-wrangler'),
      className: "dlx-pw-preview-sidebar"
    }, /*#__PURE__*/React.createElement("p", {
      className: "description"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Save the pattern to see shortcode and PHP code.', 'pattern-wrangler')));
  }
  var shortcode = (0,_utils_pattern_code_helpers__WEBPACK_IMPORTED_MODULE_5__.getPatternShortcode)(slug, siteId, isMultisite);
  var phpCode = (0,_utils_pattern_code_helpers__WEBPACK_IMPORTED_MODULE_5__.getPatternPHPFunction)(slug, siteId, isMultisite);
  var showSpp = syncedPatternPopupsActive && syncStatus === 'synced';
  return /*#__PURE__*/React.createElement(_wordpress_editor__WEBPACK_IMPORTED_MODULE_4__.PluginDocumentSettingPanel, {
    name: "dlx-pattern-wrangler-code-panel",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pattern Code', 'pattern-wrangler'),
    className: "dlx-pw-preview-sidebar"
  }, /*#__PURE__*/React.createElement("p", {
    className: "description",
    style: {
      marginBottom: '12px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Use the shortcode or PHP below to output this pattern on your site.', 'pattern-wrangler')), /*#__PURE__*/React.createElement(CodeRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pattern Shortcode', 'pattern-wrangler'),
    value: shortcode,
    copiedId: copiedId,
    thisId: "shortcode",
    setCopiedId: setCopiedId
  }), /*#__PURE__*/React.createElement(CodeRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pattern PHP Function', 'pattern-wrangler'),
    value: phpCode,
    copiedId: copiedId,
    thisId: "php",
    setCopiedId: setCopiedId
  }), showSpp && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CodeRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced Pattern Popups Trigger Code', 'pattern-wrangler'),
    value: (0,_utils_pattern_code_helpers__WEBPACK_IMPORTED_MODULE_5__.getPatternPopupTriggerCode)(id),
    copiedId: copiedId,
    thisId: "spp-trigger",
    setCopiedId: setCopiedId
  }), /*#__PURE__*/React.createElement(CodeRow, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced Pattern Popups Trigger Anchor Code', 'pattern-wrangler'),
    value: (0,_utils_pattern_code_helpers__WEBPACK_IMPORTED_MODULE_5__.getPatternPopupTriggerAnchorCode)(id),
    copiedId: copiedId,
    thisId: "spp-anchor",
    setCopiedId: setCopiedId
  }), syncedPatternPopupsUrl && /*#__PURE__*/React.createElement("p", {
    className: "description",
    style: {
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(syncedPatternPopupsUrl, "#how-to-use"),
    target: "_blank",
    rel: "noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Synced Pattern Popups documentation', 'pattern-wrangler')))));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)('dlx-pattern-wrangler-code-panel', {
  render: PatternCodePanel
});

/***/ },

/***/ "./src/js/utils/pattern-code-helpers.js"
/*!**********************************************!*\
  !*** ./src/js/utils/pattern-code-helpers.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyToClipboard: () => (/* binding */ copyToClipboard),
/* harmony export */   getPatternPHPFunction: () => (/* binding */ getPatternPHPFunction),
/* harmony export */   getPatternPopupTriggerAnchorCode: () => (/* binding */ getPatternPopupTriggerAnchorCode),
/* harmony export */   getPatternPopupTriggerCode: () => (/* binding */ getPatternPopupTriggerCode),
/* harmony export */   getPatternShortcode: () => (/* binding */ getPatternShortcode)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Shared helpers for pattern shortcode, PHP, and Synced Pattern Popups code generation.
 * Used by Pattern Get Code modal and the Pattern Code sidebar panel.
 */

/**
 * Get the pattern shortcode. Adds a site_id parameter if the site is multisite.
 *
 * @param {string}  slug        Pattern slug (post_name).
 * @param {number}  siteId      Site ID for multisite.
 * @param {boolean} isMultisite Whether the site is multisite.
 * @return {string} The pattern shortcode.
 */
function getPatternShortcode(slug, siteId, isMultisite) {
  if (isMultisite && siteId) {
    return "[wp_block slug=\"".concat(slug, "\" site_id=\"").concat(siteId, "\"]");
  }
  return "[wp_block slug=\"".concat(slug, "\"]");
}

/**
 * Get the pattern PHP function.
 *
 * @param {string}  slug        Pattern slug (post_name).
 * @param {number}  siteId      Site ID for multisite.
 * @param {boolean} isMultisite Whether the site is multisite.
 * @return {string} The PHP snippet.
 */
function getPatternPHPFunction(slug, siteId, isMultisite) {
  if (isMultisite && siteId) {
    return "<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '".concat(slug, "', ").concat(siteId, ", $echo = true ) : ''; ?>");
  }
  return "<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '".concat(slug, "', null, $echo = true ) : ''; ?>");
}

/**
 * Get the Synced Pattern Popups trigger code.
 *
 * @param {number} id Pattern (post) ID.
 * @return {string} The trigger code.
 */
function getPatternPopupTriggerCode(id) {
  return "spp-trigger-".concat(id);
}

/**
 * Get the Synced Pattern Popups trigger anchor HTML.
 *
 * @param {number} id Pattern (post) ID.
 * @return {string} The anchor code.
 */
function getPatternPopupTriggerAnchorCode(id) {
  return "<a href=\"#spp-trigger-".concat(id, "\">Open the Popup</a>");
}

/**
 * Copy text to the clipboard. Uses navigator.clipboard with execCommand fallback.
 *
 * @param {string} text Text to copy.
 * @return {Promise<boolean>} Resolves to true if copy succeeded, false otherwise.
 */
function copyToClipboard(_x) {
  return _copyToClipboard.apply(this, arguments);
}
function _copyToClipboard() {
  _copyToClipboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(text) {
    var textarea, copied, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!(navigator.clipboard && typeof navigator.clipboard.writeText === 'function')) {
            _context.n = 4;
            break;
          }
          _context.p = 1;
          _context.n = 2;
          return navigator.clipboard.writeText(text);
        case 2:
          return _context.a(2, true);
        case 3:
          _context.p = 3;
          _t = _context.v;
          return _context.a(2, false);
        case 4:
          _context.p = 4;
          textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          textarea.style.pointerEvents = 'none';
          document.body.appendChild(textarea);
          textarea.select();
          copied = document.execCommand('copy');
          document.body.removeChild(textarea);
          return _context.a(2, !!copied);
        case 5:
          _context.p = 5;
          _t2 = _context.v;
          return _context.a(2, false);
      }
    }, _callee, null, [[4, 5], [1, 3]]);
  }));
  return _copyToClipboard.apply(this, arguments);
}

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/editor"
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["editor"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/plugins"
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["plugins"];

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./src/js/blocks/plugins/pattern-preview.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pattern_code_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pattern-code.js */ "./src/js/blocks/plugins/pattern-code.js");






/**
 * Render a Preview Button.
 *
 * @return {Object} The rendered component.
 */
var PatternPreviewButton = function PatternPreviewButton() {
  return /*#__PURE__*/React.createElement(_wordpress_editor__WEBPACK_IMPORTED_MODULE_3__.PluginPostStatusInfo, {
    icon: "external",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preview Pattern', 'pattern-wrangler'),
    className: "dlx-pw-preview-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-pw-preview-sidebar-content"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preview Pattern in new tab', 'pattern-wrangler')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "tertiary",
    href: dlxPatternWranglerPreview.previewUrl,
    target: "_blank",
    icon: "external",
    iconPosition: "right",
    rel: "noopener noreferrer",
    className: "button button-secondary",
    showTooltip: true,
    style: {
      margin: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5em 1em',
      fontSize: '1em',
      fontWeight: 'normal',
      lineHeight: '1.5',
      textDecoration: 'none'
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preview Pattern in new tab', 'pattern-wrangler')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Preview Pattern', 'pattern-wrangler')))));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_2__.registerPlugin)('dlx-pattern-wrangler-preview-button', {
  render: PatternPreviewButton
});
})();

/******/ })()
;
//# sourceMappingURL=dlx-pw-preview.js.map