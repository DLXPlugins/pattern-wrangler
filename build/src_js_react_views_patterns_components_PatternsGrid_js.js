(globalThis["webpackChunkpattern_wrangler"] = globalThis["webpackChunkpattern_wrangler"] || []).push([["src_js_react_views_patterns_components_PatternsGrid_js"],{

/***/ "./src/js/react/components/Notice/index.js":
/*!*************************************************!*\
  !*** ./src/js/react/components/Notice/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// eslint-disable-next-line no-unused-vars

 // ES6




var Notice = function Notice(props) {
  var message = props.message,
    status = props.status,
    politeness = props.politeness,
    icon = props.icon,
    className = props.className,
    inline = props.inline,
    children = props.children,
    _props$hasToTop = props.hasToTop,
    hasToTop = _props$hasToTop === void 0 ? false : _props$hasToTop;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__.speak)(message, politeness);
  }, [message, status, politeness]);
  var hasIcon = function hasIcon() {
    return icon !== null;
  };
  var getIcon = function getIcon(Icon) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Icon, {
      width: 16,
      height: 16,
      fill: "#6c757d"
    });
  };
  var containerClasses = classnames__WEBPACK_IMPORTED_MODULE_4___default()(className, 'dlx-pw-admin__notice', _defineProperty(_defineProperty(_defineProperty({
    'dlx-pw-admin__notice--has-icon': hasIcon()
  }, "dlx-pw-admin__notice-type--".concat(status), true), "dlx-pw-admin__notice-appearance--inline", inline), "dlx-pw-admin__notice-appearance--block", !inline));
  var actions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Back to Top', 'wp-dlx-pw-comments'),
    url: '#dlx-pw-admin-header',
    variant: 'link',
    className: 'dlx-pw-admin__notice-action dlx-pw-admin__notice-action--to-top'
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: containerClasses
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, _extends({
    isDismissible: false,
    spokenMessage: message,
    actions: hasToTop ? actions : []
  }, props), hasIcon() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-admin__notice-icon"
  }, getIcon(icon)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-admin__notice-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, message, " ", children, " "))));
};
Notice.defaultProps = {
  message: '',
  status: 'info',
  politeness: 'polite',
  icon: null,
  className: '',
  inline: false,
  hasToTop: false
};
Notice.propTypes = {
  message: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string).isRequired,
  status: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['info', 'warning', 'success', 'error']),
  politeness: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['assertive', 'polite']),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  inline: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  hasToTop: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notice);

/***/ }),

/***/ "./src/js/react/utils/SendCommand.js":
/*!*******************************************!*\
  !*** ./src/js/react/utils/SendCommand.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sendCommand)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-undef */
/* eslint-disable camelcase */


function sendCommand(action, data) {
  var ajaxUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var params = {
    action: action
  };
  var default_data = {
    nonce: false,
    action: action
  };
  if ('undefined' === typeof data) {
    data = {};
  }
  for (var opt in default_data) {
    if (!data.hasOwnProperty(opt)) {
      data[opt] = default_data[opt];
    }
  }
  var sendAjaxUrl = '';
  if (typeof ajaxurl === 'undefined') {
    sendAjaxUrl = ajaxUrl;
  } else {
    sendAjaxUrl = ajaxurl;
  }
  var options = {
    method: 'post',
    url: sendAjaxUrl,
    params: params,
    paramsSerializer: function paramsSerializer(jsparams) {
      return qs__WEBPACK_IMPORTED_MODULE_0___default().stringify(jsparams, {
        arrayFormat: 'brackets'
      });
    },
    data: qs__WEBPACK_IMPORTED_MODULE_0___default().stringify(data)
  };
  return (0,axios__WEBPACK_IMPORTED_MODULE_1__["default"])(options);
}

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternCreateModal/index.js":
/*!****************************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternCreateModal/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/SendCommand */ "./src/js/react/utils/SendCommand.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Notice */ "./src/js/react/components/Notice/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-unused-vars









// Local imports.



/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
var PatternCreateModal = function PatternCreateModal(props) {
  var originalCategories = props.categories || [];
  var categories = (props.categories || []).map(function (category) {
    return category.label || category.name;
  });
  var localPatternCategories = (props.patternCategories || []).map(function (category) {
    return category.label || category.name;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.copyPatternId || 0),
    _useState2 = _slicedToArray(_useState, 1),
    copyPatternId = _useState2[0];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.syncedDefaultStatus || 'synced'),
    _useState4 = _slicedToArray(_useState3, 1),
    syncedDefaultStatus = _useState4[0];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.syncedDisabled || false),
    _useState6 = _slicedToArray(_useState5, 1),
    syncedDisabled = _useState6[0];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isSaving = _useState8[0],
    setIsSaving = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.isEditMode || false),
    _useState10 = _slicedToArray(_useState9, 2),
    isEditMode = _useState10[0],
    setIsEditMode = _useState10[1];
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
      defaultValues: {
        patternId: props.patternId || 0,
        patternNonce: props.patternNonce || '',
        patternTitle: props.patternTitle || '',
        patternCategories: localPatternCategories || [],
        patternSyncStatus: props.patternSyncStatus || syncedDefaultStatus,
        patternCopyId: copyPatternId
      }
    }),
    control = _useForm.control,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    setError = _useForm.setError,
    trigger = _useForm.trigger,
    setValue = _useForm.setValue;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields;

  /**
   * Get the label id by value.
   *
   * @param {string} labelValue The label value.
   *
   * @return {string|null} The label id.
   */
  var getIdByValue = function getIdByValue(labelValue) {
    var label = originalCategories.find(function (findLabel) {
      var findNewLabel = findLabel.label || findLabel.name;
      return findNewLabel.toLowerCase() === labelValue.toLowerCase();
    });
    return label ? label.id : 0;
  };
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(formData) {
      var newCategories, path, response, patternId, redirectUrl;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSaving(true);
            newCategories = formData.patternCategories.map(function (category) {
              return {
                name: category,
                id: getIdByValue(category)
              };
            });
            path = isEditMode ? '/dlxplugins/pattern-wrangler/v1/patterns/update/' : '/dlxplugins/pattern-wrangler/v1/patterns/create/';
            _context.next = 5;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: path,
              method: 'POST',
              data: {
                patternId: formData.patternId,
                patternNonce: formData.patternNonce,
                nonce: dlxEnhancedPatternsView.createNonce,
                patternTitle: formData.patternTitle,
                patternCategories: newCategories,
                patternSyncStatus: formData.patternSyncStatus,
                patternCopyId: formData.patternCopyId
              }
            });
          case 5:
            response = _context.sent;
            if (response !== null && response !== void 0 && response.error) {
              setError('patternTitle', {
                message: response.error
              });
            } else {
              patternId = response.patternId;
              if (!isEditMode) {
                redirectUrl = encodeURIComponent(window.location.href);
                window.location.href = "".concat(dlxEnhancedPatternsView.getSiteBaseUrl, "post.php?post=").concat(patternId, "&action=edit&redirect_to=").concat(redirectUrl);
              } else {
                props.onEdit(response);
              }
            }
            setIsSaving(false);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Get the button text.
   *
   * @return {string} The button text.
   */
  var getButtonText = function getButtonText() {
    var buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add Pattern', 'pattern-wrangler');
    if (isEditMode) {
      buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Save Pattern', 'pattern-wrangler');
    }
    if (isSaving) {
      buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Saving Pattern…', 'pattern-wrangler');
    }
    return buttonText;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: props.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add Pattern', 'pattern-wrangler'),
    onRequestClose: props.onRequestClose,
    focusOnMount: "firstContentElement"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    control: control,
    name: "patternTitle",
    rules: {
      required: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pattern title is required.', 'pattern-wrangler')
    },
    render: function render(_ref2) {
      var field = _ref2.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pattern Title', 'pattern-wrangler'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter the title of the pattern.', 'pattern-wrangler'),
        value: field.value,
        onChange: function onChange(value) {
          return field.onChange(value);
        },
        disabled: isSaving
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    control: control,
    name: "patternCategories[]",
    render: function render(_ref3) {
      var field = _ref3.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Categories', 'pattern-wrangler'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Enter the categories of the pattern.', 'pattern-wrangler'),
        value: field.value,
        onChange: function onChange(tokens) {
          field.onChange(tokens);
        },
        tokenizeOnSpace: false,
        allowMultiple: true,
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Add a category', 'pattern-wrangler'),
        suggestions: categories,
        disabled: isSaving,
        __experimentalShowHowTo: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
        className: "description"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Separate with commas or press the Enter key.', 'pattern-wrangler')));
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_8__.Controller, {
    control: control,
    name: "patternSyncStatus",
    render: function render(_ref4) {
      var field = _ref4.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Sync Status', 'pattern-wrangler'),
        isAdaptiveWidth: true,
        value: field.value,
        onChange: function onChange(value) {
          field.onChange(value);
        },
        disabled: isSaving || syncedDisabled
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
        value: "synced",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Synced', 'pattern-wrangler'),
        showTooltip: true,
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Synced', 'pattern-wrangler'),
        disabled: syncedDisabled
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
        value: "unsynced",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Unsynced', 'pattern-wrangler'),
        showTooltip: true,
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Unsynced', 'pattern-wrangler'),
        disabled: syncedDisabled
      })));
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    type: "submit",
    disabled: isSaving
  }, getButtonText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: props.onRequestClose,
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'pattern-wrangler'))), (errors === null || errors === void 0 ? void 0 : errors.patternTitle) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "dlx-pw-admin-notice",
    status: "error",
    inline: true,
    icon: function icon() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null);
    }
  }, errors.patternTitle.message)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternCreateModal);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternDeleteModal/index.js":
/*!****************************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternDeleteModal/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/SendCommand */ "./src/js/react/utils/SendCommand.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Notice */ "./src/js/react/components/Notice/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-unused-vars









// Local imports.



/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
var PatternDeleteModal = function PatternDeleteModal(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSaving = _useState2[0],
    setIsSaving = _useState2[1];
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
      defaultValues: {
        items: props.items || [],
        patternNonce: props.patternNonce || '',
        forceDelete: false
      }
    }),
    control = _useForm.control,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    setError = _useForm.setError,
    trigger = _useForm.trigger,
    setValue = _useForm.setValue;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields;
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(formData) {
      var itemIdsAndNonces, path, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSaving(true);
            itemIdsAndNonces = formData.items.map(function (item) {
              return {
                id: item.id,
                nonce: item.editNonce
              };
            });
            path = '/dlxplugins/pattern-wrangler/v1/patterns/delete/';
            _context.next = 5;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: path,
              method: 'POST',
              data: {
                items: itemIdsAndNonces
              }
            });
          case 5:
            response = _context.sent;
            props.onDelete(response, itemIdsAndNonces);
            setIsSaving(false);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Get the button text.
   *
   * @return {string} The button text.
   */
  var getButtonText = function getButtonText() {
    var buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Delete Pattern', 'Delete Patterns', props.items.length, 'pattern-wrangler');
    if (isSaving) {
      buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Deleting Pattern…', 'Deleting Patterns…', props.items.length, 'pattern-wrangler');
    }
    return buttonText;
  };

  /**
   * Get the modal title.
   *
   * @return {string} The modal title.
   */
  var getModalTitle = function getModalTitle() {
    if (props.items.length === 1) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Delete Pattern', 'pattern-wrangler');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Delete Pattern', 'Delete Patterns', props.items.length, 'pattern-wrangler');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: getModalTitle(),
    onRequestClose: props.onRequestClose,
    focusOnMount: "firstContentElement"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    type: "submit",
    isDestructive: true,
    disabled: isSaving
  }, getButtonText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: props.onRequestClose,
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'pattern-wrangler'))), (errors === null || errors === void 0 ? void 0 : errors.patternTitle) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "dlx-pw-admin-notice",
    status: "error",
    inline: true,
    icon: function icon() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null);
    }
  }, errors.patternTitle.message)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternDeleteModal);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternGetCodeModal/index.js":
/*!*****************************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternGetCodeModal/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-unused-vars




/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
var PatternGetCodeModal = function PatternGetCodeModal(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dlxEnhancedPatternsView.isMultisite),
    _useState2 = _slicedToArray(_useState, 1),
    isMultisite = _useState2[0];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    shortcodeInputRef = _useState4[0],
    setShortcodeInputRef = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    phpFunctionInputRef = _useState6[0],
    setPhpFunctionInputRef = _useState6[1];
  var addCopyClipboardButton = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(inputRef, text) {
      var copyButton, handleCopy;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            copyButton = document.createElement('button');
            copyButton.classList.add('dlx-pw-copy-shortcode');
            copyButton.innerHTML = '<span class="dashicons dashicons-clipboard"></span>';
            handleCopy = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var _navigator$clipboard;
                var copied, textarea;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      copied = false; // Modern API attempt first
                      if (!((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText)) {
                        _context.next = 10;
                        break;
                      }
                      _context.prev = 2;
                      _context.next = 5;
                      return navigator.clipboard.writeText(text);
                    case 5:
                      copied = true;
                      _context.next = 10;
                      break;
                    case 8:
                      _context.prev = 8;
                      _context.t0 = _context["catch"](2);
                    case 10:
                      // Fallback for older Safari / insecure contexts
                      if (!copied) {
                        textarea = document.createElement('textarea');
                        textarea.value = text;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        textarea.style.pointerEvents = 'none';
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                          document.execCommand('copy');
                          copied = true;
                        } catch (err) {
                          // worst case, no copy
                        }
                        document.body.removeChild(textarea);
                      }
                      if (copied) {
                        copyButton.innerHTML = '<span class="dashicons dashicons-yes"></span>';
                        setTimeout(function () {
                          copyButton.innerHTML = '<span class="dashicons dashicons-clipboard"></span>';
                        }, 1500);
                      }
                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, null, [[2, 8]]);
              }));
              return function handleCopy() {
                return _ref2.apply(this, arguments);
              };
            }();
            copyButton.addEventListener('click', handleCopy);
            inputRef.parentElement.appendChild(copyButton);
            return _context2.abrupt("return", function () {
              copyButton.removeEventListener('click', handleCopy);
              copyButton.remove();
            });
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function addCopyClipboardButton(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Copy the shortcode to the clipboard when the shortcode input is focused.
   *
   * @return {void}
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!shortcodeInputRef) {
      return;
    }
    addCopyClipboardButton(shortcodeInputRef, getPatternShortcode());
  }, [shortcodeInputRef]);

  /**
   * Copy the PHP function to the clipboard when the PHP function input is focused.
   *
   * @return {void}
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!phpFunctionInputRef) {
      return;
    }
    addCopyClipboardButton(phpFunctionInputRef, getPatternPHPFunction());
  }, [phpFunctionInputRef]);

  /**
   * Get the modal title.
   *
   * @return {string} The modal title.
   */
  var getModalTitle = function getModalTitle() {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Get Code', 'pattern-wrangler');
  };

  /**
   * Get the pattern shortcode. Adds a site_id parameter if the site is multisite.
   *
   * @return {string} The pattern shortcode.
   */
  var getPatternShortcode = function getPatternShortcode() {
    if (isMultisite && props.item.siteId) {
      return "[wp_block slug=\"".concat(props.item.slug, "\" site_id=\"").concat(props.item.siteId, "\"]");
    }
    return "[wp_block slug=\"".concat(props.item.slug, "\"]");
  };

  /**
   * Get the pattern PHP function.
   *
   * @return {string} The pattern PHP function.
   */
  var getPatternPHPFunction = function getPatternPHPFunction() {
    if (isMultisite && props.item.siteId) {
      return "<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '".concat(props.item.slug, "', ").concat(props.item.siteId, ", $echo = true ) : ''; ?>");
    }
    return "<?php function_exists( 'pw_wp_block' ) ? pw_wp_block( '".concat(props.item.slug, "', null, $echo = true ) : ''; ?>");
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: getModalTitle(),
    onRequestClose: props.onRequestClose,
    focusOnMount: "firstContentElement"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use the fields below to get a shortcode or PHP function to output the pattern on your site.', 'pattern-wrangler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pattern Shortcode', 'pattern-wrangler'),
    value: getPatternShortcode(),
    disabled: true,
    ref: setShortcodeInputRef,
    className: "dlx-pw-modal-admin-row-input"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pattern PHP Function', 'pattern-wrangler'),
    value: getPatternPHPFunction(),
    disabled: true,
    ref: setPhpFunctionInputRef,
    className: "dlx-pw-modal-admin-row-input"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: props.onRequestClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'pattern-wrangler'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternGetCodeModal);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternPauseModal/index.js":
/*!***************************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternPauseModal/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/SendCommand */ "./src/js/react/utils/SendCommand.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Notice */ "./src/js/react/components/Notice/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-unused-vars









// Local imports.



/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
var PatternPauseModal = function PatternPauseModal(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSaving = _useState2[0],
    setIsSaving = _useState2[1];
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
      defaultValues: {
        items: props.items || [],
        patternNonce: props.patternNonce || '',
        forceDelete: false
      }
    }),
    control = _useForm.control,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    setError = _useForm.setError,
    trigger = _useForm.trigger,
    setValue = _useForm.setValue;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields;
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(formData) {
      var itemIdsAndNonces, path, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSaving(true);
            itemIdsAndNonces = formData.items.map(function (item) {
              return {
                id: item.id,
                nonce: item.editNonce
              };
            });
            path = '/dlxplugins/pattern-wrangler/v1/patterns/pause/';
            _context.next = 5;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: path,
              method: 'POST',
              data: {
                items: itemIdsAndNonces
              }
            });
          case 5:
            response = _context.sent;
            props.onPause(response, itemIdsAndNonces);
            setIsSaving(false);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Get the button text.
   *
   * @return {string} The button text.
   */
  var getButtonText = function getButtonText() {
    var buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Disable Pattern', 'Disable Patterns', props.items.length, 'pattern-wrangler');
    if (isSaving) {
      buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Disabling Pattern…', 'Disabling Patterns…', props.items.length, 'pattern-wrangler');
    }
    return buttonText;
  };

  /**
   * Get the modal title.
   *
   * @return {string} The modal title.
   */
  var getModalTitle = function getModalTitle() {
    if (props.items.length === 1) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disable Pattern', 'pattern-wrangler');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Disable Pattern', 'Disable Patterns', props.items.length, 'pattern-wrangler');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: getModalTitle(),
    onRequestClose: props.onRequestClose,
    focusOnMount: "firstContentElement"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    type: "submit",
    disabled: isSaving
  }, getButtonText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: props.onRequestClose,
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'pattern-wrangler'))), (errors === null || errors === void 0 ? void 0 : errors.patternTitle) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "dlx-pw-admin-notice",
    status: "error",
    inline: true,
    icon: function icon() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null);
    }
  }, errors.patternTitle.message)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternPauseModal);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternPublishModal/index.js":
/*!*****************************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternPublishModal/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/SendCommand */ "./src/js/react/utils/SendCommand.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Notice */ "./src/js/react/components/Notice/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-unused-vars









// Local imports.



/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
var PatternPublishModal = function PatternPublishModal(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSaving = _useState2[0],
    setIsSaving = _useState2[1];
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
      defaultValues: {
        items: props.items || [],
        patternNonce: props.patternNonce || '',
        forceDelete: false
      }
    }),
    control = _useForm.control,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    setError = _useForm.setError,
    trigger = _useForm.trigger,
    setValue = _useForm.setValue;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields;
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(formData) {
      var itemIdsAndNonces, path, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSaving(true);
            itemIdsAndNonces = formData.items.map(function (item) {
              return {
                id: item.id,
                nonce: item.editNonce
              };
            });
            path = '/dlxplugins/pattern-wrangler/v1/patterns/publish/';
            _context.next = 5;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: path,
              method: 'POST',
              data: {
                items: itemIdsAndNonces
              }
            });
          case 5:
            response = _context.sent;
            props.onPublish(response, itemIdsAndNonces);
            setIsSaving(false);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Get the button text.
   *
   * @return {string} The button text.
   */
  var getButtonText = function getButtonText() {
    var buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Publish Pattern', 'Publish Patterns', props.items.length, 'pattern-wrangler');
    if (isSaving) {
      buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Publishing Pattern…', 'Publishing Patterns…', props.items.length, 'pattern-wrangler');
    }
    return buttonText;
  };

  /**
   * Get the modal title.
   *
   * @return {string} The modal title.
   */
  var getModalTitle = function getModalTitle() {
    if (props.items.length === 1) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Publish Pattern', 'pattern-wrangler');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Publish Pattern', 'Publish Patterns', props.items.length, 'pattern-wrangler');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: getModalTitle(),
    onRequestClose: props.onRequestClose,
    focusOnMount: "firstContentElement"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    type: "submit",
    disabled: isSaving
  }, getButtonText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: props.onRequestClose,
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'pattern-wrangler'))), (errors === null || errors === void 0 ? void 0 : errors.patternTitle) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "dlx-pw-admin-notice",
    status: "error",
    inline: true,
    icon: function icon() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null);
    }
  }, errors.patternTitle.message)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternPublishModal);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternUnpauseModal/index.js":
/*!*****************************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternUnpauseModal/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/SendCommand */ "./src/js/react/utils/SendCommand.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Notice */ "./src/js/react/components/Notice/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// eslint-disable-next-line no-unused-vars









// Local imports.



/**
 * Pattern Create Modal.
 *
 * @param {Object}   props                     The props.
 * @param {string}   props.title               The title of the modal.
 * @param {string}   props.patternId           The id of the pattern.
 * @param {string}   props.patternNonce        The nonce of the pattern.
 * @param {string}   props.patternTitle        The title of the pattern.
 * @param {Array}    props.patternCategories   The categories of the pattern in label arrays.
 * @param {string}   props.patternSyncStatus   The sync status of the pattern.
 * @param {string}   props.patternCopyId       The id of the pattern to copy.
 * @param {Object}   props.categories          The categories of all the patterns..
 * @param {Function} props.onRequestClose      The function to call when the modal is closed.
 * @param {string}   props.syncedDefaultStatus The default sync status of the pattern. Values are 'synced' or 'unsynced'.
 * @param {boolean}  props.syncedDisabled      Whether the synced status is disabled.
 * @param {Function} props.onEdit              The function to call when the pattern is edited.
 * @return {Object} The rendered component.
 */
var PatternUnpauseModal = function PatternUnpauseModal(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isSaving = _useState2[0],
    setIsSaving = _useState2[1];
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useForm)({
      defaultValues: {
        items: props.items || [],
        patternNonce: props.patternNonce || '',
        forceDelete: false
      }
    }),
    control = _useForm.control,
    getValues = _useForm.getValues,
    handleSubmit = _useForm.handleSubmit,
    reset = _useForm.reset,
    setError = _useForm.setError,
    trigger = _useForm.trigger,
    setValue = _useForm.setValue;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_8__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields;
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(formData) {
      var itemIdsAndNonces, path, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsSaving(true);
            itemIdsAndNonces = formData.items.map(function (item) {
              return {
                id: item.id,
                nonce: item.editNonce
              };
            });
            path = '/dlxplugins/pattern-wrangler/v1/patterns/publish/';
            _context.next = 5;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: path,
              method: 'POST',
              data: {
                items: itemIdsAndNonces
              }
            });
          case 5:
            response = _context.sent;
            props.onReenable(response, itemIdsAndNonces);
            setIsSaving(false);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Get the button text.
   *
   * @return {string} The button text.
   */
  var getButtonText = function getButtonText() {
    var buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Re-enable Pattern', 'Re-enable Patterns', props.items.length, 'pattern-wrangler');
    if (isSaving) {
      buttonText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Re-enabling Pattern…', 'Re-enabling Patterns…', props.items.length, 'pattern-wrangler');
    }
    return buttonText;
  };

  /**
   * Get the modal title.
   *
   * @return {string} The modal title.
   */
  var getModalTitle = function getModalTitle() {
    if (props.items.length === 1) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Re-enable Pattern', 'pattern-wrangler');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__._n)('Re-enable Pattern', 'Re-enable Patterns', props.items.length, 'pattern-wrangler');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: getModalTitle(),
    onRequestClose: props.onRequestClose,
    focusOnMount: "firstContentElement"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dlx-pw-modal-admin-row dlx-pw-modal-admin-row-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    type: "submit",
    disabled: isSaving
  }, getButtonText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: props.onRequestClose,
    disabled: isSaving
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cancel', 'pattern-wrangler'))), (errors === null || errors === void 0 ? void 0 : errors.patternTitle) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "dlx-pw-admin-notice",
    status: "error",
    inline: true,
    icon: function icon() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], null);
    }
  }, errors.patternTitle.message)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternUnpauseModal);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternsGrid.js":
/*!****************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternsGrid.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blob */ "@wordpress/blob");
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fancyapps/ui/dist/fancybox/fancybox.umd.js */ "./node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js");
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/escape-html */ "@wordpress/escape-html");
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fancyapps/ui/dist/fancybox/fancybox.css */ "./node_modules/@fancyapps/ui/dist/fancybox/fancybox.css");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews/index.js");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _Snackbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Snackbar */ "./src/js/react/views/patterns/components/Snackbar/index.js");
/* harmony import */ var _PatternCreateModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PatternCreateModal */ "./src/js/react/views/patterns/components/PatternCreateModal/index.js");
/* harmony import */ var _PatternPauseModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PatternPauseModal */ "./src/js/react/views/patterns/components/PatternPauseModal/index.js");
/* harmony import */ var _PatternPublishModal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./PatternPublishModal */ "./src/js/react/views/patterns/components/PatternPublishModal/index.js");
/* harmony import */ var _PatternUnpauseModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./PatternUnpauseModal */ "./src/js/react/views/patterns/components/PatternUnpauseModal/index.js");
/* harmony import */ var _PatternDeleteModal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./PatternDeleteModal */ "./src/js/react/views/patterns/components/PatternDeleteModal/index.js");
/* harmony import */ var _PatternGetCodeModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./PatternGetCodeModal */ "./src/js/react/views/patterns/components/PatternGetCodeModal/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../store */ "./src/js/react/views/patterns/store/index.js");
/* harmony import */ var _utils_createPatternFromFile__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../utils/createPatternFromFile */ "./src/js/react/views/patterns/utils/createPatternFromFile.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* eslint-disable react/no-unknown-property */























// Enhanced iframe component that works with the existing PHP scaling system.
var ResponsiveIframe = function ResponsiveIframe(_ref) {
  var src = _ref.src,
    title = _ref.title,
    item = _ref.item;
  var iframeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var containerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoaded = _useState2[0],
    setIsLoaded = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState4 = _slicedToArray(_useState3, 2),
    scale = _useState4[0],
    setScale = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    iframeWidth = _useState6[0],
    setIframeWidth = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    iframeMinHeight = _useState8[0],
    setIframeMinHeight = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState10 = _slicedToArray(_useState9, 2),
    aspectRatio = _useState10[0],
    setAspectRatio = _useState10[1];

  // Handle iframe load and setup communication with PHP scaling system.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var iframe = iframeRef.current;
    if (!iframe) {
      return;
    }
    var handleLoad = function handleLoad() {
      setIsLoaded(true);
      setIframeWidth(item.viewportWidth || iframe.offsetWidth);

      // The PHP template will handle scaling automatically.
      // We just need to ensure the container is ready for the scaling calculations.
    };
    iframe.addEventListener('load', handleLoad);
    return function () {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [src]);

  // Use ResizeObserver to detect container size changes and trigger PHP scaling recalculation.
  var _useResizeObserver = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useResizeObserver)(),
    _useResizeObserver2 = _slicedToArray(_useResizeObserver, 2),
    resizeListener = _useResizeObserver2[0],
    _useResizeObserver2$ = _useResizeObserver2[1],
    containerWidth = _useResizeObserver2$.width,
    containerHeight = _useResizeObserver2$.height;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (typeof containerWidth === 'undefined' || !isLoaded || iframeWidth === 0) {
      return;
    }
    var newScale = containerWidth / (iframeWidth || 800);
    var newAspectRatio = containerWidth / containerHeight;
    var newIframeMinHeight = Math.max(iframeWidth * newAspectRatio, 100);
    setIframeMinHeight(newIframeMinHeight);
    setScale(newScale);
    setAspectRatio(newAspectRatio);

    // Trigger the PHP scaling system to recalculate when container size changes.
    // Dispatch the event on the current window since React and iframe are in the same context.
    var event = new CustomEvent('dlxPatternPreviewResize', {
      detail: {
        width: containerWidth
      }
    });
    window.dispatchEvent(event);

    // Also try dispatching on parent window as fallback
    try {
      window.parent.dispatchEvent(event);
    } catch (e) {
      // Could not dispatch on parent window.
    }
  }, [containerWidth, isLoaded]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (iframeRef.current) {
      setIframeWidth(iframeRef.current.offsetWidth);
    }
  }, [iframeRef, iframeMinHeight]);
  return /*#__PURE__*/React.createElement("a", {
    href: src,
    className: "pattern-preview-iframe-link",
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: function onClick(e) {
      e.preventDefault();
      popPatternPreview(item);
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pattern-preview-iframe-scale-container-wrapper",
    ref: containerRef,
    style: {
      transform: "scale(".concat(scale, ")")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pattern-preview-iframe-scale-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pattern-preview-iframe-scale-container"
  }, resizeListener, /*#__PURE__*/React.createElement("div", {
    className: "pattern-preview-iframe-wrapper"
  }, /*#__PURE__*/React.createElement("iframe", {
    ref: iframeRef,
    key: "preview-".concat(item.id),
    src: src,
    title: title,
    sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
    loading: "lazy",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: item.viewportWidth || 800,
      aspectRatio: aspectRatio,
      height: iframeMinHeight + 'px',
      maxHeight: '1200px',
      overflow: 'visible'
    }
  }))))));
};
var popPatternPreview = function popPatternPreview(item) {
  var viewportWidth = item.viewportWidth || 1200;
  var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "&viewport_width=").concat(viewportWidth) : '';
  _fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_3__.Fancybox.show([{
    src: previewUrl,
    caption: item.title,
    type: 'iframe',
    closeButton: true
  }]);
};
var defaultLayouts = {
  grid: {
    layout: {
      titleField: 'title',
      mediaField: 'pattern-view-json',
      columns: 2,
      columnGap: '24px',
      rowGap: '24px',
      showMedia: true,
      viewConfigOptions: {}
    }
  }
};
var PatternsGrid = function PatternsGrid(props) {
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.useSelect)(function (select) {
      return {
        data: select(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getData(),
        loading: select(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getLoading(),
        error: select(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getError()
      };
    }),
    data = _useSelect.data,
    loading = _useSelect.loading,
    error = _useSelect.error;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).fetchData();
  }, []);

  // Show loading state.
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dlx-patterns-view-container-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dlx-patterns-view-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dataviews-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dlx-patterns-view-container-header"
    }, /*#__PURE__*/React.createElement("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Loading patterns…', 'pattern-wrangler')), /*#__PURE__*/React.createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_20___default()), {
      size: 30,
      color: "#3c434a"
    })))));
  }

  // Show error state.
  if (error) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dlx-patterns-view-error"
    }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Error loading patterns:', 'pattern-wrangler'), " ", error), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      variant: "primary",
      onClick: function onClick() {
        return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).fetchData();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Retry', 'pattern-wrangler')));
  }
  return /*#__PURE__*/React.createElement(Interface, _extends({
    data: data
  }, props));
};

// Get query args from current URL.
// const queryArgs = getQueryArgs( window.location.href );

var Interface = function Interface(props) {
  var _view$filters, _view$filters2, _view$filters3, _view$filters4, _view$filters5, _view$filters6, _view$filters7, _view$filters8;
  var data = props.data;
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    selectedItems = _useState12[0],
    setSelectedItems = _useState12[1];
  var _useSelect2 = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.useSelect)(function (select) {
      return {
        patterns: select(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getPatterns()
      };
    }),
    patterns = _useSelect2.patterns;
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    patternsDisplay = _useState14[0],
    setPatternsDisplay = _useState14[1];
  var _useSelect3 = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.useSelect)(function () {
      return {
        categories: (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.select)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getCategories()
      };
    }),
    categories = _useSelect3.categories;
  var _useSelect4 = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.useSelect)(function () {
      return {
        assets: (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.select)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getAssets()
      };
    }),
    assets = _useSelect4.assets;
  var _useState15 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    localCategories = _useState16[0],
    setLocalCategories = _useState16[1];
  var _useState17 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState18 = _slicedToArray(_useState17, 2),
    loading = _useState18[0],
    setLoading = _useState18[1];
  var _useState19 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      isVisible: false,
      message: '',
      title: '',
      type: ''
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    snackbar = _useState20[0],
    setSnackbar = _useState20[1];
  var _useState21 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isAddNewPatternModalOpen = _useState22[0],
    setIsAddNewPatternModalOpen = _useState22[1];
  var _useState23 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    isCopyToLocalModalOpen = _useState24[0],
    setIsCopyToLocalModalOpen = _useState24[1];
  var _useState25 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState26 = _slicedToArray(_useState25, 2),
    copyPatternId = _useState26[0],
    setCopyPatternId = _useState26[1];
  var _useState27 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState28 = _slicedToArray(_useState27, 2),
    isQuickEditModalOpen = _useState28[0],
    setIsQuickEditModalOpen = _useState28[1];
  var _useState29 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState30 = _slicedToArray(_useState29, 2),
    isPauseModalOpen = _useState30[0],
    setIsPauseModalOpen = _useState30[1];
  var _useState31 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState32 = _slicedToArray(_useState31, 2),
    isPublishModalOpen = _useState32[0],
    setIsPublishModalOpen = _useState32[1];
  var _useState33 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState34 = _slicedToArray(_useState33, 2),
    isUnpauseModalOpen = _useState34[0],
    setIsUnpauseModalOpen = _useState34[1];
  var _useState35 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState36 = _slicedToArray(_useState35, 2),
    isDeleteModalOpen = _useState36[0],
    setIsDeleteModalOpen = _useState36[1];
  var _useState37 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState38 = _slicedToArray(_useState37, 2),
    isGetCodeModalOpen = _useState38[0],
    setIsGetCodeModalOpen = _useState38[1];
  var exportPattern = function exportPattern(item) {
    var isLocal = item.isLocal;
    var title = item.title;
    var syncStatus = '';
    if (isLocal) {
      syncStatus = 'unsynced';
    } else if ('synced' === item.patternType) {
      syncStatus = 'synced';
    }
    var fileContent = JSON.stringify({
      __file: 'wp_block',
      title: title,
      content: item.content,
      syncStatus: syncStatus
    }, null, 2);
    (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.downloadBlob)("".concat(title, ".json"), fileContent, 'application/json');
  };

  /**
   * Returns a default view with query vars. Useful for setting or refreshing the view.
   *
   * @return {Object} The default view.
   */
  var getDefaultView = function getDefaultView() {
    var _getQueryArgs, _getQueryArgs2, _getQueryArgs3, _getQueryArgs4, _getQueryArgs5, _getQueryArgs6;
    return {
      type: 'grid',
      previewSize: 'large',
      paginationInfo: {
        totalItems: patterns.length,
        totalPages: 0
      },
      page: parseInt((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href).paged) || 1,
      perPage: parseInt((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href).perPage) || 12,
      defaultPerPage: 12,
      sort: {
        field: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__.escapeAttribute)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href).orderby || 'title'),
        direction: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__.escapeAttribute)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href).order || 'asc')
      },
      titleField: 'title',
      mediaField: 'pattern-view-json',
      layout: defaultLayouts.grid.layout,
      fields: ['title', 'pattern-view-json'],
      search: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__.escapeAttribute)(((_getQueryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href)) === null || _getQueryArgs === void 0 ? void 0 : _getQueryArgs.search) || ''),
      filters: [{
        field: 'patternType',
        value: ((_getQueryArgs2 = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href)) === null || _getQueryArgs2 === void 0 ? void 0 : _getQueryArgs2.patternType) || 'all'
      }, {
        field: 'patternStatus',
        value: ((_getQueryArgs3 = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href)) === null || _getQueryArgs3 === void 0 ? void 0 : _getQueryArgs3.patternStatus) || 'both'
      }, {
        field: 'patternLocalStatus',
        value: ((_getQueryArgs4 = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href)) === null || _getQueryArgs4 === void 0 ? void 0 : _getQueryArgs4.patternLocalStatus) || 'both'
      }, {
        field: 'patternRegisteredStatus',
        value: ((_getQueryArgs5 = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href)) === null || _getQueryArgs5 === void 0 ? void 0 : _getQueryArgs5.patternRegisteredStatus) || 'both'
      }, {
        field: 'patternLocalRegisteredStatus',
        value: ((_getQueryArgs6 = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href)) === null || _getQueryArgs6 === void 0 ? void 0 : _getQueryArgs6.patternLocalRegisteredStatus) || 'both'
      }]
    };
  };

  /**
   * Returns the quick links for a pattern.
   *
   * @param {Object} item - The pattern item.
   * @return {JSX.Element|null} The quick links JSX element or null if no quick links are needed.
   */
  var getQuickLinks = function getQuickLinks(item) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "pattern-quick-links"
    }, item.isLocal && /*#__PURE__*/React.createElement(React.Fragment, null, !item.isDisabled && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      variant: "link",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsQuickEditModalOpen({
          item: item
        });
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Quick Edit', 'pattern-wrangler')), ' | ', /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      variant: "link",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsGetCodeModalOpen({
          item: item
        });
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Get Code', 'pattern-wrangler')), ' | '), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      variant: "link",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        exportPattern(item);
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Export Pattern', 'pattern-wrangler'))), !item.isLocal && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      variant: "link",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        setCopyPatternId(item.id);
        setIsCopyToLocalModalOpen({
          item: item
        });
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Copy to Local', 'pattern-wrangler')), ' | ', /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
      variant: "link",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        exportPattern(item);
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Export Pattern', 'pattern-wrangler')))));
  };
  var _useState39 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(getDefaultView()),
    _useState40 = _slicedToArray(_useState39, 2),
    view = _useState40[0],
    setView = _useState40[1];
  var fields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return [{
      id: 'title',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Title', 'pattern-wrangler'),
      render: function render(_ref2) {
        var item = _ref2.item;
        if (!(item !== null && item !== void 0 && item.categorySlugs) || item.categorySlugs.length === 0) {
          return /*#__PURE__*/React.createElement("div", {
            className: "pattern-title-categories"
          }, /*#__PURE__*/React.createElement("div", {
            className: "pattern-title"
          }, item.isLocal && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
            variant: "link",
            onClick: function onClick(e) {
              e.preventDefault();
              var redirectUrl = encodeURIComponent(window.location.href);
              window.location.href = "".concat(dlxEnhancedPatternsView.getSiteBaseUrl, "post.php?post=").concat(item.id, "&action=edit&redirect_to=").concat(redirectUrl);
            }
          }, item.title), !item.isLocal && /*#__PURE__*/React.createElement("span", {
            className: "pattern-title"
          }, item.title)), /*#__PURE__*/React.createElement("div", {
            className: "pattern-categories"
          }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('No categories', 'pattern-wrangler')), getQuickLinks(item));
        }
        var currentCategories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.select)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getCategories();
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "pattern-title-categories"
        }, /*#__PURE__*/React.createElement("div", {
          className: "pattern-title"
        }, item.isLocal && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
          variant: "link",
          onClick: function onClick(e) {
            e.preventDefault();
            var redirectUrl = encodeURIComponent(window.location.href);
            window.location.href = "".concat(dlxEnhancedPatternsView.getSiteBaseUrl, "post.php?post=").concat(item.id, "&action=edit&redirect_to=").concat(redirectUrl);
          }
        }, item.title), !item.isLocal && /*#__PURE__*/React.createElement("span", {
          className: "pattern-title"
        }, item.title)), item.categorySlugs.length > 0 && Object.values(currentCategories).length > 0 && /*#__PURE__*/React.createElement("div", {
          className: "pattern-categories"
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Categories:', 'pattern-wrangler'), ' ', item.categorySlugs.map(function (category, index) {
          var _currentCategories$ca, _currentCategories$ca2;
          var catSlug = (category === null || category === void 0 ? void 0 : category.slug) || category.toString();
          if (!currentCategories.hasOwnProperty(catSlug)) {
            return null;
          }
          var catLabel = ((_currentCategories$ca = currentCategories[catSlug]) === null || _currentCategories$ca === void 0 ? void 0 : _currentCategories$ca.label) || ((_currentCategories$ca2 = currentCategories[catSlug]) === null || _currentCategories$ca2 === void 0 ? void 0 : _currentCategories$ca2.name);
          return /*#__PURE__*/React.createElement("span", {
            key: "category-".concat(index),
            className: "pattern-category"
          }, catLabel, ' ', index < item.categorySlugs.length - 1 && ', ');
        })), getQuickLinks(item)));
      },
      enableSorting: true,
      enableHiding: false,
      enableGlobalSearch: true
    }, {
      id: 'pattern-view-json',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Preview', 'pattern-wrangler'),
      getValue: function getValue(_ref3) {
        var item = _ref3.item;
        var viewportWidth = item.viewportWidth || 1200;
        var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "&viewport_width=").concat(viewportWidth) : '';

        // Determine badge type based on pattern properties.
        var badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Local', 'pattern-wrangler');
        var badgeClass = 'pattern-badge-local';
        var badgeDisabledText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disabled', 'pattern-wrangler');
        var badgeDisabledClass = 'pattern-badge-disabled';
        var showDisabledBadge = true;
        if (item.isDisabled && item.isLocal) {
          badgeDisabledText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Draft', 'pattern-wrangler');
        } else if (!item.isDisabled && item.isLocal) {
          showDisabledBadge = false;
        } else if (!item.isDisabled && !item.isLocal) {
          showDisabledBadge = false;
        }
        if (!item.isLocal) {
          badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Registered', 'pattern-wrangler');
          badgeClass = 'pattern-badge-registered';
        } else if ('synced' === item.patternType) {
          badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Local Synced', 'pattern-wrangler');
          badgeClass = 'pattern-badge-synced';
        } else {
          badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Local Unsynced', 'pattern-wrangler');
          badgeClass = 'pattern-badge-unsynced';
        }
        var Badge = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "pattern-badge-wrapper"
        }, showDisabledBadge && /*#__PURE__*/React.createElement("span", {
          className: "pattern-badge ".concat(badgeDisabledClass)
        }, badgeDisabledText), /*#__PURE__*/React.createElement("span", {
          className: "pattern-badge ".concat(badgeClass)
        }, badgeText)));
        return /*#__PURE__*/React.createElement(React.Fragment, null, Badge, /*#__PURE__*/React.createElement("div", {
          className: "pattern-preview-wrapper"
        }, /*#__PURE__*/React.createElement(ResponsiveIframe, {
          src: previewUrl,
          title: "Preview: ".concat(item.title),
          item: item
        })));
      },
      enableSorting: false,
      enableHiding: false
    }, {
      id: 'categories',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Categories', 'pattern-wrangler'),
      render: function render(_ref4) {
        var item = _ref4.item;
        return null;
      },
      enableSorting: false,
      enableHiding: false,
      enableGlobalSearch: true,
      type: 'array',
      filterBy: {
        operators: ['isAny', 'isNone']
      },
      elements: Object.values(categories).map(function (category) {
        return {
          label: category.label || category.name,
          value: category.slug
        };
      })
    }, {
      id: 'assets',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Filter Patterns by Source', 'pattern-wrangler'),
      render: function render(_ref5) {
        var item = _ref5.item;
        return null;
      },
      enableGlobalSearch: true,
      filterBy: {
        operators: ['is']
      },
      elements: Object.values((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.select)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).getAssets() || []).map(function (asset) {
        return {
          label: asset.label,
          value: asset.slug
        };
      })
    }, {
      elements: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('All Patterns', 'pattern-wrangler'),
        value: 'all'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Local Patterns', 'pattern-wrangler'),
        value: 'local'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Registered Patterns', 'pattern-wrangler'),
        value: 'registered'
      }],
      enableHiding: false,
      enableSorting: false,
      enableGlobalSearch: false,
      filterBy: {
        operators: ['is']
      },
      "default": 'all',
      type: 'array',
      id: 'patternType',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Type', 'pattern-wrangler')
    }, {
      elements: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Unsynced Patterns', 'pattern-wrangler'),
        value: 'unsynced'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Synced Patterns', 'pattern-wrangler'),
        value: 'synced'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
        value: 'both'
      }],
      enableHiding: false,
      enableSorting: false,
      enableGlobalSearch: false,
      filterBy: {
        operators: ['is']
      },
      type: 'array',
      id: 'patternStatus',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Status', 'pattern-wrangler')
    }, {
      elements: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Paused Patterns', 'pattern-wrangler'),
        value: 'paused'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Unpaused Patterns', 'pattern-wrangler'),
        value: 'unpaused'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
        value: 'both'
      }],
      enableHiding: false,
      enableSorting: false,
      enableGlobalSearch: false,
      filterBy: {
        operators: ['is']
      },
      type: 'array',
      id: 'patternRegisteredStatus',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Registered Status', 'pattern-wrangler')
    }, {
      elements: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Draft Patterns', 'pattern-wrangler'),
        value: 'draft'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Published Patterns', 'pattern-wrangler'),
        value: 'published'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
        value: 'both'
      }],
      enableHiding: false,
      enableSorting: false,
      enableGlobalSearch: false,
      filterBy: {
        operators: ['is']
      },
      type: 'array',
      id: 'patternLocalStatus',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Local Status', 'pattern-wrangler')
    }];
  }, {
    elements: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disabled Patterns', 'pattern-wrangler'),
      value: 'disabled'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enabled Patterns', 'pattern-wrangler'),
      value: 'enabled'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
      value: 'both'
    }],
    enableHiding: false,
    enableSorting: false,
    enableGlobalSearch: false,
    filterBy: {
      operators: ['is']
    },
    type: 'array',
    id: 'patternLocalRegisteredStatus',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Local and Registered Status', 'pattern-wrangler')
  }, []);
  var actions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return [{
      id: 'quick-edit',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Quick Edit', 'pattern-wrangler'),
      icon: 'edit',
      callback: function callback(items) {
        setIsQuickEditModalOpen({
          item: items[0]
        });
      },
      isEligible: function isEligible(pattern) {
        return pattern.isLocal && !pattern.isDisabled;
      },
      isPrimary: true
    }, {
      id: 'get-code',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Get Code', 'pattern-wrangler'),
      icon: 'code',
      callback: function callback(items) {
        setIsGetCodeModalOpen({
          item: items[0]
        });
      },
      isEligible: function isEligible(item) {
        return item.isLocal && !item.isDisabled;
      },
      isPrimary: false,
      supportsBulk: false
    }, {
      id: 'delete',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Delete Pattern', 'pattern-wrangler'),
      icon: 'trash',
      isEligible: function isEligible(pattern) {
        // Pattern must be local and disabled.
        return pattern.isLocal && pattern.isDisabled;
      },
      callback: function callback(items) {
        setIsDeleteModalOpen({
          items: items
        });
      },
      isPrimary: false,
      isDestructive: true,
      supportsBulk: true
    }, {
      id: 'publish',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Publish Pattern', 'pattern-wrangler'),
      icon: 'yes-alt',
      isEligible: function isEligible(pattern) {
        // Pattern must be local and disabled.
        return pattern.isLocal && pattern.isDisabled;
      },
      callback: function callback(items) {
        setIsPublishModalOpen({
          items: items
        });
      },
      isPrimary: false,
      isDestructive: false,
      supportsBulk: true
    }, {
      id: 'unpause',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Re-enable Pattern', 'pattern-wrangler'),
      icon: 'controls-play',
      isEligible: function isEligible(pattern) {
        // Pattern must be local and enabled.
        return !pattern.isLocal && pattern.isDisabled;
      },
      callback: function callback(items) {
        setIsUnpauseModalOpen({
          items: items
        });
      },
      isPrimary: false,
      isDestructive: false,
      supportsBulk: true
    }, {
      id: 'copy-to-local',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Copy to Local Pattern', 'pattern-wrangler'),
      icon: 'edit',
      callback: function callback(items) {
        var item = items[0];
        setCopyPatternId(item.id);
        setIsCopyToLocalModalOpen({
          item: item
        });
      },
      isEligible: function isEligible(pattern) {
        return !pattern.isLocal;
      },
      isPrimary: false,
      isDestructive: false
    }, {
      id: 'disable-preview',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disable Pattern', 'pattern-wrangler'),
      icon: 'controls-pause',
      callback: function callback(items) {
        setIsPauseModalOpen({
          items: items
        });
      },
      isEligible: function isEligible(item) {
        return !item.isDisabled;
      },
      isDestructive: true,
      supportsBulk: true,
      isPrimary: false
    }, {
      id: 'copy',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Copy Pattern', 'pattern-wrangler'),
      icon: 'edit',
      callback: function () {
        var _callback = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(items) {
          var copyContent, copied, _navigator$clipboard, textarea;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                copyContent = items[0].content.trim();
                copied = false;
                _context.prev = 2;
                if (!((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText)) {
                  _context.next = 12;
                  break;
                }
                _context.prev = 4;
                _context.next = 7;
                return navigator.clipboard.writeText(copyContent);
              case 7:
                copied = true;
                _context.next = 12;
                break;
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
              case 12:
                // Fallback for older Safari / insecure contexts
                if (!copied) {
                  textarea = document.createElement('textarea');
                  textarea.value = copyContent;
                  textarea.style.position = 'fixed';
                  textarea.style.opacity = '0';
                  textarea.style.pointerEvents = 'none';
                  document.body.appendChild(textarea);
                  textarea.select();
                  try {
                    document.execCommand('copy');
                    copied = true;
                  } catch (err) {
                    // worst case, no copy
                  }
                  document.body.removeChild(textarea);
                }
                setSnackbar({
                  isVisible: true,
                  message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern copied to clipboard', 'pattern-wrangler'),
                  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Copied', 'pattern-wrangler'),
                  type: 'success',
                  onClose: function onClose() {
                    setSnackbar({
                      isVisible: false
                    });
                  }
                });
                _context.next = 18;
                break;
              case 16:
                _context.prev = 16;
                _context.t1 = _context["catch"](2);
              case 18:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[2, 16], [4, 10]]);
        }));
        function callback(_x) {
          return _callback.apply(this, arguments);
        }
        return callback;
      }(),
      isEligible: function isEligible(pattern) {
        return true;
      },
      isPrimary: false,
      isDestructive: false
    }, {
      id: 'export',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Export to JSON', 'pattern-wrangler'),
      icon: 'edit',
      callback: function callback(items) {
        var isLocal = items[0].isLocal;
        var title = items[0].title;
        var syncStatus = '';
        if (isLocal) {
          syncStatus = 'unsynced';
        } else if ('synced' === items[0].patternType) {
          syncStatus = 'synced';
        }
        var fileContent = JSON.stringify({
          __file: 'wp_block',
          title: title,
          content: items[0].content,
          syncStatus: syncStatus
        }, null, 2);
        (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_2__.downloadBlob)("".concat(title, ".json"), fileContent, 'application/json');
      },
      isEligible: function isEligible() {
        return true;
      },
      isPrimary: false,
      isDestructive: false
    }];
  }, [categories, patterns]);

  /**
   * Get the total count of filtered patterns without pagination.
   *
   * @param {Object} newView The new view object.
   * @return {number} The total count of filtered patterns.
   */
  var getFilteredPatternsCount = function getFilteredPatternsCount(newView) {
    var _newView$sort, _newView$sort2;
    var patternsCopy = _toConsumableArray(patterns);
    if (null === patternsCopy || 0 === patternsCopy.length) {
      patternsCopy = _toConsumableArray(data.patterns);
    }
    var orderBy = newView === null || newView === void 0 || (_newView$sort = newView.sort) === null || _newView$sort === void 0 ? void 0 : _newView$sort.field;
    var order = newView === null || newView === void 0 || (_newView$sort2 = newView.sort) === null || _newView$sort2 === void 0 ? void 0 : _newView$sort2.direction;
    if ('title' === orderBy) {
      if ('desc' === order) {
        patternsCopy.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
      } else {
        patternsCopy.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      }
    }

    // Filter by categories.
    var filters = (newView === null || newView === void 0 ? void 0 : newView.filters) || [];
    if (filters.length > 0) {
      filters.forEach(function (filter) {
        switch (filter.field) {
          case 'categories':
            if (filter.value) {
              // filter.value is an array.
              // Clean the filter values once for efficiency
              var cleanedFilterValues = filter.value.map(function (value) {
                return (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.cleanForSlug)(value);
              });
              if (filter.operator === 'isAny') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];
                  return patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });
                });
              } else if (filter.operator === 'isNone') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];

                  // Exclude patterns that have ANY of the categories in filter.value
                  // Check if this pattern has any excluded categories
                  var hasExcludedCategory = patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });

                  // Return true to keep the pattern only if it has NO excluded categories
                  return !hasExcludedCategory;
                });
              }
            }
            break;
          case 'assets':
            if (filter.value) {
              if (filter.operator === 'is') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  return pattern.asset === filter.value;
                });
              }
            }
            break;
          case 'patternType':
            if (filter.value) {
              switch (filter.value) {
                case 'all':
                  break;
                case 'local':
                  patternsCopy = patternsCopy.filter(function (pattern) {
                    return pattern.isLocal;
                  });
                  break;
                case 'registered':
                  patternsCopy = patternsCopy.filter(function (pattern) {
                    return !pattern.isLocal;
                  });
                  break;
              }
            }
            break;
          case 'patternStatus':
            if (filter.value) {
              var patternTypeFilter = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (patternTypeFilter && patternTypeFilter.value === 'local' && filter.value) {
                switch (filter.value) {
                  case 'unsynced':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      if (pattern.syncStatus) {
                        return pattern.syncStatus === 'unsynced' && pattern.isLocal;
                      }
                      return false;
                    });
                    break;
                  case 'synced':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      if (pattern.syncStatus) {
                        return pattern.syncStatus === 'synced' && pattern.isLocal;
                      }
                      return false;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
          case 'patternLocalStatus':
            if (filter.value) {
              var _patternTypeFilter = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (_patternTypeFilter && _patternTypeFilter.value === 'local' && filter.value) {
                switch (filter.value) {
                  case 'draft':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return pattern.isDisabled && pattern.isLocal;
                    });
                    break;
                  case 'published':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return !pattern.isDisabled && pattern.isLocal;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
          case 'patternRegisteredStatus':
            if (filter.value) {
              var _patternTypeFilter2 = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (_patternTypeFilter2 && _patternTypeFilter2.value === 'registered' && filter.value) {
                switch (filter.value) {
                  case 'paused':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return pattern.isDisabled && !pattern.isLocal;
                    });
                    break;
                  case 'unpaused':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return !pattern.isDisabled && !pattern.isLocal;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
          case 'patternLocalRegisteredStatus':
            if (filter.value) {
              var _patternTypeFilter3 = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (_patternTypeFilter3 && _patternTypeFilter3.value === 'all' && filter.value) {
                switch (filter.value) {
                  case 'disabled':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return pattern.isDisabled;
                    });
                    break;
                  case 'enabled':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return !pattern.isDisabled;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
        }
      });
    }

    // Do search.
    var searchField = (newView === null || newView === void 0 ? void 0 : newView.search) || '';
    if ('undefined' !== searchField && '' !== searchField) {
      patternsCopy = patternsCopy.filter(function (pattern) {
        var patternLabel = pattern.label || pattern.title;
        return patternLabel.toLowerCase().includes((newView.search || searchField).toLowerCase());
      });
    }

    // Return the total count without pagination.
    return patternsCopy.length;
  };

  /**
   * Retrieve a list of modified patterns based on query vars and the current view.
   *
   * @param {Object} newView The new view object.
   * @return {Array} The patterns for display.
   */
  var getPatternsForDisplay = function getPatternsForDisplay(newView) {
    var _newView$sort3, _newView$sort4;
    var patternsCopy = _toConsumableArray(patterns);
    if (null === patternsCopy || 0 === patternsCopy.length) {
      patternsCopy = _toConsumableArray(data.patterns);
    }
    var orderBy = newView === null || newView === void 0 || (_newView$sort3 = newView.sort) === null || _newView$sort3 === void 0 ? void 0 : _newView$sort3.field;
    var order = newView === null || newView === void 0 || (_newView$sort4 = newView.sort) === null || _newView$sort4 === void 0 ? void 0 : _newView$sort4.direction;
    if ('title' === orderBy) {
      if ('desc' === order) {
        patternsCopy.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
      } else {
        patternsCopy.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      }
    }

    // Filter by categories.
    var filters = (newView === null || newView === void 0 ? void 0 : newView.filters) || [];
    if (filters.length > 0) {
      filters.forEach(function (filter) {
        switch (filter.field) {
          case 'categories':
            if (filter.value) {
              // filter.value is an array.
              // Clean the filter values once for efficiency
              var cleanedFilterValues = filter.value.map(function (value) {
                return (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.cleanForSlug)(value);
              });
              if (filter.operator === 'isAny') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];
                  return patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });
                });
              } else if (filter.operator === 'isNone') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];

                  // Exclude patterns that have ANY of the categories in filter.value
                  // Check if this pattern has any excluded categories
                  var hasExcludedCategory = patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });

                  // Return true to keep the pattern only if it has NO excluded categories
                  return !hasExcludedCategory;
                });
              }
            }
            break;
          case 'assets':
            if (filter.value) {
              patternsCopy = patternsCopy.filter(function (pattern) {
                return pattern.asset === filter.value;
              });
            }
            break;
          case 'patternType':
            if (filter.value) {
              switch (filter.value) {
                case 'all':
                  break;
                case 'local':
                  patternsCopy = patternsCopy.filter(function (pattern) {
                    return pattern.isLocal;
                  });
                  break;
                case 'registered':
                  patternsCopy = patternsCopy.filter(function (pattern) {
                    return !pattern.isLocal;
                  });
                  break;
              }
            }
            break;
          case 'patternStatus':
            if (filter.value) {
              var patternTypeFilter = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (patternTypeFilter && patternTypeFilter.value === 'local' && filter.value) {
                switch (filter.value) {
                  case 'unsynced':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      if (pattern.syncStatus) {
                        return pattern.syncStatus === 'unsynced' && pattern.isLocal;
                      }
                      return false;
                    });
                    break;
                  case 'synced':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      if (pattern.syncStatus) {
                        return pattern.syncStatus === 'synced' && pattern.isLocal;
                      }
                      return false;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
          case 'patternLocalStatus':
            if (filter.value) {
              var _patternTypeFilter4 = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (_patternTypeFilter4 && _patternTypeFilter4.value === 'local' && filter.value) {
                switch (filter.value) {
                  case 'draft':
                  case 'paused':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return pattern.isDisabled && pattern.isLocal;
                    });
                    break;
                  case 'published':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return !pattern.isDisabled && pattern.isLocal;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
          case 'patternRegisteredStatus':
            if (filter.value) {
              var _patternTypeFilter5 = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (_patternTypeFilter5 && _patternTypeFilter5.value === 'registered' && filter.value) {
                switch (filter.value) {
                  case 'paused':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return pattern.isDisabled && !pattern.isLocal;
                    });
                    break;
                  case 'unpaused':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return !pattern.isDisabled && !pattern.isLocal;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
          case 'patternLocalRegisteredStatus':
            if (filter.value) {
              var _patternTypeFilter6 = filters.find(function (f) {
                return f.field === 'patternType';
              });
              if (_patternTypeFilter6 && _patternTypeFilter6.value === 'all' && filter.value) {
                switch (filter.value) {
                  case 'disabled':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return pattern.isDisabled;
                    });
                    break;
                  case 'enabled':
                    patternsCopy = patternsCopy.filter(function (pattern) {
                      return !pattern.isDisabled;
                    });
                    break;
                  case 'both':
                    break;
                }
              }
            }
            break;
        }
      });
    }

    // Do search.
    var searchField = (newView === null || newView === void 0 ? void 0 : newView.search) || '';
    if ('undefined' !== searchField && '' !== searchField) {
      patternsCopy = patternsCopy.filter(function (pattern) {
        var patternLabel = pattern.label || pattern.title;
        return patternLabel.toLowerCase().includes((newView.search || searchField).toLowerCase());
      });
    }

    // Return the patterns for display with pagination.
    return patternsCopy.slice((newView.page - 1) * newView.perPage, newView.page * newView.perPage);
  };

  /**
   * When a view is changed, we need to adjust the fields and showMedia based on the view type.
   *
   * @param {Object} newView The new view object.
   */
  var onChangeView = function onChangeView(newView) {
    var _newView$sort5, _newView$filters, _newView$filters2, _newView$filters3, _newView$filters4, _newView$filters5;
    // Create query args object with view state.
    var changeQueryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href);
    changeQueryArgs.paged = newView.page || 1;
    changeQueryArgs.perPage = newView.perPage;

    // Only add search if it exists.
    if (newView.search) {
      changeQueryArgs.search = newView.search;
    } else {
      changeQueryArgs.search = '';
    }

    // Add sort parameters if they exist.
    if ((_newView$sort5 = newView.sort) !== null && _newView$sort5 !== void 0 && _newView$sort5.field) {
      changeQueryArgs.orderby = newView.sort.field;
      changeQueryArgs.order = newView.sort.direction;
    }

    // Get pattern type and status from filters.
    var patternTypeFilter = (_newView$filters = newView.filters) === null || _newView$filters === void 0 ? void 0 : _newView$filters.find(function (filter) {
      return filter.field === 'patternType';
    });
    var patternStatusFilter = (_newView$filters2 = newView.filters) === null || _newView$filters2 === void 0 ? void 0 : _newView$filters2.find(function (filter) {
      return filter.field === 'patternStatus';
    });
    if (patternTypeFilter) {
      changeQueryArgs.patternType = patternTypeFilter.value;
    }
    if (patternStatusFilter) {
      changeQueryArgs.patternStatus = patternStatusFilter.value;
    }

    // Get registered/local pattern disabled/enabled status from filters.
    var patternRegisteredStatusFilter = (_newView$filters3 = newView.filters) === null || _newView$filters3 === void 0 ? void 0 : _newView$filters3.find(function (filter) {
      return filter.field === 'patternRegisteredStatus';
    });
    var patternLocalStatusFilter = (_newView$filters4 = newView.filters) === null || _newView$filters4 === void 0 ? void 0 : _newView$filters4.find(function (filter) {
      return filter.field === 'patternLocalStatus';
    });
    var patternLocalRegisteredStatusFilter = (_newView$filters5 = newView.filters) === null || _newView$filters5 === void 0 ? void 0 : _newView$filters5.find(function (filter) {
      return filter.field === 'patternLocalRegisteredStatus';
    });
    if (patternRegisteredStatusFilter && !patternLocalRegisteredStatusFilter) {
      changeQueryArgs.patternRegisteredStatus = patternRegisteredStatusFilter.value;
    }
    if (patternLocalStatusFilter && !patternLocalRegisteredStatusFilter) {
      changeQueryArgs.patternLocalStatus = patternLocalStatusFilter.value;
    }
    if (patternLocalRegisteredStatusFilter) {
      changeQueryArgs.patternLocalRegisteredStatus = patternLocalRegisteredStatusFilter.value;
    }

    // Update URL without page reload using addQueryArgs.
    var newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.addQueryArgs)(window.location.pathname, changeQueryArgs);
    if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.getQueryArgs)(window.location.href).search && !newView.search) {
      newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(newUrl, 'search');
    }
    setPatternsDisplay(getPatternsForDisplay(newView));
    window.history.pushState({}, '', newUrl);

    // Unset and reset page from changeQueryArgs.
    changeQueryArgs.page = changeQueryArgs.paged;
    setView(_objectSpread(_objectSpread({}, newView), changeQueryArgs));

    // Update the view state.
    //setView( newView );
  };

  /**
   * Listen for any history changes.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // Listen for any history changes.
    window.addEventListener('popstate', function () {
      onChangeView(getDefaultView());
    });
  }, [view]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (data && data.hasOwnProperty('patterns')) {
      if (data.categories) {
        // Find the index of the pattern-categories field.
        var fieldsIndex = fields.findIndex(function (field) {
          return field.id === 'categories';
        });
        var originalLocalCategories = [];
        var maybeDuplicateLabel = '';
        fields[fieldsIndex].elements = Object.values(data.categories).map(function (category) {
          var catLabel = category.label;
          if (maybeDuplicateLabel === category.label) {
            catLabel = "".concat(catLabel, " (").concat(category.count + 1, ")");
          }
          maybeDuplicateLabel = category.label;
          if (!category.registered) {
            originalLocalCategories.push({
              id: category.id,
              label: category.label
            });
          }
          return {
            label: catLabel,
            value: category.slug
          };
        });
        var newViewCopy = _objectSpread(_objectSpread({}, view), {}, {
          fields: _toConsumableArray(fields)
        });
        // Force view to re-render.
        setLocalCategories(originalLocalCategories);
        setView(newViewCopy);

        // Now filter the patterns.
        if (data.patterns) {
          if (data.patterns !== patternsDisplay) {
            var patternsToShow = getPatternsForDisplay(view);
            setPatternsDisplay(patternsToShow);
          }
        }
        setLoading(false);
      }
    }
  }, [data]);
  if (loading) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Loading...");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"], {
    data: patternsDisplay,
    fields: fields,
    actions: actions,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Patterns', 'pattern-wrangler'),
    view: view,
    onChangeView: onChangeView,
    paginationInfo: {
      totalItems: getFilteredPatternsCount(view),
      totalPages: Math.ceil(getFilteredPatternsCount(view) / view.perPage)
    },
    perPageSizes: [12, 24, 48, 96],
    selection: selectedItems,
    onChangeSelection: setSelectedItems,
    defaultLayouts: defaultLayouts,
    searchLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Search Patterns', 'pattern-wrangler')
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container-header"
  }, /*#__PURE__*/React.createElement("h1", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Library', 'pattern-wrangler'))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-quick-buttons-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "primary",
    className: "dlx-patterns-view-quick-button",
    onClick: function onClick() {
      setIsAddNewPatternModalOpen(true);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add New Pattern', 'pattern-wrangler')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.FormFileUpload, {
    accept: ".json",
    variant: "secondary",
    className: "dlx-patterns-view-quick-button",
    onChange: (/*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
        var file, pattern, response, getPatternResponse;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              file = event.target.files[0];
              _context2.prev = 1;
              _context2.next = 4;
              return (0,_utils_createPatternFromFile__WEBPACK_IMPORTED_MODULE_19__["default"])(file);
            case 4:
              pattern = _context2.sent;
              _context2.next = 7;
              return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
                path: '/wp/v2/blocks',
                method: 'POST',
                data: {
                  title: pattern.title,
                  content: pattern.content,
                  status: 'publish',
                  meta: {
                    wp_pattern_sync_status: pattern.syncStatus
                  }
                }
              });
            case 7:
              response = _context2.sent;
              if (!(response !== null && response !== void 0 && response.id)) {
                _context2.next = 13;
                break;
              }
              _context2.next = 11;
              return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
                path: "/dlxplugins/pattern-wrangler/v1/patterns/get/".concat(response.id),
                method: 'GET'
              });
            case 11:
              getPatternResponse = _context2.sent;
              if (getPatternResponse) {
                (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).addPattern(getPatternResponse);
              }
            case 13:
              _context2.next = 17;
              break;
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 15]]);
      }));
      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }())
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Import Pattern From JSON File', 'pattern-wrangler'))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-search-filters-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].Search, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Search Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].FiltersToggle, null)), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-button-actions-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Type', 'pattern-wrangler'),
    isAdaptiveWidth: true,
    hideLabelFromVision: true,
    value: (view === null || view === void 0 || (_view$filters = view.filters) === null || _view$filters === void 0 || (_view$filters = _view$filters.find(function (filter) {
      return filter.field === 'patternType';
    })) === null || _view$filters === void 0 ? void 0 : _view$filters.value) || 'all',
    onChange: function onChange(value) {
      var _myNewView$filters;
      var myNewView = _objectSpread({}, view);
      // Merge with existing filters, replacing patternType if it exists
      var existingFilters = ((_myNewView$filters = myNewView.filters) === null || _myNewView$filters === void 0 ? void 0 : _myNewView$filters.filter(function (filter) {
        return filter.field !== 'patternType';
      })) || [];
      myNewView.filters = [].concat(_toConsumableArray(existingFilters), [{
        field: 'patternType',
        operator: 'is',
        value: value
      }]);
      // Reset to first page when filter changes
      myNewView.page = 1;
      onChangeView(myNewView);
      var patternUrl = window.location.href;
      switch (value) {
        case 'all':
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternStatus');
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternRegisteredStatus');
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternLocalStatus');
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternLocalRegisteredStatus');
          window.history.pushState({}, '', patternUrl);
          break;
        case 'local':
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternRegisteredStatus');
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternLocalRegisteredStatus');
          window.history.pushState({}, '', patternUrl);
          break;
        case 'registered':
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternStatus');
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternLocalStatus');
          patternUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_9__.removeQueryArgs)(patternUrl, 'patternLocalRegisteredStatus');
          window.history.pushState({}, '', patternUrl);
          break;
        default:
          break;
      }
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "local",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Local', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Local Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "all",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('All', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show All Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "registered",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Registered', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Registered Patterns', 'pattern-wrangler')
  })),
  // If patttern type is local, show synced|both|unsynced buttons.
  (view === null || view === void 0 || (_view$filters2 = view.filters) === null || _view$filters2 === void 0 || (_view$filters2 = _view$filters2.find(function (filter) {
    return filter.field === 'patternType';
  })) === null || _view$filters2 === void 0 ? void 0 : _view$filters2.value) === 'registered' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Registered Status', 'pattern-wrangler'),
    isAdaptiveWidth: true,
    hideLabelFromVision: true,
    value: (view === null || view === void 0 || (_view$filters3 = view.filters) === null || _view$filters3 === void 0 || (_view$filters3 = _view$filters3.find(function (filter) {
      return filter.field === 'patternRegisteredStatus';
    })) === null || _view$filters3 === void 0 ? void 0 : _view$filters3.value) || 'both',
    onChange: function onChange(value) {
      var _myNewView$filters2;
      var myNewView = _objectSpread({}, view);
      // Merge with existing filters, replacing patternStatus if it exists
      var existingFilters = ((_myNewView$filters2 = myNewView.filters) === null || _myNewView$filters2 === void 0 ? void 0 : _myNewView$filters2.filter(function (filter) {
        return filter.field !== 'patternRegisteredStatus';
      })) || [];
      myNewView.filters = [].concat(_toConsumableArray(existingFilters), [{
        field: 'patternRegisteredStatus',
        operator: 'is',
        value: value
      }]);
      // Reset to first page when filter changes
      myNewView.page = 1;
      onChangeView(myNewView);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "paused",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disabled', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Disabled Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "both",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Both Disabled and Enabled Patterns', 'pattern-wrangler'),
    showTooltip: true
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "unpaused",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enabled', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Enabled Patterns', 'pattern-wrangler')
  }))),
  // If patttern type is local, show synced|both|unsynced buttons.
  (view === null || view === void 0 || (_view$filters4 = view.filters) === null || _view$filters4 === void 0 || (_view$filters4 = _view$filters4.find(function (filter) {
    return filter.field === 'patternType';
  })) === null || _view$filters4 === void 0 ? void 0 : _view$filters4.value) === 'local' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Status', 'pattern-wrangler'),
    isAdaptiveWidth: true,
    hideLabelFromVision: true,
    value: (view === null || view === void 0 || (_view$filters5 = view.filters) === null || _view$filters5 === void 0 || (_view$filters5 = _view$filters5.find(function (filter) {
      return filter.field === 'patternStatus';
    })) === null || _view$filters5 === void 0 ? void 0 : _view$filters5.value) || 'both',
    onChange: function onChange(value) {
      var _myNewView$filters3;
      var myNewView = _objectSpread({}, view);
      // Merge with existing filters, replacing patternStatus if it exists
      var existingFilters = ((_myNewView$filters3 = myNewView.filters) === null || _myNewView$filters3 === void 0 ? void 0 : _myNewView$filters3.filter(function (filter) {
        return filter.field !== 'patternStatus';
      })) || [];
      myNewView.filters = [].concat(_toConsumableArray(existingFilters), [{
        field: 'patternStatus',
        operator: 'is',
        value: value
      }]);
      // Reset to first page when filter changes
      myNewView.page = 1;
      onChangeView(myNewView);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "unsynced",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Unsynced', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Unsynced Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "both",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Both Synced and Unsynced Patterns', 'pattern-wrangler'),
    showTooltip: true
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "synced",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Synced', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Synced Patterns', 'pattern-wrangler')
  })), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Published Status', 'pattern-wrangler'),
    isAdaptiveWidth: true,
    hideLabelFromVision: true,
    value: (view === null || view === void 0 || (_view$filters6 = view.filters) === null || _view$filters6 === void 0 || (_view$filters6 = _view$filters6.find(function (filter) {
      return filter.field === 'patternLocalStatus';
    })) === null || _view$filters6 === void 0 ? void 0 : _view$filters6.value) || 'both',
    onChange: function onChange(value) {
      var _myNewView$filters4;
      var myNewView = _objectSpread({}, view);
      // Merge with existing filters, replacing patternStatus if it exists
      var existingFilters = ((_myNewView$filters4 = myNewView.filters) === null || _myNewView$filters4 === void 0 ? void 0 : _myNewView$filters4.filter(function (filter) {
        return filter.field !== 'patternLocalStatus';
      })) || [];
      myNewView.filters = [].concat(_toConsumableArray(existingFilters), [{
        field: 'patternLocalStatus',
        operator: 'is',
        value: value
      }]);
      // Reset to first page when filter changes
      myNewView.page = 1;
      onChangeView(myNewView);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "draft",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Draft', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Draft Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "both",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Both Draft and Published Patterns', 'pattern-wrangler'),
    showTooltip: true
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "published",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Published', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Published Patterns', 'pattern-wrangler')
  }))),
  // If patttern type is local, show synced|both|unsynced buttons.
  (view === null || view === void 0 || (_view$filters7 = view.filters) === null || _view$filters7 === void 0 || (_view$filters7 = _view$filters7.find(function (filter) {
    return filter.field === 'patternType';
  })) === null || _view$filters7 === void 0 ? void 0 : _view$filters7.value) === 'all' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disabled Status', 'pattern-wrangler'),
    isAdaptiveWidth: true,
    hideLabelFromVision: true,
    value: (view === null || view === void 0 || (_view$filters8 = view.filters) === null || _view$filters8 === void 0 || (_view$filters8 = _view$filters8.find(function (filter) {
      return filter.field === 'patternLocalRegisteredStatus';
    })) === null || _view$filters8 === void 0 ? void 0 : _view$filters8.value) || 'both',
    onChange: function onChange(value) {
      var _myNewView$filters5;
      var myNewView = _objectSpread({}, view);
      // Merge with existing filters, replacing patternStatus if it exists
      var existingFilters = ((_myNewView$filters5 = myNewView.filters) === null || _myNewView$filters5 === void 0 ? void 0 : _myNewView$filters5.filter(function (filter) {
        return filter.field !== 'patternLocalRegisteredStatus';
      })) || [];
      myNewView.filters = [].concat(_toConsumableArray(existingFilters), [{
        field: 'patternLocalRegisteredStatus',
        operator: 'is',
        value: value
      }]);
      // Reset to first page when filter changes
      myNewView.page = 1;
      onChangeView(myNewView);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "disabled",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Disabled', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Disabled Local and Registered Patterns', 'pattern-wrangler')
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "both",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Both', 'pattern-wrangler'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Both Disabled and Enabled Local and Registered Patterns', 'pattern-wrangler'),
    showTooltip: true
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControlOption, {
    value: "enabled",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Enabled', 'pattern-wrangler'),
    showTooltip: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Show Only Enabled Local and Registered Patterns', 'pattern-wrangler')
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-layout-pagination-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].ViewConfig, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].LayoutSwitcher, null))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-filters-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].Filters, null)), /*#__PURE__*/React.createElement("div", {
    className: "dlx-bulk-action-toolbar-top"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].BulkActionToolbar, null)), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].Layout, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].BulkActionToolbar, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_21__["default"].Pagination, null)), snackbar.isVisible && /*#__PURE__*/React.createElement(_Snackbar__WEBPACK_IMPORTED_MODULE_11__["default"], {
    isVisible: snackbar.isVisible,
    message: snackbar.message,
    title: snackbar.title,
    type: snackbar.type,
    onClose: function onClose() {
      setSnackbar({
        isVisible: false
      });
    }
  })), isAddNewPatternModalOpen && /*#__PURE__*/React.createElement(_PatternCreateModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
    isOpen: isAddNewPatternModalOpen,
    onRequestClose: function onRequestClose() {
      return setIsAddNewPatternModalOpen(false);
    },
    categories: localCategories,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Create New Pattern', 'pattern-wrangler')
  }), isCopyToLocalModalOpen && /*#__PURE__*/React.createElement(_PatternCreateModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
    isOpen: isCopyToLocalModalOpen,
    onRequestClose: function onRequestClose() {
      return setIsCopyToLocalModalOpen(false);
    },
    categories: localCategories,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Copy Pattern to Local', 'pattern-wrangler'),
    syncedDefaultStatus: 'unsynced',
    copyPatternId: isCopyToLocalModalOpen.item.id
  }), isQuickEditModalOpen && /*#__PURE__*/React.createElement(_PatternCreateModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
    isOpen: isQuickEditModalOpen,
    onRequestClose: function onRequestClose() {
      return setIsQuickEditModalOpen(null);
    },
    pattern: isQuickEditModalOpen.item,
    patternTitle: isQuickEditModalOpen.item.title,
    categories: localCategories,
    patternCategories: isQuickEditModalOpen.item.categories,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Quick Edit Pattern', 'pattern-wrangler'),
    syncedDisabled: true,
    patternId: isQuickEditModalOpen.item.id,
    patternNonce: isQuickEditModalOpen.item.editNonce,
    isEditMode: true,
    onEdit: function onEdit(editResponse) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).upsertCategory(editResponse.categories);
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).setPattern(editResponse.patternId, editResponse.patternTitle, editResponse.categorySlugs, editResponse.categorySlugs);
      setIsQuickEditModalOpen(null);
    }
  }), isPauseModalOpen && /*#__PURE__*/React.createElement(_PatternPauseModal__WEBPACK_IMPORTED_MODULE_13__["default"], {
    items: isPauseModalOpen.items,
    onPause: function onPause(pauseResponse, itemIdsAndNonces) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).disablePatterns(itemIdsAndNonces);
      setIsPauseModalOpen(null);
    },
    onRequestClose: function onRequestClose() {
      return setIsPauseModalOpen(null);
    }
  }), isPublishModalOpen && /*#__PURE__*/React.createElement(_PatternPublishModal__WEBPACK_IMPORTED_MODULE_14__["default"], {
    items: isPublishModalOpen.items,
    onPublish: function onPublish(publishResponse, itemIdsAndNonces) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).enablePatterns(itemIdsAndNonces);
      setIsPublishModalOpen(null);
    },
    onRequestClose: function onRequestClose() {
      return setIsPublishModalOpen(null);
    }
  }), isUnpauseModalOpen && /*#__PURE__*/React.createElement(_PatternUnpauseModal__WEBPACK_IMPORTED_MODULE_15__["default"], {
    items: isUnpauseModalOpen.items,
    onReenable: function onReenable(reenableResponse, itemIdsAndNonces) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).enablePatterns(itemIdsAndNonces);
      setIsUnpauseModalOpen(null);
    },
    onRequestClose: function onRequestClose() {
      return setIsUnpauseModalOpen(null);
    }
  }), isDeleteModalOpen && /*#__PURE__*/React.createElement(_PatternDeleteModal__WEBPACK_IMPORTED_MODULE_16__["default"], {
    items: isDeleteModalOpen.items,
    onDelete: function onDelete(deleteResponse, itemIdsAndNonces) {
      (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.dispatch)(_store__WEBPACK_IMPORTED_MODULE_18__["default"]).deletePatterns(itemIdsAndNonces);
      setIsDeleteModalOpen(null);
    },
    onRequestClose: function onRequestClose() {
      return setIsDeleteModalOpen(null);
    }
  }), isGetCodeModalOpen && /*#__PURE__*/React.createElement(_PatternGetCodeModal__WEBPACK_IMPORTED_MODULE_17__["default"], {
    item: isGetCodeModalOpen.item,
    onRequestClose: function onRequestClose() {
      return setIsGetCodeModalOpen(null);
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternsGrid);

/***/ }),

/***/ "./src/js/react/views/patterns/components/Snackbar/index.js":
/*!******************************************************************!*\
  !*** ./src/js/react/views/patterns/components/Snackbar/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Notice */ "./src/js/react/components/Notice/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







/**
 * SnackPop is a component which handles alerts and notifications for the user.
 * It can handle multiple alerts at once, toggles and forms, and will display the notifications in a queue.
 *
 * @param {Object}   props                Component props.
 * @param {boolean}  props.isVisible      Whether the snackbar is visible.
 * @param {string}   props.message        The message to display in the snackbar.
 * @param {string}   props.title          The title of the snackbar.
 * @param {string}   props.type           The type of snackbar to display.
 * @param {boolean}  props.isDismissable  Whether the snackbar is dismissable.
 * @param {boolean}  props.isPersistent   Whether the snackbar is persistent.
 * @param {boolean}  props.isSuccess      Whether the snackbar is a success.
 * @param {string}   props.loadingMessage The message to display when the snackbar is loading.
 * @param {string}   props.politeness     The politeness of the snackbar.
 * @param {Function} props.onClose        The function to call when the snackbar is closed.
 *
 * @return {Element} JSX markup for the component.
 */
var Snackbar = function Snackbar(props) {
  var loadingMessage = props.loadingMessage;
  var snackbarDefaults = {
    type: props.type,
    message: props.message,
    title: props.title,
    isDismissable: false,
    isPersistent: false,
    isSuccess: false,
    loadingMessage: loadingMessage,
    politeness: 'polite' /* can also be assertive */
  };
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(snackbarDefaults),
    _useState2 = _slicedToArray(_useState, 2),
    notificationOptions = _useState2[0],
    setNotificationOptions = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isBusy = _useState4[0],
    setIsBusy = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isModalVisible = _useState6[0],
    setIsModalVisible = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (props.isVisible) {
      setTimeout(function () {
        props.onClose();
      }, 5000);
    }
  }, [props.isVisible]);

  /**
   * Gets the icon for the notification.
   *
   * @return {Element} JSX markup for the icon.
   */
  var getIcon = function getIcon() {
    switch (notificationOptions.type) {
      case 'success':
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], null);
      case 'error':
      case 'critical':
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], null);
      default:
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], null);
    }
  };
  var getSnackbarActions = function getSnackbarActions() {
    var actions = [];
    if (notificationOptions.type === 'success') {
      actions.push({
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Back to Top', 'pattern-wrangler'),
        url: '#dlx-pw-admin-header',
        variant: 'link',
        className: 'dlx-pw-admin__notice-action dlx-pw-admin__notice-action--to-top'
      });
    }
    return actions;
  };
  var getSnackBar = function getSnackBar() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Snackbar, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("dlx-pw-snackbar dlx-pw-snackbar-".concat(notificationOptions.type), {
        'dlx-pw-snackbar-loading': isBusy
      }),
      actions: getSnackbarActions(),
      icon: getIcon(),
      onDismiss: function onDismiss() {
        setIsModalVisible(false);
        props.onClose();
      },
      explicitDismiss: notificationOptions.isDismissable
    }, isBusy ? loadingMessage : notificationOptions.message);
  };
  var getModal = function getModal() {
    if ('critical' === notificationOptions.type) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()("dlx-pw-modal dlx-pw-modal-".concat(notificationOptions.type), {
          'dlx-pw-modal-loading': isBusy
        }),
        bodyOpenClassName: 'dlx-pw-modal-body-open',
        title: notificationOptions.title,
        onRequestClose: function onRequestClose() {
          setIsModalVisible(false);
        },
        isDismissible: true,
        shouldCloseOnClickOutside: notificationOptions.isPersistent,
        shouldCloseOnEsc: notificationOptions.isPersistent
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_4__["default"], {
        message: notificationOptions.message,
        status: notificationOptions.type,
        politeness: notificationOptions.politeness,
        icon: getIcon,
        inline: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "dlx-pw-modal-button-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        className: "button button-error",
        variant: "secondary",
        onClick: function onClick() {
          setIsModalVisible(false);
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('OK', 'pattern-wrangler'))));
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getSnackBar(), " ", isModalVisible && getModal(), " ");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snackbar);

/***/ }),

/***/ "./src/js/react/views/patterns/store/index.js":
/*!****************************************************!*\
  !*** ./src/js/react/views/patterns/store/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



var DEFAULT_STATE = {
  patterns: [],
  categories: [],
  assets: [],
  data: {
    patterns: [],
    categories: [],
    assets: []
  },
  loading: false,
  error: null
};
var actions = {
  setPatterns: function setPatterns(patterns) {
    return {
      type: 'SET_PATTERNS',
      patterns: patterns
    };
  },
  setPattern: function setPattern(patternId, patternTitle, patternCategories, patternCategorySlugs) {
    return {
      type: 'SET_PATTERN',
      patternId: patternId,
      patternTitle: patternTitle,
      patternCategories: patternCategories,
      patternCategorySlugs: patternCategorySlugs
    };
  },
  addPattern: function addPattern(pattern) {
    return {
      type: 'ADD_PATTERN',
      pattern: pattern
    };
  },
  disablePatterns: function disablePatterns(patternIdsAndNonces) {
    return {
      type: 'DISABLE_PATTERNS',
      patternIdsAndNonces: patternIdsAndNonces
    };
  },
  enablePatterns: function enablePatterns(patternIdsAndNonces) {
    return {
      type: 'ENABLE_PATTERNS',
      patternIdsAndNonces: patternIdsAndNonces
    };
  },
  setCategory: function setCategory(categoryId, categoryTermData) {
    return {
      type: 'SET_CATEGORY',
      categoryId: categoryId,
      categoryTermData: categoryTermData
    };
  },
  upsertCategory: function upsertCategory(categoryData) {
    return {
      type: 'UPSERT_CATEGORY',
      categoryData: categoryData
    };
  },
  setCategories: function setCategories(categories) {
    return {
      type: 'SET_CATEGORIES',
      categories: categories
    };
  },
  setAssets: function setAssets(assets) {
    return {
      type: 'SET_ASSETS',
      assets: assets
    };
  },
  setData: function setData(data) {
    return {
      type: 'SET_DATA',
      data: data
    };
  },
  setAllData: function setAllData(patterns, categories, assets, data) {
    return {
      type: 'SET_ALL_DATA',
      patterns: patterns,
      categories: categories,
      assets: assets,
      data: data
    };
  },
  setLoading: function setLoading(loading) {
    return {
      type: 'SET_LOADING',
      loading: loading
    };
  },
  setError: function setError(error) {
    return {
      type: 'SET_ERROR',
      error: error
    };
  },
  fetchData: function fetchData() {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
        var dispatch, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              dispatch = _ref.dispatch;
              _context.prev = 1;
              dispatch(actions.setLoading(true));
              dispatch(actions.setError(null));
              _context.next = 6;
              return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
                path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)('/dlxplugins/pattern-wrangler/v1/patterns/all/', {
                  nonce: dlxEnhancedPatternsView.getNonce
                }),
                method: 'GET'
              });
            case 6:
              response = _context.sent;
              if (response) {
                dispatch(actions.setAllData(response.patterns, response.categories, response.assets, response));
              } else {
                dispatch(actions.setError('Failed to fetch data'));
              }
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              dispatch(actions.setError(_context.t0.message || 'Network error occurred'));
            case 13:
              _context.prev = 13;
              dispatch(actions.setLoading(false));
              return _context.finish(13);
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 10, 13, 16]]);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  },
  deletePatterns: function deletePatterns(patternIdsAndNonces) {
    return {
      type: 'DELETE_PATTERNS',
      patternIdsAndNonces: patternIdsAndNonces
    };
  }
};
var patternsStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('dlxplugins/pattern-wrangler/patterns', {
  reducer: function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    switch (action.type) {
      case 'SET_ALL_DATA':
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: action.patterns,
          categories: action.categories,
          assets: action.assets,
          data: action.data,
          loading: false,
          error: null
        });
      case 'SET_PATTERNS':
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: action.patterns
        });
      case 'SET_CATEGORIES':
        return _objectSpread(_objectSpread({}, state), {}, {
          categories: action.categories
        });
      case 'UPSERT_CATEGORY':
        var categoryData = action.categoryData;
        var updatedCategories = _objectSpread(_objectSpread({}, categoryData), state.categories);
        return _objectSpread(_objectSpread({}, state), {}, {
          categories: updatedCategories,
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            categories: updatedCategories
          })
        });
      case 'SET_PATTERN':
        var patternCategories = action.patternCategories,
          patternCategorySlugs = action.patternCategorySlugs;
        var newPatterns = state.patterns.map(function (pattern) {
          if (pattern.id === action.patternId) {
            return _objectSpread(_objectSpread({}, pattern), {
              title: action.patternTitle,
              categories: patternCategories,
              categorySlugs: patternCategorySlugs
            });
          }
          return pattern;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: newPatterns,
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            patterns: newPatterns
          })
        });
      case 'ADD_PATTERN':
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: [].concat(_toConsumableArray(state.patterns), [action.pattern]),
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            patterns: [].concat(_toConsumableArray(state.patterns), [action.pattern])
          })
        });
      case 'SET_CATEGORY':
        var newCategories = state.categories.map(function (category) {
          if (category.id === action.categoryId) {
            return _objectSpread(_objectSpread({}, category), action.categoryTermData);
          }
          return category;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          categories: newCategories,
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            categories: newCategories
          })
        });
      case 'SET_DATA':
        return _objectSpread(_objectSpread({}, state), {}, {
          data: action.data
        });
      case 'SET_ASSETS':
        return _objectSpread(_objectSpread({}, state), {}, {
          assets: action.assets
        });
      case 'SET_LOADING':
        return _objectSpread(_objectSpread({}, state), {}, {
          loading: action.loading
        });
      case 'SET_ERROR':
        return _objectSpread(_objectSpread({}, state), {}, {
          error: action.error
        });
      case 'DISABLE_PATTERNS':
        var disabledPatternIdsAndNonces = action.patternIdsAndNonces;
        // Mark matching pattern IDs as disabled.
        var updatedPatterns = [];
        state.patterns.forEach(function (pattern) {
          if (disabledPatternIdsAndNonces.some(function (patternIdAndNonce) {
            return patternIdAndNonce.id === pattern.id;
          })) {
            pattern.isDisabled = true;
          }
          updatedPatterns.push(pattern);
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: [].concat(updatedPatterns),
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            patterns: [].concat(updatedPatterns)
          })
        });
      case 'ENABLE_PATTERNS':
        var enabledPatternIdsAndNonces = action.patternIdsAndNonces;
        var updatedEnabledPatterns = [];
        state.patterns.forEach(function (pattern) {
          if (enabledPatternIdsAndNonces.some(function (patternIdAndNonce) {
            return patternIdAndNonce.id === pattern.id;
          })) {
            pattern.isDisabled = false;
          }
          updatedEnabledPatterns.push(pattern);
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: [].concat(updatedEnabledPatterns),
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            patterns: [].concat(updatedEnabledPatterns)
          })
        });
      case 'DELETE_PATTERNS':
        var deletedPatternIdsAndNonces = action.patternIdsAndNonces;
        var updatedDeletedPatterns = _toConsumableArray(state.patterns).filter(function (pattern) {
          return !deletedPatternIdsAndNonces.some(function (patternIdAndNonce) {
            return patternIdAndNonce.id === pattern.id;
          });
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          patterns: updatedDeletedPatterns,
          data: _objectSpread(_objectSpread({}, state.data), {}, {
            patterns: updatedDeletedPatterns
          })
        });
      default:
        return state;
    }
  },
  actions: actions,
  selectors: {
    getPatterns: function getPatterns(state) {
      return state.patterns;
    },
    getCategories: function getCategories(state) {
      return state.categories;
    },
    getAssets: function getAssets(state) {
      return state.assets;
    },
    getData: function getData(state) {
      return state.data;
    },
    getLoading: function getLoading(state) {
      return state.loading;
    },
    getError: function getError(state) {
      return state.error;
    }
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(patternsStore);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (patternsStore);

/***/ }),

/***/ "./src/js/react/views/patterns/utils/createPatternFromFile.js":
/*!********************************************************************!*\
  !*** ./src/js/react/views/patterns/utils/createPatternFromFile.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPatternFromFile: () => (/* binding */ createPatternFromFile),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

function createPatternFromFile(_x) {
  return _createPatternFromFile.apply(this, arguments);
}
function _createPatternFromFile() {
  _createPatternFromFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
    var fileText, patternJSON, content, syncStatus;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return file.text();
        case 2:
          fileText = _context.sent;
          _context.prev = 3;
          patternJSON = JSON.parse(fileText);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](3);
          throw new Error('Invalid JSON file (cannot parse)');
        case 10:
          if (patternJSON.title) {
            _context.next = 12;
            break;
          }
          throw new Error('Pattern JSON missing a title');
        case 12:
          // 4. Determine content source
          content = '';
          if (!(typeof patternJSON.content === 'string')) {
            _context.next = 17;
            break;
          }
          // Already serialized HTML
          content = patternJSON.content;
          _context.next = 22;
          break;
        case 17:
          if (!Array.isArray(patternJSON.blocks)) {
            _context.next = 21;
            break;
          }
          // Convert block AST → HTML
          content = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.serialize)(patternJSON.blocks);
          _context.next = 22;
          break;
        case 21:
          throw new Error('Pattern JSON missing content or blocks array');
        case 22:
          // 5. Normalize sync status
          syncStatus = typeof patternJSON.syncStatus === 'string' ? patternJSON.syncStatus : 'unsynced';
          return _context.abrupt("return", {
            title: patternJSON.title,
            content: content,
            syncStatus: syncStatus
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 7]]);
  }));
  return _createPatternFromFile.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPatternFromFile);

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=src_js_react_views_patterns_components_PatternsGrid_js.js.map?ver=b81e40e2e8cc0881b50f