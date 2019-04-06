var vidbg =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vidbg.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/hex-rgb/index.js":
/*!***************************************!*\
  !*** ./node_modules/hex-rgb/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hexCharacters = 'a-f\\d';
var match3or4Hex = "#?[".concat(hexCharacters, "]{3}[").concat(hexCharacters, "]?");
var match6or8Hex = "#?[".concat(hexCharacters, "]{6}([").concat(hexCharacters, "]{2})?");
var nonHexChars = new RegExp("[^#".concat(hexCharacters, "]"), 'gi');
var validHexSize = new RegExp("^".concat(match3or4Hex, "$|^").concat(match6or8Hex, "$"), 'i');

module.exports = function (hex) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
    throw new TypeError('Expected a valid hex string');
  }

  hex = hex.replace(/^#/, '');
  var alpha = 1;

  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  var num = parseInt(hex, 16);
  var red = num >> 16;
  var green = num >> 8 & 255;
  var blue = num & 255;
  return options.format === 'array' ? [red, green, blue, alpha] : {
    red: red,
    green: green,
    blue: blue,
    alpha: alpha
  };
};

/***/ }),

/***/ "./src/vidbg.js":
/*!**********************!*\
  !*** ./src/vidbg.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hex_rgb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hex-rgb */ "./node_modules/hex-rgb/index.js");
/* harmony import */ var hex_rgb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hex_rgb__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * vidbg.js v2.0 (https://github.com/blakewilson/vidbg)
 * vidbg.js By Blake Wilson
 * @license Licensed Under MIT (https://github.com/blakewilson/vidbg/blob/master/LICENSE)
 */

/**
 * The vidbg class. This will be the reference for the plugin.
 * For example: var videoBackground = new vidbg(selector, options, attributes)
 */

var vidbg =
/*#__PURE__*/
function () {
  /**
   * Setup our defualt options and config for our plugin.
   *
   * @param {String} selector The selector for the video background
   * @param {object} options The options for the plugin
   * @param {object} attributes The attributes for the HTML5 <video> attribute
   */
  function vidbg(selector, options, attributes) {
    var _this = this;

    _classCallCheck(this, vidbg);

    _defineProperty(this, "createContainer", function () {
      _this.containerEl = document.createElement('div');
      _this.containerEl.className = 'vidbg-container';

      _this.createPoster();

      _this.el.appendChild(_this.containerEl);
    });

    _defineProperty(this, "createOverlay", function () {
      _this.overlayEl = document.createElement('div');
      _this.overlayEl.className = 'vidbg-overlay';

      if (_this.options.overlay) {
        // Convert the overlayColor HEX into an RGB
        var rgb = hex_rgb__WEBPACK_IMPORTED_MODULE_0___default()(_this.options.overlayColor, {
          format: 'array'
        }); // Use the converted rgb with the overlayAlpha to set the backgroundColor

        _this.overlayEl.style.backgroundColor = "rgb(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ", ").concat(_this.options.overlayAlpha, ")");
      }

      _this.containerEl.appendChild(_this.overlayEl);
    });

    _defineProperty(this, "createPoster", function () {
      if (_this.options.poster) {
        _this.containerEl.style.backgroundImage = "url(".concat(_this.options.poster, ")");
      }
    });

    _defineProperty(this, "createVideo", function () {
      _this.videoEl = document.createElement('video'); // Set the MP4 source if one exists.

      if (_this.options.mp4) {
        var mp4Source = document.createElement('source');
        mp4Source.src = _this.options.mp4;
        mp4Source.type = 'video/mp4';

        _this.videoEl.appendChild(mp4Source);
      } // Set the WEBM source if one exists.


      if (_this.options.webm) {
        var webmSource = document.createElement('source');
        webmSource.src = _this.options.webm;
        webmSource.type = 'video/webm';

        _this.videoEl.appendChild(webmSource);
      } // The play promise


      var playPromise = _this.videoEl.play();
      /**
       * If the browser supports promises, we will use the play promise
       * to determine if autoplay is supported or not.
       *
       * If promises are supported, and autoplay is not supported, we will
       * remove the HTML5 <video> element and the fallback image will be used.
       */


      if (playPromise !== undefined) {
        playPromise.then(function () {// Autoplay has started.
        }).catch(function (e) {
          console.error('Autoplay is not supported');

          _this.removeVideo();
        });
      }

      _this.videoEl.addEventListener('playing', _this.onPlayEvent); // Set the attributes for the <video> element.


      for (var key in _this.attributes) {
        _this.videoEl[key] = _this.attributes[key];
      }

      _this.containerEl.appendChild(_this.videoEl);
    });

    _defineProperty(this, "onPlayEvent", function (event) {
      // Resize the video on play
      _this.resize(); // Show the video


      _this.videoEl.style.opacity = 1;
    });

    _defineProperty(this, "removeVideo", function () {
      _this.videoEl.remove();
    });

    _defineProperty(this, "resize", function () {
      // Get the width and height of the container we created
      var containerWidth = _this.containerEl.offsetWidth;
      var containerHeight = _this.containerEl.offsetHeight; // Get the width and height of the HTML5 <video> element we created

      var videoWidth = _this.videoEl.videoWidth;
      var videoHeight = _this.videoEl.videoHeight;
      /**
       * Depending on the width and height of the browser, we will either set the video width
       * to the container's width and the height to auto, or the width to auto and the height
       * to the container's height.
       */

      if (containerWidth / videoWidth > containerHeight / videoHeight) {
        _this.videoEl.style.width = "".concat(containerWidth, "px");
        _this.videoEl.style.height = 'auto';
      } else {
        _this.videoEl.style.width = 'auto';
        _this.videoEl.style.height = "".concat(containerHeight, "px");
      }
    });

    if (!selector) {
      console.error('Please provide a selector');
      return false;
    } // The element


    this.el = document.querySelector(selector); // These are the default options for vidbg

    var defaultOptions = {
      mp4: null,
      webm: null,
      poster: null,
      overlay: false,
      overlayColor: '#000',
      overlayAlpha: 0.3 // Use the spread operator to merge our default options with user supplied options.

    };
    this.options = _objectSpread({}, defaultOptions, options); // These are the default attributes for the HTML5 <video> element.

    var defaultAttributes = {
      autoplay: true,
      controls: false,
      loop: true,
      muted: true,
      playsInline: true // Use the spread operator to merge our default attributes with user supplied options.

    };
    this.attributes = _objectSpread({}, defaultAttributes, attributes);

    if (!this.options.mp4 && !this.options.webm) {
      console.error('Please provide an mp4, webm, or both.');
      return false;
    }

    this.init();
  }
  /**
   * init the video background to the DOM.
   */


  _createClass(vidbg, [{
    key: "init",
    value: function init() {
      this.el.style.position = 'relative';
      this.el.style.zIndex = 1;
      this.createContainer();
      this.createVideo();
      this.createOverlay();
      window.addEventListener('resize', this.resize);
    }
    /**
     * Create the container element and append it to the selector.
     */

  }]);

  return vidbg;
}();

/* harmony default export */ __webpack_exports__["default"] = (vidbg);

/***/ })

/******/ })["default"];