/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/canvas2d/Canvas2D.ts":
/*!*************************************!*\
  !*** ./src/ts/canvas2d/Canvas2D.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Canvas2D = void 0;\r\nclass Canvas2D {\r\n    constructor(canvas) {\r\n        this.context = canvas.getContext(\"2d\");\r\n    }\r\n    drawText(text) {\r\n        this.context.textBaseline = \"middle\";\r\n        this.context.textAlign = \"center\";\r\n        let centerX = this.context.canvas.width * 0.5;\r\n        let centerY = this.context.canvas.height * 0.5;\r\n        this.context.fillText(text, centerX, centerY);\r\n        this.context.strokeStyle = \"green\";\r\n        this.context.strokeText(text, centerX, centerY);\r\n        this.context.restore();\r\n    }\r\n}\r\nexports.Canvas2D = Canvas2D;\r\n\n\n//# sourceURL=webpack://typescript-canvas/./src/ts/canvas2d/Canvas2D.ts?");

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Canvas2D_1 = __webpack_require__(/*! ./canvas2d/Canvas2D */ \"./src/ts/canvas2d/Canvas2D.ts\");\r\nclass canvas2DUtil {\r\n    constructor(canvas) {\r\n        this.context = canvas.getContext(\"2d\");\r\n    }\r\n    drawText(text) {\r\n        this.context.textBaseline = \"middle\";\r\n        this.context.textAlign = \"center\";\r\n        let centerX = this.context.canvas.width * 0.5;\r\n        let centerY = this.context.canvas.height * 0.5;\r\n        this.context.fillText(text, centerX, centerY);\r\n        this.context.strokeStyle = \"blue\";\r\n        this.context.strokeText(text, centerX, centerY);\r\n        this.context.restore();\r\n    }\r\n}\r\nlet canvas = document.getElementById(\"canvas\");\r\nif (canvas === null) {\r\n    alert(\"无法获取HTMLCanvasElement\");\r\n    throw new Error(\"无法获取HTMLCanvasElement\");\r\n}\r\nlet canvas2d = new canvas2DUtil(canvas);\r\n// canvas2d.drawText(\"Hello World\");\r\nlet canvas2d1 = new Canvas2D_1.Canvas2D(canvas);\r\ncanvas2d1.drawText(\"Hello World From Module\");\r\n\n\n//# sourceURL=webpack://typescript-canvas/./src/ts/main.ts?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/main.ts");
/******/ 	
/******/ })()
;