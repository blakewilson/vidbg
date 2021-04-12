(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('hex-rgb')) :
    typeof define === 'function' && define.amd ? define(['hex-rgb'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vidbg = factory(global.convert));
}(this, (function (convert) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var convert__default = /*#__PURE__*/_interopDefaultLegacy(convert);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var defaultOptions = {
        mp4: null,
        webm: null,
        poster: null,
        overlay: false,
        overlayColor: "#000",
        overlayAlpha: 0.3,
    };

    var defaultAttributes = {
        controls: false,
        loop: true,
        muted: true,
        playsInline: true,
    };

    var InvalidSelectorError = (function (_super) {
        __extends(InvalidSelectorError, _super);
        function InvalidSelectorError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "InvalidSelectorError";
            return _this;
        }
        return InvalidSelectorError;
    }(Error));

    var VideoSourceNotSpecifiedError = (function (_super) {
        __extends(VideoSourceNotSpecifiedError, _super);
        function VideoSourceNotSpecifiedError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "VideoSourceNotSpecifiedError";
            return _this;
        }
        return VideoSourceNotSpecifiedError;
    }(Error));

    var vidbg = (function () {
        function vidbg(selector, options, attributes) {
            var _this = this;
            this.createContainer = function () {
                _this.containerEl = document.createElement("div");
                _this.containerEl.className = "vidbg-container";
                _this.createPoster();
                _this.el.appendChild(_this.containerEl);
            };
            this.createOverlay = function () {
                _this.overlayEl = document.createElement("div");
                _this.overlayEl.className = "vidbg-overlay";
                if (_this.options.overlay) {
                    var _a = convert__default['default'](_this.options.overlayColor, { format: "array" }), r = _a[0], g = _a[1], b = _a[2];
                    var rgba = [r, g, b, _this.options.overlayAlpha];
                    _this.overlayEl.style.backgroundColor = "rgba(" + rgba.join(", ") + ")";
                }
                _this.containerEl.appendChild(_this.overlayEl);
            };
            this.createPoster = function () {
                if (_this.options.poster) {
                    _this.containerEl.style.backgroundImage = "url(" + _this.options.poster + ")";
                }
            };
            this.createVideo = function () {
                _this.videoEl = document.createElement("video");
                _this.videoEl.addEventListener("playing", _this.onPlayEvent);
                for (var key in _this.attributes) {
                    _this.videoEl[key] = _this.attributes[key];
                }
                if (_this.options.mp4) {
                    var mp4Source = document.createElement("source");
                    mp4Source.src = _this.options.mp4;
                    mp4Source.type = "video/mp4";
                    _this.videoEl.appendChild(mp4Source);
                }
                if (_this.options.webm) {
                    var webmSource = document.createElement("source");
                    webmSource.src = _this.options.webm;
                    webmSource.type = "video/webm";
                    _this.videoEl.appendChild(webmSource);
                }
                _this.containerEl.appendChild(_this.videoEl);
                var playPromise = _this.videoEl.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function (err) {
                        console.error(err);
                        console.error("Autoplay is not supported. The video element will be removed.");
                        _this.removeVideo();
                    });
                }
            };
            this.onPlayEvent = function () {
                _this.resize();
                _this.videoEl.style.opacity = "1";
            };
            this.removeVideo = function () {
                _this.videoEl.remove();
            };
            this.getVideo = function () {
                return _this.videoEl;
            };
            this.destroy = function () {
                _this.containerEl.remove();
            };
            this.resize = function () {
                var containerWidth = _this.containerEl.offsetWidth;
                var containerHeight = _this.containerEl.offsetHeight;
                var videoWidth = _this.videoEl.videoWidth;
                var videoHeight = _this.videoEl.videoHeight;
                if (containerWidth / videoWidth > containerHeight / videoHeight) {
                    _this.videoEl.style.width = containerWidth + "px";
                    _this.videoEl.style.height = "auto";
                }
                else {
                    _this.videoEl.style.width = "auto";
                    _this.videoEl.style.height = containerHeight + "px";
                }
            };
            if (!selector) {
                throw new InvalidSelectorError("A selector is required!");
            }
            var _el = document.querySelector(selector);
            if (!_el) {
                throw new InvalidSelectorError("The selector you specified, \"" + selector + "\", does not exist!");
            }
            this.el = _el;
            this.options = __assign(__assign({}, defaultOptions), options);
            this.attributes = __assign(__assign({}, defaultAttributes), attributes);
            if (!this.options.mp4 && !this.options.webm) {
                throw new VideoSourceNotSpecifiedError("Please provide an mp4, webm, or both");
            }
            this.init();
        }
        vidbg.prototype.init = function () {
            this.el.style.position = "relative";
            this.el.style.zIndex = "1";
            this.createContainer();
            this.createVideo();
            this.createOverlay();
            window.addEventListener("resize", this.resize);
        };
        return vidbg;
    }());

    return vidbg;

})));
