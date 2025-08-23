"use strict";
(globalThis["webpackChunkpattern_wrangler"] = globalThis["webpackChunkpattern_wrangler"] || []).push([["src_js_react_views_patterns_components_PatternsGrid_js"],{

/***/ "./src/js/react/components/ErrorBoundary/index.js":
/*!********************************************************!*\
  !*** ./src/js/react/components/ErrorBoundary/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

// From: https://blog.logrocket.com/async-rendering-react-suspense/
// Error boundaries currently have to be classes.
var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  function ErrorBoundary() {
    var _this;
    _classCallCheck(this, ErrorBoundary);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ErrorBoundary, [].concat(args));
    _defineProperty(_this, "state", {
      hasError: false,
      error: null
    });
    return _this;
  }
  _inherits(ErrorBoundary, _React$Component);
  return _createClass(ErrorBoundary, [{
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error
      };
    }
  }]);
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/js/react/components/Notice/index.js":
/*!*************************************************!*\
  !*** ./src/js/react/components/Notice/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/js/react/views/patterns/components/PatternsGrid.js":
/*!****************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternsGrid.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../store */ "./src/js/react/views/patterns/store/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _Snackbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Snackbar */ "./src/js/react/views/patterns/components/Snackbar/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
    iframeHeight = _useState8[0],
    setIframeHeight = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    iframeMinHeight = _useState10[0],
    setIframeMinHeight = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState12 = _slicedToArray(_useState11, 2),
    aspectRatio = _useState12[0],
    setAspectRatio = _useState12[1];

  // Handle iframe load and setup communication with PHP scaling system.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var iframe = iframeRef.current;
    if (!iframe) {
      return;
    }
    var handleLoad = function handleLoad() {
      setIsLoaded(true);
      setIframeWidth(item.viewportWidth || iframe.offsetWidth);
      setIframeHeight(iframe.offsetHeight);

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
      setIframeHeight(iframeRef.current.offsetHeight);
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
    zoom: true,
    compact: true,
    width: '80%'
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

/**
 * Retrieve all the patterns.
 *
 * @return {Promise<Object>} The patterns.
 */
var retrieveAllPatterns = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_8___default()({
            path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.addQueryArgs)('/dlxplugins/pattern-wrangler/v1/patterns/all/', {
              nonce: dlxEnhancedPatternsView.getNonce
            }),
            method: 'GET'
          });
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function retrieveAllPatterns() {
    return _ref2.apply(this, arguments);
  };
}();
var PatternsGrid = function PatternsGrid(props) {
  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_9__.useAsyncResource)(retrieveAllPatterns, []),
    _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
    defaults = _useAsyncResource2[0],
    getDefaults = _useAsyncResource2[1];
  return /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_13__["default"], {
    fallback: /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Could not load block patterns.', 'quotes-dlx'), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", {
      className: "has-admin-container-body__content"
    }, "loading...")
  }, /*#__PURE__*/React.createElement(Interface, _extends({
    defaults: defaults
  }, props))));
};

// Get query args from current URL.
var queryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href);
var Interface = function Interface(props) {
  var _getQueryArgs, _view$filters, _view$filters2, _view$filters3;
  var defaults = props.defaults;
  var data = defaults();
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedItems = _useState14[0],
    setSelectedItems = _useState14[1];
  var _useState15 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    patterns = _useState16[0],
    setPatterns = _useState16[1];
  var _useState17 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState18 = _slicedToArray(_useState17, 2),
    patternsDisplay = _useState18[0],
    setPatternsDisplay = _useState18[1];
  var _useState19 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState20 = _slicedToArray(_useState19, 2),
    categories = _useState20[0],
    setCategories = _useState20[1];
  var _useState21 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState22 = _slicedToArray(_useState21, 2),
    loading = _useState22[0],
    setLoading = _useState22[1];
  var _useState23 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      isVisible: false,
      message: '',
      title: '',
      type: ''
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    snackbar = _useState24[0],
    setSnackbar = _useState24[1];
  var _useState25 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState26 = _slicedToArray(_useState25, 2),
    isFiltersOpen = _useState26[0],
    setIsFiltersOpen = _useState26[1];
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_11__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_12__["default"]),
    setViewType = _useDispatch.setViewType;
  var _useState27 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      type: 'grid',
      previewSize: 'large',
      paginationInfo: {
        totalItems: patterns.length,
        totalPages: 0
      },
      page: parseInt((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href).paged) || 1,
      perPage: parseInt((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href).perPage) || 12,
      defaultPerPage: 12,
      sort: {
        field: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__.escapeAttribute)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href).orderby || 'title'),
        direction: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__.escapeAttribute)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href).order || 'asc')
      },
      titleField: 'title',
      mediaField: 'pattern-view-json',
      layout: defaultLayouts.grid.layout,
      fields: ['title', 'pattern-view-json'],
      search: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_4__.escapeAttribute)(((_getQueryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href)) === null || _getQueryArgs === void 0 ? void 0 : _getQueryArgs.search) || '')
    }),
    _useState28 = _slicedToArray(_useState27, 2),
    view = _useState28[0],
    setView = _useState28[1];
  var fields = [{
    id: 'title',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Title', 'pattern-wrangler'),
    render: function render(_ref3) {
      var item = _ref3.item;
      if (!(item !== null && item !== void 0 && item.categorySlugs) || item.categorySlugs.length === 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "no-categories"
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('No categories', 'pattern-wrangler'));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: "pattern-title-categories"
      }, /*#__PURE__*/React.createElement("div", {
        className: "pattern-title"
      }, item.title), item.categorySlugs.length > 0 && Object.values(categories).length > 0 && /*#__PURE__*/React.createElement("div", {
        className: "pattern-categories"
      }, item.categorySlugs.map(function (category, index) {
        if (!categories.hasOwnProperty(category)) {
          return null;
        }
        var catLabel = categories[category].label || categories[category].name;
        return /*#__PURE__*/React.createElement("span", {
          key: "category-".concat(index),
          className: "pattern-category"
        }, catLabel, ' ', index < item.categorySlugs.length - 1 && ', ');
      })));
    },
    enableSorting: true,
    enableHiding: false,
    enableGlobalSearch: true
  }, {
    id: 'pattern-view-json',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Preview', 'pattern-wrangler'),
    getValue: function getValue(_ref4) {
      var item = _ref4.item;
      var viewportWidth = item.viewportWidth || 1200;
      var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "&viewport_width=").concat(viewportWidth) : '';

      // Determine badge type based on pattern properties.
      var badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Local', 'pattern-wrangler');
      var badgeClass = 'pattern-badge-local';
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
      }, /*#__PURE__*/React.createElement("span", {
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
    render: function render(_ref5) {
      var item = _ref5.item;
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
  }];
  var actions = [{
    id: 'edit',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Edit', 'pattern-wrangler'),
    icon: 'edit',
    callback: function callback() {
      // TODO: Implement edit functionality.
    },
    isEligible: function isEligible(pattern) {
      return pattern.isLocal;
    },
    isPrimary: true
  }, {
    id: 'delete',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Delete Pattern', 'pattern-wrangler'),
    icon: 'trash',
    isEligible: function isEligible(pattern) {
      // Pattern must be local.
      return pattern.isLocal;
    },
    callback: function callback() {
      // TODO: Implement delete functionality.
    },
    isPrimary: false,
    isDestructive: true
  }, {
    id: 'delete',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Preview Pattern', 'pattern-wrangler'),
    icon: 'edit',
    isEligible: function isEligible() {
      // Pattern must be local.
      return true;
    },
    callback: function callback(items) {
      // Get the first item.
      var item = items[0];
      popPatternPreview(item);
    },
    isPrimary: false,
    isDestructive: true
  }, {
    id: 'copy-to-local',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Copy to Local Pattern', 'pattern-wrangler'),
    icon: 'edit',
    callback: function callback() {
      // TODO: Implement copy to local functionality.
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
    callback: function callback() {
      // TODO: Implement disable preview functionality.
    },
    isEligible: function isEligible(item) {
      return !item.isLocal;
    },
    isDestructive: true,
    supportsBulk: true,
    isPrimary: false
  }, {
    id: 'delete-pattern',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Delete Pattern', 'pattern-wrangler'),
    icon: 'trash',
    callback: function callback() {
      // TODO: Implement delete pattern functionality.
    },
    isEligible: function isEligible(item) {
      return item.isLocal;
    },
    isDestructive: true,
    supportsBulk: true,
    isPrimary: false
  }, {
    id: 'copy',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Copy Pattern', 'pattern-wrangler'),
    icon: 'edit',
    callback: function callback(items) {
      var copyContent = items[0].content.trim();
      try {
        var copyBlob = new Blob([copyContent], {
          type: 'text/html'
        });
        var _data = [new ClipboardItem(_defineProperty({}, copyBlob.type, copyBlob))];
        navigator.clipboard.write(_data);
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
      } catch (e) {
        // Copying is not supported on Mozilla (firefox).
      }
    },
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

  // const { data, isLoading, error } = useQuery( {
  // 	queryKey: [ 'all-patterns', view.perPage, view.page, view.search, view.sort ],
  // 	queryFn: () =>
  // 		fetchPatterns( {
  // 			perPage: view.perPage,
  // 			page: view.page,
  // 			search: view.search,
  // 			sort: view.sort,
  // 		} ),
  // } );

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
                return (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.cleanForSlug)(value);
              });
              if (filter.operator === 'isAny') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];
                  return patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });
                });
              } else if (filter.operator === 'isNone') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];

                  // Exclude patterns that have ANY of the categories in filter.value
                  // Check if this pattern has any excluded categories
                  var hasExcludedCategory = patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });

                  // Return true to keep the pattern only if it has NO excluded categories
                  return !hasExcludedCategory;
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
                return (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.cleanForSlug)(value);
              });
              if (filter.operator === 'isAny') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];
                  return patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });
                });
              } else if (filter.operator === 'isNone') {
                patternsCopy = patternsCopy.filter(function (pattern) {
                  var patternCategories = pattern.categorySlugs || [];

                  // Exclude patterns that have ANY of the categories in filter.value
                  // Check if this pattern has any excluded categories
                  var hasExcludedCategory = patternCategories.some(function (category) {
                    var categoryToCheck = category.name || (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.cleanForSlug)(category);
                    return cleanedFilterValues.includes(categoryToCheck);
                  });

                  // Return true to keep the pattern only if it has NO excluded categories
                  return !hasExcludedCategory;
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
    var _newView$sort5;
    // Create query args object with view state.
    var changeQueryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href);
    changeQueryArgs.paged = newView.page || 1;
    changeQueryArgs.perPage = newView.perPage;

    // Only add search if it exists.
    if (newView.search) {
      changeQueryArgs.search = newView.search;
    }

    // Add sort parameters if they exist.
    if ((_newView$sort5 = newView.sort) !== null && _newView$sort5 !== void 0 && _newView$sort5.field) {
      changeQueryArgs.orderby = newView.sort.field;
      changeQueryArgs.order = newView.sort.direction;
    }

    // Update URL without page reload using addQueryArgs.
    var newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.addQueryArgs)(window.location.pathname, changeQueryArgs);
    if ((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArgs)(window.location.href).search && !newView.search) {
      newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.removeQueryArgs)(newUrl, 'search');
    }
    setPatternsDisplay(getPatternsForDisplay(newView));
    window.history.pushState({}, '', newUrl);

    // Unset and reset page from changeQueryArgs.
    changeQueryArgs.page = changeQueryArgs.paged;
    setView(_objectSpread(_objectSpread({}, newView), changeQueryArgs));

    // Update the view state.
    //setView( newView );
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (data && data.hasOwnProperty('patterns')) {
      if (data.categories) {
        // Find the index of the pattern-categories field.
        var fieldsIndex = fields.findIndex(function (field) {
          return field.id === 'categories';
        });
        var maybeDuplicateLabel = '';
        fields[fieldsIndex].elements = Object.values(data.categories).map(function (category) {
          var catLabel = category.label;
          if (maybeDuplicateLabel === category.label) {
            catLabel = "".concat(catLabel, " (").concat(category.count + 1, ")");
          }
          maybeDuplicateLabel = category.label;
          return {
            label: catLabel,
            value: category.slug
          };
        });
        var newViewCopy = _objectSpread(_objectSpread({}, view), {}, {
          fields: [].concat(fields)
        });
        // Force view to re-render.
        setCategories(data.categories);
        setView(newViewCopy);

        // Now filter the patterns.
        if (data.patterns && !patternsDisplay.length) {
          setPatterns(data.patterns);
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
  console.log('view', view);
  return /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
    className: "dlx-patterns-view-quick-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add New Pattern', 'pattern-wrangler')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Button, {
    variant: "secondary",
    className: "dlx-patterns-view-quick-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Import Pattern From JSON File', 'pattern-wrangler'))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-search-filters-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].Search, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].FiltersToggle, null)), /*#__PURE__*/React.createElement("div", {
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
  })) === null || _view$filters2 === void 0 ? void 0 : _view$filters2.value) === 'local' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Pattern Status', 'pattern-wrangler'),
    isAdaptiveWidth: true,
    hideLabelFromVision: true,
    value: (view === null || view === void 0 || (_view$filters3 = view.filters) === null || _view$filters3 === void 0 || (_view$filters3 = _view$filters3.find(function (filter) {
      return filter.field === 'patternStatus';
    })) === null || _view$filters3 === void 0 ? void 0 : _view$filters3.value) || 'both',
    onChange: function onChange(value) {
      var _myNewView$filters2;
      var myNewView = _objectSpread({}, view);
      // Merge with existing filters, replacing patternStatus if it exists
      var existingFilters = ((_myNewView$filters2 = myNewView.filters) === null || _myNewView$filters2 === void 0 ? void 0 : _myNewView$filters2.filter(function (filter) {
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
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-layout-pagination-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].ViewConfig, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].LayoutSwitcher, null))), /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-filters-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].Filters, null)), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].Layout, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].BulkActionToolbar, null), /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_15__["default"].Pagination, null)), snackbar.isVisible && /*#__PURE__*/React.createElement(_Snackbar__WEBPACK_IMPORTED_MODULE_14__["default"], {
    isVisible: snackbar.isVisible,
    message: snackbar.message,
    title: snackbar.title,
    type: snackbar.type,
    onClose: function onClose() {
      setSnackbar({
        isVisible: false
      });
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternsGrid);

/***/ }),

/***/ "./src/js/react/views/patterns/components/Snackbar/index.js":
/*!******************************************************************!*\
  !*** ./src/js/react/views/patterns/components/Snackbar/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var DEFAULT_STATE = {
  viewType: 'grid'
};
var actions = {
  setViewType: function setViewType(viewType) {
    return {
      type: 'SET_VIEW_TYPE',
      viewType: viewType
    };
  }
};
var PatternsViewStore = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('dlxplugins/pattern-wrangler/patterns', {
  reducer: function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    switch (action.type) {
      case 'SET_VIEW_TYPE':
        return _objectSpread(_objectSpread({}, state), {}, {
          viewType: action.viewType
        });
      default:
        return state;
    }
  },
  actions: actions,
  selectors: {
    /**
     * Get the view type from the patterns store.
     *
     * @param {Object} state The current state of the patterns store.
     * @return {string} The view type.
     */
    getViewType: function getViewType(state) {
      return state.viewType;
    }
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(PatternsViewStore);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternsViewStore);

/***/ })

}]);
//# sourceMappingURL=src_js_react_views_patterns_components_PatternsGrid_js.js.map?ver=d26a6d2cc1c7ae1b031b