/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-bulk-actions/index.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-bulk-actions/index.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulkActionsFooter: () => (/* binding */ BulkActionsFooter),
/* harmony export */   BulkSelectionCheckbox: () => (/* binding */ BulkSelectionCheckbox),
/* harmony export */   useHasAPossibleBulkAction: () => (/* binding */ useHasAPossibleBulkAction),
/* harmony export */   useSomeItemHasAPossibleBulkAction: () => (/* binding */ useSomeItemHasAPossibleBulkAction)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var _dataviews_item_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dataviews-item-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-item-actions/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */



function ActionWithModal({
  action,
  items,
  ActionTriggerComponent
}) {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const actionTriggerProps = {
    action,
    onClick: () => {
      setIsModalOpen(true);
    },
    items
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionTriggerComponent, {
      ...actionTriggerProps
    }), isModalOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_5__.ActionModal, {
      action: action,
      items: items,
      closeModal: () => setIsModalOpen(false)
    })]
  });
}
function useHasAPossibleBulkAction(actions, item) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return actions.some(action => {
      return action.supportsBulk && (!action.isEligible || action.isEligible(item));
    });
  }, [actions, item]);
}
function useSomeItemHasAPossibleBulkAction(actions, data) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return data.some(item => {
      return actions.some(action => {
        return action.supportsBulk && (!action.isEligible || action.isEligible(item));
      });
    });
  }, [actions, data]);
}
function BulkSelectionCheckbox({
  selection,
  onChangeSelection,
  data,
  actions,
  getItemId
}) {
  const selectableItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return data.filter(item => {
      return actions.some(action => action.supportsBulk && (!action.isEligible || action.isEligible(item)));
    });
  }, [data, actions]);
  const selectedItems = data.filter(item => selection.includes(getItemId(item)) && selectableItems.includes(item));
  const areAllSelected = selectedItems.length === selectableItems.length;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
    className: "dataviews-view-table-selection-checkbox",
    __nextHasNoMarginBottom: true,
    checked: areAllSelected,
    indeterminate: !areAllSelected && !!selectedItems.length,
    onChange: () => {
      if (areAllSelected) {
        onChangeSelection([]);
      } else {
        onChangeSelection(selectableItems.map(item => getItemId(item)));
      }
    },
    "aria-label": areAllSelected ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deselect all') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select all')
  });
}
function ActionTrigger({
  action,
  onClick,
  isBusy,
  items
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    disabled: isBusy,
    accessibleWhenDisabled: true,
    label: label,
    icon: action.icon,
    isDestructive: action.isDestructive,
    size: "compact",
    onClick: onClick,
    isBusy: isBusy,
    tooltipPosition: "top"
  });
}
const EMPTY_ARRAY = [];
function ActionButton({
  action,
  selectedItems,
  actionInProgress,
  setActionInProgress
}) {
  const registry = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useRegistry)();
  const selectedEligibleItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return selectedItems.filter(item => {
      return !action.isEligible || action.isEligible(item);
    });
  }, [action, selectedItems]);
  if ('RenderModal' in action) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionWithModal, {
      action: action,
      items: selectedEligibleItems,
      ActionTriggerComponent: ActionTrigger
    }, action.id);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionTrigger, {
    action: action,
    onClick: async () => {
      setActionInProgress(action.id);
      await action.callback(selectedItems, {
        registry
      });
      setActionInProgress(null);
    },
    items: selectedEligibleItems,
    isBusy: actionInProgress === action.id
  }, action.id);
}
function renderFooterContent(data, actions, getItemId, selection, actionsToShow, selectedItems, actionInProgress, setActionInProgress, onChangeSelection) {
  const message = selectedItems.length > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: %d: number of items. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._n)('%d Item selected', '%d Items selected', selectedItems.length), selectedItems.length) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(/* translators: %d: number of items. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._n)('%d Item', '%d Items', data.length), data.length);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    expanded: false,
    className: "dataviews-bulk-actions-footer__container",
    spacing: 3,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BulkSelectionCheckbox, {
      selection: selection,
      onChangeSelection: onChangeSelection,
      data: data,
      actions: actions,
      getItemId: getItemId
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
      className: "dataviews-bulk-actions-footer__item-count",
      children: message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
      className: "dataviews-bulk-actions-footer__action-buttons",
      expanded: false,
      spacing: 1,
      children: [actionsToShow.map(action => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionButton, {
          action: action,
          selectedItems: selectedItems,
          actionInProgress: actionInProgress,
          setActionInProgress: setActionInProgress
        }, action.id);
      }), selectedItems.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
        showTooltip: true,
        tooltipPosition: "top",
        size: "compact",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel'),
        disabled: !!actionInProgress,
        accessibleWhenDisabled: false,
        onClick: () => {
          onChangeSelection(EMPTY_ARRAY);
        }
      })]
    })]
  });
}
function FooterContent({
  selection,
  actions,
  onChangeSelection,
  data,
  getItemId
}) {
  const [actionInProgress, setActionInProgress] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const footerContentRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const bulkActions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => actions.filter(action => action.supportsBulk), [actions]);
  const selectableItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return data.filter(item => {
      return bulkActions.some(action => !action.isEligible || action.isEligible(item));
    });
  }, [data, bulkActions]);
  const selectedItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return data.filter(item => selection.includes(getItemId(item)) && selectableItems.includes(item));
  }, [selection, data, getItemId, selectableItems]);
  const actionsToShow = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => actions.filter(action => {
    return action.supportsBulk && action.icon && selectedItems.some(item => !action.isEligible || action.isEligible(item));
  }), [actions, selectedItems]);
  if (!actionInProgress) {
    if (footerContentRef.current) {
      footerContentRef.current = null;
    }
    return renderFooterContent(data, actions, getItemId, selection, actionsToShow, selectedItems, actionInProgress, setActionInProgress, onChangeSelection);
  } else if (!footerContentRef.current) {
    footerContentRef.current = renderFooterContent(data, actions, getItemId, selection, actionsToShow, selectedItems, actionInProgress, setActionInProgress, onChangeSelection);
  }
  return footerContentRef.current;
}
function BulkActionsFooter() {
  const {
    data,
    selection,
    actions = EMPTY_ARRAY,
    onChangeSelection,
    getItemId
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_7__["default"]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(FooterContent, {
    selection: selection,
    onChangeSelection: onChangeSelection,
    data: data,
    actions: actions,
    getItemId: getItemId
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


const DataViewsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  view: {
    type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_TABLE
  },
  onChangeView: () => {},
  fields: [],
  data: [],
  paginationInfo: {
    totalItems: 0,
    totalPages: 0
  },
  selection: [],
  onChangeSelection: () => {},
  setOpenedFilter: () => {},
  openedFilter: null,
  getItemId: item => item.id,
  isItemClickable: () => true,
  containerWidth: 0
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataViewsContext);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/add-filter.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/add-filter.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddFilterMenu: () => (/* binding */ AddFilterMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


const {
  Menu
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_4__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.privateApis);
function AddFilterMenu({
  filters,
  view,
  onChangeView,
  setOpenedFilter,
  triggerProps
}) {
  const inactiveFilters = filters.filter(filter => !filter.isVisible);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Menu, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.TriggerButton, {
      ...triggerProps
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Popover, {
      children: inactiveFilters.map(filter => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Item, {
          onClick: () => {
            setOpenedFilter(filter.field);
            onChangeView({
              ...view,
              page: 1,
              filters: [...(view.filters || []), {
                field: filter.field,
                value: undefined,
                operator: filter.operators[0]
              }]
            });
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.ItemLabel, {
            children: filter.name
          })
        }, filter.field);
      })
    })]
  });
}
function AddFilter({
  filters,
  view,
  onChangeView,
  setOpenedFilter
}, ref) {
  if (!filters.length || filters.every(({
    isPrimary
  }) => isPrimary)) {
    return null;
  }
  const inactiveFilters = filters.filter(filter => !filter.isVisible);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(AddFilterMenu, {
    triggerProps: {
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        accessibleWhenDisabled: true,
        size: "compact",
        className: "dataviews-filters-button",
        variant: "tertiary",
        disabled: !inactiveFilters.length,
        ref: ref
      }),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add filter')
    },
    filters,
    view,
    onChangeView,
    setOpenedFilter
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(AddFilter));
//# sourceMappingURL=add-filter.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/filter-summary.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/filter-summary.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterSummary)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _search_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search-widget */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/search-widget.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




const ENTER = 'Enter';
const SPACE = ' ';

/**
 * Internal dependencies
 */



const FilterText = ({
  activeElements,
  filterInView,
  filter
}) => {
  if (activeElements === undefined || activeElements.length === 0) {
    return filter.name;
  }
  const filterTextWrappers = {
    Name: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
      className: "dataviews-filters__summary-filter-text-name"
    }),
    Value: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
      className: "dataviews-filters__summary-filter-text-value"
    })
  };
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_ANY) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. 3: Filter value. e.g.: "Author is any: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<Name>%1$s is any: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NONE) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. 3: Filter value. e.g.: "Author is none: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<Name>%1$s is none: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_ALL) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. 3: Filter value. e.g.: "Author is all: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<Name>%1$s is all: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NOT_ALL) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. 3: Filter value. e.g.: "Author is not all: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<Name>%1$s is not all: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. 3: Filter value. e.g.: "Author is: Admin". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<Name>%1$s is: </Name><Value>%2$s</Value>'), filter.name, activeElements[0].label), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NOT) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. 3: Filter value. e.g.: "Author is not: Admin". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<Name>%1$s is not: </Name><Value>%2$s</Value>'), filter.name, activeElements[0].label), filterTextWrappers);
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name e.g.: "Unknown status for Author". */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown status for %1$s'), filter.name);
};
function OperatorSelector({
  filter,
  view,
  onChangeView
}) {
  const operatorOptions = filter.operators?.map(operator => ({
    value: operator,
    label: _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATORS[operator]?.label
  }));
  const currentFilter = view.filters?.find(_filter => _filter.field === filter.field);
  const value = currentFilter?.operator || filter.operators[0];
  return operatorOptions.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 2,
    justify: "flex-start",
    className: "dataviews-filters__summary-operators-container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
      className: "dataviews-filters__summary-operators-filter-name",
      children: filter.name
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conditions'),
      value: value,
      options: operatorOptions,
      onChange: newValue => {
        var _view$filters, _view$filters2;
        const operator = newValue;
        const newFilters = currentFilter ? [...((_view$filters = view.filters) !== null && _view$filters !== void 0 ? _view$filters : []).map(_filter => {
          if (_filter.field === filter.field) {
            return {
              ..._filter,
              operator
            };
          }
          return _filter;
        })] : [...((_view$filters2 = view.filters) !== null && _view$filters2 !== void 0 ? _view$filters2 : []), {
          field: filter.field,
          operator,
          value: undefined
        }];
        onChangeView({
          ...view,
          page: 1,
          filters: newFilters
        });
      },
      size: "small",
      __nextHasNoMarginBottom: true,
      hideLabelFromVision: true
    })]
  });
}
function FilterSummary({
  addFilterRef,
  openedFilter,
  ...commonProps
}) {
  const toggleRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const {
    filter,
    view,
    onChangeView
  } = commonProps;
  const filterInView = view.filters?.find(f => f.field === filter.field);
  const activeElements = filter.elements.filter(element => {
    if (filter.singleSelection) {
      return element.value === filterInView?.value;
    }
    return filterInView?.value?.includes(element.value);
  });
  const isPrimary = filter.isPrimary;
  const hasValues = filterInView?.value !== undefined;
  const canResetOrRemove = !isPrimary || hasValues;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    defaultOpen: openedFilter === filter.field,
    contentClassName: "dataviews-filters__summary-popover",
    popoverProps: {
      placement: 'bottom-start',
      role: 'dialog'
    },
    onClose: () => {
      toggleRef.current?.focus();
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "dataviews-filters__summary-chip-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: Filter name. */
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter by: %1$s'), filter.name.toLowerCase()),
        placement: "top",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])('dataviews-filters__summary-chip', {
            'has-reset': canResetOrRemove,
            'has-values': hasValues
          }),
          role: "button",
          tabIndex: 0,
          onClick: onToggle,
          onKeyDown: event => {
            if ([ENTER, SPACE].includes(event.key)) {
              onToggle();
              event.preventDefault();
            }
          },
          "aria-pressed": isOpen,
          "aria-expanded": isOpen,
          ref: toggleRef,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(FilterText, {
            activeElements: activeElements,
            filterInView: filterInView,
            filter: filter
          })
        })
      }), canResetOrRemove && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
        text: isPrimary ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove'),
        placement: "top",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
          className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])('dataviews-filters__summary-chip-remove', {
            'has-values': hasValues
          }),
          onClick: () => {
            onChangeView({
              ...view,
              page: 1,
              filters: view.filters?.filter(_filter => _filter.field !== filter.field)
            });
            // If the filter is not primary and can be removed, it will be added
            // back to the available filters from `Add filter` component.
            if (!isPrimary) {
              addFilterRef.current?.focus();
            } else {
              // If is primary, focus the toggle button.
              toggleRef.current?.focus();
            }
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
          })
        })
      })]
    }),
    renderContent: () => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
        spacing: 0,
        justify: "flex-start",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(OperatorSelector, {
          ...commonProps
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_search_widget__WEBPACK_IMPORTED_MODULE_7__["default"], {
          ...commonProps
        })]
      });
    }
  });
}
//# sourceMappingURL=filter-summary.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FiltersToggle: () => (/* binding */ FiltersToggle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useFilters: () => (/* binding */ useFilters)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/funnel.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _filter_summary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./filter-summary */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/filter-summary.js");
/* harmony import */ var _add_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-filter */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/add-filter.js");
/* harmony import */ var _reset_filters__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./reset-filters */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/reset-filters.js");
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils */ "./node_modules/@wordpress/dataviews/build-module/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */







function useFilters(fields, view) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const filters = [];
    fields.forEach(field => {
      if (!field.elements?.length) {
        return;
      }
      const operators = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.sanitizeOperators)(field);
      if (operators.length === 0) {
        return;
      }
      const isPrimary = !!field.filterBy?.isPrimary;
      filters.push({
        field: field.id,
        name: field.label,
        elements: field.elements,
        singleSelection: operators.some(op => [_constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS, _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NOT].includes(op)),
        operators,
        isVisible: isPrimary || !!view.filters?.some(f => f.field === field.id && _constants__WEBPACK_IMPORTED_MODULE_5__.ALL_OPERATORS.includes(f.operator)),
        isPrimary
      });
    });
    // Sort filters by primary property. We need the primary filters to be first.
    // Then we sort by name.
    filters.sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) {
        return -1;
      }
      if (!a.isPrimary && b.isPrimary) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    return filters;
  }, [fields, view]);
}
function FiltersToggle({
  filters,
  view,
  onChangeView,
  setOpenedFilter,
  isShowingFilter,
  setIsShowingFilter
}) {
  const buttonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const onChangeViewWithFilterVisibility = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_view => {
    onChangeView(_view);
    setIsShowingFilter(true);
  }, [onChangeView, setIsShowingFilter]);
  const visibleFilters = filters.filter(filter => filter.isVisible);
  const hasVisibleFilters = !!visibleFilters.length;
  if (filters.length === 0) {
    return null;
  }
  const addFilterButtonProps = {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add filter'),
    'aria-expanded': false,
    isPressed: false
  };
  const toggleFiltersButtonProps = {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('Filter', 'verb'),
    'aria-expanded': isShowingFilter,
    isPressed: isShowingFilter,
    onClick: () => {
      if (!isShowingFilter) {
        setOpenedFilter(null);
      }
      setIsShowingFilter(!isShowingFilter);
    }
  };
  const buttonComponent = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    ref: buttonRef,
    className: "dataviews-filters__visibility-toggle",
    size: "compact",
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
    ...(hasVisibleFilters ? toggleFiltersButtonProps : addFilterButtonProps)
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "dataviews-filters__container-visibility-toggle",
    children: !hasVisibleFilters ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_add_filter__WEBPACK_IMPORTED_MODULE_7__.AddFilterMenu, {
      filters: filters,
      view: view,
      onChangeView: onChangeViewWithFilterVisibility,
      setOpenedFilter: setOpenedFilter,
      triggerProps: {
        render: buttonComponent
      }
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(FilterVisibilityToggle, {
      buttonRef: buttonRef,
      filtersCount: view.filters?.length,
      children: buttonComponent
    })
  });
}
function FilterVisibilityToggle({
  buttonRef,
  filtersCount,
  children
}) {
  // Focus the `add filter` button when unmounts.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => {
    buttonRef.current?.focus();
  }, [buttonRef]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [children, !!filtersCount && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "dataviews-filters-toggle__count",
      children: filtersCount
    })]
  });
}
function Filters() {
  const {
    fields,
    view,
    onChangeView,
    openedFilter,
    setOpenedFilter
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const addFilterRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const filters = useFilters(fields, view);
  const addFilter = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_add_filter__WEBPACK_IMPORTED_MODULE_7__["default"], {
    filters: filters,
    view: view,
    onChangeView: onChangeView,
    ref: addFilterRef,
    setOpenedFilter: setOpenedFilter
  }, "add-filter");
  const visibleFilters = filters.filter(filter => filter.isVisible);
  if (visibleFilters.length === 0) {
    return null;
  }
  const filterComponents = [...visibleFilters.map(filter => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_filter_summary__WEBPACK_IMPORTED_MODULE_9__["default"], {
      filter: filter,
      view: view,
      onChangeView: onChangeView,
      addFilterRef: addFilterRef,
      openedFilter: openedFilter
    }, filter.field);
  }), addFilter];
  filterComponents.push(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_reset_filters__WEBPACK_IMPORTED_MODULE_10__["default"], {
    filters: filters,
    view: view,
    onChangeView: onChangeView
  }, "reset-filters"));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    justify: "flex-start",
    style: {
      width: 'fit-content'
    },
    className: "dataviews-filters__container",
    wrap: true,
    children: filterComponents
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(Filters));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/reset-filters.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/reset-filters.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function ResetFilter({
  filters,
  view,
  onChangeView
}) {
  const isPrimary = field => filters.some(_filter => _filter.field === field && _filter.isPrimary);
  const isDisabled = !view.search && !view.filters?.some(_filter => _filter.value !== undefined || !isPrimary(_filter.field));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    disabled: isDisabled,
    accessibleWhenDisabled: true,
    size: "compact",
    variant: "tertiary",
    className: "dataviews-filters__reset-button",
    onClick: () => {
      onChangeView({
        ...view,
        page: 1,
        search: '',
        filters: []
      });
    },
    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset')
  });
}
//# sourceMappingURL=reset-filters.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/search-widget.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/search-widget.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchWidget)
/* harmony export */ });
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-provider.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-label.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/__chunks/HUWAI7RB.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/__chunks/ZTDSJLD6.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-item-value.js");
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! remove-accents */ "./node_modules/remove-accents/index.js");
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(remove_accents__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/search.js");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports



/**
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */

const radioCheck = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.Circle, {
    cx: 12,
    cy: 12,
    r: 3
  })
});
function normalizeSearchInput(input = '') {
  return remove_accents__WEBPACK_IMPORTED_MODULE_0___default()(input.trim().toLowerCase());
}
const EMPTY_ARRAY = [];
const getCurrentValue = (filterDefinition, currentFilter) => {
  if (filterDefinition.singleSelection) {
    return currentFilter?.value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value;
  }
  if (!Array.isArray(currentFilter?.value) && !!currentFilter?.value) {
    return [currentFilter.value];
  }
  return EMPTY_ARRAY;
};
const getNewValue = (filterDefinition, currentFilter, value) => {
  if (filterDefinition.singleSelection) {
    return value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value.includes(value) ? currentFilter.value.filter(v => v !== value) : [...currentFilter.value, value];
  }
  return [value];
};
function generateFilterElementCompositeItemId(prefix, filterElementValue) {
  return `${prefix}-${filterElementValue}`;
}
function ListBox({
  view,
  filter,
  onChangeView
}) {
  const baseId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(ListBox, 'dataviews-filter-list-box');
  const [activeCompositeId, setActiveCompositeId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(
  // When there are one or less operators, the first item is set as active
  // (by setting the initial `activeId` to `undefined`).
  // With 2 or more operators, the focus is moved on the operators control
  // (by setting the initial `activeId` to `null`), meaning that there won't
  // be an active item initially. Focus is then managed via the
  // `onFocusVisible` callback.
  filter.operators?.length === 1 ? undefined : null);
  const currentFilter = view.filters?.find(f => f.field === filter.field);
  const currentValue = getCurrentValue(filter, currentFilter);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Composite, {
    virtualFocus: true,
    focusLoop: true,
    activeId: activeCompositeId,
    setActiveId: setActiveCompositeId,
    role: "listbox",
    className: "dataviews-filters__search-widget-listbox",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: List of items for a filter. 1: Filter name. e.g.: "List of: Author". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('List of: %1$s'), filter.name),
    onFocusVisible: () => {
      // `onFocusVisible` needs the `Composite` component to be focusable,
      // which is implicitly achieved via the `virtualFocus` prop.
      if (!activeCompositeId && filter.elements.length) {
        setActiveCompositeId(generateFilterElementCompositeItemId(baseId, filter.elements[0].value));
      }
    },
    render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Composite.Typeahead, {}),
    children: filter.elements.map(element => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Composite.Hover, {
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Composite.Item, {
        id: generateFilterElementCompositeItemId(baseId, element.value),
        render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          "aria-label": element.label,
          role: "option",
          className: "dataviews-filters__search-widget-listitem"
        }),
        onClick: () => {
          var _view$filters, _view$filters2;
          const newFilters = currentFilter ? [...((_view$filters = view.filters) !== null && _view$filters !== void 0 ? _view$filters : []).map(_filter => {
            if (_filter.field === filter.field) {
              return {
                ..._filter,
                operator: currentFilter.operator || filter.operators[0],
                value: getNewValue(filter, currentFilter, element.value)
              };
            }
            return _filter;
          })] : [...((_view$filters2 = view.filters) !== null && _view$filters2 !== void 0 ? _view$filters2 : []), {
            field: filter.field,
            operator: filter.operators[0],
            value: getNewValue(filter, currentFilter, element.value)
          }];
          onChangeView({
            ...view,
            page: 1,
            filters: newFilters
          });
        }
      }),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
        className: "dataviews-filters__search-widget-listitem-check",
        children: [filter.singleSelection && currentValue === element.value && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
          icon: radioCheck
        }), !filter.singleSelection && currentValue.includes(element.value) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        children: element.label
      })]
    }, element.value))
  });
}
function ComboboxList({
  view,
  filter,
  onChangeView
}) {
  const [searchValue, setSearchValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const deferredSearchValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useDeferredValue)(searchValue);
  const currentFilter = view.filters?.find(_filter => _filter.field === filter.field);
  const currentValue = getCurrentValue(filter, currentFilter);
  const matches = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const normalizedSearch = normalizeSearchInput(deferredSearchValue);
    return filter.elements.filter(item => normalizeSearchInput(item.label).includes(normalizedSearch));
  }, [filter.elements, deferredSearchValue]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_ariakit_react__WEBPACK_IMPORTED_MODULE_8__.ComboboxProvider, {
    selectedValue: currentValue,
    setSelectedValue: value => {
      var _view$filters3, _view$filters4;
      const newFilters = currentFilter ? [...((_view$filters3 = view.filters) !== null && _view$filters3 !== void 0 ? _view$filters3 : []).map(_filter => {
        if (_filter.field === filter.field) {
          return {
            ..._filter,
            operator: currentFilter.operator || filter.operators[0],
            value
          };
        }
        return _filter;
      })] : [...((_view$filters4 = view.filters) !== null && _view$filters4 !== void 0 ? _view$filters4 : []), {
        field: filter.field,
        operator: filter.operators[0],
        value
      }];
      onChangeView({
        ...view,
        page: 1,
        filters: newFilters
      });
    },
    setValue: setSearchValue,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "dataviews-filters__search-widget-filter-combobox__wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ariakit_react__WEBPACK_IMPORTED_MODULE_9__.ComboboxLabel, {
        render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.VisuallyHidden, {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search items')
        }),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search items')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ariakit_react__WEBPACK_IMPORTED_MODULE_10__.Combobox, {
        autoSelect: "always",
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search'),
        className: "dataviews-filters__search-widget-filter-combobox__input"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "dataviews-filters__search-widget-filter-combobox__icon",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_ariakit_react__WEBPACK_IMPORTED_MODULE_12__.ComboboxList, {
      className: "dataviews-filters__search-widget-filter-combobox-list",
      alwaysVisible: true,
      children: [matches.map(element => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_ariakit_react__WEBPACK_IMPORTED_MODULE_13__.ComboboxItem, {
          resetValueOnSelect: false,
          value: element.value,
          className: "dataviews-filters__search-widget-listitem",
          hideOnClick: false,
          setValueOnClick: false,
          focusOnHover: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
            className: "dataviews-filters__search-widget-listitem-check",
            children: [filter.singleSelection && currentValue === element.value && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
              icon: radioCheck
            }), !filter.singleSelection && currentValue.includes(element.value) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ariakit_react__WEBPACK_IMPORTED_MODULE_14__.ComboboxItemValue, {
              className: "dataviews-filters__search-widget-filter-combobox-item-value",
              value: element.label
            }), !!element.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "dataviews-filters__search-widget-listitem-description",
              children: element.description
            })]
          })]
        }, element.value);
      }), !matches.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No results found')
      })]
    })]
  });
}
function SearchWidget(props) {
  const Widget = props.filter.elements.length > 10 ? ComboboxList : ListBox;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Widget, {
    ...props
  });
}
//# sourceMappingURL=search-widget.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-footer/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-footer/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataViewsFooter)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var _dataviews_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dataviews-pagination */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-pagination/index.js");
/* harmony import */ var _dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dataviews-bulk-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-bulk-actions/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */





const EMPTY_ARRAY = [];
function DataViewsFooter() {
  const {
    view,
    paginationInfo: {
      totalItems = 0,
      totalPages
    },
    data,
    actions = EMPTY_ARRAY
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_3__["default"]);
  const hasBulkActions = (0,_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_4__.useSomeItemHasAPossibleBulkAction)(actions, data) && [_constants__WEBPACK_IMPORTED_MODULE_5__.LAYOUT_TABLE, _constants__WEBPACK_IMPORTED_MODULE_5__.LAYOUT_GRID].includes(view.type);
  if (!totalItems || !totalPages || totalPages <= 1 && !hasBulkActions) {
    return null;
  }
  return !!totalItems && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    expanded: false,
    justify: "end",
    className: "dataviews-footer",
    children: [hasBulkActions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_4__.BulkActionsFooter, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_dataviews_pagination__WEBPACK_IMPORTED_MODULE_6__["default"], {})]
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-item-actions/index.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-item-actions/index.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionModal: () => (/* binding */ ActionModal),
/* harmony export */   ActionsMenuGroup: () => (/* binding */ ActionsMenuGroup),
/* harmony export */   "default": () => (/* binding */ ItemActions)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/more-vertical.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */


const {
  Menu,
  kebabCase
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_5__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.privateApis);
function ButtonTrigger({
  action,
  onClick,
  items
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    label: label,
    icon: action.icon,
    disabled: !!action.disabled,
    accessibleWhenDisabled: true,
    isDestructive: action.isDestructive,
    size: "compact",
    onClick: onClick
  });
}
function MenuItemTrigger({
  action,
  onClick,
  items
}) {
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Menu.Item, {
    disabled: action.disabled,
    onClick: onClick,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Menu.ItemLabel, {
      children: label
    })
  });
}
function ActionModal({
  action,
  items,
  closeModal
}) {
  var _action$modalFocusOnM;
  const label = typeof action.label === 'string' ? action.label : action.label(items);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    title: action.modalHeader || label,
    __experimentalHideHeader: !!action.hideModalHeader,
    onRequestClose: closeModal,
    focusOnMount: (_action$modalFocusOnM = action.modalFocusOnMount) !== null && _action$modalFocusOnM !== void 0 ? _action$modalFocusOnM : true,
    size: action.modalSize || 'medium',
    overlayClassName: `dataviews-action-modal dataviews-action-modal__${kebabCase(action.id)}`,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(action.RenderModal, {
      items: items,
      closeModal: closeModal
    })
  });
}
function ActionsMenuGroup({
  actions,
  item,
  registry,
  setActiveModalAction
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Menu.Group, {
    children: actions.map(action => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(MenuItemTrigger, {
      action: action,
      onClick: () => {
        if ('RenderModal' in action) {
          setActiveModalAction(action);
          return;
        }
        action.callback([item], {
          registry
        });
      },
      items: [item]
    }, action.id))
  });
}
function ItemActions({
  item,
  actions,
  isCompact
}) {
  const registry = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useRegistry)();
  const {
    primaryActions,
    eligibleActions
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    // If an action is eligible for all items, doesn't need
    // to provide the `isEligible` function.
    const _eligibleActions = actions.filter(action => !action.isEligible || action.isEligible(item));
    const _primaryActions = _eligibleActions.filter(action => action.isPrimary && !!action.icon);
    return {
      primaryActions: _primaryActions,
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  if (isCompact) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(CompactItemActions, {
      item: item,
      actions: eligibleActions,
      isSmall: true,
      registry: registry
    });
  }

  // If all actions are primary, there is no need to render the dropdown.
  if (primaryActions.length === eligibleActions.length) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PrimaryActions, {
      item: item,
      actions: primaryActions,
      registry: registry
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    spacing: 1,
    justify: "flex-end",
    className: "dataviews-item-actions",
    style: {
      flexShrink: '0',
      width: 'auto'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PrimaryActions, {
      item: item,
      actions: primaryActions,
      registry: registry
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(CompactItemActions, {
      item: item,
      actions: eligibleActions,
      registry: registry
    })]
  });
}
function CompactItemActions({
  item,
  actions,
  isSmall,
  registry
}) {
  const [activeModalAction, setActiveModalAction] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(Menu, {
      placement: "bottom-end",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Menu.TriggerButton, {
        render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          size: isSmall ? 'small' : 'compact',
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Actions'),
          accessibleWhenDisabled: true,
          disabled: !actions.length,
          className: "dataviews-all-actions-button"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Menu.Popover, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionsMenuGroup, {
          actions: actions,
          item: item,
          registry: registry,
          setActiveModalAction: setActiveModalAction
        })
      })]
    }), !!activeModalAction && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionModal, {
      action: activeModalAction,
      items: [item],
      closeModal: () => setActiveModalAction(null)
    })]
  });
}
function PrimaryActions({
  item,
  actions,
  registry
}) {
  const [activeModalAction, setActiveModalAction] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  if (!Array.isArray(actions) || actions.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [actions.map(action => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ButtonTrigger, {
      action: action,
      onClick: () => {
        if ('RenderModal' in action) {
          setActiveModalAction(action);
          return;
        }
        action.callback([item], {
          registry
        });
      },
      items: [item]
    }, action.id)), !!activeModalAction && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActionModal, {
      action: activeModalAction,
      items: [item],
      closeModal: () => setActiveModalAction(null)
    })]
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-layout/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-layout/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataViewsLayout)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var _dataviews_layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dataviews-layouts */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



function DataViewsLayout() {
  const {
    actions = [],
    data,
    fields,
    getItemId,
    getItemLevel,
    isLoading,
    view,
    onChangeView,
    selection,
    onChangeSelection,
    setOpenedFilter,
    onClickItem,
    isItemClickable
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_2__["default"]);
  const ViewComponent = _dataviews_layouts__WEBPACK_IMPORTED_MODULE_3__.VIEW_LAYOUTS.find(v => v.type === view.type)?.component;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ViewComponent, {
    actions: actions,
    data: data,
    fields: fields,
    getItemId: getItemId,
    getItemLevel: getItemLevel,
    isLoading: isLoading,
    onChangeView: onChangeView,
    onChangeSelection: onChangeSelection,
    selection: selection,
    setOpenedFilter: setOpenedFilter,
    onClickItem: onClickItem,
    isItemClickable: isItemClickable,
    view: view
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-pagination/index.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-pagination/index.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/next.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/previous.js");
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */


function DataViewsPagination() {
  var _view$page;
  const {
    view,
    onChangeView,
    paginationInfo: {
      totalItems = 0,
      totalPages
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_4__["default"]);
  if (!totalItems || !totalPages) {
    return null;
  }
  const currentPage = (_view$page = view.page) !== null && _view$page !== void 0 ? _view$page : 1;
  const pageSelectOptions = Array.from(Array(totalPages)).map((_, i) => {
    const page = i + 1;
    return {
      value: page.toString(),
      label: page.toString(),
      'aria-label': currentPage === page ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
      // translators: Current page number in total number of pages
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page %1$s of %2$s'), currentPage, totalPages) : page.toString()
    };
  });
  return !!totalItems && totalPages !== 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    expanded: false,
    className: "dataviews-pagination",
    justify: "end",
    spacing: 6,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
      justify: "flex-start",
      expanded: false,
      spacing: 1,
      className: "dataviews-pagination__page-select",
      children: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
      // translators: 1: Current page number, 2: Total number of pages.
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('<div>Page</div>%1$s<div>of %2$s</div>', 'paging'), '<CurrentPage />', totalPages), {
        div: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          "aria-hidden": true
        }),
        CurrentPage: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Current page'),
          value: currentPage.toString(),
          options: pageSelectOptions,
          onChange: newValue => {
            onChangeView({
              ...view,
              page: +newValue
            });
          },
          size: "small",
          __nextHasNoMarginBottom: true,
          variant: "minimal"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
      expanded: false,
      spacing: 1,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        onClick: () => onChangeView({
          ...view,
          page: currentPage - 1
        }),
        disabled: currentPage === 1,
        accessibleWhenDisabled: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous page'),
        icon: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.isRTL)() ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
        showTooltip: true,
        size: "compact",
        tooltipPosition: "top"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        onClick: () => onChangeView({
          ...view,
          page: currentPage + 1
        }),
        disabled: currentPage >= totalPages,
        accessibleWhenDisabled: true,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next page'),
        icon: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.isRTL)() ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
        showTooltip: true,
        size: "compact",
        tooltipPosition: "top"
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(DataViewsPagination));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-search/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-search/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */


const DataViewsSearch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(function Search({
  label
}) {
  const {
    view,
    onChangeView
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_5__["default"]);
  const [search, setSearch, debouncedSearch] = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useDebouncedInput)(view.search);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _view$search;
    setSearch((_view$search = view.search) !== null && _view$search !== void 0 ? _view$search : '');
  }, [view.search, setSearch]);
  const onChangeViewRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(onChangeView);
  const viewRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(view);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    onChangeViewRef.current = onChangeView;
    viewRef.current = view;
  }, [onChangeView, view]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (debouncedSearch !== viewRef.current?.search) {
      onChangeViewRef.current({
        ...viewRef.current,
        page: 1,
        search: debouncedSearch
      });
    }
  }, [debouncedSearch]);
  const searchLabel = label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SearchControl, {
    className: "dataviews-search",
    __nextHasNoMarginBottom: true,
    onChange: setSearch,
    value: search,
    label: searchLabel,
    placeholder: searchLabel,
    size: "compact"
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataViewsSearch);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-selection-checkbox/index.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-selection-checkbox/index.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataViewsSelectionCheckbox)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function DataViewsSelectionCheckbox({
  selection,
  onChangeSelection,
  item,
  getItemId,
  titleField,
  disabled
}) {
  const id = getItemId(item);
  const checked = !disabled && selection.includes(id);

  // Fallback label to ensure accessibility
  const selectionLabel = titleField?.getValue?.({
    item
  }) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('(no title)');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
    className: "dataviews-selection-checkbox",
    __nextHasNoMarginBottom: true,
    "aria-label": selectionLabel,
    "aria-disabled": disabled,
    checked: checked,
    onChange: () => {
      if (disabled) {
        return;
      }
      onChangeSelection(selection.includes(id) ? selection.filter(itemId => id !== itemId) : [...selection, id]);
    }
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-view-config/index.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews-view-config/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/more-vertical.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/lock.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/chevron-up.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/chevron-down.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/unseen.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/seen.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/cog.js");
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/warning */ "@wordpress/warning");
/* harmony import */ var _wordpress_warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_warning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _dataviews_layouts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../dataviews-layouts */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/index.js");
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * External dependencies
 */



/**
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */





const {
  Menu
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_7__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
const DATAVIEWS_CONFIG_POPOVER_PROPS = {
  className: 'dataviews-config__popover',
  placement: 'bottom-end',
  offset: 9
};
function ViewTypeMenu({
  defaultLayouts = {
    list: {},
    grid: {},
    table: {}
  }
}) {
  const {
    view,
    onChangeView
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const availableLayouts = Object.keys(defaultLayouts);
  if (availableLayouts.length <= 1) {
    return null;
  }
  const activeView = _dataviews_layouts__WEBPACK_IMPORTED_MODULE_9__.VIEW_LAYOUTS.find(v => view.type === v.type);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(Menu, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.TriggerButton, {
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        size: "compact",
        icon: activeView?.icon,
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Layout')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.Popover, {
      children: availableLayouts.map(layout => {
        const config = _dataviews_layouts__WEBPACK_IMPORTED_MODULE_9__.VIEW_LAYOUTS.find(v => v.type === layout);
        if (!config) {
          return null;
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.RadioItem, {
          value: layout,
          name: "view-actions-available-view",
          checked: layout === view.type,
          hideOnClick: true,
          onChange: e => {
            switch (e.target.value) {
              case 'list':
              case 'grid':
              case 'table':
                const viewWithoutLayout = {
                  ...view
                };
                if ('layout' in viewWithoutLayout) {
                  delete viewWithoutLayout.layout;
                }
                // @ts-expect-error
                return onChangeView({
                  ...viewWithoutLayout,
                  type: e.target.value,
                  ...defaultLayouts[e.target.value]
                });
            }
             true ? _wordpress_warning__WEBPACK_IMPORTED_MODULE_4___default()('Invalid dataview') : 0;
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.ItemLabel, {
            children: config.label
          })
        }, layout);
      })
    })]
  });
}
function SortFieldControl() {
  const {
    view,
    fields,
    onChangeView
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const orderOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const sortableFields = fields.filter(field => field.enableSorting !== false);
    return sortableFields.map(field => {
      return {
        label: field.label,
        value: field.id
      };
    });
  }, [fields]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sort by'),
    value: view.sort?.field,
    options: orderOptions,
    onChange: value => {
      onChangeView({
        ...view,
        sort: {
          direction: view?.sort?.direction || 'desc',
          field: value
        },
        showLevels: false
      });
    }
  });
}
function SortDirectionControl() {
  const {
    view,
    fields,
    onChangeView
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const sortableFields = fields.filter(field => field.enableSorting !== false);
  if (sortableFields.length === 0) {
    return null;
  }
  let value = view.sort?.direction;
  if (!value && view.sort?.field) {
    value = 'desc';
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControl, {
    className: "dataviews-view-config__sort-direction",
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    isBlock: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Order'),
    value: value,
    onChange: newDirection => {
      if (newDirection === 'asc' || newDirection === 'desc') {
        onChangeView({
          ...view,
          sort: {
            direction: newDirection,
            field: view.sort?.field ||
            // If there is no field assigned as the sorting field assign the first sortable field.
            fields.find(field => field.enableSorting !== false)?.id || ''
          },
          showLevels: false
        });
        return;
      }
       true ? _wordpress_warning__WEBPACK_IMPORTED_MODULE_4___default()('Invalid direction') : 0;
    },
    children: _constants__WEBPACK_IMPORTED_MODULE_10__.SORTING_DIRECTIONS.map(direction => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOptionIcon, {
        value: direction,
        icon: _constants__WEBPACK_IMPORTED_MODULE_10__.sortIcons[direction],
        label: _constants__WEBPACK_IMPORTED_MODULE_10__.sortLabels[direction]
      }, direction);
    })
  });
}
const PAGE_SIZE_VALUES = [10, 20, 50, 100];
function ItemsPerPageControl() {
  const {
    view,
    onChangeView
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    isBlock: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Items per page'),
    value: view.perPage || 10,
    disabled: !view?.sort?.field,
    onChange: newItemsPerPage => {
      const newItemsPerPageNumber = typeof newItemsPerPage === 'number' || newItemsPerPage === undefined ? newItemsPerPage : parseInt(newItemsPerPage, 10);
      onChangeView({
        ...view,
        perPage: newItemsPerPageNumber,
        page: 1
      });
    },
    children: PAGE_SIZE_VALUES.map(value => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
        value: value,
        label: value.toString()
      }, value);
    })
  });
}
function PreviewOptions({
  previewOptions,
  onChangePreviewOption,
  onMenuOpenChange,
  activeOption
}) {
  const focusPreviewOptionsField = id => {
    // Focus the visibility button to avoid focus loss.
    // Our code is safe against the component being unmounted, so we don't need to worry about cleaning the timeout.
    // eslint-disable-next-line @wordpress/react-no-unsafe-timeout
    setTimeout(() => {
      const element = document.querySelector(`.dataviews-field-control__field-${id} .dataviews-field-control__field-preview-options-button`);
      if (element instanceof HTMLElement) {
        element.focus();
      }
    }, 50);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(Menu, {
    onOpenChange: onMenuOpenChange,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.TriggerButton, {
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        className: "dataviews-field-control__field-preview-options-button",
        size: "compact",
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"],
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preview')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.Popover, {
      children: previewOptions?.map(({
        id,
        label
      }) => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.RadioItem, {
          value: id,
          checked: id === activeOption,
          onChange: () => {
            onChangePreviewOption?.(id);
            focusPreviewOptionsField(id);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.ItemLabel, {
            children: label
          })
        }, id);
      })
    })]
  });
}
function FieldItem({
  field,
  label,
  description,
  isVisible,
  isFirst,
  isLast,
  canMove = true,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  previewOptions,
  onChangePreviewOption
}) {
  const [isChangingPreviewOption, setIsChangingPreviewOption] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const focusVisibilityField = () => {
    // Focus the visibility button to avoid focus loss.
    // Our code is safe against the component being unmounted, so we don't need to worry about cleaning the timeout.
    // eslint-disable-next-line @wordpress/react-no-unsafe-timeout
    setTimeout(() => {
      const element = document.querySelector(`.dataviews-field-control__field-${field.id} .dataviews-field-control__field-visibility-button`);
      if (element instanceof HTMLElement) {
        element.focus();
      }
    }, 50);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalItem, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
      expanded: true,
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])('dataviews-field-control__field', `dataviews-field-control__field-${field.id}`,
      // The actions are hidden when the mouse is not hovering the item, or focus
      // is outside the item.
      // For actions that require a popover, a menu etc, that would mean that when the interactive element
      // opens and the focus goes there the actions would be hidden.
      // To avoid that we add a class to the item, that makes sure actions are visible while there is some
      // interaction with the item.
      {
        'is-interacting': isChangingPreviewOption
      }),
      justify: "flex-start",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "dataviews-field-control__icon",
        children: !canMove && !field.enableHiding && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
        className: "dataviews-field-control__label-sub-label-container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          className: "dataviews-field-control__label",
          children: label || field.label
        }), description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          className: "dataviews-field-control__sub-label",
          children: description
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
        justify: "flex-end",
        expanded: false,
        className: "dataviews-field-control__actions",
        children: [isVisible && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            disabled: isFirst || !canMove,
            accessibleWhenDisabled: true,
            size: "compact",
            onClick: onMoveUp,
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"],
            label: isFirst || !canMove ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("This field can't be moved up") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: field label */
            (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Move %s up'), field.label)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            disabled: isLast || !canMove,
            accessibleWhenDisabled: true,
            size: "compact",
            onClick: onMoveDown,
            icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
            label: isLast || !canMove ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("This field can't be moved down") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: field label */
            (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Move %s down'), field.label)
          })]
        }), onToggleVisibility && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "dataviews-field-control__field-visibility-button",
          disabled: !field.enableHiding,
          accessibleWhenDisabled: true,
          size: "compact",
          onClick: () => {
            onToggleVisibility();
            focusVisibilityField();
          },
          icon: isVisible ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"],
          label: isVisible ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: field label */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('Hide %s', 'field'), field.label) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s: field label */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('Show %s', 'field'), field.label)
        }), previewOptions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(PreviewOptions, {
          previewOptions: previewOptions,
          onChangePreviewOption: onChangePreviewOption,
          onMenuOpenChange: setIsChangingPreviewOption,
          activeOption: field.id
        })]
      })]
    })
  });
}
function RegularFieldItem({
  index,
  field,
  view,
  onChangeView
}) {
  var _view$fields;
  const visibleFieldIds = (_view$fields = view.fields) !== null && _view$fields !== void 0 ? _view$fields : [];
  const isVisible = index !== undefined && visibleFieldIds.includes(field.id);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(FieldItem, {
    field: field,
    isVisible: isVisible,
    isFirst: index !== undefined && index < 1,
    isLast: index !== undefined && index === visibleFieldIds.length - 1,
    onToggleVisibility: () => {
      onChangeView({
        ...view,
        fields: isVisible ? visibleFieldIds.filter(fieldId => fieldId !== field.id) : [...visibleFieldIds, field.id]
      });
    },
    onMoveUp: index !== undefined ? () => {
      var _visibleFieldIds$slic;
      onChangeView({
        ...view,
        fields: [...((_visibleFieldIds$slic = visibleFieldIds.slice(0, index - 1)) !== null && _visibleFieldIds$slic !== void 0 ? _visibleFieldIds$slic : []), field.id, visibleFieldIds[index - 1], ...visibleFieldIds.slice(index + 1)]
      });
    } : undefined,
    onMoveDown: index !== undefined ? () => {
      var _visibleFieldIds$slic2;
      onChangeView({
        ...view,
        fields: [...((_visibleFieldIds$slic2 = visibleFieldIds.slice(0, index)) !== null && _visibleFieldIds$slic2 !== void 0 ? _visibleFieldIds$slic2 : []), visibleFieldIds[index + 1], field.id, ...visibleFieldIds.slice(index + 2)]
      });
    } : undefined
  });
}
function isDefined(item) {
  return !!item;
}
function FieldControl() {
  var _view$fields2;
  const {
    view,
    fields,
    onChangeView
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const togglableFields = [view?.titleField, view?.mediaField, view?.descriptionField].filter(Boolean);
  const visibleFieldIds = (_view$fields2 = view.fields) !== null && _view$fields2 !== void 0 ? _view$fields2 : [];
  const hiddenFields = fields.filter(f => !visibleFieldIds.includes(f.id) && !togglableFields.includes(f.id) && f.type !== 'media');
  const visibleFields = visibleFieldIds.map(fieldId => fields.find(f => f.id === fieldId)).filter(isDefined);
  if (!visibleFields?.length && !hiddenFields?.length) {
    return null;
  }
  const titleField = fields.find(f => f.id === view.titleField);
  const previewField = fields.find(f => f.id === view.mediaField);
  const descriptionField = fields.find(f => f.id === view.descriptionField);
  const previewFields = fields.filter(f => f.type === 'media');
  let previewFieldUI;
  if (previewFields.length > 1) {
    var _view$showMedia;
    const isPreviewFieldVisible = isDefined(previewField) && ((_view$showMedia = view.showMedia) !== null && _view$showMedia !== void 0 ? _view$showMedia : true);
    previewFieldUI = isDefined(previewField) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(FieldItem, {
      field: previewField,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preview'),
      description: previewField.label,
      isVisible: isPreviewFieldVisible,
      onToggleVisibility: () => {
        onChangeView({
          ...view,
          showMedia: !isPreviewFieldVisible
        });
      },
      canMove: false,
      previewOptions: previewFields.map(field => ({
        label: field.label,
        id: field.id
      })),
      onChangePreviewOption: newPreviewId => onChangeView({
        ...view,
        mediaField: newPreviewId
      })
    }, previewField.id);
  }
  const lockedFields = [{
    field: titleField,
    isVisibleFlag: 'showTitle'
  }, {
    field: previewField,
    isVisibleFlag: 'showMedia',
    ui: previewFieldUI
  }, {
    field: descriptionField,
    isVisibleFlag: 'showDescription'
  }].filter(({
    field
  }) => isDefined(field));
  const visibleLockedFields = lockedFields.filter(({
    field,
    isVisibleFlag
  }) => {
    var _view$isVisibleFlag;
    return (
      // @ts-expect-error
      isDefined(field) && ((_view$isVisibleFlag = view[isVisibleFlag]) !== null && _view$isVisibleFlag !== void 0 ? _view$isVisibleFlag : true)
    );
  });
  const hiddenLockedFields = lockedFields.filter(({
    field,
    isVisibleFlag
  }) => {
    var _view$isVisibleFlag2;
    return (
      // @ts-expect-error
      isDefined(field) && !((_view$isVisibleFlag2 = view[isVisibleFlag]) !== null && _view$isVisibleFlag2 !== void 0 ? _view$isVisibleFlag2 : true)
    );
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
    className: "dataviews-field-control",
    spacing: 6,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
      className: "dataviews-view-config__properties",
      spacing: 0,
      children: (visibleLockedFields.length > 0 || !!visibleFields?.length) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalItemGroup, {
        isBordered: true,
        isSeparated: true,
        children: [visibleLockedFields.map(({
          field,
          isVisibleFlag,
          ui
        }) => {
          return ui !== null && ui !== void 0 ? ui : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(FieldItem, {
            field: field,
            isVisible: true,
            onToggleVisibility: () => {
              onChangeView({
                ...view,
                [isVisibleFlag]: false
              });
            },
            canMove: false
          }, field.id);
        }), visibleFields.map((field, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(RegularFieldItem, {
          field: field,
          view: view,
          onChangeView: onChangeView,
          index: index
        }, field.id))]
      })
    }), (!!hiddenFields?.length || !!hiddenLockedFields.length) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
      spacing: 4,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.BaseControl.VisualLabel, {
        style: {
          margin: 0
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hidden')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
        className: "dataviews-view-config__properties",
        spacing: 0,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalItemGroup, {
          isBordered: true,
          isSeparated: true,
          children: [hiddenLockedFields.length > 0 && hiddenLockedFields.map(({
            field,
            isVisibleFlag,
            ui
          }) => {
            return ui !== null && ui !== void 0 ? ui : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(FieldItem, {
              field: field,
              isVisible: false,
              onToggleVisibility: () => {
                onChangeView({
                  ...view,
                  [isVisibleFlag]: true
                });
              },
              canMove: false
            }, field.id);
          }), hiddenFields.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(RegularFieldItem, {
            field: field,
            view: view,
            onChangeView: onChangeView
          }, field.id))]
        })
      })]
    })]
  });
}
function SettingsSection({
  title,
  description,
  children
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalGrid, {
    columns: 12,
    className: "dataviews-settings-section",
    gap: 4,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "dataviews-settings-section__sidebar",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHeading, {
        level: 2,
        className: "dataviews-settings-section__title",
        children: title
      }), description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalText, {
        variant: "muted",
        className: "dataviews-settings-section__description",
        children: description
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalGrid, {
      columns: 8,
      gap: 4,
      className: "dataviews-settings-section__content",
      children: children
    })]
  });
}
function DataviewsViewConfigDropdown() {
  const {
    view
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_dataviews_context__WEBPACK_IMPORTED_MODULE_8__["default"]);
  const popoverId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useInstanceId)(_DataViewsViewConfig, 'dataviews-view-config-dropdown');
  const activeLayout = _dataviews_layouts__WEBPACK_IMPORTED_MODULE_9__.VIEW_LAYOUTS.find(layout => layout.type === view.type);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    expandOnMobile: true,
    popoverProps: {
      ...DATAVIEWS_CONFIG_POPOVER_PROPS,
      id: popoverId
    },
    renderToggle: ({
      onToggle,
      isOpen
    }) => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        size: "compact",
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_17__["default"],
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._x)('View options', 'View is used as a noun'),
        onClick: onToggle,
        "aria-expanded": isOpen ? 'true' : 'false',
        "aria-controls": popoverId
      });
    },
    renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalDropdownContentWrapper, {
      paddingSize: "medium",
      className: "dataviews-config__popover-content-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
        className: "dataviews-view-config",
        spacing: 6,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(SettingsSection, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Appearance'),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
            expanded: true,
            className: "is-divided-in-two",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(SortFieldControl, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(SortDirectionControl, {})]
          }), !!activeLayout?.viewConfigOptions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(activeLayout.viewConfigOptions, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ItemsPerPageControl, {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(SettingsSection, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Properties'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(FieldControl, {})
        })]
      })
    })
  });
}
function _DataViewsViewConfig({
  defaultLayouts = {
    list: {},
    grid: {},
    table: {}
  }
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ViewTypeMenu, {
      defaultLayouts: defaultLayouts
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(DataviewsViewConfigDropdown, {})]
  });
}
const DataViewsViewConfig = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.memo)(_DataViewsViewConfig);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataViewsViewConfig);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataviews/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataviews/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataViews)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dataviews_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var _dataviews_filters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dataviews-filters */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-filters/index.js");
/* harmony import */ var _dataviews_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dataviews-layout */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-layout/index.js");
/* harmony import */ var _dataviews_footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../dataviews-footer */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-footer/index.js");
/* harmony import */ var _dataviews_search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dataviews-search */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-search/index.js");
/* harmony import */ var _dataviews_view_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dataviews-view-config */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-view-config/index.js");
/* harmony import */ var _normalize_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../normalize-fields */ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */








const defaultGetItemId = item => item.id;
const defaultIsItemClickable = () => true;
const EMPTY_ARRAY = [];
function DataViews({
  view,
  onChangeView,
  fields,
  search = true,
  searchLabel = undefined,
  actions = EMPTY_ARRAY,
  data,
  getItemId = defaultGetItemId,
  getItemLevel,
  isLoading = false,
  paginationInfo,
  defaultLayouts,
  selection: selectionProperty,
  onChangeSelection,
  onClickItem,
  isItemClickable = defaultIsItemClickable,
  header
}) {
  const [containerWidth, setContainerWidth] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const containerRef = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useResizeObserver)(resizeObserverEntries => {
    setContainerWidth(resizeObserverEntries[0].borderBoxSize[0].inlineSize);
  }, {
    box: 'border-box'
  });
  const [selectionState, setSelectionState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const isUncontrolled = selectionProperty === undefined || onChangeSelection === undefined;
  const selection = isUncontrolled ? selectionState : selectionProperty;
  const [openedFilter, setOpenedFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  function setSelectionWithChange(value) {
    const newValue = typeof value === 'function' ? value(selection) : value;
    if (isUncontrolled) {
      setSelectionState(newValue);
    }
    if (onChangeSelection) {
      onChangeSelection(newValue);
    }
  }
  const _fields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_normalize_fields__WEBPACK_IMPORTED_MODULE_4__.normalizeFields)(fields), [fields]);
  const _selection = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return selection.filter(id => data.some(item => getItemId(item) === id));
  }, [selection, data, getItemId]);
  const filters = (0,_dataviews_filters__WEBPACK_IMPORTED_MODULE_5__.useFilters)(_fields, view);
  const [isShowingFilter, setIsShowingFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => (filters || []).some(filter => filter.isPrimary));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_context__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: {
      view,
      onChangeView,
      fields: _fields,
      actions,
      data,
      isLoading,
      paginationInfo,
      selection: _selection,
      onChangeSelection: setSelectionWithChange,
      openedFilter,
      setOpenedFilter,
      getItemId,
      getItemLevel,
      isItemClickable,
      onClickItem,
      containerWidth
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "dataviews-wrapper",
      ref: containerRef,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
        alignment: "top",
        justify: "space-between",
        className: "dataviews__view-actions",
        spacing: 1,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
          justify: "start",
          expanded: false,
          className: "dataviews__search",
          children: [search && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_search__WEBPACK_IMPORTED_MODULE_7__["default"], {
            label: searchLabel
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_filters__WEBPACK_IMPORTED_MODULE_5__.FiltersToggle, {
            filters: filters,
            view: view,
            onChangeView: onChangeView,
            setOpenedFilter: setOpenedFilter,
            setIsShowingFilter: setIsShowingFilter,
            isShowingFilter: isShowingFilter
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
          spacing: 1,
          expanded: false,
          style: {
            flexShrink: 0
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_view_config__WEBPACK_IMPORTED_MODULE_8__["default"], {
            defaultLayouts: defaultLayouts
          }), header]
        })]
      }), isShowingFilter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_filters__WEBPACK_IMPORTED_MODULE_5__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_layout__WEBPACK_IMPORTED_MODULE_9__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_dataviews_footer__WEBPACK_IMPORTED_MODULE_10__["default"], {})]
    })
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/constants.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_OPERATORS: () => (/* binding */ ALL_OPERATORS),
/* harmony export */   LAYOUT_GRID: () => (/* binding */ LAYOUT_GRID),
/* harmony export */   LAYOUT_LIST: () => (/* binding */ LAYOUT_LIST),
/* harmony export */   LAYOUT_TABLE: () => (/* binding */ LAYOUT_TABLE),
/* harmony export */   OPERATORS: () => (/* binding */ OPERATORS),
/* harmony export */   OPERATOR_IS: () => (/* binding */ OPERATOR_IS),
/* harmony export */   OPERATOR_IS_ALL: () => (/* binding */ OPERATOR_IS_ALL),
/* harmony export */   OPERATOR_IS_ANY: () => (/* binding */ OPERATOR_IS_ANY),
/* harmony export */   OPERATOR_IS_NONE: () => (/* binding */ OPERATOR_IS_NONE),
/* harmony export */   OPERATOR_IS_NOT: () => (/* binding */ OPERATOR_IS_NOT),
/* harmony export */   OPERATOR_IS_NOT_ALL: () => (/* binding */ OPERATOR_IS_NOT_ALL),
/* harmony export */   SORTING_DIRECTIONS: () => (/* binding */ SORTING_DIRECTIONS),
/* harmony export */   sortArrows: () => (/* binding */ sortArrows),
/* harmony export */   sortIcons: () => (/* binding */ sortIcons),
/* harmony export */   sortLabels: () => (/* binding */ sortLabels),
/* harmony export */   sortValues: () => (/* binding */ sortValues)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-up.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-down.js");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

// Filter operators.
const OPERATOR_IS = 'is';
const OPERATOR_IS_NOT = 'isNot';
const OPERATOR_IS_ANY = 'isAny';
const OPERATOR_IS_NONE = 'isNone';
const OPERATOR_IS_ALL = 'isAll';
const OPERATOR_IS_NOT_ALL = 'isNotAll';
const ALL_OPERATORS = [OPERATOR_IS, OPERATOR_IS_NOT, OPERATOR_IS_ANY, OPERATOR_IS_NONE, OPERATOR_IS_ALL, OPERATOR_IS_NOT_ALL];
const OPERATORS = {
  [OPERATOR_IS]: {
    key: 'is-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is')
  },
  [OPERATOR_IS_NOT]: {
    key: 'is-not-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is not')
  },
  [OPERATOR_IS_ANY]: {
    key: 'is-any-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is any')
  },
  [OPERATOR_IS_NONE]: {
    key: 'is-none-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is none')
  },
  [OPERATOR_IS_ALL]: {
    key: 'is-all-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is all')
  },
  [OPERATOR_IS_NOT_ALL]: {
    key: 'is-not-all-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is not all')
  }
};
const SORTING_DIRECTIONS = ['asc', 'desc'];
const sortArrows = {
  asc: '↑',
  desc: '↓'
};
const sortValues = {
  asc: 'ascending',
  desc: 'descending'
};
const sortLabels = {
  asc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sort ascending'),
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sort descending')
};
const sortIcons = {
  asc: _wordpress_icons__WEBPACK_IMPORTED_MODULE_1__["default"],
  desc: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"]
};

// View layouts.
const LAYOUT_TABLE = 'table';
const LAYOUT_GRID = 'grid';
const LAYOUT_LIST = 'list';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/datetime.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/datetime.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateTime)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function DateTime({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("fieldset", {
    className: "dataviews-controls__datetime",
    children: [!hideLabelFromVision && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.BaseControl.VisualLabel, {
      as: "legend",
      children: label
    }), hideLabelFromVision && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.VisuallyHidden, {
      as: "legend",
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TimePicker, {
      currentTime: value,
      onChange: onChangeControl,
      hideLabelFromVision: true
    })]
  });
}
//# sourceMappingURL=datetime.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getControl: () => (/* binding */ getControl),
/* harmony export */   getControlByType: () => (/* binding */ getControlByType)
/* harmony export */ });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/datetime.js");
/* harmony import */ var _integer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./integer */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/integer.js");
/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./radio */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/radio.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/select.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/text.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */






const FORM_CONTROLS = {
  datetime: _datetime__WEBPACK_IMPORTED_MODULE_0__["default"],
  integer: _integer__WEBPACK_IMPORTED_MODULE_1__["default"],
  radio: _radio__WEBPACK_IMPORTED_MODULE_2__["default"],
  select: _select__WEBPACK_IMPORTED_MODULE_3__["default"],
  text: _text__WEBPACK_IMPORTED_MODULE_4__["default"]
};
function getControl(field, fieldTypeDefinition) {
  if (typeof field.Edit === 'function') {
    return field.Edit;
  }
  if (typeof field.Edit === 'string') {
    return getControlByType(field.Edit);
  }
  if (field.elements) {
    return getControlByType('select');
  }
  if (typeof fieldTypeDefinition.Edit === 'string') {
    return getControlByType(fieldTypeDefinition.Edit);
  }
  return fieldTypeDefinition.Edit;
}
function getControlByType(type) {
  if (Object.keys(FORM_CONTROLS).includes(type)) {
    return FORM_CONTROLS[type];
  }
  throw 'Control ' + type + ' not found';
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/integer.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/integer.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Integer)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function Integer({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  var _field$getValue;
  const {
    id,
    label,
    description
  } = field;
  const value = (_field$getValue = field.getValue({
    item: data
  })) !== null && _field$getValue !== void 0 ? _field$getValue : '';
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: Number(newValue)
  }), [id, onChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalNumberControl, {
    label: label,
    help: description,
    value: value,
    onChange: onChangeControl,
    __next40pxDefaultSize: true,
    hideLabelFromVision: hideLabelFromVision
  });
}
//# sourceMappingURL=integer.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/radio.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/radio.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Radio)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function Radio({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  if (field.elements) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RadioControl, {
      label: label,
      onChange: onChangeControl,
      options: field.elements,
      selected: value,
      hideLabelFromVision: hideLabelFromVision
    });
  }
  return null;
}
//# sourceMappingURL=radio.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/select.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/select.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

function Select({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  var _field$getValue, _field$elements;
  const {
    id,
    label
  } = field;
  const value = (_field$getValue = field.getValue({
    item: data
  })) !== null && _field$getValue !== void 0 ? _field$getValue : '';
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  const elements = [
  /*
   * Value can be undefined when:
   *
   * - the field is not required
   * - in bulk editing
   *
   */
  {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select item'),
    value: ''
  }, ...((_field$elements = field?.elements) !== null && _field$elements !== void 0 ? _field$elements : [])];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
    label: label,
    value: value,
    options: elements,
    onChange: onChangeControl,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    hideLabelFromVision: hideLabelFromVision
  });
}
//# sourceMappingURL=select.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/text.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/text.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function Text({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label,
    placeholder
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    label: label,
    placeholder: placeholder,
    value: value !== null && value !== void 0 ? value : '',
    onChange: onChangeControl,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    hideLabelFromVision: hideLabelFromVision
  });
}
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewGrid)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var _components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/dataviews-item-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-item-actions/index.js");
/* harmony import */ var _components_dataviews_selection_checkbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/dataviews-selection-checkbox */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-selection-checkbox/index.js");
/* harmony import */ var _components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/dataviews-bulk-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-bulk-actions/index.js");
/* harmony import */ var _utils_get_clickable_item_props__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/get-clickable-item-props */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/utils/get-clickable-item-props.js");
/* harmony import */ var _preview_size_picker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./preview-size-picker */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/preview-size-picker.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */







const {
  Badge
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_5__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
function GridItem({
  view,
  selection,
  onChangeSelection,
  onClickItem,
  isItemClickable,
  getItemId,
  item,
  actions,
  mediaField,
  titleField,
  descriptionField,
  regularFields,
  badgeFields,
  hasBulkActions
}) {
  const {
    showTitle = true,
    showMedia = true,
    showDescription = true
  } = view;
  const hasBulkAction = (0,_components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_6__.useHasAPossibleBulkAction)(actions, item);
  const id = getItemId(item);
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useInstanceId)(GridItem);
  const isSelected = selection.includes(id);
  const renderedMediaField = mediaField?.render ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(mediaField.render, {
    item: item
  }) : null;
  const renderedTitleField = showTitle && titleField?.render ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(titleField.render, {
    item: item
  }) : null;
  const clickableMediaItemProps = (0,_utils_get_clickable_item_props__WEBPACK_IMPORTED_MODULE_7__["default"])({
    item,
    isItemClickable,
    onClickItem,
    className: 'dataviews-view-grid__media'
  });
  const clickableTitleItemProps = (0,_utils_get_clickable_item_props__WEBPACK_IMPORTED_MODULE_7__["default"])({
    item,
    isItemClickable,
    onClickItem,
    className: 'dataviews-view-grid__title-field dataviews-title-field'
  });
  let mediaA11yProps;
  let titleA11yProps;
  if (isItemClickable(item) && onClickItem) {
    if (renderedTitleField) {
      mediaA11yProps = {
        'aria-labelledby': `dataviews-view-grid__title-field-${instanceId}`
      };
      titleA11yProps = {
        id: `dataviews-view-grid__title-field-${instanceId}`
      };
    } else {
      mediaA11yProps = {
        'aria-label': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Navigate to item')
      };
    }
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
    spacing: 0,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])('dataviews-view-grid__card', {
      'is-selected': hasBulkAction && isSelected
    }),
    onClickCapture: event => {
      if (event.ctrlKey || event.metaKey) {
        event.stopPropagation();
        event.preventDefault();
        if (!hasBulkAction) {
          return;
        }
        onChangeSelection(selection.includes(id) ? selection.filter(itemId => id !== itemId) : [...selection, id]);
      }
    },
    children: [showMedia && renderedMediaField && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      ...clickableMediaItemProps,
      ...mediaA11yProps,
      children: renderedMediaField
    }), hasBulkActions && showMedia && renderedMediaField && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_dataviews_selection_checkbox__WEBPACK_IMPORTED_MODULE_8__["default"], {
      item: item,
      selection: selection,
      onChangeSelection: onChangeSelection,
      getItemId: getItemId,
      titleField: titleField,
      disabled: !hasBulkAction
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
      justify: "space-between",
      className: "dataviews-view-grid__title-actions",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        ...clickableTitleItemProps,
        ...titleA11yProps,
        children: renderedTitleField
      }), !!actions?.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_9__["default"], {
        item: item,
        actions: actions,
        isCompact: true
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
      spacing: 1,
      children: [showDescription && descriptionField?.render && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(descriptionField.render, {
        item: item
      }), !!badgeFields?.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
        className: "dataviews-view-grid__badge-fields",
        spacing: 2,
        wrap: true,
        alignment: "top",
        justify: "flex-start",
        children: badgeFields.map(field => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Badge, {
            className: "dataviews-view-grid__field-value",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(field.render, {
              item: item
            })
          }, field.id);
        })
      }), !!regularFields?.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, {
        className: "dataviews-view-grid__fields",
        spacing: 1,
        children: regularFields.map(field => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, {
            className: "dataviews-view-grid__field",
            gap: 1,
            justify: "flex-start",
            expanded: true,
            style: {
              height: 'auto'
            },
            direction: "row",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
                className: "dataviews-view-grid__field-name",
                children: field.header
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, {
                className: "dataviews-view-grid__field-value",
                style: {
                  maxHeight: 'none'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(field.render, {
                  item: item
                })
              })]
            })
          }, field.id);
        })
      })]
    })]
  }, id);
}
function ViewGrid({
  actions,
  data,
  fields,
  getItemId,
  isLoading,
  onChangeSelection,
  onClickItem,
  isItemClickable,
  selection,
  view
}) {
  var _view$fields;
  const titleField = fields.find(field => field.id === view?.titleField);
  const mediaField = fields.find(field => field.id === view?.mediaField);
  const descriptionField = fields.find(field => field.id === view?.descriptionField);
  const otherFields = (_view$fields = view.fields) !== null && _view$fields !== void 0 ? _view$fields : [];
  const {
    regularFields,
    badgeFields
  } = otherFields.reduce((accumulator, fieldId) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) {
      return accumulator;
    }
    // If the field is a badge field, add it to the badgeFields array
    // otherwise add it to the rest visibleFields array.
    const key = view.layout?.badgeFields?.includes(fieldId) ? 'badgeFields' : 'regularFields';
    accumulator[key].push(field);
    return accumulator;
  }, {
    regularFields: [],
    badgeFields: []
  });
  const hasData = !!data?.length;
  const updatedPreviewSize = (0,_preview_size_picker__WEBPACK_IMPORTED_MODULE_10__.useUpdatedPreviewSizeOnViewportChange)();
  const hasBulkActions = (0,_components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_6__.useSomeItemHasAPossibleBulkAction)(actions, data);
  const usedPreviewSize = updatedPreviewSize || view.layout?.previewSize;
  const gridStyle = usedPreviewSize ? {
    gridTemplateColumns: `repeat(${usedPreviewSize}, minmax(0, 1fr))`
  } : {};
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalGrid, {
      gap: 8,
      columns: 2,
      alignment: "top",
      className: "dataviews-view-grid",
      style: gridStyle,
      "aria-busy": isLoading,
      children: data.map(item => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(GridItem, {
          view: view,
          selection: selection,
          onChangeSelection: onChangeSelection,
          onClickItem: onClickItem,
          isItemClickable: isItemClickable,
          getItemId: getItemId,
          item: item,
          actions: actions,
          mediaField: mediaField,
          titleField: titleField,
          descriptionField: descriptionField,
          regularFields: regularFields,
          badgeFields: badgeFields,
          hasBulkActions: hasBulkActions
        }, getItemId(item));
      })
    }), !hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !isLoading
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No results')
      })
    })]
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/preview-size-picker.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/preview-size-picker.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PreviewSizePicker),
/* harmony export */   useUpdatedPreviewSizeOnViewportChange: () => (/* binding */ useUpdatedPreviewSizeOnViewportChange)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_dataviews_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


const viewportBreaks = {
  xhuge: {
    min: 3,
    max: 6,
    default: 5
  },
  huge: {
    min: 2,
    max: 4,
    default: 4
  },
  xlarge: {
    min: 2,
    max: 3,
    default: 3
  },
  large: {
    min: 1,
    max: 2,
    default: 2
  },
  mobile: {
    min: 1,
    max: 2,
    default: 2
  }
};

/**
 * Breakpoints were adjusted from media queries breakpoints to account for
 * the sidebar width. This was done to match the existing styles we had.
 */
const BREAKPOINTS = {
  xhuge: 1520,
  huge: 1140,
  xlarge: 780,
  large: 480,
  mobile: 0
};
function useViewPortBreakpoint() {
  const containerWidth = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_components_dataviews_context__WEBPACK_IMPORTED_MODULE_4__["default"]).containerWidth;
  for (const [key, value] of Object.entries(BREAKPOINTS)) {
    if (containerWidth >= value) {
      return key;
    }
  }
  return 'mobile';
}
function useUpdatedPreviewSizeOnViewportChange() {
  const view = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_components_dataviews_context__WEBPACK_IMPORTED_MODULE_4__["default"]).view;
  const viewport = useViewPortBreakpoint();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const previewSize = view.layout?.previewSize;
    let newPreviewSize;
    if (!previewSize) {
      return;
    }
    const breakValues = viewportBreaks[viewport];
    if (previewSize < breakValues.min) {
      newPreviewSize = breakValues.min;
    }
    if (previewSize > breakValues.max) {
      newPreviewSize = breakValues.max;
    }
    return newPreviewSize;
  }, [viewport, view]);
}
function PreviewSizePicker() {
  const viewport = useViewPortBreakpoint();
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_components_dataviews_context__WEBPACK_IMPORTED_MODULE_4__["default"]);
  const view = context.view;
  const breakValues = viewportBreaks[viewport];
  const previewSizeToUse = view.layout?.previewSize || breakValues.default;
  const marks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => Array.from({
    length: breakValues.max - breakValues.min + 1
  }, (_, i) => {
    return {
      value: breakValues.min + i
    };
  }), [breakValues]);
  if (viewport === 'mobile') {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RangeControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    showTooltip: false,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview size'),
    value: breakValues.max + breakValues.min - previewSizeToUse,
    marks: marks,
    min: breakValues.min,
    max: breakValues.max,
    withInputField: false,
    onChange: (value = 0) => {
      context.onChangeView({
        ...view,
        layout: {
          ...view.layout,
          previewSize: breakValues.max + breakValues.min - value
        }
      });
    },
    step: 1
  });
}
//# sourceMappingURL=preview-size-picker.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VIEW_LAYOUTS: () => (/* binding */ VIEW_LAYOUTS)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/block-table.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/category.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/format-list-bullets-rtl.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/format-list-bullets.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/index.js");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grid */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/index.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./list */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/list/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _grid_preview_size_picker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./grid/preview-size-picker */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/grid/preview-size-picker.js");
/* harmony import */ var _table_density_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table/density-picker */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/density-picker.js");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */






const VIEW_LAYOUTS = [{
  type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_TABLE,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Table'),
  component: _table__WEBPACK_IMPORTED_MODULE_2__["default"],
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
  viewConfigOptions: _table_density_picker__WEBPACK_IMPORTED_MODULE_4__["default"]
}, {
  type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_GRID,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid'),
  component: _grid__WEBPACK_IMPORTED_MODULE_5__["default"],
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"],
  viewConfigOptions: _grid_preview_size_picker__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_LIST,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('List'),
  component: _list__WEBPACK_IMPORTED_MODULE_8__["default"],
  icon: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.isRTL)() ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"]
}];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/list/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/list/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewList)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/more-vertical.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var _components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/dataviews-item-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-item-actions/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */







/**
 * Internal dependencies
 */



const {
  Menu
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_7__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.privateApis);
function generateItemWrapperCompositeId(idPrefix) {
  return `${idPrefix}-item-wrapper`;
}
function generatePrimaryActionCompositeId(idPrefix, primaryActionId) {
  return `${idPrefix}-primary-action-${primaryActionId}`;
}
function generateDropdownTriggerCompositeId(idPrefix) {
  return `${idPrefix}-dropdown`;
}
function PrimaryActionGridCell({
  idPrefix,
  primaryAction,
  item
}) {
  const registry = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useRegistry)();
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const compositeItemId = generatePrimaryActionCompositeId(idPrefix, primaryAction.id);
  const label = typeof primaryAction.label === 'string' ? primaryAction.label : primaryAction.label([item]);
  return 'RenderModal' in primaryAction ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    role: "gridcell",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Composite.Item, {
      id: compositeItemId,
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        label: label,
        disabled: !!primaryAction.disabled,
        accessibleWhenDisabled: true,
        icon: primaryAction.icon,
        isDestructive: primaryAction.isDestructive,
        size: "small",
        onClick: () => setIsModalOpen(true)
      }),
      children: isModalOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_8__.ActionModal, {
        action: primaryAction,
        items: [item],
        closeModal: () => setIsModalOpen(false)
      })
    })
  }, primaryAction.id) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    role: "gridcell",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Composite.Item, {
      id: compositeItemId,
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        label: label,
        disabled: !!primaryAction.disabled,
        accessibleWhenDisabled: true,
        icon: primaryAction.icon,
        isDestructive: primaryAction.isDestructive,
        size: "small",
        onClick: () => {
          primaryAction.callback([item], {
            registry
          });
        }
      })
    })
  }, primaryAction.id);
}
function ListItem({
  view,
  actions,
  idPrefix,
  isSelected,
  item,
  titleField,
  mediaField,
  descriptionField,
  onSelect,
  otherFields,
  onDropdownTriggerKeyDown
}) {
  const {
    showTitle = true,
    showMedia = true,
    showDescription = true
  } = view;
  const itemRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const labelId = `${idPrefix}-label`;
  const descriptionId = `${idPrefix}-description`;
  const registry = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useRegistry)();
  const [isHovered, setIsHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [activeModalAction, setActiveModalAction] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const handleHover = ({
    type
  }) => {
    const isHover = type === 'mouseenter';
    setIsHovered(isHover);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (isSelected) {
      itemRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [isSelected]);
  const {
    primaryAction,
    eligibleActions
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    // If an action is eligible for all items, doesn't need
    // to provide the `isEligible` function.
    const _eligibleActions = actions.filter(action => !action.isEligible || action.isEligible(item));
    const _primaryActions = _eligibleActions.filter(action => action.isPrimary && !!action.icon);
    return {
      primaryAction: _primaryActions[0],
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  const hasOnlyOnePrimaryAction = primaryAction && actions.length === 1;
  const renderedMediaField = showMedia && mediaField?.render ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    className: "dataviews-view-list__media-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(mediaField.render, {
      item: item
    })
  }) : null;
  const renderedTitleField = showTitle && titleField?.render ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(titleField.render, {
    item: item
  }) : null;
  const usedActions = eligibleActions?.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    spacing: 3,
    className: "dataviews-view-list__item-actions",
    children: [primaryAction && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(PrimaryActionGridCell, {
      idPrefix: idPrefix,
      primaryAction: primaryAction,
      item: item
    }), !hasOnlyOnePrimaryAction && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      role: "gridcell",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(Menu, {
        placement: "bottom-end",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.TriggerButton, {
          render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Composite.Item, {
            id: generateDropdownTriggerCompositeId(idPrefix),
            render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              size: "small",
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Actions'),
              accessibleWhenDisabled: true,
              disabled: !actions.length,
              onKeyDown: onDropdownTriggerKeyDown
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Menu.Popover, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_8__.ActionsMenuGroup, {
            actions: eligibleActions,
            item: item,
            registry: registry,
            setActiveModalAction: setActiveModalAction
          })
        })]
      }), !!activeModalAction && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_8__.ActionModal, {
        action: activeModalAction,
        items: [item],
        closeModal: () => setActiveModalAction(null)
      })]
    })]
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Composite.Row, {
    ref: itemRef,
    render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {}),
    role: "row",
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])({
      'is-selected': isSelected,
      'is-hovered': isHovered
    }),
    onMouseEnter: handleHover,
    onMouseLeave: handleHover,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
      className: "dataviews-view-list__item-wrapper",
      spacing: 0,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        role: "gridcell",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Composite.Item, {
          id: generateItemWrapperCompositeId(idPrefix),
          "aria-pressed": isSelected,
          "aria-labelledby": labelId,
          "aria-describedby": descriptionId,
          className: "dataviews-view-list__item",
          onClick: () => onSelect(item)
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
        spacing: 3,
        justify: "start",
        alignment: "flex-start",
        children: [renderedMediaField, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
          spacing: 1,
          className: "dataviews-view-list__field-wrapper",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
            spacing: 0,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "dataviews-title-field",
              id: labelId,
              children: renderedTitleField
            }), usedActions]
          }), showDescription && descriptionField?.render && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "dataviews-view-list__field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(descriptionField.render, {
              item: item
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "dataviews-view-list__fields",
            id: descriptionId,
            children: otherFields.map(field => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "dataviews-view-list__field",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.VisuallyHidden, {
                as: "span",
                className: "dataviews-view-list__field-label",
                children: field.label
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                className: "dataviews-view-list__field-value",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(field.render, {
                  item: item
                })
              })]
            }, field.id))
          })]
        })]
      })]
    })
  });
}
function isDefined(item) {
  return !!item;
}
function ViewList(props) {
  var _view$fields;
  const {
    actions,
    data,
    fields,
    getItemId,
    isLoading,
    onChangeSelection,
    selection,
    view
  } = props;
  const baseId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(ViewList, 'view-list');
  const selectedItem = data?.findLast(item => selection.includes(getItemId(item)));
  const titleField = fields.find(field => field.id === view.titleField);
  const mediaField = fields.find(field => field.id === view.mediaField);
  const descriptionField = fields.find(field => field.id === view.descriptionField);
  const otherFields = ((_view$fields = view?.fields) !== null && _view$fields !== void 0 ? _view$fields : []).map(fieldId => fields.find(f => fieldId === f.id)).filter(isDefined);
  const onSelect = item => onChangeSelection([getItemId(item)]);
  const generateCompositeItemIdPrefix = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(item => `${baseId}-${getItemId(item)}`, [baseId, getItemId]);
  const isActiveCompositeItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((item, idToCheck) => {
    // All composite items use the same prefix in their IDs.
    return idToCheck.startsWith(generateCompositeItemIdPrefix(item));
  }, [generateCompositeItemIdPrefix]);

  // Controlled state for the active composite item.
  const [activeCompositeId, setActiveCompositeId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(undefined);

  // Update the active composite item when the selected item changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (selectedItem) {
      setActiveCompositeId(generateItemWrapperCompositeId(generateCompositeItemIdPrefix(selectedItem)));
    }
  }, [selectedItem, generateCompositeItemIdPrefix]);
  const activeItemIndex = data.findIndex(item => isActiveCompositeItem(item, activeCompositeId !== null && activeCompositeId !== void 0 ? activeCompositeId : ''));
  const previousActiveItemIndex = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.usePrevious)(activeItemIndex);
  const isActiveIdInList = activeItemIndex !== -1;
  const selectCompositeItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((targetIndex, generateCompositeId) => {
    // Clamping between 0 and data.length - 1 to avoid out of bounds.
    const clampedIndex = Math.min(data.length - 1, Math.max(0, targetIndex));
    if (!data[clampedIndex]) {
      return;
    }
    const itemIdPrefix = generateCompositeItemIdPrefix(data[clampedIndex]);
    const targetCompositeItemId = generateCompositeId(itemIdPrefix);
    setActiveCompositeId(targetCompositeItemId);
    document.getElementById(targetCompositeItemId)?.focus();
  }, [data, generateCompositeItemIdPrefix]);

  // Select a new active composite item when the current active item
  // is removed from the list.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const wasActiveIdInList = previousActiveItemIndex !== undefined && previousActiveItemIndex !== -1;
    if (!isActiveIdInList && wasActiveIdInList) {
      // By picking `previousActiveItemIndex` as the next item index, we are
      // basically picking the item that would have been after the deleted one.
      // If the previously active (and removed) item was the last of the list,
      // we will select the item before it — which is the new last item.
      selectCompositeItem(previousActiveItemIndex, generateItemWrapperCompositeId);
    }
  }, [isActiveIdInList, selectCompositeItem, previousActiveItemIndex]);

  // Prevent the default behavior (open dropdown menu) and instead select the
  // dropdown menu trigger on the previous/next row.
  // https://github.com/ariakit/ariakit/issues/3768
  const onDropdownTriggerKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(event => {
    if (event.key === 'ArrowDown') {
      // Select the dropdown menu trigger item in the next row.
      event.preventDefault();
      selectCompositeItem(activeItemIndex + 1, generateDropdownTriggerCompositeId);
    }
    if (event.key === 'ArrowUp') {
      // Select the dropdown menu trigger item in the previous row.
      event.preventDefault();
      selectCompositeItem(activeItemIndex - 1, generateDropdownTriggerCompositeId);
    }
  }, [selectCompositeItem, activeItemIndex]);
  const hasData = data?.length;
  if (!hasData) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !hasData && !isLoading
      }),
      children: !hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No results')
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Composite, {
    id: baseId,
    render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {}),
    className: "dataviews-view-list",
    role: "grid",
    activeId: activeCompositeId,
    setActiveId: setActiveCompositeId,
    children: data.map(item => {
      const id = generateCompositeItemIdPrefix(item);
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ListItem, {
        view: view,
        idPrefix: id,
        actions: actions,
        item: item,
        isSelected: item === selectedItem,
        onSelect: onSelect,
        mediaField: mediaField,
        titleField: titleField,
        descriptionField: descriptionField,
        otherFields: otherFields,
        onDropdownTriggerKeyDown: onDropdownTriggerKeyDown
      }, id);
    })
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/column-header-menu.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/column-header-menu.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/funnel.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-right.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/unseen.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils */ "./node_modules/@wordpress/dataviews/build-module/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */




const {
  Menu
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_4__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
function WithMenuSeparators({
  children
}) {
  return _wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Children.toArray(children).filter(Boolean).map((child, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [i > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Separator, {}), child]
  }, i));
}
const _HeaderMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function HeaderMenu({
  fieldId,
  view,
  fields,
  onChangeView,
  onHide,
  setOpenedFilter,
  canMove = true
}, ref) {
  var _view$fields;
  const visibleFieldIds = (_view$fields = view.fields) !== null && _view$fields !== void 0 ? _view$fields : [];
  const index = visibleFieldIds?.indexOf(fieldId);
  const isSorted = view.sort?.field === fieldId;
  let isHidable = false;
  let isSortable = false;
  let canAddFilter = false;
  let operators = [];
  const field = fields.find(f => f.id === fieldId);
  if (!field) {
    // No combined or regular field found.
    return null;
  }
  isHidable = field.enableHiding !== false;
  isSortable = field.enableSorting !== false;
  const header = field.header;
  operators = (0,_utils__WEBPACK_IMPORTED_MODULE_5__.sanitizeOperators)(field);
  // Filter can be added:
  // 1. If the field is not already part of a view's filters.
  // 2. If the field meets the type and operator requirements.
  // 3. If it's not primary. If it is, it should be already visible.
  canAddFilter = !view.filters?.some(_filter => fieldId === _filter.field) && !!field.elements?.length && !!operators.length && !field.filterBy?.isPrimary;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Menu, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Menu.TriggerButton, {
      render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        size: "compact",
        className: "dataviews-view-table-header-button",
        ref: ref,
        variant: "tertiary"
      }),
      children: [header, view.sort && isSorted && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        "aria-hidden": "true",
        children: _constants__WEBPACK_IMPORTED_MODULE_6__.sortArrows[view.sort.direction]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Popover, {
      style: {
        minWidth: '240px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(WithMenuSeparators, {
        children: [isSortable && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Group, {
          children: _constants__WEBPACK_IMPORTED_MODULE_6__.SORTING_DIRECTIONS.map(direction => {
            const isChecked = view.sort && isSorted && view.sort.direction === direction;
            const value = `${fieldId}-${direction}`;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.RadioItem, {
              // All sorting radio items share the same name, so that
              // selecting a sorting option automatically deselects the
              // previously selected one, even if it is displayed in
              // another submenu. The field and direction are passed via
              // the `value` prop.
              name: "view-table-sorting",
              value: value,
              checked: isChecked,
              onChange: () => {
                onChangeView({
                  ...view,
                  sort: {
                    field: fieldId,
                    direction
                  },
                  showLevels: false
                });
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.ItemLabel, {
                children: _constants__WEBPACK_IMPORTED_MODULE_6__.sortLabels[direction]
              })
            }, value);
          })
        }), canAddFilter && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Group, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Item, {
            prefix: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
            }),
            onClick: () => {
              setOpenedFilter(fieldId);
              onChangeView({
                ...view,
                page: 1,
                filters: [...(view.filters || []), {
                  field: fieldId,
                  value: undefined,
                  operator: operators[0]
                }]
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.ItemLabel, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add filter')
            })
          })
        }), (canMove || isHidable) && field && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Menu.Group, {
          children: [canMove && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Item, {
            prefix: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
            }),
            disabled: index < 1,
            onClick: () => {
              var _visibleFieldIds$slic;
              onChangeView({
                ...view,
                fields: [...((_visibleFieldIds$slic = visibleFieldIds.slice(0, index - 1)) !== null && _visibleFieldIds$slic !== void 0 ? _visibleFieldIds$slic : []), fieldId, visibleFieldIds[index - 1], ...visibleFieldIds.slice(index + 1)]
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.ItemLabel, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move left')
            })
          }), canMove && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Item, {
            prefix: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
            }),
            disabled: index >= visibleFieldIds.length - 1,
            onClick: () => {
              var _visibleFieldIds$slic2;
              onChangeView({
                ...view,
                fields: [...((_visibleFieldIds$slic2 = visibleFieldIds.slice(0, index)) !== null && _visibleFieldIds$slic2 !== void 0 ? _visibleFieldIds$slic2 : []), visibleFieldIds[index + 1], fieldId, ...visibleFieldIds.slice(index + 2)]
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.ItemLabel, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Move right')
            })
          }), isHidable && field && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.Item, {
            prefix: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"]
            }),
            onClick: () => {
              onHide(field);
              onChangeView({
                ...view,
                fields: visibleFieldIds.filter(id => id !== fieldId)
              });
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Menu.ItemLabel, {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide column')
            })
          })]
        })]
      })
    })]
  });
});

// @ts-expect-error Lift the `Item` type argument through the forwardRef.
const ColumnHeaderMenu = _HeaderMenu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColumnHeaderMenu);
//# sourceMappingURL=column-header-menu.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/column-primary.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/column-primary.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_get_clickable_item_props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/get-clickable-item-props */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/utils/get-clickable-item-props.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



function ColumnPrimary({
  item,
  level,
  titleField,
  mediaField,
  descriptionField,
  onClickItem,
  isItemClickable
}) {
  const clickableProps = (0,_utils_get_clickable_item_props__WEBPACK_IMPORTED_MODULE_2__["default"])({
    item,
    isItemClickable,
    onClickItem,
    className: 'dataviews-view-table__cell-content-wrapper dataviews-title-field'
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    spacing: 3,
    justify: "flex-start",
    children: [mediaField && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "dataviews-view-table__cell-content-wrapper dataviews-column-primary__media",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(mediaField.render, {
        item: item
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, {
      spacing: 0,
      children: [titleField && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        ...clickableProps,
        children: [level !== undefined && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
          className: "dataviews-view-table__level",
          children: ['—'.repeat(level), "\xA0"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(titleField.render, {
          item: item
        })]
      }), descriptionField && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(descriptionField.render, {
        item: item
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColumnPrimary);
//# sourceMappingURL=column-primary.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/density-picker.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/density-picker.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DensityPicker)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_dataviews_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/dataviews-context */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-context/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


function DensityPicker() {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_components_dataviews_context__WEBPACK_IMPORTED_MODULE_4__["default"]);
  const view = context.view;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControl, {
    __nextHasNoMarginBottom: true,
    size: "__unstable-large",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Density'),
    value: view.layout?.density || 'balanced',
    onChange: value => {
      context.onChangeView({
        ...view,
        layout: {
          ...view.layout,
          density: value
        }
      });
    },
    isBlock: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControlOption, {
      value: "comfortable",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Comfortable', 'Density option for DataView layout')
    }, "comfortable"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControlOption, {
      value: "balanced",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Balanced', 'Density option for DataView layout')
    }, "balanced"), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControlOption, {
      value: "compact",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._x)('Compact', 'Density option for DataView layout')
    }, "compact")]
  });
}
//# sourceMappingURL=density-picker.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/index.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/index.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_dataviews_selection_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/dataviews-selection-checkbox */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-selection-checkbox/index.js");
/* harmony import */ var _components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/dataviews-item-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-item-actions/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/dataviews-bulk-actions */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews-bulk-actions/index.js");
/* harmony import */ var _column_header_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./column-header-menu */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/column-header-menu.js");
/* harmony import */ var _column_primary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./column-primary */ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/table/column-primary.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */







function TableColumnField({
  item,
  fields,
  column
}) {
  const field = fields.find(f => f.id === column);
  if (!field) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: "dataviews-view-table__cell-content-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(field.render, {
      item
    })
  });
}
function TableRow({
  hasBulkActions,
  item,
  level,
  actions,
  fields,
  id,
  view,
  titleField,
  mediaField,
  descriptionField,
  selection,
  getItemId,
  isItemClickable,
  onClickItem,
  onChangeSelection
}) {
  var _view$fields;
  const hasPossibleBulkAction = (0,_components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_5__.useHasAPossibleBulkAction)(actions, item);
  const isSelected = hasPossibleBulkAction && selection.includes(id);
  const [isHovered, setIsHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const {
    showTitle = true,
    showMedia = true,
    showDescription = true
  } = view;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Will be set to true if `onTouchStart` fires. This happens before
  // `onClick` and can be used to exclude touchscreen devices from certain
  // behaviours.
  const isTouchDeviceRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  const columns = (_view$fields = view.fields) !== null && _view$fields !== void 0 ? _view$fields : [];
  const hasPrimaryColumn = titleField && showTitle || mediaField && showMedia || descriptionField && showDescription;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("tr", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])('dataviews-view-table__row', {
      'is-selected': hasPossibleBulkAction && isSelected,
      'is-hovered': isHovered,
      'has-bulk-actions': hasPossibleBulkAction
    }),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: () => {
      isTouchDeviceRef.current = true;
    },
    onClick: () => {
      if (!hasPossibleBulkAction) {
        return;
      }
      if (!isTouchDeviceRef.current && document.getSelection()?.type !== 'Range') {
        onChangeSelection(selection.includes(id) ? selection.filter(itemId => id !== itemId) : [id]);
      }
    },
    children: [hasBulkActions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("td", {
      className: "dataviews-view-table__checkbox-column",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "dataviews-view-table__cell-content-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_dataviews_selection_checkbox__WEBPACK_IMPORTED_MODULE_6__["default"], {
          item: item,
          selection: selection,
          onChangeSelection: onChangeSelection,
          getItemId: getItemId,
          titleField: titleField,
          disabled: !hasPossibleBulkAction
        })
      })
    }), hasPrimaryColumn && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_column_primary__WEBPACK_IMPORTED_MODULE_7__["default"], {
        item: item,
        level: level,
        titleField: showTitle ? titleField : undefined,
        mediaField: showMedia ? mediaField : undefined,
        descriptionField: showDescription ? descriptionField : undefined,
        isItemClickable: isItemClickable,
        onClickItem: onClickItem
      })
    }), columns.map(column => {
      var _view$layout$styles$c;
      // Explicit picks the supported styles.
      const {
        width,
        maxWidth,
        minWidth
      } = (_view$layout$styles$c = view.layout?.styles?.[column]) !== null && _view$layout$styles$c !== void 0 ? _view$layout$styles$c : {};
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("td", {
        style: {
          width,
          maxWidth,
          minWidth
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(TableColumnField, {
          fields: fields,
          item: item,
          column: column
        })
      }, column);
    }), !!actions?.length &&
    /*#__PURE__*/
    // Disable reason: we are not making the element interactive,
    // but preventing any click events from bubbling up to the
    // table row. This allows us to add a click handler to the row
    // itself (to toggle row selection) without erroneously
    // intercepting click events from ItemActions.
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("td", {
      className: "dataviews-view-table__actions-column",
      onClick: e => e.stopPropagation(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_dataviews_item_actions__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: item,
        actions: actions
      })
    })
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */]
  });
}
function ViewTable({
  actions,
  data,
  fields,
  getItemId,
  getItemLevel,
  isLoading = false,
  onChangeView,
  onChangeSelection,
  selection,
  setOpenedFilter,
  onClickItem,
  isItemClickable,
  view
}) {
  var _view$fields2;
  const headerMenuRefs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(new Map());
  const headerMenuToFocusRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)();
  const [nextHeaderMenuToFocus, setNextHeaderMenuToFocus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)();
  const hasBulkActions = (0,_components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_5__.useSomeItemHasAPossibleBulkAction)(actions, data);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (headerMenuToFocusRef.current) {
      headerMenuToFocusRef.current.focus();
      headerMenuToFocusRef.current = undefined;
    }
  });
  const tableNoticeId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useId)();
  if (nextHeaderMenuToFocus) {
    // If we need to force focus, we short-circuit rendering here
    // to prevent any additional work while we handle that.
    // Clearing out the focus directive is necessary to make sure
    // future renders don't cause unexpected focus jumps.
    headerMenuToFocusRef.current = nextHeaderMenuToFocus;
    setNextHeaderMenuToFocus(undefined);
    return;
  }
  const onHide = field => {
    const hidden = headerMenuRefs.current.get(field.id);
    const fallback = hidden ? headerMenuRefs.current.get(hidden.fallback) : undefined;
    setNextHeaderMenuToFocus(fallback?.node);
  };
  const hasData = !!data?.length;
  const titleField = fields.find(field => field.id === view.titleField);
  const mediaField = fields.find(field => field.id === view.mediaField);
  const descriptionField = fields.find(field => field.id === view.descriptionField);
  const {
    showTitle = true,
    showMedia = true,
    showDescription = true
  } = view;
  const hasPrimaryColumn = titleField && showTitle || mediaField && showMedia || descriptionField && showDescription;
  const columns = (_view$fields2 = view.fields) !== null && _view$fields2 !== void 0 ? _view$fields2 : [];
  const headerMenuRef = (column, index) => node => {
    if (node) {
      headerMenuRefs.current.set(column, {
        node,
        fallback: columns[index > 0 ? index - 1 : 1]
      });
    } else {
      headerMenuRefs.current.delete(column);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("table", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])('dataviews-view-table', {
        [`has-${view.layout?.density}-density`]: view.layout?.density && ['compact', 'comfortable'].includes(view.layout.density)
      }),
      "aria-busy": isLoading,
      "aria-describedby": tableNoticeId,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("thead", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("tr", {
          className: "dataviews-view-table__row",
          children: [hasBulkActions && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("th", {
            className: "dataviews-view-table__checkbox-column",
            scope: "col",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_dataviews_bulk_actions__WEBPACK_IMPORTED_MODULE_5__.BulkSelectionCheckbox, {
              selection: selection,
              onChangeSelection: onChangeSelection,
              data: data,
              actions: actions,
              getItemId: getItemId
            })
          }), hasPrimaryColumn && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("th", {
            scope: "col",
            children: titleField && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_column_header_menu__WEBPACK_IMPORTED_MODULE_9__["default"], {
              ref: headerMenuRef(titleField.id, 0),
              fieldId: titleField.id,
              view: view,
              fields: fields,
              onChangeView: onChangeView,
              onHide: onHide,
              setOpenedFilter: setOpenedFilter,
              canMove: false
            })
          }), columns.map((column, index) => {
            var _view$layout$styles$c2;
            // Explicit picks the supported styles.
            const {
              width,
              maxWidth,
              minWidth
            } = (_view$layout$styles$c2 = view.layout?.styles?.[column]) !== null && _view$layout$styles$c2 !== void 0 ? _view$layout$styles$c2 : {};
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("th", {
              style: {
                width,
                maxWidth,
                minWidth
              },
              "aria-sort": view.sort?.direction && view.sort?.field === column ? _constants__WEBPACK_IMPORTED_MODULE_10__.sortValues[view.sort.direction] : undefined,
              scope: "col",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_column_header_menu__WEBPACK_IMPORTED_MODULE_9__["default"], {
                ref: headerMenuRef(column, index),
                fieldId: column,
                view: view,
                fields: fields,
                onChangeView: onChangeView,
                onHide: onHide,
                setOpenedFilter: setOpenedFilter
              })
            }, column);
          }), !!actions?.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("th", {
            className: "dataviews-view-table__actions-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              className: "dataviews-view-table-header",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Actions')
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("tbody", {
        children: hasData && data.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(TableRow, {
          item: item,
          level: view.showLevels && typeof getItemLevel === 'function' ? getItemLevel(item) : undefined,
          hasBulkActions: hasBulkActions,
          actions: actions,
          fields: fields,
          id: getItemId(item) || index.toString(),
          view: view,
          titleField: titleField,
          mediaField: mediaField,
          descriptionField: descriptionField,
          selection: selection,
          getItemId: getItemId,
          onChangeSelection: onChangeSelection,
          onClickItem: onClickItem,
          isItemClickable: isItemClickable
        }, getItemId(item)))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !hasData && !isLoading
      }),
      id: tableNoticeId,
      children: !hasData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No results')
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTable);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/utils/get-clickable-item-props.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews-layouts/utils/get-clickable-item-props.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClickableItemProps)
/* harmony export */ });
function getClickableItemProps({
  item,
  isItemClickable,
  onClickItem,
  className
}) {
  if (!isItemClickable(item) || !onClickItem) {
    return {
      className
    };
  }
  return {
    className: className ? `${className} ${className}--clickable` : undefined,
    role: 'button',
    tabIndex: 0,
    onClick: event => {
      // Prevents onChangeSelection from triggering.
      event.stopPropagation();
      onClickItem(item);
    },
    onKeyDown: event => {
      if (event.key === 'Enter' || event.key === '' || event.key === ' ') {
        // Prevents onChangeSelection from triggering.
        event.stopPropagation();
        onClickItem(item);
      }
    }
  };
}
//# sourceMappingURL=get-clickable-item-props.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/datetime.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/datetime.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Internal dependencies
 */

function sort(a, b, direction) {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();
  return direction === 'asc' ? timeA - timeB : timeB - timeA;
}
function isValid(value, context) {
  if (context?.elements) {
    const validValues = context?.elements.map(f => f.value);
    if (!validValues.includes(value)) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sort,
  isValid,
  Edit: 'datetime'
});
//# sourceMappingURL=datetime.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFieldTypeDefinition)
/* harmony export */ });
/* harmony import */ var _integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integer */ "./node_modules/@wordpress/dataviews/build-module/field-types/integer.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ "./node_modules/@wordpress/dataviews/build-module/field-types/text.js");
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datetime */ "./node_modules/@wordpress/dataviews/build-module/field-types/datetime.js");
/**
 * Internal dependencies
 */





/**
 *
 * @param {FieldType} type The field type definition to get.
 *
 * @return A field type definition.
 */
function getFieldTypeDefinition(type) {
  if ('integer' === type) {
    return _integer__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  if ('text' === type) {
    return _text__WEBPACK_IMPORTED_MODULE_1__["default"];
  }
  if ('datetime' === type) {
    return _datetime__WEBPACK_IMPORTED_MODULE_2__["default"];
  }
  return {
    sort: (a, b, direction) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return direction === 'asc' ? a - b : b - a;
      }
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    },
    isValid: (value, context) => {
      if (context?.elements) {
        const validValues = context?.elements?.map(f => f.value);
        if (!validValues.includes(value)) {
          return false;
        }
      }
      return true;
    },
    Edit: () => null
  };
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/integer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/integer.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Internal dependencies
 */

function sort(a, b, direction) {
  return direction === 'asc' ? a - b : b - a;
}
function isValid(value, context) {
  // TODO: this implicitly means the value is required.
  if (value === '') {
    return false;
  }
  if (!Number.isInteger(Number(value))) {
    return false;
  }
  if (context?.elements) {
    const validValues = context?.elements.map(f => f.value);
    if (!validValues.includes(Number(value))) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sort,
  isValid,
  Edit: 'integer'
});
//# sourceMappingURL=integer.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/text.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/text.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Internal dependencies
 */

function sort(valueA, valueB, direction) {
  return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
}
function isValid(value, context) {
  if (context?.elements) {
    const validValues = context?.elements?.map(f => f.value);
    if (!validValues.includes(value)) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sort,
  isValid,
  Edit: 'text'
});
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/lock-unlock.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lock: () => (/* binding */ lock),
/* harmony export */   unlock: () => (/* binding */ unlock)
/* harmony export */ });
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/private-apis */ "@wordpress/private-apis");
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const {
  lock,
  unlock
} = (0,_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__.__dangerousOptInToUnstableAPIsOnlyForCoreModules)('I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.', '@wordpress/dataviews');
//# sourceMappingURL=lock-unlock.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/normalize-fields.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeFields: () => (/* binding */ normalizeFields)
/* harmony export */ });
/* harmony import */ var _field_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field-types */ "./node_modules/@wordpress/dataviews/build-module/field-types/index.js");
/* harmony import */ var _dataform_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataform-controls */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/index.js");
/**
 * Internal dependencies
 */


const getValueFromId = id => ({
  item
}) => {
  const path = id.split('.');
  let value = item;
  for (const segment of path) {
    if (value.hasOwnProperty(segment)) {
      value = value[segment];
    } else {
      value = undefined;
    }
  }
  return value;
};

/**
 * Apply default values and normalize the fields config.
 *
 * @param fields Fields config.
 * @return Normalized fields config.
 */
function normalizeFields(fields) {
  return fields.map(field => {
    var _field$sort, _field$isValid, _field$enableHiding, _field$enableSorting;
    const fieldTypeDefinition = (0,_field_types__WEBPACK_IMPORTED_MODULE_0__["default"])(field.type);
    const getValue = field.getValue || getValueFromId(field.id);
    const sort = (_field$sort = field.sort) !== null && _field$sort !== void 0 ? _field$sort : function sort(a, b, direction) {
      return fieldTypeDefinition.sort(getValue({
        item: a
      }), getValue({
        item: b
      }), direction);
    };
    const isValid = (_field$isValid = field.isValid) !== null && _field$isValid !== void 0 ? _field$isValid : function isValid(item, context) {
      return fieldTypeDefinition.isValid(getValue({
        item
      }), context);
    };
    const Edit = (0,_dataform_controls__WEBPACK_IMPORTED_MODULE_1__.getControl)(field, fieldTypeDefinition);
    const renderFromElements = ({
      item
    }) => {
      const value = getValue({
        item
      });
      return field?.elements?.find(element => element.value === value)?.label || getValue({
        item
      });
    };
    const render = field.render || (field.elements ? renderFromElements : getValue);
    return {
      ...field,
      label: field.label || field.id,
      header: field.header || field.label || field.id,
      getValue,
      render,
      sort,
      isValid,
      Edit,
      enableHiding: (_field$enableHiding = field.enableHiding) !== null && _field$enableHiding !== void 0 ? _field$enableHiding : true,
      enableSorting: (_field$enableSorting = field.enableSorting) !== null && _field$enableSorting !== void 0 ? _field$enableSorting : true
    };
  });
}
//# sourceMappingURL=normalize-fields.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitizeOperators: () => (/* binding */ sanitizeOperators)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/**
 * Internal dependencies
 */

function sanitizeOperators(field) {
  let operators = field.filterBy?.operators;

  // Assign default values.
  if (!operators || !Array.isArray(operators)) {
    operators = [_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_ANY, _constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_NONE];
  }

  // Make sure only valid operators are used.
  operators = operators.filter(operator => _constants__WEBPACK_IMPORTED_MODULE_0__.ALL_OPERATORS.includes(operator));

  // Do not allow mixing single & multiselection operators.
  // Remove multiselection operators if any of the single selection ones is present.
  if (operators.includes(_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS) || operators.includes(_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_NOT)) {
    operators = operators.filter(operator => [_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS, _constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_NOT].includes(operator));
  }
  return operators;
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-down.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-down.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const arrowDown = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "m16.5 13.5-3.7 3.7V4h-1.5v13.2l-3.8-3.7-1 1 5.5 5.6 5.5-5.6z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrowDown);
//# sourceMappingURL=arrow-down.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-left.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-left.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const arrowLeft = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M20 11.2H6.8l3.7-3.7-1-1L3.9 12l5.6 5.5 1-1-3.7-3.7H20z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrowLeft);
//# sourceMappingURL=arrow-left.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-right.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-right.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const arrowRight = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "m14.5 6.5-1 1 3.7 3.7H4v1.6h13.2l-3.7 3.7 1 1 5.6-5.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrowRight);
//# sourceMappingURL=arrow-right.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-up.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/arrow-up.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const arrowUp = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M12 3.9 6.5 9.5l1 1 3.8-3.7V20h1.5V6.8l3.7 3.7 1-1z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrowUp);
//# sourceMappingURL=arrow-up.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/block-table.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/block-table.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const blockTable = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v3.5h-15V5c0-.3.2-.5.5-.5zm8 5.5h6.5v3.5H13V10zm-1.5 3.5h-7V10h7v3.5zm-7 5.5v-4h7v4.5H5c-.3 0-.5-.2-.5-.5zm14.5.5h-6V15h6.5v4c0 .3-.2.5-.5.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (blockTable);
//# sourceMappingURL=block-table.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/category.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/category.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const category = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z",
    fillRule: "evenodd",
    clipRule: "evenodd"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (category);
//# sourceMappingURL=category.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/check.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/check.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const check = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (check);
//# sourceMappingURL=check.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/chevron-down.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/chevron-down.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const chevronDown = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chevronDown);
//# sourceMappingURL=chevron-down.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/chevron-up.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/chevron-up.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const chevronUp = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chevronUp);
//# sourceMappingURL=chevron-up.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const closeSmall = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (closeSmall);
//# sourceMappingURL=close-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/cog.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/cog.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const cog = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    fillRule: "evenodd",
    d: "M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z",
    clipRule: "evenodd"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cog);
//# sourceMappingURL=cog.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/format-list-bullets-rtl.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/format-list-bullets-rtl.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const formatListBulletsRTL = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M4 8.8h8.9V7.2H4v1.6zm0 7h8.9v-1.5H4v1.5zM18 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatListBulletsRTL);
//# sourceMappingURL=format-list-bullets-rtl.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/format-list-bullets.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/format-list-bullets.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const formatListBullets = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatListBullets);
//# sourceMappingURL=format-list-bullets.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/funnel.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/funnel.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const funnel = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M10 17.5H14V16H10V17.5ZM6 6V7.5H18V6H6ZM8 12.5H16V11H8V12.5Z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (funnel);
//# sourceMappingURL=funnel.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/lock.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/lock.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const lock = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M17 10h-1.2V7c0-2.1-1.7-3.8-3.8-3.8-2.1 0-3.8 1.7-3.8 3.8v3H7c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h10c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1zm-2.8 0H9.8V7c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v3z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lock);
//# sourceMappingURL=lock.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/more-vertical.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/more-vertical.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const moreVertical = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moreVertical);
//# sourceMappingURL=more-vertical.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/next.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/next.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const next = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M6.6 6L5.4 7l4.5 5-4.5 5 1.1 1 5.5-6-5.4-6zm6 0l-1.1 1 4.5 5-4.5 5 1.1 1 5.5-6-5.5-6z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next);
//# sourceMappingURL=next.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/previous.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/previous.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const previous = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M11.6 7l-1.1-1L5 12l5.5 6 1.1-1L7 12l4.6-5zm6 0l-1.1-1-5.5 6 5.5 6 1.1-1-4.6-5 4.6-5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (previous);
//# sourceMappingURL=previous.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/search.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/search.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const search = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);
//# sourceMappingURL=search.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/seen.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/seen.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const seen = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M3.99961 13C4.67043 13.3354 4.6703 13.3357 4.67017 13.3359L4.67298 13.3305C4.67621 13.3242 4.68184 13.3135 4.68988 13.2985C4.70595 13.2686 4.7316 13.2218 4.76695 13.1608C4.8377 13.0385 4.94692 12.8592 5.09541 12.6419C5.39312 12.2062 5.84436 11.624 6.45435 11.0431C7.67308 9.88241 9.49719 8.75 11.9996 8.75C14.502 8.75 16.3261 9.88241 17.5449 11.0431C18.1549 11.624 18.6061 12.2062 18.9038 12.6419C19.0523 12.8592 19.1615 13.0385 19.2323 13.1608C19.2676 13.2218 19.2933 13.2686 19.3093 13.2985C19.3174 13.3135 19.323 13.3242 19.3262 13.3305L19.3291 13.3359C19.3289 13.3357 19.3288 13.3354 19.9996 13C20.6704 12.6646 20.6703 12.6643 20.6701 12.664L20.6697 12.6632L20.6688 12.6614L20.6662 12.6563L20.6583 12.6408C20.6517 12.6282 20.6427 12.6108 20.631 12.5892C20.6078 12.5459 20.5744 12.4852 20.5306 12.4096C20.4432 12.2584 20.3141 12.0471 20.1423 11.7956C19.7994 11.2938 19.2819 10.626 18.5794 9.9569C17.1731 8.61759 14.9972 7.25 11.9996 7.25C9.00203 7.25 6.82614 8.61759 5.41987 9.9569C4.71736 10.626 4.19984 11.2938 3.85694 11.7956C3.68511 12.0471 3.55605 12.2584 3.4686 12.4096C3.42484 12.4852 3.39142 12.5459 3.36818 12.5892C3.35656 12.6108 3.34748 12.6282 3.34092 12.6408L3.33297 12.6563L3.33041 12.6614L3.32948 12.6632L3.32911 12.664C3.32894 12.6643 3.32879 12.6646 3.99961 13ZM11.9996 16C13.9326 16 15.4996 14.433 15.4996 12.5C15.4996 10.567 13.9326 9 11.9996 9C10.0666 9 8.49961 10.567 8.49961 12.5C8.49961 14.433 10.0666 16 11.9996 16Z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (seen);
//# sourceMappingURL=seen.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/unseen.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/node_modules/@wordpress/icons/build-module/library/unseen.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const unseen = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M20.7 12.7s0-.1-.1-.2c0-.2-.2-.4-.4-.6-.3-.5-.9-1.2-1.6-1.8-.7-.6-1.5-1.3-2.6-1.8l-.6 1.4c.9.4 1.6 1 2.1 1.5.6.6 1.1 1.2 1.4 1.6.1.2.3.4.3.5v.1l.7-.3.7-.3Zm-5.2-9.3-1.8 4c-.5-.1-1.1-.2-1.7-.2-3 0-5.2 1.4-6.6 2.7-.7.7-1.2 1.3-1.6 1.8-.2.3-.3.5-.4.6 0 0 0 .1-.1.2s0 0 .7.3l.7.3V13c0-.1.2-.3.3-.5.3-.4.7-1 1.4-1.6 1.2-1.2 3-2.3 5.5-2.3H13v.3c-.4 0-.8-.1-1.1-.1-1.9 0-3.5 1.6-3.5 3.5s.6 2.3 1.6 2.9l-2 4.4.9.4 7.6-16.2-.9-.4Zm-3 12.6c1.7-.2 3-1.7 3-3.5s-.2-1.4-.6-1.9L12.4 16Z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unseen);
//# sourceMappingURL=unseen.js.map

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternTabs.js":
/*!***************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternTabs.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PatternsLocalView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PatternsLocalView */ "./src/js/react/views/patterns/components/PatternsLocalView.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var TabItem = function TabItem(_ref) {
  var label = _ref.label,
    active = _ref.active,
    onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onClick,
    className: active ? 'active' : ''
  }, label));
};
var PatternTabs = function PatternTabs() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('local'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var currentPath = window.location.pathname;
  var router = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
  var navigate = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.useNavigate)({
    from: '/'
  });
  console.log(router);

  /**
   * Check if the tab is active.
   *
   * @param {string} tabName The tab name.
   * @param {string} path    The path.
   * @return {boolean}       True or false.
   */
  var isTabActive = function isTabActive(tabName, path) {
    if (tabName === activeTab) {
      return true;
    }
    var pathOptions = [path, '/' + path];
    return pathOptions.includes(currentPath);
  };

  /**
   * Set the current tab/path.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // const queryArgs = getQueryArgs( window.location.href );
    // if ( queryArgs.tab ) {
    // 	setActiveTab( queryArgs.tab );
    // }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "nav-tab-wrapper"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, "sajklf"), /*#__PURE__*/React.createElement(TabItem, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Local Patterns', 'pattern-wrangler'),
    active: isTabActive('local', 'patterns'),
    onClick: function onClick(e) {
      e.preventDefault();
      navigate({
        to: '/local'
      });
      //setActiveTab( 'local' );
    }
  }), /*#__PURE__*/React.createElement(TabItem, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Registered Patterns', 'pattern-wrangler'),
    active: isTabActive('registered', 'patterns'),
    onClick: function onClick(e) {
      e.preventDefault();
      navigate({
        to: '/registered'
      });
      //setActiveTab( 'registered' );
    }
  })), /*#__PURE__*/React.createElement(_PatternsLocalView__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternTabs);

/***/ }),

/***/ "./src/js/react/views/patterns/components/PatternsLocalView.js":
/*!*********************************************************************!*\
  !*** ./src/js/react/views/patterns/components/PatternsLocalView.js ***!
  \*********************************************************************/
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
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/components/dataviews/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store */ "./src/js/react/views/patterns/store/index.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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










var defaultLayouts = {
  grid: {
    layout: {
      titleField: 'pattern-title',
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
  id: 'pattern-title',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title', 'dlx-pattern-wrangler'),
  render: function render(_ref) {
    var item = _ref.item;
    return /*#__PURE__*/React.createElement("span", null, item.title);
  },
  enableSorting: true
}, {
  id: 'pattern-view-json',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preview', 'dlx-pattern-wrangler'),
  getValue: function getValue(_ref2) {
    var item = _ref2.item;
    // Generate preview URL instead of using srcDoc
    // todo: secure with nonce.
    var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "#pattern-preview-content") : '';
    return /*#__PURE__*/React.createElement("div", {
      className: "pattern-preview-wrapper"
    }, /*#__PURE__*/React.createElement("iframe", {
      key: "preview-".concat(item.id),
      src: previewUrl,
      title: "Preview: ".concat(item.title),
      style: {
        width: item.viewportWidth + 'px' || 0,
        height: '100%',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        scrolling: 'no'
      },
      sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
      loading: "lazy"
    }));
  },
  isVisible: function isVisible(newView) {
    return false;
  },
  enableSorting: false
}, {
  id: 'pattern-categories',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Categories', 'dlx-pattern-wrangler'),
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
  enableSorting: false
}, {
  id: 'author',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Author', 'dlx-pattern-wrangler'),
  type: 'text',
  getValue: function getValue(_ref4) {
    var item = _ref4.item;
    return item.author;
  }
}];
var actions = [{
  id: 'edit',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit', 'dlx-pattern-wrangler'),
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
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Pattern', 'dlx-pattern-wrangler'),
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
  id: 'copy',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy Pattern', 'dlx-pattern-wrangler'),
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
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Export', 'dlx-pattern-wrangler'),
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
var fetchPatterns = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref5) {
    var perPage, page, search, sort, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          perPage = _ref5.perPage, page = _ref5.page, search = _ref5.search, sort = _ref5.sort;
          _context.next = 3;
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
            path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)('/dlxplugins/pattern-wrangler/v1/patterns/all/', {
              perPage: perPage,
              page: page,
              search: search,
              orderby: sort.field,
              order: sort.direction
            }),
            method: 'GET'
          });
        case 3:
          response = _context.sent;
          return _context.abrupt("return", response);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchPatterns(_x) {
    return _ref6.apply(this, arguments);
  };
}();

// Get query args from current URL.
var queryArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.getQueryArgs)(window.location.href);
var PatternsLocalView = function PatternsLocalView() {
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
    categories = _useState6[0],
    setCategories = _useState6[1];
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__["default"]),
    setViewType = _useDispatch.setViewType;
  var fields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return [{
      id: 'pattern-title',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title', 'dlx-pattern-wrangler'),
      render: function render(_ref7) {
        var item = _ref7.item;
        return /*#__PURE__*/React.createElement("span", null, item.title);
      },
      enableSorting: true,
      enableHiding: false,
      enableGlobalSearch: true
    }, {
      id: 'pattern-view-json',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Preview', 'dlx-pattern-wrangler'),
      getValue: function getValue(_ref8) {
        var item = _ref8.item;
        var viewportWidth = item.viewportWidth || 1200;
        var previewUrl = item !== null && item !== void 0 && item.id ? "".concat(ajaxurl, "/?action=dlxpw_pattern_preview&pattern_id=").concat(item.id, "&viewport_width=").concat(viewportWidth) : '';
        return /*#__PURE__*/React.createElement("div", {
          className: "pattern-preview-wrapper"
        }, /*#__PURE__*/React.createElement("div", {
          className: "pattern-preview-iframe-scale-container"
        }, /*#__PURE__*/React.createElement("div", {
          className: "pattern-preview-iframe-wrapper"
        }, /*#__PURE__*/React.createElement("iframe", {
          key: "preview-".concat(item.id),
          src: previewUrl,
          title: "Preview: ".concat(item.title),
          style: {
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            overflow: 'hidden',
            scrolling: 'no'
          },
          sandbox: "allow-same-origin allow-scripts allow-popups allow-forms",
          loading: "lazy"
        }))));
      },
      enableSorting: false,
      enableHiding: false
    }, {
      id: 'pattern-categories',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Categories', 'dlx-pattern-wrangler'),
      render: function render(_ref9) {
        var _item$categories2;
        var item = _ref9.item;
        return item === null || item === void 0 || (_item$categories2 = item.categories) === null || _item$categories2 === void 0 ? void 0 : _item$categories2.map(function (category, index) {
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
      enableHiding: true
    }, {
      id: 'author',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Author', 'dlx-pattern-wrangler'),
      type: 'text',
      getValue: function getValue(_ref10) {
        var item = _ref10.item;
        return item.author;
      },
      enableSorting: false,
      enableHiding: true
    }];
  }, [view]);
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      type: 'grid',
      search: '',
      perPage: 10,
      previewSize: 'large',
      page: 1,
      sort: {
        field: 'pattern-title',
        direction: 'asc'
      },
      titleField: 'pattern-title',
      mediaField: 'pattern-view-json',
      layout: defaultLayouts.grid.layout,
      fields: _toConsumableArray(fields),
      viewConfigOptions: {}
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    view = _useState8[0],
    setView = _useState8[1];
  var _useQuery = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useQuery)({
      queryKey: ['all-patterns', view.perPage, view.page, view.search, view.sort],
      queryFn: function queryFn() {
        return fetchPatterns({
          perPage: view.perPage,
          page: view.page,
          search: view.search,
          sort: view.sort
        });
      }
    }),
    data = _useQuery.data,
    isLoading = _useQuery.isLoading,
    error = _useQuery.error;

  /**
   * When a view is changed, we need to adjust the fields and showMedia based on the view type.
   *
   * @param {Object} newView The new view object.
   */
  var onChangeView = function onChangeView(newView) {
    var _newView$sort;
    // Adjust fields based on view type
    if (newView.type === 'grid') {
      newView.fields = ['pattern-categories', 'author'];
      newView.showMedia = true;
    } else {
      newView.fields = ['pattern-view-json', 'pattern-categories', 'author'];
      newView.showMedia = false;
    }

    // Create query args object with view state.
    var queryArgs = {
      page: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.getQueryArgs)(window.location.href).page,
      paged: newView.page,
      per_page: newView.perPage,
      view_type: newView.type
    };

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
    var newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.addQueryArgs)(window.location.pathname, queryArgs);
    window.history.pushState({}, '', newUrl);

    // Update the view state.
    setView(newView);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (data && data.hasOwnProperty('patterns')) {
      if (data.patterns) {
        if (data.patterns !== patterns) {
          setPatterns(data.patterns);
        }
      }
      if (data.categories) {
        setCategories(data.categories);
      }
    }
  }, [data]);
  if (error) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dlx-patterns-error"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error loading patterns:', 'dlx-pattern-wrangler'), " ", error.message);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "dlx-patterns-view-container"
  }, /*#__PURE__*/React.createElement(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_8__["default"], {
    data: patterns,
    fields: fields,
    actions: actions,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Patterns', 'dlx-pattern-wrangler'),
    view: view,
    onChangeView: onChangeView,
    paginationInfo: {
      totalItems: patterns.length,
      totalPages: 1 // Would come from API headers
    },
    selection: selectedItems,
    onChangeSelection: setSelectedItems,
    isLoading: isLoading,
    defaultLayouts: defaultLayouts,
    searchLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search Patterns', 'dlx-pattern-wrangler')
  }), "``");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternsLocalView);

/***/ }),

/***/ "./src/js/react/views/patterns/index.js":
/*!**********************************************!*\
  !*** ./src/js/react/views/patterns/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/history/dist/esm/index.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/router.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/modern/queryClient.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _components_PatternTabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/PatternTabs */ "./src/js/react/views/patterns/components/PatternTabs.js");
/* harmony import */ var _styles_patterns_view_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/patterns-view.scss */ "./src/js/react/views/patterns/styles/patterns-view.scss");






// Create a hash history instance with the WordPress admin path
var hashHistory = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createHashHistory)({
  initialEntries: ['/']
});
// Create the root route
var rootRoute = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.createRootRoute)({
  component: function component() {
    return /*#__PURE__*/React.createElement(_components_PatternTabs__WEBPACK_IMPORTED_MODULE_1__["default"], null);
  }
});

// Define your routes with different components or views
var indexRoute = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.createRoute)({
  getParentRoute: function getParentRoute() {
    return rootRoute;
  },
  path: '/',
  component: _components_PatternTabs__WEBPACK_IMPORTED_MODULE_1__["default"]
});

// Local root.
var localRoute = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.createRoute)({
  getParentRoute: function getParentRoute() {
    return rootRoute;
  },
  path: '/local',
  component: _components_PatternTabs__WEBPACK_IMPORTED_MODULE_1__["default"]
});
var registeredPatternsRoute = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_4__.createRoute)({
  getParentRoute: function getParentRoute() {
    return rootRoute;
  },
  path: '/registered',
  component: _components_PatternTabs__WEBPACK_IMPORTED_MODULE_1__["default"]
});

// Include all routes in the route tree
var routeTree = rootRoute.addChildren([indexRoute, localRoute, registeredPatternsRoute]);

// Create a router instance
var router = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_5__.createRouter)({
  routeTree: routeTree,
  history: hashHistory,
  context: {
    history: hashHistory
  }
});
var container = document.getElementById('dlx-pattern-wrangler-view');
var queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.QueryClient();
if (container) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/React.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/React.createElement(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_8__.RouterProvider, {
    router: router
  })), container);
}

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

/***/ }),

/***/ "./src/js/react/views/patterns/styles/patterns-view.scss":
/*!***************************************************************!*\
  !*** ./src/js/react/views/patterns/styles/patterns-view.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/remove-accents/index.js":
/*!**********************************************!*\
  !*** ./node_modules/remove-accents/index.js ***!
  \**********************************************/
/***/ ((module) => {

var characterMap = {
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"Ấ": "A",
	"Ắ": "A",
	"Ẳ": "A",
	"Ẵ": "A",
	"Ặ": "A",
	"Æ": "AE",
	"Ầ": "A",
	"Ằ": "A",
	"Ȃ": "A",
	"Ả": "A",
	"Ạ": "A",
	"Ẩ": "A",
	"Ẫ": "A",
	"Ậ": "A",
	"Ç": "C",
	"Ḉ": "C",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"Ế": "E",
	"Ḗ": "E",
	"Ề": "E",
	"Ḕ": "E",
	"Ḝ": "E",
	"Ȇ": "E",
	"Ẻ": "E",
	"Ẽ": "E",
	"Ẹ": "E",
	"Ể": "E",
	"Ễ": "E",
	"Ệ": "E",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"Ḯ": "I",
	"Ȋ": "I",
	"Ỉ": "I",
	"Ị": "I",
	"Ð": "D",
	"Ñ": "N",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"Ố": "O",
	"Ṍ": "O",
	"Ṓ": "O",
	"Ȏ": "O",
	"Ỏ": "O",
	"Ọ": "O",
	"Ổ": "O",
	"Ỗ": "O",
	"Ộ": "O",
	"Ờ": "O",
	"Ở": "O",
	"Ỡ": "O",
	"Ớ": "O",
	"Ợ": "O",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"Ủ": "U",
	"Ụ": "U",
	"Ử": "U",
	"Ữ": "U",
	"Ự": "U",
	"Ý": "Y",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"ấ": "a",
	"ắ": "a",
	"ẳ": "a",
	"ẵ": "a",
	"ặ": "a",
	"æ": "ae",
	"ầ": "a",
	"ằ": "a",
	"ȃ": "a",
	"ả": "a",
	"ạ": "a",
	"ẩ": "a",
	"ẫ": "a",
	"ậ": "a",
	"ç": "c",
	"ḉ": "c",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"ế": "e",
	"ḗ": "e",
	"ề": "e",
	"ḕ": "e",
	"ḝ": "e",
	"ȇ": "e",
	"ẻ": "e",
	"ẽ": "e",
	"ẹ": "e",
	"ể": "e",
	"ễ": "e",
	"ệ": "e",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"ḯ": "i",
	"ȋ": "i",
	"ỉ": "i",
	"ị": "i",
	"ð": "d",
	"ñ": "n",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"ố": "o",
	"ṍ": "o",
	"ṓ": "o",
	"ȏ": "o",
	"ỏ": "o",
	"ọ": "o",
	"ổ": "o",
	"ỗ": "o",
	"ộ": "o",
	"ờ": "o",
	"ở": "o",
	"ỡ": "o",
	"ớ": "o",
	"ợ": "o",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"ủ": "u",
	"ụ": "u",
	"ử": "u",
	"ữ": "u",
	"ự": "u",
	"ý": "y",
	"ÿ": "y",
	"Ā": "A",
	"ā": "a",
	"Ă": "A",
	"ă": "a",
	"Ą": "A",
	"ą": "a",
	"Ć": "C",
	"ć": "c",
	"Ĉ": "C",
	"ĉ": "c",
	"Ċ": "C",
	"ċ": "c",
	"Č": "C",
	"č": "c",
	"C̆": "C",
	"c̆": "c",
	"Ď": "D",
	"ď": "d",
	"Đ": "D",
	"đ": "d",
	"Ē": "E",
	"ē": "e",
	"Ĕ": "E",
	"ĕ": "e",
	"Ė": "E",
	"ė": "e",
	"Ę": "E",
	"ę": "e",
	"Ě": "E",
	"ě": "e",
	"Ĝ": "G",
	"Ǵ": "G",
	"ĝ": "g",
	"ǵ": "g",
	"Ğ": "G",
	"ğ": "g",
	"Ġ": "G",
	"ġ": "g",
	"Ģ": "G",
	"ģ": "g",
	"Ĥ": "H",
	"ĥ": "h",
	"Ħ": "H",
	"ħ": "h",
	"Ḫ": "H",
	"ḫ": "h",
	"Ĩ": "I",
	"ĩ": "i",
	"Ī": "I",
	"ī": "i",
	"Ĭ": "I",
	"ĭ": "i",
	"Į": "I",
	"į": "i",
	"İ": "I",
	"ı": "i",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"Ḱ": "K",
	"ḱ": "k",
	"K̆": "K",
	"k̆": "k",
	"Ĺ": "L",
	"ĺ": "l",
	"Ļ": "L",
	"ļ": "l",
	"Ľ": "L",
	"ľ": "l",
	"Ŀ": "L",
	"ŀ": "l",
	"Ł": "l",
	"ł": "l",
	"Ḿ": "M",
	"ḿ": "m",
	"M̆": "M",
	"m̆": "m",
	"Ń": "N",
	"ń": "n",
	"Ņ": "N",
	"ņ": "n",
	"Ň": "N",
	"ň": "n",
	"ŉ": "n",
	"N̆": "N",
	"n̆": "n",
	"Ō": "O",
	"ō": "o",
	"Ŏ": "O",
	"ŏ": "o",
	"Ő": "O",
	"ő": "o",
	"Œ": "OE",
	"œ": "oe",
	"P̆": "P",
	"p̆": "p",
	"Ŕ": "R",
	"ŕ": "r",
	"Ŗ": "R",
	"ŗ": "r",
	"Ř": "R",
	"ř": "r",
	"R̆": "R",
	"r̆": "r",
	"Ȓ": "R",
	"ȓ": "r",
	"Ś": "S",
	"ś": "s",
	"Ŝ": "S",
	"ŝ": "s",
	"Ş": "S",
	"Ș": "S",
	"ș": "s",
	"ş": "s",
	"Š": "S",
	"š": "s",
	"Ţ": "T",
	"ţ": "t",
	"ț": "t",
	"Ț": "T",
	"Ť": "T",
	"ť": "t",
	"Ŧ": "T",
	"ŧ": "t",
	"T̆": "T",
	"t̆": "t",
	"Ũ": "U",
	"ũ": "u",
	"Ū": "U",
	"ū": "u",
	"Ŭ": "U",
	"ŭ": "u",
	"Ů": "U",
	"ů": "u",
	"Ű": "U",
	"ű": "u",
	"Ų": "U",
	"ų": "u",
	"Ȗ": "U",
	"ȗ": "u",
	"V̆": "V",
	"v̆": "v",
	"Ŵ": "W",
	"ŵ": "w",
	"Ẃ": "W",
	"ẃ": "w",
	"X̆": "X",
	"x̆": "x",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Y̆": "Y",
	"y̆": "y",
	"Ź": "Z",
	"ź": "z",
	"Ż": "Z",
	"ż": "z",
	"Ž": "Z",
	"ž": "z",
	"ſ": "s",
	"ƒ": "f",
	"Ơ": "O",
	"ơ": "o",
	"Ư": "U",
	"ư": "u",
	"Ǎ": "A",
	"ǎ": "a",
	"Ǐ": "I",
	"ǐ": "i",
	"Ǒ": "O",
	"ǒ": "o",
	"Ǔ": "U",
	"ǔ": "u",
	"Ǖ": "U",
	"ǖ": "u",
	"Ǘ": "U",
	"ǘ": "u",
	"Ǚ": "U",
	"ǚ": "u",
	"Ǜ": "U",
	"ǜ": "u",
	"Ứ": "U",
	"ứ": "u",
	"Ṹ": "U",
	"ṹ": "u",
	"Ǻ": "A",
	"ǻ": "a",
	"Ǽ": "AE",
	"ǽ": "ae",
	"Ǿ": "O",
	"ǿ": "o",
	"Þ": "TH",
	"þ": "th",
	"Ṕ": "P",
	"ṕ": "p",
	"Ṥ": "S",
	"ṥ": "s",
	"X́": "X",
	"x́": "x",
	"Ѓ": "Г",
	"ѓ": "г",
	"Ќ": "К",
	"ќ": "к",
	"A̋": "A",
	"a̋": "a",
	"E̋": "E",
	"e̋": "e",
	"I̋": "I",
	"i̋": "i",
	"Ǹ": "N",
	"ǹ": "n",
	"Ồ": "O",
	"ồ": "o",
	"Ṑ": "O",
	"ṑ": "o",
	"Ừ": "U",
	"ừ": "u",
	"Ẁ": "W",
	"ẁ": "w",
	"Ỳ": "Y",
	"ỳ": "y",
	"Ȁ": "A",
	"ȁ": "a",
	"Ȅ": "E",
	"ȅ": "e",
	"Ȉ": "I",
	"ȉ": "i",
	"Ȍ": "O",
	"ȍ": "o",
	"Ȑ": "R",
	"ȑ": "r",
	"Ȕ": "U",
	"ȕ": "u",
	"B̌": "B",
	"b̌": "b",
	"Č̣": "C",
	"č̣": "c",
	"Ê̌": "E",
	"ê̌": "e",
	"F̌": "F",
	"f̌": "f",
	"Ǧ": "G",
	"ǧ": "g",
	"Ȟ": "H",
	"ȟ": "h",
	"J̌": "J",
	"ǰ": "j",
	"Ǩ": "K",
	"ǩ": "k",
	"M̌": "M",
	"m̌": "m",
	"P̌": "P",
	"p̌": "p",
	"Q̌": "Q",
	"q̌": "q",
	"Ř̩": "R",
	"ř̩": "r",
	"Ṧ": "S",
	"ṧ": "s",
	"V̌": "V",
	"v̌": "v",
	"W̌": "W",
	"w̌": "w",
	"X̌": "X",
	"x̌": "x",
	"Y̌": "Y",
	"y̌": "y",
	"A̧": "A",
	"a̧": "a",
	"B̧": "B",
	"b̧": "b",
	"Ḑ": "D",
	"ḑ": "d",
	"Ȩ": "E",
	"ȩ": "e",
	"Ɛ̧": "E",
	"ɛ̧": "e",
	"Ḩ": "H",
	"ḩ": "h",
	"I̧": "I",
	"i̧": "i",
	"Ɨ̧": "I",
	"ɨ̧": "i",
	"M̧": "M",
	"m̧": "m",
	"O̧": "O",
	"o̧": "o",
	"Q̧": "Q",
	"q̧": "q",
	"U̧": "U",
	"u̧": "u",
	"X̧": "X",
	"x̧": "x",
	"Z̧": "Z",
	"z̧": "z",
	"й":"и",
	"Й":"И",
	"ё":"е",
	"Ё":"Е",
};

var chars = Object.keys(characterMap).join('|');
var allAccents = new RegExp(chars, 'g');
var firstAccent = new RegExp(chars, '');

function matcher(match) {
	return characterMap[match];
}

var removeAccents = function(string) {
	return string.replace(allAccents, matcher);
};

var hasAccents = function(string) {
	return !!string.match(firstAccent);
};

module.exports = removeAccents;
module.exports.has = hasAccents;
module.exports.remove = removeAccents;


/***/ }),

/***/ "./node_modules/tiny-warning/dist/tiny-warning.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-warning/dist/tiny-warning.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var isProduction = "development" === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (warning);


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      didWarnOld18Alpha ||
        void 0 === React.startTransition ||
        ((didWarnOld18Alpha = !0),
        console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
      var value = getSnapshot();
      if (!didWarnUncachedGetSnapshot) {
        var cachedValue = getSnapshot();
        objectIs(value, cachedValue) ||
          (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ),
          (didWarnUncachedGetSnapshot = !0));
      }
      cachedValue = useState({
        inst: { value: value, getSnapshot: getSnapshot }
      });
      var inst = cachedValue[0].inst,
        forceUpdate = cachedValue[1];
      useLayoutEffect(
        function () {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
        },
        [subscribe, value, getSnapshot]
      );
      useEffect(
        function () {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
          return subscribe(function () {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
          });
        },
        [subscribe]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return !0;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useState = React.useState,
      useEffect = React.useEffect,
      useLayoutEffect = React.useLayoutEffect,
      useDebugValue = React.useDebugValue,
      didWarnOld18Alpha = !1,
      didWarnUncachedGetSnapshot = !1,
      shim =
        "undefined" === typeof window ||
        "undefined" === typeof window.document ||
        "undefined" === typeof window.document.createElement
          ? useSyncExternalStore$1
          : useSyncExternalStore$2;
    exports.useSyncExternalStore =
      void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      shim = __webpack_require__(/*! use-sync-external-store/shim */ "./node_modules/use-sync-external-store/shim/index.js"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useSyncExternalStore = shim.useSyncExternalStore,
      useRef = React.useRef,
      useEffect = React.useEffect,
      useMemo = React.useMemo,
      useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function (
      subscribe,
      getSnapshot,
      getServerSnapshot,
      selector,
      isEqual
    ) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: !1, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function () {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = !0;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return (memoizedSelection = currentSelection);
              }
              return (memoizedSelection = nextSnapshot);
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot))
              return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return (memoizedSnapshot = nextSnapshot), currentSelection;
            memoizedSnapshot = nextSnapshot;
            return (memoizedSelection = nextSelection);
          }
          var hasMemo = !1,
            memoizedSnapshot,
            memoizedSelection,
            maybeGetServerSnapshot =
              void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function () {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot
              ? void 0
              : function () {
                  return memoizedSelector(maybeGetServerSnapshot());
                }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function () {
          inst.hasValue = !0;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/with-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/with-selector.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/private-apis":
/*!*************************************!*\
  !*** external ["wp","privateApis"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["privateApis"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "@wordpress/warning":
/*!*********************************!*\
  !*** external ["wp","warning"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["warning"];

/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __objRest: () => (/* binding */ __objRest),
/* harmony export */   __spreadProps: () => (/* binding */ __spreadProps),
/* harmony export */   __spreadValues: () => (/* binding */ __spreadValues)
/* harmony export */ });
"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addItemToArray: () => (/* binding */ addItemToArray),
/* harmony export */   flatten2DArray: () => (/* binding */ flatten2DArray),
/* harmony export */   reverseArray: () => (/* binding */ reverseArray),
/* harmony export */   toArray: () => (/* binding */ toArray)
/* harmony export */ });
"use client";

// src/utils/array.ts
function toArray(arg) {
  if (Array.isArray(arg)) {
    return arg;
  }
  return typeof arg !== "undefined" ? [arg] : [];
}
function addItemToArray(array, item, index = -1) {
  if (!(index in array)) {
    return [...array, item];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}
function flatten2DArray(array) {
  const flattened = [];
  for (const row of array) {
    flattened.push(...row);
  }
  return flattened;
}
function reverseArray(array) {
  return array.slice().reverse();
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/AJZ4BYF3.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/AJZ4BYF3.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCompositeStore: () => (/* binding */ createCompositeStore)
/* harmony export */ });
/* harmony import */ var _CYQWQL4J_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CYQWQL4J.js */ "./node_modules/@ariakit/core/esm/__chunks/CYQWQL4J.js");
/* harmony import */ var _7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./7PRQYBBV.js */ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js");
/* harmony import */ var _BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BCALMBPZ.js */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var _PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PBFD2E7P.js */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";






// src/composite/composite-store.ts
var NULL_ITEM = { id: null };
function findFirstEnabledItem(items, excludeId) {
  return items.find((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getEnabledItems(items, excludeId) {
  return items.filter((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getItemsInRow(items, rowId) {
  return items.filter((item) => item.rowId === rowId);
}
function flipItems(items, activeId, shouldInsertNullItem = false) {
  const index = items.findIndex((item) => item.id === activeId);
  return [
    ...items.slice(index + 1),
    ...shouldInsertNullItem ? [NULL_ITEM] : [],
    ...items.slice(0, index)
  ];
}
function groupItemsByRows(items) {
  const rows = [];
  for (const item of items) {
    const row = rows.find((currentRow) => {
      var _a;
      return ((_a = currentRow[0]) == null ? void 0 : _a.rowId) === item.rowId;
    });
    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}
function getMaxRowLength(array) {
  let maxLength = 0;
  for (const { length } of array) {
    if (length > maxLength) {
      maxLength = length;
    }
  }
  return maxLength;
}
function createEmptyItem(rowId) {
  return {
    id: "__EMPTY_ITEM__",
    disabled: true,
    rowId
  };
}
function normalizeRows(rows, activeId, focusShift) {
  const maxLength = getMaxRowLength(rows);
  for (const row of rows) {
    for (let i = 0; i < maxLength; i += 1) {
      const item = row[i];
      if (!item || focusShift && item.disabled) {
        const isFirst = i === 0;
        const previousItem = isFirst && focusShift ? findFirstEnabledItem(row) : row[i - 1];
        row[i] = previousItem && activeId !== previousItem.id && focusShift ? previousItem : createEmptyItem(previousItem == null ? void 0 : previousItem.rowId);
      }
    }
  }
  return rows;
}
function verticalizeItems(items) {
  const rows = groupItemsByRows(items);
  const maxLength = getMaxRowLength(rows);
  const verticalized = [];
  for (let i = 0; i < maxLength; i += 1) {
    for (const row of rows) {
      const item = row[i];
      if (item) {
        verticalized.push((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, item), {
          // If there's no rowId, it means that it's not a grid composite, but
          // a single row instead. So, instead of verticalizing it, that is,
          // assigning a different rowId based on the column index, we keep it
          // undefined so they will be part of the same row. This is useful
          // when using up/down on one-dimensional composites.
          rowId: item.rowId ? `${i}` : void 0
        }));
      }
    }
  }
  return verticalized;
}
function createCompositeStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const collection = (0,_CYQWQL4J_js__WEBPACK_IMPORTED_MODULE_1__.createCollectionStore)(props);
  const activeId = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId
  );
  const initialState = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, collection.getState()), {
    id: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.id,
      syncState == null ? void 0 : syncState.id,
      `id-${Math.random().toString(36).slice(2, 8)}`
    ),
    activeId,
    baseElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(syncState == null ? void 0 : syncState.baseElement, null),
    includesBaseElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      activeId === null
    ),
    moves: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(syncState == null ? void 0 : syncState.moves, 0),
    orientation: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "both"
    ),
    rtl: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.rtl, syncState == null ? void 0 : syncState.rtl, false),
    virtualFocus: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      false
    ),
    focusLoop: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, false),
    focusWrap: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, false),
    focusShift: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusShift, syncState == null ? void 0 : syncState.focusShift, false)
  });
  const composite = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_3__.createStore)(initialState, collection, props.store);
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_3__.setup)(
    composite,
    () => (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_3__.sync)(composite, ["renderedItems", "activeId"], (state) => {
      composite.setState("activeId", (activeId2) => {
        var _a2;
        if (activeId2 !== void 0) return activeId2;
        return (_a2 = findFirstEnabledItem(state.renderedItems)) == null ? void 0 : _a2.id;
      });
    })
  );
  const getNextId = (direction = "next", options = {}) => {
    var _a2, _b;
    const defaultState = composite.getState();
    const {
      skip = 0,
      activeId: activeId2 = defaultState.activeId,
      focusShift = defaultState.focusShift,
      focusLoop = defaultState.focusLoop,
      focusWrap = defaultState.focusWrap,
      includesBaseElement = defaultState.includesBaseElement,
      renderedItems = defaultState.renderedItems,
      rtl = defaultState.rtl
    } = options;
    const isVerticalDirection = direction === "up" || direction === "down";
    const isNextDirection = direction === "next" || direction === "down";
    const canReverse = isNextDirection ? rtl && !isVerticalDirection : !rtl || isVerticalDirection;
    const canShift = focusShift && !skip;
    let items = !isVerticalDirection ? renderedItems : (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.flatten2DArray)(
      normalizeRows(groupItemsByRows(renderedItems), activeId2, canShift)
    );
    items = canReverse ? (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.reverseArray)(items) : items;
    items = isVerticalDirection ? verticalizeItems(items) : items;
    if (activeId2 == null) {
      return (_a2 = findFirstEnabledItem(items)) == null ? void 0 : _a2.id;
    }
    const activeItem = items.find((item) => item.id === activeId2);
    if (!activeItem) {
      return (_b = findFirstEnabledItem(items)) == null ? void 0 : _b.id;
    }
    const isGrid = items.some((item) => item.rowId);
    const activeIndex = items.indexOf(activeItem);
    const nextItems = items.slice(activeIndex + 1);
    const nextItemsInRow = getItemsInRow(nextItems, activeItem.rowId);
    if (skip) {
      const nextEnabledItemsInRow = getEnabledItems(nextItemsInRow, activeId2);
      const nextItem2 = nextEnabledItemsInRow.slice(skip)[0] || // If we can't find an item, just return the last one.
      nextEnabledItemsInRow[nextEnabledItemsInRow.length - 1];
      return nextItem2 == null ? void 0 : nextItem2.id;
    }
    const canLoop = focusLoop && (isVerticalDirection ? focusLoop !== "horizontal" : focusLoop !== "vertical");
    const canWrap = isGrid && focusWrap && (isVerticalDirection ? focusWrap !== "horizontal" : focusWrap !== "vertical");
    const hasNullItem = isNextDirection ? (!isGrid || isVerticalDirection) && canLoop && includesBaseElement : isVerticalDirection ? includesBaseElement : false;
    if (canLoop) {
      const loopItems = canWrap && !hasNullItem ? items : getItemsInRow(items, activeItem.rowId);
      const sortedItems = flipItems(loopItems, activeId2, hasNullItem);
      const nextItem2 = findFirstEnabledItem(sortedItems, activeId2);
      return nextItem2 == null ? void 0 : nextItem2.id;
    }
    if (canWrap) {
      const nextItem2 = findFirstEnabledItem(
        // We can use nextItems, which contains all the next items, including
        // items from other rows, to wrap between rows. However, if there is a
        // null item (the composite container), we'll only use the next items in
        // the row. So moving next from the last item will focus on the
        // composite container. On grid composites, horizontal navigation never
        // focuses on the composite container, only vertical.
        hasNullItem ? nextItemsInRow : nextItems,
        activeId2
      );
      const nextId = hasNullItem ? (nextItem2 == null ? void 0 : nextItem2.id) || null : nextItem2 == null ? void 0 : nextItem2.id;
      return nextId;
    }
    const nextItem = findFirstEnabledItem(nextItemsInRow, activeId2);
    if (!nextItem && hasNullItem) {
      return null;
    }
    return nextItem == null ? void 0 : nextItem.id;
  };
  return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, collection), composite), {
    setBaseElement: (element) => composite.setState("baseElement", element),
    setActiveId: (id) => composite.setState("activeId", id),
    move: (id) => {
      if (id === void 0) return;
      composite.setState("activeId", id);
      composite.setState("moves", (moves) => moves + 1);
    },
    first: () => {
      var _a2;
      return (_a2 = findFirstEnabledItem(composite.getState().renderedItems)) == null ? void 0 : _a2.id;
    },
    last: () => {
      var _a2;
      return (_a2 = findFirstEnabledItem((0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.reverseArray)(composite.getState().renderedItems))) == null ? void 0 : _a2.id;
    },
    next: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("next", options);
    },
    previous: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("previous", options);
    },
    down: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("down", options);
    },
    up: (options) => {
      if (options !== void 0 && typeof options === "number") {
        options = { skip: options };
      }
      return getNextId("up", options);
    }
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   batch: () => (/* binding */ batch),
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   mergeStore: () => (/* binding */ mergeStore),
/* harmony export */   omit: () => (/* binding */ omit2),
/* harmony export */   pick: () => (/* binding */ pick2),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   subscribe: () => (/* binding */ subscribe),
/* harmony export */   sync: () => (/* binding */ sync),
/* harmony export */   throwOnConflictingProps: () => (/* binding */ throwOnConflictingProps)
/* harmony export */ });
/* harmony import */ var _PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PBFD2E7P.js */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";



// src/utils/store.ts
function getInternal(store, key) {
  const internals = store.__unstableInternals;
  (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(internals, "Invalid store");
  return internals[key];
}
function createStore(initialState, ...stores) {
  let state = initialState;
  let prevStateBatch = state;
  let lastUpdate = Symbol();
  let destroy = _PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  const instances = /* @__PURE__ */ new Set();
  const updatedKeys = /* @__PURE__ */ new Set();
  const setups = /* @__PURE__ */ new Set();
  const listeners = /* @__PURE__ */ new Set();
  const batchListeners = /* @__PURE__ */ new Set();
  const disposables = /* @__PURE__ */ new WeakMap();
  const listenerKeys = /* @__PURE__ */ new WeakMap();
  const storeSetup = (callback) => {
    setups.add(callback);
    return () => setups.delete(callback);
  };
  const storeInit = () => {
    const initialized = instances.size;
    const instance = Symbol();
    instances.add(instance);
    const maybeDestroy = () => {
      instances.delete(instance);
      if (instances.size) return;
      destroy();
    };
    if (initialized) return maybeDestroy;
    const desyncs = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.getKeys)(state).map(
      (key) => (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.chain)(
        ...stores.map((store) => {
          var _a;
          const storeState = (_a = store == null ? void 0 : store.getState) == null ? void 0 : _a.call(store);
          if (!storeState) return;
          if (!(0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(storeState, key)) return;
          return sync(store, [key], (state2) => {
            setState(
              key,
              state2[key],
              // @ts-expect-error - Not public API. This is just to prevent
              // infinite loops.
              true
            );
          });
        })
      )
    );
    const teardowns = [];
    for (const setup2 of setups) {
      teardowns.push(setup2());
    }
    const cleanups = stores.map(init);
    destroy = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.chain)(...desyncs, ...teardowns, ...cleanups);
    return maybeDestroy;
  };
  const sub = (keys, listener, set = listeners) => {
    set.add(listener);
    listenerKeys.set(listener, keys);
    return () => {
      var _a;
      (_a = disposables.get(listener)) == null ? void 0 : _a();
      disposables.delete(listener);
      listenerKeys.delete(listener);
      set.delete(listener);
    };
  };
  const storeSubscribe = (keys, listener) => sub(keys, listener);
  const storeSync = (keys, listener) => {
    disposables.set(listener, listener(state, state));
    return sub(keys, listener);
  };
  const storeBatch = (keys, listener) => {
    disposables.set(listener, listener(state, prevStateBatch));
    return sub(keys, listener, batchListeners);
  };
  const storePick = (keys) => createStore((0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.pick)(state, keys), finalStore);
  const storeOmit = (keys) => createStore((0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.omit)(state, keys), finalStore);
  const getState = () => state;
  const setState = (key, value, fromStores = false) => {
    var _a;
    if (!(0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(state, key)) return;
    const nextValue = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.applyState)(value, state[key]);
    if (nextValue === state[key]) return;
    if (!fromStores) {
      for (const store of stores) {
        (_a = store == null ? void 0 : store.setState) == null ? void 0 : _a.call(store, key, nextValue);
      }
    }
    const prevState = state;
    state = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, state), { [key]: nextValue });
    const thisUpdate = Symbol();
    lastUpdate = thisUpdate;
    updatedKeys.add(key);
    const run = (listener, prev, uKeys) => {
      var _a2;
      const keys = listenerKeys.get(listener);
      const updated = (k) => uKeys ? uKeys.has(k) : k === key;
      if (!keys || keys.some(updated)) {
        (_a2 = disposables.get(listener)) == null ? void 0 : _a2();
        disposables.set(listener, listener(state, prev));
      }
    };
    for (const listener of listeners) {
      run(listener, prevState);
    }
    queueMicrotask(() => {
      if (lastUpdate !== thisUpdate) return;
      const snapshot = state;
      for (const listener of batchListeners) {
        run(listener, prevStateBatch, updatedKeys);
      }
      prevStateBatch = snapshot;
      updatedKeys.clear();
    });
  };
  const finalStore = {
    getState,
    setState,
    __unstableInternals: {
      setup: storeSetup,
      init: storeInit,
      subscribe: storeSubscribe,
      sync: storeSync,
      batch: storeBatch,
      pick: storePick,
      omit: storeOmit
    }
  };
  return finalStore;
}
function setup(store, ...args) {
  if (!store) return;
  return getInternal(store, "setup")(...args);
}
function init(store, ...args) {
  if (!store) return;
  return getInternal(store, "init")(...args);
}
function subscribe(store, ...args) {
  if (!store) return;
  return getInternal(store, "subscribe")(...args);
}
function sync(store, ...args) {
  if (!store) return;
  return getInternal(store, "sync")(...args);
}
function batch(store, ...args) {
  if (!store) return;
  return getInternal(store, "batch")(...args);
}
function omit2(store, ...args) {
  if (!store) return;
  return getInternal(store, "omit")(...args);
}
function pick2(store, ...args) {
  if (!store) return;
  return getInternal(store, "pick")(...args);
}
function mergeStore(...stores) {
  const initialState = stores.reduce((state, store2) => {
    var _a;
    const nextState = (_a = store2 == null ? void 0 : store2.getState) == null ? void 0 : _a.call(store2);
    if (!nextState) return state;
    return Object.assign(state, nextState);
  }, {});
  const store = createStore(initialState, ...stores);
  return Object.assign({}, ...stores, store);
}
function throwOnConflictingProps(props, store) {
  if (false) {}
  if (!store) return;
  const defaultKeys = Object.entries(props).filter(([key, value]) => key.startsWith("default") && value !== void 0).map(([key]) => {
    var _a;
    const stateKey = key.replace("default", "");
    return `${((_a = stateKey[0]) == null ? void 0 : _a.toLowerCase()) || ""}${stateKey.slice(1)}`;
  });
  if (!defaultKeys.length) return;
  const storeState = store.getState();
  const conflictingProps = defaultKeys.filter(
    (key) => (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(storeState, key)
  );
  if (!conflictingProps.length) return;
  throw new Error(
    `Passing a store prop in conjunction with a default state is not supported.

const store = useSelectStore();
<SelectProvider store={store} defaultValue="Apple" />
                ^             ^

Instead, pass the default state to the topmost store:

const store = useSelectStore({ defaultValue: "Apple" });
<SelectProvider store={store} />

See https://github.com/ariakit/ariakit/pull/2745 for more details.

If there's a particular need for this, please submit a feature request at https://github.com/ariakit/ariakit
`
  );
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/CYQWQL4J.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/CYQWQL4J.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCollectionStore: () => (/* binding */ createCollectionStore)
/* harmony export */ });
/* harmony import */ var _BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BCALMBPZ.js */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var _PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PBFD2E7P.js */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DTR5TSDJ.js */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";





// src/collection/collection-store.ts
function getCommonParent(items) {
  var _a;
  const firstItem = items.find((item) => !!item.element);
  const lastItem = [...items].reverse().find((item) => !!item.element);
  let parentElement = (_a = firstItem == null ? void 0 : firstItem.element) == null ? void 0 : _a.parentElement;
  while (parentElement && (lastItem == null ? void 0 : lastItem.element)) {
    const parent = parentElement;
    if (lastItem && parent.contains(lastItem.element)) {
      return parentElement;
    }
    parentElement = parentElement.parentElement;
  }
  return (0,_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.getDocument)(parentElement).body;
}
function getPrivateStore(store) {
  return store == null ? void 0 : store.__unstablePrivateStore;
}
function createCollectionStore(props = {}) {
  var _a;
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.throwOnConflictingProps)(props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const items = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.items,
    syncState == null ? void 0 : syncState.items,
    props.defaultItems,
    []
  );
  const itemsMap = new Map(items.map((item) => [item.id, item]));
  const initialState = {
    items,
    renderedItems: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(syncState == null ? void 0 : syncState.renderedItems, [])
  };
  const syncPrivateStore = getPrivateStore(props.store);
  const privateStore = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(
    { items, renderedItems: initialState.renderedItems },
    syncPrivateStore
  );
  const collection = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(initialState, props.store);
  const sortItems = (renderedItems) => {
    const sortedItems = (0,_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.sortBasedOnDOMPosition)(renderedItems, (i) => i.element);
    privateStore.setState("renderedItems", sortedItems);
    collection.setState("renderedItems", sortedItems);
  };
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.setup)(collection, () => (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.init)(privateStore));
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.setup)(privateStore, () => {
    return (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.batch)(privateStore, ["items"], (state) => {
      collection.setState("items", state.items);
    });
  });
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.setup)(privateStore, () => {
    return (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.batch)(privateStore, ["renderedItems"], (state) => {
      let firstRun = true;
      let raf = requestAnimationFrame(() => {
        const { renderedItems } = collection.getState();
        if (state.renderedItems === renderedItems) return;
        sortItems(state.renderedItems);
      });
      if (typeof IntersectionObserver !== "function") {
        return () => cancelAnimationFrame(raf);
      }
      const ioCallback = () => {
        if (firstRun) {
          firstRun = false;
          return;
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => sortItems(state.renderedItems));
      };
      const root = getCommonParent(state.renderedItems);
      const observer = new IntersectionObserver(ioCallback, { root });
      for (const item of state.renderedItems) {
        if (!item.element) continue;
        observer.observe(item.element);
      }
      return () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
      };
    });
  });
  const mergeItem = (item, setItems, canDeleteFromMap = false) => {
    let prevItem;
    setItems((items2) => {
      const index = items2.findIndex(({ id }) => id === item.id);
      const nextItems = items2.slice();
      if (index !== -1) {
        prevItem = items2[index];
        const nextItem = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, prevItem), item);
        nextItems[index] = nextItem;
        itemsMap.set(item.id, nextItem);
      } else {
        nextItems.push(item);
        itemsMap.set(item.id, item);
      }
      return nextItems;
    });
    const unmergeItem = () => {
      setItems((items2) => {
        if (!prevItem) {
          if (canDeleteFromMap) {
            itemsMap.delete(item.id);
          }
          return items2.filter(({ id }) => id !== item.id);
        }
        const index = items2.findIndex(({ id }) => id === item.id);
        if (index === -1) return items2;
        const nextItems = items2.slice();
        nextItems[index] = prevItem;
        itemsMap.set(item.id, prevItem);
        return nextItems;
      });
    };
    return unmergeItem;
  };
  const registerItem = (item) => mergeItem(
    item,
    (getItems) => privateStore.setState("items", getItems),
    true
  );
  return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, collection), {
    registerItem,
    renderItem: (item) => (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_2__.chain)(
      registerItem(item),
      mergeItem(
        item,
        (getItems) => privateStore.setState("renderedItems", getItems)
      )
    ),
    item: (id) => {
      if (!id) return null;
      let item = itemsMap.get(id);
      if (!item) {
        const { items: items2 } = privateStore.getState();
        item = items2.find((item2) => item2.id === id);
        if (item) {
          itemsMap.set(id, item);
        }
      }
      return item || null;
    },
    // @ts-expect-error Internal
    __unstablePrivateStore: privateStore
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   getActiveElement: () => (/* binding */ getActiveElement),
/* harmony export */   getDocument: () => (/* binding */ getDocument),
/* harmony export */   getPopupItemRole: () => (/* binding */ getPopupItemRole),
/* harmony export */   getPopupRole: () => (/* binding */ getPopupRole),
/* harmony export */   getScrollingElement: () => (/* binding */ getScrollingElement),
/* harmony export */   getTextboxSelection: () => (/* binding */ getTextboxSelection),
/* harmony export */   getTextboxValue: () => (/* binding */ getTextboxValue),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isButton: () => (/* binding */ isButton),
/* harmony export */   isFrame: () => (/* binding */ isFrame),
/* harmony export */   isPartiallyHidden: () => (/* binding */ isPartiallyHidden),
/* harmony export */   isTextField: () => (/* binding */ isTextField),
/* harmony export */   isTextbox: () => (/* binding */ isTextbox),
/* harmony export */   isVisible: () => (/* binding */ isVisible),
/* harmony export */   scrollIntoViewIfNeeded: () => (/* binding */ scrollIntoViewIfNeeded),
/* harmony export */   setSelectionRange: () => (/* binding */ setSelectionRange),
/* harmony export */   sortBasedOnDOMPosition: () => (/* binding */ sortBasedOnDOMPosition)
/* harmony export */ });
"use client";

// src/utils/dom.ts
var canUseDOM = checkIsBrowser();
function checkIsBrowser() {
  var _a;
  return typeof window !== "undefined" && !!((_a = window.document) == null ? void 0 : _a.createElement);
}
function getDocument(node) {
  if (!node) return document;
  if ("self" in node) return node.document;
  return node.ownerDocument || document;
}
function getWindow(node) {
  if (!node) return self;
  if ("self" in node) return node.self;
  return getDocument(node).defaultView || window;
}
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getDocument(node);
  if (!(activeElement == null ? void 0 : activeElement.nodeName)) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(
      activeElement.contentDocument.body,
      activeDescendant
    );
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function contains(parent, child) {
  return parent === child || parent.contains(child);
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}
function isButton(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") return true;
  if (tagName === "input" && element.type) {
    return buttonInputTypes.indexOf(element.type) !== -1;
  }
  return false;
}
var buttonInputTypes = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit"
];
function isVisible(element) {
  if (typeof element.checkVisibility === "function") {
    return element.checkVisibility();
  }
  const htmlElement = element;
  return htmlElement.offsetWidth > 0 || htmlElement.offsetHeight > 0 || element.getClientRects().length > 0;
}
function isTextField(element) {
  try {
    const isTextInput = element instanceof HTMLInputElement && element.selectionStart !== null;
    const isTextArea = element.tagName === "TEXTAREA";
    return isTextInput || isTextArea || false;
  } catch (error) {
    return false;
  }
}
function isTextbox(element) {
  return element.isContentEditable || isTextField(element);
}
function getTextboxValue(element) {
  if (isTextField(element)) {
    return element.value;
  }
  if (element.isContentEditable) {
    const range = getDocument(element).createRange();
    range.selectNodeContents(element);
    return range.toString();
  }
  return "";
}
function getTextboxSelection(element) {
  let start = 0;
  let end = 0;
  if (isTextField(element)) {
    start = element.selectionStart || 0;
    end = element.selectionEnd || 0;
  } else if (element.isContentEditable) {
    const selection = getDocument(element).getSelection();
    if ((selection == null ? void 0 : selection.rangeCount) && selection.anchorNode && contains(element, selection.anchorNode) && selection.focusNode && contains(element, selection.focusNode)) {
      const range = selection.getRangeAt(0);
      const nextRange = range.cloneRange();
      nextRange.selectNodeContents(element);
      nextRange.setEnd(range.startContainer, range.startOffset);
      start = nextRange.toString().length;
      nextRange.setEnd(range.endContainer, range.endOffset);
      end = nextRange.toString().length;
    }
  }
  return { start, end };
}
function getPopupRole(element, fallback) {
  const allowedPopupRoles = ["dialog", "menu", "listbox", "tree", "grid"];
  const role = element == null ? void 0 : element.getAttribute("role");
  if (role && allowedPopupRoles.indexOf(role) !== -1) {
    return role;
  }
  return fallback;
}
function getPopupItemRole(element, fallback) {
  var _a;
  const itemRoleByPopupRole = {
    menu: "menuitem",
    listbox: "option",
    tree: "treeitem"
  };
  const popupRole = getPopupRole(element);
  if (!popupRole) return fallback;
  const key = popupRole;
  return (_a = itemRoleByPopupRole[key]) != null ? _a : fallback;
}
function scrollIntoViewIfNeeded(element, arg) {
  if (isPartiallyHidden(element) && "scrollIntoView" in element) {
    element.scrollIntoView(arg);
  }
}
function getScrollingElement(element) {
  if (!element) return null;
  const isScrollableOverflow = (overflow) => {
    if (overflow === "auto") return true;
    if (overflow === "scroll") return true;
    return false;
  };
  if (element.clientHeight && element.scrollHeight > element.clientHeight) {
    const { overflowY } = getComputedStyle(element);
    if (isScrollableOverflow(overflowY)) return element;
  } else if (element.clientWidth && element.scrollWidth > element.clientWidth) {
    const { overflowX } = getComputedStyle(element);
    if (isScrollableOverflow(overflowX)) return element;
  }
  return getScrollingElement(element.parentElement) || document.scrollingElement || document.body;
}
function isPartiallyHidden(element) {
  const elementRect = element.getBoundingClientRect();
  const scroller = getScrollingElement(element);
  if (!scroller) return false;
  const scrollerRect = scroller.getBoundingClientRect();
  const isHTML = scroller.tagName === "HTML";
  const scrollerTop = isHTML ? scrollerRect.top + scroller.scrollTop : scrollerRect.top;
  const scrollerBottom = isHTML ? scroller.clientHeight : scrollerRect.bottom;
  const scrollerLeft = isHTML ? scrollerRect.left + scroller.scrollLeft : scrollerRect.left;
  const scrollerRight = isHTML ? scroller.clientWidth : scrollerRect.right;
  const top = elementRect.top < scrollerTop;
  const left = elementRect.left < scrollerLeft;
  const bottom = elementRect.bottom > scrollerBottom;
  const right = elementRect.right > scrollerRight;
  return top || left || bottom || right;
}
function setSelectionRange(element, ...args) {
  if (/text|search|password|tel|url/i.test(element.type)) {
    element.setSelectionRange(...args);
  }
}
function sortBasedOnDOMPosition(items, getElement) {
  const pairs = items.map((item, index) => [index, item]);
  let isOrderDifferent = false;
  pairs.sort(([indexA, a], [indexB, b]) => {
    const elementA = getElement(a);
    const elementB = getElement(b);
    if (elementA === elementB) return 0;
    if (!elementA || !elementB) return 0;
    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }
      return -1;
    }
    if (indexA < indexB) {
      isOrderDifferent = true;
    }
    return 1;
  });
  if (isOrderDifferent) {
    return pairs.map(([_, item]) => item);
  }
  return items;
}
function isElementPreceding(a, b) {
  return Boolean(
    b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING
  );
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/FZZ2AVHF.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/FZZ2AVHF.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDialogStore: () => (/* binding */ createDialogStore)
/* harmony export */ });
/* harmony import */ var _RCQ5P4YE_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RCQ5P4YE.js */ "./node_modules/@ariakit/core/esm/__chunks/RCQ5P4YE.js");
"use client";


// src/dialog/dialog-store.ts
function createDialogStore(props = {}) {
  return (0,_RCQ5P4YE_js__WEBPACK_IMPORTED_MODULE_0__.createDisclosureStore)(props);
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/ME2CUF3F.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/ME2CUF3F.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopoverStore: () => (/* binding */ createPopoverStore)
/* harmony export */ });
/* harmony import */ var _FZZ2AVHF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FZZ2AVHF.js */ "./node_modules/@ariakit/core/esm/__chunks/FZZ2AVHF.js");
/* harmony import */ var _BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BCALMBPZ.js */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var _PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PBFD2E7P.js */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";





// src/popover/popover-store.ts
function createPopoverStore(_a = {}) {
  var _b = _a, {
    popover: otherPopover
  } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__objRest)(_b, [
    "popover"
  ]);
  const store = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.mergeStore)(
    props.store,
    (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.omit)(otherPopover, [
      "arrowElement",
      "anchorElement",
      "contentElement",
      "popoverElement",
      "disclosureElement"
    ])
  );
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.throwOnConflictingProps)(props, store);
  const syncState = store == null ? void 0 : store.getState();
  const dialog = (0,_FZZ2AVHF_js__WEBPACK_IMPORTED_MODULE_2__.createDialogStore)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, props), { store }));
  const placement = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
    props.placement,
    syncState == null ? void 0 : syncState.placement,
    "bottom"
  );
  const initialState = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, dialog.getState()), {
    placement,
    currentPlacement: placement,
    anchorElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(syncState == null ? void 0 : syncState.anchorElement, null),
    popoverElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(syncState == null ? void 0 : syncState.popoverElement, null),
    arrowElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(syncState == null ? void 0 : syncState.arrowElement, null),
    rendered: Symbol("rendered")
  });
  const popover = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(initialState, dialog, store);
  return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, dialog), popover), {
    setAnchorElement: (element) => popover.setState("anchorElement", element),
    setPopoverElement: (element) => popover.setState("popoverElement", element),
    setArrowElement: (element) => popover.setState("arrowElement", element),
    render: () => popover.setState("rendered", Symbol("rendered"))
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterPaint: () => (/* binding */ afterPaint),
/* harmony export */   applyState: () => (/* binding */ applyState),
/* harmony export */   beforePaint: () => (/* binding */ beforePaint),
/* harmony export */   chain: () => (/* binding */ chain),
/* harmony export */   cx: () => (/* binding */ cx),
/* harmony export */   defaultValue: () => (/* binding */ defaultValue),
/* harmony export */   disabledFromProps: () => (/* binding */ disabledFromProps),
/* harmony export */   getKeys: () => (/* binding */ getKeys),
/* harmony export */   hasOwnProperty: () => (/* binding */ hasOwnProperty),
/* harmony export */   identity: () => (/* binding */ identity),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isFalsyBooleanCallback: () => (/* binding */ isFalsyBooleanCallback),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   normalizeString: () => (/* binding */ normalizeString),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   removeUndefinedValues: () => (/* binding */ removeUndefinedValues),
/* harmony export */   shallowEqual: () => (/* binding */ shallowEqual)
/* harmony export */ });
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";


// src/utils/misc.ts
function noop(..._) {
}
function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a) return false;
  if (!b) return false;
  if (typeof a !== "object") return false;
  if (typeof b !== "object") return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const { length } = aKeys;
  if (bKeys.length !== length) return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function applyState(argument, currentValue) {
  if (isUpdater(argument)) {
    const value = isLazyValue(currentValue) ? currentValue() : currentValue;
    return argument(value);
  }
  return argument;
}
function isUpdater(argument) {
  return typeof argument === "function";
}
function isLazyValue(value) {
  return typeof value === "function";
}
function isObject(arg) {
  return typeof arg === "object" && arg != null;
}
function isEmpty(arg) {
  if (Array.isArray(arg)) return !arg.length;
  if (isObject(arg)) return !Object.keys(arg).length;
  if (arg == null) return true;
  if (arg === "") return true;
  return false;
}
function isInteger(arg) {
  if (typeof arg === "number") {
    return Math.floor(arg) === arg;
  }
  return String(Math.floor(Number(arg))) === arg;
}
function hasOwnProperty(object, prop) {
  if (typeof Object.hasOwn === "function") {
    return Object.hasOwn(object, prop);
  }
  return Object.prototype.hasOwnProperty.call(object, prop);
}
function chain(...fns) {
  return (...args) => {
    for (const fn of fns) {
      if (typeof fn === "function") {
        fn(...args);
      }
    }
  };
}
function cx(...args) {
  return args.filter(Boolean).join(" ") || void 0;
}
function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function omit(object, keys) {
  const result = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, object);
  for (const key of keys) {
    if (hasOwnProperty(result, key)) {
      delete result[key];
    }
  }
  return result;
}
function pick(object, paths) {
  const result = {};
  for (const key of paths) {
    if (hasOwnProperty(object, key)) {
      result[key] = object[key];
    }
  }
  return result;
}
function identity(value) {
  return value;
}
function beforePaint(cb = noop) {
  const raf = requestAnimationFrame(cb);
  return () => cancelAnimationFrame(raf);
}
function afterPaint(cb = noop) {
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(cb);
  });
  return () => cancelAnimationFrame(raf);
}
function invariant(condition, message) {
  if (condition) return;
  if (typeof message !== "string") throw new Error("Invariant failed");
  throw new Error(message);
}
function getKeys(obj) {
  return Object.keys(obj);
}
function isFalsyBooleanCallback(booleanOrCallback, ...args) {
  const result = typeof booleanOrCallback === "function" ? booleanOrCallback(...args) : booleanOrCallback;
  if (result == null) return false;
  return !result;
}
function disabledFromProps(props) {
  return props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
}
function removeUndefinedValues(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== void 0) {
      result[key] = obj[key];
    }
  }
  return result;
}
function defaultValue(...values) {
  for (const value of values) {
    if (value !== void 0) return value;
  }
  return void 0;
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isApple: () => (/* binding */ isApple),
/* harmony export */   isFirefox: () => (/* binding */ isFirefox),
/* harmony export */   isMac: () => (/* binding */ isMac),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isTouchDevice: () => (/* binding */ isTouchDevice)
/* harmony export */ });
/* harmony import */ var _DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DTR5TSDJ.js */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
"use client";


// src/utils/platform.ts
function isTouchDevice() {
  return _DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && !!navigator.maxTouchPoints;
}
function isApple() {
  if (!_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM) return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform);
}
function isSafari() {
  return _DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && isApple() && /apple/i.test(navigator.vendor);
}
function isFirefox() {
  return _DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && /firefox\//i.test(navigator.userAgent);
}
function isMac() {
  return _DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && navigator.platform.startsWith("Mac") && !isTouchDevice();
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/RCQ5P4YE.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/RCQ5P4YE.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDisclosureStore: () => (/* binding */ createDisclosureStore)
/* harmony export */ });
/* harmony import */ var _BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BCALMBPZ.js */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var _PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PBFD2E7P.js */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";




// src/disclosure/disclosure-store.ts
function createDisclosureStore(props = {}) {
  const store = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.mergeStore)(
    props.store,
    (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.omit)(props.disclosure, ["contentElement", "disclosureElement"])
  );
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.throwOnConflictingProps)(props, store);
  const syncState = store == null ? void 0 : store.getState();
  const open = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(
    props.open,
    syncState == null ? void 0 : syncState.open,
    props.defaultOpen,
    false
  );
  const animated = (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(props.animated, syncState == null ? void 0 : syncState.animated, false);
  const initialState = {
    open,
    animated,
    animating: !!animated && open,
    mounted: open,
    contentElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(syncState == null ? void 0 : syncState.contentElement, null),
    disclosureElement: (0,_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(syncState == null ? void 0 : syncState.disclosureElement, null)
  };
  const disclosure = (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.createStore)(initialState, store);
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.setup)(
    disclosure,
    () => (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.sync)(disclosure, ["animated", "animating"], (state) => {
      if (state.animated) return;
      disclosure.setState("animating", false);
    })
  );
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.setup)(
    disclosure,
    () => (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.subscribe)(disclosure, ["open"], () => {
      if (!disclosure.getState().animated) return;
      disclosure.setState("animating", true);
    })
  );
  (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.setup)(
    disclosure,
    () => (0,_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_0__.sync)(disclosure, ["open", "animating"], (state) => {
      disclosure.setState("mounted", state.open || state.animating);
    })
  );
  return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, disclosure), {
    disclosure: props.disclosure,
    setOpen: (value) => disclosure.setState("open", value),
    show: () => disclosure.setState("open", true),
    hide: () => disclosure.setState("open", false),
    toggle: () => disclosure.setState("open", (open2) => !open2),
    stopAnimation: () => disclosure.setState("animating", false),
    setContentElement: (value) => disclosure.setState("contentElement", value),
    setDisclosureElement: (value) => disclosure.setState("disclosureElement", value)
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/combobox/combobox-store.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/combobox/combobox-store.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createComboboxStore: () => (/* binding */ createComboboxStore)
/* harmony export */ });
/* harmony import */ var _chunks_AJZ4BYF3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/AJZ4BYF3.js */ "./node_modules/@ariakit/core/esm/__chunks/AJZ4BYF3.js");
/* harmony import */ var _chunks_ME2CUF3F_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../__chunks/ME2CUF3F.js */ "./node_modules/@ariakit/core/esm/__chunks/ME2CUF3F.js");
/* harmony import */ var _chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/BCALMBPZ.js */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var _chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../__chunks/PBFD2E7P.js */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _chunks_QAGXQEUG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/QAGXQEUG.js */ "./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js");
/* harmony import */ var _chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";












// src/combobox/combobox-store.ts
var isTouchSafari = (0,_chunks_QAGXQEUG_js__WEBPACK_IMPORTED_MODULE_0__.isSafari)() && (0,_chunks_QAGXQEUG_js__WEBPACK_IMPORTED_MODULE_0__.isTouchDevice)();
function createComboboxStore(_a = {}) {
  var _b = _a, {
    tag
  } = _b, props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__objRest)(_b, [
    "tag"
  ]);
  const store = (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.mergeStore)(props.store, (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.pick)(tag, ["value", "rtl"]));
  (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.throwOnConflictingProps)(props, store);
  const tagState = tag == null ? void 0 : tag.getState();
  const syncState = store == null ? void 0 : store.getState();
  const activeId = (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId,
    null
  );
  const composite = (0,_chunks_AJZ4BYF3_js__WEBPACK_IMPORTED_MODULE_4__.createCompositeStore)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), {
    activeId,
    includesBaseElement: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      true
    ),
    orientation: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "vertical"
    ),
    focusLoop: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true),
    focusWrap: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, true),
    virtualFocus: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      true
    )
  }));
  const popover = (0,_chunks_ME2CUF3F_js__WEBPACK_IMPORTED_MODULE_5__.createPopoverStore)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), {
    placement: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "bottom-start"
    )
  }));
  const value = (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
    props.value,
    syncState == null ? void 0 : syncState.value,
    props.defaultValue,
    ""
  );
  const selectedValue = (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
    props.selectedValue,
    syncState == null ? void 0 : syncState.selectedValue,
    tagState == null ? void 0 : tagState.values,
    props.defaultSelectedValue,
    ""
  );
  const multiSelectable = Array.isArray(selectedValue);
  const initialState = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, composite.getState()), popover.getState()), {
    value,
    selectedValue,
    resetValueOnSelect: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
      props.resetValueOnSelect,
      syncState == null ? void 0 : syncState.resetValueOnSelect,
      multiSelectable
    ),
    resetValueOnHide: (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
      props.resetValueOnHide,
      syncState == null ? void 0 : syncState.resetValueOnHide,
      multiSelectable && !tag
    ),
    activeValue: syncState == null ? void 0 : syncState.activeValue
  });
  const combobox = (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.createStore)(initialState, composite, popover, store);
  if (isTouchSafari) {
    (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.setup)(
      combobox,
      () => (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.sync)(combobox, ["virtualFocus"], () => {
        combobox.setState("virtualFocus", false);
      })
    );
  }
  (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.setup)(combobox, () => {
    if (!tag) return;
    return (0,_chunks_PBFD2E7P_js__WEBPACK_IMPORTED_MODULE_3__.chain)(
      (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.sync)(combobox, ["selectedValue"], (state) => {
        if (!Array.isArray(state.selectedValue)) return;
        tag.setValues(state.selectedValue);
      }),
      (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.sync)(tag, ["values"], (state) => {
        combobox.setState("selectedValue", state.values);
      })
    );
  });
  (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.setup)(
    combobox,
    () => (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.sync)(combobox, ["resetValueOnHide", "mounted"], (state) => {
      if (!state.resetValueOnHide) return;
      if (state.mounted) return;
      combobox.setState("value", value);
    })
  );
  (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.setup)(
    combobox,
    () => (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.sync)(combobox, ["open"], (state) => {
      if (state.open) return;
      combobox.setState("activeId", activeId);
      combobox.setState("moves", 0);
    })
  );
  (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.setup)(
    combobox,
    () => (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.sync)(combobox, ["moves", "activeId"], (state, prevState) => {
      if (state.moves === prevState.moves) {
        combobox.setState("activeValue", void 0);
      }
    })
  );
  (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.setup)(
    combobox,
    () => (0,_chunks_BCALMBPZ_js__WEBPACK_IMPORTED_MODULE_2__.batch)(combobox, ["moves", "renderedItems"], (state, prev) => {
      if (state.moves === prev.moves) return;
      const { activeId: activeId2 } = combobox.getState();
      const activeItem = composite.item(activeId2);
      combobox.setState("activeValue", activeItem == null ? void 0 : activeItem.value);
    })
  );
  return (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, popover), composite), combobox), {
    tag,
    setValue: (value2) => combobox.setState("value", value2),
    resetValue: () => combobox.setState("value", initialState.value),
    setSelectedValue: (selectedValue2) => combobox.setState("selectedValue", selectedValue2)
  });
}



/***/ }),

/***/ "./node_modules/@ariakit/core/esm/utils/events.js":
/*!********************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/utils/events.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addGlobalEventListener: () => (/* binding */ addGlobalEventListener),
/* harmony export */   fireBlurEvent: () => (/* binding */ fireBlurEvent),
/* harmony export */   fireClickEvent: () => (/* binding */ fireClickEvent),
/* harmony export */   fireEvent: () => (/* binding */ fireEvent),
/* harmony export */   fireFocusEvent: () => (/* binding */ fireFocusEvent),
/* harmony export */   fireKeyboardEvent: () => (/* binding */ fireKeyboardEvent),
/* harmony export */   getInputType: () => (/* binding */ getInputType),
/* harmony export */   isDownloading: () => (/* binding */ isDownloading),
/* harmony export */   isFocusEventOutside: () => (/* binding */ isFocusEventOutside),
/* harmony export */   isOpeningInNewTab: () => (/* binding */ isOpeningInNewTab),
/* harmony export */   isPortalEvent: () => (/* binding */ isPortalEvent),
/* harmony export */   isSelfTarget: () => (/* binding */ isSelfTarget),
/* harmony export */   queueBeforeEvent: () => (/* binding */ queueBeforeEvent)
/* harmony export */ });
/* harmony import */ var _chunks_QAGXQEUG_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/QAGXQEUG.js */ "./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js");
/* harmony import */ var _chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/DTR5TSDJ.js */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";




// src/utils/events.ts
function isPortalEvent(event) {
  return Boolean(
    event.currentTarget && !(0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.contains)(event.currentTarget, event.target)
  );
}
function isSelfTarget(event) {
  return event.target === event.currentTarget;
}
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const isAppleDevice = (0,_chunks_QAGXQEUG_js__WEBPACK_IMPORTED_MODULE_1__.isApple)();
  if (isAppleDevice && !event.metaKey) return false;
  if (!isAppleDevice && !event.ctrlKey) return false;
  const tagName = element.tagName.toLowerCase();
  if (tagName === "a") return true;
  if (tagName === "button" && element.type === "submit") return true;
  if (tagName === "input" && element.type === "submit") return true;
  return false;
}
function isDownloading(event) {
  const element = event.currentTarget;
  if (!element) return false;
  const tagName = element.tagName.toLowerCase();
  if (!event.altKey) return false;
  if (tagName === "a") return true;
  if (tagName === "button" && element.type === "submit") return true;
  if (tagName === "input" && element.type === "submit") return true;
  return false;
}
function fireEvent(element, type, eventInit) {
  const event = new Event(type, eventInit);
  return element.dispatchEvent(event);
}
function fireBlurEvent(element, eventInit) {
  const event = new FocusEvent("blur", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, eventInit), { bubbles: true });
  element.dispatchEvent(new FocusEvent("focusout", bubbleInit));
  return defaultAllowed;
}
function fireFocusEvent(element, eventInit) {
  const event = new FocusEvent("focus", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, eventInit), { bubbles: true });
  element.dispatchEvent(new FocusEvent("focusin", bubbleInit));
  return defaultAllowed;
}
function fireKeyboardEvent(element, type, eventInit) {
  const event = new KeyboardEvent(type, eventInit);
  return element.dispatchEvent(event);
}
function fireClickEvent(element, eventInit) {
  const event = new MouseEvent("click", eventInit);
  return element.dispatchEvent(event);
}
function isFocusEventOutside(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !(0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.contains)(containerElement, relatedTarget);
}
function getInputType(event) {
  const nativeEvent = "nativeEvent" in event ? event.nativeEvent : event;
  if (!nativeEvent) return;
  if (!("inputType" in nativeEvent)) return;
  if (typeof nativeEvent.inputType !== "string") return;
  return nativeEvent.inputType;
}
function queueBeforeEvent(element, type, callback, timeout) {
  const createTimer = (callback2) => {
    if (timeout) {
      const timerId2 = setTimeout(callback2, timeout);
      return () => clearTimeout(timerId2);
    }
    const timerId = requestAnimationFrame(callback2);
    return () => cancelAnimationFrame(timerId);
  };
  const cancelTimer = createTimer(() => {
    element.removeEventListener(type, callSync, true);
    callback();
  });
  const callSync = () => {
    cancelTimer();
    callback();
  };
  element.addEventListener(type, callSync, { once: true, capture: true });
  return cancelTimer;
}
function addGlobalEventListener(type, listener, options, scope = window) {
  const children = [];
  try {
    scope.document.addEventListener(type, listener, options);
    for (const frame of Array.from(scope.frames)) {
      children.push(addGlobalEventListener(type, listener, options, frame));
    }
  } catch (e) {
  }
  const removeEventListener = () => {
    try {
      scope.document.removeEventListener(type, listener, options);
    } catch (e) {
    }
    for (const remove of children) {
      remove();
    }
  };
  return removeEventListener;
}



/***/ }),

/***/ "./node_modules/@ariakit/core/esm/utils/focus.js":
/*!*******************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/utils/focus.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableFocus: () => (/* binding */ disableFocus),
/* harmony export */   disableFocusIn: () => (/* binding */ disableFocusIn),
/* harmony export */   focusIfNeeded: () => (/* binding */ focusIfNeeded),
/* harmony export */   focusIntoView: () => (/* binding */ focusIntoView),
/* harmony export */   getAllFocusable: () => (/* binding */ getAllFocusable),
/* harmony export */   getAllFocusableIn: () => (/* binding */ getAllFocusableIn),
/* harmony export */   getAllTabbable: () => (/* binding */ getAllTabbable),
/* harmony export */   getAllTabbableIn: () => (/* binding */ getAllTabbableIn),
/* harmony export */   getClosestFocusable: () => (/* binding */ getClosestFocusable),
/* harmony export */   getFirstFocusable: () => (/* binding */ getFirstFocusable),
/* harmony export */   getFirstFocusableIn: () => (/* binding */ getFirstFocusableIn),
/* harmony export */   getFirstTabbable: () => (/* binding */ getFirstTabbable),
/* harmony export */   getFirstTabbableIn: () => (/* binding */ getFirstTabbableIn),
/* harmony export */   getLastTabbable: () => (/* binding */ getLastTabbable),
/* harmony export */   getLastTabbableIn: () => (/* binding */ getLastTabbableIn),
/* harmony export */   getNextTabbable: () => (/* binding */ getNextTabbable),
/* harmony export */   getNextTabbableIn: () => (/* binding */ getNextTabbableIn),
/* harmony export */   getPreviousTabbable: () => (/* binding */ getPreviousTabbable),
/* harmony export */   getPreviousTabbableIn: () => (/* binding */ getPreviousTabbableIn),
/* harmony export */   hasFocus: () => (/* binding */ hasFocus),
/* harmony export */   hasFocusWithin: () => (/* binding */ hasFocusWithin),
/* harmony export */   isFocusable: () => (/* binding */ isFocusable),
/* harmony export */   isTabbable: () => (/* binding */ isTabbable),
/* harmony export */   restoreFocusIn: () => (/* binding */ restoreFocusIn)
/* harmony export */ });
/* harmony import */ var _chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/DTR5TSDJ.js */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/3YLGPPWQ.js */ "./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");
"use client";



// src/utils/focus.ts
var selector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], summary, iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function hasNegativeTabIndex(element) {
  const tabIndex = Number.parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isFocusable(element) {
  if (!element.matches(selector)) return false;
  if (!(0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.isVisible)(element)) return false;
  if (element.closest("[inert]")) return false;
  return true;
}
function isTabbable(element) {
  if (!isFocusable(element)) return false;
  if (hasNegativeTabIndex(element)) return false;
  if (!("form" in element)) return true;
  if (!element.form) return true;
  if (element.checked) return true;
  if (element.type !== "radio") return true;
  const radioGroup = element.form.elements.namedItem(element.name);
  if (!radioGroup) return true;
  if (!("length" in radioGroup)) return true;
  const activeElement = (0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(element);
  if (!activeElement) return true;
  if (activeElement === element) return true;
  if (!("form" in activeElement)) return true;
  if (activeElement.form !== element.form) return true;
  if (activeElement.name !== element.name) return true;
  return false;
}
function getAllFocusableIn(container, includeContainer) {
  const elements = Array.from(
    container.querySelectorAll(selector)
  );
  if (includeContainer) {
    elements.unshift(container);
  }
  const focusableElements = elements.filter(isFocusable);
  focusableElements.forEach((element, i) => {
    if ((0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.isFrame)(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getAllFocusableIn(frameBody));
    }
  });
  return focusableElements;
}
function getAllFocusable(includeBody) {
  return getAllFocusableIn(document.body, includeBody);
}
function getFirstFocusableIn(container, includeContainer) {
  const [first] = getAllFocusableIn(container, includeContainer);
  return first || null;
}
function getFirstFocusable(includeBody) {
  return getFirstFocusableIn(document.body, includeBody);
}
function getAllTabbableIn(container, includeContainer, fallbackToFocusable) {
  const elements = Array.from(
    container.querySelectorAll(selector)
  );
  const tabbableElements = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if ((0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.isFrame)(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(
        frameBody,
        false,
        fallbackToFocusable
      );
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && fallbackToFocusable) {
    return elements;
  }
  return tabbableElements;
}
function getAllTabbable(fallbackToFocusable) {
  return getAllTabbableIn(document.body, false, fallbackToFocusable);
}
function getFirstTabbableIn(container, includeContainer, fallbackToFocusable) {
  const [first] = getAllTabbableIn(
    container,
    includeContainer,
    fallbackToFocusable
  );
  return first || null;
}
function getFirstTabbable(fallbackToFocusable) {
  return getFirstTabbableIn(document.body, false, fallbackToFocusable);
}
function getLastTabbableIn(container, includeContainer, fallbackToFocusable) {
  const allTabbable = getAllTabbableIn(
    container,
    includeContainer,
    fallbackToFocusable
  );
  return allTabbable[allTabbable.length - 1] || null;
}
function getLastTabbable(fallbackToFocusable) {
  return getLastTabbableIn(document.body, false, fallbackToFocusable);
}
function getNextTabbableIn(container, includeContainer, fallbackToFirst, fallbackToFocusable) {
  const activeElement = (0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(container);
  const allFocusable = getAllFocusableIn(container, includeContainer);
  const activeIndex = allFocusable.indexOf(activeElement);
  const nextFocusableElements = allFocusable.slice(activeIndex + 1);
  return nextFocusableElements.find(isTabbable) || (fallbackToFirst ? allFocusable.find(isTabbable) : null) || (fallbackToFocusable ? nextFocusableElements[0] : null) || null;
}
function getNextTabbable(fallbackToFirst, fallbackToFocusable) {
  return getNextTabbableIn(
    document.body,
    false,
    fallbackToFirst,
    fallbackToFocusable
  );
}
function getPreviousTabbableIn(container, includeContainer, fallbackToLast, fallbackToFocusable) {
  const activeElement = (0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(container);
  const allFocusable = getAllFocusableIn(container, includeContainer).reverse();
  const activeIndex = allFocusable.indexOf(activeElement);
  const previousFocusableElements = allFocusable.slice(activeIndex + 1);
  return previousFocusableElements.find(isTabbable) || (fallbackToLast ? allFocusable.find(isTabbable) : null) || (fallbackToFocusable ? previousFocusableElements[0] : null) || null;
}
function getPreviousTabbable(fallbackToFirst, fallbackToFocusable) {
  return getPreviousTabbableIn(
    document.body,
    false,
    fallbackToFirst,
    fallbackToFocusable
  );
}
function getClosestFocusable(element) {
  while (element && !isFocusable(element)) {
    element = element.closest(selector);
  }
  return element || null;
}
function hasFocus(element) {
  const activeElement = (0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(element);
  if (!activeElement) return false;
  if (activeElement === element) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  return activeDescendant === element.id;
}
function hasFocusWithin(element) {
  const activeElement = (0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(element);
  if (!activeElement) return false;
  if ((0,_chunks_DTR5TSDJ_js__WEBPACK_IMPORTED_MODULE_0__.contains)(element, activeElement)) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (!("id" in element)) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector(`#${CSS.escape(activeDescendant)}`);
}
function focusIfNeeded(element) {
  if (!hasFocusWithin(element) && isFocusable(element)) {
    element.focus();
  }
}
function disableFocus(element) {
  var _a;
  const currentTabindex = (_a = element.getAttribute("tabindex")) != null ? _a : "";
  element.setAttribute("data-tabindex", currentTabindex);
  element.setAttribute("tabindex", "-1");
}
function disableFocusIn(container, includeContainer) {
  const tabbableElements = getAllTabbableIn(container, includeContainer);
  for (const element of tabbableElements) {
    disableFocus(element);
  }
}
function restoreFocusIn(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  const restoreTabIndex = (element) => {
    const tabindex = element.getAttribute("data-tabindex");
    element.removeAttribute("data-tabindex");
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  };
  if (container.hasAttribute("data-tabindex")) {
    restoreTabIndex(container);
  }
  for (const element of elements) {
    restoreTabIndex(element);
  }
}
function focusIntoView(element, options) {
  if (!("scrollIntoView" in element)) {
    element.focus();
  } else {
    element.focus({ preventScroll: true });
    element.scrollIntoView((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({ block: "nearest", inline: "nearest" }, options));
  }
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/3XAVFTCA.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/3XAVFTCA.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagContextProvider: () => (/* binding */ TagContextProvider),
/* harmony export */   TagRemoveIdContext: () => (/* binding */ TagRemoveIdContext),
/* harmony export */   TagScopedContextProvider: () => (/* binding */ TagScopedContextProvider),
/* harmony export */   TagValueContext: () => (/* binding */ TagValueContext),
/* harmony export */   useTagContext: () => (/* binding */ useTagContext),
/* harmony export */   useTagProviderContext: () => (/* binding */ useTagProviderContext),
/* harmony export */   useTagScopedContext: () => (/* binding */ useTagScopedContext)
/* harmony export */ });
/* harmony import */ var _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./P7GR5CS5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";



// src/tag/tag-context.tsx

var TagValueContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
var TagRemoveIdContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  null
);
var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_2__.CompositeContextProvider],
  [_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_2__.CompositeScopedContextProvider]
);
var useTagContext = ctx.useContext;
var useTagScopedContext = ctx.useScopedContext;
var useTagProviderContext = ctx.useProviderContext;
var TagContextProvider = ctx.ContextProvider;
var TagScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __objRest: () => (/* binding */ __objRest),
/* harmony export */   __spreadProps: () => (/* binding */ __spreadProps),
/* harmony export */   __spreadValues: () => (/* binding */ __spreadValues)
/* harmony export */ });
"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/4CMBR7SL.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/4CMBR7SL.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCompositeStore: () => (/* binding */ useCompositeStore),
/* harmony export */   useCompositeStoreOptions: () => (/* binding */ useCompositeStoreOptions),
/* harmony export */   useCompositeStoreProps: () => (/* binding */ useCompositeStoreProps)
/* harmony export */ });
/* harmony import */ var _C3IKGW5T_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./C3IKGW5T.js */ "./node_modules/@ariakit/react-core/esm/__chunks/C3IKGW5T.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_composite_composite_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/composite/composite-store */ "./node_modules/@ariakit/core/esm/__chunks/AJZ4BYF3.js");
"use client";





// src/composite/composite-store.ts

function useCompositeStoreOptions(props) {
  const id = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__.useId)(props.id);
  return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({ id }, props);
}
function useCompositeStoreProps(store, update, props) {
  store = (0,_C3IKGW5T_js__WEBPACK_IMPORTED_MODULE_2__.useCollectionStoreProps)(store, update, props);
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "activeId", "setActiveId");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "includesBaseElement");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "virtualFocus");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "orientation");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "rtl");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "focusLoop");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "focusWrap");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStoreProps)(store, props, "focusShift");
  return store;
}
function useCompositeStore(props = {}) {
  props = useCompositeStoreOptions(props);
  const [store, update] = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_3__.useStore)(_ariakit_core_composite_composite_store__WEBPACK_IMPORTED_MODULE_4__.createCompositeStore, props);
  return useCompositeStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/5VQZOHHZ.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/5VQZOHHZ.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findFirstEnabledItem: () => (/* binding */ findFirstEnabledItem),
/* harmony export */   flipItems: () => (/* binding */ flipItems),
/* harmony export */   focusSilently: () => (/* binding */ focusSilently),
/* harmony export */   getEnabledItem: () => (/* binding */ getEnabledItem),
/* harmony export */   groupItemsByRows: () => (/* binding */ groupItemsByRows),
/* harmony export */   isItem: () => (/* binding */ isItem),
/* harmony export */   selectTextField: () => (/* binding */ selectTextField),
/* harmony export */   silentlyFocused: () => (/* binding */ silentlyFocused)
/* harmony export */ });
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
"use client";

// src/composite/utils.ts

var NULL_ITEM = { id: null };
function flipItems(items, activeId, shouldInsertNullItem = false) {
  const index = items.findIndex((item) => item.id === activeId);
  return [
    ...items.slice(index + 1),
    ...shouldInsertNullItem ? [NULL_ITEM] : [],
    ...items.slice(0, index)
  ];
}
function findFirstEnabledItem(items, excludeId) {
  return items.find((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getEnabledItem(store, id) {
  if (!id) return null;
  return store.item(id) || null;
}
function groupItemsByRows(items) {
  const rows = [];
  for (const item of items) {
    const row = rows.find((currentRow) => {
      var _a;
      return ((_a = currentRow[0]) == null ? void 0 : _a.rowId) === item.rowId;
    });
    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}
function selectTextField(element, collapseToEnd = false) {
  if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isTextField)(element)) {
    element.setSelectionRange(
      collapseToEnd ? element.value.length : 0,
      element.value.length
    );
  } else if (element.isContentEditable) {
    const selection = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocument)(element).getSelection();
    selection == null ? void 0 : selection.selectAllChildren(element);
    if (collapseToEnd) {
      selection == null ? void 0 : selection.collapseToEnd();
    }
  }
}
var FOCUS_SILENTLY = Symbol("FOCUS_SILENTLY");
function focusSilently(element) {
  element[FOCUS_SILENTLY] = true;
  element.focus({ preventScroll: true });
}
function silentlyFocused(element) {
  const isSilentlyFocused = element[FOCUS_SILENTLY];
  delete element[FOCUS_SILENTLY];
  return isSilentlyFocused;
}
function isItem(store, element, exclude) {
  if (!element) return false;
  if (element === exclude) return false;
  const item = store.item(element.id);
  if (!item) return false;
  if (exclude && item.element === exclude) return false;
  return true;
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAttribute: () => (/* binding */ useAttribute),
/* harmony export */   useBooleanEvent: () => (/* binding */ useBooleanEvent),
/* harmony export */   useDeferredValue: () => (/* binding */ useDeferredValue),
/* harmony export */   useEvent: () => (/* binding */ useEvent),
/* harmony export */   useForceUpdate: () => (/* binding */ useForceUpdate),
/* harmony export */   useId: () => (/* binding */ useId),
/* harmony export */   useInitialValue: () => (/* binding */ useInitialValue),
/* harmony export */   useIsMouseMoving: () => (/* binding */ useIsMouseMoving),
/* harmony export */   useLazyValue: () => (/* binding */ useLazyValue),
/* harmony export */   useLiveRef: () => (/* binding */ useLiveRef),
/* harmony export */   useMergeRefs: () => (/* binding */ useMergeRefs),
/* harmony export */   useMetadataProps: () => (/* binding */ useMetadataProps),
/* harmony export */   usePortalRef: () => (/* binding */ usePortalRef),
/* harmony export */   usePreviousValue: () => (/* binding */ usePreviousValue),
/* harmony export */   useSafeLayoutEffect: () => (/* binding */ useSafeLayoutEffect),
/* harmony export */   useTagName: () => (/* binding */ useTagName),
/* harmony export */   useTransactionState: () => (/* binding */ useTransactionState),
/* harmony export */   useUpdateEffect: () => (/* binding */ useUpdateEffect),
/* harmony export */   useUpdateLayoutEffect: () => (/* binding */ useUpdateLayoutEffect),
/* harmony export */   useWrapElement: () => (/* binding */ useWrapElement)
/* harmony export */ });
/* harmony import */ var _SK3NAZA3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SK3NAZA3.js */ "./node_modules/@ariakit/react-core/esm/__chunks/SK3NAZA3.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";



// src/utils/hooks.ts




var _React = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2))));
var useReactId = _React.useId;
var useReactDeferredValue = _React.useDeferredValue;
var useReactInsertionEffect = _React.useInsertionEffect;
var useSafeLayoutEffect = _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.canUseDOM ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function useInitialValue(value) {
  const [initialValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  return initialValue;
}
function useLazyValue(init) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  if (ref.current === void 0) {
    ref.current = init();
  }
  return ref.current;
}
function useLiveRef(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  useSafeLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
function usePreviousValue(value) {
  const [previousValue, setPreviousValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  if (value !== previousValue) {
    setPreviousValue(value);
  }
  return previousValue;
}
function useEvent(callback) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (useReactInsertionEffect) {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    ref.current = callback;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);
  }, []);
}
function useTransactionState(callback) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  useSafeLayoutEffect(() => {
    if (state == null) return;
    if (!callback) return;
    let prevState = null;
    callback((prev) => {
      prevState = prev;
      return state;
    });
    return () => {
      callback(prevState);
    };
  }, [state, callback]);
  return [state, setState];
}
function useMergeRefs(...refs) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!refs.some(Boolean)) return;
    return (value) => {
      for (const ref of refs) {
        (0,_SK3NAZA3_js__WEBPACK_IMPORTED_MODULE_3__.setRef)(ref, value);
      }
    };
  }, refs);
}
function useId(defaultId) {
  if (useReactId) {
    const reactId = useReactId();
    if (defaultId) return defaultId;
    return reactId;
  }
  const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultId);
  useSafeLayoutEffect(() => {
    if (defaultId || id) return;
    const random = Math.random().toString(36).slice(2, 8);
    setId(`id-${random}`);
  }, [defaultId, id]);
  return defaultId || id;
}
function useDeferredValue(value) {
  if (useReactDeferredValue) {
    return useReactDeferredValue(value);
  }
  const [deferredValue, setDeferredValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const raf = requestAnimationFrame(() => setDeferredValue(value));
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return deferredValue;
}
function useTagName(refOrElement, type) {
  const stringOrUndefined = (type2) => {
    if (typeof type2 !== "string") return;
    return type2;
  };
  const [tagName, setTagName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => stringOrUndefined(type));
  useSafeLayoutEffect(() => {
    const element = refOrElement && "current" in refOrElement ? refOrElement.current : refOrElement;
    setTagName((element == null ? void 0 : element.tagName.toLowerCase()) || stringOrUndefined(type));
  }, [refOrElement, type]);
  return tagName;
}
function useAttribute(refOrElement, attributeName, defaultValue) {
  const initialValue = useInitialValue(defaultValue);
  const [attribute, setAttribute] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const element = refOrElement && "current" in refOrElement ? refOrElement.current : refOrElement;
    if (!element) return;
    const callback = () => {
      const value = element.getAttribute(attributeName);
      setAttribute(value == null ? initialValue : value);
    };
    const observer = new MutationObserver(callback);
    observer.observe(element, { attributeFilter: [attributeName] });
    callback();
    return () => observer.disconnect();
  }, [refOrElement, attributeName, initialValue]);
  return attribute;
}
function useUpdateEffect(effect, deps) {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
  }, deps);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
    () => () => {
      mounted.current = false;
    },
    []
  );
}
function useUpdateLayoutEffect(effect, deps) {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  useSafeLayoutEffect(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
  }, deps);
  useSafeLayoutEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );
}
function useForceUpdate() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(() => [], []);
}
function useBooleanEvent(booleanOrCallback) {
  return useEvent(
    typeof booleanOrCallback === "function" ? booleanOrCallback : () => booleanOrCallback
  );
}
function useWrapElement(props, callback, deps = []) {
  const wrapElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
    (element) => {
      if (props.wrapElement) {
        element = props.wrapElement(element);
      }
      return callback(element);
    },
    [...deps, props.wrapElement]
  );
  return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), { wrapElement });
}
function usePortalRef(portalProp = false, portalRefProp) {
  const [portalNode, setPortalNode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const portalRef = useMergeRefs(setPortalNode, portalRefProp);
  const domReady = !portalProp || portalNode;
  return { portalRef, portalNode, domReady };
}
function useMetadataProps(props, key, value) {
  const parent = props.onLoadedMetadataCapture;
  const onLoadedMetadataCapture = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return Object.assign(() => {
    }, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, parent), { [key]: value }));
  }, [parent, key, value]);
  return [parent == null ? void 0 : parent[key], { onLoadedMetadataCapture }];
}
function useIsMouseMoving() {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.addGlobalEventListener)("mousemove", setMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.addGlobalEventListener)("mousedown", resetMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.addGlobalEventListener)("mouseup", resetMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.addGlobalEventListener)("keydown", resetMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.addGlobalEventListener)("scroll", resetMouseMoving, true);
  }, []);
  const isMouseMoving = useEvent(() => mouseMoving);
  return isMouseMoving;
}
var mouseMoving = false;
var previousScreenX = 0;
var previousScreenY = 0;
function hasMouseMovement(event) {
  const movementX = event.movementX || event.screenX - previousScreenX;
  const movementY = event.movementY || event.screenY - previousScreenY;
  previousScreenX = event.screenX;
  previousScreenY = event.screenY;
  return movementX || movementY || "development" === "test";
}
function setMouseMoving(event) {
  if (!hasMouseMovement(event)) return;
  mouseMoving = true;
}
function resetMouseMoving() {
  mouseMoving = false;
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/BM6PGYQY.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/BM6PGYQY.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDialogStore: () => (/* binding */ useDialogStore),
/* harmony export */   useDialogStoreProps: () => (/* binding */ useDialogStoreProps)
/* harmony export */ });
/* harmony import */ var _WYCIER3C_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WYCIER3C.js */ "./node_modules/@ariakit/react-core/esm/__chunks/WYCIER3C.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ariakit_core_dialog_dialog_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/dialog/dialog-store */ "./node_modules/@ariakit/core/esm/__chunks/FZZ2AVHF.js");
"use client";



// src/dialog/dialog-store.ts

function useDialogStoreProps(store, update, props) {
  return (0,_WYCIER3C_js__WEBPACK_IMPORTED_MODULE_0__.useDisclosureStoreProps)(store, update, props);
}
function useDialogStore(props = {}) {
  const [store, update] = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_dialog_dialog_store__WEBPACK_IMPORTED_MODULE_2__.createDialogStore, props);
  return useDialogStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/C3IKGW5T.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/C3IKGW5T.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCollectionStore: () => (/* binding */ useCollectionStore),
/* harmony export */   useCollectionStoreProps: () => (/* binding */ useCollectionStoreProps)
/* harmony export */ });
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _ariakit_core_collection_collection_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/collection/collection-store */ "./node_modules/@ariakit/core/esm/__chunks/CYQWQL4J.js");
"use client";



// src/collection/collection-store.ts

function useCollectionStoreProps(store, update, props) {
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__.useUpdateEffect)(update, [props.store]);
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "items", "setItems");
  return store;
}
function useCollectionStore(props = {}) {
  const [store, update] = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_collection_collection_store__WEBPACK_IMPORTED_MODULE_2__.createCollectionStore, props);
  return useCollectionStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/FEOFMWBY.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/FEOFMWBY.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useComboboxStore: () => (/* binding */ useComboboxStore),
/* harmony export */   useComboboxStoreOptions: () => (/* binding */ useComboboxStoreOptions),
/* harmony export */   useComboboxStoreProps: () => (/* binding */ useComboboxStoreProps)
/* harmony export */ });
/* harmony import */ var _3XAVFTCA_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3XAVFTCA.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3XAVFTCA.js");
/* harmony import */ var _4CMBR7SL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./4CMBR7SL.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4CMBR7SL.js");
/* harmony import */ var _O2PQ2652_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./O2PQ2652.js */ "./node_modules/@ariakit/react-core/esm/__chunks/O2PQ2652.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_combobox_combobox_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/combobox/combobox-store */ "./node_modules/@ariakit/core/esm/combobox/combobox-store.js");
"use client";







// src/combobox/combobox-store.ts

function useComboboxStoreOptions(props) {
  const tag = (0,_3XAVFTCA_js__WEBPACK_IMPORTED_MODULE_0__.useTagContext)();
  props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), {
    tag: props.tag !== void 0 ? props.tag : tag
  });
  return (0,_4CMBR7SL_js__WEBPACK_IMPORTED_MODULE_2__.useCompositeStoreOptions)(props);
}
function useComboboxStoreProps(store, update, props) {
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useUpdateEffect)(update, [props.tag]);
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_4__.useStoreProps)(store, props, "value", "setValue");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_4__.useStoreProps)(store, props, "selectedValue", "setSelectedValue");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_4__.useStoreProps)(store, props, "resetValueOnHide");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_4__.useStoreProps)(store, props, "resetValueOnSelect");
  return Object.assign(
    (0,_4CMBR7SL_js__WEBPACK_IMPORTED_MODULE_2__.useCompositeStoreProps)(
      (0,_O2PQ2652_js__WEBPACK_IMPORTED_MODULE_5__.usePopoverStoreProps)(store, update, props),
      update,
      props
    ),
    { tag: props.tag }
  );
}
function useComboboxStore(props = {}) {
  props = useComboboxStoreOptions(props);
  const [store, update] = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_4__.useStore)(_ariakit_core_combobox_combobox_store__WEBPACK_IMPORTED_MODULE_6__.createComboboxStore, props);
  return useComboboxStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/HUWAI7RB.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/HUWAI7RB.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxList: () => (/* binding */ ComboboxList),
/* harmony export */   useComboboxList: () => (/* binding */ useComboboxList)
/* harmony export */ });
/* harmony import */ var _VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VEVQD5MH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js");
/* harmony import */ var _VGCJ63VH_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VGCJ63VH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VGCJ63VH.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";






// src/combobox/combobox-list.tsx



var TagName = "div";
var useComboboxList = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  function useComboboxList2(_a) {
    var _b = _a, { store, alwaysVisible } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, ["store", "alwaysVisible"]);
    const scopedContext = (0,_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.useComboboxScopedContext)(true);
    const context = (0,_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.useComboboxContext)();
    store = store || context;
    const scopedContextSameStore = !!store && store === scopedContext;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.invariant)(
      store,
       true && "ComboboxList must receive a `store` prop or be wrapped in a ComboboxProvider component."
    );
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const id = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useId)(props.id);
    const mounted = store.useState("mounted");
    const hidden = (0,_VGCJ63VH_js__WEBPACK_IMPORTED_MODULE_7__.isHidden)(mounted, props.hidden, alwaysVisible);
    const style = hidden ? (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, props.style), { display: "none" }) : props.style;
    const multiSelectable = store.useState(
      (state) => Array.isArray(state.selectedValue)
    );
    const role = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useAttribute)(ref, "role", props.role);
    const isCompositeRole = role === "listbox" || role === "tree" || role === "grid";
    const ariaMultiSelectable = isCompositeRole ? multiSelectable || void 0 : void 0;
    const [hasListboxInside, setHasListboxInside] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const contentElement = store.useState("contentElement");
    (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useSafeLayoutEffect)(() => {
      if (!mounted) return;
      const element = ref.current;
      if (!element) return;
      if (contentElement !== element) return;
      const callback = () => {
        setHasListboxInside(!!element.querySelector("[role='listbox']"));
      };
      const observer = new MutationObserver(callback);
      observer.observe(element, {
        subtree: true,
        childList: true,
        attributeFilter: ["role"]
      });
      callback();
      return () => observer.disconnect();
    }, [mounted, contentElement]);
    if (!hasListboxInside) {
      props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
        role: "listbox",
        "aria-multiselectable": ariaMultiSelectable
      }, props);
    }
    props = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxScopedContextProvider, { value: store, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxListRoleContext.Provider, { value: role, children: element }) }),
      [store, role]
    );
    const setContentElement = id && (!scopedContext || !scopedContextSameStore) ? store.setContentElement : null;
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      id,
      hidden
    }, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useMergeRefs)(setContentElement, ref, props.ref),
      style
    });
    return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.removeUndefinedValues)(props);
  }
);
var ComboboxList = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function ComboboxList2(props) {
  const htmlProps = useComboboxList(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createElement)(TagName, htmlProps);
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/ITI7HKP4.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/ITI7HKP4.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Composite: () => (/* binding */ Composite),
/* harmony export */   useComposite: () => (/* binding */ useComposite)
/* harmony export */ });
/* harmony import */ var _5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./5VQZOHHZ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/5VQZOHHZ.js");
/* harmony import */ var _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./P7GR5CS5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js");
/* harmony import */ var _LVA2YJMS_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./LVA2YJMS.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LVA2YJMS.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/array */ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";







// src/composite/composite.tsx







var TagName = "div";
function isGrid(items) {
  return items.some((item) => !!item.rowId);
}
function isPrintableKey(event) {
  const target = event.target;
  if (target && !(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(target)) return false;
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
function isModifierKey(event) {
  return event.key === "Shift" || event.key === "Control" || event.key === "Alt" || event.key === "Meta";
}
function useKeyboardEventProxy(store, onKeyboardEvent, previousElementRef) {
  return (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
    var _a;
    onKeyboardEvent == null ? void 0 : onKeyboardEvent(event);
    if (event.defaultPrevented) return;
    if (event.isPropagationStopped()) return;
    if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) return;
    if (isModifierKey(event)) return;
    if (isPrintableKey(event)) return;
    const state = store.getState();
    const activeElement = (_a = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, state.activeId)) == null ? void 0 : _a.element;
    if (!activeElement) return;
    const _b = event, { view } = _b, eventInit = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__objRest)(_b, ["view"]);
    const previousElement = previousElementRef == null ? void 0 : previousElementRef.current;
    if (activeElement !== previousElement) {
      activeElement.focus();
    }
    if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireKeyboardEvent)(activeElement, event.type, eventInit)) {
      event.preventDefault();
    }
    if (event.currentTarget.contains(activeElement)) {
      event.stopPropagation();
    }
  });
}
function findFirstEnabledItemInTheLastRow(items) {
  return (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.findFirstEnabledItem)(
    (0,_ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_7__.flatten2DArray)((0,_ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_7__.reverseArray)((0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.groupItemsByRows)(items)))
  );
}
function useScheduleFocus(store) {
  const [scheduled, setScheduled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const schedule = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setScheduled(true), []);
  const activeItem = store.useState(
    (state) => (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, state.activeId)
  );
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const activeElement = activeItem == null ? void 0 : activeItem.element;
    if (!scheduled) return;
    if (!activeElement) return;
    setScheduled(false);
    activeElement.focus({ preventScroll: true });
  }, [activeItem, scheduled]);
  return schedule;
}
var useComposite = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_8__.createHook)(
  function useComposite2(_a) {
    var _b = _a, {
      store,
      composite = true,
      focusOnMove = composite,
      moveOnKeyPress = true
    } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__objRest)(_b, [
      "store",
      "composite",
      "focusOnMove",
      "moveOnKeyPress"
    ]);
    const context = (0,_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_9__.useCompositeProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_10__.invariant)(
      store,
       true && "Composite must receive a `store` prop or be wrapped in a CompositeProvider component."
    );
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const previousElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const scheduleFocus = useScheduleFocus(store);
    const moves = store.useState("moves");
    const [, setBaseElement] = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useTransactionState)(
      composite ? store.setBaseElement : null
    );
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      var _a2;
      if (!store) return;
      if (!moves) return;
      if (!composite) return;
      if (!focusOnMove) return;
      const { activeId: activeId2 } = store.getState();
      const itemElement = (_a2 = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId2)) == null ? void 0 : _a2.element;
      if (!itemElement) return;
      (0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_11__.focusIntoView)(itemElement);
    }, [store, moves, composite, focusOnMove]);
    (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useSafeLayoutEffect)(() => {
      if (!store) return;
      if (!moves) return;
      if (!composite) return;
      const { baseElement, activeId: activeId2 } = store.getState();
      const isSelfAcive = activeId2 === null;
      if (!isSelfAcive) return;
      if (!baseElement) return;
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (previousElement) {
        (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, { relatedTarget: baseElement });
      }
      if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_11__.hasFocus)(baseElement)) {
        baseElement.focus();
      }
    }, [store, moves, composite]);
    const activeId = store.useState("activeId");
    const virtualFocus = store.useState("virtualFocus");
    (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useSafeLayoutEffect)(() => {
      var _a2;
      if (!store) return;
      if (!composite) return;
      if (!virtualFocus) return;
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (!previousElement) return;
      const activeElement = (_a2 = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId)) == null ? void 0 : _a2.element;
      const relatedTarget = activeElement || (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getActiveElement)(previousElement);
      if (relatedTarget === previousElement) return;
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, { relatedTarget });
    }, [store, activeId, virtualFocus, composite]);
    const onKeyDownCapture = useKeyboardEventProxy(
      store,
      props.onKeyDownCapture,
      previousElementRef
    );
    const onKeyUpCapture = useKeyboardEventProxy(
      store,
      props.onKeyUpCapture,
      previousElementRef
    );
    const onFocusCaptureProp = props.onFocusCapture;
    const onFocusCapture = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      onFocusCaptureProp == null ? void 0 : onFocusCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!store) return;
      const { virtualFocus: virtualFocus2 } = store.getState();
      if (!virtualFocus2) return;
      const previousActiveElement = event.relatedTarget;
      const isSilentlyFocused = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.silentlyFocused)(event.currentTarget);
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event) && isSilentlyFocused) {
        event.stopPropagation();
        previousElementRef.current = previousActiveElement;
      }
    });
    const onFocusProp = props.onFocus;
    const onFocus = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      if (event.defaultPrevented) return;
      if (!composite) return;
      if (!store) return;
      const { relatedTarget } = event;
      const { virtualFocus: virtualFocus2 } = store.getState();
      if (virtualFocus2) {
        if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event) && !(0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.isItem)(store, relatedTarget)) {
          queueMicrotask(scheduleFocus);
        }
      } else if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) {
        store.setActiveId(null);
      }
    });
    const onBlurCaptureProp = props.onBlurCapture;
    const onBlurCapture = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      var _a2;
      onBlurCaptureProp == null ? void 0 : onBlurCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!store) return;
      const { virtualFocus: virtualFocus2, activeId: activeId2 } = store.getState();
      if (!virtualFocus2) return;
      const activeElement = (_a2 = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId2)) == null ? void 0 : _a2.element;
      const nextActiveElement = event.relatedTarget;
      const nextActiveElementIsItem = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.isItem)(store, nextActiveElement);
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event) && nextActiveElementIsItem) {
        if (nextActiveElement === activeElement) {
          if (previousElement && previousElement !== nextActiveElement) {
            (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, event);
          }
        } else if (activeElement) {
          (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(activeElement, event);
        } else if (previousElement) {
          (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, event);
        }
        event.stopPropagation();
      } else {
        const targetIsItem = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.isItem)(store, event.target);
        if (!targetIsItem && activeElement) {
          (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(activeElement, event);
        }
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const moveOnKeyPressProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useBooleanEvent)(moveOnKeyPress);
    const onKeyDown = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      var _a2;
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented) return;
      if (!store) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) return;
      const { orientation, renderedItems, activeId: activeId2 } = store.getState();
      const activeItem = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId2);
      if ((_a2 = activeItem == null ? void 0 : activeItem.element) == null ? void 0 : _a2.isConnected) return;
      const isVertical = orientation !== "horizontal";
      const isHorizontal = orientation !== "vertical";
      const grid = isGrid(renderedItems);
      const isHorizontalKey = event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End";
      if (isHorizontalKey && (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(event.currentTarget)) return;
      const up = () => {
        if (grid) {
          const item = findFirstEnabledItemInTheLastRow(renderedItems);
          return item == null ? void 0 : item.id;
        }
        return store == null ? void 0 : store.last();
      };
      const keyMap = {
        ArrowUp: (grid || isVertical) && up,
        ArrowRight: (grid || isHorizontal) && store.first,
        ArrowDown: (grid || isVertical) && store.first,
        ArrowLeft: (grid || isHorizontal) && store.last,
        Home: store.first,
        End: store.last,
        PageUp: store.first,
        PageDown: store.last
      };
      const action = keyMap[event.key];
      if (action) {
        const id = action();
        if (id !== void 0) {
          if (!moveOnKeyPressProp(event)) return;
          event.preventDefault();
          store.move(id);
        }
      }
    });
    props = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_9__.CompositeContextProvider, { value: store, children: element }),
      [store]
    );
    const activeDescendant = store.useState((state) => {
      var _a2;
      if (!store) return;
      if (!composite) return;
      if (!state.virtualFocus) return;
      return (_a2 = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, state.activeId)) == null ? void 0 : _a2.id;
    });
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({
      "aria-activedescendant": activeDescendant
    }, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)(ref, setBaseElement, props.ref),
      onKeyDownCapture,
      onKeyUpCapture,
      onFocusCapture,
      onFocus,
      onBlurCapture,
      onKeyDown
    });
    const focusable = store.useState(
      (state) => composite && (state.virtualFocus || state.activeId === null)
    );
    props = (0,_LVA2YJMS_js__WEBPACK_IMPORTED_MODULE_12__.useFocusable)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({ focusable }, props));
    return props;
  }
);
var Composite = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_8__.forwardRef)(function Composite2(props) {
  const htmlProps = useComposite(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_8__.createElement)(TagName, htmlProps);
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/KUU7WJ55.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/KUU7WJ55.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Command: () => (/* binding */ Command),
/* harmony export */   useCommand: () => (/* binding */ useCommand)
/* harmony export */ });
/* harmony import */ var _LVA2YJMS_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LVA2YJMS.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LVA2YJMS.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/platform */ "./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";





// src/command/command.tsx





var TagName = "button";
function isNativeClick(event) {
  if (!event.isTrusted) return false;
  const element = event.currentTarget;
  if (event.key === "Enter") {
    return (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)(element) || element.tagName === "SUMMARY" || element.tagName === "A";
  }
  if (event.key === " ") {
    return (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)(element) || element.tagName === "SUMMARY" || element.tagName === "INPUT" || element.tagName === "SELECT";
  }
  return false;
}
var symbol = Symbol("command");
var useCommand = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  function useCommand2(_a) {
    var _b = _a, { clickOnEnter = true, clickOnSpace = true } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, ["clickOnEnter", "clickOnSpace"]);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [isNativeButton, setIsNativeButton] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!ref.current) return;
      setIsNativeButton((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)(ref.current));
    }, []);
    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const activeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const disabled = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_4__.disabledFromProps)(props);
    const [isDuplicate, metadataProps] = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useMetadataProps)(props, symbol, true);
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      const element = event.currentTarget;
      if (event.defaultPrevented) return;
      if (isDuplicate) return;
      if (disabled) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.isSelfTarget)(event)) return;
      if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isTextField)(element)) return;
      if (element.isContentEditable) return;
      const isEnter = clickOnEnter && event.key === "Enter";
      const isSpace = clickOnSpace && event.key === " ";
      const shouldPreventEnter = event.key === "Enter" && !clickOnEnter;
      const shouldPreventSpace = event.key === " " && !clickOnSpace;
      if (shouldPreventEnter || shouldPreventSpace) {
        event.preventDefault();
        return;
      }
      if (isEnter || isSpace) {
        const nativeClick = isNativeClick(event);
        if (isEnter) {
          if (!nativeClick) {
            event.preventDefault();
            const _a2 = event, { view } = _a2, eventInit = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_a2, ["view"]);
            const click = () => (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.fireClickEvent)(element, eventInit);
            if ((0,_ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_7__.isFirefox)()) {
              (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.queueBeforeEvent)(element, "keyup", click);
            } else {
              queueMicrotask(click);
            }
          }
        } else if (isSpace) {
          activeRef.current = true;
          if (!nativeClick) {
            event.preventDefault();
            setActive(true);
          }
        }
      }
    });
    const onKeyUpProp = props.onKeyUp;
    const onKeyUp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onKeyUpProp == null ? void 0 : onKeyUpProp(event);
      if (event.defaultPrevented) return;
      if (isDuplicate) return;
      if (disabled) return;
      if (event.metaKey) return;
      const isSpace = clickOnSpace && event.key === " ";
      if (activeRef.current && isSpace) {
        activeRef.current = false;
        if (!isNativeClick(event)) {
          event.preventDefault();
          setActive(false);
          const element = event.currentTarget;
          const _a2 = event, { view } = _a2, eventInit = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_a2, ["view"]);
          queueMicrotask(() => (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.fireClickEvent)(element, eventInit));
        }
      }
    });
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      "data-active": active || void 0,
      type: isNativeButton ? "button" : void 0
    }, metadataProps), props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)(ref, props.ref),
      onKeyDown,
      onKeyUp
    });
    props = (0,_LVA2YJMS_js__WEBPACK_IMPORTED_MODULE_8__.useFocusable)(props);
    return props;
  }
);
var Command = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function Command2(props) {
  const htmlProps = useCommand(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createElement)(TagName, htmlProps);
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createHook: () => (/* binding */ createHook),
/* harmony export */   createStoreContext: () => (/* binding */ createStoreContext),
/* harmony export */   forwardRef: () => (/* binding */ forwardRef2),
/* harmony export */   memo: () => (/* binding */ memo2)
/* harmony export */ });
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _SK3NAZA3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SK3NAZA3.js */ "./node_modules/@ariakit/react-core/esm/__chunks/SK3NAZA3.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";




// src/utils/system.tsx


function forwardRef2(render) {
  const Role = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => render((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { ref })));
  Role.displayName = render.displayName || render.name;
  return Role;
}
function memo2(Component, propsAreEqual) {
  return react__WEBPACK_IMPORTED_MODULE_0__.memo(Component, propsAreEqual);
}
function createElement(Type, props) {
  const _a = props, { wrapElement, render } = _a, rest = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__objRest)(_a, ["wrapElement", "render"]);
  const mergedRef = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)(props.ref, (0,_SK3NAZA3_js__WEBPACK_IMPORTED_MODULE_4__.getRefProperty)(render));
  let element;
  if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(render)) {
    const renderProps = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, render.props), { ref: mergedRef });
    element = react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(render, (0,_SK3NAZA3_js__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(rest, renderProps));
  } else if (render) {
    element = render(rest);
  } else {
    element = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Type, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, rest));
  }
  if (wrapElement) {
    return wrapElement(element);
  }
  return element;
}
function createHook(useProps) {
  const useRole = (props = {}) => {
    return useProps(props);
  };
  useRole.displayName = useProps.name;
  return useRole;
}
function createStoreContext(providers = [], scopedProviders = []) {
  const context = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
  const scopedContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
  const useContext2 = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(context);
  const useScopedContext = (onlyScoped = false) => {
    const scoped = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scopedContext);
    const store = useContext2();
    if (onlyScoped) return scoped;
    return scoped || store;
  };
  const useProviderContext = () => {
    const scoped = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scopedContext);
    const store = useContext2();
    if (scoped && scoped === store) return;
    return store;
  };
  const ContextProvider = (props) => {
    return providers.reduceRight(
      (children, Provider) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Provider, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { children })),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(context.Provider, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props))
    );
  };
  const ScopedContextProvider = (props) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ContextProvider, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { children: scopedProviders.reduceRight(
      (children, Provider) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Provider, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { children })),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(scopedContext.Provider, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props))
    ) }));
  };
  return {
    context,
    scopedContext,
    useContext: useContext2,
    useScopedContext,
    useProviderContext,
    ContextProvider,
    ScopedContextProvider
  };
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/LVA2YJMS.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/LVA2YJMS.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Focusable: () => (/* binding */ Focusable),
/* harmony export */   isSafariFocusAncestor: () => (/* binding */ isSafariFocusAncestor),
/* harmony export */   useFocusable: () => (/* binding */ useFocusable)
/* harmony export */ });
/* harmony import */ var _SWN3JYXT_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SWN3JYXT.js */ "./node_modules/@ariakit/react-core/esm/__chunks/SWN3JYXT.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/platform */ "./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";





// src/focusable/focusable.tsx






var TagName = "div";
var isSafariBrowser = (0,_ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_1__.isSafari)();
var alwaysFocusVisibleInputTypes = [
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "number",
  "date",
  "month",
  "week",
  "time",
  "datetime",
  "datetime-local"
];
var safariFocusAncestorSymbol = Symbol("safariFocusAncestor");
function isSafariFocusAncestor(element) {
  if (!element) return false;
  return !!element[safariFocusAncestorSymbol];
}
function markSafariFocusAncestor(element, value) {
  if (!element) return;
  element[safariFocusAncestorSymbol] = value;
}
function isAlwaysFocusVisible(element) {
  const { tagName, readOnly, type } = element;
  if (tagName === "TEXTAREA" && !readOnly) return true;
  if (tagName === "SELECT" && !readOnly) return true;
  if (tagName === "INPUT" && !readOnly) {
    return alwaysFocusVisibleInputTypes.includes(type);
  }
  if (element.isContentEditable) return true;
  const role = element.getAttribute("role");
  if (role === "combobox" && element.dataset.name) {
    return true;
  }
  return false;
}
function getLabels(element) {
  if ("labels" in element) {
    return element.labels;
  }
  return null;
}
function isNativeCheckboxOrRadio(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "input" && element.type) {
    return element.type === "radio" || element.type === "checkbox";
  }
  return false;
}
function isNativeTabbable(tagName) {
  if (!tagName) return true;
  return tagName === "button" || tagName === "summary" || tagName === "input" || tagName === "select" || tagName === "textarea" || tagName === "a";
}
function supportsDisabledAttribute(tagName) {
  if (!tagName) return true;
  return tagName === "button" || tagName === "input" || tagName === "select" || tagName === "textarea";
}
function getTabIndex(focusable, trulyDisabled, nativeTabbable, supportsDisabled, tabIndexProp) {
  if (!focusable) {
    return tabIndexProp;
  }
  if (trulyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      return -1;
    }
    return;
  }
  if (nativeTabbable) {
    return tabIndexProp;
  }
  return tabIndexProp || 0;
}
function useDisableEvent(onEvent, disabled) {
  return (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
    onEvent == null ? void 0 : onEvent(event);
    if (event.defaultPrevented) return;
    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  });
}
var isKeyboardModality = true;
function onGlobalMouseDown(event) {
  const target = event.target;
  if (target && "hasAttribute" in target) {
    if (!target.hasAttribute("data-focus-visible")) {
      isKeyboardModality = false;
    }
  }
}
function onGlobalKeyDown(event) {
  if (event.metaKey) return;
  if (event.ctrlKey) return;
  if (event.altKey) return;
  isKeyboardModality = true;
}
var useFocusable = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(
  function useFocusable2(_a) {
    var _b = _a, {
      focusable = true,
      accessibleWhenDisabled,
      autoFocus,
      onFocusVisible
    } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, [
      "focusable",
      "accessibleWhenDisabled",
      "autoFocus",
      "onFocusVisible"
    ]);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!focusable) return;
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("mousedown", onGlobalMouseDown, true);
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("keydown", onGlobalKeyDown, true);
    }, [focusable]);
    if (isSafariBrowser) {
      (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!focusable) return;
        const element = ref.current;
        if (!element) return;
        if (!isNativeCheckboxOrRadio(element)) return;
        const labels = getLabels(element);
        if (!labels) return;
        const onMouseUp = () => queueMicrotask(() => element.focus());
        for (const label of labels) {
          label.addEventListener("mouseup", onMouseUp);
        }
        return () => {
          for (const label of labels) {
            label.removeEventListener("mouseup", onMouseUp);
          }
        };
      }, [focusable]);
    }
    const disabled = focusable && (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.disabledFromProps)(props);
    const trulyDisabled = !!disabled && !accessibleWhenDisabled;
    const [focusVisible, setFocusVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!focusable) return;
      if (trulyDisabled && focusVisible) {
        setFocusVisible(false);
      }
    }, [focusable, trulyDisabled, focusVisible]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!focusable) return;
      if (!focusVisible) return;
      const element = ref.current;
      if (!element) return;
      if (typeof IntersectionObserver === "undefined") return;
      const observer = new IntersectionObserver(() => {
        if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.isFocusable)(element)) {
          setFocusVisible(false);
        }
      });
      observer.observe(element);
      return () => observer.disconnect();
    }, [focusable, focusVisible]);
    const onKeyPressCapture = useDisableEvent(
      props.onKeyPressCapture,
      disabled
    );
    const onMouseDownCapture = useDisableEvent(
      props.onMouseDownCapture,
      disabled
    );
    const onClickCapture = useDisableEvent(props.onClickCapture, disabled);
    const onMouseDownProp = props.onMouseDown;
    const onMouseDown = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onMouseDownProp == null ? void 0 : onMouseDownProp(event);
      if (event.defaultPrevented) return;
      if (!focusable) return;
      const element = event.currentTarget;
      if (!isSafariBrowser) return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isPortalEvent)(event)) return;
      if (!(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_8__.isButton)(element) && !isNativeCheckboxOrRadio(element)) return;
      let receivedFocus = false;
      const onFocus = () => {
        receivedFocus = true;
      };
      const options = { capture: true, once: true };
      element.addEventListener("focusin", onFocus, options);
      const focusableContainer = (0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.getClosestFocusable)(element.parentElement);
      markSafariFocusAncestor(focusableContainer, true);
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.queueBeforeEvent)(element, "mouseup", () => {
        element.removeEventListener("focusin", onFocus, true);
        markSafariFocusAncestor(focusableContainer, false);
        if (receivedFocus) return;
        (0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.focusIfNeeded)(element);
      });
    });
    const handleFocusVisible = (event, currentTarget) => {
      if (currentTarget) {
        event.currentTarget = currentTarget;
      }
      if (!focusable) return;
      const element = event.currentTarget;
      if (!element) return;
      if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocus)(element)) return;
      onFocusVisible == null ? void 0 : onFocusVisible(event);
      if (event.defaultPrevented) return;
      element.dataset.focusVisible = "true";
      setFocusVisible(true);
    };
    const onKeyDownCaptureProp = props.onKeyDownCapture;
    const onKeyDownCapture = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onKeyDownCaptureProp == null ? void 0 : onKeyDownCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!focusable) return;
      if (focusVisible) return;
      if (event.metaKey) return;
      if (event.altKey) return;
      if (event.ctrlKey) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isSelfTarget)(event)) return;
      const element = event.currentTarget;
      const applyFocusVisible = () => handleFocusVisible(event, element);
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.queueBeforeEvent)(element, "focusout", applyFocusVisible);
    });
    const onFocusCaptureProp = props.onFocusCapture;
    const onFocusCapture = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onFocusCaptureProp == null ? void 0 : onFocusCaptureProp(event);
      if (event.defaultPrevented) return;
      if (!focusable) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isSelfTarget)(event)) {
        setFocusVisible(false);
        return;
      }
      const element = event.currentTarget;
      const applyFocusVisible = () => handleFocusVisible(event, element);
      if (isKeyboardModality || isAlwaysFocusVisible(event.target)) {
        (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.queueBeforeEvent)(event.target, "focusout", applyFocusVisible);
      } else {
        setFocusVisible(false);
      }
    });
    const onBlurProp = props.onBlur;
    const onBlur = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onBlurProp == null ? void 0 : onBlurProp(event);
      if (!focusable) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isFocusEventOutside)(event)) return;
      setFocusVisible(false);
    });
    const autoFocusOnShow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_SWN3JYXT_js__WEBPACK_IMPORTED_MODULE_9__.FocusableContext);
    const autoFocusRef = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((element) => {
      if (!focusable) return;
      if (!autoFocus) return;
      if (!element) return;
      if (!autoFocusOnShow) return;
      queueMicrotask(() => {
        if ((0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocus)(element)) return;
        if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.isFocusable)(element)) return;
        element.focus();
      });
    });
    const tagName = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useTagName)(ref);
    const nativeTabbable = focusable && isNativeTabbable(tagName);
    const supportsDisabled = focusable && supportsDisabledAttribute(tagName);
    const styleProp = props.style;
    const style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
      if (trulyDisabled) {
        return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({ pointerEvents: "none" }, styleProp);
      }
      return styleProp;
    }, [trulyDisabled, styleProp]);
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({
      "data-focus-visible": focusable && focusVisible || void 0,
      "data-autofocus": autoFocus || void 0,
      "aria-disabled": disabled || void 0
    }, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_2__.useMergeRefs)(ref, autoFocusRef, props.ref),
      style,
      tabIndex: getTabIndex(
        focusable,
        trulyDisabled,
        nativeTabbable,
        supportsDisabled,
        props.tabIndex
      ),
      disabled: supportsDisabled && trulyDisabled ? true : void 0,
      // TODO: Test Focusable contentEditable.
      contentEditable: disabled ? void 0 : props.contentEditable,
      onKeyPressCapture,
      onClickCapture,
      onMouseDownCapture,
      onMouseDown,
      onKeyDownCapture,
      onFocusCapture,
      onBlur
    });
    return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.removeUndefinedValues)(props);
  }
);
var Focusable = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function Focusable2(props) {
  const htmlProps = useFocusable(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.createElement)(TagName, htmlProps);
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/MTZPJQMC.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/MTZPJQMC.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverContextProvider: () => (/* binding */ PopoverContextProvider),
/* harmony export */   PopoverScopedContextProvider: () => (/* binding */ PopoverScopedContextProvider),
/* harmony export */   usePopoverContext: () => (/* binding */ usePopoverContext),
/* harmony export */   usePopoverProviderContext: () => (/* binding */ usePopoverProviderContext),
/* harmony export */   usePopoverScopedContext: () => (/* binding */ usePopoverScopedContext)
/* harmony export */ });
/* harmony import */ var _RS7LB2H4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RS7LB2H4.js */ "./node_modules/@ariakit/react-core/esm/__chunks/RS7LB2H4.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
"use client";



// src/popover/popover-context.tsx
var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createStoreContext)(
  [_RS7LB2H4_js__WEBPACK_IMPORTED_MODULE_1__.DialogContextProvider],
  [_RS7LB2H4_js__WEBPACK_IMPORTED_MODULE_1__.DialogScopedContextProvider]
);
var usePopoverContext = ctx.useContext;
var usePopoverScopedContext = ctx.useScopedContext;
var usePopoverProviderContext = ctx.useProviderContext;
var PopoverContextProvider = ctx.ContextProvider;
var PopoverScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/O2PQ2652.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/O2PQ2652.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePopoverStore: () => (/* binding */ usePopoverStore),
/* harmony export */   usePopoverStoreProps: () => (/* binding */ usePopoverStoreProps)
/* harmony export */ });
/* harmony import */ var _BM6PGYQY_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BM6PGYQY.js */ "./node_modules/@ariakit/react-core/esm/__chunks/BM6PGYQY.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _ariakit_core_popover_popover_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/popover/popover-store */ "./node_modules/@ariakit/core/esm/__chunks/ME2CUF3F.js");
"use client";




// src/popover/popover-store.ts

function usePopoverStoreProps(store, update, props) {
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__.useUpdateEffect)(update, [props.popover]);
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "placement");
  return (0,_BM6PGYQY_js__WEBPACK_IMPORTED_MODULE_2__.useDialogStoreProps)(store, update, props);
}
function usePopoverStore(props = {}) {
  const [store, update] = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_popover_popover_store__WEBPACK_IMPORTED_MODULE_3__.createPopoverStore, props);
  return usePopoverStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/OMU7RWRV.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/OMU7RWRV.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverAnchor: () => (/* binding */ PopoverAnchor),
/* harmony export */   usePopoverAnchor: () => (/* binding */ usePopoverAnchor)
/* harmony export */ });
/* harmony import */ var _MTZPJQMC_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MTZPJQMC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/MTZPJQMC.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
"use client";





// src/popover/popover-anchor.tsx
var TagName = "div";
var usePopoverAnchor = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createHook)(
  function usePopoverAnchor2(_a) {
    var _b = _a, { store } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__objRest)(_b, ["store"]);
    const context = (0,_MTZPJQMC_js__WEBPACK_IMPORTED_MODULE_2__.usePopoverProviderContext)();
    store = store || context;
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)(store == null ? void 0 : store.setAnchorElement, props.ref)
    });
    return props;
  }
);
var PopoverAnchor = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function PopoverAnchor2(props) {
  const htmlProps = usePopoverAnchor(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(TagName, htmlProps);
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/P2CTZE2T.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/P2CTZE2T.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeItem: () => (/* binding */ CompositeItem),
/* harmony export */   useCompositeItem: () => (/* binding */ useCompositeItem)
/* harmony export */ });
/* harmony import */ var _RZ4GPYOB_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./RZ4GPYOB.js */ "./node_modules/@ariakit/react-core/esm/__chunks/RZ4GPYOB.js");
/* harmony import */ var _KUU7WJ55_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./KUU7WJ55.js */ "./node_modules/@ariakit/react-core/esm/__chunks/KUU7WJ55.js");
/* harmony import */ var _5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./5VQZOHHZ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/5VQZOHHZ.js");
/* harmony import */ var _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./P7GR5CS5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ariakit/core/utils/platform */ "./node_modules/@ariakit/core/esm/__chunks/QAGXQEUG.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";









// src/composite/composite-item.tsx






var TagName = "button";
function isEditableElement(element) {
  if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextbox)(element)) return true;
  return element.tagName === "INPUT" && !(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isButton)(element);
}
function getNextPageOffset(scrollingElement, pageUp = false) {
  const height = scrollingElement.clientHeight;
  const { top } = scrollingElement.getBoundingClientRect();
  const pageSize = Math.max(height * 0.875, height - 40) * 1.5;
  const pageOffset = pageUp ? height - pageSize + top : pageSize + top;
  if (scrollingElement.tagName === "HTML") {
    return pageOffset + scrollingElement.scrollTop;
  }
  return pageOffset;
}
function getItemOffset(itemElement, pageUp = false) {
  const { top } = itemElement.getBoundingClientRect();
  if (pageUp) {
    return top + itemElement.clientHeight;
  }
  return top;
}
function findNextPageItemId(element, store, next, pageUp = false) {
  var _a;
  if (!store) return;
  if (!next) return;
  const { renderedItems } = store.getState();
  const scrollingElement = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getScrollingElement)(element);
  if (!scrollingElement) return;
  const nextPageOffset = getNextPageOffset(scrollingElement, pageUp);
  let id;
  let prevDifference;
  for (let i = 0; i < renderedItems.length; i += 1) {
    const previousId = id;
    id = next(i);
    if (!id) break;
    if (id === previousId) continue;
    const itemElement = (_a = (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_3__.getEnabledItem)(store, id)) == null ? void 0 : _a.element;
    if (!itemElement) continue;
    const itemOffset = getItemOffset(itemElement, pageUp);
    const difference = itemOffset - nextPageOffset;
    const absDifference = Math.abs(difference);
    if (pageUp && difference <= 0 || !pageUp && difference >= 0) {
      if (prevDifference !== void 0 && prevDifference < absDifference) {
        id = previousId;
      }
      break;
    }
    prevDifference = absDifference;
  }
  return id;
}
function targetIsAnotherItem(event, store) {
  if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) return false;
  return (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_3__.isItem)(store, event.target);
}
var useCompositeItem = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_5__.createHook)(
  function useCompositeItem2(_a) {
    var _b = _a, {
      store,
      rowId: rowIdProp,
      preventScrollOnKeyDown = false,
      moveOnKeyPress = true,
      tabbable = false,
      getItem: getItemProp,
      "aria-setsize": ariaSetSizeProp,
      "aria-posinset": ariaPosInSetProp
    } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__objRest)(_b, [
      "store",
      "rowId",
      "preventScrollOnKeyDown",
      "moveOnKeyPress",
      "tabbable",
      "getItem",
      "aria-setsize",
      "aria-posinset"
    ]);
    const context = (0,_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_7__.useCompositeContext)();
    store = store || context;
    const id = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useId)(props.id);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const row = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_7__.CompositeRowContext);
    const disabled = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_9__.disabledFromProps)(props);
    const trulyDisabled = disabled && !props.accessibleWhenDisabled;
    const {
      rowId,
      baseElement,
      isActiveItem,
      ariaSetSize,
      ariaPosInSet,
      isTabbable
    } = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_10__.useStoreStateObject)(store, {
      rowId(state) {
        if (rowIdProp) return rowIdProp;
        if (!state) return;
        if (!(row == null ? void 0 : row.baseElement)) return;
        if (row.baseElement !== state.baseElement) return;
        return row.id;
      },
      baseElement(state) {
        return (state == null ? void 0 : state.baseElement) || void 0;
      },
      isActiveItem(state) {
        return !!state && state.activeId === id;
      },
      ariaSetSize(state) {
        if (ariaSetSizeProp != null) return ariaSetSizeProp;
        if (!state) return;
        if (!(row == null ? void 0 : row.ariaSetSize)) return;
        if (row.baseElement !== state.baseElement) return;
        return row.ariaSetSize;
      },
      ariaPosInSet(state) {
        if (ariaPosInSetProp != null) return ariaPosInSetProp;
        if (!state) return;
        if (!(row == null ? void 0 : row.ariaPosInSet)) return;
        if (row.baseElement !== state.baseElement) return;
        const itemsInRow = state.renderedItems.filter(
          (item) => item.rowId === rowId
        );
        return row.ariaPosInSet + itemsInRow.findIndex((item) => item.id === id);
      },
      isTabbable(state) {
        if (!(state == null ? void 0 : state.renderedItems.length)) return true;
        if (state.virtualFocus) return false;
        if (tabbable) return true;
        if (state.activeId === null) return false;
        const item = store == null ? void 0 : store.item(state.activeId);
        if (item == null ? void 0 : item.disabled) return true;
        if (!(item == null ? void 0 : item.element)) return true;
        return state.activeId === id;
      }
    });
    const getItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
      (item) => {
        var _a2;
        const nextItem = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({}, item), {
          id: id || item.id,
          rowId,
          disabled: !!trulyDisabled,
          children: (_a2 = item.element) == null ? void 0 : _a2.textContent
        });
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [id, rowId, trulyDisabled, getItemProp]
    );
    const onFocusProp = props.onFocus;
    const hasFocusedComposite = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const onFocus = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useEvent)((event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      if (event.defaultPrevented) return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isPortalEvent)(event)) return;
      if (!id) return;
      if (!store) return;
      if (targetIsAnotherItem(event, store)) return;
      const { virtualFocus, baseElement: baseElement2 } = store.getState();
      store.setActiveId(id);
      if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextbox)(event.currentTarget)) {
        (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_3__.selectTextField)(event.currentTarget);
      }
      if (!virtualFocus) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) return;
      if (isEditableElement(event.currentTarget)) return;
      if (!(baseElement2 == null ? void 0 : baseElement2.isConnected)) return;
      if ((0,_ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_11__.isSafari)() && event.currentTarget.hasAttribute("data-autofocus")) {
        event.currentTarget.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      }
      hasFocusedComposite.current = true;
      const fromComposite = event.relatedTarget === baseElement2 || (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_3__.isItem)(store, event.relatedTarget);
      if (fromComposite) {
        (0,_5VQZOHHZ_js__WEBPACK_IMPORTED_MODULE_3__.focusSilently)(baseElement2);
      } else {
        baseElement2.focus();
      }
    });
    const onBlurCaptureProp = props.onBlurCapture;
    const onBlurCapture = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useEvent)((event) => {
      onBlurCaptureProp == null ? void 0 : onBlurCaptureProp(event);
      if (event.defaultPrevented) return;
      const state = store == null ? void 0 : store.getState();
      if ((state == null ? void 0 : state.virtualFocus) && hasFocusedComposite.current) {
        hasFocusedComposite.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const preventScrollOnKeyDownProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useBooleanEvent)(preventScrollOnKeyDown);
    const moveOnKeyPressProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useBooleanEvent)(moveOnKeyPress);
    const onKeyDown = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented) return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) return;
      if (!store) return;
      const { currentTarget } = event;
      const state = store.getState();
      const item = store.item(id);
      const isGrid = !!(item == null ? void 0 : item.rowId);
      const isVertical = state.orientation !== "horizontal";
      const isHorizontal = state.orientation !== "vertical";
      const canHomeEnd = () => {
        if (isGrid) return true;
        if (isHorizontal) return true;
        if (!state.baseElement) return true;
        if (!(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(state.baseElement)) return true;
        return false;
      };
      const keyMap = {
        ArrowUp: (isGrid || isVertical) && store.up,
        ArrowRight: (isGrid || isHorizontal) && store.next,
        ArrowDown: (isGrid || isVertical) && store.down,
        ArrowLeft: (isGrid || isHorizontal) && store.previous,
        Home: () => {
          if (!canHomeEnd()) return;
          if (!isGrid || event.ctrlKey) {
            return store == null ? void 0 : store.first();
          }
          return store == null ? void 0 : store.previous(-1);
        },
        End: () => {
          if (!canHomeEnd()) return;
          if (!isGrid || event.ctrlKey) {
            return store == null ? void 0 : store.last();
          }
          return store == null ? void 0 : store.next(-1);
        },
        PageUp: () => {
          return findNextPageItemId(currentTarget, store, store == null ? void 0 : store.up, true);
        },
        PageDown: () => {
          return findNextPageItemId(currentTarget, store, store == null ? void 0 : store.down);
        }
      };
      const action = keyMap[event.key];
      if (action) {
        if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextbox)(currentTarget)) {
          const selection = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getTextboxSelection)(currentTarget);
          const isLeft = isHorizontal && event.key === "ArrowLeft";
          const isRight = isHorizontal && event.key === "ArrowRight";
          const isUp = isVertical && event.key === "ArrowUp";
          const isDown = isVertical && event.key === "ArrowDown";
          if (isRight || isDown) {
            const { length: valueLength } = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getTextboxValue)(currentTarget);
            if (selection.end !== valueLength) return;
          } else if ((isLeft || isUp) && selection.start !== 0) return;
        }
        const nextId = action();
        if (preventScrollOnKeyDownProp(event) || nextId !== void 0) {
          if (!moveOnKeyPressProp(event)) return;
          event.preventDefault();
          store.move(nextId);
        }
      }
    });
    const providerValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(
      () => ({ id, baseElement }),
      [id, baseElement]
    );
    props = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_7__.CompositeItemContext.Provider, { value: providerValue, children: element }),
      [providerValue]
    );
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({
      id,
      "data-active-item": isActiveItem || void 0
    }, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_8__.useMergeRefs)(ref, props.ref),
      tabIndex: isTabbable ? props.tabIndex : -1,
      onFocus,
      onBlurCapture,
      onKeyDown
    });
    props = (0,_KUU7WJ55_js__WEBPACK_IMPORTED_MODULE_12__.useCommand)(props);
    props = (0,_RZ4GPYOB_js__WEBPACK_IMPORTED_MODULE_13__.useCollectionItem)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({
      store
    }, props), {
      getItem,
      shouldRegisterItem: id ? props.shouldRegisterItem : false
    }));
    return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_9__.removeUndefinedValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({}, props), {
      "aria-setsize": ariaSetSize,
      "aria-posinset": ariaPosInSet
    }));
  }
);
var CompositeItem = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_5__.memo)(
  (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_5__.forwardRef)(function CompositeItem2(props) {
    const htmlProps = useCompositeItem(props);
    return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_5__.createElement)(TagName, htmlProps);
  })
);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeContextProvider: () => (/* binding */ CompositeContextProvider),
/* harmony export */   CompositeItemContext: () => (/* binding */ CompositeItemContext),
/* harmony export */   CompositeRowContext: () => (/* binding */ CompositeRowContext),
/* harmony export */   CompositeScopedContextProvider: () => (/* binding */ CompositeScopedContextProvider),
/* harmony export */   useCompositeContext: () => (/* binding */ useCompositeContext),
/* harmony export */   useCompositeProviderContext: () => (/* binding */ useCompositeProviderContext),
/* harmony export */   useCompositeScopedContext: () => (/* binding */ useCompositeScopedContext)
/* harmony export */ });
/* harmony import */ var _VDHZ5F7K_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VDHZ5F7K.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VDHZ5F7K.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";



// src/composite/composite-context.tsx

var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_VDHZ5F7K_js__WEBPACK_IMPORTED_MODULE_2__.CollectionContextProvider],
  [_VDHZ5F7K_js__WEBPACK_IMPORTED_MODULE_2__.CollectionScopedContextProvider]
);
var useCompositeContext = ctx.useContext;
var useCompositeScopedContext = ctx.useScopedContext;
var useCompositeProviderContext = ctx.useProviderContext;
var CompositeContextProvider = ctx.ContextProvider;
var CompositeScopedContextProvider = ctx.ScopedContextProvider;
var CompositeItemContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);
var CompositeRowContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/RS7LB2H4.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/RS7LB2H4.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogContextProvider: () => (/* binding */ DialogContextProvider),
/* harmony export */   DialogDescriptionContext: () => (/* binding */ DialogDescriptionContext),
/* harmony export */   DialogHeadingContext: () => (/* binding */ DialogHeadingContext),
/* harmony export */   DialogScopedContextProvider: () => (/* binding */ DialogScopedContextProvider),
/* harmony export */   useDialogContext: () => (/* binding */ useDialogContext),
/* harmony export */   useDialogProviderContext: () => (/* binding */ useDialogProviderContext),
/* harmony export */   useDialogScopedContext: () => (/* binding */ useDialogScopedContext)
/* harmony export */ });
/* harmony import */ var _S6EF7IVO_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./S6EF7IVO.js */ "./node_modules/@ariakit/react-core/esm/__chunks/S6EF7IVO.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";



// src/dialog/dialog-context.tsx

var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_S6EF7IVO_js__WEBPACK_IMPORTED_MODULE_2__.DisclosureContextProvider],
  [_S6EF7IVO_js__WEBPACK_IMPORTED_MODULE_2__.DisclosureScopedContextProvider]
);
var useDialogContext = ctx.useContext;
var useDialogScopedContext = ctx.useScopedContext;
var useDialogProviderContext = ctx.useProviderContext;
var DialogContextProvider = ctx.ContextProvider;
var DialogScopedContextProvider = ctx.ScopedContextProvider;
var DialogHeadingContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(void 0);
var DialogDescriptionContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(void 0);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/RZ4GPYOB.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/RZ4GPYOB.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionItem: () => (/* binding */ CollectionItem),
/* harmony export */   useCollectionItem: () => (/* binding */ useCollectionItem)
/* harmony export */ });
/* harmony import */ var _VDHZ5F7K_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VDHZ5F7K.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VDHZ5F7K.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";





// src/collection/collection-item.tsx


var TagName = "div";
var useCollectionItem = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.createHook)(
  function useCollectionItem2(_a) {
    var _b = _a, {
      store,
      shouldRegisterItem = true,
      getItem = _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.identity,
      element: element
    } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, [
      "store",
      "shouldRegisterItem",
      "getItem",
      // @ts-expect-error This prop may come from a collection renderer.
      "element"
    ]);
    const context = (0,_VDHZ5F7K_js__WEBPACK_IMPORTED_MODULE_4__.useCollectionContext)();
    store = store || context;
    const id = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useId)(props.id);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(element);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      const element2 = ref.current;
      if (!id) return;
      if (!element2) return;
      if (!shouldRegisterItem) return;
      const item = getItem({ id, element: element2 });
      return store == null ? void 0 : store.renderItem(item);
    }, [id, shouldRegisterItem, getItem, store]);
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)(ref, props.ref)
    });
    return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.removeUndefinedValues)(props);
  }
);
var CollectionItem = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function CollectionItem2(props) {
  const htmlProps = useCollectionItem(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(TagName, htmlProps);
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/S6EF7IVO.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/S6EF7IVO.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisclosureContextProvider: () => (/* binding */ DisclosureContextProvider),
/* harmony export */   DisclosureScopedContextProvider: () => (/* binding */ DisclosureScopedContextProvider),
/* harmony export */   useDisclosureContext: () => (/* binding */ useDisclosureContext),
/* harmony export */   useDisclosureProviderContext: () => (/* binding */ useDisclosureProviderContext),
/* harmony export */   useDisclosureScopedContext: () => (/* binding */ useDisclosureScopedContext)
/* harmony export */ });
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
"use client";


// src/disclosure/disclosure-context.tsx
var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createStoreContext)();
var useDisclosureContext = ctx.useContext;
var useDisclosureScopedContext = ctx.useScopedContext;
var useDisclosureProviderContext = ctx.useProviderContext;
var DisclosureContextProvider = ctx.ContextProvider;
var DisclosureScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/SK3NAZA3.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/SK3NAZA3.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRefProperty: () => (/* binding */ getRefProperty),
/* harmony export */   isValidElementWithRef: () => (/* binding */ isValidElementWithRef),
/* harmony export */   mergeProps: () => (/* binding */ mergeProps),
/* harmony export */   setRef: () => (/* binding */ setRef)
/* harmony export */ });
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


// src/utils/misc.ts


function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function isValidElementWithRef(element) {
  if (!element) return false;
  if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(element)) return false;
  if ("ref" in element.props) return true;
  if ("ref" in element) return true;
  return false;
}
function getRefProperty(element) {
  if (!isValidElementWithRef(element)) return null;
  const props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, element.props);
  return props.ref || element.ref;
}
function mergeProps(base, overrides) {
  const props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, base);
  for (const key in overrides) {
    if (!(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(overrides, key)) continue;
    if (key === "className") {
      const prop = "className";
      props[prop] = base[prop] ? `${base[prop]} ${overrides[prop]}` : overrides[prop];
      continue;
    }
    if (key === "style") {
      const prop = "style";
      props[prop] = base[prop] ? (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, base[prop]), overrides[prop]) : overrides[prop];
      continue;
    }
    const overrideValue = overrides[key];
    if (typeof overrideValue === "function" && key.startsWith("on")) {
      const baseValue = base[key];
      if (typeof baseValue === "function") {
        props[key] = (...args) => {
          overrideValue(...args);
          baseValue(...args);
        };
        continue;
      }
    }
    props[key] = overrideValue;
  }
  return props;
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/SWN3JYXT.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/SWN3JYXT.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusableContext: () => (/* binding */ FocusableContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/focusable/focusable-context.tsx

var FocusableContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(true);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/UQQRIHDV.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/UQQRIHDV.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeHover: () => (/* binding */ CompositeHover),
/* harmony export */   useCompositeHover: () => (/* binding */ useCompositeHover)
/* harmony export */ });
/* harmony import */ var _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./P7GR5CS5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";





// src/composite/composite-hover.tsx




var TagName = "div";
function getMouseDestination(event) {
  const relatedTarget = event.relatedTarget;
  if ((relatedTarget == null ? void 0 : relatedTarget.nodeType) === Node.ELEMENT_NODE) {
    return relatedTarget;
  }
  return null;
}
function hoveringInside(event) {
  const nextElement = getMouseDestination(event);
  if (!nextElement) return false;
  return (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.contains)(event.currentTarget, nextElement);
}
var symbol = Symbol("composite-hover");
function movingToAnotherItem(event) {
  let dest = getMouseDestination(event);
  if (!dest) return false;
  do {
    if ((0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(dest, symbol) && dest[symbol]) return true;
    dest = dest.parentElement;
  } while (dest);
  return false;
}
var useCompositeHover = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(
  function useCompositeHover2(_a) {
    var _b = _a, {
      store,
      focusOnHover = true,
      blurOnHoverEnd = !!focusOnHover
    } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, [
      "store",
      "focusOnHover",
      "blurOnHoverEnd"
    ]);
    const context = (0,_P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_5__.useCompositeContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.invariant)(
      store,
       true && "CompositeHover must be wrapped in a Composite component."
    );
    const isMouseMoving = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useIsMouseMoving)();
    const onMouseMoveProp = props.onMouseMove;
    const focusOnHoverProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(focusOnHover);
    const onMouseMove = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onMouseMoveProp == null ? void 0 : onMouseMoveProp(event);
      if (event.defaultPrevented) return;
      if (!isMouseMoving()) return;
      if (!focusOnHoverProp(event)) return;
      if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocusWithin)(event.currentTarget)) {
        const baseElement = store == null ? void 0 : store.getState().baseElement;
        if (baseElement && !(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocus)(baseElement)) {
          baseElement.focus();
        }
      }
      store == null ? void 0 : store.setActiveId(event.currentTarget.id);
    });
    const onMouseLeaveProp = props.onMouseLeave;
    const blurOnHoverEndProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(blurOnHoverEnd);
    const onMouseLeave = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      var _a2;
      onMouseLeaveProp == null ? void 0 : onMouseLeaveProp(event);
      if (event.defaultPrevented) return;
      if (!isMouseMoving()) return;
      if (hoveringInside(event)) return;
      if (movingToAnotherItem(event)) return;
      if (!focusOnHoverProp(event)) return;
      if (!blurOnHoverEndProp(event)) return;
      store == null ? void 0 : store.setActiveId(null);
      (_a2 = store == null ? void 0 : store.getState().baseElement) == null ? void 0 : _a2.focus();
    });
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((element) => {
      if (!element) return;
      element[symbol] = true;
    }, []);
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, props), {
      ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_6__.useMergeRefs)(ref, props.ref),
      onMouseMove,
      onMouseLeave
    });
    return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.removeUndefinedValues)(props);
  }
);
var CompositeHover = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.memo)(
  (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function CompositeHover2(props) {
    const htmlProps = useCompositeHover(props);
    return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.createElement)(TagName, htmlProps);
  })
);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/VDHZ5F7K.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/VDHZ5F7K.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionContextProvider: () => (/* binding */ CollectionContextProvider),
/* harmony export */   CollectionScopedContextProvider: () => (/* binding */ CollectionScopedContextProvider),
/* harmony export */   useCollectionContext: () => (/* binding */ useCollectionContext),
/* harmony export */   useCollectionProviderContext: () => (/* binding */ useCollectionProviderContext),
/* harmony export */   useCollectionScopedContext: () => (/* binding */ useCollectionScopedContext)
/* harmony export */ });
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
"use client";


// src/collection/collection-context.tsx
var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createStoreContext)();
var useCollectionContext = ctx.useContext;
var useCollectionScopedContext = ctx.useScopedContext;
var useCollectionProviderContext = ctx.useProviderContext;
var CollectionContextProvider = ctx.ContextProvider;
var CollectionScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxContextProvider: () => (/* binding */ ComboboxContextProvider),
/* harmony export */   ComboboxItemCheckedContext: () => (/* binding */ ComboboxItemCheckedContext),
/* harmony export */   ComboboxItemValueContext: () => (/* binding */ ComboboxItemValueContext),
/* harmony export */   ComboboxListRoleContext: () => (/* binding */ ComboboxListRoleContext),
/* harmony export */   ComboboxScopedContextProvider: () => (/* binding */ ComboboxScopedContextProvider),
/* harmony export */   useComboboxContext: () => (/* binding */ useComboboxContext),
/* harmony export */   useComboboxProviderContext: () => (/* binding */ useComboboxProviderContext),
/* harmony export */   useComboboxScopedContext: () => (/* binding */ useComboboxScopedContext)
/* harmony export */ });
/* harmony import */ var _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./P7GR5CS5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/P7GR5CS5.js");
/* harmony import */ var _MTZPJQMC_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MTZPJQMC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/MTZPJQMC.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";




// src/combobox/combobox-context.tsx

var ComboboxListRoleContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);
var ctx = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_MTZPJQMC_js__WEBPACK_IMPORTED_MODULE_2__.PopoverContextProvider, _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_3__.CompositeContextProvider],
  [_MTZPJQMC_js__WEBPACK_IMPORTED_MODULE_2__.PopoverScopedContextProvider, _P7GR5CS5_js__WEBPACK_IMPORTED_MODULE_3__.CompositeScopedContextProvider]
);
var useComboboxContext = ctx.useContext;
var useComboboxScopedContext = ctx.useScopedContext;
var useComboboxProviderContext = ctx.useProviderContext;
var ComboboxContextProvider = ctx.ContextProvider;
var ComboboxScopedContextProvider = ctx.ScopedContextProvider;
var ComboboxItemValueContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);
var ComboboxItemCheckedContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/VGCJ63VH.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/VGCJ63VH.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisclosureContent: () => (/* binding */ DisclosureContent),
/* harmony export */   isHidden: () => (/* binding */ isHidden),
/* harmony export */   useDisclosureContent: () => (/* binding */ useDisclosureContent)
/* harmony export */ });
/* harmony import */ var _RS7LB2H4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./RS7LB2H4.js */ "./node_modules/@ariakit/react-core/esm/__chunks/RS7LB2H4.js");
/* harmony import */ var _S6EF7IVO_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./S6EF7IVO.js */ "./node_modules/@ariakit/react-core/esm/__chunks/S6EF7IVO.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";







// src/disclosure/disclosure-content.tsx




var TagName = "div";
function afterTimeout(timeoutMs, cb) {
  const timeoutId = setTimeout(cb, timeoutMs);
  return () => clearTimeout(timeoutId);
}
function afterPaint(cb) {
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(cb);
  });
  return () => cancelAnimationFrame(raf);
}
function parseCSSTime(...times) {
  return times.join(", ").split(", ").reduce((longestTime, currentTimeString) => {
    const multiplier = currentTimeString.endsWith("ms") ? 1 : 1e3;
    const currentTime = Number.parseFloat(currentTimeString || "0s") * multiplier;
    if (currentTime > longestTime) return currentTime;
    return longestTime;
  }, 0);
}
function isHidden(mounted, hidden, alwaysVisible) {
  return !alwaysVisible && hidden !== false && (!mounted || !!hidden);
}
var useDisclosureContent = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(function useDisclosureContent2(_a) {
  var _b = _a, { store, alwaysVisible } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, ["store", "alwaysVisible"]);
  const context = (0,_S6EF7IVO_js__WEBPACK_IMPORTED_MODULE_5__.useDisclosureProviderContext)();
  store = store || context;
  (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.invariant)(
    store,
     true && "DisclosureContent must receive a `store` prop or be wrapped in a DisclosureProvider component."
  );
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const id = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useId)(props.id);
  const [transition, setTransition] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const animated = store.useState("animated");
  const contentElement = store.useState("contentElement");
  const otherElement = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_8__.useStoreState)(store.disclosure, "contentElement");
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useSafeLayoutEffect)(() => {
    if (!ref.current) return;
    store == null ? void 0 : store.setContentElement(ref.current);
  }, [store]);
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useSafeLayoutEffect)(() => {
    let previousAnimated;
    store == null ? void 0 : store.setState("animated", (animated2) => {
      previousAnimated = animated2;
      return true;
    });
    return () => {
      if (previousAnimated === void 0) return;
      store == null ? void 0 : store.setState("animated", previousAnimated);
    };
  }, [store]);
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useSafeLayoutEffect)(() => {
    if (!animated) return;
    if (!(contentElement == null ? void 0 : contentElement.isConnected)) {
      setTransition(null);
      return;
    }
    return afterPaint(() => {
      setTransition(open ? "enter" : mounted ? "leave" : null);
    });
  }, [animated, contentElement, open, mounted]);
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useSafeLayoutEffect)(() => {
    if (!store) return;
    if (!animated) return;
    if (!transition) return;
    if (!contentElement) return;
    const stopAnimation = () => store == null ? void 0 : store.setState("animating", false);
    const stopAnimationSync = () => (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync)(stopAnimation);
    if (transition === "leave" && open) return;
    if (transition === "enter" && !open) return;
    if (typeof animated === "number") {
      const timeout2 = animated;
      return afterTimeout(timeout2, stopAnimationSync);
    }
    const {
      transitionDuration,
      animationDuration,
      transitionDelay,
      animationDelay
    } = getComputedStyle(contentElement);
    const {
      transitionDuration: transitionDuration2 = "0",
      animationDuration: animationDuration2 = "0",
      transitionDelay: transitionDelay2 = "0",
      animationDelay: animationDelay2 = "0"
    } = otherElement ? getComputedStyle(otherElement) : {};
    const delay = parseCSSTime(
      transitionDelay,
      animationDelay,
      transitionDelay2,
      animationDelay2
    );
    const duration = parseCSSTime(
      transitionDuration,
      animationDuration,
      transitionDuration2,
      animationDuration2
    );
    const timeout = delay + duration;
    if (!timeout) {
      if (transition === "enter") {
        store.setState("animated", false);
      }
      stopAnimation();
      return;
    }
    const frameRate = 1e3 / 60;
    const maxTimeout = Math.max(timeout - frameRate, 0);
    return afterTimeout(maxTimeout, stopAnimationSync);
  }, [store, animated, contentElement, otherElement, open, transition]);
  props = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useWrapElement)(
    props,
    (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_RS7LB2H4_js__WEBPACK_IMPORTED_MODULE_9__.DialogScopedContextProvider, { value: store, children: element }),
    [store]
  );
  const hidden = isHidden(mounted, props.hidden, alwaysVisible);
  const styleProp = props.style;
  const style = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (hidden) {
      return (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, styleProp), { display: "none" });
    }
    return styleProp;
  }, [hidden, styleProp]);
  props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({
    id,
    "data-open": open || void 0,
    "data-enter": transition === "enter" || void 0,
    "data-leave": transition === "leave" || void 0,
    hidden
  }, props), {
    ref: (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useMergeRefs)(id ? store.setContentElement : null, ref, props.ref),
    style
  });
  return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.removeUndefinedValues)(props);
});
var DisclosureContentImpl = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function DisclosureContentImpl2(props) {
  const htmlProps = useDisclosureContent(props);
  return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.createElement)(TagName, htmlProps);
});
var DisclosureContent = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function DisclosureContent2(_a) {
  var _b = _a, {
    unmountOnHide
  } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, [
    "unmountOnHide"
  ]);
  const context = (0,_S6EF7IVO_js__WEBPACK_IMPORTED_MODULE_5__.useDisclosureProviderContext)();
  const store = props.store || context;
  const mounted = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_8__.useStoreState)(
    store,
    (state) => !unmountOnHide || (state == null ? void 0 : state.mounted)
  );
  if (mounted === false) return null;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(DisclosureContentImpl, (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, props));
});




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/WYCIER3C.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/WYCIER3C.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDisclosureStore: () => (/* binding */ useDisclosureStore),
/* harmony export */   useDisclosureStoreProps: () => (/* binding */ useDisclosureStoreProps)
/* harmony export */ });
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _ariakit_core_disclosure_disclosure_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/disclosure/disclosure-store */ "./node_modules/@ariakit/core/esm/__chunks/RCQ5P4YE.js");
"use client";



// src/disclosure/disclosure-store.ts

function useDisclosureStoreProps(store, update, props) {
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_0__.useUpdateEffect)(update, [props.store, props.disclosure]);
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "open", "setOpen");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "mounted", "setMounted");
  (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "animated");
  return Object.assign(store, { disclosure: props.disclosure });
}
function useDisclosureStore(props = {}) {
  const [store, update] = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_disclosure_disclosure_store__WEBPACK_IMPORTED_MODULE_2__.createDisclosureStore, props);
  return useDisclosureStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStore: () => (/* binding */ useStore),
/* harmony export */   useStoreProps: () => (/* binding */ useStoreProps),
/* harmony export */   useStoreState: () => (/* binding */ useStoreState),
/* harmony export */   useStoreStateObject: () => (/* binding */ useStoreStateObject)
/* harmony export */ });
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/utils/store */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");
"use client";



// src/utils/store.tsx




var { useSyncExternalStore } = use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__;
var noopSubscribe = () => () => {
};
function useStoreState(store, keyOrSelector = _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.identity) {
  const storeSubscribe = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (callback) => {
      if (!store) return noopSubscribe();
      return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.subscribe)(store, null, callback);
    },
    [store]
  );
  const getSnapshot = () => {
    const key = typeof keyOrSelector === "string" ? keyOrSelector : null;
    const selector = typeof keyOrSelector === "function" ? keyOrSelector : null;
    const state = store == null ? void 0 : store.getState();
    if (selector) return selector(state);
    if (!state) return;
    if (!key) return;
    if (!(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(state, key)) return;
    return state[key];
  };
  return useSyncExternalStore(storeSubscribe, getSnapshot, getSnapshot);
}
function useStoreStateObject(store, object) {
  const objRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
    {}
  );
  const storeSubscribe = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (callback) => {
      if (!store) return noopSubscribe();
      return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.subscribe)(store, null, callback);
    },
    [store]
  );
  const getSnapshot = () => {
    const state = store == null ? void 0 : store.getState();
    let updated = false;
    const obj = objRef.current;
    for (const prop in object) {
      const keyOrSelector = object[prop];
      if (typeof keyOrSelector === "function") {
        const value = keyOrSelector(state);
        if (value !== obj[prop]) {
          obj[prop] = value;
          updated = true;
        }
      }
      if (typeof keyOrSelector === "string") {
        if (!state) continue;
        if (!(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(state, keyOrSelector)) continue;
        const value = state[keyOrSelector];
        if (value !== obj[prop]) {
          obj[prop] = value;
          updated = true;
        }
      }
    }
    if (updated) {
      objRef.current = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, obj);
    }
    return objRef.current;
  };
  return useSyncExternalStore(storeSubscribe, getSnapshot, getSnapshot);
}
function useStoreProps(store, props, key, setKey) {
  const value = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(props, key) ? props[key] : void 0;
  const setValue = setKey ? props[setKey] : void 0;
  const propsRef = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useLiveRef)({ value, setValue });
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useSafeLayoutEffect)(() => {
    return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.sync)(store, [key], (state, prev) => {
      const { value: value2, setValue: setValue2 } = propsRef.current;
      if (!setValue2) return;
      if (state[key] === prev[key]) return;
      if (state[key] === value2) return;
      setValue2(state[key]);
    });
  }, [store, key]);
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useSafeLayoutEffect)(() => {
    if (value === void 0) return;
    store.setState(key, value);
    return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.batch)(store, [key], () => {
      if (value === void 0) return;
      store.setState(key, value);
    });
  });
}
function useStore(createStore, props) {
  const [store, setStore] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => createStore(props));
  (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useSafeLayoutEffect)(() => (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.init)(store), [store]);
  const useState2 = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (keyOrSelector) => useStoreState(store, keyOrSelector),
    [store]
  );
  const memoizedStore = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, store), { useState: useState2 }),
    [store, useState2]
  );
  const updateStore = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(() => {
    setStore((store2) => createStore((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, props), store2.getState())));
  });
  return [memoizedStore, updateStore];
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/ZTDSJLD6.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/ZTDSJLD6.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxItem: () => (/* binding */ ComboboxItem),
/* harmony export */   useComboboxItem: () => (/* binding */ useComboboxItem)
/* harmony export */ });
/* harmony import */ var _UQQRIHDV_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UQQRIHDV.js */ "./node_modules/@ariakit/react-core/esm/__chunks/UQQRIHDV.js");
/* harmony import */ var _VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VEVQD5MH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js");
/* harmony import */ var _P2CTZE2T_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./P2CTZE2T.js */ "./node_modules/@ariakit/react-core/esm/__chunks/P2CTZE2T.js");
/* harmony import */ var _LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";








// src/combobox/combobox-item.tsx






var TagName = "div";
function isSelected(storeValue, itemValue) {
  if (itemValue == null) return;
  if (storeValue == null) return false;
  if (Array.isArray(storeValue)) {
    return storeValue.includes(itemValue);
  }
  return storeValue === itemValue;
}
function getItemRole(popupRole) {
  var _a;
  const itemRoleByPopupRole = {
    menu: "menuitem",
    listbox: "option",
    tree: "treeitem"
  };
  const key = popupRole;
  return (_a = itemRoleByPopupRole[key]) != null ? _a : "option";
}
var useComboboxItem = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  function useComboboxItem2(_a) {
    var _b = _a, {
      store,
      value,
      hideOnClick,
      setValueOnClick,
      selectValueOnClick = true,
      resetValueOnSelect,
      focusOnHover = false,
      moveOnKeyPress = true,
      getItem: getItemProp
    } = _b, props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, [
      "store",
      "value",
      "hideOnClick",
      "setValueOnClick",
      "selectValueOnClick",
      "resetValueOnSelect",
      "focusOnHover",
      "moveOnKeyPress",
      "getItem"
    ]);
    var _a2;
    const context = (0,_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.useComboboxScopedContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.invariant)(
      store,
       true && "ComboboxItem must be wrapped in a ComboboxList or ComboboxPopover component."
    );
    const { resetValueOnSelectState, multiSelectable, selected } = (0,_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_6__.useStoreStateObject)(store, {
      resetValueOnSelectState: "resetValueOnSelect",
      multiSelectable(state) {
        return Array.isArray(state.selectedValue);
      },
      selected(state) {
        return isSelected(state.selectedValue, value);
      }
    });
    const getItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
      (item) => {
        const nextItem = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, item), { value });
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [value, getItemProp]
    );
    setValueOnClick = setValueOnClick != null ? setValueOnClick : !multiSelectable;
    hideOnClick = hideOnClick != null ? hideOnClick : value != null && !multiSelectable;
    const onClickProp = props.onClick;
    const setValueOnClickProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useBooleanEvent)(setValueOnClick);
    const selectValueOnClickProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useBooleanEvent)(selectValueOnClick);
    const resetValueOnSelectProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useBooleanEvent)(
      (_a2 = resetValueOnSelect != null ? resetValueOnSelect : resetValueOnSelectState) != null ? _a2 : multiSelectable
    );
    const hideOnClickProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useBooleanEvent)(hideOnClick);
    const onClick = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)((event) => {
      onClickProp == null ? void 0 : onClickProp(event);
      if (event.defaultPrevented) return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_8__.isDownloading)(event)) return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_8__.isOpeningInNewTab)(event)) return;
      if (value != null) {
        if (selectValueOnClickProp(event)) {
          if (resetValueOnSelectProp(event)) {
            store == null ? void 0 : store.resetValue();
          }
          store == null ? void 0 : store.setSelectedValue((prevValue) => {
            if (!Array.isArray(prevValue)) return value;
            if (prevValue.includes(value)) {
              return prevValue.filter((v) => v !== value);
            }
            return [...prevValue, value];
          });
        }
        if (setValueOnClickProp(event)) {
          store == null ? void 0 : store.setValue(value);
        }
      }
      if (hideOnClickProp(event)) {
        store == null ? void 0 : store.hide();
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented) return;
      const baseElement = store == null ? void 0 : store.getState().baseElement;
      if (!baseElement) return;
      if ((0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_9__.hasFocus)(baseElement)) return;
      const printable = event.key.length === 1;
      if (printable || event.key === "Backspace" || event.key === "Delete") {
        queueMicrotask(() => baseElement.focus());
        if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_10__.isTextField)(baseElement)) {
          store == null ? void 0 : store.setValue(baseElement.value);
        }
      }
    });
    if (multiSelectable && selected != null) {
      props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
        "aria-selected": selected
      }, props);
    }
    props = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxItemValueContext.Provider, { value, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxItemCheckedContext.Provider, { value: selected != null ? selected : false, children: element }) }),
      [value, selected]
    );
    const popupRole = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxListRoleContext);
    props = (0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      role: getItemRole(popupRole),
      children: value
    }, props), {
      onClick,
      onKeyDown
    });
    const moveOnKeyPressProp = (0,_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_7__.useBooleanEvent)(moveOnKeyPress);
    props = (0,_P2CTZE2T_js__WEBPACK_IMPORTED_MODULE_11__.useCompositeItem)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      store
    }, props), {
      getItem,
      // Dispatch a custom event on the combobox input when moving to an item
      // with the keyboard so the Combobox component can enable inline
      // autocompletion.
      moveOnKeyPress: (event) => {
        if (!moveOnKeyPressProp(event)) return false;
        const moveEvent = new Event("combobox-item-move");
        const baseElement = store == null ? void 0 : store.getState().baseElement;
        baseElement == null ? void 0 : baseElement.dispatchEvent(moveEvent);
        return true;
      }
    }));
    props = (0,_UQQRIHDV_js__WEBPACK_IMPORTED_MODULE_12__.useCompositeHover)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({ store, focusOnHover }, props));
    return props;
  }
);
var ComboboxItem = (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.memo)(
  (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function ComboboxItem2(props) {
    const htmlProps = useComboboxItem(props);
    return (0,_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createElement)(TagName, htmlProps);
  })
);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-item-value.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-item-value.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxItemValue: () => (/* binding */ ComboboxItemValue),
/* harmony export */   useComboboxItemValue: () => (/* binding */ useComboboxItemValue)
/* harmony export */ });
/* harmony import */ var _chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../__chunks/VEVQD5MH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js");
/* harmony import */ var _chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _chunks_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../__chunks/YV4JVR4I.js */ "./node_modules/@ariakit/react-core/esm/__chunks/YV4JVR4I.js");
/* harmony import */ var _chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../__chunks/3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/utils/array */ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";












// src/combobox/combobox-item-value.tsx




var TagName = "span";
function normalizeValue(value) {
  return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.normalizeString)(value).toLowerCase();
}
function getOffsets(string, values) {
  const offsets = [];
  for (const value of values) {
    let pos = 0;
    const length = value.length;
    while (string.indexOf(value, pos) !== -1) {
      const index = string.indexOf(value, pos);
      if (index !== -1) {
        offsets.push([index, length]);
      }
      pos = index + 1;
    }
  }
  return offsets;
}
function filterOverlappingOffsets(offsets) {
  return offsets.filter(([offset, length], i, arr) => {
    return !arr.some(
      ([o, l], j) => j !== i && o <= offset && o + l >= offset + length
    );
  });
}
function sortOffsets(offsets) {
  return offsets.sort(([a], [b]) => a - b);
}
function splitValue(itemValue, userValue) {
  if (!itemValue) return itemValue;
  if (!userValue) return itemValue;
  const userValues = (0,_ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_3__.toArray)(userValue).filter(Boolean).map(normalizeValue);
  const parts = [];
  const span = (value, autocomplete = false) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(
    "span",
    {
      "data-autocomplete-value": autocomplete ? "" : void 0,
      "data-user-value": autocomplete ? void 0 : "",
      children: value
    },
    parts.length
  );
  const offsets = sortOffsets(
    filterOverlappingOffsets(
      // Convert userValues into a set to avoid duplicates
      getOffsets(normalizeValue(itemValue), new Set(userValues))
    )
  );
  if (!offsets.length) {
    parts.push(span(itemValue, true));
    return parts;
  }
  const [firstOffset] = offsets[0];
  const values = [
    itemValue.slice(0, firstOffset),
    ...offsets.flatMap(([offset, length], i) => {
      var _a;
      const value = itemValue.slice(offset, offset + length);
      const nextOffset = (_a = offsets[i + 1]) == null ? void 0 : _a[0];
      const nextValue = itemValue.slice(offset + length, nextOffset);
      return [value, nextValue];
    })
  ];
  values.forEach((value, i) => {
    if (!value) return;
    parts.push(span(value, i % 2 === 0));
  });
  return parts;
}
var useComboboxItemValue = (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_4__.createHook)(function useComboboxItemValue2(_a) {
  var _b = _a, { store, value, userValue } = _b, props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_5__.__objRest)(_b, ["store", "value", "userValue"]);
  const context = (0,_chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_6__.useComboboxScopedContext)();
  store = store || context;
  const itemContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_6__.ComboboxItemValueContext);
  const itemValue = value != null ? value : itemContext;
  const inputValue = (0,_chunks_YV4JVR4I_js__WEBPACK_IMPORTED_MODULE_7__.useStoreState)(store, (state) => userValue != null ? userValue : state == null ? void 0 : state.value);
  const children = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!itemValue) return;
    if (!inputValue) return itemValue;
    return splitValue(itemValue, inputValue);
  }, [itemValue, inputValue]);
  props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_5__.__spreadValues)({
    children
  }, props);
  return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.removeUndefinedValues)(props);
});
var ComboboxItemValue = (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_4__.forwardRef)(function ComboboxItemValue2(props) {
  const htmlProps = useComboboxItemValue(props);
  return (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_4__.createElement)(TagName, htmlProps);
});



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-label.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-label.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxLabel: () => (/* binding */ ComboboxLabel),
/* harmony export */   useComboboxLabel: () => (/* binding */ useComboboxLabel)
/* harmony export */ });
/* harmony import */ var _chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/VEVQD5MH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js");
/* harmony import */ var _chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
"use client";











// src/combobox/combobox-label.tsx

var TagName = "label";
var useComboboxLabel = (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createHook)(
  function useComboboxLabel2(_a) {
    var _b = _a, { store } = _b, props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__objRest)(_b, ["store"]);
    const context = (0,_chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_2__.useComboboxProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__.invariant)(
      store,
       true && "ComboboxLabel must receive a `store` prop or be wrapped in a ComboboxProvider component."
    );
    const comboboxId = store.useState((state) => {
      var _a2;
      return (_a2 = state.baseElement) == null ? void 0 : _a2.id;
    });
    props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({
      htmlFor: comboboxId
    }, props);
    return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__.removeUndefinedValues)(props);
  }
);
var ComboboxLabel = (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.memo)(
  (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function ComboboxLabel2(props) {
    const htmlProps = useComboboxLabel(props);
    return (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(TagName, htmlProps);
  })
);



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-provider.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-provider.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxProvider: () => (/* binding */ ComboboxProvider)
/* harmony export */ });
/* harmony import */ var _chunks_FEOFMWBY_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/FEOFMWBY.js */ "./node_modules/@ariakit/react-core/esm/__chunks/FEOFMWBY.js");
/* harmony import */ var _chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/VEVQD5MH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";



















// src/combobox/combobox-provider.tsx

function ComboboxProvider(props = {}) {
  const store = (0,_chunks_FEOFMWBY_js__WEBPACK_IMPORTED_MODULE_1__.useComboboxStore)(props);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_2__.ComboboxContextProvider, { value: store, children: props.children });
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Combobox: () => (/* binding */ Combobox),
/* harmony export */   useCombobox: () => (/* binding */ useCombobox)
/* harmony export */ });
/* harmony import */ var _chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/VEVQD5MH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/VEVQD5MH.js");
/* harmony import */ var _chunks_OMU7RWRV_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../__chunks/OMU7RWRV.js */ "./node_modules/@ariakit/react-core/esm/__chunks/OMU7RWRV.js");
/* harmony import */ var _chunks_ITI7HKP4_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../__chunks/ITI7HKP4.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ITI7HKP4.js");
/* harmony import */ var _chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/LMDWO4NN.js */ "./node_modules/@ariakit/react-core/esm/__chunks/LMDWO4NN.js");
/* harmony import */ var _chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../__chunks/ABQUS43J.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ABQUS43J.js");
/* harmony import */ var _chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../__chunks/3YLGPPWQ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DTR5TSDJ.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js");
/* harmony import */ var _ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/utils/store */ "./node_modules/@ariakit/core/esm/__chunks/BCALMBPZ.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";
















// src/combobox/combobox.tsx






var TagName = "input";
function isFirstItemAutoSelected(items, activeValue, autoSelect) {
  if (!autoSelect) return false;
  const firstItem = items.find((item) => !item.disabled && item.value);
  return (firstItem == null ? void 0 : firstItem.value) === activeValue;
}
function hasCompletionString(value, activeValue) {
  if (!activeValue) return false;
  if (value == null) return false;
  value = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_1__.normalizeString)(value);
  return activeValue.length > value.length && activeValue.toLowerCase().indexOf(value.toLowerCase()) === 0;
}
function isInputEvent(event) {
  return event.type === "input";
}
function isAriaAutoCompleteValue(value) {
  return value === "inline" || value === "list" || value === "both" || value === "none";
}
function getDefaultAutoSelectId(items) {
  const item = items.find((item2) => {
    var _a;
    if (item2.disabled) return false;
    return ((_a = item2.element) == null ? void 0 : _a.getAttribute("role")) !== "tab";
  });
  return item == null ? void 0 : item.id;
}
var useCombobox = (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  function useCombobox2(_a) {
    var _b = _a, {
      store,
      focusable = true,
      autoSelect: autoSelectProp = false,
      getAutoSelectId,
      setValueOnChange,
      showMinLength = 0,
      showOnChange,
      showOnMouseDown,
      showOnClick = showOnMouseDown,
      showOnKeyDown,
      showOnKeyPress = showOnKeyDown,
      blurActiveItemOnClick,
      setValueOnClick = true,
      moveOnKeyPress = true,
      autoComplete = "list"
    } = _b, props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, [
      "store",
      "focusable",
      "autoSelect",
      "getAutoSelectId",
      "setValueOnChange",
      "showMinLength",
      "showOnChange",
      "showOnMouseDown",
      "showOnClick",
      "showOnKeyDown",
      "showOnKeyPress",
      "blurActiveItemOnClick",
      "setValueOnClick",
      "moveOnKeyPress",
      "autoComplete"
    ]);
    const context = (0,_chunks_VEVQD5MH_js__WEBPACK_IMPORTED_MODULE_4__.useComboboxProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_1__.invariant)(
      store,
       true && "Combobox must receive a `store` prop or be wrapped in a ComboboxProvider component."
    );
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [valueUpdated, forceValueUpdate] = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useForceUpdate)();
    const canAutoSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const composingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const autoSelect = store.useState(
      (state) => state.virtualFocus && autoSelectProp
    );
    const inline = autoComplete === "inline" || autoComplete === "both";
    const [canInline, setCanInline] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(inline);
    (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useUpdateLayoutEffect)(() => {
      if (!inline) return;
      setCanInline(true);
    }, [inline]);
    const storeValue = store.useState("value");
    const prevSelectedValueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_6__.sync)(store, ["selectedValue", "activeId"], (_, prev) => {
        prevSelectedValueRef.current = prev.selectedValue;
      });
    }, []);
    const inlineActiveValue = store.useState((state) => {
      var _a2;
      if (!inline) return;
      if (!canInline) return;
      if (state.activeValue && Array.isArray(state.selectedValue)) {
        if (state.selectedValue.includes(state.activeValue)) return;
        if ((_a2 = prevSelectedValueRef.current) == null ? void 0 : _a2.includes(state.activeValue)) return;
      }
      return state.activeValue;
    });
    const items = store.useState("renderedItems");
    const open = store.useState("open");
    const contentElement = store.useState("contentElement");
    const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
      if (!inline) return storeValue;
      if (!canInline) return storeValue;
      const firstItemAutoSelected = isFirstItemAutoSelected(
        items,
        inlineActiveValue,
        autoSelect
      );
      if (firstItemAutoSelected) {
        if (hasCompletionString(storeValue, inlineActiveValue)) {
          const slice = (inlineActiveValue == null ? void 0 : inlineActiveValue.slice(storeValue.length)) || "";
          return storeValue + slice;
        }
        return storeValue;
      }
      return inlineActiveValue || storeValue;
    }, [inline, canInline, items, inlineActiveValue, autoSelect, storeValue]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      const element = ref.current;
      if (!element) return;
      const onCompositeItemMove = () => setCanInline(true);
      element.addEventListener("combobox-item-move", onCompositeItemMove);
      return () => {
        element.removeEventListener("combobox-item-move", onCompositeItemMove);
      };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!inline) return;
      if (!canInline) return;
      if (!inlineActiveValue) return;
      const firstItemAutoSelected = isFirstItemAutoSelected(
        items,
        inlineActiveValue,
        autoSelect
      );
      if (!firstItemAutoSelected) return;
      if (!hasCompletionString(storeValue, inlineActiveValue)) return;
      let cleanup = _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_1__.noop;
      queueMicrotask(() => {
        const element = ref.current;
        if (!element) return;
        const { start: prevStart, end: prevEnd } = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.getTextboxSelection)(element);
        const nextStart = storeValue.length;
        const nextEnd = inlineActiveValue.length;
        (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.setSelectionRange)(element, nextStart, nextEnd);
        cleanup = () => {
          if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__.hasFocus)(element)) return;
          const { start, end } = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.getTextboxSelection)(element);
          if (start !== nextStart) return;
          if (end !== nextEnd) return;
          (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.setSelectionRange)(element, prevStart, prevEnd);
        };
      });
      return () => cleanup();
    }, [
      valueUpdated,
      inline,
      canInline,
      inlineActiveValue,
      items,
      autoSelect,
      storeValue
    ]);
    const scrollingElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const getAutoSelectIdProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)(getAutoSelectId);
    const autoSelectIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!open) return;
      if (!contentElement) return;
      const scrollingElement = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.getScrollingElement)(contentElement);
      if (!scrollingElement) return;
      scrollingElementRef.current = scrollingElement;
      const onUserScroll = () => {
        canAutoSelectRef.current = false;
      };
      const onScroll = () => {
        if (!store) return;
        if (!canAutoSelectRef.current) return;
        const { activeId } = store.getState();
        if (activeId === null) return;
        if (activeId === autoSelectIdRef.current) return;
        canAutoSelectRef.current = false;
      };
      const options = { passive: true, capture: true };
      scrollingElement.addEventListener("wheel", onUserScroll, options);
      scrollingElement.addEventListener("touchmove", onUserScroll, options);
      scrollingElement.addEventListener("scroll", onScroll, options);
      return () => {
        scrollingElement.removeEventListener("wheel", onUserScroll, true);
        scrollingElement.removeEventListener("touchmove", onUserScroll, true);
        scrollingElement.removeEventListener("scroll", onScroll, true);
      };
    }, [open, contentElement, store]);
    (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useSafeLayoutEffect)(() => {
      if (!storeValue) return;
      if (composingRef.current) return;
      canAutoSelectRef.current = true;
    }, [storeValue]);
    (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useSafeLayoutEffect)(() => {
      if (autoSelect !== "always" && open) return;
      canAutoSelectRef.current = open;
    }, [autoSelect, open]);
    const resetValueOnSelect = store.useState("resetValueOnSelect");
    (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useUpdateEffect)(() => {
      var _a2, _b2;
      const canAutoSelect = canAutoSelectRef.current;
      if (!store) return;
      if (!open) return;
      if (!canAutoSelect && !resetValueOnSelect) return;
      const { baseElement, contentElement: contentElement2, activeId } = store.getState();
      if (baseElement && !(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__.hasFocus)(baseElement)) return;
      if (contentElement2 == null ? void 0 : contentElement2.hasAttribute("data-placing")) {
        const observer = new MutationObserver(forceValueUpdate);
        observer.observe(contentElement2, { attributeFilter: ["data-placing"] });
        return () => observer.disconnect();
      }
      if (autoSelect && canAutoSelect) {
        const userAutoSelectId = getAutoSelectIdProp(items);
        const autoSelectId = userAutoSelectId !== void 0 ? userAutoSelectId : (_a2 = getDefaultAutoSelectId(items)) != null ? _a2 : store.first();
        autoSelectIdRef.current = autoSelectId;
        store.move(autoSelectId != null ? autoSelectId : null);
      } else {
        const element = (_b2 = store.item(activeId || store.first())) == null ? void 0 : _b2.element;
        if (element && "scrollIntoView" in element) {
          element.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }
      return;
    }, [
      store,
      open,
      valueUpdated,
      storeValue,
      autoSelect,
      resetValueOnSelect,
      getAutoSelectIdProp,
      items
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!inline) return;
      const combobox = ref.current;
      if (!combobox) return;
      const elements = [combobox, contentElement].filter(
        (value2) => !!value2
      );
      const onBlur2 = (event) => {
        if (elements.every((el) => (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_9__.isFocusEventOutside)(event, el))) {
          store == null ? void 0 : store.setValue(value);
        }
      };
      for (const element of elements) {
        element.addEventListener("focusout", onBlur2);
      }
      return () => {
        for (const element of elements) {
          element.removeEventListener("focusout", onBlur2);
        }
      };
    }, [inline, contentElement, store, value]);
    const canShow = (event) => {
      const currentTarget = event.currentTarget;
      return currentTarget.value.length >= showMinLength;
    };
    const onChangeProp = props.onChange;
    const showOnChangeProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(showOnChange != null ? showOnChange : canShow);
    const setValueOnChangeProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(
      // If the combobox is combined with tags, the value will be set by the tag
      // input component.
      setValueOnChange != null ? setValueOnChange : !store.tag
    );
    const onChange = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onChangeProp == null ? void 0 : onChangeProp(event);
      if (event.defaultPrevented) return;
      if (!store) return;
      const currentTarget = event.currentTarget;
      const { value: value2, selectionStart, selectionEnd } = currentTarget;
      const nativeEvent = event.nativeEvent;
      canAutoSelectRef.current = true;
      if (isInputEvent(nativeEvent)) {
        if (nativeEvent.isComposing) {
          canAutoSelectRef.current = false;
          composingRef.current = true;
        }
        if (inline) {
          const textInserted = nativeEvent.inputType === "insertText" || nativeEvent.inputType === "insertCompositionText";
          const caretAtEnd = selectionStart === value2.length;
          setCanInline(textInserted && caretAtEnd);
        }
      }
      if (setValueOnChangeProp(event)) {
        const isSameValue = value2 === store.getState().value;
        store.setValue(value2);
        queueMicrotask(() => {
          (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.setSelectionRange)(currentTarget, selectionStart, selectionEnd);
        });
        if (inline && autoSelect && isSameValue) {
          forceValueUpdate();
        }
      }
      if (showOnChangeProp(event)) {
        store.show();
      }
      if (!autoSelect || !canAutoSelectRef.current) {
        store.setActiveId(null);
      }
    });
    const onCompositionEndProp = props.onCompositionEnd;
    const onCompositionEnd = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      canAutoSelectRef.current = true;
      composingRef.current = false;
      onCompositionEndProp == null ? void 0 : onCompositionEndProp(event);
      if (event.defaultPrevented) return;
      if (!autoSelect) return;
      forceValueUpdate();
    });
    const onMouseDownProp = props.onMouseDown;
    const blurActiveItemOnClickProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(
      blurActiveItemOnClick != null ? blurActiveItemOnClick : () => !!(store == null ? void 0 : store.getState().includesBaseElement)
    );
    const setValueOnClickProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(setValueOnClick);
    const showOnClickProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(showOnClick != null ? showOnClick : canShow);
    const onMouseDown = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onMouseDownProp == null ? void 0 : onMouseDownProp(event);
      if (event.defaultPrevented) return;
      if (event.button) return;
      if (event.ctrlKey) return;
      if (!store) return;
      if (blurActiveItemOnClickProp(event)) {
        store.setActiveId(null);
      }
      if (setValueOnClickProp(event)) {
        store.setValue(value);
      }
      if (showOnClickProp(event)) {
        (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_9__.queueBeforeEvent)(event.currentTarget, "mouseup", store.show);
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const showOnKeyPressProp = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(showOnKeyPress != null ? showOnKeyPress : canShow);
    const onKeyDown = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (!event.repeat) {
        canAutoSelectRef.current = false;
      }
      if (event.defaultPrevented) return;
      if (event.ctrlKey) return;
      if (event.altKey) return;
      if (event.shiftKey) return;
      if (event.metaKey) return;
      if (!store) return;
      const { open: open2 } = store.getState();
      if (open2) return;
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        if (showOnKeyPressProp(event)) {
          event.preventDefault();
          store.show();
        }
      }
    });
    const onBlurProp = props.onBlur;
    const onBlur = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      canAutoSelectRef.current = false;
      onBlurProp == null ? void 0 : onBlurProp(event);
      if (event.defaultPrevented) return;
    });
    const id = (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useId)(props.id);
    const ariaAutoComplete = isAriaAutoCompleteValue(autoComplete) ? autoComplete : void 0;
    const isActiveItem = store.useState((state) => state.activeId === null);
    props = (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      id,
      role: "combobox",
      "aria-autocomplete": ariaAutoComplete,
      "aria-haspopup": (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.getPopupRole)(contentElement, "listbox"),
      "aria-expanded": open,
      "aria-controls": contentElement == null ? void 0 : contentElement.id,
      "data-active-item": isActiveItem || void 0,
      value
    }, props), {
      ref: (0,_chunks_ABQUS43J_js__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)(ref, props.ref),
      onChange,
      onCompositionEnd,
      onMouseDown,
      onKeyDown,
      onBlur
    });
    props = (0,_chunks_ITI7HKP4_js__WEBPACK_IMPORTED_MODULE_10__.useComposite)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      store,
      focusable
    }, props), {
      // Enable inline autocomplete when the user moves from the combobox input
      // to an item.
      moveOnKeyPress: (event) => {
        if ((0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_1__.isFalsyBooleanCallback)(moveOnKeyPress, event)) return false;
        if (inline) setCanInline(true);
        return true;
      }
    }));
    props = (0,_chunks_OMU7RWRV_js__WEBPACK_IMPORTED_MODULE_11__.usePopoverAnchor)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({ store }, props));
    return (0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({ autoComplete: "off" }, props);
  }
);
var Combobox = (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(function Combobox2(props) {
  const htmlProps = useCombobox(props);
  return (0,_chunks_LMDWO4NN_js__WEBPACK_IMPORTED_MODULE_2__.createElement)(TagName, htmlProps);
});



/***/ }),

/***/ "./node_modules/@tanstack/history/dist/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tanstack/history/dist/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createHistory: () => (/* binding */ createHistory),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   parseHref: () => (/* binding */ parseHref)
/* harmony export */ });
const stateIndexKey = "__TSR_index";
const popStateEvent = "popstate";
const beforeUnloadEvent = "beforeunload";
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({ location, action }));
  };
  const handleIndexChange = (action) => {
    if (opts.notifyOnIndexChange ?? true) notify(action);
    else location = opts.getLocation();
  };
  const tryNavigation = async ({
    task,
    navigateOpts,
    ...actionInfo
  }) => {
    var _a, _b;
    const ignoreBlocker = (navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false;
    if (ignoreBlocker) {
      task();
      return;
    }
    const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) {
      for (const blocker of blockers) {
        const nextLocation = parseHref(actionInfo.path, actionInfo.state);
        const isBlocked = await blocker.blockerFn({
          currentLocation: location,
          nextLocation,
          action: actionInfo.type
        });
        if (isBlocked) {
          (_b = opts.onBlocked) == null ? void 0 : _b.call(opts);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex + 1, state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex, state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index);
          handleIndexChange({ type: "GO", index });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          handleIndexChange({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          handleIndexChange({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    canGoBack: () => location.state[stateIndexKey] !== 0,
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      var _a;
      if (!opts.setBlockers) return () => {
      };
      const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        var _a2, _b;
        const blockers2 = ((_a2 = opts.getBlockers) == null ? void 0 : _a2.call(opts)) ?? [];
        (_b = opts.setBlockers) == null ? void 0 : _b.call(opts, blockers2.filter((b) => b !== blocker));
      };
    },
    flush: () => {
      var _a;
      return (_a = opts.flush) == null ? void 0 : _a.call(opts);
    },
    destroy: () => {
      var _a;
      return (_a = opts.destroy) == null ? void 0 : _a.call(opts);
    },
    notify
  };
}
function assignKeyAndIndex(index, state) {
  if (!state) {
    state = {};
  }
  const key = createRandomKey();
  return {
    ...state,
    key,
    // TODO: Remove in v2 - use __TSR_key instead
    __TSR_key: key,
    [stateIndexKey]: index
  };
}
function createBrowserHistory(opts) {
  var _a, _b;
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  const createHref = (opts == null ? void 0 : opts.createHref) ?? ((path) => path);
  const parseLocation = (opts == null ? void 0 : opts.parseLocation) ?? (() => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  ));
  if (!((_a = win.history.state) == null ? void 0 : _a.__TSR_key) && !((_b = win.history.state) == null ? void 0 : _b.key)) {
    const addedKey = createRandomKey();
    win.history.replaceState(
      {
        [stateIndexKey]: 0,
        key: addedKey,
        // TODO: Remove in v2 - use __TSR_key instead
        __TSR_key: addedKey
      },
      ""
    );
  }
  let currentLocation = parseLocation();
  let rollbackLocation;
  let nextPopIsGo = false;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  let ignoreNextBeforeUnload = false;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush = () => {
    if (!next) {
      return;
    }
    history._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(
      next.state,
      "",
      next.href
    );
    history._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = (type) => {
    currentLocation = parseLocation();
    history.notify({ type });
  };
  const onPushPopEvent = async () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    const nextLocation = parseLocation();
    const delta = nextLocation.state[stateIndexKey] - currentLocation.state[stateIndexKey];
    const isForward = delta === 1;
    const isBack = delta === -1;
    const isGo = !isForward && !isBack || nextPopIsGo;
    nextPopIsGo = false;
    const action = isGo ? "GO" : isBack ? "BACK" : "FORWARD";
    const notify = isGo ? {
      type: "GO",
      index: delta
    } : {
      type: isBack ? "BACK" : "FORWARD"
    };
    if (skipBlockerNextPop) {
      skipBlockerNextPop = false;
    } else {
      const blockers2 = _getBlockers();
      if (typeof document !== "undefined" && blockers2.length) {
        for (const blocker of blockers2) {
          const isBlocked = await blocker.blockerFn({
            currentLocation,
            nextLocation,
            action
          });
          if (isBlocked) {
            ignoreNextPop = true;
            win.history.go(1);
            history.notify(notify);
            return;
          }
        }
      }
    }
    currentLocation = parseLocation();
    history.notify(notify);
  };
  const onBeforeUnload = (e) => {
    if (ignoreNextBeforeUnload) {
      ignoreNextBeforeUnload = false;
      return;
    }
    let shouldBlock = false;
    const blockers2 = _getBlockers();
    if (typeof document !== "undefined" && blockers2.length) {
      for (const blocker of blockers2) {
        const shouldHaveBeforeUnload = blocker.enableBeforeUnload ?? true;
        if (shouldHaveBeforeUnload === true) {
          shouldBlock = true;
          break;
        }
        if (typeof shouldHaveBeforeUnload === "function" && shouldHaveBeforeUnload() === true) {
          shouldBlock = true;
          break;
        }
      }
    }
    if (shouldBlock) {
      e.preventDefault();
      return e.returnValue = "";
    }
    return;
  };
  const history = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      return win.history.back();
    },
    forward: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      win.history.forward();
    },
    go: (n) => {
      nextPopIsGo = true;
      win.history.go(n);
    },
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(beforeUnloadEvent, onBeforeUnload, {
        capture: true
      });
      win.removeEventListener(popStateEvent, onPushPopEvent);
    },
    onBlocked: () => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
      }
    },
    getBlockers: _getBlockers,
    setBlockers: _setBlockers,
    notifyOnIndexChange: false
  });
  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop("PUSH");
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop("REPLACE");
    return res;
  };
  return history;
}
function createHashHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  return createBrowserHistory({
    window: win,
    parseLocation: () => {
      const hashSplit = win.location.hash.split("#").slice(1);
      const pathPart = hashSplit[0] ?? "/";
      const searchPart = win.location.search;
      const hashEntries = hashSplit.slice(1);
      const hashPart = hashEntries.length === 0 ? "" : `#${hashEntries.join("#")}`;
      const hashHref = `${pathPart}${searchPart}${hashPart}`;
      return parseHref(hashHref, win.history.state);
    },
    createHref: (href) => `${win.location.pathname}${win.location.search}#${href}`
  });
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
  const states = entries.map(
    (_entry, index2) => assignKeyAndIndex(index2, void 0)
  );
  const getLocation = () => parseHref(entries[index], states[index]);
  return createHistory({
    getLocation,
    getLength: () => entries.length,
    pushState: (path, state) => {
      if (index < entries.length - 1) {
        entries.splice(index + 1);
        states.splice(index + 1);
      }
      states.push(state);
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      states[index] = state;
      entries[index] = path;
    },
    back: () => {
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  const addedKey = createRandomKey();
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || { [stateIndexKey]: 0, key: addedKey, __TSR_key: addedKey }
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/focusManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/focusManager.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusManager: () => (/* binding */ FocusManager),
/* harmony export */   focusManager: () => (/* binding */ focusManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/focusManager.ts


var FocusManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

//# sourceMappingURL=focusManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasNextPage: () => (/* binding */ hasNextPage),
/* harmony export */   hasPreviousPage: () => (/* binding */ hasPreviousPage),
/* harmony export */   infiniteQueryBehavior: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/infiniteQueryBehavior.ts

function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.ensureQueryFn)(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToStart : _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
function hasNextPage(options, data) {
  if (!data) return false;
  return getNextPageParam(options, data) != null;
}
function hasPreviousPage(options, data) {
  if (!data || !options.getPreviousPageParam) return false;
  return getPreviousPageParam(options, data) != null;
}

//# sourceMappingURL=infiniteQueryBehavior.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutation.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutation.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutation: () => (/* binding */ Mutation),
/* harmony export */   getDefaultState: () => (/* binding */ getDefaultState)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
// src/mutation.ts



var Mutation = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" });
    };
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_1__.createRetryer)({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        this.#dispatch({ type: "pending", variables, isPaused });
        await this.#mutationCache.config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        this.#dispatch({ type: "error", error });
      }
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

//# sourceMappingURL=mutation.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutationCache.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationCache: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _mutation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation.js */ "./node_modules/@tanstack/query-core/build/modern/mutation.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/mutationCache.ts




var MutationCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  #mutations;
  #scopes;
  #mutationId;
  build(client, options, state) {
    const mutation = new _mutation_js__WEBPACK_IMPORTED_MODULE_1__.Mutation({
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        this.#scopes.set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            this.#scopes.delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = this.#scopes.get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  getAll() {
    return Array.from(this.#mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation));
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(_utils_js__WEBPACK_IMPORTED_MODULE_3__.noop))
      )
    );
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

//# sourceMappingURL=mutationCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/notifyManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotifyManager: () => (/* binding */ createNotifyManager),
/* harmony export */   defaultScheduler: () => (/* binding */ defaultScheduler),
/* harmony export */   notifyManager: () => (/* binding */ notifyManager)
/* harmony export */ });
// src/notifyManager.ts
var defaultScheduler = (cb) => setTimeout(cb, 0);
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

//# sourceMappingURL=notifyManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/onlineManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnlineManager: () => (/* binding */ OnlineManager),
/* harmony export */   onlineManager: () => (/* binding */ onlineManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/onlineManager.ts


var OnlineManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

//# sourceMappingURL=onlineManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/query.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/query.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Query: () => (/* binding */ Query),
/* harmony export */   fetchState: () => (/* binding */ fetchState)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
// src/query.ts




var Query = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.replaceData)(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.observers.some(
      (observer) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resolveEnabled)(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_1__.skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resolveStaleTime)(observer.options.staleTime, this) === "static"
      );
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.ensureQueryFn)(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    this.options.behavior?.onFetch(context, this);
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.silent)) {
        this.#dispatch({
          type: "error",
          error
        });
      }
      if (!(0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error)) {
        this.#cache.config.onError?.(
          error,
          this
        );
        this.#cache.config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      this.scheduleGc();
    };
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.createRetryer)({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (data === void 0) {
          if (true) {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        this.#cache.config.onSuccess?.(data, this);
        this.#cache.config.onSettled?.(
          data,
          this.state.error,
          this
        );
        this.scheduleGc();
      },
      onError,
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    return this.#retryer.start();
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          this.#revertState = void 0;
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if ((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.revert && this.#revertState) {
            return { ...this.#revertState, fetchStatus: "idle" };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.canFetch)(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

//# sourceMappingURL=query.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryCache.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryCache.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query.js */ "./node_modules/@tanstack/query-core/build/modern/query.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/queryCache.ts




var QueryCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new _query_js__WEBPACK_IMPORTED_MODULE_2__.Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query)) : queries;
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

//# sourceMappingURL=queryCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryClient.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryClient.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _queryCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryCache.js */ "./node_modules/@tanstack/query-core/build/modern/queryCache.js");
/* harmony import */ var _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutationCache.js */ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js");
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./infiniteQueryBehavior.js */ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js");
// src/queryClient.ts







var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new _queryCache_js__WEBPACK_IMPORTED_MODULE_0__.QueryCache();
    this.#mutationCache = config.mutationCache || new _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__.MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1) return;
    this.#unsubscribeFocus = _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0) return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.functionalUpdate)(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(
        {
          type: "active",
          ...filters
        },
        options
      );
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  invalidateQueries(filters, options = {}) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries(
        {
          ...filters,
          type: filters?.refetchType ?? filters?.type ?? "active"
        },
        options
      );
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (_onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashQueryKeyByOptions)(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_4__.skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

//# sourceMappingURL=queryClient.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryObserver.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryObserver.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryObserver: () => (/* binding */ QueryObserver)
/* harmony export */ });
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./query.js */ "./node_modules/@tanstack/query-core/build/modern/query.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _thenable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thenable.js */ "./node_modules/@tanstack/query-core/build/modern/thenable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/queryObserver.ts






var QueryObserver = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(client, options) {
    super();
    this.options = options;
    this.#client = client;
    this.#selectError = null;
    this.#currentThenable = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
    if (!this.options.experimental_prefetchInRender) {
      this.#currentThenable.reject(
        new Error("experimental_prefetchInRender feature flag is not enabled")
      );
    }
    this.bindMethods();
    this.setOptions(options);
  }
  #client;
  #currentQuery = void 0;
  #currentQueryInitialState = void 0;
  #currentResult = void 0;
  #currentResultState;
  #currentResultOptions;
  #currentThenable;
  #selectError;
  #selectFn;
  #selectResult;
  // This property keeps track of the last query with defined data.
  // It will be used to pass the previous data and query to the placeholder function between renders.
  #lastQueryWithDefinedData;
  #staleTimeoutId;
  #refetchIntervalId;
  #currentRefetchInterval;
  #trackedProps = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.#currentQuery, this.options)) {
        this.#executeFetch();
      } else {
        this.updateResult();
      }
      this.#updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.#clearStaleTimeout();
    this.#clearRefetchInterval();
    this.#currentQuery.removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = this.#currentQuery;
    this.options = this.#client.defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    this.#updateQuery();
    this.#currentQuery.setOptions(this.options);
    if (prevOptions._defaulted && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(this.options, prevOptions)) {
      this.#client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.#currentQuery,
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      this.#currentQuery,
      prevQuery,
      this.options,
      prevOptions
    )) {
      this.#executeFetch();
    }
    this.updateResult();
    if (mounted && (this.#currentQuery !== prevQuery || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(prevOptions.enabled, this.#currentQuery) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(this.options.staleTime, this.#currentQuery) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(prevOptions.staleTime, this.#currentQuery))) {
      this.#updateStaleTimeout();
    }
    const nextRefetchInterval = this.#computeRefetchInterval();
    if (mounted && (this.#currentQuery !== prevQuery || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
      this.#updateRefetchInterval(nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = this.#client.getQueryCache().build(this.#client, options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      this.#currentResult = result;
      this.#currentResultOptions = this.options;
      this.#currentResultState = this.#currentQuery.state;
    }
    return result;
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked?.(key);
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    this.#trackedProps.add(key);
  }
  getCurrentQuery() {
    return this.#currentQuery;
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.#client.defaultQueryOptions(options);
    const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return this.#executeFetch({
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return this.#currentResult;
    });
  }
  #executeFetch(fetchOptions) {
    this.#updateQuery();
    let promise = this.#currentQuery.fetch(
      this.options,
      fetchOptions
    );
    if (!fetchOptions?.throwOnError) {
      promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop);
    }
    return promise;
  }
  #updateStaleTimeout() {
    this.#clearStaleTimeout();
    const staleTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(
      this.options.staleTime,
      this.#currentQuery
    );
    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__.isServer || this.#currentResult.isStale || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(staleTime)) {
      return;
    }
    const time = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.timeUntilStale)(this.#currentResult.dataUpdatedAt, staleTime);
    const timeout = time + 1;
    this.#staleTimeoutId = setTimeout(() => {
      if (!this.#currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  #computeRefetchInterval() {
    return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
  }
  #updateRefetchInterval(nextInterval) {
    this.#clearRefetchInterval();
    this.#currentRefetchInterval = nextInterval;
    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__.isServer || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) === false || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
      return;
    }
    this.#refetchIntervalId = setInterval(() => {
      if (this.options.refetchIntervalInBackground || _focusManager_js__WEBPACK_IMPORTED_MODULE_3__.focusManager.isFocused()) {
        this.#executeFetch();
      }
    }, this.#currentRefetchInterval);
  }
  #updateTimers() {
    this.#updateStaleTimeout();
    this.#updateRefetchInterval(this.#computeRefetchInterval());
  }
  #clearStaleTimeout() {
    if (this.#staleTimeoutId) {
      clearTimeout(this.#staleTimeoutId);
      this.#staleTimeoutId = void 0;
    }
  }
  #clearRefetchInterval() {
    if (this.#refetchIntervalId) {
      clearInterval(this.#refetchIntervalId);
      this.#refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.#currentQuery;
    const prevOptions = this.options;
    const prevResult = this.#currentResult;
    const prevResultState = this.#currentResultState;
    const prevResultOptions = this.#currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...(0,_query_js__WEBPACK_IMPORTED_MODULE_4__.fetchState)(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          this.#lastQueryWithDefinedData?.state.data,
          this.#lastQueryWithDefinedData
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.replaceData)(
          prevResult?.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
        data = this.#selectResult;
      } else {
        try {
          this.#selectFn = options.select;
          data = options.select(data);
          data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.replaceData)(prevResult?.data, data, options);
          this.#selectResult = data;
          this.#selectError = null;
        } catch (selectError) {
          this.#selectError = selectError;
        }
      }
    }
    if (this.#selectError) {
      error = this.#selectError;
      data = this.#selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: this.#currentThenable,
      isEnabled: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const finalizeThenableIfPossible = (thenable) => {
        if (nextResult.status === "error") {
          thenable.reject(nextResult.error);
        } else if (nextResult.data !== void 0) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = this.#currentThenable = nextResult.promise = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = this.#currentThenable;
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = this.#currentResult;
    const nextResult = this.createResult(this.#currentQuery, this.options);
    this.#currentResultState = this.#currentQuery.state;
    this.#currentResultOptions = this.options;
    if (this.#currentResultState.data !== void 0) {
      this.#lastQueryWithDefinedData = this.#currentQuery;
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(nextResult, prevResult)) {
      return;
    }
    this.#currentResult = nextResult;
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? this.#trackedProps
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(this.#currentResult).some((key) => {
        const typedKey = key;
        const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    this.#notify({ listeners: shouldNotifyListeners() });
  }
  #updateQuery() {
    const query = this.#client.getQueryCache().build(this.#client, this.options);
    if (query === this.#currentQuery) {
      return;
    }
    const prevQuery = this.#currentQuery;
    this.#currentQuery = query;
    this.#currentQueryInitialState = query.state;
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      this.#updateTimers();
    }
  }
  #notify(notifyOptions) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.#currentResult);
        });
      }
      this.#client.getQueryCache().notify({
        query: this.#currentQuery,
        type: "observerResultsUpdated"
      });
    });
  }
};
function shouldLoadOnMount(query, options) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false && (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false && query.isStaleByTime((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}

//# sourceMappingURL=queryObserver.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/removable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/removable.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Removable: () => (/* binding */ Removable)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/removable.ts

var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isValidTimeout)(this.gcTime)) {
      this.#gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

//# sourceMappingURL=removable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/retryer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/retryer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelledError: () => (/* binding */ CancelledError),
/* harmony export */   canFetch: () => (/* binding */ canFetch),
/* harmony export */   createRetryer: () => (/* binding */ createRetryer),
/* harmony export */   isCancelledError: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _thenable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thenable.js */ "./node_modules/@tanstack/query-core/build/modern/thenable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/retryer.ts




function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  const thenable = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.isFocused() && (config.networkMode === "always" || _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (_utils_js__WEBPACK_IMPORTED_MODULE_3__.isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.sleep)(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

//# sourceMappingURL=retryer.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/subscribable.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/subscribable.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribable: () => (/* binding */ Subscribable)
/* harmony export */ });
// src/subscribable.ts
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

//# sourceMappingURL=subscribable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/thenable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/thenable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pendingThenable: () => (/* binding */ pendingThenable),
/* harmony export */   tryResolveSync: () => (/* binding */ tryResolveSync)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/thenable.ts

function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}
function tryResolveSync(promise) {
  let data;
  promise.then((result) => {
    data = result;
    return result;
  }, _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop)?.catch(_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop);
  if (data !== void 0) {
    return { data };
  }
  return void 0;
}

//# sourceMappingURL=thenable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToEnd: () => (/* binding */ addToEnd),
/* harmony export */   addToStart: () => (/* binding */ addToStart),
/* harmony export */   ensureQueryFn: () => (/* binding */ ensureQueryFn),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   hashKey: () => (/* binding */ hashKey),
/* harmony export */   hashQueryKeyByOptions: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isServer: () => (/* binding */ isServer),
/* harmony export */   isValidTimeout: () => (/* binding */ isValidTimeout),
/* harmony export */   keepPreviousData: () => (/* binding */ keepPreviousData),
/* harmony export */   matchMutation: () => (/* binding */ matchMutation),
/* harmony export */   matchQuery: () => (/* binding */ matchQuery),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   partialMatchKey: () => (/* binding */ partialMatchKey),
/* harmony export */   replaceData: () => (/* binding */ replaceData),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   resolveEnabled: () => (/* binding */ resolveEnabled),
/* harmony export */   resolveStaleTime: () => (/* binding */ resolveStaleTime),
/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects),
/* harmony export */   shouldThrowError: () => (/* binding */ shouldThrowError),
/* harmony export */   skipToken: () => (/* binding */ skipToken),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   timeUntilStale: () => (/* binding */ timeUntilStale)
/* harmony export */ });
// src/utils.ts
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    const aItemsSet = new Set(aItems);
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItemsSet.has(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (true) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
        throw error;
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function keepPreviousData(previousData) {
  return previousData;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") {
    return throwOnError(...params);
  }
  return !!throwOnError;
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsRestoringProvider: () => (/* binding */ IsRestoringProvider),
/* harmony export */   useIsRestoring: () => (/* binding */ useIsRestoring)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/IsRestoringProvider.ts

var IsRestoringContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(false);
var useIsRestoring = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;

//# sourceMappingURL=IsRestoringProvider.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientContext: () => (/* binding */ QueryClientContext),
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";

// src/QueryClientProvider.tsx


var QueryClientContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryClientContext.Provider, { value: client, children });
};

//# sourceMappingURL=QueryClientProvider.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryErrorResetBoundary: () => (/* binding */ QueryErrorResetBoundary),
/* harmony export */   useQueryErrorResetBoundary: () => (/* binding */ useQueryErrorResetBoundary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";

// src/QueryErrorResetBoundary.tsx


function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(createValue());
var useQueryErrorResetBoundary = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({
  children
}) => {
  const [value] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => createValue());
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryErrorResetBoundaryContext.Provider, { value, children: typeof children === "function" ? children(value) : children });
};

//# sourceMappingURL=QueryErrorResetBoundary.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensurePreventErrorBoundaryRetry: () => (/* binding */ ensurePreventErrorBoundaryRetry),
/* harmony export */   getHasError: () => (/* binding */ getHasError),
/* harmony export */   useClearResetErrorBoundary: () => (/* binding */ useClearResetErrorBoundary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
"use client";

// src/errorBoundaryUtils.ts


var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
  if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || (0,_tanstack_query_core__WEBPACK_IMPORTED_MODULE_1__.shouldThrowError)(throwOnError, [result.error, query]));
};

//# sourceMappingURL=errorBoundaryUtils.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/suspense.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/suspense.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultThrowOnError: () => (/* binding */ defaultThrowOnError),
/* harmony export */   ensureSuspenseTimers: () => (/* binding */ ensureSuspenseTimers),
/* harmony export */   fetchOptimistic: () => (/* binding */ fetchOptimistic),
/* harmony export */   shouldSuspend: () => (/* binding */ shouldSuspend),
/* harmony export */   willFetch: () => (/* binding */ willFetch)
/* harmony export */ });
// src/suspense.ts
var defaultThrowOnError = (_error, query) => query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const clamp = (value) => value === "static" ? value : Math.max(value ?? 1e3, 1e3);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1e3);
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});

//# sourceMappingURL=suspense.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/useBaseQuery.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/useBaseQuery.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBaseQuery: () => (/* binding */ useBaseQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryClientProvider.js */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _QueryErrorResetBoundary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryErrorResetBoundary.js */ "./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js");
/* harmony import */ var _errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errorBoundaryUtils.js */ "./node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js");
/* harmony import */ var _IsRestoringProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsRestoringProvider.js */ "./node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js");
/* harmony import */ var _suspense_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./suspense.js */ "./node_modules/@tanstack/react-query/build/modern/suspense.js");
"use client";

// src/useBaseQuery.ts







function useBaseQuery(options, Observer, queryClient) {
  if (true) {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new Error(
        'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
      );
    }
  }
  const isRestoring = (0,_IsRestoringProvider_js__WEBPACK_IMPORTED_MODULE_1__.useIsRestoring)();
  const errorResetBoundary = (0,_QueryErrorResetBoundary_js__WEBPACK_IMPORTED_MODULE_2__.useQueryErrorResetBoundary)();
  const client = (0,_QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_3__.useQueryClient)(queryClient);
  const defaultedOptions = client.defaultQueryOptions(options);
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(
    defaultedOptions
  );
  if (true) {
    if (!defaultedOptions.queryFn) {
      console.error(
        `[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
      );
    }
  }
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.ensureSuspenseTimers)(defaultedOptions);
  (0,_errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__.ensurePreventErrorBoundaryRetry)(defaultedOptions, errorResetBoundary);
  (0,_errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__.useClearResetErrorBoundary)(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = react__WEBPACK_IMPORTED_MODULE_0__.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(_tanstack_query_core__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batchCalls(onStoreChange)) : _tanstack_query_core__WEBPACK_IMPORTED_MODULE_7__.noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if ((0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.shouldSuspend)(defaultedOptions, result)) {
    throw (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.fetchOptimistic)(defaultedOptions, observer, errorResetBoundary);
  }
  if ((0,_errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__.getHasError)({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query: client.getQueryCache().get(defaultedOptions.queryHash),
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  ;
  client.getDefaultOptions().queries?._experimental_afterQuery?.(
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !_tanstack_query_core__WEBPACK_IMPORTED_MODULE_7__.isServer && (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.willFetch)(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.fetchOptimistic)(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      client.getQueryCache().get(defaultedOptions.queryHash)?.promise
    );
    promise?.catch(_tanstack_query_core__WEBPACK_IMPORTED_MODULE_7__.noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

//# sourceMappingURL=useBaseQuery.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/useQuery.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/useQuery.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useQuery: () => (/* binding */ useQuery)
/* harmony export */ });
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/queryObserver.js");
/* harmony import */ var _useBaseQuery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useBaseQuery.js */ "./node_modules/@tanstack/react-query/build/modern/useBaseQuery.js");
"use client";

// src/useQuery.ts


function useQuery(options, queryClient) {
  return (0,_useBaseQuery_js__WEBPACK_IMPORTED_MODULE_0__.useBaseQuery)(options, _tanstack_query_core__WEBPACK_IMPORTED_MODULE_1__.QueryObserver, queryClient);
}

//# sourceMappingURL=useQuery.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatchBoundary: () => (/* binding */ CatchBoundary),
/* harmony export */   ErrorComponent: () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");


function CatchBoundary(props) {
  const errorComponent = props.errorComponent ?? ErrorComponent;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    CatchBoundaryImpl,
    {
      getResetKey: props.getResetKey,
      onCatch: props.onCatch,
      children: ({ error, reset }) => {
        if (error) {
          return react__WEBPACK_IMPORTED_MODULE_1__.createElement(errorComponent, {
            error,
            reset
          });
        }
        return props.children;
      }
    }
  );
}
class CatchBoundaryImpl extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props) {
    return { resetKey: props.getResetKey() };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.resetKey !== this.state.resetKey) {
      this.reset();
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }
  render() {
    return this.props.children({
      error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
}
function ErrorComponent({ error }) {
  const [show, setShow] = react__WEBPACK_IMPORTED_MODULE_1__.useState("development" !== "production");
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "button",
        {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        }
      )
    ] }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { height: ".25rem" } }),
    show ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      "pre",
      {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", { children: error.message }) : null
      }
    ) }) : null
  ] });
}

//# sourceMappingURL=CatchBoundary.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/ClientOnly.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/ClientOnly.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientOnly: () => (/* binding */ ClientOnly)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");


function ClientOnly({ children, fallback = null }) {
  return useHydrated() ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, { children }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, { children: fallback });
}
function useHydrated() {
  return react__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}

//# sourceMappingURL=ClientOnly.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Match.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Match.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Match: () => (/* binding */ Match),
/* harmony export */   MatchInner: () => (/* binding */ MatchInner),
/* harmony export */   Outlet: () => (/* binding */ Outlet)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/not-found.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/redirect.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");
/* harmony import */ var _SafeFragment_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SafeFragment.js */ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js");
/* harmony import */ var _renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./renderRouteNotFound.js */ "./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js");
/* harmony import */ var _scroll_restoration_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./scroll-restoration.js */ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js");
/* harmony import */ var _ClientOnly_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ClientOnly.js */ "./node_modules/@tanstack/react-router/dist/esm/ClientOnly.js");














const Match = react__WEBPACK_IMPORTED_MODULE_1__.memo(function MatchImpl({
  matchId
}) {
  var _a, _b;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const matchState = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const match = s.matches.find((d) => d.id === matchId);
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])(
        match,
        `Could not find match for matchId "${matchId}". Please file an issue!`
      );
      return (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.pick)(match, ["routeId", "ssr", "_displayPending"]);
    },
    structuralSharing: true
  });
  const route = router.routesById[matchState.routeId];
  const PendingComponent = route.options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? (
    // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
    route.options.notFoundComponent ?? ((_a = router.options.notFoundRoute) == null ? void 0 : _a.options.component)
  ) : route.options.notFoundComponent;
  const resolvedNoSsr = matchState.ssr === false || matchState.ssr === "data-only";
  const ResolvedSuspenseBoundary = (
    // If we're on the root route, allow forcefully wrapping in suspense
    (!route.isRoot || route.options.wrapInSuspense || resolvedNoSsr) && (route.options.wrapInSuspense ?? PendingComponent ?? (((_b = route.options.errorComponent) == null ? void 0 : _b.preload) || resolvedNoSsr)) ? react__WEBPACK_IMPORTED_MODULE_1__.Suspense : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_6__.SafeFragment
  );
  const ResolvedCatchBoundary = routeErrorComponent ? _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.CatchBoundary : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_6__.SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? _not_found_js__WEBPACK_IMPORTED_MODULE_8__.CatchNotFound : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_6__.SafeFragment;
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => s.loadedAt
  });
  const parentRouteId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a2;
      const index = s.matches.findIndex((d) => d.id === matchId);
      return (_a2 = s.matches[index - 1]) == null ? void 0 : _a2.routeId;
    }
  });
  const ShellComponent = route.isRoot ? route.options.shellComponent ?? _SafeFragment_js__WEBPACK_IMPORTED_MODULE_6__.SafeFragment : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_6__.SafeFragment;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ShellComponent, { children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_matchContext_js__WEBPACK_IMPORTED_MODULE_9__.matchContext.Provider, { value: matchId, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ResolvedSuspenseBoundary, { fallback: pendingElement, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      ResolvedCatchBoundary,
      {
        getResetKey: () => resetKey,
        errorComponent: routeErrorComponent || _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.ErrorComponent,
        onCatch: (error, errorInfo) => {
          if ((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(error)) throw error;
          (0,tiny_warning__WEBPACK_IMPORTED_MODULE_11__["default"])(false, `Error in route match: ${matchId}`);
          routeOnCatch == null ? void 0 : routeOnCatch(error, errorInfo);
        },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          ResolvedNotFoundBoundary,
          {
            fallback: (error) => {
              if (!routeNotFoundComponent || error.routeId && error.routeId !== matchState.routeId || !error.routeId && !route.isRoot)
                throw error;
              return react__WEBPACK_IMPORTED_MODULE_1__.createElement(routeNotFoundComponent, error);
            },
            children: resolvedNoSsr || matchState._displayPending ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ClientOnly_js__WEBPACK_IMPORTED_MODULE_12__.ClientOnly, { fallback: pendingElement, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchInner, { matchId }) }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchInner, { matchId })
          }
        )
      }
    ) }) }),
    parentRouteId === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__.rootRouteId && router.options.scrollRestoration ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OnRendered, {}),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_scroll_restoration_js__WEBPACK_IMPORTED_MODULE_14__.ScrollRestoration, {})
    ] }) : null
  ] });
});
function OnRendered() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const prevLocationRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(
    void 0
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "script",
    {
      suppressHydrationWarning: true,
      ref: (el) => {
        if (el && (prevLocationRef.current === void 0 || prevLocationRef.current.href !== router.latestLocation.href)) {
          router.emit({
            type: "onRendered",
            ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_15__.getLocationChangeInfo)(router.state)
          });
          prevLocationRef.current = router.latestLocation;
        }
      }
    },
    router.latestLocation.state.__TSR_key
  );
}
const MatchInner = react__WEBPACK_IMPORTED_MODULE_1__.memo(function MatchInnerImpl({
  matchId
}) {
  var _a, _b, _c, _d, _e;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const { match, key, routeId } = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const matchIndex = s.matches.findIndex((d) => d.id === matchId);
      const match2 = s.matches[matchIndex];
      const routeId2 = match2.routeId;
      const remountFn = router.routesById[routeId2].options.remountDeps ?? router.options.defaultRemountDeps;
      const remountDeps = remountFn == null ? void 0 : remountFn({
        routeId: routeId2,
        loaderDeps: match2.loaderDeps,
        params: match2._strictParams,
        search: match2._strictSearch
      });
      const key2 = remountDeps ? JSON.stringify(remountDeps) : void 0;
      return {
        key: key2,
        routeId: routeId2,
        match: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.pick)(match2, [
          "id",
          "status",
          "error",
          "_forcePending",
          "_displayPending"
        ])
      };
    },
    structuralSharing: true
  });
  const route = router.routesById[routeId];
  const out = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    const Comp = route.options.component ?? router.options.defaultComponent;
    if (Comp) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {}, key);
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Outlet, {});
  }, [key, route.options.component, router.options.defaultComponent]);
  if (match._displayPending) {
    throw (_a = router.getMatch(match.id)) == null ? void 0 : _a.displayPendingPromise;
  }
  if (match._forcePending) {
    throw (_b = router.getMatch(match.id)) == null ? void 0 : _b.minPendingPromise;
  }
  if (match.status === "pending") {
    const pendingMinMs = route.options.pendingMinMs ?? router.options.defaultPendingMinMs;
    if (pendingMinMs && !((_c = router.getMatch(match.id)) == null ? void 0 : _c.minPendingPromise)) {
      if (!router.isServer) {
        const minPendingPromise = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)();
        Promise.resolve().then(() => {
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise
          }));
        });
        setTimeout(() => {
          minPendingPromise.resolve();
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise: void 0
          }));
        }, pendingMinMs);
      }
    }
    throw (_d = router.getMatch(match.id)) == null ? void 0 : _d.loadPromise;
  }
  if (match.status === "notFound") {
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(match.error), "Expected a notFound error");
    return (0,_renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_16__.renderRouteNotFound)(router, route, match.error);
  }
  if (match.status === "redirected") {
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_17__.isRedirect)(match.error), "Expected a redirect error");
    throw (_e = router.getMatch(match.id)) == null ? void 0 : _e.loadPromise;
  }
  if (match.status === "error") {
    if (router.isServer) {
      const RouteErrorComponent = (route.options.errorComponent ?? router.options.defaultErrorComponent) || _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.ErrorComponent;
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        RouteErrorComponent,
        {
          error: match.error,
          reset: void 0,
          info: {
            componentStack: ""
          }
        }
      );
    }
    throw match.error;
  }
  return out;
});
const Outlet = react__WEBPACK_IMPORTED_MODULE_1__.memo(function OutletImpl() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const matchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_9__.matchContext);
  const routeId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a;
      return (_a = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a.routeId;
    }
  });
  const route = router.routesById[routeId];
  const parentGlobalNotFound = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const matches = s.matches;
      const parentMatch = matches.find((d) => d.id === matchId);
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])(
        parentMatch,
        `Could not find parent match for matchId "${matchId}"`
      );
      return parentMatch.globalNotFound;
    }
  });
  const childMatchId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a;
      const matches = s.matches;
      const index = matches.findIndex((d) => d.id === matchId);
      return (_a = matches[index + 1]) == null ? void 0 : _a.id;
    }
  });
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultPendingComponent, {}) : null;
  if (parentGlobalNotFound) {
    return (0,_renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_16__.renderRouteNotFound)(router, route, void 0);
  }
  if (!childMatchId) {
    return null;
  }
  const nextMatch = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Match, { matchId: childMatchId });
  if (matchId === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__.rootRouteId) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, { fallback: pendingElement, children: nextMatch });
  }
  return nextMatch;
});

//# sourceMappingURL=Match.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Matches.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Matches.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatchRoute: () => (/* binding */ MatchRoute),
/* harmony export */   Matches: () => (/* binding */ Matches),
/* harmony export */   useChildMatches: () => (/* binding */ useChildMatches),
/* harmony export */   useMatchRoute: () => (/* binding */ useMatchRoute),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useParentMatches: () => (/* binding */ useParentMatches)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _Transitioner_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transitioner.js */ "./node_modules/@tanstack/react-router/dist/esm/Transitioner.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");
/* harmony import */ var _Match_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Match.js */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var _SafeFragment_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SafeFragment.js */ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js");










function Matches() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultPendingComponent, {}) : null;
  const ResolvedSuspense = router.isServer || typeof document !== "undefined" && router.ssr ? _SafeFragment_js__WEBPACK_IMPORTED_MODULE_3__.SafeFragment : react__WEBPACK_IMPORTED_MODULE_1__.Suspense;
  const inner = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ResolvedSuspense, { fallback: pendingElement, children: [
    !router.isServer && /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Transitioner_js__WEBPACK_IMPORTED_MODULE_4__.Transitioner, {}),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchesInner, {})
  ] });
  return router.options.InnerWrap ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const matchId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      var _a;
      return (_a = s.matches[0]) == null ? void 0 : _a.id;
    }
  });
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => s.loadedAt
  });
  const matchComponent = matchId ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Match_js__WEBPACK_IMPORTED_MODULE_6__.Match, { matchId }) : null;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_matchContext_js__WEBPACK_IMPORTED_MODULE_7__.matchContext.Provider, { value: matchId, children: router.options.disableGlobalCatchBoundary ? matchComponent : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_8__.CatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent,
      onCatch: (error) => {
        (0,tiny_warning__WEBPACK_IMPORTED_MODULE_9__["default"])(
          false,
          `The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!`
        );
        (0,tiny_warning__WEBPACK_IMPORTED_MODULE_9__["default"])(false, error.message || error.toString());
      },
      children: matchComponent
    }
  ) });
}
function useMatchRoute() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      var _a;
      return [s.location.href, (_a = s.resolvedLocation) == null ? void 0 : _a.href, s.status];
    },
    structuralSharing: true
  });
  return react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (opts) => {
      const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts;
      return router.matchRoute(rest, {
        pending,
        caseSensitive,
        fuzzy,
        includeSearch
      });
    },
    [router]
  );
}
function MatchRoute(props) {
  const matchRoute = useMatchRoute();
  const params = matchRoute(props);
  if (typeof props.children === "function") {
    return props.children(params);
  }
  return params ? props.children : null;
}
function useMatches(opts) {
  return (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (state) => {
      const matches = state.matches;
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useParentMatches(opts) {
  const contextMatchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_7__.matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        0,
        matches.findIndex((d) => d.id === contextMatchId)
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useChildMatches(opts) {
  const contextMatchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_7__.matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        matches.findIndex((d) => d.id === contextMatchId) + 1
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}

//# sourceMappingURL=Matches.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouterContextProvider: () => (/* binding */ RouterContextProvider),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _Matches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Matches.js */ "./node_modules/@tanstack/react-router/dist/esm/Matches.js");
/* harmony import */ var _routerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routerContext.js */ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js");



function RouterContextProvider({
  router,
  children,
  ...rest
}) {
  if (Object.keys(rest).length > 0) {
    router.update({
      ...router.options,
      ...rest,
      context: {
        ...router.options.context,
        ...rest.context
      }
    });
  }
  const routerContext = (0,_routerContext_js__WEBPACK_IMPORTED_MODULE_1__.getRouterContext)();
  const provider = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(routerContext.Provider, { value: router, children });
  if (router.options.Wrap) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.Wrap, { children: provider });
  }
  return provider;
}
function RouterProvider({ router, ...rest }) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RouterContextProvider, { router, ...rest, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Matches_js__WEBPACK_IMPORTED_MODULE_2__.Matches, {}) });
}

//# sourceMappingURL=RouterProvider.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SafeFragment: () => (/* binding */ SafeFragment)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");

function SafeFragment(props) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: props.children });
}

//# sourceMappingURL=SafeFragment.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScriptOnce: () => (/* binding */ ScriptOnce)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");

function ScriptOnce({
  children
}) {
  if (typeof document !== "undefined") {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "script",
    {
      className: "$tsr",
      dangerouslySetInnerHTML: {
        __html: [children].filter(Boolean).join("\n")
      }
    }
  );
}

//# sourceMappingURL=ScriptOnce.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Transitioner.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Transitioner.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transitioner: () => (/* binding */ Transitioner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-router/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");





function Transitioner() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const mountLoadForRouter = react__WEBPACK_IMPORTED_MODULE_0__.useRef({ router, mounted: false });
  const [isTransitioning, setIsTransitioning] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const { hasPendingMatches, isLoading } = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_2__.useRouterState)({
    select: (s) => ({
      isLoading: s.isLoading,
      hasPendingMatches: s.matches.some((d) => d.status === "pending")
    }),
    structuralSharing: true
  });
  const previousIsLoading = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isLoading);
  const isAnyPending = isLoading || isTransitioning || hasPendingMatches;
  const previousIsAnyPending = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isAnyPending);
  const isPagePending = isLoading || hasPendingMatches;
  const previousIsPagePending = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isPagePending);
  router.startTransition = (fn) => {
    setIsTransitioning(true);
    react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
      fn();
      setIsTransitioning(false);
    });
  };
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if ((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__.trimPathRight)(router.latestLocation.href) !== (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__.trimPathRight)(nextLocation.href)) {
      router.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router, router.history]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (
      // if we are hydrating from SSR, loading is triggered in ssr-client
      typeof window !== "undefined" && router.ssr || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted
    ) {
      return;
    }
    mountLoadForRouter.current = { router, mounted: true };
    const tryLoad = async () => {
      try {
        await router.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsLoading && !isLoading) {
      router.emit({
        type: "onLoad",
        // When the new URL has committed, when the new matches have been loaded into state.matches
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
    }
  }, [previousIsLoading, router, isLoading]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsPagePending && !isPagePending) {
      router.emit({
        type: "onBeforeRouteMount",
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
    }
  }, [isPagePending, previousIsPagePending, router]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsAnyPending && !isAnyPending) {
      router.emit({
        type: "onResolved",
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
      router.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
      (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.handleHashScroll)(router);
    }
  }, [isAnyPending, previousIsAnyPending, router]);
  return null;
}

//# sourceMappingURL=Transitioner.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/fileRoute.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileRoute: () => (/* binding */ FileRoute),
/* harmony export */   FileRouteLoader: () => (/* binding */ FileRouteLoader),
/* harmony export */   LazyRoute: () => (/* binding */ LazyRoute),
/* harmony export */   createFileRoute: () => (/* binding */ createFileRoute),
/* harmony export */   createLazyFileRoute: () => (/* binding */ createLazyFileRoute),
/* harmony export */   createLazyRoute: () => (/* binding */ createLazyRoute)
/* harmony export */ });
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");
/* harmony import */ var _useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useLoaderDeps.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js");
/* harmony import */ var _useLoaderData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useLoaderData.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js");
/* harmony import */ var _useSearch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useSearch.js */ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js");
/* harmony import */ var _useParams_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useParams.js */ "./node_modules/@tanstack/react-router/dist/esm/useParams.js");
/* harmony import */ var _useNavigate_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useNavigate.js */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");









function createFileRoute(path) {
  if (typeof path === "object") {
    return new FileRoute(path, {
      silent: true
    }).createRoute(path);
  }
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      (0,tiny_warning__WEBPACK_IMPORTED_MODULE_0__["default"])(
        this.silent,
        "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead."
      );
      const route = (0,_route_js__WEBPACK_IMPORTED_MODULE_1__.createRoute)(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts == null ? void 0 : _opts.silent;
  }
}
function FileRouteLoader(_path) {
  (0,tiny_warning__WEBPACK_IMPORTED_MODULE_0__["default"])(
    false,
    `FileRouteLoader is deprecated and will be removed in the next major version. Please place the loader function in the the main route file, inside the \`createFileRoute('/path/to/file')(options)\` options`
  );
  return (loaderFn) => loaderFn;
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
        select: opts2 == null ? void 0 : opts2.select,
        from: this.options.id,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
        from: this.options.id,
        select: (d) => (opts2 == null ? void 0 : opts2.select) ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_3__.useSearch)({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_4__.useParams)({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderDeps)({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_6__.useLoaderData)({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_8__.useNavigate)({ from: router.routesById[this.options.id].fullPath });
    };
    this.options = opts;
    this.$$typeof = Symbol.for("react.memo");
  }
}
function createLazyRoute(id) {
  return (opts) => {
    return new LazyRoute({
      id,
      ...opts
    });
  };
}
function createLazyFileRoute(id) {
  if (typeof id === "object") {
    return new LazyRoute(id);
  }
  return (opts) => new LazyRoute({ id, ...opts });
}

//# sourceMappingURL=fileRoute.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/link.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/link.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   createLink: () => (/* binding */ createLink),
/* harmony export */   linkOptions: () => (/* binding */ linkOptions),
/* harmony export */   useLinkProps: () => (/* binding */ useLinkProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/link.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-router/dist/esm/utils.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");








function useLinkProps(options, forwardedRef) {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const [isTransitioning, setIsTransitioning] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
  const hasRenderFetched = react__WEBPACK_IMPORTED_MODULE_1__.useRef(false);
  const innerRef = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.useForwardedRef)(forwardedRef);
  const {
    // custom props
    activeProps,
    inactiveProps,
    activeOptions,
    to,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    hashScrollIntoView,
    replace,
    startTransition,
    resetScroll,
    viewTransition,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    // prevent these from being returned
    params: _params,
    search: _search,
    hash: _hash,
    state: _state,
    mask: _mask,
    reloadDocument: _reloadDocument,
    unsafeRelative: _unsafeRelative,
    from: _from,
    _fromLocation,
    ...propsSafeToSpread
  } = options;
  const type = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    try {
      new URL(to);
      return "external";
    } catch {
    }
    return "internal";
  }, [to]);
  const currentSearch = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => s.location.search,
    structuralSharing: true
  });
  const from = (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_6__.useMatch)({
    strict: false,
    select: (match) => options.from ?? match.fullPath
  });
  const next = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(
    () => router.buildLocation({ ...options, from }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      router,
      currentSearch,
      options._fromLocation,
      from,
      options.hash,
      options.to,
      options.search,
      options.params,
      options.state,
      options.mask,
      options.unsafeRelative
    ]
  );
  const isExternal = type === "external";
  const preload = options.reloadDocument || isExternal ? false : userPreload ?? router.options.defaultPreload;
  const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
  const isActive = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      if (isExternal) return false;
      if (activeOptions == null ? void 0 : activeOptions.exact) {
        const testExact = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_7__.exactPathTest)(
          s.location.pathname,
          next.pathname,
          router.basepath
        );
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_7__.removeTrailingSlash)(
          s.location.pathname,
          router.basepath
        );
        const nextPathSplit = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_7__.removeTrailingSlash)(
          next.pathname,
          router.basepath
        );
        const pathIsFuzzyEqual = currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/");
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      if ((activeOptions == null ? void 0 : activeOptions.includeSearch) ?? true) {
        const searchTest = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.deepEqual)(s.location.search, next.search, {
          partial: !(activeOptions == null ? void 0 : activeOptions.exact),
          ignoreUndefined: !(activeOptions == null ? void 0 : activeOptions.explicitUndefined)
        });
        if (!searchTest) {
          return false;
        }
      }
      if (activeOptions == null ? void 0 : activeOptions.includeHash) {
        return s.location.hash === next.hash;
      }
      return true;
    }
  });
  const doPreload = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    () => {
      router.preloadRoute({ ...options, from }).catch((err) => {
        console.warn(err);
        console.warn(_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.preloadWarning);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      router,
      options.to,
      options._fromLocation,
      from,
      options.search,
      options.hash,
      options.params,
      options.state,
      options.mask,
      options.unsafeRelative,
      options.hashScrollIntoView,
      options.href,
      options.ignoreBlocker,
      options.reloadDocument,
      options.replace,
      options.resetScroll,
      options.viewTransition
    ]
  );
  const preloadViewportIoCallback = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (entry) => {
      if (entry == null ? void 0 : entry.isIntersecting) {
        doPreload();
      }
    },
    [doPreload]
  );
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.useIntersectionObserver)(
    innerRef,
    preloadViewportIoCallback,
    intersectionObserverOptions,
    { disabled: !!disabled || !(preload === "viewport") }
  );
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
    if (hasRenderFetched.current) {
      return;
    }
    if (!disabled && preload === "render") {
      doPreload();
      hasRenderFetched.current = true;
    }
  }, [disabled, doPreload, preload]);
  if (isExternal) {
    return {
      ...propsSafeToSpread,
      ref: innerRef,
      type,
      href: to,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className },
      ...onClick && { onClick },
      ...onFocus && { onFocus },
      ...onMouseEnter && { onMouseEnter },
      ...onMouseLeave && { onMouseLeave },
      ...onTouchStart && { onTouchStart }
    };
  }
  const handleClick = (e) => {
    if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!target || target === "_self") && e.button === 0) {
      e.preventDefault();
      (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.flushSync)(() => {
        setIsTransitioning(true);
      });
      const unsub = router.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      router.navigate({
        ...options,
        from,
        replace,
        resetScroll,
        hashScrollIntoView,
        startTransition,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  const handleFocus = (_) => {
    if (disabled) return;
    if (preload) {
      doPreload();
    }
  };
  const handleTouchStart = handleFocus;
  const handleEnter = (e) => {
    if (disabled || !preload) return;
    if (!preloadDelay) {
      doPreload();
    } else {
      const eventTarget = e.target;
      if (timeoutMap.has(eventTarget)) {
        return;
      }
      const id = setTimeout(() => {
        timeoutMap.delete(eventTarget);
        doPreload();
      }, preloadDelay);
      timeoutMap.set(eventTarget, id);
    }
  };
  const handleLeave = (e) => {
    if (disabled || !preload || !preloadDelay) return;
    const eventTarget = e.target;
    const id = timeoutMap.get(eventTarget);
    if (id) {
      clearTimeout(id);
      timeoutMap.delete(eventTarget);
    }
  };
  const resolvedActiveProps = isActive ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.functionalUpdate)(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
  const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.functionalUpdate)(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = (style || resolvedActiveProps.style || resolvedInactiveProps.style) && {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  return {
    ...propsSafeToSpread,
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    href: disabled ? void 0 : next.maskedLocation ? router.history.createHref(next.maskedLocation.href) : router.history.createHref(next.href),
    ref: innerRef,
    onClick: composeHandlers([onClick, handleClick]),
    onFocus: composeHandlers([onFocus, handleFocus]),
    onMouseEnter: composeHandlers([onMouseEnter, handleEnter]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    disabled: !!disabled,
    target,
    ...resolvedStyle && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && STATIC_DISABLED_PROPS,
    ...isActive && STATIC_ACTIVE_PROPS,
    ...isTransitioning && STATIC_TRANSITIONING_PROPS
  };
}
const STATIC_EMPTY_OBJECT = {};
const STATIC_ACTIVE_OBJECT = { className: "active" };
const STATIC_DISABLED_PROPS = { role: "link", "aria-disabled": true };
const STATIC_ACTIVE_PROPS = { "data-status": "active", "aria-current": "page" };
const STATIC_TRANSITIONING_PROPS = { "data-transitioning": "transitioning" };
const timeoutMap = /* @__PURE__ */ new WeakMap();
const intersectionObserverOptions = {
  rootMargin: "100px"
};
const composeHandlers = (handlers) => (e) => {
  handlers.filter(Boolean).forEach((handler) => {
    if (e.defaultPrevented) return;
    handler(e);
  });
};
function createLink(Comp) {
  return react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function CreatedLink(props, ref) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Link, { ...props, _asChild: Comp, ref });
  });
}
const Link = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(
  (props, ref) => {
    const { _asChild, ...rest } = props;
    const {
      type: _type,
      ref: innerRef,
      ...linkProps
    } = useLinkProps(rest, ref);
    const children = typeof rest.children === "function" ? rest.children({
      isActive: linkProps["data-status"] === "active"
    }) : rest.children;
    if (_asChild === void 0) {
      delete linkProps.disabled;
    }
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(
      _asChild ? _asChild : "a",
      {
        ...linkProps,
        ref: innerRef
      },
      children
    );
  }
);
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
const linkOptions = (options) => {
  return options;
};

//# sourceMappingURL=link.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/matchContext.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dummyMatchContext: () => (/* binding */ dummyMatchContext),
/* harmony export */   matchContext: () => (/* binding */ matchContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const matchContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
const dummyMatchContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);

//# sourceMappingURL=matchContext.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/not-found.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/not-found.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatchNotFound: () => (/* binding */ CatchNotFound),
/* harmony export */   DefaultGlobalNotFound: () => (/* binding */ DefaultGlobalNotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/not-found.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");




function CatchNotFound(props) {
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_1__.useRouterState)({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_2__.CatchBoundary,
    {
      getResetKey: () => resetKey,
      onCatch: (error, errorInfo) => {
        var _a;
        if ((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__.isNotFound)(error)) {
          (_a = props.onCatch) == null ? void 0 : _a.call(props, error, errorInfo);
        } else {
          throw error;
        }
      },
      errorComponent: ({ error }) => {
        var _a;
        if ((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__.isNotFound)(error)) {
          return (_a = props.fallback) == null ? void 0 : _a.call(props, error);
        } else {
          throw error;
        }
      },
      children: props.children
    }
  );
}
function DefaultGlobalNotFound() {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: "Not Found" });
}

//# sourceMappingURL=not-found.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderRouteNotFound: () => (/* binding */ renderRouteNotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");



function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultNotFoundComponent, { data });
    }
    if (true) {
      (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(
        route.options.notFoundComponent,
        `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<div>Not Found<div>)`
      );
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_not_found_js__WEBPACK_IMPORTED_MODULE_2__.DefaultGlobalNotFound, {});
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(route.options.notFoundComponent, { data });
}

//# sourceMappingURL=renderRouteNotFound.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/route.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/route.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotFoundRoute: () => (/* binding */ NotFoundRoute),
/* harmony export */   RootRoute: () => (/* binding */ RootRoute),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   RouteApi: () => (/* binding */ RouteApi),
/* harmony export */   createRootRoute: () => (/* binding */ createRootRoute),
/* harmony export */   createRootRouteWithContext: () => (/* binding */ createRootRouteWithContext),
/* harmony export */   createRoute: () => (/* binding */ createRoute),
/* harmony export */   createRouteMask: () => (/* binding */ createRouteMask),
/* harmony export */   getRouteApi: () => (/* binding */ getRouteApi),
/* harmony export */   rootRouteWithContext: () => (/* binding */ rootRouteWithContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/route.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/not-found.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useLoaderData_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useLoaderData.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js");
/* harmony import */ var _useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useLoaderDeps.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js");
/* harmony import */ var _useParams_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useParams.js */ "./node_modules/@tanstack/react-router/dist/esm/useParams.js");
/* harmony import */ var _useSearch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useSearch.js */ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js");
/* harmony import */ var _useNavigate_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useNavigate.js */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./link.js */ "./node_modules/@tanstack/react-router/dist/esm/link.js");











function getRouteApi(id) {
  return new RouteApi({ id });
}
class RouteApi extends _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.BaseRouteApi {
  /**
   * @deprecated Use the `getRouteApi` function instead.
   */
  constructor({ id }) {
    super({ id });
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_3__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_3__.useMatch)({
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_4__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_5__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_6__.useLoaderDeps)({ ...opts, from: this.id, strict: false });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_7__.useLoaderData)({ ...opts, from: this.id, strict: false });
    };
    this.useNavigate = () => {
      const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_9__.useNavigate)({ from: router.routesById[this.id].fullPath });
    };
    this.notFound = (opts) => {
      return (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.notFound)({ routeId: this.id, ...opts });
    };
    this.Link = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((props, ref) => {
      const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
      const fullPath = router.routesById[this.id].fullPath;
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_link_js__WEBPACK_IMPORTED_MODULE_11__.Link, { ref, from: fullPath, ...props });
    });
  }
}
class Route extends _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.BaseRoute {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_3__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_3__.useMatch)({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_4__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_5__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_6__.useLoaderDeps)({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_7__.useLoaderData)({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_9__.useNavigate)({ from: this.fullPath });
    };
    this.Link = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_link_js__WEBPACK_IMPORTED_MODULE_11__.Link, { ref, from: this.fullPath, ...props });
      }
    );
    this.$$typeof = Symbol.for("react.memo");
  }
}
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
const rootRouteWithContext = createRootRouteWithContext;
class RootRoute extends _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.BaseRootRoute {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_3__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_3__.useMatch)({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_4__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_5__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_6__.useLoaderDeps)({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_7__.useLoaderData)({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_9__.useNavigate)({ from: this.fullPath });
    };
    this.Link = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(
      (props, ref) => {
        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_link_js__WEBPACK_IMPORTED_MODULE_11__.Link, { ref, from: this.fullPath, ...props });
      }
    );
    this.$$typeof = Symbol.for("react.memo");
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createRouteMask(opts) {
  return opts;
}
class NotFoundRoute extends Route {
  constructor(options) {
    super({
      ...options,
      id: "404"
    });
  }
}

//# sourceMappingURL=route.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/router.js":
/*!****************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/router.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   createRouter: () => (/* binding */ createRouter)
/* harmony export */ });
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _fileRoute_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileRoute.js */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");


const createRouter = (options) => {
  return new Router(options);
};
class Router extends _tanstack_router_core__WEBPACK_IMPORTED_MODULE_0__.RouterCore {
  constructor(options) {
    super(options);
  }
}
if (typeof globalThis !== "undefined") {
  globalThis.createFileRoute = _fileRoute_js__WEBPACK_IMPORTED_MODULE_1__.createFileRoute;
  globalThis.createLazyFileRoute = _fileRoute_js__WEBPACK_IMPORTED_MODULE_1__.createLazyFileRoute;
} else if (typeof window !== "undefined") {
  window.createFileRoute = _fileRoute_js__WEBPACK_IMPORTED_MODULE_1__.createFileRoute;
  window.createFileRoute = _fileRoute_js__WEBPACK_IMPORTED_MODULE_1__.createLazyFileRoute;
}

//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/routerContext.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRouterContext: () => (/* binding */ getRouterContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const routerContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}

//# sourceMappingURL=routerContext.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _ScriptOnce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScriptOnce.js */ "./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js");




function ScrollRestoration() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const getKey = router.options.getScrollRestorationKey || _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.defaultGetScrollRestorationKey;
  const userKey = getKey(router.latestLocation);
  const resolvedKey = userKey !== (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.defaultGetScrollRestorationKey)(router.latestLocation) ? userKey : void 0;
  if (!router.isScrollRestoring || !router.isServer) {
    return null;
  }
  const restoreScrollOptions = {
    storageKey: _tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.storageKey,
    shouldScrollRestoration: true
  };
  if (resolvedKey) {
    restoreScrollOptions.key = resolvedKey;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _ScriptOnce_js__WEBPACK_IMPORTED_MODULE_3__.ScriptOnce,
    {
      children: `(${_tanstack_router_core__WEBPACK_IMPORTED_MODULE_2__.restoreScroll.toString()})(${JSON.stringify(restoreScrollOptions)})`
    }
  );
}

//# sourceMappingURL=scroll-restoration.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useLoaderData(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}

//# sourceMappingURL=useLoaderData.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoaderDeps: () => (/* binding */ useLoaderDeps)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}

//# sourceMappingURL=useLoaderDeps.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useMatch.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMatch: () => (/* binding */ useMatch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");




function useMatch(opts) {
  const nearestMatchId = react__WEBPACK_IMPORTED_MODULE_0__.useContext(
    opts.from ? _matchContext_js__WEBPACK_IMPORTED_MODULE_2__.dummyMatchContext : _matchContext_js__WEBPACK_IMPORTED_MODULE_2__.matchContext
  );
  const matchSelection = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_3__.useRouterState)({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_1__["default"])(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}

//# sourceMappingURL=useMatch.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useNavigate.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");



function useNavigate(_defaultOpts) {
  const { navigate, state } = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const matchIndex = (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
    strict: false,
    select: (match) => match.index
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (options) => {
      const from = options.from ?? (_defaultOpts == null ? void 0 : _defaultOpts.from) ?? state.matches[matchIndex].fullPath;
      return navigate({
        ...options,
        from
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_defaultOpts == null ? void 0 : _defaultOpts.from, navigate]
  );
}
function Navigate(props) {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const navigate = useNavigate();
  const previousPropsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (previousPropsRef.current !== props) {
      navigate(props);
      previousPropsRef.current = props;
    }
  }, [router, props, navigate]);
  return null;
}

//# sourceMappingURL=useNavigate.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useParams.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useParams.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useParams: () => (/* binding */ useParams)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useParams(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}

//# sourceMappingURL=useParams.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useRouter.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRouter: () => (/* binding */ useRouter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _routerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routerContext.js */ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js");



function useRouter(opts) {
  const value = react__WEBPACK_IMPORTED_MODULE_0__.useContext((0,_routerContext_js__WEBPACK_IMPORTED_MODULE_1__.getRouterContext)());
  (0,tiny_warning__WEBPACK_IMPORTED_MODULE_2__["default"])(
    !(((opts == null ? void 0 : opts.warn) ?? true) && !value),
    "useRouter must be used inside a <RouterProvider> component!"
  );
  return value;
}

//# sourceMappingURL=useRouter.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useRouterState.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRouterState: () => (/* binding */ useRouterState)
/* harmony export */ });
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/react-store/dist/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");




function useRouterState(opts) {
  const contextRouter = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  const router = (opts == null ? void 0 : opts.router) || contextRouter;
  const previousResult = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);
  return (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(router.__store, (state) => {
    if (opts == null ? void 0 : opts.select) {
      if (opts.structuralSharing ?? router.options.defaultStructuralSharing) {
        const newSlice = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__.replaceEqualDeep)(
          previousResult.current,
          opts.select(state)
        );
        previousResult.current = newSlice;
        return newSlice;
      }
      return opts.select(state);
    }
    return state;
  });
}

//# sourceMappingURL=useRouterState.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useSearch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSearch: () => (/* binding */ useSearch)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useSearch(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

//# sourceMappingURL=useSearch.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/utils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useForwardedRef: () => (/* binding */ useForwardedRef),
/* harmony export */   useIntersectionObserver: () => (/* binding */ useIntersectionObserver),
/* harmony export */   useLayoutEffect: () => (/* binding */ useLayoutEffect),
/* harmony export */   usePrevious: () => (/* binding */ usePrevious),
/* harmony export */   useStableCallback: () => (/* binding */ useStableCallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

function useStableCallback(fn) {
  const fnRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(fn);
  fnRef.current = fn;
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef((...args) => fnRef.current(...args));
  return ref.current;
}
const useLayoutEffect = typeof window !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function usePrevious(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
    value,
    prev: null
  });
  const current = ref.current.value;
  if (value !== current) {
    ref.current = {
      value,
      prev: current
    };
  }
  return ref.current.prev;
}
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!ref.current || options.disabled || typeof IntersectionObserver !== "function") {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, intersectionObserverOptions);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [callback, intersectionObserverOptions, options.disabled, ref]);
}
function useForwardedRef(ref) {
  const innerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle(ref, () => innerRef.current, []);
  return innerRef;
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-store/dist/esm/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/react-store/dist/esm/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Derived),
/* harmony export */   Effect: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Effect),
/* harmony export */   Store: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Store),
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore),
/* harmony export */   __flush: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__flush),
/* harmony export */   __storeToDerived: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived),
/* harmony export */   batch: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.batch),
/* harmony export */   shallow: () => (/* binding */ shallow),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "./node_modules/use-sync-external-store/shim/with-selector.js");
/* harmony import */ var _tanstack_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/store */ "./node_modules/@tanstack/store/dist/esm/index.js");


function useStore(store, selector = (d) => d) {
  const slice = (0,use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStoreWithSelector)(
    store.subscribe,
    () => store.state,
    () => store.state,
    selector,
    shallow
  );
  return slice;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [k, v] of objA) {
      if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const v of objA) {
      if (!objB.has(v)) return false;
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/link.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/link.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   preloadWarning: () => (/* binding */ preloadWarning)
/* harmony export */ });
const preloadWarning = "Error preloading route! ☝️";

//# sourceMappingURL=link.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/lru-cache.js":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/lru-cache.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLRUCache: () => (/* binding */ createLRUCache)
/* harmony export */ });
function createLRUCache(max) {
  const cache = /* @__PURE__ */ new Map();
  let oldest;
  let newest;
  const touch = (entry) => {
    if (!entry.next) return;
    if (!entry.prev) {
      entry.next.prev = void 0;
      oldest = entry.next;
      entry.next = void 0;
      if (newest) {
        entry.prev = newest;
        newest.next = entry;
      }
    } else {
      entry.prev.next = entry.next;
      entry.next.prev = entry.prev;
      entry.next = void 0;
      if (newest) {
        newest.next = entry;
        entry.prev = newest;
      }
    }
    newest = entry;
  };
  return {
    get(key) {
      const entry = cache.get(key);
      if (!entry) return void 0;
      touch(entry);
      return entry.value;
    },
    set(key, value) {
      if (cache.size >= max && oldest) {
        const toDelete = oldest;
        cache.delete(toDelete.key);
        if (toDelete.next) {
          oldest = toDelete.next;
          toDelete.next.prev = void 0;
        }
        if (toDelete === newest) {
          newest = void 0;
        }
      }
      const existing = cache.get(key);
      if (existing) {
        existing.value = value;
        touch(existing);
      } else {
        const entry = { key, value, prev: newest };
        if (newest) newest.next = entry;
        newest = entry;
        if (!oldest) oldest = entry;
        cache.set(key, entry);
      }
    }
  };
}

//# sourceMappingURL=lru-cache.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/not-found.js":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/not-found.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNotFound: () => (/* binding */ isNotFound),
/* harmony export */   notFound: () => (/* binding */ notFound)
/* harmony export */ });
function notFound(options = {}) {
  options.isNotFound = true;
  if (options.throw) throw options;
  return options;
}
function isNotFound(obj) {
  return !!(obj == null ? void 0 : obj.isNotFound);
}

//# sourceMappingURL=not-found.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/path.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/path.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEGMENT_TYPE_OPTIONAL_PARAM: () => (/* binding */ SEGMENT_TYPE_OPTIONAL_PARAM),
/* harmony export */   SEGMENT_TYPE_PARAM: () => (/* binding */ SEGMENT_TYPE_PARAM),
/* harmony export */   SEGMENT_TYPE_PATHNAME: () => (/* binding */ SEGMENT_TYPE_PATHNAME),
/* harmony export */   SEGMENT_TYPE_WILDCARD: () => (/* binding */ SEGMENT_TYPE_WILDCARD),
/* harmony export */   cleanPath: () => (/* binding */ cleanPath),
/* harmony export */   exactPathTest: () => (/* binding */ exactPathTest),
/* harmony export */   interpolatePath: () => (/* binding */ interpolatePath),
/* harmony export */   joinPaths: () => (/* binding */ joinPaths),
/* harmony export */   matchByPath: () => (/* binding */ matchByPath),
/* harmony export */   matchPathname: () => (/* binding */ matchPathname),
/* harmony export */   parsePathname: () => (/* binding */ parsePathname),
/* harmony export */   removeBasepath: () => (/* binding */ removeBasepath),
/* harmony export */   removeTrailingSlash: () => (/* binding */ removeTrailingSlash),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   trimPath: () => (/* binding */ trimPath),
/* harmony export */   trimPathLeft: () => (/* binding */ trimPathLeft),
/* harmony export */   trimPathRight: () => (/* binding */ trimPathRight)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");

const SEGMENT_TYPE_PATHNAME = 0;
const SEGMENT_TYPE_PARAM = 1;
const SEGMENT_TYPE_WILDCARD = 2;
const SEGMENT_TYPE_OPTIONAL_PARAM = 3;
function joinPaths(paths) {
  return cleanPath(
    paths.filter((val) => {
      return val !== void 0;
    }).join("/")
  );
}
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight(path) {
  return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function trimPath(path) {
  return trimPathRight(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
  if ((value == null ? void 0 : value.endsWith("/")) && value !== "/" && value !== `${basepath}/`) {
    return value.slice(0, -1);
  }
  return value;
}
function exactPathTest(pathName1, pathName2, basepath) {
  return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
function segmentToString(segment) {
  const { type, value } = segment;
  if (type === SEGMENT_TYPE_PATHNAME) {
    return value;
  }
  const { prefixSegment, suffixSegment } = segment;
  if (type === SEGMENT_TYPE_PARAM) {
    const param = value.substring(1);
    if (prefixSegment && suffixSegment) {
      return `${prefixSegment}{$${param}}${suffixSegment}`;
    } else if (prefixSegment) {
      return `${prefixSegment}{$${param}}`;
    } else if (suffixSegment) {
      return `{$${param}}${suffixSegment}`;
    }
  }
  if (type === SEGMENT_TYPE_OPTIONAL_PARAM) {
    const param = value.substring(1);
    if (prefixSegment && suffixSegment) {
      return `${prefixSegment}{-$${param}}${suffixSegment}`;
    } else if (prefixSegment) {
      return `${prefixSegment}{-$${param}}`;
    } else if (suffixSegment) {
      return `{-$${param}}${suffixSegment}`;
    }
    return `{-$${param}}`;
  }
  if (type === SEGMENT_TYPE_WILDCARD) {
    if (prefixSegment && suffixSegment) {
      return `${prefixSegment}{$}${suffixSegment}`;
    } else if (prefixSegment) {
      return `${prefixSegment}{$}`;
    } else if (suffixSegment) {
      return `{$}${suffixSegment}`;
    }
  }
  return value;
}
function resolvePath({
  basepath,
  base,
  to,
  trailingSlash = "never",
  caseSensitive,
  parseCache
}) {
  var _a;
  base = removeBasepath(basepath, base, caseSensitive);
  to = removeBasepath(basepath, to, caseSensitive);
  let baseSegments = parsePathname(base, parseCache).slice();
  const toSegments = parsePathname(to, parseCache);
  if (baseSegments.length > 1 && ((_a = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.last)(baseSegments)) == null ? void 0 : _a.value) === "/") {
    baseSegments.pop();
  }
  for (let index = 0, length = toSegments.length; index < length; index++) {
    const toSegment = toSegments[index];
    const value = toSegment.value;
    if (value === "/") {
      if (!index) {
        baseSegments = [toSegment];
      } else if (index === length - 1) {
        baseSegments.push(toSegment);
      } else ;
    } else if (value === "..") {
      baseSegments.pop();
    } else if (value === ".") ;
    else {
      baseSegments.push(toSegment);
    }
  }
  if (baseSegments.length > 1) {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.last)(baseSegments).value === "/") {
      if (trailingSlash === "never") {
        baseSegments.pop();
      }
    } else if (trailingSlash === "always") {
      baseSegments.push({ type: SEGMENT_TYPE_PATHNAME, value: "/" });
    }
  }
  const segmentValues = baseSegments.map(segmentToString);
  const joined = joinPaths([basepath, ...segmentValues]);
  return joined;
}
const parsePathname = (pathname, cache) => {
  if (!pathname) return [];
  const cached = cache == null ? void 0 : cache.get(pathname);
  if (cached) return cached;
  const parsed = baseParsePathname(pathname);
  cache == null ? void 0 : cache.set(pathname, parsed);
  return parsed;
};
const PARAM_RE = /^\$.{1,}$/;
const PARAM_W_CURLY_BRACES_RE = /^(.*?)\{(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/;
const OPTIONAL_PARAM_W_CURLY_BRACES_RE = /^(.*?)\{-(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/;
const WILDCARD_RE = /^\$$/;
const WILDCARD_W_CURLY_BRACES_RE = /^(.*?)\{\$\}(.*)$/;
function baseParsePathname(pathname) {
  pathname = cleanPath(pathname);
  const segments = [];
  if (pathname.slice(0, 1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: SEGMENT_TYPE_PATHNAME,
      value: "/"
    });
  }
  if (!pathname) {
    return segments;
  }
  const split = pathname.split("/").filter(Boolean);
  segments.push(
    ...split.map((part) => {
      const wildcardBracesMatch = part.match(WILDCARD_W_CURLY_BRACES_RE);
      if (wildcardBracesMatch) {
        const prefix = wildcardBracesMatch[1];
        const suffix = wildcardBracesMatch[2];
        return {
          type: SEGMENT_TYPE_WILDCARD,
          value: "$",
          prefixSegment: prefix || void 0,
          suffixSegment: suffix || void 0
        };
      }
      const optionalParamBracesMatch = part.match(
        OPTIONAL_PARAM_W_CURLY_BRACES_RE
      );
      if (optionalParamBracesMatch) {
        const prefix = optionalParamBracesMatch[1];
        const paramName = optionalParamBracesMatch[2];
        const suffix = optionalParamBracesMatch[3];
        return {
          type: SEGMENT_TYPE_OPTIONAL_PARAM,
          value: paramName,
          // Now just $paramName (no prefix)
          prefixSegment: prefix || void 0,
          suffixSegment: suffix || void 0
        };
      }
      const paramBracesMatch = part.match(PARAM_W_CURLY_BRACES_RE);
      if (paramBracesMatch) {
        const prefix = paramBracesMatch[1];
        const paramName = paramBracesMatch[2];
        const suffix = paramBracesMatch[3];
        return {
          type: SEGMENT_TYPE_PARAM,
          value: "" + paramName,
          prefixSegment: prefix || void 0,
          suffixSegment: suffix || void 0
        };
      }
      if (PARAM_RE.test(part)) {
        const paramName = part.substring(1);
        return {
          type: SEGMENT_TYPE_PARAM,
          value: "$" + paramName,
          prefixSegment: void 0,
          suffixSegment: void 0
        };
      }
      if (WILDCARD_RE.test(part)) {
        return {
          type: SEGMENT_TYPE_WILDCARD,
          value: "$",
          prefixSegment: void 0,
          suffixSegment: void 0
        };
      }
      return {
        type: SEGMENT_TYPE_PATHNAME,
        value: part.includes("%25") ? part.split("%25").map((segment) => decodeURI(segment)).join("%25") : decodeURI(part)
      };
    })
  );
  if (pathname.slice(-1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: SEGMENT_TYPE_PATHNAME,
      value: "/"
    });
  }
  return segments;
}
function interpolatePath({
  path,
  params,
  leaveWildcards,
  leaveParams,
  decodeCharMap,
  parseCache
}) {
  const interpolatedPathSegments = parsePathname(path, parseCache);
  function encodeParam(key) {
    const value = params[key];
    const isValueString = typeof value === "string";
    if (key === "*" || key === "_splat") {
      return isValueString ? encodeURI(value) : value;
    } else {
      return isValueString ? encodePathParam(value, decodeCharMap) : value;
    }
  }
  let isMissingParams = false;
  const usedParams = {};
  const interpolatedPath = joinPaths(
    interpolatedPathSegments.map((segment) => {
      if (segment.type === SEGMENT_TYPE_PATHNAME) {
        return segment.value;
      }
      if (segment.type === SEGMENT_TYPE_WILDCARD) {
        usedParams._splat = params._splat;
        const segmentPrefix = segment.prefixSegment || "";
        const segmentSuffix = segment.suffixSegment || "";
        if (!("_splat" in params)) {
          isMissingParams = true;
          if (leaveWildcards) {
            return `${segmentPrefix}${segment.value}${segmentSuffix}`;
          }
          if (segmentPrefix || segmentSuffix) {
            return `${segmentPrefix}${segmentSuffix}`;
          }
          return void 0;
        }
        const value = encodeParam("_splat");
        if (leaveWildcards) {
          return `${segmentPrefix}${segment.value}${value ?? ""}${segmentSuffix}`;
        }
        return `${segmentPrefix}${value}${segmentSuffix}`;
      }
      if (segment.type === SEGMENT_TYPE_PARAM) {
        const key = segment.value.substring(1);
        if (!isMissingParams && !(key in params)) {
          isMissingParams = true;
        }
        usedParams[key] = params[key];
        const segmentPrefix = segment.prefixSegment || "";
        const segmentSuffix = segment.suffixSegment || "";
        if (leaveParams) {
          const value = encodeParam(segment.value);
          return `${segmentPrefix}${segment.value}${value ?? ""}${segmentSuffix}`;
        }
        return `${segmentPrefix}${encodeParam(key) ?? "undefined"}${segmentSuffix}`;
      }
      if (segment.type === SEGMENT_TYPE_OPTIONAL_PARAM) {
        const key = segment.value.substring(1);
        const segmentPrefix = segment.prefixSegment || "";
        const segmentSuffix = segment.suffixSegment || "";
        if (!(key in params) || params[key] == null) {
          if (leaveWildcards) {
            return `${segmentPrefix}${key}${segmentSuffix}`;
          }
          if (segmentPrefix || segmentSuffix) {
            return `${segmentPrefix}${segmentSuffix}`;
          }
          return void 0;
        }
        usedParams[key] = params[key];
        if (leaveParams) {
          const value = encodeParam(segment.value);
          return `${segmentPrefix}${segment.value}${value ?? ""}${segmentSuffix}`;
        }
        if (leaveWildcards) {
          return `${segmentPrefix}${key}${encodeParam(key) ?? ""}${segmentSuffix}`;
        }
        return `${segmentPrefix}${encodeParam(key) ?? ""}${segmentSuffix}`;
      }
      return segment.value;
    })
  );
  return { usedParams, interpolatedPath, isMissingParams };
}
function encodePathParam(value, decodeCharMap) {
  let encoded = encodeURIComponent(value);
  if (decodeCharMap) {
    for (const [encodedChar, char] of decodeCharMap) {
      encoded = encoded.replaceAll(encodedChar, char);
    }
  }
  return encoded;
}
function matchPathname(basepath, currentPathname, matchLocation, parseCache) {
  const pathParams = matchByPath(
    basepath,
    currentPathname,
    matchLocation,
    parseCache
  );
  if (matchLocation.to && !pathParams) {
    return;
  }
  return pathParams ?? {};
}
function removeBasepath(basepath, pathname, caseSensitive = false) {
  const normalizedBasepath = caseSensitive ? basepath : basepath.toLowerCase();
  const normalizedPathname = caseSensitive ? pathname : pathname.toLowerCase();
  switch (true) {
    // default behaviour is to serve app from the root - pathname
    // left untouched
    case normalizedBasepath === "/":
      return pathname;
    // shortcut for removing the basepath if it matches the pathname
    case normalizedPathname === normalizedBasepath:
      return "";
    // in case pathname is shorter than basepath - there is
    // nothing to remove
    case pathname.length < basepath.length:
      return pathname;
    // avoid matching partial segments - strict equality handled
    // earlier, otherwise, basepath separated from pathname with
    // separator, therefore lack of separator means partial
    // segment match (`/app` should not match `/application`)
    case normalizedPathname[normalizedBasepath.length] !== "/":
      return pathname;
    // remove the basepath from the pathname if it starts with it
    case normalizedPathname.startsWith(normalizedBasepath):
      return pathname.slice(basepath.length);
    // otherwise, return the pathname as is
    default:
      return pathname;
  }
}
function matchByPath(basepath, from, {
  to,
  fuzzy,
  caseSensitive
}, parseCache) {
  if (basepath !== "/" && !from.startsWith(basepath)) {
    return void 0;
  }
  from = removeBasepath(basepath, from, caseSensitive);
  to = removeBasepath(basepath, `${to ?? "$"}`, caseSensitive);
  const baseSegments = parsePathname(
    from.startsWith("/") ? from : `/${from}`,
    parseCache
  );
  const routeSegments = parsePathname(
    to.startsWith("/") ? to : `/${to}`,
    parseCache
  );
  const params = {};
  const result = isMatch(
    baseSegments,
    routeSegments,
    params,
    fuzzy,
    caseSensitive
  );
  return result ? params : void 0;
}
function isMatch(baseSegments, routeSegments, params, fuzzy, caseSensitive) {
  var _a, _b, _c;
  let baseIndex = 0;
  let routeIndex = 0;
  while (baseIndex < baseSegments.length || routeIndex < routeSegments.length) {
    const baseSegment = baseSegments[baseIndex];
    const routeSegment = routeSegments[routeIndex];
    if (routeSegment) {
      if (routeSegment.type === SEGMENT_TYPE_WILDCARD) {
        const remainingBaseSegments = baseSegments.slice(baseIndex);
        let _splat;
        if (routeSegment.prefixSegment || routeSegment.suffixSegment) {
          if (!baseSegment) return false;
          const prefix = routeSegment.prefixSegment || "";
          const suffix = routeSegment.suffixSegment || "";
          const baseValue = baseSegment.value;
          if ("prefixSegment" in routeSegment) {
            if (!baseValue.startsWith(prefix)) {
              return false;
            }
          }
          if ("suffixSegment" in routeSegment) {
            if (!((_a = baseSegments[baseSegments.length - 1]) == null ? void 0 : _a.value.endsWith(suffix))) {
              return false;
            }
          }
          let rejoinedSplat = decodeURI(
            joinPaths(remainingBaseSegments.map((d) => d.value))
          );
          if (prefix && rejoinedSplat.startsWith(prefix)) {
            rejoinedSplat = rejoinedSplat.slice(prefix.length);
          }
          if (suffix && rejoinedSplat.endsWith(suffix)) {
            rejoinedSplat = rejoinedSplat.slice(
              0,
              rejoinedSplat.length - suffix.length
            );
          }
          _splat = rejoinedSplat;
        } else {
          _splat = decodeURI(
            joinPaths(remainingBaseSegments.map((d) => d.value))
          );
        }
        params["*"] = _splat;
        params["_splat"] = _splat;
        return true;
      }
      if (routeSegment.type === SEGMENT_TYPE_PATHNAME) {
        if (routeSegment.value === "/" && !(baseSegment == null ? void 0 : baseSegment.value)) {
          routeIndex++;
          continue;
        }
        if (baseSegment) {
          if (caseSensitive) {
            if (routeSegment.value !== baseSegment.value) {
              return false;
            }
          } else if (routeSegment.value.toLowerCase() !== baseSegment.value.toLowerCase()) {
            return false;
          }
          baseIndex++;
          routeIndex++;
          continue;
        } else {
          return false;
        }
      }
      if (routeSegment.type === SEGMENT_TYPE_PARAM) {
        if (!baseSegment) {
          return false;
        }
        if (baseSegment.value === "/") {
          return false;
        }
        let _paramValue = "";
        let matched = false;
        if (routeSegment.prefixSegment || routeSegment.suffixSegment) {
          const prefix = routeSegment.prefixSegment || "";
          const suffix = routeSegment.suffixSegment || "";
          const baseValue = baseSegment.value;
          if (prefix && !baseValue.startsWith(prefix)) {
            return false;
          }
          if (suffix && !baseValue.endsWith(suffix)) {
            return false;
          }
          let paramValue = baseValue;
          if (prefix && paramValue.startsWith(prefix)) {
            paramValue = paramValue.slice(prefix.length);
          }
          if (suffix && paramValue.endsWith(suffix)) {
            paramValue = paramValue.slice(0, paramValue.length - suffix.length);
          }
          _paramValue = decodeURIComponent(paramValue);
          matched = true;
        } else {
          _paramValue = decodeURIComponent(baseSegment.value);
          matched = true;
        }
        if (matched) {
          params[routeSegment.value.substring(1)] = _paramValue;
          baseIndex++;
        }
        routeIndex++;
        continue;
      }
      if (routeSegment.type === SEGMENT_TYPE_OPTIONAL_PARAM) {
        if (!baseSegment) {
          routeIndex++;
          continue;
        }
        if (baseSegment.value === "/") {
          routeIndex++;
          continue;
        }
        let _paramValue = "";
        let matched = false;
        if (routeSegment.prefixSegment || routeSegment.suffixSegment) {
          const prefix = routeSegment.prefixSegment || "";
          const suffix = routeSegment.suffixSegment || "";
          const baseValue = baseSegment.value;
          if ((!prefix || baseValue.startsWith(prefix)) && (!suffix || baseValue.endsWith(suffix))) {
            let paramValue = baseValue;
            if (prefix && paramValue.startsWith(prefix)) {
              paramValue = paramValue.slice(prefix.length);
            }
            if (suffix && paramValue.endsWith(suffix)) {
              paramValue = paramValue.slice(
                0,
                paramValue.length - suffix.length
              );
            }
            _paramValue = decodeURIComponent(paramValue);
            matched = true;
          }
        } else {
          let shouldMatchOptional = true;
          for (let lookAhead = routeIndex + 1; lookAhead < routeSegments.length; lookAhead++) {
            const futureRouteSegment = routeSegments[lookAhead];
            if ((futureRouteSegment == null ? void 0 : futureRouteSegment.type) === SEGMENT_TYPE_PATHNAME && futureRouteSegment.value === baseSegment.value) {
              shouldMatchOptional = false;
              break;
            }
            if ((futureRouteSegment == null ? void 0 : futureRouteSegment.type) === SEGMENT_TYPE_PARAM || (futureRouteSegment == null ? void 0 : futureRouteSegment.type) === SEGMENT_TYPE_WILDCARD) {
              if (baseSegments.length < routeSegments.length) {
                shouldMatchOptional = false;
              }
              break;
            }
          }
          if (shouldMatchOptional) {
            _paramValue = decodeURIComponent(baseSegment.value);
            matched = true;
          }
        }
        if (matched) {
          params[routeSegment.value.substring(1)] = _paramValue;
          baseIndex++;
        }
        routeIndex++;
        continue;
      }
    }
    if (baseIndex < baseSegments.length && routeIndex >= routeSegments.length) {
      params["**"] = joinPaths(
        baseSegments.slice(baseIndex).map((d) => d.value)
      );
      return !!fuzzy && ((_b = routeSegments[routeSegments.length - 1]) == null ? void 0 : _b.value) !== "/";
    }
    if (routeIndex < routeSegments.length && baseIndex >= baseSegments.length) {
      for (let i = routeIndex; i < routeSegments.length; i++) {
        if (((_c = routeSegments[i]) == null ? void 0 : _c.type) !== SEGMENT_TYPE_OPTIONAL_PARAM) {
          return false;
        }
      }
      break;
    }
    break;
  }
  return true;
}

//# sourceMappingURL=path.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/qss.js":
/*!************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/qss.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
function encode(obj, pfx) {
  const normalizedObject = Object.entries(obj).flatMap(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((v) => [key, String(v)]);
    } else {
      return [[key, String(value)]];
    }
  });
  const searchParams = new URLSearchParams(normalizedObject);
  return (pfx || "") + searchParams.toString();
}
function toValue(str) {
  if (!str) return "";
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str, pfx) {
  const searchParamsPart = pfx ? str.slice(pfx.length) : str;
  const searchParams = new URLSearchParams(searchParamsPart);
  const entries = [...searchParams.entries()];
  return entries.reduce((acc, [key, value]) => {
    const previousValue = acc[key];
    if (previousValue == null) {
      acc[key] = toValue(value);
    } else {
      acc[key] = Array.isArray(previousValue) ? [...previousValue, toValue(value)] : [previousValue, toValue(value)];
    }
    return acc;
  }, {});
}

//# sourceMappingURL=qss.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/redirect.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/redirect.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isRedirect: () => (/* binding */ isRedirect),
/* harmony export */   isResolvedRedirect: () => (/* binding */ isResolvedRedirect),
/* harmony export */   parseRedirect: () => (/* binding */ parseRedirect),
/* harmony export */   redirect: () => (/* binding */ redirect)
/* harmony export */ });
function redirect(opts) {
  opts.statusCode = opts.statusCode || opts.code || 307;
  if (!opts.reloadDocument) {
    try {
      new URL(`${opts.href}`);
      opts.reloadDocument = true;
    } catch {
    }
  }
  const headers = new Headers(opts.headers || {});
  if (opts.href && headers.get("Location") === null) {
    headers.set("Location", opts.href);
  }
  const response = new Response(null, {
    status: opts.statusCode,
    headers
  });
  response.options = opts;
  if (opts.throw) {
    throw response;
  }
  return response;
}
function isRedirect(obj) {
  return obj instanceof Response && !!obj.options;
}
function isResolvedRedirect(obj) {
  return isRedirect(obj) && !!obj.options.href;
}
function parseRedirect(obj) {
  if (typeof obj === "object" && obj.isSerializedRedirect) {
    return redirect(obj);
  }
  return void 0;
}

//# sourceMappingURL=redirect.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/root.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/root.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rootRouteId: () => (/* binding */ rootRouteId)
/* harmony export */ });
const rootRouteId = "__root__";

//# sourceMappingURL=root.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/route.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/route.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseRootRoute: () => (/* binding */ BaseRootRoute),
/* harmony export */   BaseRoute: () => (/* binding */ BaseRoute),
/* harmony export */   BaseRouteApi: () => (/* binding */ BaseRouteApi)
/* harmony export */ });
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.js */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/router-core/dist/esm/not-found.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root.js */ "./node_modules/@tanstack/router-core/dist/esm/root.js");




class BaseRoute {
  constructor(options) {
    this.init = (opts) => {
      var _a, _b;
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !(options2 == null ? void 0 : options2.path) && !(options2 == null ? void 0 : options2.id);
      this.parentRoute = (_b = (_a = this.options).getParentRoute) == null ? void 0 : _b.call(_a);
      if (isRoot) {
        this._path = _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId;
      } else if (!this.parentRoute) {
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          false,
          `Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`
        );
      }
      let path = isRoot ? _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId : options2 == null ? void 0 : options2.path;
      if (path && path !== "/") {
        path = (0,_path_js__WEBPACK_IMPORTED_MODULE_2__.trimPathLeft)(path);
      }
      const customId = (options2 == null ? void 0 : options2.id) || path;
      let id = isRoot ? _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId : (0,_path_js__WEBPACK_IMPORTED_MODULE_2__.joinPaths)([
        this.parentRoute.id === _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId) {
        path = "/";
      }
      if (id !== _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId) {
        id = (0,_path_js__WEBPACK_IMPORTED_MODULE_2__.joinPaths)(["/", id]);
      }
      const fullPath = id === _root_js__WEBPACK_IMPORTED_MODULE_1__.rootRouteId ? "/" : (0,_path_js__WEBPACK_IMPORTED_MODULE_2__.joinPaths)([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = fullPath;
    };
    this.clone = (other) => {
      this._path = other._path;
      this._id = other._id;
      this._fullPath = other._fullPath;
      this._to = other._to;
      this.options.getParentRoute = other.options.getParentRoute;
      this.children = other.children;
    };
    this.addChildren = (children) => {
      return this._addFileChildren(children);
    };
    this._addFileChildren = (children) => {
      if (Array.isArray(children)) {
        this.children = children;
      }
      if (typeof children === "object" && children !== null) {
        this.children = Object.values(children);
      }
      return this;
    };
    this._addFileTypes = () => {
      return this;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.options = options || {};
    this.isRoot = !(options == null ? void 0 : options.getParentRoute);
    if ((options == null ? void 0 : options.id) && (options == null ? void 0 : options.path)) {
      throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
    }
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class BaseRouteApi {
  constructor({ id }) {
    this.notFound = (opts) => {
      return (0,_not_found_js__WEBPACK_IMPORTED_MODULE_3__.notFound)({ routeId: this.id, ...opts });
    };
    this.id = id;
  }
}
class BaseRootRoute extends BaseRoute {
  constructor(options) {
    super(options);
  }
}

//# sourceMappingURL=route.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/router.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/router.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathParamError: () => (/* binding */ PathParamError),
/* harmony export */   RouterCore: () => (/* binding */ RouterCore),
/* harmony export */   SearchParamError: () => (/* binding */ SearchParamError),
/* harmony export */   componentTypes: () => (/* binding */ componentTypes),
/* harmony export */   defaultSerializeError: () => (/* binding */ defaultSerializeError),
/* harmony export */   getInitialRouterState: () => (/* binding */ getInitialRouterState),
/* harmony export */   getLocationChangeInfo: () => (/* binding */ getLocationChangeInfo),
/* harmony export */   getMatchedRoutes: () => (/* binding */ getMatchedRoutes),
/* harmony export */   lazyFn: () => (/* binding */ lazyFn),
/* harmony export */   processRouteTree: () => (/* binding */ processRouteTree)
/* harmony export */ });
/* harmony import */ var _tanstack_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/store */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _tanstack_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/store */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");
/* harmony import */ var _tanstack_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/history */ "./node_modules/@tanstack/history/dist/esm/index.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/router-core/dist/esm/not-found.js");
/* harmony import */ var _scroll_restoration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scroll-restoration.js */ "./node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js");
/* harmony import */ var _searchParams_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./searchParams.js */ "./node_modules/@tanstack/router-core/dist/esm/searchParams.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./root.js */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _redirect_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./redirect.js */ "./node_modules/@tanstack/router-core/dist/esm/redirect.js");
/* harmony import */ var _lru_cache_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lru-cache.js */ "./node_modules/@tanstack/router-core/dist/esm/lru-cache.js");











function defaultSerializeError(err) {
  if (err instanceof Error) {
    const obj = {
      name: err.name,
      message: err.message
    };
    if (true) {
      obj.stack = err.stack;
    }
    return obj;
  }
  return {
    data: err
  };
}
function getLocationChangeInfo(routerState) {
  const fromLocation = routerState.resolvedLocation;
  const toLocation = routerState.location;
  const pathChanged = (fromLocation == null ? void 0 : fromLocation.pathname) !== toLocation.pathname;
  const hrefChanged = (fromLocation == null ? void 0 : fromLocation.href) !== toLocation.href;
  const hashChanged = (fromLocation == null ? void 0 : fromLocation.hash) !== toLocation.hash;
  return { fromLocation, toLocation, pathChanged, hrefChanged, hashChanged };
}
class RouterCore {
  /**
   * @deprecated Use the `createRouter` function instead
   */
  constructor(options) {
    this.tempLocationKey = `${Math.round(
      Math.random() * 1e7
    )}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.isScrollRestoring = false;
    this.isScrollRestorationSetup = false;
    this.startTransition = (fn) => fn();
    this.update = (newOptions) => {
      var _a;
      if (newOptions.notFoundRoute) {
        console.warn(
          "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info."
        );
      }
      const previousOptions = this.options;
      this.options = {
        ...this.options,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(
        this.options.pathParamsAllowedCharacters.map((char) => [
          encodeURIComponent(char),
          char
        ])
      ) : void 0;
      if (!this.basepath || newOptions.basepath && newOptions.basepath !== previousOptions.basepath) {
        if (newOptions.basepath === void 0 || newOptions.basepath === "" || newOptions.basepath === "/") {
          this.basepath = "/";
        } else {
          this.basepath = `/${(0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPath)(newOptions.basepath)}`;
        }
      }
      if (!this.history || this.options.history && this.options.history !== this.history) {
        this.history = this.options.history ?? (this.isServer ? (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.createMemoryHistory)({
          initialEntries: [this.basepath || "/"]
        }) : (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)());
        this.latestLocation = this.parseLocation();
      }
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        this.buildRouteTree();
      }
      if (!this.__store) {
        this.__store = new _tanstack_store__WEBPACK_IMPORTED_MODULE_3__.Store(getInitialRouterState(this.latestLocation), {
          onUpdate: () => {
            this.__store.state = {
              ...this.state,
              cachedMatches: this.state.cachedMatches.filter(
                (d) => !["redirected"].includes(d.status)
              )
            };
          }
        });
        (0,_scroll_restoration_js__WEBPACK_IMPORTED_MODULE_4__.setupScrollRestoration)(this);
      }
      if (typeof window !== "undefined" && "CSS" in window && typeof ((_a = window.CSS) == null ? void 0 : _a.supports) === "function") {
        this.isViewTransitionTypesSupported = window.CSS.supports(
          "selector(:active-view-transition-type(a)"
        );
      }
    };
    this.buildRouteTree = () => {
      const { routesById, routesByPath, flatRoutes } = processRouteTree({
        routeTree: this.routeTree,
        initRoute: (route, i) => {
          route.init({
            originalIndex: i
          });
        }
      });
      this.routesById = routesById;
      this.routesByPath = routesByPath;
      this.flatRoutes = flatRoutes;
      const notFoundRoute = this.options.notFoundRoute;
      if (notFoundRoute) {
        notFoundRoute.init({
          originalIndex: 99999999999
        });
        this.routesById[notFoundRoute.id] = notFoundRoute;
      }
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) {
          listener.fn(routerEvent);
        }
      });
    };
    this.parseLocation = (previousLocation, locationToParse) => {
      const parse = ({
        pathname,
        search,
        hash,
        state
      }) => {
        const parsedSearch = this.options.parseSearch(search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        return {
          pathname,
          searchStr,
          search: (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousLocation == null ? void 0 : previousLocation.search, parsedSearch),
          hash: hash.split("#").reverse()[0] ?? "",
          href: `${pathname}${searchStr}${hash}`,
          state: (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousLocation == null ? void 0 : previousLocation.state, state)
        };
      };
      const location = parse(locationToParse ?? this.history.location);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        parsedTempLocation.state.__TSR_key = location.state.__TSR_key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      const resolvedPath = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.resolvePath)({
        basepath: this.basepath,
        base: from,
        to: (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.cleanPath)(path),
        trailingSlash: this.options.trailingSlash,
        caseSensitive: this.options.caseSensitive,
        parseCache: this.parsePathnameCache
      });
      return resolvedPath;
    };
    this.matchRoutes = (pathnameOrNext, locationSearchOrOpts, opts) => {
      if (typeof pathnameOrNext === "string") {
        return this.matchRoutesInternal(
          {
            pathname: pathnameOrNext,
            search: locationSearchOrOpts
          },
          opts
        );
      }
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    };
    this.parsePathnameCache = (0,_lru_cache_js__WEBPACK_IMPORTED_MODULE_6__.createLRUCache)(1e3);
    this.getMatchedRoutes = (pathname, routePathname) => {
      return getMatchedRoutes({
        pathname,
        routePathname,
        basepath: this.basepath,
        caseSensitive: this.options.caseSensitive,
        routesByPath: this.routesByPath,
        routesById: this.routesById,
        flatRoutes: this.flatRoutes,
        parseCache: this.parsePathnameCache
      });
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      this.updateMatch(id, (prev) => {
        clearTimeout(prev.pendingTimeout);
        return {
          ...prev,
          pendingTimeout: void 0
        };
      });
    };
    this.cancelMatches = () => {
      var _a;
      (_a = this.state.pendingMatches) == null ? void 0 : _a.forEach((match) => {
        this.cancelMatch(match.id);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}) => {
        var _a;
        const currentLocation = dest._fromLocation || this.latestLocation;
        const allCurrentLocationMatches = this.matchRoutes(currentLocation, {
          _buildLocation: true
        });
        const lastMatch = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.last)(allCurrentLocationMatches);
        let fromPath = lastMatch.fullPath;
        const toPath = dest.to ? this.resolvePathWithBase(fromPath, `${dest.to}`) : this.resolvePathWithBase(fromPath, ".");
        const routeIsChanging = !!dest.to && !comparePaths(dest.to.toString(), fromPath) && !comparePaths(toPath, fromPath);
        if (dest.unsafeRelative === "path") {
          fromPath = currentLocation.pathname;
        } else if (routeIsChanging && dest.from) {
          fromPath = dest.from;
          if ( true && dest._isNavigate) {
            const allFromMatches = this.getMatchedRoutes(
              dest.from,
              void 0
            ).matchedRoutes;
            const matchedFrom = [...allCurrentLocationMatches].reverse().find((d) => {
              return comparePaths(d.fullPath, fromPath);
            });
            const matchedCurrent = [...allFromMatches].reverse().find((d) => {
              return comparePaths(d.fullPath, currentLocation.pathname);
            });
            if (!matchedFrom && !matchedCurrent) {
              console.warn(`Could not find match for from: ${fromPath}`);
            }
          }
        }
        const fromSearch = lastMatch.search;
        const fromParams = { ...lastMatch.params };
        const nextTo = dest.to ? this.resolvePathWithBase(fromPath, `${dest.to}`) : this.resolvePathWithBase(fromPath, ".");
        let nextParams = dest.params === false || dest.params === null ? {} : (dest.params ?? true) === true ? fromParams : {
          ...fromParams,
          ...(0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.params, fromParams)
        };
        const interpolatedNextTo = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
          path: nextTo,
          params: nextParams ?? {},
          parseCache: this.parsePathnameCache
        }).interpolatedPath;
        const destRoutes = this.matchRoutes(
          interpolatedNextTo,
          {},
          {
            _buildLocation: true
          }
        ).map((d) => this.looseRoutesById[d.routeId]);
        if (Object.keys(nextParams).length > 0) {
          destRoutes.map((route) => {
            var _a2;
            return ((_a2 = route.options.params) == null ? void 0 : _a2.stringify) ?? route.options.stringifyParams;
          }).filter(Boolean).forEach((fn) => {
            nextParams = { ...nextParams, ...fn(nextParams) };
          });
        }
        const nextPathname = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
          // Use the original template path for interpolation
          // This preserves the original parameter syntax including optional parameters
          path: nextTo,
          params: nextParams ?? {},
          leaveWildcards: false,
          leaveParams: opts.leaveParams,
          decodeCharMap: this.pathParamsDecodeCharMap,
          parseCache: this.parsePathnameCache
        }).interpolatedPath;
        let nextSearch = fromSearch;
        if (opts._includeValidateSearch && ((_a = this.options.search) == null ? void 0 : _a.strict)) {
          let validatedSearch = {};
          destRoutes.forEach((route) => {
            try {
              if (route.options.validateSearch) {
                validatedSearch = {
                  ...validatedSearch,
                  ...validateSearch(route.options.validateSearch, {
                    ...validatedSearch,
                    ...nextSearch
                  }) ?? {}
                };
              }
            } catch {
            }
          });
          nextSearch = validatedSearch;
        }
        nextSearch = applySearchMiddleware({
          search: nextSearch,
          dest,
          destRoutes,
          _includeValidateSearch: opts._includeValidateSearch
        });
        nextSearch = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(fromSearch, nextSearch);
        const searchStr = this.options.stringifySearch(nextSearch);
        const hash = dest.hash === true ? currentLocation.hash : dest.hash ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.hash, currentLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? currentLocation.state : dest.state ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.state, currentLocation.state) : {};
        nextState = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(currentLocation.state, nextState);
        return {
          pathname: nextPathname,
          search: nextSearch,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          href: `${nextPathname}${searchStr}${hashStr}`,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        var _a;
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          let params = {};
          const foundMask = (_a = this.options.routeMasks) == null ? void 0 : _a.find((d) => {
            const match = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(
              this.basepath,
              next.pathname,
              {
                to: d.from,
                caseSensitive: false,
                fuzzy: false
              },
              this.parsePathnameCache
            );
            if (match) {
              params = match;
              return true;
            }
            return false;
          });
          if (foundMask) {
            const { from: _from, ...maskProps } = foundMask;
            maskedDest = {
              ...(0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.pick)(opts, ["from"]),
              ...maskProps,
              params
            };
            maskedNext = build(maskedDest);
          }
        }
        if (maskedNext) {
          const maskedFinal = build(maskedDest);
          next.maskedLocation = maskedFinal;
        }
        return next;
      };
      if (opts.mask) {
        return buildWithMatches(opts, {
          ...(0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.pick)(opts, ["from"]),
          ...opts.mask
        });
      }
      return buildWithMatches(opts);
    };
    this.commitLocation = ({
      viewTransition,
      ignoreBlocker,
      ...next
    }) => {
      const isSameState = () => {
        const ignoredProps = [
          "key",
          // TODO: Remove in v2 - use __TSR_key instead
          "__TSR_key",
          "__TSR_index",
          "__hashScrollIntoViewOptions"
        ];
        ignoredProps.forEach((prop) => {
          next.state[prop] = this.latestLocation.state[prop];
        });
        const isEqual = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(next.state, this.latestLocation.state);
        ignoredProps.forEach((prop) => {
          delete next.state[prop];
        });
        return isEqual;
      };
      const isSameUrl = this.latestLocation.href === next.href;
      const previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(() => {
        previousCommitPromise == null ? void 0 : previousCommitPromise.resolve();
      });
      if (isSameUrl && isSameState()) {
        this.load();
      } else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  __TSR_key: void 0,
                  key: void 0
                  // TODO: Remove in v2 - use __TSR_key instead
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) {
            nextHistory.state.__tempKey = this.tempLocationKey;
          }
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](
          nextHistory.href,
          nextHistory.state,
          { ignoreBlocker }
        );
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) {
        this.load();
      }
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({
      replace,
      resetScroll,
      hashScrollIntoView,
      viewTransition,
      ignoreBlocker,
      href,
      ...rest
    } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.parseHref)(href, {
          __TSR_index: replace ? currentIndex : currentIndex + 1
        });
        rest.to = parsed.pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      return this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
    };
    this.navigate = ({ to, reloadDocument, href, ...rest }) => {
      if (!reloadDocument && href) {
        try {
          new URL(`${href}`);
          reloadDocument = true;
        } catch {
        }
      }
      if (reloadDocument) {
        if (!href) {
          const location = this.buildLocation({ to, ...rest });
          href = this.history.createHref(location.href);
        }
        if (rest.replace) {
          window.location.replace(href);
        } else {
          window.location.href = href;
        }
        return Promise.resolve();
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to,
        _isNavigate: true
      });
    };
    this.beforeLoad = () => {
      this.cancelMatches();
      this.latestLocation = this.parseLocation(this.latestLocation);
      if (this.isServer) {
        const nextLocation = this.buildLocation({
          to: this.latestLocation.pathname,
          search: true,
          params: true,
          hash: true,
          state: true,
          _includeValidateSearch: true
        });
        const normalizeUrl = (url) => {
          try {
            return encodeURI(decodeURI(url));
          } catch {
            return url;
          }
        };
        if ((0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPath)(normalizeUrl(this.latestLocation.href)) !== (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPath)(normalizeUrl(nextLocation.href))) {
          throw (0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.redirect)({ href: nextLocation.href });
        }
      }
      const pendingMatches = this.matchRoutes(this.latestLocation);
      this.__store.setState((s) => ({
        ...s,
        status: "pending",
        statusCode: 200,
        isLoading: true,
        location: this.latestLocation,
        pendingMatches,
        // If a cached moved to pendingMatches, remove it from cachedMatches
        cachedMatches: s.cachedMatches.filter(
          (d) => !pendingMatches.some((e) => e.id === d.id)
        )
      }));
    };
    this.load = async (opts) => {
      let redirect2;
      let notFound;
      let loadPromise;
      loadPromise = new Promise((resolve) => {
        this.startTransition(async () => {
          var _a;
          try {
            this.beforeLoad();
            const next = this.latestLocation;
            const prevLocation = this.state.resolvedLocation;
            if (!this.state.redirect) {
              this.emit({
                type: "onBeforeNavigate",
                ...getLocationChangeInfo({
                  resolvedLocation: prevLocation,
                  location: next
                })
              });
            }
            this.emit({
              type: "onBeforeLoad",
              ...getLocationChangeInfo({
                resolvedLocation: prevLocation,
                location: next
              })
            });
            await this.loadMatches({
              sync: opts == null ? void 0 : opts.sync,
              matches: this.state.pendingMatches,
              location: next,
              // eslint-disable-next-line @typescript-eslint/require-await
              onReady: async () => {
                this.startViewTransition(async () => {
                  let exitingMatches;
                  let enteringMatches;
                  let stayingMatches;
                  (0,_tanstack_store__WEBPACK_IMPORTED_MODULE_8__.batch)(() => {
                    this.__store.setState((s) => {
                      const previousMatches = s.matches;
                      const newMatches = s.pendingMatches || s.matches;
                      exitingMatches = previousMatches.filter(
                        (match) => !newMatches.some((d) => d.id === match.id)
                      );
                      enteringMatches = newMatches.filter(
                        (match) => !previousMatches.some((d) => d.id === match.id)
                      );
                      stayingMatches = previousMatches.filter(
                        (match) => newMatches.some((d) => d.id === match.id)
                      );
                      return {
                        ...s,
                        isLoading: false,
                        loadedAt: Date.now(),
                        matches: newMatches,
                        pendingMatches: void 0,
                        cachedMatches: [
                          ...s.cachedMatches,
                          ...exitingMatches.filter((d) => d.status !== "error")
                        ]
                      };
                    });
                    this.clearExpiredCache();
                  });
                  [
                    [exitingMatches, "onLeave"],
                    [enteringMatches, "onEnter"],
                    [stayingMatches, "onStay"]
                  ].forEach(([matches, hook]) => {
                    matches.forEach((match) => {
                      var _a2, _b;
                      (_b = (_a2 = this.looseRoutesById[match.routeId].options)[hook]) == null ? void 0 : _b.call(_a2, match);
                    });
                  });
                });
              }
            });
          } catch (err) {
            if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err)) {
              redirect2 = err;
              if (!this.isServer) {
                this.navigate({
                  ...redirect2.options,
                  replace: true,
                  ignoreBlocker: true
                });
              }
            } else if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err)) {
              notFound = err;
            }
            this.__store.setState((s) => ({
              ...s,
              statusCode: redirect2 ? redirect2.status : notFound ? 404 : s.matches.some((d) => d.status === "error") ? 500 : 200,
              redirect: redirect2
            }));
          }
          if (this.latestLoadPromise === loadPromise) {
            (_a = this.commitLocationPromise) == null ? void 0 : _a.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) {
        await this.latestLoadPromise;
      }
      if (this.hasNotFoundMatch()) {
        this.__store.setState((s) => ({
          ...s,
          statusCode: 404
        }));
      }
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      delete this.shouldViewTransition;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          const next = this.latestLocation;
          const prevLocation = this.state.resolvedLocation;
          const resolvedViewTransitionTypes = typeof shouldViewTransition.types === "function" ? shouldViewTransition.types(
            getLocationChangeInfo({
              resolvedLocation: prevLocation,
              location: next
            })
          ) : shouldViewTransition.types;
          startViewTransitionParams = {
            update: fn,
            types: resolvedViewTransitionTypes
          };
        } else {
          startViewTransitionParams = fn;
        }
        document.startViewTransition(startViewTransitionParams);
      } else {
        fn();
      }
    };
    this.updateMatch = (id, updater) => {
      var _a;
      const matchesKey = ((_a = this.state.pendingMatches) == null ? void 0 : _a.some((d) => d.id === id)) ? "pendingMatches" : this.state.matches.some((d) => d.id === id) ? "matches" : this.state.cachedMatches.some((d) => d.id === id) ? "cachedMatches" : "";
      if (matchesKey) {
        this.__store.setState((s) => {
          var _a2;
          return {
            ...s,
            [matchesKey]: (_a2 = s[matchesKey]) == null ? void 0 : _a2.map((d) => d.id === id ? updater(d) : d)
          };
        });
      }
    };
    this.getMatch = (matchId) => {
      var _a;
      const findFn = (d) => d.id === matchId;
      return this.state.cachedMatches.find(findFn) ?? ((_a = this.state.pendingMatches) == null ? void 0 : _a.find(findFn)) ?? this.state.matches.find(findFn);
    };
    this.loadMatches = async ({
      location,
      matches,
      preload: allPreload,
      onReady,
      updateMatch = this.updateMatch,
      sync
    }) => {
      let firstBadMatchIndex;
      let rendered = false;
      const triggerOnReady = async () => {
        if (!rendered) {
          rendered = true;
          await (onReady == null ? void 0 : onReady());
        }
      };
      const resolvePreload = (matchId) => {
        return !!(allPreload && !this.state.matches.some((d) => d.id === matchId));
      };
      if (!this.isServer && this.state.matches.some((d) => d._forcePending)) {
        triggerOnReady();
      }
      const handleRedirectAndNotFound = (match, err) => {
        var _a, _b, _c;
        if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err)) {
          if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err)) {
            if (err.redirectHandled) {
              if (!err.options.reloadDocument) {
                throw err;
              }
            }
          }
          (_a = match.beforeLoadPromise) == null ? void 0 : _a.resolve();
          (_b = match.loaderPromise) == null ? void 0 : _b.resolve();
          updateMatch(match.id, (prev) => ({
            ...prev,
            status: (0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err) ? "redirected" : (0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err) ? "notFound" : "error",
            isFetching: false,
            error: err,
            beforeLoadPromise: void 0,
            loaderPromise: void 0
          }));
          if (!err.routeId) {
            err.routeId = match.routeId;
          }
          (_c = match.loadPromise) == null ? void 0 : _c.resolve();
          if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err)) {
            rendered = true;
            err.options._fromLocation = location;
            err.redirectHandled = true;
            err = this.resolveRedirect(err);
            throw err;
          } else if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err)) {
            this._handleNotFound(matches, err, {
              updateMatch
            });
            throw err;
          }
        }
      };
      const shouldSkipLoader = (matchId) => {
        const match = this.getMatch(matchId);
        if (!this.isServer && match._dehydrated) {
          return true;
        }
        if (this.isServer) {
          if (match.ssr === false) {
            return true;
          }
        }
        return false;
      };
      try {
        await new Promise((resolveAll, rejectAll) => {
          ;
          (async () => {
            var _a, _b, _c, _d;
            try {
              const handleSerialError = (index, err, routerCode) => {
                var _a2, _b2;
                const { id: matchId, routeId } = matches[index];
                const route = this.looseRoutesById[routeId];
                if (err instanceof Promise) {
                  throw err;
                }
                err.routerCode = routerCode;
                firstBadMatchIndex = firstBadMatchIndex ?? index;
                handleRedirectAndNotFound(this.getMatch(matchId), err);
                try {
                  (_b2 = (_a2 = route.options).onError) == null ? void 0 : _b2.call(_a2, err);
                } catch (errorHandlerErr) {
                  err = errorHandlerErr;
                  handleRedirectAndNotFound(this.getMatch(matchId), err);
                }
                updateMatch(matchId, (prev) => {
                  var _a3, _b3;
                  (_a3 = prev.beforeLoadPromise) == null ? void 0 : _a3.resolve();
                  (_b3 = prev.loadPromise) == null ? void 0 : _b3.resolve();
                  return {
                    ...prev,
                    error: err,
                    status: "error",
                    isFetching: false,
                    updatedAt: Date.now(),
                    abortController: new AbortController(),
                    beforeLoadPromise: void 0
                  };
                });
              };
              for (const [index, { id: matchId, routeId }] of matches.entries()) {
                const existingMatch = this.getMatch(matchId);
                const parentMatchId = (_a = matches[index - 1]) == null ? void 0 : _a.id;
                const parentMatch = parentMatchId ? this.getMatch(parentMatchId) : void 0;
                const route = this.looseRoutesById[routeId];
                const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
                if (this.isServer) {
                  let ssr;
                  if (this.isShell()) {
                    ssr = matchId === _root_js__WEBPACK_IMPORTED_MODULE_10__.rootRouteId;
                  } else {
                    const defaultSsr = this.options.defaultSsr ?? true;
                    if ((parentMatch == null ? void 0 : parentMatch.ssr) === false) {
                      ssr = false;
                    } else {
                      let tempSsr;
                      if (route.options.ssr === void 0) {
                        tempSsr = defaultSsr;
                      } else if (typeof route.options.ssr === "function") {
                        let makeMaybe = function(value, error) {
                          if (error) {
                            return { status: "error", error };
                          }
                          return { status: "success", value };
                        };
                        const { search, params } = this.getMatch(matchId);
                        const ssrFnContext = {
                          search: makeMaybe(search, existingMatch.searchError),
                          params: makeMaybe(params, existingMatch.paramsError),
                          location,
                          matches: matches.map((match) => ({
                            index: match.index,
                            pathname: match.pathname,
                            fullPath: match.fullPath,
                            staticData: match.staticData,
                            id: match.id,
                            routeId: match.routeId,
                            search: makeMaybe(match.search, match.searchError),
                            params: makeMaybe(match.params, match.paramsError),
                            ssr: match.ssr
                          }))
                        };
                        tempSsr = await route.options.ssr(ssrFnContext) ?? defaultSsr;
                      } else {
                        tempSsr = route.options.ssr;
                      }
                      if (tempSsr === true && (parentMatch == null ? void 0 : parentMatch.ssr) === "data-only") {
                        ssr = "data-only";
                      } else {
                        ssr = tempSsr;
                      }
                    }
                  }
                  updateMatch(matchId, (prev) => ({
                    ...prev,
                    ssr
                  }));
                }
                if (shouldSkipLoader(matchId)) {
                  continue;
                }
                const shouldPending = !!(onReady && !this.isServer && !resolvePreload(matchId) && (route.options.loader || route.options.beforeLoad || routeNeedsPreload(route)) && typeof pendingMs === "number" && pendingMs !== Infinity && (route.options.pendingComponent ?? ((_b = this.options) == null ? void 0 : _b.defaultPendingComponent)));
                let executeBeforeLoad = true;
                const setupPendingTimeout = () => {
                  if (shouldPending && this.getMatch(matchId).pendingTimeout === void 0) {
                    const pendingTimeout = setTimeout(() => {
                      try {
                        triggerOnReady();
                      } catch {
                      }
                    }, pendingMs);
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      pendingTimeout
                    }));
                  }
                };
                if (
                  // If we are in the middle of a load, either of these will be present
                  // (not to be confused with `loadPromise`, which is always defined)
                  existingMatch.beforeLoadPromise || existingMatch.loaderPromise
                ) {
                  setupPendingTimeout();
                  await existingMatch.beforeLoadPromise;
                  const match = this.getMatch(matchId);
                  if (match.status === "error") {
                    executeBeforeLoad = true;
                  } else if (match.preload && (match.status === "redirected" || match.status === "notFound")) {
                    handleRedirectAndNotFound(match, match.error);
                  }
                }
                if (executeBeforeLoad) {
                  try {
                    updateMatch(matchId, (prev) => {
                      const prevLoadPromise = prev.loadPromise;
                      return {
                        ...prev,
                        loadPromise: (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(() => {
                          prevLoadPromise == null ? void 0 : prevLoadPromise.resolve();
                        }),
                        beforeLoadPromise: (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)()
                      };
                    });
                    const { paramsError, searchError } = this.getMatch(matchId);
                    if (paramsError) {
                      handleSerialError(index, paramsError, "PARSE_PARAMS");
                    }
                    if (searchError) {
                      handleSerialError(index, searchError, "VALIDATE_SEARCH");
                    }
                    setupPendingTimeout();
                    const abortController = new AbortController();
                    const parentMatchContext = (parentMatch == null ? void 0 : parentMatch.context) ?? this.options.context ?? {};
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: "beforeLoad",
                      fetchCount: prev.fetchCount + 1,
                      abortController,
                      context: {
                        ...parentMatchContext,
                        ...prev.__routeContext
                      }
                    }));
                    const { search, params, context, cause } = this.getMatch(matchId);
                    const preload = resolvePreload(matchId);
                    const beforeLoadFnContext = {
                      search,
                      abortController,
                      params,
                      preload,
                      context,
                      location,
                      navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                      buildLocation: this.buildLocation,
                      cause: preload ? "preload" : cause,
                      matches
                    };
                    const beforeLoadContext = await ((_d = (_c = route.options).beforeLoad) == null ? void 0 : _d.call(_c, beforeLoadFnContext));
                    if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(beforeLoadContext) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(beforeLoadContext)) {
                      handleSerialError(index, beforeLoadContext, "BEFORE_LOAD");
                    }
                    updateMatch(matchId, (prev) => {
                      return {
                        ...prev,
                        __beforeLoadContext: beforeLoadContext,
                        context: {
                          ...parentMatchContext,
                          ...prev.__routeContext,
                          ...beforeLoadContext
                        },
                        abortController
                      };
                    });
                  } catch (err) {
                    handleSerialError(index, err, "BEFORE_LOAD");
                  }
                  updateMatch(matchId, (prev) => {
                    var _a2;
                    (_a2 = prev.beforeLoadPromise) == null ? void 0 : _a2.resolve();
                    return {
                      ...prev,
                      beforeLoadPromise: void 0,
                      isFetching: false
                    };
                  });
                }
              }
              const validResolvedMatches = matches.slice(0, firstBadMatchIndex);
              const matchPromises = [];
              validResolvedMatches.forEach(({ id: matchId, routeId }, index) => {
                matchPromises.push(
                  (async () => {
                    let loaderShouldRunAsync = false;
                    let loaderIsRunningAsync = false;
                    const route = this.looseRoutesById[routeId];
                    const executeHead = async () => {
                      var _a2, _b2, _c2, _d2, _e, _f;
                      const match = this.getMatch(matchId);
                      if (!match) {
                        return;
                      }
                      const assetContext = {
                        matches,
                        match,
                        params: match.params,
                        loaderData: match.loaderData
                      };
                      const headFnContent = await ((_b2 = (_a2 = route.options).head) == null ? void 0 : _b2.call(_a2, assetContext));
                      const meta = headFnContent == null ? void 0 : headFnContent.meta;
                      const links = headFnContent == null ? void 0 : headFnContent.links;
                      const headScripts = headFnContent == null ? void 0 : headFnContent.scripts;
                      const styles = headFnContent == null ? void 0 : headFnContent.styles;
                      const scripts = await ((_d2 = (_c2 = route.options).scripts) == null ? void 0 : _d2.call(_c2, assetContext));
                      const headers = await ((_f = (_e = route.options).headers) == null ? void 0 : _f.call(_e, assetContext));
                      return {
                        meta,
                        links,
                        headScripts,
                        headers,
                        scripts,
                        styles
                      };
                    };
                    const potentialPendingMinPromise = async () => {
                      const latestMatch = this.getMatch(matchId);
                      if (latestMatch.minPendingPromise) {
                        await latestMatch.minPendingPromise;
                      }
                    };
                    const prevMatch = this.getMatch(matchId);
                    if (shouldSkipLoader(matchId)) {
                      if (this.isServer) {
                        const head = await executeHead();
                        updateMatch(matchId, (prev) => ({
                          ...prev,
                          ...head
                        }));
                        return this.getMatch(matchId);
                      }
                    } else if (prevMatch.loaderPromise) {
                      if (prevMatch.status === "success" && !sync && !prevMatch.preload) {
                        return this.getMatch(matchId);
                      }
                      await prevMatch.loaderPromise;
                      const match = this.getMatch(matchId);
                      if (match.error) {
                        handleRedirectAndNotFound(match, match.error);
                      }
                    } else {
                      const parentMatchPromise = matchPromises[index - 1];
                      const getLoaderContext = () => {
                        const {
                          params,
                          loaderDeps,
                          abortController,
                          context,
                          cause
                        } = this.getMatch(matchId);
                        const preload2 = resolvePreload(matchId);
                        return {
                          params,
                          deps: loaderDeps,
                          preload: !!preload2,
                          parentMatchPromise,
                          abortController,
                          context,
                          location,
                          navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                          cause: preload2 ? "preload" : cause,
                          route
                        };
                      };
                      const age = Date.now() - this.getMatch(matchId).updatedAt;
                      const preload = resolvePreload(matchId);
                      const staleAge = preload ? route.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? this.options.defaultStaleTime ?? 0;
                      const shouldReloadOption = route.options.shouldReload;
                      const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext()) : shouldReloadOption;
                      updateMatch(matchId, (prev) => ({
                        ...prev,
                        loaderPromise: (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(),
                        preload: !!preload && !this.state.matches.some((d) => d.id === matchId)
                      }));
                      const runLoader = async () => {
                        var _a2, _b2, _c2, _d2;
                        try {
                          try {
                            if (!this.isServer || this.isServer && this.getMatch(matchId).ssr === true) {
                              this.loadRouteChunk(route);
                            }
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              isFetching: "loader"
                            }));
                            const loaderData = await ((_b2 = (_a2 = route.options).loader) == null ? void 0 : _b2.call(_a2, getLoaderContext()));
                            handleRedirectAndNotFound(
                              this.getMatch(matchId),
                              loaderData
                            );
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              loaderData
                            }));
                            await route._lazyPromise;
                            const head = await executeHead();
                            await potentialPendingMinPromise();
                            await route._componentsPromise;
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error: void 0,
                              status: "success",
                              isFetching: false,
                              updatedAt: Date.now(),
                              ...head
                            }));
                          } catch (e) {
                            let error = e;
                            await potentialPendingMinPromise();
                            handleRedirectAndNotFound(this.getMatch(matchId), e);
                            try {
                              (_d2 = (_c2 = route.options).onError) == null ? void 0 : _d2.call(_c2, e);
                            } catch (onErrorError) {
                              error = onErrorError;
                              handleRedirectAndNotFound(
                                this.getMatch(matchId),
                                onErrorError
                              );
                            }
                            const head = await executeHead();
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error,
                              status: "error",
                              isFetching: false,
                              ...head
                            }));
                          }
                        } catch (err) {
                          const head = await executeHead();
                          updateMatch(matchId, (prev) => ({
                            ...prev,
                            loaderPromise: void 0,
                            ...head
                          }));
                          handleRedirectAndNotFound(this.getMatch(matchId), err);
                        }
                      };
                      const { status, invalid } = this.getMatch(matchId);
                      loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? age > staleAge));
                      if (preload && route.options.preload === false) {
                      } else if (loaderShouldRunAsync && !sync) {
                        loaderIsRunningAsync = true;
                        (async () => {
                          try {
                            await runLoader();
                            const { loaderPromise, loadPromise } = this.getMatch(matchId);
                            loaderPromise == null ? void 0 : loaderPromise.resolve();
                            loadPromise == null ? void 0 : loadPromise.resolve();
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              loaderPromise: void 0
                            }));
                          } catch (err) {
                            if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err)) {
                              await this.navigate(err.options);
                            }
                          }
                        })();
                      } else if (status !== "success" || loaderShouldRunAsync && sync) {
                        await runLoader();
                      } else {
                        const head = await executeHead();
                        updateMatch(matchId, (prev) => ({
                          ...prev,
                          ...head
                        }));
                      }
                    }
                    if (!loaderIsRunningAsync) {
                      const { loaderPromise, loadPromise } = this.getMatch(matchId);
                      loaderPromise == null ? void 0 : loaderPromise.resolve();
                      loadPromise == null ? void 0 : loadPromise.resolve();
                    }
                    updateMatch(matchId, (prev) => {
                      clearTimeout(prev.pendingTimeout);
                      return {
                        ...prev,
                        isFetching: loaderIsRunningAsync ? prev.isFetching : false,
                        loaderPromise: loaderIsRunningAsync ? prev.loaderPromise : void 0,
                        invalid: false,
                        pendingTimeout: void 0,
                        _dehydrated: void 0
                      };
                    });
                    return this.getMatch(matchId);
                  })()
                );
              });
              await Promise.all(matchPromises);
              resolveAll();
            } catch (err) {
              rejectAll(err);
            }
          })();
        });
        await triggerOnReady();
      } catch (err) {
        if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err)) {
          if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err) && !allPreload) {
            await triggerOnReady();
          }
          throw err;
        }
      }
      return matches;
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        var _a;
        if (((_a = opts == null ? void 0 : opts.filter) == null ? void 0 : _a.call(opts, d)) ?? true) {
          return {
            ...d,
            invalid: true,
            ...(opts == null ? void 0 : opts.forcePending) || d.status === "error" ? { status: "pending", error: void 0 } : {}
          };
        }
        return d;
      };
      this.__store.setState((s) => {
        var _a;
        return {
          ...s,
          matches: s.matches.map(invalidate),
          cachedMatches: s.cachedMatches.map(invalidate),
          pendingMatches: (_a = s.pendingMatches) == null ? void 0 : _a.map(invalidate)
        };
      });
      this.shouldViewTransition = false;
      return this.load({ sync: opts == null ? void 0 : opts.sync });
    };
    this.resolveRedirect = (redirect2) => {
      if (!redirect2.options.href) {
        redirect2.options.href = this.buildLocation(redirect2.options).href;
        redirect2.headers.set("Location", redirect2.options.href);
      }
      if (!redirect2.headers.get("Location")) {
        redirect2.headers.set("Location", redirect2.options.href);
      }
      return redirect2;
    };
    this.clearCache = (opts) => {
      const filter = opts == null ? void 0 : opts.filter;
      if (filter !== void 0) {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: s.cachedMatches.filter(
              (m) => !filter(m)
            )
          };
        });
      } else {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: []
          };
        });
      }
    };
    this.clearExpiredCache = () => {
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) {
          return true;
        }
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3;
        const isError = d.status === "error";
        if (isError) return true;
        const gcEligible = Date.now() - d.updatedAt >= gcTime;
        return gcEligible;
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = (route) => {
      if (route._lazyPromise === void 0) {
        if (route.lazyFn) {
          route._lazyPromise = route.lazyFn().then((lazyRoute) => {
            const { id: _id, ...options2 } = lazyRoute.options;
            Object.assign(route.options, options2);
          });
        } else {
          route._lazyPromise = Promise.resolve();
        }
      }
      if (route._componentsPromise === void 0) {
        route._componentsPromise = route._lazyPromise.then(
          () => Promise.all(
            componentTypes.map(async (type) => {
              const component = route.options[type];
              if (component == null ? void 0 : component.preload) {
                await component.preload();
              }
            })
          )
        );
      }
      return route._componentsPromise;
    };
    this.preloadRoute = async (opts) => {
      const next = this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = new Set(
        [...this.state.matches, ...this.state.pendingMatches ?? []].map(
          (d) => d.id
        )
      );
      const loadedMatchIds = /* @__PURE__ */ new Set([
        ...activeMatchIds,
        ...this.state.cachedMatches.map((d) => d.id)
      ]);
      (0,_tanstack_store__WEBPACK_IMPORTED_MODULE_8__.batch)(() => {
        matches.forEach((match) => {
          if (!loadedMatchIds.has(match.id)) {
            this.__store.setState((s) => ({
              ...s,
              cachedMatches: [...s.cachedMatches, match]
            }));
          }
        });
      });
      try {
        matches = await this.loadMatches({
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) {
              matches = matches.map((d) => d.id === id ? updater(d) : d);
            } else {
              this.updateMatch(id, updater);
            }
          }
        });
        return matches;
      } catch (err) {
        if ((0,_redirect_js__WEBPACK_IMPORTED_MODULE_7__.isRedirect)(err)) {
          if (err.options.reloadDocument) {
            return void 0;
          }
          return await this.preloadRoute({
            ...err.options,
            _fromLocation: next
          });
        }
        if (!(0,_not_found_js__WEBPACK_IMPORTED_MODULE_9__.isNotFound)(err)) {
          console.error(err);
        }
        return void 0;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(
          location.from || "",
          location.to
        ) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if ((opts == null ? void 0 : opts.pending) && this.state.status !== "pending") {
        return false;
      }
      const pending = (opts == null ? void 0 : opts.pending) === void 0 ? !this.state.isLoading : opts.pending;
      const baseLocation = pending ? this.latestLocation : this.state.resolvedLocation || this.state.location;
      const match = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(
        this.basepath,
        baseLocation.pathname,
        {
          ...opts,
          to: next.pathname
        },
        this.parsePathnameCache
      );
      if (!match) {
        return false;
      }
      if (location.params) {
        if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(match, location.params, { partial: true })) {
          return false;
        }
      }
      if (match && ((opts == null ? void 0 : opts.includeSearch) ?? true)) {
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(baseLocation.search, next.search, { partial: true }) ? match : false;
      }
      return match;
    };
    this._handleNotFound = (matches, err, {
      updateMatch = this.updateMatch
    } = {}) => {
      var _a;
      const routeCursor = this.routesById[err.routeId ?? ""] ?? this.routeTree;
      const matchesByRouteId = {};
      for (const match of matches) {
        matchesByRouteId[match.routeId] = match;
      }
      if (!routeCursor.options.notFoundComponent && ((_a = this.options) == null ? void 0 : _a.defaultNotFoundComponent)) {
        routeCursor.options.notFoundComponent = this.options.defaultNotFoundComponent;
      }
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
        routeCursor.options.notFoundComponent,
        "No notFoundComponent found. Please set a notFoundComponent on your route or provide a defaultNotFoundComponent to the router."
      );
      const matchForRoute = matchesByRouteId[routeCursor.id];
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
        matchForRoute,
        "Could not find match for route: " + routeCursor.id
      );
      updateMatch(matchForRoute.id, (prev) => ({
        ...prev,
        status: "notFound",
        error: err,
        isFetching: false
      }));
      if (err.routerCode === "BEFORE_LOAD" && routeCursor.parentRoute) {
        err.routeId = routeCursor.parentRoute.id;
        this._handleNotFound(matches, err, {
          updateMatch
        });
      }
    };
    this.hasNotFoundMatch = () => {
      return this.__store.state.matches.some(
        (d) => d.status === "notFound" || d.globalNotFound
      );
    };
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? _searchParams_js__WEBPACK_IMPORTED_MODULE_11__.defaultStringifySearch,
      parseSearch: options.parseSearch ?? _searchParams_js__WEBPACK_IMPORTED_MODULE_11__.defaultParseSearch
    });
    if (typeof document !== "undefined") {
      self.__TSR_ROUTER__ = this;
    }
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutesInternal(next, opts) {
    var _a;
    const { foundRoute, matchedRoutes, routeParams } = this.getMatchedRoutes(
      next.pathname,
      (_a = opts == null ? void 0 : opts.dest) == null ? void 0 : _a.to
    );
    let isGlobalNotFound = false;
    if (
      // If we found a route, and it's not an index route and we have left over path
      foundRoute ? foundRoute.path !== "/" && routeParams["**"] : (
        // Or if we didn't find a route and we have left over path
        (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(next.pathname)
      )
    ) {
      if (this.options.notFoundRoute) {
        matchedRoutes.push(this.options.notFoundRoute);
      } else {
        isGlobalNotFound = true;
      }
    }
    const globalNotFoundRouteId = (() => {
      if (!isGlobalNotFound) {
        return void 0;
      }
      if (this.options.notFoundMode !== "root") {
        for (let i = matchedRoutes.length - 1; i >= 0; i--) {
          const route = matchedRoutes[i];
          if (route.children) {
            return route.id;
          }
        }
      }
      return _root_js__WEBPACK_IMPORTED_MODULE_10__.rootRouteId;
    })();
    const parseErrors = matchedRoutes.map((route) => {
      var _a2;
      let parsedParamsError;
      const parseParams = ((_a2 = route.options.params) == null ? void 0 : _a2.parse) ?? route.options.parseParams;
      if (parseParams) {
        try {
          const parsedParams = parseParams(routeParams);
          Object.assign(routeParams, parsedParams);
        } catch (err) {
          parsedParamsError = new PathParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw parsedParamsError;
          }
          return parsedParamsError;
        }
      }
      return;
    });
    const matches = [];
    const getParentContext = (parentMatch) => {
      const parentMatchId = parentMatch == null ? void 0 : parentMatch.id;
      const parentContext = !parentMatchId ? this.options.context ?? {} : parentMatch.context ?? this.options.context ?? {};
      return parentContext;
    };
    matchedRoutes.forEach((route, index) => {
      var _a2, _b;
      const parentMatch = matches[index - 1];
      const [preMatchSearch, strictMatchSearch, searchError] = (() => {
        const parentSearch = (parentMatch == null ? void 0 : parentMatch.search) ?? next.search;
        const parentStrictSearch = (parentMatch == null ? void 0 : parentMatch._strictSearch) ?? {};
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? {};
          return [
            {
              ...parentSearch,
              ...strictSearch
            },
            { ...parentStrictSearch, ...strictSearch },
            void 0
          ];
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) {
            searchParamError = new SearchParamError(err.message, {
              cause: err
            });
          }
          if (opts == null ? void 0 : opts.throwOnError) {
            throw searchParamError;
          }
          return [parentSearch, {}, searchParamError];
        }
      })();
      const loaderDeps = ((_b = (_a2 = route.options).loaderDeps) == null ? void 0 : _b.call(_a2, {
        search: preMatchSearch
      })) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { usedParams, interpolatedPath } = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
        path: route.fullPath,
        params: routeParams,
        decodeCharMap: this.pathParamsDecodeCharMap
      });
      const matchId = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
        path: route.id,
        params: routeParams,
        leaveWildcards: true,
        decodeCharMap: this.pathParamsDecodeCharMap,
        parseCache: this.parsePathnameCache
      }).interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = this.state.matches.find(
        (d) => d.routeId === route.id
      );
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) {
        match = {
          ...existingMatch,
          cause,
          params: previousMatch ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.params, routeParams) : routeParams,
          _strictParams: usedParams,
          search: previousMatch ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.search, preMatchSearch) : (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(existingMatch.search, preMatchSearch),
          _strictSearch: strictMatchSearch
        };
      } else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          index,
          routeId: route.id,
          params: previousMatch ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.params, routeParams) : routeParams,
          _strictParams: usedParams,
          pathname: (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([this.basepath, interpolatedPath]),
          updatedAt: Date.now(),
          search: previousMatch ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError: parseErrors[index],
          __routeContext: {},
          __beforeLoadContext: void 0,
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          headScripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          loadPromise: (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(),
          fullPath: route.fullPath
        };
      }
      if (!(opts == null ? void 0 : opts.preload)) {
        match.globalNotFound = globalNotFoundRouteId === route.id;
      }
      match.searchError = searchError;
      const parentContext = getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches.push(match);
    });
    matches.forEach((match, index) => {
      var _a2, _b;
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      if (!existingMatch && (opts == null ? void 0 : opts._buildLocation) !== true) {
        const parentMatch = matches[index - 1];
        const parentContext = getParentContext(parentMatch);
        const contextFnContext = {
          deps: match.loaderDeps,
          params: match.params,
          context: parentContext,
          location: next,
          navigate: (opts2) => this.navigate({ ...opts2, _fromLocation: next }),
          buildLocation: this.buildLocation,
          cause: match.cause,
          abortController: match.abortController,
          preload: !!match.preload,
          matches
        };
        match.__routeContext = ((_b = (_a2 = route.options).context) == null ? void 0 : _b.call(_a2, contextFnContext)) ?? {};
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
    });
    return matches;
  }
}
class SearchParamError extends Error {
}
class PathParamError extends Error {
}
const normalize = (str) => str.endsWith("/") && str.length > 1 ? str.slice(0, -1) : str;
function comparePaths(a, b) {
  return normalize(a) === normalize(b);
}
function lazyFn(fn, key) {
  return async (...args) => {
    const imported = await fn();
    return imported[key || "default"](...args);
  };
}
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200
  };
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise)
      throw new SearchParamError("Async validation not supported");
    if (result.issues)
      throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), {
        cause: result
      });
    return result.value;
  }
  if ("parse" in validateSearch2) {
    return validateSearch2.parse(input);
  }
  if (typeof validateSearch2 === "function") {
    return validateSearch2(input);
  }
  return {};
}
const componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function routeNeedsPreload(route) {
  var _a;
  for (const componentType of componentTypes) {
    if ((_a = route.options[componentType]) == null ? void 0 : _a.preload) {
      return true;
    }
  }
  return false;
}
const REQUIRED_PARAM_BASE_SCORE = 0.5;
const OPTIONAL_PARAM_BASE_SCORE = 0.4;
const WILDCARD_PARAM_BASE_SCORE = 0.25;
const BOTH_PRESENCE_BASE_SCORE = 0.05;
const PREFIX_PRESENCE_BASE_SCORE = 0.02;
const SUFFIX_PRESENCE_BASE_SCORE = 0.01;
const PREFIX_LENGTH_SCORE_MULTIPLIER = 2e-4;
const SUFFIX_LENGTH_SCORE_MULTIPLIER = 1e-4;
function handleParam(segment, baseScore) {
  if (segment.prefixSegment && segment.suffixSegment) {
    return baseScore + BOTH_PRESENCE_BASE_SCORE + PREFIX_LENGTH_SCORE_MULTIPLIER * segment.prefixSegment.length + SUFFIX_LENGTH_SCORE_MULTIPLIER * segment.suffixSegment.length;
  }
  if (segment.prefixSegment) {
    return baseScore + PREFIX_PRESENCE_BASE_SCORE + PREFIX_LENGTH_SCORE_MULTIPLIER * segment.prefixSegment.length;
  }
  if (segment.suffixSegment) {
    return baseScore + SUFFIX_PRESENCE_BASE_SCORE + SUFFIX_LENGTH_SCORE_MULTIPLIER * segment.suffixSegment.length;
  }
  return baseScore;
}
function processRouteTree({
  routeTree,
  initRoute
}) {
  const routesById = {};
  const routesByPath = {};
  const recurseRoutes = (childRoutes) => {
    childRoutes.forEach((childRoute, i) => {
      initRoute == null ? void 0 : initRoute(childRoute, i);
      const existingRoute = routesById[childRoute.id];
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
        !existingRoute,
        `Duplicate routes found with id: ${String(childRoute.id)}`
      );
      routesById[childRoute.id] = childRoute;
      if (!childRoute.isRoot && childRoute.path) {
        const trimmedFullPath = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(childRoute.fullPath);
        if (!routesByPath[trimmedFullPath] || childRoute.fullPath.endsWith("/")) {
          routesByPath[trimmedFullPath] = childRoute;
        }
      }
      const children = childRoute.children;
      if (children == null ? void 0 : children.length) {
        recurseRoutes(children);
      }
    });
  };
  recurseRoutes([routeTree]);
  const scoredRoutes = [];
  const routes = Object.values(routesById);
  routes.forEach((d, i) => {
    var _a;
    if (d.isRoot || !d.path) {
      return;
    }
    const trimmed = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPathLeft)(d.fullPath);
    let parsed = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.parsePathname)(trimmed);
    let skip = 0;
    while (parsed.length > skip + 1 && ((_a = parsed[skip]) == null ? void 0 : _a.value) === "/") {
      skip++;
    }
    if (skip > 0) parsed = parsed.slice(skip);
    let optionalParamCount = 0;
    let hasStaticAfter = false;
    const scores = parsed.map((segment, index) => {
      if (segment.value === "/") {
        return 0.75;
      }
      let baseScore = void 0;
      if (segment.type === _path_js__WEBPACK_IMPORTED_MODULE_1__.SEGMENT_TYPE_PARAM) {
        baseScore = REQUIRED_PARAM_BASE_SCORE;
      } else if (segment.type === _path_js__WEBPACK_IMPORTED_MODULE_1__.SEGMENT_TYPE_OPTIONAL_PARAM) {
        baseScore = OPTIONAL_PARAM_BASE_SCORE;
        optionalParamCount++;
      } else if (segment.type === _path_js__WEBPACK_IMPORTED_MODULE_1__.SEGMENT_TYPE_WILDCARD) {
        baseScore = WILDCARD_PARAM_BASE_SCORE;
      }
      if (baseScore) {
        for (let i2 = index + 1; i2 < parsed.length; i2++) {
          const nextSegment = parsed[i2];
          if (nextSegment.type === _path_js__WEBPACK_IMPORTED_MODULE_1__.SEGMENT_TYPE_PATHNAME && nextSegment.value !== "/") {
            hasStaticAfter = true;
            return handleParam(segment, baseScore + 0.2);
          }
        }
        return handleParam(segment, baseScore);
      }
      return 1;
    });
    scoredRoutes.push({
      child: d,
      trimmed,
      parsed,
      index: i,
      scores,
      optionalParamCount,
      hasStaticAfter
    });
  });
  const flatRoutes = scoredRoutes.sort((a, b) => {
    const minLength = Math.min(a.scores.length, b.scores.length);
    for (let i = 0; i < minLength; i++) {
      if (a.scores[i] !== b.scores[i]) {
        return b.scores[i] - a.scores[i];
      }
    }
    if (a.scores.length !== b.scores.length) {
      if (a.optionalParamCount !== b.optionalParamCount) {
        if (a.hasStaticAfter === b.hasStaticAfter) {
          return a.optionalParamCount - b.optionalParamCount;
        } else if (a.hasStaticAfter && !b.hasStaticAfter) {
          return -1;
        } else if (!a.hasStaticAfter && b.hasStaticAfter) {
          return 1;
        }
      }
      return b.scores.length - a.scores.length;
    }
    for (let i = 0; i < minLength; i++) {
      if (a.parsed[i].value !== b.parsed[i].value) {
        return a.parsed[i].value > b.parsed[i].value ? 1 : -1;
      }
    }
    return a.index - b.index;
  }).map((d, i) => {
    d.child.rank = i;
    return d.child;
  });
  return { routesById, routesByPath, flatRoutes };
}
function getMatchedRoutes({
  pathname,
  routePathname,
  basepath,
  caseSensitive,
  routesByPath,
  routesById,
  flatRoutes,
  parseCache
}) {
  let routeParams = {};
  const trimmedPath = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(pathname);
  const getMatchedParams = (route) => {
    var _a;
    const result = (0,_path_js__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(
      basepath,
      trimmedPath,
      {
        to: route.fullPath,
        caseSensitive: ((_a = route.options) == null ? void 0 : _a.caseSensitive) ?? caseSensitive,
        // we need fuzzy matching for `notFoundMode: 'fuzzy'`
        fuzzy: true
      },
      parseCache
    );
    return result;
  };
  let foundRoute = routePathname !== void 0 ? routesByPath[routePathname] : void 0;
  if (foundRoute) {
    routeParams = getMatchedParams(foundRoute);
  } else {
    let fuzzyMatch = void 0;
    for (const route of flatRoutes) {
      const matchedParams = getMatchedParams(route);
      if (matchedParams) {
        if (route.path !== "/" && matchedParams["**"]) {
          if (!fuzzyMatch) {
            fuzzyMatch = { foundRoute: route, routeParams: matchedParams };
          }
        } else {
          foundRoute = route;
          routeParams = matchedParams;
          break;
        }
      }
    }
    if (!foundRoute && fuzzyMatch) {
      foundRoute = fuzzyMatch.foundRoute;
      routeParams = fuzzyMatch.routeParams;
    }
  }
  let routeCursor = foundRoute || routesById[_root_js__WEBPACK_IMPORTED_MODULE_10__.rootRouteId];
  const matchedRoutes = [routeCursor];
  while (routeCursor.parentRoute) {
    routeCursor = routeCursor.parentRoute;
    matchedRoutes.push(routeCursor);
  }
  matchedRoutes.reverse();
  return { matchedRoutes, routeParams, foundRoute };
}
function applySearchMiddleware({
  search,
  dest,
  destRoutes,
  _includeValidateSearch
}) {
  const allMiddlewares = destRoutes.reduce(
    (acc, route) => {
      var _a;
      const middlewares = [];
      if ("search" in route.options) {
        if ((_a = route.options.search) == null ? void 0 : _a.middlewares) {
          middlewares.push(...route.options.search.middlewares);
        }
      } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
        const legacyMiddleware = ({
          search: search2,
          next
        }) => {
          let nextSearch = search2;
          if ("preSearchFilters" in route.options && route.options.preSearchFilters) {
            nextSearch = route.options.preSearchFilters.reduce(
              (prev, next2) => next2(prev),
              search2
            );
          }
          const result = next(nextSearch);
          if ("postSearchFilters" in route.options && route.options.postSearchFilters) {
            return route.options.postSearchFilters.reduce(
              (prev, next2) => next2(prev),
              result
            );
          }
          return result;
        };
        middlewares.push(legacyMiddleware);
      }
      if (_includeValidateSearch && route.options.validateSearch) {
        const validate = ({ search: search2, next }) => {
          const result = next(search2);
          try {
            const validatedSearch = {
              ...result,
              ...validateSearch(route.options.validateSearch, result) ?? {}
            };
            return validatedSearch;
          } catch {
            return result;
          }
        };
        middlewares.push(validate);
      }
      return acc.concat(middlewares);
    },
    []
  ) ?? [];
  const final = ({ search: search2 }) => {
    if (!dest.search) {
      return {};
    }
    if (dest.search === true) {
      return search2;
    }
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.search, search2);
  };
  allMiddlewares.push(final);
  const applyNext = (index, currentSearch) => {
    if (index >= allMiddlewares.length) {
      return currentSearch;
    }
    const middleware = allMiddlewares[index];
    const next = (newSearch) => {
      return applyNext(index + 1, newSearch);
    };
    return middleware({ search: currentSearch, next });
  };
  return applyNext(0, search);
}

//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/scroll-restoration.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultGetScrollRestorationKey: () => (/* binding */ defaultGetScrollRestorationKey),
/* harmony export */   getCssSelector: () => (/* binding */ getCssSelector),
/* harmony export */   handleHashScroll: () => (/* binding */ handleHashScroll),
/* harmony export */   restoreScroll: () => (/* binding */ restoreScroll),
/* harmony export */   scrollRestorationCache: () => (/* binding */ scrollRestorationCache),
/* harmony export */   setupScrollRestoration: () => (/* binding */ setupScrollRestoration),
/* harmony export */   storageKey: () => (/* binding */ storageKey)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");

function getSafeSessionStorage() {
  try {
    if (typeof window !== "undefined" && typeof window.sessionStorage === "object") {
      return window.sessionStorage;
    }
  } catch {
    return void 0;
  }
  return void 0;
}
const storageKey = "tsr-scroll-restoration-v1_3";
const throttle = (fn, wait) => {
  let timeout;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn(...args);
        timeout = null;
      }, wait);
    }
  };
};
function createScrollRestorationCache() {
  const safeSessionStorage = getSafeSessionStorage();
  if (!safeSessionStorage) {
    return void 0;
  }
  const persistedState = safeSessionStorage.getItem(storageKey);
  let state = persistedState ? JSON.parse(persistedState) : {};
  return {
    state,
    // This setter is simply to make sure that we set the sessionStorage right
    // after the state is updated. It doesn't necessarily need to be a functional
    // update.
    set: (updater) => (state = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.functionalUpdate)(updater, state) || state, safeSessionStorage.setItem(storageKey, JSON.stringify(state)))
  };
}
const scrollRestorationCache = createScrollRestorationCache();
const defaultGetScrollRestorationKey = (location) => {
  return location.state.__TSR_key || location.href;
};
function getCssSelector(el) {
  const path = [];
  let parent;
  while (parent = el.parentNode) {
    path.unshift(
      `${el.tagName}:nth-child(${[].indexOf.call(parent.children, el) + 1})`
    );
    el = parent;
  }
  return `${path.join(" > ")}`.toLowerCase();
}
let ignoreScroll = false;
function restoreScroll({
  storageKey: storageKey2,
  key,
  behavior,
  shouldScrollRestoration,
  scrollToTopSelectors,
  location
}) {
  var _a;
  let byKey;
  try {
    byKey = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
  } catch (error) {
    console.error(error);
    return;
  }
  const resolvedKey = key || ((_a = window.history.state) == null ? void 0 : _a.key);
  const elementEntries = byKey[resolvedKey];
  ignoreScroll = true;
  (() => {
    if (shouldScrollRestoration && elementEntries && Object.keys(elementEntries).length > 0) {
      for (const elementSelector in elementEntries) {
        const entry = elementEntries[elementSelector];
        if (elementSelector === "window") {
          window.scrollTo({
            top: entry.scrollY,
            left: entry.scrollX,
            behavior
          });
        } else if (elementSelector) {
          const element = document.querySelector(elementSelector);
          if (element) {
            element.scrollLeft = entry.scrollX;
            element.scrollTop = entry.scrollY;
          }
        }
      }
      return;
    }
    const hash = (location ?? window.location).hash.split("#")[1];
    if (hash) {
      const hashScrollIntoViewOptions = (window.history.state || {}).__hashScrollIntoViewOptions ?? true;
      if (hashScrollIntoViewOptions) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView(hashScrollIntoViewOptions);
        }
      }
      return;
    }
    [
      "window",
      ...(scrollToTopSelectors == null ? void 0 : scrollToTopSelectors.filter((d) => d !== "window")) ?? []
    ].forEach((selector) => {
      const element = selector === "window" ? window : typeof selector === "function" ? selector() : document.querySelector(selector);
      if (element) {
        element.scrollTo({
          top: 0,
          left: 0,
          behavior
        });
      }
    });
  })();
  ignoreScroll = false;
}
function setupScrollRestoration(router, force) {
  if (scrollRestorationCache === void 0) {
    return;
  }
  const shouldScrollRestoration = force ?? router.options.scrollRestoration ?? false;
  if (shouldScrollRestoration) {
    router.isScrollRestoring = true;
  }
  if (typeof document === "undefined" || router.isScrollRestorationSetup) {
    return;
  }
  router.isScrollRestorationSetup = true;
  ignoreScroll = false;
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  window.history.scrollRestoration = "manual";
  const onScroll = (event) => {
    if (ignoreScroll || !router.isScrollRestoring) {
      return;
    }
    let elementSelector = "";
    if (event.target === document || event.target === window) {
      elementSelector = "window";
    } else {
      const attrId = event.target.getAttribute(
        "data-scroll-restoration-id"
      );
      if (attrId) {
        elementSelector = `[data-scroll-restoration-id="${attrId}"]`;
      } else {
        elementSelector = getCssSelector(event.target);
      }
    }
    const restoreKey = getKey(router.state.location);
    scrollRestorationCache.set((state) => {
      const keyEntry = state[restoreKey] = state[restoreKey] || {};
      const elementEntry = keyEntry[elementSelector] = keyEntry[elementSelector] || {};
      if (elementSelector === "window") {
        elementEntry.scrollX = window.scrollX || 0;
        elementEntry.scrollY = window.scrollY || 0;
      } else if (elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
          elementEntry.scrollX = element.scrollLeft || 0;
          elementEntry.scrollY = element.scrollTop || 0;
        }
      }
      return state;
    });
  };
  if (typeof document !== "undefined") {
    document.addEventListener("scroll", throttle(onScroll, 100), true);
  }
  router.subscribe("onRendered", (event) => {
    const cacheKey = getKey(event.toLocation);
    if (!router.resetNextScroll) {
      router.resetNextScroll = true;
      return;
    }
    restoreScroll({
      storageKey,
      key: cacheKey,
      behavior: router.options.scrollRestorationBehavior,
      shouldScrollRestoration: router.isScrollRestoring,
      scrollToTopSelectors: router.options.scrollToTopSelectors,
      location: router.history.location
    });
    if (router.isScrollRestoring) {
      scrollRestorationCache.set((state) => {
        state[cacheKey] = state[cacheKey] || {};
        return state;
      });
    }
  });
}
function handleHashScroll(router) {
  if (typeof document !== "undefined" && document.querySelector) {
    const hashScrollIntoViewOptions = router.state.location.state.__hashScrollIntoViewOptions ?? true;
    if (hashScrollIntoViewOptions && router.state.location.hash !== "") {
      const el = document.getElementById(router.state.location.hash);
      if (el) {
        el.scrollIntoView(hashScrollIntoViewOptions);
      }
    }
  }
}

//# sourceMappingURL=scroll-restoration.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/searchParams.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/searchParams.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultParseSearch: () => (/* binding */ defaultParseSearch),
/* harmony export */   defaultStringifySearch: () => (/* binding */ defaultStringifySearch),
/* harmony export */   parseSearchWith: () => (/* binding */ parseSearchWith),
/* harmony export */   stringifySearchWith: () => (/* binding */ stringifySearchWith)
/* harmony export */ });
/* harmony import */ var _qss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qss.js */ "./node_modules/@tanstack/router-core/dist/esm/qss.js");

const defaultParseSearch = parseSearchWith(JSON.parse);
const defaultStringifySearch = stringifySearchWith(
  JSON.stringify,
  JSON.parse
);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr.substring(0, 1) === "?") {
      searchStr = searchStr.substring(1);
    }
    const query = (0,_qss_js__WEBPACK_IMPORTED_MODULE_0__.decode)(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        try {
          query[key] = parser(value);
        } catch (err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) {
      try {
        return stringify(val);
      } catch (err) {
      }
    } else if (typeof val === "string" && typeof parser === "function") {
      try {
        parser(val);
        return stringify(val);
      } catch (err) {
      }
    }
    return val;
  }
  return (search) => {
    search = { ...search };
    Object.keys(search).forEach((key) => {
      const val = search[key];
      if (typeof val === "undefined" || val === void 0) {
        delete search[key];
      } else {
        search[key] = stringifyValue(val);
      }
    });
    const searchStr = (0,_qss_js__WEBPACK_IMPORTED_MODULE_0__.encode)(search).toString();
    return searchStr ? `?${searchStr}` : "";
  };
}

//# sourceMappingURL=searchParams.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createControlledPromise: () => (/* binding */ createControlledPromise),
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   escapeJSON: () => (/* binding */ escapeJSON),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   isModuleNotFoundError: () => (/* binding */ isModuleNotFoundError),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   last: () => (/* binding */ last),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   shallow: () => (/* binding */ shallow)
/* harmony export */ });
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d) {
  return typeof d === "function";
}
function functionalUpdate(updater, previous) {
  if (isFunction(updater)) {
    return updater(previous);
  }
  return updater;
}
function pick(parent, keys) {
  return keys.reduce((obj, key) => {
    obj[key] = parent[key];
    return obj;
  }, {});
}
function replaceEqualDeep(prev, _next) {
  if (prev === _next) {
    return prev;
  }
  const next = _next;
  const array = isPlainArray(prev) && isPlainArray(next);
  if (array || isSimplePlainObject(prev) && isSimplePlainObject(next)) {
    const prevItems = array ? prev : Object.keys(prev).concat(
      Object.getOwnPropertySymbols(prev)
    );
    const prevSize = prevItems.length;
    const nextItems = array ? next : Object.keys(next).concat(
      Object.getOwnPropertySymbols(next)
    );
    const nextSize = nextItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < nextSize; i++) {
      const key = array ? i : nextItems[i];
      if ((!array && prevItems.includes(key) || array) && prev[key] === void 0 && next[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(prev[key], next[key]);
        if (copy[key] === prev[key] && prev[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return prevSize === nextSize && equalItems === prevSize ? prev : copy;
  }
  return next;
}
function isSimplePlainObject(o) {
  return (
    // all the checks from isPlainObject are more likely to hit so we perform them first
    isPlainObject(o) && Object.getOwnPropertyNames(o).length === Object.keys(o).length
  );
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function getObjectKeys(obj, ignoreUndefined) {
  let keys = Object.keys(obj);
  if (ignoreUndefined) {
    keys = keys.filter((key) => obj[key] !== void 0);
  }
  return keys;
}
function deepEqual(a, b, opts) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ignoreUndefined = (opts == null ? void 0 : opts.ignoreUndefined) ?? true;
    const aKeys = getObjectKeys(a, ignoreUndefined);
    const bKeys = getObjectKeys(b, ignoreUndefined);
    if (!(opts == null ? void 0 : opts.partial) && aKeys.length !== bKeys.length) {
      return false;
    }
    return bKeys.every((key) => deepEqual(a[key], b[key], opts));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return !a.some((item, index) => !deepEqual(item, b[index], opts));
  }
  return false;
}
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = "pending";
  controlledPromise.resolve = (value) => {
    controlledPromise.status = "resolved";
    controlledPromise.value = value;
    resolveLoadPromise(value);
    onResolve == null ? void 0 : onResolve(value);
  };
  controlledPromise.reject = (e) => {
    controlledPromise.status = "rejected";
    rejectLoadPromise(e);
  };
  return controlledPromise;
}
function escapeJSON(jsonString) {
  return jsonString.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const item of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, item) || !Object.is(objA[item], objB[item])) {
      return false;
    }
  }
  return true;
}
function isModuleNotFoundError(error) {
  if (typeof (error == null ? void 0 : error.message) !== "string") return false;
  return error.message.startsWith("Failed to fetch dynamically imported module") || error.message.startsWith("error loading dynamically imported module") || error.message.startsWith("Importing a module script failed");
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/derived.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/derived.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* binding */ Derived)
/* harmony export */ });
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");


class Derived {
  constructor(options) {
    this.listeners = /* @__PURE__ */ new Set();
    this._subscriptions = [];
    this.lastSeenDepValues = [];
    this.getDepVals = () => {
      const prevDepVals = [];
      const currDepVals = [];
      for (const dep of this.options.deps) {
        prevDepVals.push(dep.prevState);
        currDepVals.push(dep.state);
      }
      this.lastSeenDepValues = currDepVals;
      return {
        prevDepVals,
        currDepVals,
        prevVal: this.prevState ?? void 0
      };
    };
    this.recompute = () => {
      var _a, _b;
      this.prevState = this.state;
      const { prevDepVals, currDepVals, prevVal } = this.getDepVals();
      this.state = this.options.fn({
        prevDepVals,
        currDepVals,
        prevVal
      });
      (_b = (_a = this.options).onUpdate) == null ? void 0 : _b.call(_a);
    };
    this.checkIfRecalculationNeededDeeply = () => {
      for (const dep of this.options.deps) {
        if (dep instanceof Derived) {
          dep.checkIfRecalculationNeededDeeply();
        }
      }
      let shouldRecompute = false;
      const lastSeenDepValues = this.lastSeenDepValues;
      const { currDepVals } = this.getDepVals();
      for (let i = 0; i < currDepVals.length; i++) {
        if (currDepVals[i] !== lastSeenDepValues[i]) {
          shouldRecompute = true;
          break;
        }
      }
      if (shouldRecompute) {
        this.recompute();
      }
    };
    this.mount = () => {
      this.registerOnGraph();
      this.checkIfRecalculationNeededDeeply();
      return () => {
        this.unregisterFromGraph();
        for (const cleanup of this._subscriptions) {
          cleanup();
        }
      };
    };
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options).onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.options = options;
    this.state = options.fn({
      prevDepVals: void 0,
      prevVal: void 0,
      currDepVals: this.getDepVals().currDepVals
    });
  }
  registerOnGraph(deps = this.options.deps) {
    for (const dep of deps) {
      if (dep instanceof Derived) {
        dep.registerOnGraph();
        this.registerOnGraph(dep.options.deps);
      } else if (dep instanceof _store_js__WEBPACK_IMPORTED_MODULE_0__.Store) {
        let relatedLinkedDerivedVals = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.get(dep);
        if (!relatedLinkedDerivedVals) {
          relatedLinkedDerivedVals = /* @__PURE__ */ new Set();
          _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.set(dep, relatedLinkedDerivedVals);
        }
        relatedLinkedDerivedVals.add(this);
        let relatedStores = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.get(this);
        if (!relatedStores) {
          relatedStores = /* @__PURE__ */ new Set();
          _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.set(this, relatedStores);
        }
        relatedStores.add(dep);
      }
    }
  }
  unregisterFromGraph(deps = this.options.deps) {
    for (const dep of deps) {
      if (dep instanceof Derived) {
        this.unregisterFromGraph(dep.options.deps);
      } else if (dep instanceof _store_js__WEBPACK_IMPORTED_MODULE_0__.Store) {
        const relatedLinkedDerivedVals = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.get(dep);
        if (relatedLinkedDerivedVals) {
          relatedLinkedDerivedVals.delete(this);
        }
        const relatedStores = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.get(this);
        if (relatedStores) {
          relatedStores.delete(dep);
        }
      }
    }
  }
}

//# sourceMappingURL=derived.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/effect.js":
/*!*********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/effect.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Effect: () => (/* binding */ Effect)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");

class Effect {
  constructor(opts) {
    const { eager, fn, ...derivedProps } = opts;
    this._derived = new _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived({
      ...derivedProps,
      fn: () => {
      },
      onUpdate() {
        fn();
      }
    });
    if (eager) {
      fn();
    }
  }
  mount() {
    return this._derived.mount();
  }
}

//# sourceMappingURL=effect.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* reexport safe */ _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived),
/* harmony export */   Effect: () => (/* reexport safe */ _effect_js__WEBPACK_IMPORTED_MODULE_1__.Effect),
/* harmony export */   Store: () => (/* reexport safe */ _store_js__WEBPACK_IMPORTED_MODULE_2__.Store),
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__derivedToStore),
/* harmony export */   __flush: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__flush),
/* harmony export */   __storeToDerived: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__storeToDerived),
/* harmony export */   batch: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.batch)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");
/* harmony import */ var _effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect.js */ "./node_modules/@tanstack/store/dist/esm/effect.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");





//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/scheduler.js":
/*!************************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/scheduler.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* binding */ __depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* binding */ __derivedToStore),
/* harmony export */   __flush: () => (/* binding */ __flush),
/* harmony export */   __storeToDerived: () => (/* binding */ __storeToDerived),
/* harmony export */   batch: () => (/* binding */ batch)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");

const __storeToDerived = /* @__PURE__ */ new WeakMap();
const __derivedToStore = /* @__PURE__ */ new WeakMap();
const __depsThatHaveWrittenThisTick = {
  current: []
};
let __isFlushing = false;
let __batchDepth = 0;
const __pendingUpdates = /* @__PURE__ */ new Set();
const __initialBatchValues = /* @__PURE__ */ new Map();
function __flush_internals(relatedVals) {
  const sorted = Array.from(relatedVals).sort((a, b) => {
    if (a instanceof _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived && a.options.deps.includes(b)) return 1;
    if (b instanceof _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived && b.options.deps.includes(a)) return -1;
    return 0;
  });
  for (const derived of sorted) {
    if (__depsThatHaveWrittenThisTick.current.includes(derived)) {
      continue;
    }
    __depsThatHaveWrittenThisTick.current.push(derived);
    derived.recompute();
    const stores = __derivedToStore.get(derived);
    if (stores) {
      for (const store of stores) {
        const relatedLinkedDerivedVals = __storeToDerived.get(store);
        if (!relatedLinkedDerivedVals) continue;
        __flush_internals(relatedLinkedDerivedVals);
      }
    }
  }
}
function __notifyListeners(store) {
  store.listeners.forEach(
    (listener) => listener({
      prevVal: store.prevState,
      currentVal: store.state
    })
  );
}
function __notifyDerivedListeners(derived) {
  derived.listeners.forEach(
    (listener) => listener({
      prevVal: derived.prevState,
      currentVal: derived.state
    })
  );
}
function __flush(store) {
  if (__batchDepth > 0 && !__initialBatchValues.has(store)) {
    __initialBatchValues.set(store, store.prevState);
  }
  __pendingUpdates.add(store);
  if (__batchDepth > 0) return;
  if (__isFlushing) return;
  try {
    __isFlushing = true;
    while (__pendingUpdates.size > 0) {
      const stores = Array.from(__pendingUpdates);
      __pendingUpdates.clear();
      for (const store2 of stores) {
        const prevState = __initialBatchValues.get(store2) ?? store2.prevState;
        store2.prevState = prevState;
        __notifyListeners(store2);
      }
      for (const store2 of stores) {
        const derivedVals = __storeToDerived.get(store2);
        if (!derivedVals) continue;
        __depsThatHaveWrittenThisTick.current.push(store2);
        __flush_internals(derivedVals);
      }
      for (const store2 of stores) {
        const derivedVals = __storeToDerived.get(store2);
        if (!derivedVals) continue;
        for (const derived of derivedVals) {
          __notifyDerivedListeners(derived);
        }
      }
    }
  } finally {
    __isFlushing = false;
    __depsThatHaveWrittenThisTick.current = [];
    __initialBatchValues.clear();
  }
}
function batch(fn) {
  __batchDepth++;
  try {
    fn();
  } finally {
    __batchDepth--;
    if (__batchDepth === 0) {
      const pendingUpdateToFlush = Array.from(__pendingUpdates)[0];
      if (pendingUpdateToFlush) {
        __flush(pendingUpdateToFlush);
      }
    }
  }
}

//# sourceMappingURL=scheduler.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/store.js":
/*!********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/store.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");

class Store {
  constructor(initialState, options) {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options) == null ? void 0 : _a.onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.setState = (updater) => {
      var _a, _b, _c;
      this.prevState = this.state;
      this.state = ((_a = this.options) == null ? void 0 : _a.updateFn) ? this.options.updateFn(this.prevState)(updater) : updater(this.prevState);
      (_c = (_b = this.options) == null ? void 0 : _b.onUpdate) == null ? void 0 : _c.call(_b);
      (0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.__flush)(this);
    };
    this.prevState = initialState;
    this.state = initialState;
    this.options = options;
  }
}

//# sourceMappingURL=store.js.map


/***/ }),

/***/ "./node_modules/clsx/dist/clsx.mjs":
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/esm/tiny-invariant.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invariant)
/* harmony export */ });
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}




/***/ })

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"dlx-pw-patterns-view": 0,
/******/ 			"./style-dlx-pw-patterns-view": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkpattern_wrangler"] = globalThis["webpackChunkpattern_wrangler"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-dlx-pw-patterns-view"], () => (__webpack_require__("./src/js/react/views/patterns/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=dlx-pw-patterns-view.js.map