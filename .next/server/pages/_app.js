/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./lib/store.ts":
/*!**********************!*\
  !*** ./lib/store.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LOCAL_STORAGE_KEY_DISLIKED: () => (/* binding */ LOCAL_STORAGE_KEY_DISLIKED),\n/* harmony export */   LOCAL_STORAGE_KEY_LIKED: () => (/* binding */ LOCAL_STORAGE_KEY_LIKED),\n/* harmony export */   useRepurposedStore: () => (/* binding */ useRepurposedStore)\n/* harmony export */ });\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ \"zustand\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__]);\nzustand__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst LOCAL_STORAGE_KEY_LIKED = 'liked';\nconst LOCAL_STORAGE_KEY_DISLIKED = 'disliked';\nconst useRepurposedStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((set, get)=>({\n        liked: new Set(),\n        disliked: new Set(),\n        _updateLiked: (liked)=>{\n            set(()=>({\n                    liked\n                }));\n            localStorage.setItem(LOCAL_STORAGE_KEY_LIKED, JSON.stringify([\n                ...liked.values()\n            ]));\n        },\n        _updateDisliked: (disliked)=>{\n            set(()=>({\n                    disliked\n                }));\n            localStorage.setItem(LOCAL_STORAGE_KEY_DISLIKED, JSON.stringify([\n                ...disliked.values()\n            ]));\n        },\n        addLiked: (liked)=>{\n            get()._updateLiked(new Set([\n                ...get().liked,\n                liked\n            ]));\n        },\n        addDisliked: (disliked)=>get()._updateDisliked(new Set([\n                ...get().disliked,\n                disliked\n            ])),\n        removeLiked: (likedId)=>{\n            const liked = get().liked;\n            if (liked.delete(likedId)) get()._updateLiked(new Set([\n                ...liked\n            ]));\n        },\n        removeDisliked: (disliked)=>get()._updateDisliked(new Set([\n                ...get().disliked,\n                disliked\n            ]))\n    }));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvc3RvcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpQztBQUcxQixNQUFNQywwQkFBMEIsUUFBUTtBQUN4QyxNQUFNQyw2QkFBNkIsV0FBVztBQWU5QyxNQUFNQyxxQkFBcUJILCtDQUFNQSxDQUFrQixDQUFDSSxLQUFLQyxNQUFTO1FBQ3ZFQyxPQUFPLElBQUlDO1FBQ1hDLFVBQVUsSUFBSUQ7UUFDZEUsY0FBYyxDQUFDSDtZQUNiRixJQUFJLElBQU87b0JBQUVFO2dCQUFNO1lBQ25CSSxhQUFhQyxPQUFPLENBQUNWLHlCQUF5QlcsS0FBS0MsU0FBUyxDQUFDO21CQUFJUCxNQUFNUSxNQUFNO2FBQUc7UUFDbEY7UUFDQUMsaUJBQWlCLENBQUNQO1lBQ2hCSixJQUFJLElBQU87b0JBQUVJO2dCQUFTO1lBQ3RCRSxhQUFhQyxPQUFPLENBQUNULDRCQUE0QlUsS0FBS0MsU0FBUyxDQUFDO21CQUFJTCxTQUFTTSxNQUFNO2FBQUc7UUFDeEY7UUFDQUUsVUFBVSxDQUFDVjtZQUNURCxNQUFNSSxZQUFZLENBQUMsSUFBSUYsSUFBSTttQkFBSUYsTUFBTUMsS0FBSztnQkFBRUE7YUFBTTtRQUNwRDtRQUNBVyxhQUFhLENBQUNULFdBQWFILE1BQU1VLGVBQWUsQ0FBQyxJQUFJUixJQUFJO21CQUFJRixNQUFNRyxRQUFRO2dCQUFFQTthQUFTO1FBQ3RGVSxhQUFhLENBQUNDO1lBQ1osTUFBTWIsUUFBUUQsTUFBTUMsS0FBSztZQUN6QixJQUFJQSxNQUFNYyxNQUFNLENBQUNELFVBQVVkLE1BQU1JLFlBQVksQ0FBQyxJQUFJRixJQUFJO21CQUFJRDthQUFNO1FBQ2xFO1FBQ0FlLGdCQUFnQixDQUFDYixXQUFhSCxNQUFNVSxlQUFlLENBQUMsSUFBSVIsSUFBSTttQkFBSUYsTUFBTUcsUUFBUTtnQkFBRUE7YUFBUztJQUMzRixJQUFJIiwic291cmNlcyI6WyIvVXNlcnMvam9uYXN2YW5kZW5idWxja2UvRG9jdW1lbnRzL3JlcHMvSm9uYXNXYXJkL3JlcHVycG9zZWQvbGliL3N0b3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJ3p1c3RhbmQnO1xuaW1wb3J0IHsgSWQgfSBmcm9tICdAL2NvbnZleC9fZ2VuZXJhdGVkL2RhdGFNb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBMT0NBTF9TVE9SQUdFX0tFWV9MSUtFRCA9ICdsaWtlZCc7XG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlfRElTTElLRUQgPSAnZGlzbGlrZWQnO1xuXG50eXBlIExpc3RpbmdJZCA9IElkPCdsaXN0aW5ncyc+O1xuXG50eXBlIFJlcHVycG9zZWRTdG9yZSA9IHtcbiAgbGlrZWQ6IFNldDxMaXN0aW5nSWQ+O1xuICBkaXNsaWtlZDogU2V0PExpc3RpbmdJZD47XG4gIF91cGRhdGVMaWtlZDogKGxpa2VkOiBTZXQ8TGlzdGluZ0lkPikgPT4gdm9pZDtcbiAgX3VwZGF0ZURpc2xpa2VkOiAoZGlzbGlrZWQ6IFNldDxMaXN0aW5nSWQ+KSA9PiB2b2lkO1xuICBhZGRMaWtlZDogKGxpa2VkOiBMaXN0aW5nSWQpID0+IHZvaWQ7XG4gIGFkZERpc2xpa2VkOiAoZGlzbGlrZWQ6IExpc3RpbmdJZCkgPT4gdm9pZDtcbiAgcmVtb3ZlTGlrZWQ6IChsaWtlZElkOiBMaXN0aW5nSWQpID0+IHZvaWQ7XG4gIHJlbW92ZURpc2xpa2VkOiAoZGlzbGlrZWQ6IExpc3RpbmdJZCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VSZXB1cnBvc2VkU3RvcmUgPSBjcmVhdGU8UmVwdXJwb3NlZFN0b3JlPigoc2V0LCBnZXQpID0+ICh7XG4gIGxpa2VkOiBuZXcgU2V0KCksXG4gIGRpc2xpa2VkOiBuZXcgU2V0KCksXG4gIF91cGRhdGVMaWtlZDogKGxpa2VkKSA9PiB7XG4gICAgc2V0KCgpID0+ICh7IGxpa2VkIH0pKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWV9MSUtFRCwgSlNPTi5zdHJpbmdpZnkoWy4uLmxpa2VkLnZhbHVlcygpXSkpO1xuICB9LFxuICBfdXBkYXRlRGlzbGlrZWQ6IChkaXNsaWtlZCkgPT4ge1xuICAgIHNldCgoKSA9PiAoeyBkaXNsaWtlZCB9KSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlfRElTTElLRUQsIEpTT04uc3RyaW5naWZ5KFsuLi5kaXNsaWtlZC52YWx1ZXMoKV0pKTtcbiAgfSxcbiAgYWRkTGlrZWQ6IChsaWtlZCkgPT4ge1xuICAgIGdldCgpLl91cGRhdGVMaWtlZChuZXcgU2V0KFsuLi5nZXQoKS5saWtlZCwgbGlrZWRdKSk7XG4gIH0sXG4gIGFkZERpc2xpa2VkOiAoZGlzbGlrZWQpID0+IGdldCgpLl91cGRhdGVEaXNsaWtlZChuZXcgU2V0KFsuLi5nZXQoKS5kaXNsaWtlZCwgZGlzbGlrZWRdKSksXG4gIHJlbW92ZUxpa2VkOiAobGlrZWRJZCkgPT4ge1xuICAgIGNvbnN0IGxpa2VkID0gZ2V0KCkubGlrZWQ7XG4gICAgaWYgKGxpa2VkLmRlbGV0ZShsaWtlZElkKSkgZ2V0KCkuX3VwZGF0ZUxpa2VkKG5ldyBTZXQoWy4uLmxpa2VkXSkpO1xuICB9LFxuICByZW1vdmVEaXNsaWtlZDogKGRpc2xpa2VkKSA9PiBnZXQoKS5fdXBkYXRlRGlzbGlrZWQobmV3IFNldChbLi4uZ2V0KCkuZGlzbGlrZWQsIGRpc2xpa2VkXSkpXG59KSk7XG4iXSwibmFtZXMiOlsiY3JlYXRlIiwiTE9DQUxfU1RPUkFHRV9LRVlfTElLRUQiLCJMT0NBTF9TVE9SQUdFX0tFWV9ESVNMSUtFRCIsInVzZVJlcHVycG9zZWRTdG9yZSIsInNldCIsImdldCIsImxpa2VkIiwiU2V0IiwiZGlzbGlrZWQiLCJfdXBkYXRlTGlrZWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInZhbHVlcyIsIl91cGRhdGVEaXNsaWtlZCIsImFkZExpa2VkIiwiYWRkRGlzbGlrZWQiLCJyZW1vdmVMaWtlZCIsImxpa2VkSWQiLCJkZWxldGUiLCJyZW1vdmVEaXNsaWtlZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/store.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-i18next */ \"next-i18next\");\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals.css */ \"./pages/globals.css\");\n/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var convex_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! convex/react */ \"convex/react\");\n/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/store */ \"./lib/store.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([convex_react__WEBPACK_IMPORTED_MODULE_4__, _lib_store__WEBPACK_IMPORTED_MODULE_5__]);\n([convex_react__WEBPACK_IMPORTED_MODULE_4__, _lib_store__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst convex =  true ? new convex_react__WEBPACK_IMPORTED_MODULE_4__.ConvexReactClient(\"https://reliable-antelope-69.eu-west-1.convex.cloud\") : 0;\nconst RepurposedMarketplace = ({ Component, pageProps })=>{\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)({\n        \"RepurposedMarketplace.useEffect\": ()=>{\n            if (localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_LIKED)) {\n                _lib_store__WEBPACK_IMPORTED_MODULE_5__.useRepurposedStore.setState({\n                    \"RepurposedMarketplace.useEffect\": ()=>({\n                            liked: new Set(JSON.parse(localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_LIKED)))\n                        })\n                }[\"RepurposedMarketplace.useEffect\"]);\n            }\n            if (localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_DISLIKED)) {\n                _lib_store__WEBPACK_IMPORTED_MODULE_5__.useRepurposedStore.setState({\n                    \"RepurposedMarketplace.useEffect\": ()=>({\n                            disliked: new Set(JSON.parse(localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_DISLIKED)))\n                        })\n                }[\"RepurposedMarketplace.useEffect\"]);\n            }\n        }\n    }[\"RepurposedMarketplace.useEffect\"], []);\n    if (!convex) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/jonasvandenbulcke/Documents/reps/JonasWard/repurposed/pages/_app.tsx\",\n        lineNumber: 26,\n        columnNumber: 23\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(convex_react__WEBPACK_IMPORTED_MODULE_4__.ConvexProvider, {\n        client: convex,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/jonasvandenbulcke/Documents/reps/JonasWard/repurposed/pages/_app.tsx\",\n            lineNumber: 30,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/jonasvandenbulcke/Documents/reps/JonasWard/repurposed/pages/_app.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_i18next__WEBPACK_IMPORTED_MODULE_1__.appWithTranslation)(RepurposedMarketplace));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBa0Q7QUFDM0I7QUFDVztBQUMrQjtBQUVxQztBQUV0RyxNQUFNTyxTQUFTQyxLQUFrQyxHQUM3QyxJQUFJTCwyREFBaUJBLENBQUNLLHFEQUFrQyxJQUN4RCxDQUFJO0FBRVIsTUFBTUcsd0JBQXdCLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQXNDO0lBQ3pGWixnREFBU0E7MkNBQUM7WUFDUixJQUFJYSxhQUFhQyxPQUFPLENBQUNWLCtEQUF1QkEsR0FBRztnQkFDakRELDBEQUFrQkEsQ0FBQ1ksUUFBUTt1REFBQyxJQUFPOzRCQUNqQ0MsT0FBTyxJQUFJQyxJQUFJQyxLQUFLQyxLQUFLLENBQUNOLGFBQWFDLE9BQU8sQ0FBQ1YsK0RBQXVCQTt3QkFDeEU7O1lBQ0Y7WUFDQSxJQUFJUyxhQUFhQyxPQUFPLENBQUNULGtFQUEwQkEsR0FBRztnQkFDcERGLDBEQUFrQkEsQ0FBQ1ksUUFBUTt1REFBQyxJQUFPOzRCQUNqQ0ssVUFBVSxJQUFJSCxJQUFJQyxLQUFLQyxLQUFLLENBQUNOLGFBQWFDLE9BQU8sQ0FBQ1Qsa0VBQTBCQTt3QkFDOUU7O1lBQ0Y7UUFDRjswQ0FBRyxFQUFFO0lBRUwsSUFBSSxDQUFDQyxRQUFRLHFCQUFPLDhEQUFDSztRQUFXLEdBQUdDLFNBQVM7Ozs7OztJQUU1QyxxQkFDRSw4REFBQ1gsd0RBQWNBO1FBQUNvQixRQUFRZjtrQkFDdEIsNEVBQUNLO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQSxpRUFBZWIsZ0VBQWtCQSxDQUFDVyxzQkFBc0JBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb25hc3ZhbmRlbmJ1bGNrZS9Eb2N1bWVudHMvcmVwcy9Kb25hc1dhcmQvcmVwdXJwb3NlZC9wYWdlcy9fYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHBXaXRoVHJhbnNsYXRpb24gfSBmcm9tICduZXh0LWkxOG5leHQnO1xuaW1wb3J0ICcuL2dsb2JhbHMuY3NzJztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbnZleFByb3ZpZGVyLCBDb252ZXhSZWFjdENsaWVudCB9IGZyb20gJ2NvbnZleC9yZWFjdCc7XG5pbXBvcnQgeyBJZCB9IGZyb20gJ0AvY29udmV4L19nZW5lcmF0ZWQvZGF0YU1vZGVsJztcbmltcG9ydCB7IHVzZVJlcHVycG9zZWRTdG9yZSwgTE9DQUxfU1RPUkFHRV9LRVlfTElLRUQsIExPQ0FMX1NUT1JBR0VfS0VZX0RJU0xJS0VEIH0gZnJvbSAnQC9saWIvc3RvcmUnO1xuXG5jb25zdCBjb252ZXggPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19DT05WRVhfVVJMXG4gID8gbmV3IENvbnZleFJlYWN0Q2xpZW50KHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0NPTlZFWF9VUkwpXG4gIDogbnVsbDtcblxuY29uc3QgUmVwdXJwb3NlZE1hcmtldHBsYWNlID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogeyBDb21wb25lbnQ6IGFueTsgcGFnZVByb3BzOiBhbnkgfSkgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWV9MSUtFRCkpIHtcbiAgICAgIHVzZVJlcHVycG9zZWRTdG9yZS5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICBsaWtlZDogbmV3IFNldChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZX0xJS0VEKSEpIGFzIElkPCdsaXN0aW5ncyc+W10pXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWV9ESVNMSUtFRCkpIHtcbiAgICAgIHVzZVJlcHVycG9zZWRTdG9yZS5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICBkaXNsaWtlZDogbmV3IFNldChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZX0RJU0xJS0VEKSEpIGFzIElkPCdsaXN0aW5ncyc+W10pXG4gICAgICB9KSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgaWYgKCFjb252ZXgpIHJldHVybiA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+O1xuXG4gIHJldHVybiAoXG4gICAgPENvbnZleFByb3ZpZGVyIGNsaWVudD17Y29udmV4fT5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0NvbnZleFByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwV2l0aFRyYW5zbGF0aW9uKFJlcHVycG9zZWRNYXJrZXRwbGFjZSk7XG4iXSwibmFtZXMiOlsiYXBwV2l0aFRyYW5zbGF0aW9uIiwidXNlRWZmZWN0IiwiQ29udmV4UHJvdmlkZXIiLCJDb252ZXhSZWFjdENsaWVudCIsInVzZVJlcHVycG9zZWRTdG9yZSIsIkxPQ0FMX1NUT1JBR0VfS0VZX0xJS0VEIiwiTE9DQUxfU1RPUkFHRV9LRVlfRElTTElLRUQiLCJjb252ZXgiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQ09OVkVYX1VSTCIsIlJlcHVycG9zZWRNYXJrZXRwbGFjZSIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRTdGF0ZSIsImxpa2VkIiwiU2V0IiwiSlNPTiIsInBhcnNlIiwiZGlzbGlrZWQiLCJjbGllbnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./pages/globals.css":
/*!***************************!*\
  !*** ./pages/globals.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "next-i18next":
/*!*******************************!*\
  !*** external "next-i18next" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-i18next");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "convex/react":
/*!*******************************!*\
  !*** external "convex/react" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("convex/react");;

/***/ }),

/***/ "zustand":
/*!**************************!*\
  !*** external "zustand" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = import("zustand");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();