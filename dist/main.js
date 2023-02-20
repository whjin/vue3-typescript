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

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass canvas2DUtil {\r\n    constructor(canvas) {\r\n        this.context = canvas.getContext(\"2d\");\r\n    }\r\n    drawText(text) {\r\n        this.context.textBaseline = \"middle\";\r\n        this.context.textAlign = \"center\";\r\n        let centerX = this.context.canvas.width * 0.5;\r\n        let centerY = this.context.canvas.height * 0.5;\r\n        this.context.fillText(text, centerX, centerY);\r\n        this.context.strokeStyle = \"blue\";\r\n        this.context.strokeText(text, centerX, centerY);\r\n        this.context.restore();\r\n    }\r\n}\r\nlet canvas = document.getElementById(\"canvas\");\r\nif (canvas === null) {\r\n    alert(\"无法获取HTMLCanvasElement\");\r\n    throw new Error(\"无法获取HTMLCanvasElement\");\r\n}\r\nlet canvas2d = new canvas2DUtil(canvas);\r\ncanvas2d.drawText(\"Hello World\");\r\n// let canvas2d1: Canvas2D = new Canvas2D(canvas);\r\n// canvas2d1.drawText(\"Hello World From Module\");\r\n\n\n//# sourceURL=webpack://typescript-canvas/./src/ts/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ts/main.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;