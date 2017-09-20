/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_main_css__ = __webpack_require__(4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_main_css__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_page_css__ = __webpack_require__(5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_page_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_page_css__);\n\n\n\nvar sum = __webpack_require__(3);\nvar values = Array.from(Array(100).keys());\nvar answer = sum(values);\n\ndocument.getElementById(\"answer\").innerHTML = answer;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvbWFpbi5qcz82YTRiIl0sIm5hbWVzIjpbInN1bSIsInJlcXVpcmUiLCJ2YWx1ZXMiLCJBcnJheSIsImZyb20iLCJrZXlzIiwiYW5zd2VyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOztBQUVBLElBQUlBLE1BQU0sbUJBQUFDLENBQVEsQ0FBUixDQUFWO0FBQ0EsSUFBSUMsU0FBU0MsTUFBTUMsSUFBTixDQUFXRCxNQUFNLEdBQU4sRUFBV0UsSUFBWCxFQUFYLENBQWI7QUFDQSxJQUFJQyxTQUFTTixJQUFJRSxNQUFKLENBQWI7O0FBRUFLLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFNBQWxDLEdBQThDSCxNQUE5QyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlcy9tYWluLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL3BhZ2UuY3NzJztcblxudmFyIHN1bSA9IHJlcXVpcmUoJy4vc3VtJyk7XG52YXIgdmFsdWVzID0gQXJyYXkuZnJvbShBcnJheSgxMDApLmtleXMoKSk7XG52YXIgYW5zd2VyID0gc3VtKHZhbHVlcyk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5zd2VyXCIpLmlubmVySFRNTCA9IGFuc3dlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("module.exports = function add(a, b) {\n    return a + b;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYWRkLmpzPzU0M2EiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImFkZCIsImEiLCJiIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsT0FBUCxHQUFpQixTQUFTQyxHQUFULENBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUM5QixXQUFPRCxJQUFJQyxDQUFYO0FBQ0gsQ0FGRCIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhZGQoYSxiKXtcbiAgICByZXR1cm4gYSArIGI7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FkZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("module.exports = function reduce(arr, iteratee) {\n  var index = 0,\n      length = arr.length,\n      memo = arr[index];\n\n  index += 1;\n  for (; index < length; index += 1) {\n    memo = iteratee(memo, arr[index]);\n  }\n  return memo;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvcmVkdWNlLmpzPzA4ODAiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInJlZHVjZSIsImFyciIsIml0ZXJhdGVlIiwiaW5kZXgiLCJsZW5ndGgiLCJtZW1vIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsT0FBUCxHQUFpQixTQUFTQyxNQUFULENBQWdCQyxHQUFoQixFQUFxQkMsUUFBckIsRUFBK0I7QUFDOUMsTUFBSUMsUUFBUSxDQUFaO0FBQUEsTUFDRUMsU0FBU0gsSUFBSUcsTUFEZjtBQUFBLE1BRUVDLE9BQU9KLElBQUlFLEtBQUosQ0FGVDs7QUFJQUEsV0FBUyxDQUFUO0FBQ0EsU0FBTUEsUUFBUUMsTUFBZCxFQUFzQkQsU0FBUyxDQUEvQixFQUFpQztBQUMvQkUsV0FBT0gsU0FBU0csSUFBVCxFQUFlSixJQUFJRSxLQUFKLENBQWYsQ0FBUDtBQUNEO0FBQ0QsU0FBT0UsSUFBUDtBQUNELENBVkQiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVkdWNlKGFyciwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gMCxcbiAgICBsZW5ndGggPSBhcnIubGVuZ3RoLFxuICAgIG1lbW8gPSBhcnJbaW5kZXhdO1xuXG4gIGluZGV4ICs9IDE7XG4gIGZvcig7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKXtcbiAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgYXJyW2luZGV4XSlcbiAgfVxuICByZXR1cm4gbWVtbztcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvcmVkdWNlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (reduce, add) {\n  sum = function (arr) {\n    return reduce(arr, add);\n  };\n\n  return sum;\n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvc3VtLmpzPzBhODciXSwibmFtZXMiOlsicmVkdWNlIiwiYWRkIiwic3VtIiwiYXJyIl0sIm1hcHBpbmdzIjoiZ0VBQUEsaUNBQU8sQ0FBQyxzQkFBRCxFQUFhLHNCQUFiLENBQVAsa0NBQThCLFVBQVNBLE1BQVQsRUFBaUJDLEdBQWpCLEVBQXFCO0FBQ2pEQyxRQUFPLFVBQVNDLEdBQVQsRUFBYTtBQUNsQixXQUFPSCxPQUFPRyxHQUFQLEVBQVlGLEdBQVosQ0FBUDtBQUNELEdBRkQ7O0FBSUEsU0FBT0MsR0FBUDtBQUNELENBTkQ7QUFBQSIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFsnLi9yZWR1Y2UnLCAnLi9hZGQnXSwgZnVuY3Rpb24ocmVkdWNlLCBhZGQpe1xuICBzdW0gPSAgZnVuY3Rpb24oYXJyKXtcbiAgICByZXR1cm4gcmVkdWNlKGFyciwgYWRkKTtcbiAgfVxuXG4gIHJldHVybiBzdW07XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zdW0uanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGVzL21haW4uY3NzP2NmNmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc3R5bGVzL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGVzL3BhZ2UuY3NzPzFjNDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc3R5bGVzL3BhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);