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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);\n/* harmony import */ var _assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n__webpack_require__(1);\n\n// normalize.css must be loaded first before app css, so disable eslint check\n/* eslint-disable import/first */\n\n/* eslint-enable import/first */\n\nfunction getZipForm() {\n  return document.getElementById('zip-form');\n}\n\nfunction saveTimeOfRequest() {\n  const now = Date.now();\n  const form = getZipForm();\n  const lastSubmit = form.querySelector('input[type=\"hidden\"]');\n  lastSubmit.value = now;\n}\n\nfunction requestTooSoon() {\n  let tooSoon = false;\n  const now = Date.now();\n  const form = getZipForm();\n  const lastSubmit = form.querySelector('input[type=\"hidden\"]');\n  const lastSubmitValue = parseInt(lastSubmit.value);\n  tooSoon = lastSubmit === 0 ? false : now - lastSubmitValue < 600000;\n  return tooSoon;\n}\n\nfunction buildOWMReq(zip, country) {\n  return `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=imperial&APPID=${owmKey}`;\n}\n\nfunction handleError(error) {\n  if (error.status) {\n    return 'Unable to retrieve weather.';\n  } else if (error instanceof TypeError) {\n    return 'Please check your connection';\n  } else {\n    return error;\n  }\n}\n\nfunction displayOWMImage(iconId) {\n  const image = document.querySelector('#icon img');\n  image.src = `https://openweathermap.org/img/w/${iconId}.png`;\n}\n\nfunction displayData(elemId, value) {\n  const selector = `${elemId} p`;\n  const element = document.querySelector(selector);\n  element.textContent = value;\n}\n\nfunction displayLoading() {\n  displayData('#city', 'Loading...');\n}\n\nfunction fillDisplay(response) {\n  const degree = '\\u00B0';\n  const temp = Math.round(parseFloat(response.main.temp));\n  const high = Math.round(parseFloat(response.main.temp_max));\n  const low = Math.round(parseFloat(response.main.temp_min));\n\n  displayData('#city', response.name);\n  displayOWMImage(response.weather[0].icon);\n  displayData('#temp', `${temp}${degree}F`);\n  displayData('#high-low', `${high}${degree}/${low}${degree}`);\n  displayData('#conditions', response.weather[0].main);\n}\n\nfunction getWeather(zip, country = 'us') {\n  const request = fetch(buildOWMReq(zip, country));\n\n  return request.then(\n    response => {\n      if (response.ok) {\n        return Promise.resolve(response.json());\n      } else {\n        return Promise.reject(response);\n      }\n    },\n    err => {\n      return Promise.reject(err);\n    }\n  );\n}\n\nfunction handleWeatherRequest(zip) {\n  const timeoutPromise = new Promise((resolve, reject) => {\n    const id = setTimeout(() => {\n      clearTimeout(id);\n      reject('Weather server took too long to respond.');\n    }, 20000);\n  });\n\n  const weatherRequest = Promise.race([getWeather(zip), timeoutPromise]);\n\n  weatherRequest.then(\n    response => {\n      saveTimeOfRequest();\n      fillDisplay(response);\n    },\n    error => {\n      alert(handleError(error));\n    }\n  );\n}\n\nfunction handleSubmit(e) {\n  e.preventDefault();\n  const form = e.target.parentNode;\n  const zip = form.querySelector('input[name=\"zip\"]').value;\n\n  if (zip.length === 0 || !/^\\d{5}$/.test(zip)) {\n    alert('Invalid ZIP');\n  } else if (!requestTooSoon()) {\n    displayLoading();\n    handleWeatherRequest(zip);\n  } else {\n    alert('You can only request weather every 10 minutes');\n  }\n}\n\nfunction addSubmitListener() {\n  const button = document.querySelector('input[type=\"submit\"]');\n  button.addEventListener('click', handleSubmit);\n}\n\naddSubmitListener();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./node_modules/normalize.css/normalize.css?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/css/style.scss?");

/***/ })
/******/ ]);