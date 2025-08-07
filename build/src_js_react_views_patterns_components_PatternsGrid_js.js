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
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fancyapps/ui/dist/fancybox/fancybox.umd.js */ "./node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js");
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fancyapps_ui_dist_fancybox_fancybox_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fancyapps/ui/dist/fancybox/fancybox.css */ "./node_modules/@fancyapps/ui/dist/fancybox/fancybox.css");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store */ "./src/js/react/views/patterns/store/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* eslint-disable react/no-unknown-property */














var popPatternPreview = function popPatternPreview(item) {
  var viewportWidth = item.viewportWidth || 1200;
  var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "&viewport_width=").concat(viewportWidth) : '';
  _fancyapps_ui_dist_fancybox_fancybox_umd_js__WEBPACK_IMPORTED_MODULE_2__.Fancybox.show([{
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
var fields = [{
  id: 'title',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Title', 'pattern-wrangler'),
  render: function render(_ref) {
    var item = _ref.item;
    return /*#__PURE__*/React.createElement("span", null, item.title);
  },
  enableSorting: true,
  enableHiding: false,
  enableGlobalSearch: true
}, {
  id: 'pattern-view-json',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Preview', 'pattern-wrangler'),
  getValue: function getValue(_ref2) {
    var item = _ref2.item;
    var viewportWidth = item.viewportWidth || 1200;
    var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "&viewport_width=").concat(viewportWidth) : '';

    // Determine badge type based on pattern properties.
    var badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Local', 'pattern-wrangler');
    var badgeClass = 'pattern-badge-local';
    if (!item.isLocal) {
      badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Registered', 'pattern-wrangler');
      badgeClass = 'pattern-badge-registered';
    } else if ('synced' === item.patternType) {
      badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Synced', 'pattern-wrangler');
      badgeClass = 'pattern-badge-synced';
    } else {
      badgeText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Unsynced', 'pattern-wrangler');
      badgeClass = 'pattern-badge-unsynced';
    }
    var Badge = /*#__PURE__*/React.createElement("span", {
      className: "pattern-badge ".concat(badgeClass)
    }, badgeText);
    return /*#__PURE__*/React.createElement(React.Fragment, null, Badge, /*#__PURE__*/React.createElement("div", {
      className: "pattern-preview-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pattern-preview-iframe-wrapper"
    }, /*#__PURE__*/React.createElement("a", {
      href: previewUrl,
      className: "pattern-preview-iframe-link",
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: function onClick(e) {
        e.preventDefault();
        popPatternPreview(item);
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pattern-preview-iframe-scale-container"
    }, /*#__PURE__*/React.createElement("iframe", {
      key: "preview-".concat(item.id),
      src: previewUrl,
      title: "Preview: ".concat(item.title),
      style: {
        backgroundColor: '#FFF',
        overflow: 'hidden',
        scrolling: 'no',
        marginTop: '32px'
      },
      sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
      loading: "lazy"
    }, "hi there"))))));
  },
  enableSorting: false,
  enableHiding: false
}, {
  id: 'pattern-categories',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Categories', 'pattern-wrangler'),
  render: function render(_ref3) {
    var _item$categories;
    var item = _ref3.item;
    return item === null || item === void 0 || (_item$categories = item.categories) === null || _item$categories === void 0 ? void 0 : _item$categories.map(function (category, index) {
      // If cat is object, get category.name, otherwise just use the category.
      var catName = _typeof(category) === 'object' ? category.name : category;
      // Convert to title case.
      var titleCase = catName.split(' ').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        key: category
      }, titleCase), index < item.categories.length - 1 && ', ');
    });
  },
  enableSorting: false,
  enableHiding: false,
  enableGlobalSearch: true,
  type: 'array'
}, {
  id: 'author',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Author', 'pattern-wrangler'),
  type: 'text',
  getValue: function getValue(_ref4) {
    var item = _ref4.item;
    return item.author;
  },
  enableSorting: false,
  enableHiding: true,
  enableGlobalSearch: false
}, {
  elements: [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('All Patterns', 'pattern-wrangler'),
    value: 'all'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Local Patterns', 'pattern-wrangler'),
    value: 'local'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Registered Patterns', 'pattern-wrangler'),
    value: 'registered'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Unsynced Patterns', 'pattern-wrangler'),
    value: 'unsynced'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Synced Patterns', 'pattern-wrangler'),
    value: 'synced'
  }],
  enableHiding: false,
  enableSorting: false,
  enableGlobalSearch: true,
  filterBy: {
    operators: ['is']
  },
  "default": 'all',
  type: 'dropdown',
  id: 'patternType',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Pattern Type', 'pattern-wrangler')
}];
var actions = [{
  id: 'edit',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Edit', 'pattern-wrangler'),
  icon: 'edit',
  callback: function callback(items) {
    console.log('Edit', items);
  },
  isEligible: function isEligible(pattern) {
    return pattern.isLocal;
  },
  isPrimary: true
}, {
  id: 'delete',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Delete Pattern', 'pattern-wrangler'),
  icon: 'trash',
  isEligible: function isEligible(pattern) {
    // Pattern must be local.
    return pattern.isLocal;
  },
  callback: function callback(items) {
    console.log('Delete', items);
  },
  isPrimary: false,
  isDestructive: true
}, {
  id: 'delete',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Preview Pattern', 'pattern-wrangler'),
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
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Copy to Local Pattern', 'pattern-wrangler'),
  icon: 'edit',
  callback: function callback(items) {
    console.log('Copy to Local', items);
  },
  isEligible: function isEligible(pattern) {
    return !pattern.isLocal;
  },
  isPrimary: false,
  isDestructive: false
}, {
  id: 'disable-preview',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Disable Pattern', 'pattern-wrangler'),
  icon: 'edit',
  callback: function callback(items) {
    console.log('Disable Preview', items);
  },
  isEligible: function isEligible(pattern) {
    return true;
  },
  isPrimary: false,
  isDestructive: true
}, {
  id: 'copy',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Copy Pattern', 'pattern-wrangler'),
  icon: 'edit',
  callback: function callback(items) {
    console.log('Copy', items);
  },
  isEligible: function isEligible(pattern) {
    return true;
  },
  isPrimary: false,
  isDestructive: false
}, {
  id: 'export',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Export', 'pattern-wrangler'),
  icon: 'edit',
  callback: function callback(items) {
    console.log('Export', items);
  },
  isEligible: function isEligible() {
    return true;
  },
  isPrimary: false,
  isDestructive: false
}];

/**
 * Retrieve all the patterns.
 *
 * @return {Promise<Object>} The patterns.
 */
var retrieveAllPatterns = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
            path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.addQueryArgs)('/dlxplugins/pattern-wrangler/v1/patterns/all/', {
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
    return _ref5.apply(this, arguments);
  };
}();
var PatternsGrid = function PatternsGrid(props) {
  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_6__.useAsyncResource)(retrieveAllPatterns, []),
    _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
    defaults = _useAsyncResource2[0],
    getDefaults = _useAsyncResource2[1];
  return /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__["default"], {
    fallback: /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Could not load block patterns.', 'quotes-dlx'), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
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
var queryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArgs)(window.location.href);
var Interface = function Interface(props) {
  var defaults = props.defaults;
  var data = defaults();
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedItems = _useState2[0],
    setSelectedItems = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    patterns = _useState4[0],
    setPatterns = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    patternsDisplay = _useState6[0],
    setPatternsDisplay = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    categories = _useState8[0],
    setCategories = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState10 = _slicedToArray(_useState9, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    loadingFrame = _useState12[0],
    setLoadingFrame = _useState12[1];
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_8__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_9__["default"]),
    setViewType = _useDispatch.setViewType;
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      type: 'grid',
      previewSize: 'large',
      paginationInfo: {
        totalItems: patterns.length,
        totalPages: 0
      },
      page: 1,
      perPage: 10,
      sort: {
        field: 'title',
        direction: 'desc'
      },
      titleField: 'title',
      mediaField: 'pattern-view-json',
      layout: defaultLayouts.grid.layout,
      fields: [].concat(fields)
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    view = _useState14[0],
    setView = _useState14[1];

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
   * Retrieve a list of modified patterns based on query vars and the current view.
   *
   * @param {Object} newView The new view object.
   * @return {Array} The patterns for display.
   */
  var getPatternsForDisplay = function getPatternsForDisplay(newView) {
    var patternsCopy = _toConsumableArray(patterns);
    if (null === patternsCopy || 0 === patternsCopy.length) {
      patternsCopy = _toConsumableArray(data.patterns);
    }

    // Set up order and orderby.
    var orderBy = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArgs)(window.location.href).orderby;
    var order = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArgs)(window.location.href).order;
    if ('title' === orderBy) {
      if ('asc' === order) {
        patternsCopy.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      } else {
        patternsCopy.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
      }
    }

    // Do search.
    var searchField = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.safeDecodeURI)((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArgs)(window.location.href).search);
    if ('undefined' !== searchField && '' !== searchField) {
      console.log('searchField', searchField);
      patternsCopy = patternsCopy.filter(function (pattern) {
        return pattern.title.toLowerCase().includes((newView.search || searchField).toLowerCase());
      });
      var newViewCopy = _objectSpread(_objectSpread({}, view), {}, {
        search: searchField
      });
      setView(newViewCopy);
    }

    // Return the patterns for display with pagination.
    return patternsCopy.slice((view.page - 1) * newView.perPage, view.page * newView.perPage);
  };

  /**
   * When a view is changed, we need to adjust the fields and showMedia based on the view type.
   *
   * @param {Object} newView The new view object.
   */
  var onChangeView = function onChangeView(newView) {
    var _newView$sort;
    // Create query args object with view state.
    var changeQueryArgs = {
      page: parseInt((0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.getQueryArgs)(window.location.href).paged) || 1,
      per_page: newView.perPage,
      view_type: newView.type
    };

    // Now adjust for sort order.
    var patternSortCopy = getPatternsForDisplay(newView);
    setPatternsDisplay(patternSortCopy);
    setView(_objectSpread(_objectSpread({}, newView), {}, {
      paginationInfo: {
        totalItems: patterns.length,
        totalPages: Math.ceil(patterns.length / newView.perPage),
        page: changeQueryArgs.page + 1,
        perPage: changeQueryArgs.per_page
      }
    }));

    // Only add search if it exists.
    if (newView.search) {
      queryArgs.search = newView.search;
    }

    // Add sort parameters if they exist.
    if ((_newView$sort = newView.sort) !== null && _newView$sort !== void 0 && _newView$sort.field) {
      queryArgs.orderby = newView.sort.field;
      queryArgs.order = newView.sort.direction;
    }

    // Update URL without page reload using addQueryArgs.
    var newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_7__.addQueryArgs)(window.location.pathname, queryArgs);
    window.history.pushState({}, '', newUrl);

    // Update the view state.
    //setView( newView );
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (data && data.hasOwnProperty('patterns')) {
      if (data.categories) {
        // Find the index of the pattern-categories field.
        var fieldsIndex = fields.findIndex(function (field) {
          return field.id === 'pattern-categories';
        });
        fields[fieldsIndex].elements = Object.values(data.categories).map(function (category) {
          return {
            label: category.label,
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
  return /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_11__["default"], {
    data: patternsDisplay,
    fields: fields,
    actions: actions,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Patterns', 'pattern-wrangler'),
    view: view,
    onChangeView: onChangeView,
    paginationInfo: {
      totalItems: patterns.length,
      totalPages: Math.ceil(patterns.length / view.perPage)
    },
    perPageSizes: [10, 25, 50],
    selection: selectedItems,
    onChangeSelection: setSelectedItems,
    defaultLayouts: defaultLayouts,
    searchLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Search Patterns', 'pattern-wrangler')
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternsGrid);

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
//# sourceMappingURL=src_js_react_views_patterns_components_PatternsGrid_js.js.map?ver=ee687b8e23ea4d1f787d