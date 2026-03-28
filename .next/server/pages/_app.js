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
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LOCAL_STORAGE_KEY_DISLIKED: () => (/* binding */ LOCAL_STORAGE_KEY_DISLIKED),\n/* harmony export */   LOCAL_STORAGE_KEY_LIKED: () => (/* binding */ LOCAL_STORAGE_KEY_LIKED),\n/* harmony export */   useRepurposedStore: () => (/* binding */ useRepurposedStore)\n/* harmony export */ });\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ \"zustand\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zustand__WEBPACK_IMPORTED_MODULE_0__]);\nzustand__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst LOCAL_STORAGE_KEY_LIKED = 'liked';\nconst LOCAL_STORAGE_KEY_DISLIKED = 'disliked';\nconst useRepurposedStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)((set, get)=>({\n        liked: new Set(),\n        disliked: new Set(),\n        _updateLiked: (liked)=>{\n            set(()=>({\n                    liked\n                }));\n            localStorage.setItem(LOCAL_STORAGE_KEY_LIKED, JSON.stringify([\n                ...liked.values()\n            ]));\n        },\n        _updateDisliked: (disliked)=>{\n            set(()=>({\n                    disliked\n                }));\n            localStorage.setItem(LOCAL_STORAGE_KEY_DISLIKED, JSON.stringify([\n                ...disliked.values()\n            ]));\n        },\n        addLiked: (liked)=>{\n            get()._updateLiked(new Set([\n                ...get().liked,\n                liked\n            ]));\n        },\n        addDisliked: (disliked)=>get()._updateDisliked(new Set([\n                ...get().disliked,\n                disliked\n            ])),\n        removeLiked: (likedId)=>{\n            const liked = get().liked;\n            if (liked.delete(likedId)) get()._updateLiked(new Set([\n                ...liked\n            ]));\n        },\n        removeDisliked: (disliked)=>get()._updateDisliked(new Set([\n                ...get().disliked,\n                disliked\n            ]))\n    }));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvc3RvcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpQztBQUUxQixNQUFNQywwQkFBMEIsUUFBUTtBQUN4QyxNQUFNQyw2QkFBNkIsV0FBVztBQWE5QyxNQUFNQyxxQkFBcUJILCtDQUFNQSxDQUFrQixDQUFDSSxLQUFLQyxNQUFTO1FBQ3ZFQyxPQUFPLElBQUlDO1FBQ1hDLFVBQVUsSUFBSUQ7UUFDZEUsY0FBYyxDQUFDSDtZQUNiRixJQUFJLElBQU87b0JBQUVFO2dCQUFNO1lBQ25CSSxhQUFhQyxPQUFPLENBQUNWLHlCQUF5QlcsS0FBS0MsU0FBUyxDQUFDO21CQUFJUCxNQUFNUSxNQUFNO2FBQUc7UUFDbEY7UUFDQUMsaUJBQWlCLENBQUNQO1lBQ2hCSixJQUFJLElBQU87b0JBQUVJO2dCQUFTO1lBQ3RCRSxhQUFhQyxPQUFPLENBQUNULDRCQUE0QlUsS0FBS0MsU0FBUyxDQUFDO21CQUFJTCxTQUFTTSxNQUFNO2FBQUc7UUFDeEY7UUFDQUUsVUFBVSxDQUFDVjtZQUNURCxNQUFNSSxZQUFZLENBQUMsSUFBSUYsSUFBSTttQkFBSUYsTUFBTUMsS0FBSztnQkFBRUE7YUFBTTtRQUNwRDtRQUNBVyxhQUFhLENBQUNULFdBQWFILE1BQU1VLGVBQWUsQ0FBQyxJQUFJUixJQUFJO21CQUFJRixNQUFNRyxRQUFRO2dCQUFFQTthQUFTO1FBQ3RGVSxhQUFhLENBQUNDO1lBQ1osTUFBTWIsUUFBUUQsTUFBTUMsS0FBSztZQUN6QixJQUFJQSxNQUFNYyxNQUFNLENBQUNELFVBQVVkLE1BQU1JLFlBQVksQ0FBQyxJQUFJRixJQUFJO21CQUFJRDthQUFNO1FBQ2xFO1FBQ0FlLGdCQUFnQixDQUFDYixXQUFhSCxNQUFNVSxlQUFlLENBQUMsSUFBSVIsSUFBSTttQkFBSUYsTUFBTUcsUUFBUTtnQkFBRUE7YUFBUztJQUMzRixJQUFJIiwic291cmNlcyI6WyIvVXNlcnMvam9uYXN2YW5kZW5idWxja2UvRG9jdW1lbnRzL3JlcHMvSm9uYXNXYXJkL3JlcHVycG9zZWQvbGliL3N0b3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZSB9IGZyb20gJ3p1c3RhbmQnO1xuXG5leHBvcnQgY29uc3QgTE9DQUxfU1RPUkFHRV9LRVlfTElLRUQgPSAnbGlrZWQnO1xuZXhwb3J0IGNvbnN0IExPQ0FMX1NUT1JBR0VfS0VZX0RJU0xJS0VEID0gJ2Rpc2xpa2VkJztcblxudHlwZSBSZXB1cnBvc2VkU3RvcmUgPSB7XG4gIGxpa2VkOiBTZXQ8bnVtYmVyPjtcbiAgZGlzbGlrZWQ6IFNldDxudW1iZXI+O1xuICBfdXBkYXRlTGlrZWQ6IChsaWtlZDogU2V0PG51bWJlcj4pID0+IHZvaWQ7XG4gIF91cGRhdGVEaXNsaWtlZDogKGRpc2xpa2VkOiBTZXQ8bnVtYmVyPikgPT4gdm9pZDtcbiAgYWRkTGlrZWQ6IChsaWtlZDogbnVtYmVyKSA9PiB2b2lkO1xuICBhZGREaXNsaWtlZDogKGRpc2xpa2VkOiBudW1iZXIpID0+IHZvaWQ7XG4gIHJlbW92ZUxpa2VkOiAobGlrZWRJZDogbnVtYmVyKSA9PiB2b2lkO1xuICByZW1vdmVEaXNsaWtlZDogKGRpc2xpa2VkOiBudW1iZXIpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlUmVwdXJwb3NlZFN0b3JlID0gY3JlYXRlPFJlcHVycG9zZWRTdG9yZT4oKHNldCwgZ2V0KSA9PiAoe1xuICBsaWtlZDogbmV3IFNldCgpLFxuICBkaXNsaWtlZDogbmV3IFNldCgpLFxuICBfdXBkYXRlTGlrZWQ6IChsaWtlZCkgPT4ge1xuICAgIHNldCgoKSA9PiAoeyBsaWtlZCB9KSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlfTElLRUQsIEpTT04uc3RyaW5naWZ5KFsuLi5saWtlZC52YWx1ZXMoKV0pKTtcbiAgfSxcbiAgX3VwZGF0ZURpc2xpa2VkOiAoZGlzbGlrZWQpID0+IHtcbiAgICBzZXQoKCkgPT4gKHsgZGlzbGlrZWQgfSkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZX0RJU0xJS0VELCBKU09OLnN0cmluZ2lmeShbLi4uZGlzbGlrZWQudmFsdWVzKCldKSk7XG4gIH0sXG4gIGFkZExpa2VkOiAobGlrZWQpID0+IHtcbiAgICBnZXQoKS5fdXBkYXRlTGlrZWQobmV3IFNldChbLi4uZ2V0KCkubGlrZWQsIGxpa2VkXSkpO1xuICB9LFxuICBhZGREaXNsaWtlZDogKGRpc2xpa2VkKSA9PiBnZXQoKS5fdXBkYXRlRGlzbGlrZWQobmV3IFNldChbLi4uZ2V0KCkuZGlzbGlrZWQsIGRpc2xpa2VkXSkpLFxuICByZW1vdmVMaWtlZDogKGxpa2VkSWQpID0+IHtcbiAgICBjb25zdCBsaWtlZCA9IGdldCgpLmxpa2VkO1xuICAgIGlmIChsaWtlZC5kZWxldGUobGlrZWRJZCkpIGdldCgpLl91cGRhdGVMaWtlZChuZXcgU2V0KFsuLi5saWtlZF0pKTtcbiAgfSxcbiAgcmVtb3ZlRGlzbGlrZWQ6IChkaXNsaWtlZCkgPT4gZ2V0KCkuX3VwZGF0ZURpc2xpa2VkKG5ldyBTZXQoWy4uLmdldCgpLmRpc2xpa2VkLCBkaXNsaWtlZF0pKVxufSkpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkxPQ0FMX1NUT1JBR0VfS0VZX0xJS0VEIiwiTE9DQUxfU1RPUkFHRV9LRVlfRElTTElLRUQiLCJ1c2VSZXB1cnBvc2VkU3RvcmUiLCJzZXQiLCJnZXQiLCJsaWtlZCIsIlNldCIsImRpc2xpa2VkIiwiX3VwZGF0ZUxpa2VkIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWx1ZXMiLCJfdXBkYXRlRGlzbGlrZWQiLCJhZGRMaWtlZCIsImFkZERpc2xpa2VkIiwicmVtb3ZlTGlrZWQiLCJsaWtlZElkIiwiZGVsZXRlIiwicmVtb3ZlRGlzbGlrZWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/store.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-i18next */ \"next-i18next\");\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals.css */ \"./pages/globals.css\");\n/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var convex_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! convex/react */ \"convex/react\");\n/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/store */ \"./lib/store.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([convex_react__WEBPACK_IMPORTED_MODULE_4__, _lib_store__WEBPACK_IMPORTED_MODULE_5__]);\n([convex_react__WEBPACK_IMPORTED_MODULE_4__, _lib_store__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst convex =  true ? new convex_react__WEBPACK_IMPORTED_MODULE_4__.ConvexReactClient(\"https://reliable-antelope-69.eu-west-1.convex.cloud\") : 0;\nconst RepurposedMarketplace = ({ Component, pageProps })=>{\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)({\n        \"RepurposedMarketplace.useEffect\": ()=>{\n            if (localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_LIKED)) {\n                _lib_store__WEBPACK_IMPORTED_MODULE_5__.useRepurposedStore.setState({\n                    \"RepurposedMarketplace.useEffect\": ()=>({\n                            liked: new Set(JSON.parse(localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_LIKED)))\n                        })\n                }[\"RepurposedMarketplace.useEffect\"]);\n            }\n            if (localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_DISLIKED)) {\n                _lib_store__WEBPACK_IMPORTED_MODULE_5__.useRepurposedStore.setState({\n                    \"RepurposedMarketplace.useEffect\": ()=>({\n                            disliked: new Set(JSON.parse(localStorage.getItem(_lib_store__WEBPACK_IMPORTED_MODULE_5__.LOCAL_STORAGE_KEY_DISLIKED)))\n                        })\n                }[\"RepurposedMarketplace.useEffect\"]);\n            }\n        }\n    }[\"RepurposedMarketplace.useEffect\"], []);\n    if (!convex) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/jonasvandenbulcke/Documents/reps/JonasWard/repurposed/pages/_app.tsx\",\n        lineNumber: 26,\n        columnNumber: 23\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(convex_react__WEBPACK_IMPORTED_MODULE_4__.ConvexProvider, {\n        client: convex,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/jonasvandenbulcke/Documents/reps/JonasWard/repurposed/pages/_app.tsx\",\n            lineNumber: 30,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/jonasvandenbulcke/Documents/reps/JonasWard/repurposed/pages/_app.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_i18next__WEBPACK_IMPORTED_MODULE_1__.appWithTranslation)(RepurposedMarketplace));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBa0Q7QUFDM0I7QUFFVztBQUMrQjtBQUNxQztBQUV0RyxNQUFNTyxTQUFTQyxLQUFrQyxHQUM3QyxJQUFJTCwyREFBaUJBLENBQUNLLHFEQUFrQyxJQUN4RCxDQUFJO0FBRVIsTUFBTUcsd0JBQXdCLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQXNDO0lBQ3pGWixnREFBU0E7MkNBQUM7WUFDUixJQUFJYSxhQUFhQyxPQUFPLENBQUNWLCtEQUF1QkEsR0FBRztnQkFDakRELDBEQUFrQkEsQ0FBQ1ksUUFBUTt1REFBQyxJQUFPOzRCQUNqQ0MsT0FBTyxJQUFJQyxJQUFJQyxLQUFLQyxLQUFLLENBQUNOLGFBQWFDLE9BQU8sQ0FBQ1YsK0RBQXVCQTt3QkFDeEU7O1lBQ0Y7WUFDQSxJQUFJUyxhQUFhQyxPQUFPLENBQUNULGtFQUEwQkEsR0FBRztnQkFDcERGLDBEQUFrQkEsQ0FBQ1ksUUFBUTt1REFBQyxJQUFPOzRCQUNqQ0ssVUFBVSxJQUFJSCxJQUFJQyxLQUFLQyxLQUFLLENBQUNOLGFBQWFDLE9BQU8sQ0FBQ1Qsa0VBQTBCQTt3QkFDOUU7O1lBQ0Y7UUFDRjswQ0FBRyxFQUFFO0lBRUwsSUFBSSxDQUFDQyxRQUFRLHFCQUFPLDhEQUFDSztRQUFXLEdBQUdDLFNBQVM7Ozs7OztJQUU1QyxxQkFDRSw4REFBQ1gsd0RBQWNBO1FBQUNvQixRQUFRZjtrQkFDdEIsNEVBQUNLO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQSxpRUFBZWIsZ0VBQWtCQSxDQUFDVyxzQkFBc0JBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb25hc3ZhbmRlbmJ1bGNrZS9Eb2N1bWVudHMvcmVwcy9Kb25hc1dhcmQvcmVwdXJwb3NlZC9wYWdlcy9fYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHBXaXRoVHJhbnNsYXRpb24gfSBmcm9tICduZXh0LWkxOG5leHQnO1xuaW1wb3J0ICcuL2dsb2JhbHMuY3NzJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDb252ZXhQcm92aWRlciwgQ29udmV4UmVhY3RDbGllbnQgfSBmcm9tICdjb252ZXgvcmVhY3QnO1xuaW1wb3J0IHsgdXNlUmVwdXJwb3NlZFN0b3JlLCBMT0NBTF9TVE9SQUdFX0tFWV9MSUtFRCwgTE9DQUxfU1RPUkFHRV9LRVlfRElTTElLRUQgfSBmcm9tICdAL2xpYi9zdG9yZSc7XG5cbmNvbnN0IGNvbnZleCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0NPTlZFWF9VUkxcbiAgPyBuZXcgQ29udmV4UmVhY3RDbGllbnQocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ09OVkVYX1VSTClcbiAgOiBudWxsO1xuXG5jb25zdCBSZXB1cnBvc2VkTWFya2V0cGxhY2UgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiB7IENvbXBvbmVudDogYW55OyBwYWdlUHJvcHM6IGFueSB9KSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZX0xJS0VEKSkge1xuICAgICAgdXNlUmVwdXJwb3NlZFN0b3JlLnNldFN0YXRlKCgpID0+ICh7XG4gICAgICAgIGxpa2VkOiBuZXcgU2V0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9LRVlfTElLRUQpISkgYXMgbnVtYmVyW10pXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0tFWV9ESVNMSUtFRCkpIHtcbiAgICAgIHVzZVJlcHVycG9zZWRTdG9yZS5zZXRTdGF0ZSgoKSA9PiAoe1xuICAgICAgICBkaXNsaWtlZDogbmV3IFNldChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfS0VZX0RJU0xJS0VEKSEpIGFzIG51bWJlcltdKVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGlmICghY29udmV4KSByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcblxuICByZXR1cm4gKFxuICAgIDxDb252ZXhQcm92aWRlciBjbGllbnQ9e2NvbnZleH0+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Db252ZXhQcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFwcFdpdGhUcmFuc2xhdGlvbihSZXB1cnBvc2VkTWFya2V0cGxhY2UpO1xuIl0sIm5hbWVzIjpbImFwcFdpdGhUcmFuc2xhdGlvbiIsInVzZUVmZmVjdCIsIkNvbnZleFByb3ZpZGVyIiwiQ29udmV4UmVhY3RDbGllbnQiLCJ1c2VSZXB1cnBvc2VkU3RvcmUiLCJMT0NBTF9TVE9SQUdFX0tFWV9MSUtFRCIsIkxPQ0FMX1NUT1JBR0VfS0VZX0RJU0xJS0VEIiwiY29udmV4IiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0NPTlZFWF9VUkwiLCJSZXB1cnBvc2VkTWFya2V0cGxhY2UiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0U3RhdGUiLCJsaWtlZCIsIlNldCIsIkpTT04iLCJwYXJzZSIsImRpc2xpa2VkIiwiY2xpZW50Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

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