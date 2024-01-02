// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Engine/Renderers/CanvasRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasRenderer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Renders things to a 2D HTML Canvas
 */
var CanvasRenderer = /*#__PURE__*/function () {
  function CanvasRenderer(canvas) {
    _classCallCheck(this, CanvasRenderer);

    Object.defineProperty(this, "context", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.context = canvas.getContext('2d');
  }

  _createClass(CanvasRenderer, [{
    key: "clear",
    value: function clear() {
      var _this$context$canvas = this.context.canvas,
          width = _this$context$canvas.width,
          height = _this$context$canvas.height;
      this.context.clearRect(0, 0, width, height + 100);
    }
  }, {
    key: "drawRectangle",
    value: function drawRectangle(x, y, width, height, rotation, fillStyle, strokeStyle) {
      this.context.fillStyle = fillStyle;
      this.context.lineWidth = 5;

      if (strokeStyle) {
        this.context.strokeStyle = strokeStyle;
      }

      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(rotation);
      this.context.translate(-x, -y);

      if (strokeStyle) {
        this.context.stroke();
      }

      this.context.fillRect(x, y, width, height);
      this.context.restore();
    }
  }, {
    key: "drawText",
    value: function drawText(pos, text) {
      var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var center = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var fillStyle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#000';
      var font = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '64px arial';
      this.context.save();
      this.context.font = font;
      var width = this.context.measureText(text).width;
      this.context.restore();
      this.context.save();
      this.context.font = font;
      var height = this.context.measureText('m').width;
      this.context.restore();
      this.context.save();
      this.context.font = font;
      this.context.fillStyle = fillStyle;
      var x = center ? pos.x - width / 2 : pos.x;
      var y = center ? pos.y - width / 2 : pos.y;
      this.context.textBaseline = 'top';
      this.context.translate(x + width / 2, y + height / 2);
      this.context.rotate(rotation);
      this.context.translate(-(x + width / 2), -(y + height / 2));
      this.context.fillText(text, x, pos.y);
      this.context.restore();
    }
  }, {
    key: "drawPoints",
    value: function drawPoints(points, strokeStyle, fillStyle) {
      var closePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.context.beginPath();
      this.context.strokeStyle = strokeStyle;
      this.context.fillStyle = fillStyle;
      this.context.lineWidth = 3;
      this.context.moveTo(points[0].x, points[0].y);

      for (var i = 1; i < points.length; i++) {
        this.context.lineTo(points[i].x, points[i].y);
      }

      if (closePath) {
        this.context.closePath();
      }

      this.context.fill();
      this.context.stroke();
    }
  }, {
    key: "getTextWidth",
    value: function getTextWidth(text, font) {
      this.context.save();
      this.context.font = font;
      var width = this.context.measureText(text).width;
      this.context.restore();
      return width;
    }
  }, {
    key: "getFontHeight",
    value: function getFontHeight(font) {
      this.context.save();
      this.context.font = font;
      var height = this.context.measureText('m').width;
      this.context.restore();
      return height;
    }
  }, {
    key: "drawTexture",
    value: function drawTexture(texture) {
      if (texture.ready) {
        this.context.save();
        this.context.translate(texture.center.x, texture.center.y);
        this.context.rotate(texture.rotation);
        this.context.translate(-texture.center.x, -texture.center.y);
        this.context.drawImage(texture.image, texture.center.x - texture.width / 2, texture.center.y - texture.height / 2, texture.width, texture.height);
        this.context.restore();
      }
    }
    /**
     * Draws the texure from the bounds stored in the key.
     * @param spriteSheet Sprite sheet to pull dat from
     * @param key Key to get bounds
     * @param center Center of the texture
     * @param centered Is the texured centered on x & y?
     * @param centered Is the
     */

  }, {
    key: "drawSubTexture",
    value: function drawSubTexture(spriteSheet, key, center, rotation) {
      var centered = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (spriteSheet.ready) {
        var bounds = spriteSheet.getBounds(key);
        var x = centered ? center.x - bounds.w / 2 : center.x;
        var y = centered ? center.y - bounds.h / 2 : center.y;
        this.context.save();
        this.context.translate(center.x, center.y);
        this.context.rotate(rotation);
        this.context.translate(-center.x, -center.y);
        this.context.drawImage(spriteSheet.image, bounds.x, bounds.y, bounds.w, bounds.h, x, y, bounds.w + 0.5, bounds.h + 0.5);
        this.context.restore();
      }
    }
    /**
     * Draws the texure in the clipping area
     * @param spriteSheet Sprite sheet to pull dat from
     * @param key Key to get bounds
     * @param center Center of the texture
     * @param centered Is the texured centered on x & y?
     * @param clippingArea Area to clip
     */

  }, {
    key: "drawSubTextureInClip",
    value: function drawSubTextureInClip(spriteSheet, key, center) {
      var centered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var clippingArea = arguments.length > 4 ? arguments[4] : undefined;

      if (spriteSheet.ready) {
        var bounds = spriteSheet.getBounds(key);
        var x = centered ? center.x - bounds.w / 2 : center.x;
        var y = centered ? center.y - bounds.h / 2 : center.y;
        this.context.save();
        this.context.rect(clippingArea.x, clippingArea.y, clippingArea.w, clippingArea.h);
        this.context.clip();
        this.context.drawImage(spriteSheet.image, bounds.x, bounds.y, bounds.w, bounds.h, x, y, bounds.w + 0.5, bounds.h + 0.5);
        this.context.restore();
      }
    }
  }, {
    key: "createGradient",
    value: function createGradient(pt1, pt2) {
      return this.context.createLinearGradient(pt1.x, pt1.y, pt2.x, pt2.y);
    }
  }, {
    key: "drawStrokeRect",
    value: function drawStrokeRect(x, y, w, h, style) {
      this.context.strokeStyle = style;
      this.context.lineWidth = 3;
      this.context.save();
      this.context.strokeRect(x, y, w, h);
      this.context.restore();
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y, radius) {
      var fillStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#000';
      var strokeStyle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#fff';
      this.context.save();
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
      this.context.fillStyle = fillStyle;
      this.context.fill();
      this.context.lineWidth = 5;
      this.context.strokeStyle = strokeStyle;
      this.context.stroke();
      this.context.restore();
    }
  }, {
    key: "middleX",
    get: function get() {
      return this.width / 2;
    }
  }, {
    key: "width",
    get: function get() {
      return this.context.canvas.width;
    }
  }]);

  return CanvasRenderer;
}();

exports.CanvasRenderer = CanvasRenderer;
},{}],"src/Engine/Settings/GameSettings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameSettings = /*#__PURE__*/function () {
  function GameSettings() {
    _classCallCheck(this, GameSettings);
  }

  _createClass(GameSettings, null, [{
    key: "updateWithCanvas",
    value: function updateWithCanvas(canvas) {
      GameSettings._width = canvas.width;
      GameSettings._height = canvas.height;
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
  }]);

  return GameSettings;
}();

exports.default = GameSettings;
Object.defineProperty(GameSettings, "_width", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 1024
});
Object.defineProperty(GameSettings, "_height", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 1024
});
},{}],"src/Engine/Input/Mouse.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GameSettings = _interopRequireDefault(require("../Settings/GameSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mouse = /*#__PURE__*/function () {
  function Mouse(htmlElement) {
    var _this = this;

    _classCallCheck(this, Mouse);

    Object.defineProperty(this, "htmlElement", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: htmlElement
    });
    Object.defineProperty(this, "_handlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "_inputBuffer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "process", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        for (var key in _this._inputBuffer) {
          if (_this._inputBuffer.hasOwnProperty(key)) {
            for (var i = 0; _this._handlers[key] && i < _this._handlers[key].length; i++) {
              var ev = _this._inputBuffer[key];

              _this._handlers[key][i]({
                ev: ev,
                pos: _this.getPos(ev)
              });
            }
          }
        }

        _this._inputBuffer = {};
      }
    });
    Object.defineProperty(this, "_addEventListeners", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.htmlElement.addEventListener('click', _this._handleInput);

        _this.htmlElement.addEventListener('mousemove', _this._handleInput);
      }
    });
    Object.defineProperty(this, "_removeEventListeners", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.htmlElement.removeEventListener('click', _this._handleInput);

        _this.htmlElement.removeEventListener('mousemove', _this._handleInput);
      }
    });
    Object.defineProperty(this, "_handleInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(ev) {
        if (ev.type === 'click' || ev.type === 'mousemove') {
          _this._inputBuffer[ev.type] = ev;
        }
      }
    });

    this._addEventListeners();
  }

  _createClass(Mouse, [{
    key: "destroy",
    value: function destroy() {
      this._removeEventListeners();

      this._handlers = {};
    }
  }, {
    key: "resetHandlers",
    value: function resetHandlers() {
      this._handlers = {};
    }
  }, {
    key: "clearInputBuffer",
    value: function clearInputBuffer() {
      this._inputBuffer = {};
    }
  }, {
    key: "register",
    value: function register(eventName, handler) {
      if (!this._handlers[eventName]) {
        this._handlers[eventName] = [];
      }

      this._handlers[eventName].push(handler);
    }
  }, {
    key: "getPos",
    value: function getPos(event) {
      var rect = this.htmlElement.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var ratioX = _GameSettings.default.width / rect.width;
      var ratioY = _GameSettings.default.height / rect.height;
      return {
        x: x * ratioX,
        y: y * ratioY
      };
    }
  }]);

  return Mouse;
}();

exports.default = Mouse;
},{"../Settings/GameSettings":"src/Engine/Settings/GameSettings.ts"}],"src/Engine/Audio/Audio.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameAudio = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameAudio = /*#__PURE__*/function () {
  function GameAudio(source) {
    var _this = this;

    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var volume = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var callback = arguments.length > 4 ? arguments[4] : undefined;

    _classCallCheck(this, GameAudio);

    Object.defineProperty(this, "source", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: source
    });
    Object.defineProperty(this, "delay", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: delay
    });
    Object.defineProperty(this, "loop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: loop
    });
    Object.defineProperty(this, "volume", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: volume
    });
    Object.defineProperty(this, "callback", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: callback
    });
    Object.defineProperty(this, "elapsedTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "audioEl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        if (_this.audioEl) {
          return;
        }

        _this.elapsedTime += elapsedTime;

        if (_this.elapsedTime >= _this.delay) {
          _this.audioEl = new Audio(_this.source);
          _this.audioEl.volume = _this.volume;

          if (_this.loop) {
            _this.audioEl.addEventListener('ended', function () {
              this.currentTime = 0;
              this.play();
            }, false);
          }

          _this.audioEl.play().then(_this.callback);
        }
      }
    });
    Object.defineProperty(this, "pause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        if (_this.audioEl) {
          _this.audioEl.pause();
        }
      }
    });
    Object.defineProperty(this, "play", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        if (_this.audioEl) {
          _this.audioEl.play();
        }
      }
    });
    Object.defineProperty(this, "destory", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.audioEl.pause();
      }
    });
  }

  _createClass(GameAudio, [{
    key: "done",
    get: function get() {
      return this.audioEl && this.audioEl.played && !this.loop;
    }
  }]);

  return GameAudio;
}();

exports.GameAudio = GameAudio;
},{}],"src/Engine/Systems/AudioSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSystem = void 0;

var _Audio = require("../Audio/Audio");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioSystem = function AudioSystem() {
  var _this = this;

  _classCallCheck(this, AudioSystem);

  Object.defineProperty(this, "audio", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: []
  });
  Object.defineProperty(this, "addAudio", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(source) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var volume = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var callback = arguments.length > 4 ? arguments[4] : undefined;

      _this.audio.push(new _Audio.GameAudio(source, delay, loop, volume, callback));
    }
  });
  Object.defineProperty(this, "update", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(elapsedTime) {
      for (var i = _this.audio.length - 1; i >= 0; i--) {
        _this.audio[i].update(elapsedTime);

        if (_this.audio[i].done) {
          _this.audio.splice(i, 1);

          continue;
        }

        _this.audio[i].update(elapsedTime);
      }
    }
  });
  Object.defineProperty(this, "clearAllSounds", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      for (var i = 0; i < _this.audio.length; i++) {
        _this.audio[i].pause();
      }

      _this.audio.length = 0;
    }
  });
  Object.defineProperty(this, "destroy", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      for (var i = 0; i < _this.audio.length; i++) {
        _this.audio[i].destory();
      }

      _this.audio.length = 0;
    }
  });
};

exports.AudioSystem = AudioSystem;
},{"../Audio/Audio":"src/Engine/Audio/Audio.ts"}],"src/Engine/BaseComponents/GameLoop.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base class for a game loop.
 */
var GameLoop = function GameLoop(canvas, RenderCreator) {
  var _this = this;

  _classCallCheck(this, GameLoop);

  Object.defineProperty(this, "previousTimeStamp", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
  });
  Object.defineProperty(this, "cr", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  Object.defineProperty(this, "isGameOver", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: false
  });
  /**
   * Will be called every game loop. You should put mouse or keyboard processes here.
   */

  Object.defineProperty(this, "internalProcessInput", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  /**
   * Will be called every game loop. Should set this to what you need.
   */

  Object.defineProperty(this, "internalUpdate", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  /**
   * Will be called every game loop. Depending on the templated RenderType you will need to use that.
   */

  Object.defineProperty(this, "internalRender", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  /**
   * Starts the game loop.
   */

  Object.defineProperty(this, "start", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      _this.previousTimeStamp = performance.now();
      requestAnimationFrame(_this.gameLoop);
    }
  });
  /**
   * Clears the internals for process input, update, and render.
   */

  Object.defineProperty(this, "clearBaseInternals", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      _this.internalProcessInput = function () {};

      _this.internalRender = function () {};

      _this.internalUpdate = function () {};
    }
  });
  Object.defineProperty(this, "gameLoop", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(timeStamp) {
      var elapsedTime = timeStamp - _this.previousTimeStamp;
      _this.previousTimeStamp = timeStamp;

      _this.processInput(elapsedTime);

      _this.update(elapsedTime);

      _this.render();

      if (!_this.isGameOver) {
        requestAnimationFrame(_this.gameLoop);
      }
    }
  });
  Object.defineProperty(this, "processInput", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(elapsedTime) {
      _this.internalProcessInput(elapsedTime);
    }
  });
  Object.defineProperty(this, "update", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(elapsedTime) {
      _this.internalUpdate(elapsedTime);
    }
  });
  Object.defineProperty(this, "render", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      _this.internalRender(_this.cr);
    }
  });
  this.cr = new RenderCreator(canvas);
};

exports.default = GameLoop;
},{}],"src/Engine/Geometry/Rectangle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rectangle = /*#__PURE__*/function () {
  function Rectangle(x, y, w, h) {
    _classCallCheck(this, Rectangle);

    Object.defineProperty(this, "x", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: x
    });
    Object.defineProperty(this, "y", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: y
    });
    Object.defineProperty(this, "w", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: w
    });
    Object.defineProperty(this, "h", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: h
    });
  }

  _createClass(Rectangle, [{
    key: "inBounds",
    value: function inBounds(pos) {
      return pos.x >= this.x && pos.x <= this.x + this.w && pos.y >= this.y && pos.y <= this.y + this.h;
    }
  }]);

  return Rectangle;
}();

exports.default = Rectangle;

function copy(a) {
  return new Rectangle(a.x, a.y, a.w, a.h);
}
},{}],"src/Game/Renderers/ButtonRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ButtonRenderer = function ButtonRenderer(button) {
  return function (cr) {
    var _button$style$fill, _button$style, _button$text$fill;

    var _button$bounds = button.bounds,
        x = _button$bounds.x,
        y = _button$bounds.y,
        w = _button$bounds.w,
        h = _button$bounds.h;
    cr.drawRectangle(x, y, w, h, 0, (_button$style$fill = (_button$style = button.style) === null || _button$style === void 0 ? void 0 : _button$style.fill) !== null && _button$style$fill !== void 0 ? _button$style$fill : '#000');
    var _button$text = button.text,
        content = _button$text.content,
        font = _button$text.font; // Center text withing the rectangle.

    var textWidth = cr.getTextWidth(content, font);
    var textHeight = cr.getFontHeight(font);
    var textXOff = (textWidth - w) / 2;
    var textYOff = (textHeight - h) / 2;
    cr.drawText({
      x: x - textXOff,
      y: y - textYOff
    }, content, 0, false, (_button$text$fill = button.text.fill) !== null && _button$text$fill !== void 0 ? _button$text$fill : '#fff', font);
  };
};

var _default = ButtonRenderer;
exports.default = _default;
},{}],"src/Game/Screens/BaseScreen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ButtonRenderer = _interopRequireDefault(require("../Renderers/ButtonRenderer"));

var _Rectangle = _interopRequireDefault(require("../../Engine/Geometry/Rectangle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseScreen = function BaseScreen(title) {
  var _this = this;

  _classCallCheck(this, BaseScreen);

  Object.defineProperty(this, "title", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: title
  });
  Object.defineProperty(this, "internalMouseMove", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  Object.defineProperty(this, "internalMouseClick", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  Object.defineProperty(this, "internalRender", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  Object.defineProperty(this, "refresh", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  Object.defineProperty(this, "buttons", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: []
  });
  Object.defineProperty(this, "buttonW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 400
  });
  Object.defineProperty(this, "buttonX", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (1024 - this.buttonW) / 2
  });
  Object.defineProperty(this, "renderers", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: []
  });
  Object.defineProperty(this, "createRenderersFromButtons", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      for (var i = 0; i < _this.buttons.length; i++) {
        _this.renderers.push((0, _ButtonRenderer.default)(_this.buttons[i]));
      }
    }
  });
  Object.defineProperty(this, "clearRenderers", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      console.log('hello!');
      _this.renderers = [];
    }
  });
  Object.defineProperty(this, "findMouseClickOnButtons", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(gev) {
      for (var i = 0; i < _this.buttons.length; i++) {
        var oldBounds = _this.buttons[i].bounds;

        if (new _Rectangle.default(oldBounds.x, oldBounds.y, oldBounds.w, oldBounds.h).inBounds(gev.pos)) {
          _this.buttons[i].onSelect();

          return;
        }
      }
    }
  });
  Object.defineProperty(this, "resetMouseClick", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      _this.internalMouseClick = _this.findMouseClickOnButtons;
    }
  });
  Object.defineProperty(this, "mouseClick", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(gev) {
      _this.internalMouseClick(gev);
    }
  });
  Object.defineProperty(this, "renderButtons", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(cr) {
      cr.drawText({
        x: cr.middleX,
        y: 100
      }, _this.title, 0, true);

      for (var i = 0; i < _this.renderers.length; i++) {
        _this.renderers[i](cr);
      }
    }
  });
  Object.defineProperty(this, "render", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(cr) {
      cr.clear();

      _this.internalRender(cr);
    }
  });
  /**
   * Gets the x position for a centered thing
   */

  Object.defineProperty(this, "getXFromW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(w) {
      return (1024 - w) / 2;
    }
  });
  Object.defineProperty(this, "getXAndW", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(startingW) {
      return {
        x: _this.getXAndW(startingW),
        w: startingW
      };
    }
  });
  Object.defineProperty(this, "createBackButton", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(curY, onSelect) {
      var backW = _this.buttonW + 50;

      var backX = _this.getXFromW(backW);

      _this.buttons.push({
        bounds: new _Rectangle.default(backX, curY += 200, backW, 100),
        text: {
          content: 'Back To Menu',
          font: '64px arial'
        },
        onSelect: onSelect
      });
    }
  });
  this.internalMouseClick = this.findMouseClickOnButtons;
  this.internalRender = this.renderButtons;
};

exports.default = BaseScreen;
},{"../Renderers/ButtonRenderer":"src/Game/Renderers/ButtonRenderer.ts","../../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts"}],"src/Engine/Renderers/TextRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var TextRenderer = function TextRenderer(text) {
  return function (cr) {
    var _text$rotation, _text$centered, _text$fill, _text$font;

    cr.drawText(text.pos, text.content, (_text$rotation = text.rotation) !== null && _text$rotation !== void 0 ? _text$rotation : 0, (_text$centered = text.centered) !== null && _text$centered !== void 0 ? _text$centered : false, (_text$fill = text.fill) !== null && _text$fill !== void 0 ? _text$fill : '#000', (_text$font = text.font) !== null && _text$font !== void 0 ? _text$font : '64px arial');
  };
};

var _default = TextRenderer;
exports.default = _default;
},{}],"src/Game/Screens/Credits.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseScreen2 = _interopRequireDefault(require("./BaseScreen"));

var _TextRenderer = _interopRequireDefault(require("../../Engine/Renderers/TextRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Credits = /*#__PURE__*/function (_BaseScreen) {
  _inherits(Credits, _BaseScreen);

  var _super = _createSuper(Credits);

  function Credits(onBack) {
    var _this;

    _classCallCheck(this, Credits);

    _this = _super.call(this, 'Credits');
    var curY = 200;
    var creditsText = ['This work was done by Matt Bishop.', 'I was him who did it.', 'Frogger would be fun they said... wait who?', 'Less is more they say.'];

    for (var i = 0; i < creditsText.length; i++) {
      _this.renderers.push((0, _TextRenderer.default)({
        content: "".concat(creditsText[i]),
        pos: {
          x: 150,
          y: curY += 50
        },
        font: '32px arial'
      }));
    }

    _this.createBackButton(curY, onBack);

    _this.createRenderersFromButtons();

    return _this;
  }

  return Credits;
}(_BaseScreen2.default);

exports.default = Credits;
},{"./BaseScreen":"src/Game/Screens/BaseScreen.ts","../../Engine/Renderers/TextRenderer":"src/Engine/Renderers/TextRenderer.ts"}],"src/Engine/Managers/HighScoreManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighScoreManager = function HighScoreManager() {
  _classCallCheck(this, HighScoreManager);
};

exports.default = HighScoreManager;
Object.defineProperty(HighScoreManager, "storageKey", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: '@frogger-high-scores'
});
Object.defineProperty(HighScoreManager, "clear", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: function value() {
    localStorage.removeItem(HighScoreManager.storageKey);
  }
});
Object.defineProperty(HighScoreManager, "getHighScores", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: function value() {
    var highScores = localStorage[HighScoreManager.storageKey];

    if (!highScores) {
      return [];
    } else {
      return JSON.parse(highScores);
    }
  }
});
/**
 * Sends a username and a score to be added to the high scores.
 *
 * Returns true if it was added, false if it wasn't.
 */

Object.defineProperty(HighScoreManager, "addScore", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: function value(username, score) {
    var highScores = HighScoreManager.getHighScores();
    highScores.push({
      username: username,
      score: parseInt(score.toFixed(0))
    });
    highScores.sort(function (a, b) {
      if (a.score < b.score) {
        return -1;
      } else if (a.score === b.score) {
        return 0;
      } else {
        return 1;
      }
    });

    if (highScores.length > 5) {
      var removedItem = highScores.splice(0, 1)[0];

      if (removedItem.score === score && removedItem.username === username) {
        // The object wasn't added, it was removed immediately.
        return false;
      }
    }

    localStorage[HighScoreManager.storageKey] = JSON.stringify(highScores);
    return true;
  }
});
Object.defineProperty(HighScoreManager, "isHighScore", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: function value(score) {
    var highScores = HighScoreManager.getHighScores();

    if (highScores.length < 5) {
      return true;
    }

    for (var i = 0; i < highScores.length; i++) {
      if (highScores[i].score < score) {
        return true;
      }
    }

    return false;
  }
});
},{}],"src/Game/Screens/HighScores.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseScreen2 = _interopRequireDefault(require("./BaseScreen"));

var _HighScoreManager = _interopRequireDefault(require("../../Engine/Managers/HighScoreManager"));

var _TextRenderer = _interopRequireDefault(require("../../Engine/Renderers/TextRenderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HighScores = /*#__PURE__*/function (_BaseScreen) {
  _inherits(HighScores, _BaseScreen);

  var _super = _createSuper(HighScores);

  function HighScores(onBack) {
    var _this;

    _classCallCheck(this, HighScores);

    _this = _super.call(this, 'High Scores');
    Object.defineProperty(_assertThisInitialized(_this), "onBack", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: onBack
    });
    Object.defineProperty(_assertThisInitialized(_this), "highScoreTextPairs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_this), "createScreen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.renderers.length = 0;
        _this.buttons.length = 0;
        var curY = 250;
        var usernameX = 175;
        var scoreX = 700;

        var highScores = _HighScoreManager.default.getHighScores().reverse();

        for (var i = 0; i < highScores.length; i++) {
          var _highScores$i = highScores[i],
              username = _highScores$i.username,
              score = _highScores$i.score;
          var usernameText = {
            content: username.toString(),
            pos: {
              x: usernameX,
              y: curY
            }
          };

          _this.renderers.push((0, _TextRenderer.default)(usernameText));

          var scoreText = {
            content: score.toString(),
            pos: {
              x: scoreX,
              y: curY
            }
          };

          _this.renderers.push((0, _TextRenderer.default)(scoreText));

          _this.highScoreTextPairs.push({
            username: usernameText,
            score: scoreText
          });

          curY += 100;
        }

        _this.createBackButton(curY - 100, _this.onBack);

        _this.createRenderersFromButtons();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "refresh", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.createScreen();
      }
    });

    _this.createScreen();

    return _this;
  }

  return HighScores;
}(_BaseScreen2.default);

exports.default = HighScores;
},{"./BaseScreen":"src/Game/Screens/BaseScreen.ts","../../Engine/Managers/HighScoreManager":"src/Engine/Managers/HighScoreManager.ts","../../Engine/Renderers/TextRenderer":"src/Engine/Renderers/TextRenderer.ts"}],"src/Engine/Managers/ControlsManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// type Controls = { moveLeft: string; moveRight: string; shoot: string };
var ControlsManager = /*#__PURE__*/function () {
  function ControlsManager() {
    _classCallCheck(this, ControlsManager);
  }

  _createClass(ControlsManager, null, [{
    key: "clear",
    value: function clear() {
      localStorage.removeItem(ControlsManager.storageKey);
    }
  }, {
    key: "getControls",
    value: function getControls() {
      var controls = localStorage[ControlsManager.storageKey];
      return controls ? JSON.parse(controls) : _toConsumableArray(this.defaultControls);
    }
  }, {
    key: "setControls",
    value: function setControls(newControls) {
      localStorage[ControlsManager.storageKey] = JSON.stringify(newControls);
    }
  }, {
    key: "updateControl",
    value: function updateControl(index, newKey) {
      var controls = localStorage[ControlsManager.storageKey];

      var newControls = _toConsumableArray(this.defaultControls);

      if (controls) {
        newControls = JSON.parse(controls);
      }

      if (index < 0 || index >= newControls.length) {
        return;
      }

      newControls[index] = newKey;
      ControlsManager.setControls(newControls);
    }
  }]);

  return ControlsManager;
}();

exports.default = ControlsManager;
Object.defineProperty(ControlsManager, "storageKey", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: '@frogger-controls'
});
Object.defineProperty(ControlsManager, "defaultControls", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
});
},{}],"src/Game/Screens/Controls.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Rectangle = _interopRequireDefault(require("../../Engine/Geometry/Rectangle"));

var _BaseScreen2 = _interopRequireDefault(require("./BaseScreen"));

var _ControlsManager = _interopRequireDefault(require("../../Engine/Managers/ControlsManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Controls = /*#__PURE__*/function (_BaseScreen) {
  _inherits(Controls, _BaseScreen);

  var _super = _createSuper(Controls);

  function Controls(onBack) {
    var _this;

    _classCallCheck(this, Controls);

    _this = _super.call(this, 'Controls');
    Object.defineProperty(_assertThisInitialized(_this), "onBack", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: onBack
    });
    Object.defineProperty(_assertThisInitialized(_this), "controlsText", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_this), "inSelection", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(_assertThisInitialized(_this), "selectedControlOptionIndex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "initializeControlsText", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.controlsText = ['Move Left', 'Move Right', 'Move Up', 'Move Down'];
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "resetControlsText", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        var controls = _ControlsManager.default.getControls();

        _this.initializeControlsText();

        for (var i = 0; i < _this.controlsText.length; i++) {
          _this.buttons[i].text.content = _this.createTextContent(_this.controlsText[i], controls[i].toString());
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleOnBack", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.stopListeningForKey();

        _this.resetControlsText();

        _this.onBack();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "createTextContent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(base, left) {
        return "".concat(base, ": ").concat(left !== ' ' ? left : 'Space');
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "getKeyAndUpdateIndex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(index) {
        if (!_this.inSelection) {
          _this.startListeningForKey();

          _this.selectedControlOptionIndex = index;
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "getNextKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(ev) {
        _this.stopListeningForKey();

        _ControlsManager.default.updateControl(_this.selectedControlOptionIndex, ev.key);

        _this.resetControlsText();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "startListeningForKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.inSelection = true;
        window.addEventListener('keydown', _this.getNextKey);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "stopListeningForKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.inSelection = false;
        window.removeEventListener('keydown', _this.getNextKey);
      }
    });
    var curY = 200;

    _this.initializeControlsText();

    var controls = _ControlsManager.default.getControls();

    var textW = _this.buttonW + 300;

    var textX = _this.getXFromW(textW);

    var _loop = function _loop(i) {
      var button = {
        bounds: new _Rectangle.default(textX, curY += 100, textW, 100),
        text: {
          content: _this.createTextContent(_this.controlsText[i], controls[i]),
          font: '64px arial',
          fill: '#00aaff'
        },
        onSelect: function onSelect() {
          if (!_this.inSelection) {
            button.text.content = _this.createTextContent(_this.controlsText[i], 'Press a key...');

            _this.getKeyAndUpdateIndex(i);
          }
        },
        style: {
          fill: '#fff'
        }
      };

      _this.buttons.push(button);
    };

    for (var i = 0; i < _this.controlsText.length; i++) {
      _loop(i);
    }

    _this.createBackButton(curY, _this.handleOnBack);

    _this.createRenderersFromButtons();

    _this.internalRender = function (cr) {
      cr.drawText({
        x: cr.middleX,
        y: 100
      }, _this.title, 0, true);
      cr.drawText({
        x: cr.middleX,
        y: 200
      }, 'Click on an option and press a key to set the control.', 0, true, '#000', '32px arial');

      for (var _i = 0; _i < _this.renderers.length; _i++) {
        _this.renderers[_i](cr);
      }
    };

    return _this;
  }

  return Controls;
}(_BaseScreen2.default);

exports.default = Controls;
},{"../../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts","./BaseScreen":"src/Game/Screens/BaseScreen.ts","../../Engine/Managers/ControlsManager":"src/Engine/Managers/ControlsManager.ts"}],"src/Game/Screens/Menu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Rectangle = _interopRequireDefault(require("../../Engine/Geometry/Rectangle"));

var _BaseScreen2 = _interopRequireDefault(require("./BaseScreen"));

var _Credits = _interopRequireDefault(require("./Credits"));

var _HighScores = _interopRequireDefault(require("./HighScores"));

var _Controls = _interopRequireDefault(require("./Controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Menu = /*#__PURE__*/function (_BaseScreen) {
  _inherits(Menu, _BaseScreen);

  var _super = _createSuper(Menu);

  function Menu(onNewGame) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, 'Frogger');
    Object.defineProperty(_assertThisInitialized(_this), "screens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_this), "transitionToScreen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(index) {
        if (_this.screens[index].refresh) {
          _this.screens[index].refresh();
        }

        _this.internalRender = _this.screens[index].render;
        _this.internalMouseClick = _this.screens[index].mouseClick;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "returnToMenu", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalRender = _this.renderButtons;

        _this.resetMouseClick();
      }
    });
    var curY = 200;

    _this.buttons.push({
      bounds: new _Rectangle.default(_this.buttonX, curY, _this.buttonW, 100),
      text: {
        content: 'New Game',
        font: '64px arial'
      },
      onSelect: onNewGame
    });

    var screenTypes = [_HighScores.default, _Credits.default, _Controls.default];

    var _loop = function _loop(i) {
      var screen = new screenTypes[i](_this.returnToMenu);

      _this.screens.push(screen);

      _this.buttons.push({
        bounds: new _Rectangle.default(_this.buttonX, curY += 200, _this.buttonW, 100),
        text: {
          content: screen.title,
          font: '64px arial'
        },
        onSelect: function onSelect() {
          return _this.transitionToScreen(i);
        }
      });
    };

    for (var i = 0; i < screenTypes.length; i++) {
      _loop(i);
    }

    _this.createRenderersFromButtons();

    return _this;
  }

  return Menu;
}(_BaseScreen2.default);

exports.default = Menu;
},{"../../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts","./BaseScreen":"src/Game/Screens/BaseScreen.ts","./Credits":"src/Game/Screens/Credits.ts","./HighScores":"src/Game/Screens/HighScores.ts","./Controls":"src/Game/Screens/Controls.ts"}],"src/Engine/Events/Event.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Event = /*#__PURE__*/function () {
  /**
   * An event structure to a number of things after a time.
   * @param interval Time (ms) between event firings
   * @param numTimes Number of times event will fire
   * @param callback Callback for when the event fires
   */
  function Event(interval, numTimes, callback) {
    _classCallCheck(this, Event);

    Object.defineProperty(this, "interval", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: interval
    });
    Object.defineProperty(this, "numTimes", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: numTimes
    });
    Object.defineProperty(this, "callback", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: callback
    });
    Object.defineProperty(this, "timeSinceLastEvent", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
  }

  _createClass(Event, [{
    key: "update",
    value: function update(elapsedTime) {
      this.timeSinceLastEvent += elapsedTime;

      if (this.timeSinceLastEvent > this.interval) {
        this.timeSinceLastEvent -= this.interval;
        this.numTimes--;

        if (this.callback) {
          this.callback();
        }
      }
    }
  }, {
    key: "timesLeft",
    get: function get() {
      return this.numTimes;
    }
  }]);

  return Event;
}();

exports.default = Event;
},{}],"src/Engine/Systems/EventSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Event = _interopRequireDefault(require("../Events/Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventSystem = function EventSystem() {
  var _this = this;

  _classCallCheck(this, EventSystem);

  Object.defineProperty(this, "events", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: []
  });
  Object.defineProperty(this, "addEvent", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(interval, numTimes, callback) {
      _this.events.push(new _Event.default(interval, numTimes, callback));
    }
  });
  Object.defineProperty(this, "update", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value(elapsedTime) {
      for (var i = 0; i < _this.events.length; i++) {
        if (_this.events[i].timesLeft <= 0) {
          _this.events.splice(i, 1);

          i--;
          continue;
        }

        _this.events[i].update(elapsedTime);
      }
    }
  });
  Object.defineProperty(this, "destroy", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      _this.events.length = 0;
    }
  });
  Object.defineProperty(this, "clear", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: function value() {
      _this.events.length = 0;
    }
  });
};

exports.default = EventSystem;
},{"../Events/Event":"src/Engine/Events/Event.ts"}],"src/Engine/Math/Vec2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distSqrd = distSqrd;
exports.dist = dist;
exports.diff = diff;
exports.magSqrd = magSqrd;
exports.mag = mag;
exports.expand = expand;
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2 = function Vec2() {
  _classCallCheck(this, Vec2);

  Object.defineProperty(this, "x", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
  Object.defineProperty(this, "y", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: void 0
  });
};

exports.default = Vec2;

function distSqrd(a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
}

function dist(a, b) {
  return Math.sqrt(distSqrd(a, b));
}

function diff(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
}

function magSqrd(a) {
  return Math.pow(a.x, 2) + Math.pow(a.y, 2);
}

function mag(a) {
  return Math.sqrt(magSqrd(a));
}

function expand(a) {
  return {
    x: a.x,
    y: a.y
  };
}
},{}],"src/Game/Objects/Path.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vec = require("../../Engine/Math/Vec2");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents a path of points
 */
var Path = /*#__PURE__*/function () {
  // getting percent done? For knowing when to fire stuff?
  // could just use the elapsed time

  /**
   * Creates a new path
   * @param onEndPath Gets called when the path is finished
   */
  function Path() {
    var _this = this;

    var loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var onEndPath = arguments.length > 1 ? arguments[1] : undefined;
    var wrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Path);

    Object.defineProperty(this, "loop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: loop
    });
    Object.defineProperty(this, "onEndPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: onEndPath
    });
    Object.defineProperty(this, "wrap", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: wrap
    });
    Object.defineProperty(this, "points", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "curPointIndex", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "curDistanceTraveled", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "addPoint", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(point) {
        _this.points.push(point);
      }
    });
    Object.defineProperty(this, "clear", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.points.length = 0;
        _this.curDistanceTraveled = 0;
        _this.curPointIndex = 0;
      }
    });
  }
  /**
   * Travel a certain distance on the path
   * @param distance Distance to travel
   * @returns The current point on a path
   */


  _createClass(Path, [{
    key: "travel",
    value: function travel(distance) {
      var nextIndex = this.curPointIndex + 1;

      if (this.curPointIndex >= this.points.length - 1) {
        if (this.loop) {
          this.curPointIndex = this.points.length - 1;
          nextIndex = 0;
        } else if (this.wrap) {
          this.curPointIndex = 0;
          this.curDistanceTraveled = 0;
          nextIndex = 1;
        } else {
          // console.log('Ending');
          // call onEnded?
          if (this.onEndPath) {
            this.onEndPath();
          }

          return this.points[this.points.length - 1];
        }
      }

      var distBetweenPoints = (0, _Vec.dist)(this.points[this.curPointIndex], this.points[nextIndex]);
      this.curDistanceTraveled += distance; // skip over points until we land between two of them
      // or we reach the end

      while (this.curDistanceTraveled >= distBetweenPoints) {
        this.curDistanceTraveled -= distBetweenPoints;

        if (this.loop) {
          this.curPointIndex = (this.curPointIndex + 1) % this.points.length;
          nextIndex = this.curPointIndex === 0 ? 1 : this.curPointIndex + 1;
        } else {
          this.curPointIndex++;
          nextIndex = this.curPointIndex + 1;
        }

        if (this.curPointIndex >= this.points.length - 1) {
          if (this.loop) {
            nextIndex = 0;
          } else if (this.wrap) {
            this.curPointIndex = 0;
            this.curDistanceTraveled = 0;
            nextIndex = 1;
          } else {
            // console.log('Ending 2');
            // call onEnded?
            if (this.onEndPath) {
              this.onEndPath();
            }

            return this.points[this.points.length - 1];
          }
        }
      }

      var a = this.points[this.curPointIndex];
      var b = this.points[nextIndex];
      distBetweenPoints = (0, _Vec.dist)(a, b);
      var diffBetweenPoints = (0, _Vec.diff)(a, b);
      var traveledRatio = this.curDistanceTraveled / distBetweenPoints;
      return {
        x: a.x + diffBetweenPoints.x * traveledRatio,
        y: a.y + diffBetweenPoints.y * traveledRatio
      };
    }
  }, {
    key: "lengthSquared",
    get: function get() {
      var length = 0;

      for (var i = 0; i < this.points.length; i++) {
        var nextIndex = i + 1;

        if (nextIndex >= this.points.length) {
          return length;
        }

        length += (0, _Vec.distSqrd)(this.points[i], this.points[nextIndex]);
      }

      return length;
    }
  }, {
    key: "length",
    get: function get() {
      return Math.sqrt(this.lengthSquared);
    }
  }, {
    key: "numberOfPoints",
    get: function get() {
      return this.points.length;
    }
  }]);

  return Path;
}();

exports.default = Path;
},{"../../Engine/Math/Vec2":"src/Engine/Math/Vec2.ts"}],"src/Engine/Animation/Animation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation = /*#__PURE__*/function () {
  function Animation(frames, animTime) {
    var _this = this;

    var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Animation);

    Object.defineProperty(this, "frames", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: frames
    });
    Object.defineProperty(this, "loop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: loop
    });
    Object.defineProperty(this, "_elapsedTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_curFrame", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "_timePerFrame", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "reset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this._elapsedTime = 0;
        _this._curFrame = 1;
      }
    });
    Object.defineProperty(this, "watch", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this._elapsedTime += elapsedTime;

        if (_this._elapsedTime >= _this._timePerFrame * _this._curFrame) {
          if (_this.loop) {
            if (_this._curFrame >= _this.frames.length) {
              _this._elapsedTime = 0;
              _this._curFrame = 1;
            } else {
              _this._curFrame += 1;
            }
          } else {
            _this._curFrame += _this._curFrame < _this.frames.length ? 1 : _this.frames.length;
          }
        }

        return _this.frames[_this._curFrame - 1];
      }
    });
    this._timePerFrame = animTime / (frames.length + 1);
  }

  _createClass(Animation, [{
    key: "timePerFrame",
    get: function get() {
      return this._timePerFrame;
    }
  }, {
    key: "currentFrame",
    get: function get() {
      return this.frames[this._curFrame - 1];
    }
  }]);

  return Animation;
}();

exports.default = Animation;
},{}],"settings.js":[function(require,module,exports) {
module.exports = {
  showCollisionShapes: false
};
},{}],"src/Game/Objects/Player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vec = require("../../Engine/Math/Vec2");

var _Path = _interopRequireDefault(require("./Path"));

var _Animation = _interopRequireDefault(require("../../Engine/Animation/Animation"));

var _settings = _interopRequireDefault(require("../../../settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(props, audioSystem) {
    var _this = this;

    _classCallCheck(this, Player);

    Object.defineProperty(this, "props", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: props
    });
    Object.defineProperty(this, "audioSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: audioSystem
    });
    Object.defineProperty(this, "_center", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_inMove", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "_animPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_rotation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: Math.PI
    });
    /**
     * Change in x when on a log or turtle
     */

    Object.defineProperty(this, "_speedX", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "pixels", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 100
    });
    /**
     * Time in milliseconds for player travel/animations
     */

    Object.defineProperty(this, "milli", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 500
    });
    Object.defineProperty(this, "speed", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.pixels / this.milli
    });
    Object.defineProperty(this, "_currentFrame", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 'frogger-idle'
    });
    Object.defineProperty(this, "_anim", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _Animation.default(['frogger-1', 'frogger-2', 'frogger-3', 'frogger-4', 'frogger-3', 'frogger-2', 'frogger-1', 'frogger-idle'], this.milli)
    });
    Object.defineProperty(this, "internalUpdate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this.internalUpdate(elapsedTime);
      }
    });
    Object.defineProperty(this, "render", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        var _this$_center = _this._center,
            x = _this$_center.x,
            y = _this$_center.y;
        cr.drawSubTexture(_this.props.spriteSheet, _this._currentFrame, // -60 will line up the sprite in the center vertically. This is because
        // we're drawing a sprite bigger than it actually is.
        {
          x: x,
          y: y
        }, _this._rotation, true); // draw circle showing center of frogger

        if (_settings.default.showCollisionShapes) {
          cr.drawCircle(x, y, 10);
        } // draw larger circle showing collision radius

      }
    });
    Object.defineProperty(this, "moveLeft", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        if (_this._inMove) {
          return;
        }

        if (_this._center.x <= 1024 * (1 / 13)) {
          return;
        }

        _this.audioSystem.addAudio('audio/sound-frogger-hop.mp3', 0, false, 0.5);

        _this.initializeMove(Math.PI / 2, function (a) {
          return {
            x: a.x - _this.props.delta,
            y: a.y
          };
        });
      }
    });
    Object.defineProperty(this, "moveRight", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        if (_this._inMove) {
          return;
        }

        if (_this._center.x >= 1024 * (12 / 13)) {
          return;
        }

        _this.audioSystem.addAudio('audio/sound-frogger-hop.mp3', 0, false, 0.5);

        _this.initializeMove(-Math.PI / 2, function (a) {
          return {
            x: a.x + _this.props.delta,
            y: a.y
          };
        });
      }
    });
    Object.defineProperty(this, "moveUp", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        if (_this._inMove) {
          return;
        }

        _this._speedX = 0;

        _this.audioSystem.addAudio('audio/sound-frogger-hop.mp3', 0, false, 0.5);

        _this.initializeMove(Math.PI, function (a) {
          return {
            x: a.x,
            y: a.y - _this.props.delta
          };
        });
      }
    });
    Object.defineProperty(this, "moveDown", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        if (_this._inMove) {
          return;
        }

        if (_this._center.y > 1024 * 12 / 13) {
          return;
        }

        _this._speedX = 0;

        _this.audioSystem.addAudio('audio/sound-frogger-hop.mp3', 0, false, 0.5);

        _this.initializeMove(0, function (a) {
          return {
            x: a.x,
            y: a.y + _this.props.delta
          };
        });
      }
    });
    Object.defineProperty(this, "initializeMove", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(rotation, modify) {
        _this._inMove = true;
        _this._rotation = rotation;

        _this._anim.reset();

        _this._animPath.clear();

        _this._animPath.addPoint((0, _Vec.expand)(_this._center));

        _this._animPath.addPoint(modify(_this._center));

        _this.internalUpdate = _this.handleTravelStep;
      }
    });
    Object.defineProperty(this, "handleAnimationDone", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this._currentFrame = 'frogger-1';
        _this._inMove = false;
        _this.internalUpdate = _this.handleBeingMoved;
      }
    });
    Object.defineProperty(this, "handleTravelStep", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        if (!_this._inMove) {
          return;
        }

        var newPoint = _this._animPath.travel(_this.speed * elapsedTime);

        _this._center.x = newPoint.x;

        _this.handleBeingMoved(elapsedTime);

        _this._center.y = newPoint.y;
        _this._currentFrame = _this._anim.watch(elapsedTime);
      }
    });
    Object.defineProperty(this, "handleBeingMoved", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this._center.x += _this._speedX * elapsedTime;
      }
    });
    this._center = props.center;
    this.internalUpdate = this.handleBeingMoved;
    this._animPath = new _Path.default(false, this.handleAnimationDone);
  }

  _createClass(Player, [{
    key: "collisionShape",
    get: function get() {
      return {
        center: this._center,
        radius: this.props.collisionRadius
      };
    }
  }, {
    key: "center",
    get: function get() {
      return this._center;
    }
  }, {
    key: "idle",
    get: function get() {
      return this._currentFrame === 'frogger-idle' && !this._inMove;
    }
  }, {
    key: "speedX",
    set: function set(newDeltaX) {
      this._speedX = newDeltaX;
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"../../Engine/Math/Vec2":"src/Engine/Math/Vec2.ts","./Path":"src/Game/Objects/Path.ts","../../Engine/Animation/Animation":"src/Engine/Animation/Animation.ts","../../../settings":"settings.js"}],"src/Engine/Graphics/SpriteSheet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpriteSheet = /*#__PURE__*/function () {
  function SpriteSheet(source, bounds) {
    var _this = this;

    _classCallCheck(this, SpriteSheet);

    Object.defineProperty(this, "bounds", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: bounds
    });
    Object.defineProperty(this, "_ready", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "_image", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new Image()
    });

    this._image.onload = function () {
      _this._ready = true;
      console.log('loaded image');
    };

    this._image.src = source;
  }

  _createClass(SpriteSheet, [{
    key: "getBounds",
    value: function getBounds(key) {
      if (key === undefined) {
        console.error('Passed in key is undefined');
      }

      return this.bounds[key];
    }
  }, {
    key: "image",
    get: function get() {
      return this._image;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }]);

  return SpriteSheet;
}();

exports.default = SpriteSheet;
},{}],"src/Game/Objects/PathedObject.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Path = _interopRequireDefault(require("./Path"));

var _Rectangle = require("../../Engine/Geometry/Rectangle");

var _settings = _interopRequireDefault(require("../../../settings"));

var _Animation = _interopRequireDefault(require("../../Engine/Animation/Animation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PathedObject = /*#__PURE__*/function () {
  function PathedObject(props, animProps) {
    var _this = this;

    _classCallCheck(this, PathedObject);

    Object.defineProperty(this, "props", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: props
    });
    Object.defineProperty(this, "state", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "anim", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "curFrame", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "rotation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "_canStand", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        var newPoint = _this.state.path.travel(_this.state.speed * elapsedTime);

        _this.state.center = newPoint;
        _this.state.bounds.x = newPoint.x - _this.state.bounds.w / 2;
        _this.state.bounds.y = newPoint.y - _this.state.bounds.h / 2;

        if (_this.anim) {
          _this.curFrame = _this.anim.watch(elapsedTime);

          if (/chomp/.test(_this.curFrame)) {
            _this.rotation = -Math.PI / 2;
            _this._canStand = false;
          } else {
            _this.rotation = 0;
            _this._canStand = true;
          }
        }
      }
    });
    Object.defineProperty(this, "render", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        cr.drawSubTexture(_this.props.ss, _this.curFrame, _this.state.center, _this.rotation, true); // // center

        if (_settings.default.showCollisionShapes) {
          cr.drawCircle(_this.state.center.x, _this.state.center.y, 10, '#fff', '#f00'); // collision box

          cr.drawRectangle(_this.state.bounds.x, _this.state.bounds.y, _this.state.bounds.w, _this.state.bounds.h, 0, 'rgba(00, 104, 255, 0.5)');
        }
      }
    });
    Object.defineProperty(this, "testPoint", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(a) {
        // const { x, y } = this.state.center;
        // const { w, h } = this.state.bounds;
        // const collisionBox = new Rectangle(x - w / 2, y - h / 2, 2, h)
        return _this.state.bounds.inBounds(a);
      }
    });
    this.state = {
      speed: props.speed,
      path: new _Path.default(false, undefined, true),
      center: props.center,
      bounds: (0, _Rectangle.copy)(this.props.ss.getBounds(this.props.asset))
    };

    if (animProps) {
      this.anim = new _Animation.default(animProps.frames, animProps.loopTime, true);
      this.curFrame = animProps.frames[0];
    } else {
      this.curFrame = this.props.asset;
    }

    this.rotation = props.goingLeft ? Math.PI : 0;

    var _this$props$ss$getBou = this.props.ss.getBounds(this.props.asset),
        w = _this$props$ss$getBou.w;

    var halfWidth = w / 2;

    if (!props.goingLeft) {
      this.state.path.addPoint({
        x: -halfWidth,
        y: props.center.y
      });
      this.state.path.addPoint({
        x: 1024 + halfWidth,
        y: props.center.y
      });
    } else {
      this.state.path.addPoint({
        x: 1024 + halfWidth,
        y: props.center.y
      });
      this.state.path.addPoint({
        x: -halfWidth,
        y: props.center.y
      });
    }

    this.state.path.travel(props.center.x);
  }

  _createClass(PathedObject, [{
    key: "speed",
    get: function get() {
      return this.state.speed;
    },
    set: function set(newSpeed) {
      this.state.speed = newSpeed;
    }
  }, {
    key: "goingLeft",
    get: function get() {
      return this.props.goingLeft;
    }
  }, {
    key: "type",
    get: function get() {
      return this.anim ? 'alligator' : this.props.type;
    }
  }, {
    key: "canStandOn",
    get: function get() {
      return this._canStand;
    }
  }]);

  return PathedObject;
}();

exports.default = PathedObject;
},{"./Path":"src/Game/Objects/Path.ts","../../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts","../../../settings":"settings.js","../../Engine/Animation/Animation":"src/Engine/Animation/Animation.ts"}],"src/Game/Objects/AnimatedAnimal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PathedObject2 = _interopRequireDefault(require("./PathedObject"));

var _Animation = _interopRequireDefault(require("../../Engine/Animation/Animation"));

var _settings = _interopRequireDefault(require("../../../settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimatedAnimal = /*#__PURE__*/function (_PathedObject) {
  _inherits(AnimatedAnimal, _PathedObject);

  var _super = _createSuper(AnimatedAnimal);

  function AnimatedAnimal(frames, duration, props) {
    var _this;

    _classCallCheck(this, AnimatedAnimal);

    _this = _super.call(this, props);
    Object.defineProperty(_assertThisInitialized(_this), "_anim", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        var newPoint = _this.state.path.travel(_this.state.speed * elapsedTime);

        _this.state.center = newPoint;
        _this.state.bounds.x = newPoint.x - _this.state.bounds.w / 2;
        _this.state.bounds.y = newPoint.y - _this.state.bounds.h / 2;

        _this._anim.watch(elapsedTime);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "render", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        cr.drawSubTexture(_this.props.ss, _this._anim.currentFrame, {
          x: _this.state.center.x,
          y: _this.state.center.y
        }, _this.props.goingLeft ? Math.PI : 0, true); // // center

        if (_settings.default.showCollisionShapes) {
          cr.drawCircle(_this.state.center.x, _this.state.center.y, 10, '#fff', '#f00'); // collision box

          cr.drawRectangle(_this.state.bounds.x, _this.state.bounds.y, _this.state.bounds.w, _this.state.bounds.h, 0, 'rgba(00, 104, 255, 0.5)');
        }
      }
    });
    _this._anim = new _Animation.default(frames, duration, true);
    return _this;
  }

  _createClass(AnimatedAnimal, [{
    key: "canStandOn",
    get: function get() {
      // add case for turtle and aligator
      return !/\w+-dive-4/.test(this._anim.currentFrame);
    }
  }]);

  return AnimatedAnimal;
}(_PathedObject2.default);

exports.default = AnimatedAnimal;
},{"./PathedObject":"src/Game/Objects/PathedObject.ts","../../Engine/Animation/Animation":"src/Engine/Animation/Animation.ts","../../../settings":"settings.js"}],"src/Game/Systems/PathedObjectSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PathedObject = _interopRequireDefault(require("../Objects/PathedObject"));

var _AnimatedAnimal = _interopRequireDefault(require("../Objects/AnimatedAnimal"));

var _GameSettings = _interopRequireDefault(require("../../Engine/Settings/GameSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PathedObjectSystem = /*#__PURE__*/function () {
  function PathedObjectSystem() {
    var _this = this;

    _classCallCheck(this, PathedObjectSystem);

    Object.defineProperty(this, "_objs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "rows", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: [{
        num: 0,
        speed: 0,
        type: 'car',
        asset: ''
      }, {
        num: 3,
        speed: 80 / 1000,
        type: 'log',
        asset: 'med-log'
      }, {
        num: 3,
        speed: 70 / 1000,
        type: 'tur',
        asset: 'turtle-1'
      }, {
        num: 2,
        speed: 80 / 1000,
        type: 'log',
        asset: 'big-log'
      }, {
        num: 3,
        speed: 50 / 1000,
        type: 'log',
        asset: 'sml-log'
      }, {
        num: 3,
        speed: 80 / 1000,
        type: 'tur',
        asset: 'turtle-1'
      }, {
        num: 0,
        speed: 0,
        type: 'car',
        asset: ''
      }, {
        num: 1,
        speed: 100 / 1000,
        type: 'car',
        asset: 'semi-truck'
      }, {
        num: 3,
        speed: 130 / 1000,
        type: 'car',
        asset: 'blue-car'
      }, {
        num: 2,
        speed: 130 / 1000,
        type: 'car',
        asset: 'fire-truck'
      }, {
        num: 3,
        speed: 120 / 1000,
        type: 'car',
        asset: 'green-car'
      }, {
        num: 3,
        speed: 100 / 1000,
        type: 'car',
        asset: 'yellow-car'
      }, {
        num: 0,
        speed: 0,
        type: 'car',
        asset: ''
      }]
    });
    Object.defineProperty(this, "initializeObjects", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(numCols, height, ss) {
        _this._objs.length = 0;

        for (var row = 0; row < _this.rows.length; row++) {
          var newY = height * row;
          var newX = _GameSettings.default.width / _this.rows[row].num;

          if (_this.rows[row].type === 'tur') {
            var turtleFrames = [1, 2, 3, 4, 5, 6, 7].map(function (x) {
              return "turtle-".concat(x);
            });
            var divingFrames = [1, 2, 3, 4, 3, 2, 1].map(function (x) {
              return "turtle-dive-".concat(x);
            }); // create 3 turtles

            for (var i = 0; i < _this.rows[row].num; i++) {
              var curFrames = i === 0 ? [].concat(_toConsumableArray(turtleFrames), _toConsumableArray(divingFrames)) : _toConsumableArray(turtleFrames);

              var _ss$getBounds = ss.getBounds(_this.rows[row].asset),
                  w = _ss$getBounds.w;

              var numAnimals = row === 2 ? 2 : 3;

              for (var j = 1; j <= numAnimals; j++) {
                _this._objs.push(new _AnimatedAnimal.default(curFrames, i === 0 ? 6000 : 2000, {
                  speed: _this.rows[row].speed,
                  type: _this.rows[row].type,
                  center: {
                    x: newX * i + w * j,
                    y: newY + height / 2
                  },
                  ss: ss,
                  goingLeft: row % 2 === 0,
                  asset: _this.rows[row].asset
                }));
              }
            }
          } else {
            for (var _i = 0; _i < _this.rows[row].num; _i++) {
              if (_i === 0 && row === 1) {
                _this._objs.push(new _PathedObject.default({
                  speed: _this.rows[row].speed,
                  type: _this.rows[row].type,
                  center: {
                    x: newX + newX * _i,
                    y: newY + height / 2
                  },
                  ss: ss,
                  goingLeft: row % 2 === 0,
                  asset: _this.rows[row].asset
                }, {
                  frames: ['aligator-idle', 'aligator-chomp'],
                  loopTime: 4000
                }));

                continue;
              }

              _this._objs.push(new _PathedObject.default({
                speed: _this.rows[row].speed,
                type: _this.rows[row].type,
                center: {
                  x: newX + newX * _i,
                  y: newY + height / 2
                },
                ss: ss,
                goingLeft: row % 2 === 0,
                asset: _this.rows[row].asset
              }));
            }
          }
        } // 3 cars
        // 3 cars
        // 3 cars
        // 1 car
        // 2 cars

      }
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        for (var i = 0; i < _this._objs.length; i++) {
          _this._objs[i].update(elapsedTime);
        }
      }
    });
    Object.defineProperty(this, "render", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        for (var i = 0; i < _this._objs.length; i++) {
          _this._objs[i].render(cr);
        }
      }
    });
  }

  _createClass(PathedObjectSystem, [{
    key: "objects",
    get: function get() {
      return this._objs;
    }
  }]);

  return PathedObjectSystem;
}();

exports.default = PathedObjectSystem;
},{"../Objects/PathedObject":"src/Game/Objects/PathedObject.ts","../Objects/AnimatedAnimal":"src/Game/Objects/AnimatedAnimal.ts","../../Engine/Settings/GameSettings":"src/Engine/Settings/GameSettings.ts"}],"src/Game/Objects/HomePad.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Rectangle = _interopRequireDefault(require("../../Engine/Geometry/Rectangle"));

var _Path = _interopRequireDefault(require("./Path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomePad = /*#__PURE__*/function () {
  function HomePad(x, y, w, h) {
    var _this = this;

    _classCallCheck(this, HomePad);

    Object.defineProperty(this, "_bounds", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "hasFrog", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "hasFly", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "hasAligator", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "path", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "speed", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_curPos", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "timeSpan", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3000
    });
    Object.defineProperty(this, "elapsedTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        // if has fly, keep it there for 2 seconds
        if (_this.hasFly) {
          _this.elapsedTime += elapsedTime;

          if (_this.elapsedTime >= _this.timeSpan) {
            _this.elapsedTime = 0;
            _this.hasFly = false;
          }
        } // if there is a aligator, update it


        if (_this.hasAligator) {
          _this._curPos = _this.path.travel(_this.speed * elapsedTime);
        }
      }
    });
    Object.defineProperty(this, "putFly", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        console.log('FLY');
        _this.hasFly = true;
        _this.elapsedTime = 0;
      }
    });
    Object.defineProperty(this, "putAligator", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        console.log('ALIGATOR');
        _this.hasAligator = true;
        _this.elapsedTime = 0;
        _this.path = new _Path.default(false, function () {
          _this.hasAligator = false;
        });
        var y = _this._bounds.y + 30;

        _this.path.addPoint({
          x: _this._bounds.x - 10,
          y: y
        });

        _this.path.addPoint({
          x: _this._bounds.x + _this._bounds.w / 2 - 10,
          y: y
        });

        _this.path.addPoint({
          x: _this._bounds.x - 10,
          y: y
        });

        _this.speed = _this.path.length / _this.timeSpan;
      }
    });
    this._bounds = new _Rectangle.default(x - w / 2, y - h / 2, w, h);
  }

  _createClass(HomePad, [{
    key: "inBounds",
    value: function inBounds(a) {
      return this._bounds.inBounds(a);
    }
  }, {
    key: "bounds",
    get: function get() {
      return this._bounds;
    }
  }, {
    key: "aligatorPos",
    get: function get() {
      return this._curPos;
    }
  }]);

  return HomePad;
}();

exports.default = HomePad;
},{"../../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts","./Path":"src/Game/Objects/Path.ts"}],"src/Game/Renderers/HomePadRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = _interopRequireDefault(require("../../../settings"));

var _Rectangle = require("../../Engine/Geometry/Rectangle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePadRenderer = function HomePadRenderer(homePad) {
  return function (cr, ss) {
    var _homePad$bounds = homePad.bounds,
        x = _homePad$bounds.x,
        y = _homePad$bounds.y,
        w = _homePad$bounds.w,
        h = _homePad$bounds.h;
    cr.drawSubTexture(ss, 'pad-tile', {
      x: x,
      y: y
    }, 0);

    if (homePad.hasFrog) {
      cr.drawSubTexture(ss, 'frogger-idle', {
        x: x + 13,
        y: y
      }, 0);
    }

    if (homePad.hasFly) {
      cr.drawSubTexture(ss, 'fly', {
        x: x + 20,
        y: y + 20
      }, 0);
    }

    if (homePad.hasAligator) {
      var newBounds = (0, _Rectangle.copy)(homePad.bounds);
      newBounds.x += 15;
      cr.drawSubTexture(ss, 'aligator-head', homePad.aligatorPos, 0); // cr.drawSubTextureInClip(
      //     ss,
      //     'aligator-head',
      //     homePad.aligatorPos,
      //     true,
      //     newBounds,
      // );
    } // debug shapd


    if (_settings.default.showCollisionShapes) {
      cr.drawRectangle(x, y, w, h, 0, 'rgba(0, 170, 255, 0.5');
    }
  };
};

var _default = HomePadRenderer;
exports.default = _default;
},{"../../../settings":"settings.js","../../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts"}],"src/Engine/Math/random.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = void 0;
// This is used to give a small performance optimization
// in generating gaussian random numbers.
var usePrevious = false;
var y2 = 0;
var random;
exports.random = random;

(function (random) {
  function nextGaussian(mean, stdDev) {
    var x1 = 0;
    var x2 = 0;
    var y1 = 0;
    var z = 0;

    if (usePrevious) {
      usePrevious = false;
      return mean + y2 * stdDev;
    }

    usePrevious = true;

    do {
      x1 = 2 * Math.random() - 1;
      x2 = 2 * Math.random() - 1;
      z = x1 * x1 + x2 * x2;
    } while (z >= 1);

    z = Math.sqrt(-2 * Math.log(z) / z);
    y1 = x1 * z;
    y2 = x2 * z;
    return mean + y1 * stdDev;
  }

  random.nextGaussian = nextGaussian;

  function nextRange(min, max) {
    var range = max - min;
    return Math.floor(Math.random() * range + min);
  }

  random.nextRange = nextRange;

  function nextCircleVector() {
    var angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
  }

  random.nextCircleVector = nextCircleVector;

  function nextAngleVector() {
    var maxAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2 * Math.PI;
    var angle = Math.random() * maxAngle;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
  }

  random.nextAngleVector = nextAngleVector;

  function nextAngleInCone(centerAngle) {
    var angleOfCone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.PI / 2;
    var generatingMean = angleOfCone / 2;
    var particleAngle = nextGaussian(generatingMean, angleOfCone / 4) + angleOfCone;
    var angle = centerAngle - generatingMean + particleAngle;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
  }

  random.nextAngleInCone = nextAngleInCone;
  /**
   * Returns true or false, 50% chance
   * @returns {boolean} True or false
   */

  function coinFlip() {
    return Math.random() >= 0.5;
  }

  random.coinFlip = coinFlip;
})(random || (exports.random = random = {}));
},{}],"src/Game/Systems/HomePadSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HomePad = _interopRequireDefault(require("../Objects/HomePad"));

var _HomePadRenderer = _interopRequireDefault(require("../Renderers/HomePadRenderer"));

var _random = require("../../Engine/Math/random");

var _GameSettings = _interopRequireDefault(require("../../Engine/Settings/GameSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomePadSystem = /*#__PURE__*/function () {
  function HomePadSystem(ss, tileWidth, tileHeight) {
    var _this = this;

    _classCallCheck(this, HomePadSystem);

    Object.defineProperty(this, "ss", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ss
    });
    Object.defineProperty(this, "tileWidth", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tileWidth
    });
    Object.defineProperty(this, "tileHeight", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: tileHeight
    });
    Object.defineProperty(this, "homePads", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "renderers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "timeSpacing", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 13000
    });
    /**
     * Time in between special events like putting a fly or aligator.
     */

    Object.defineProperty(this, "timeSinceLastSpecial", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this.timeSinceLastSpecial += elapsedTime;

        if (_this.timeSinceLastSpecial >= _this.timeSpacing) {
          _this.timeSinceLastSpecial -= _this.timeSpacing;

          var available = _this.homePads.filter(function (x) {
            return !x.hasFrog;
          });

          if (available.length === 0) {
            return;
          }

          var chosenIndex = _random.random.nextRange(0, available.length);

          if (_random.random.coinFlip()) {
            // fly
            available[chosenIndex].putFly();
          } else {
            // aligator
            available[chosenIndex].putAligator();
          } // this.homePads[available.length - 1].putAligator();

        }

        for (var i = 0; i < _this.homePads.length; i++) {
          _this.homePads[i].update(elapsedTime);
        }
      }
    });
    Object.defineProperty(this, "render", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        for (var i = 0; i < _this.renderers.length; i++) {
          _this.renderers[i](cr, _this.ss);
        }
      }
    });
    this.homePads.length = 0;
    this.renderers.length = 0;
    var numPads = 5;
    var padding = 100;
    var padSpacing = (_GameSettings.default.width - padding * 2) / (numPads - 1);

    for (var i = 0; i < numPads; i++) {
      var x = padding + i * padSpacing;
      var pad = new _HomePad.default(x, this.tileHeight / 2, this.tileWidth, this.tileHeight);
      this.homePads.push(pad);
      this.renderers.push((0, _HomePadRenderer.default)(pad));
    }
  }

  _createClass(HomePadSystem, [{
    key: "pads",
    get: function get() {
      return this.homePads;
    }
  }]);

  return HomePadSystem;
}();

exports.default = HomePadSystem;
},{"../Objects/HomePad":"src/Game/Objects/HomePad.ts","../Renderers/HomePadRenderer":"src/Game/Renderers/HomePadRenderer.ts","../../Engine/Math/random":"src/Engine/Math/random.ts","../../Engine/Settings/GameSettings":"src/Engine/Settings/GameSettings.ts"}],"src/Engine/Systems/BaseParticleSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseParticleSystem = /*#__PURE__*/function () {
  function BaseParticleSystem() {
    var _this = this;

    _classCallCheck(this, BaseParticleSystem);

    Object.defineProperty(this, "_particles", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "removeDeadParticles", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        for (var i = _this._particles.length - 1; i >= 0; i--) {
          _this._particles[i].update(elapsedTime);

          if (!_this._particles[i].alive) {
            _this._particles.splice(i, 1);

            continue;
          }
        }
      }
    });
  }

  _createClass(BaseParticleSystem, [{
    key: "clear",
    value: function clear() {
      this._particles.length = 0;
    }
  }, {
    key: "particles",
    get: function get() {
      return this._particles;
    }
  }]);

  return BaseParticleSystem;
}();

exports.default = BaseParticleSystem;
},{}],"src/Engine/Graphics/Particle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle(props) {
    var _this = this;

    _classCallCheck(this, Particle);

    Object.defineProperty(this, "props", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: props
    });
    /**
     * Elapsed time since particle creation
     */

    Object.defineProperty(this, "elapsedTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "color", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "colorTransition", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "fading", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        var _this$props = _this.props,
            speed = _this$props.speed,
            direction = _this$props.direction;
        _this.center.x += speed * direction.x * elapsedTime;
        _this.center.y += speed * direction.y * elapsedTime;
        _this.elapsedTime += elapsedTime; // this.updateColor(elapsedTime);
        // this.props.rotation += speed * 0.5;
      }
    });
    this.color = props.fromColor; // this.colorTransition = createColorTransition(
    //     props.fromColor,
    //     props.toColor,
    //     props.lifetime,
    // );
  }

  _createClass(Particle, [{
    key: "alive",
    get: function get() {
      return this.elapsedTime <= this.props.lifetime;
    }
  }, {
    key: "center",
    get: function get() {
      return this.props.center;
    }
  }, {
    key: "rotation",
    get: function get() {
      return this.props.rotation;
    }
  }, {
    key: "fill",
    get: function get() {
      return "rgb(".concat(this.color.r, ",").concat(this.color.g, ",").concat(this.color.b, ")");
    }
  }, {
    key: "size",
    get: function get() {
      return this.props.size;
    }
  }]);

  return Particle;
}();

exports.default = Particle;
},{}],"src/Game/Objects/PathedParticle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Particle2 = _interopRequireDefault(require("../../Engine/Graphics/Particle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PathedParticle = /*#__PURE__*/function (_Particle) {
  _inherits(PathedParticle, _Particle);

  var _super = _createSuper(PathedParticle);

  function PathedParticle(path, baseProps) {
    var _this;

    _classCallCheck(this, PathedParticle);

    _this = _super.call(this, baseProps);
    Object.defineProperty(_assertThisInitialized(_this), "path", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: path
    });
    Object.defineProperty(_assertThisInitialized(_this), "pathSpeed", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this.elapsedTime += elapsedTime;

        var newPos = _this.path.travel(_this.pathSpeed * elapsedTime); // // console.log(newPos);
        // // const { speed, direction } = this.props;


        _this.center.x = newPos.x + _this.pathSpeed * elapsedTime;
        _this.center.y = newPos.y + _this.pathSpeed * elapsedTime; // const { speed, direction } = this.props;
        // this.center.x += speed * direction.x * elapsedTime;
        // this.center.y += speed * direction.y * elapsedTime;
      }
    }); // need to go distance of path in props.lifetime

    _this.pathSpeed = path.length / baseProps.lifetime;
    return _this;
  }

  return PathedParticle;
}(_Particle2.default);

exports.default = PathedParticle;
},{"../../Engine/Graphics/Particle":"src/Engine/Graphics/Particle.ts"}],"src/Game/Systems/ParticleSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseParticleSystem2 = _interopRequireDefault(require("../../Engine/Systems/BaseParticleSystem"));

var _Vec = require("../../Engine/Math/Vec2");

var _random = require("../../Engine/Math/random");

var _Particle = _interopRequireDefault(require("../../Engine/Graphics/Particle"));

var _PathedParticle = _interopRequireDefault(require("../Objects/PathedParticle"));

var _Path = _interopRequireDefault(require("../Objects/Path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ParticleSystem = /*#__PURE__*/function (_BaseParticleSystem) {
  _inherits(ParticleSystem, _BaseParticleSystem);

  var _super = _createSuper(ParticleSystem);

  function ParticleSystem() {
    var _this;

    _classCallCheck(this, ParticleSystem);

    _this = _super.apply(this, arguments);
    Object.defineProperty(_assertThisInitialized(_this), "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        for (var i = _this._particles.length - 1; i >= 0; i--) {
          _this._particles[i].update(elapsedTime);

          if (!_this._particles[i].alive) {
            _this._particles.splice(i, 1);

            continue;
          }
        }
      }
    });
    return _this;
  }
  /**
   * Generates new particles in a cone
   * @param center Center to generate particles
   * @param direction Center in degrees
   */


  _createClass(ParticleSystem, [{
    key: "carCrash",
    value: function carCrash(center, direction, props) {
      // add flying chunks
      for (var particle = 0; particle < 50; particle++) {
        var size = Math.abs(_random.random.nextGaussian(props.size.mean, props.size.stdev));
        var speed = Math.abs(_random.random.nextGaussian(props.speed.mean, props.speed.stdev));
        var path = new _Path.default();
        path.addPoint((0, _Vec.expand)(center));

        var vec2Dir = _random.random.nextAngleInCone(direction);

        path.addPoint({
          x: center.x + vec2Dir.x * 100,
          y: center.y + vec2Dir.y * 100
        });
        var p = new _PathedParticle.default(path, {
          center: {
            x: center.x,
            y: center.y
          },
          size: {
            x: size,
            y: size
          },
          rotation: 0,
          speed: speed,
          direction: vec2Dir,
          lifetime: _random.random.nextGaussian(props.lifetime.mean, props.lifetime.stdev),
          fromColor: {
            r: props.fromColor.r,
            g: props.fromColor.g,
            b: props.fromColor.b,
            a: props.fromColor.a
          }
        });

        this._particles.push(p);
      } // add some stationary chunks
      // add some chunks to the car

    }
  }, {
    key: "showerSparks",
    value: function showerSparks(padBounds, props) {
      var _this2 = this;

      var startingY = padBounds.y + 18;
      var startingX = padBounds.x + 11;
      var innerWidth = 54; // left & right wall

      [startingX, startingX + innerWidth].map(function (x) {
        for (var y = startingY; y < padBounds.h; y += 1) {
          var center = {
            x: x,
            y: y
          };

          for (var particle = 0; particle < 5; particle++) {
            var size = Math.abs(_random.random.nextGaussian(props.size.mean, props.size.stdev));
            var speed = Math.abs(_random.random.nextGaussian(props.speed.mean, props.speed.stdev));
            var color = _random.random.coinFlip() ? {
              r: props.fromColor.r,
              g: props.fromColor.g,
              b: props.fromColor.b,
              a: props.fromColor.a
            } : {
              r: 239,
              g: 242,
              b: 191,
              a: props.fromColor.a
            };
            var p = new _Particle.default({
              center: center,
              size: {
                x: size,
                y: size
              },
              rotation: 0,
              speed: speed,
              direction: _random.random.nextAngleInCone(Math.PI),
              lifetime: _random.random.nextGaussian(props.lifetime.mean, props.lifetime.stdev),
              fromColor: color
            });

            _this2._particles.push(p);
          }
        }
      }); // top & bottom

      [startingY].map(function (y) {
        for (var x = startingX; x < innerWidth + startingX; x += 1) {
          var center = {
            x: x,
            y: y
          };

          for (var particle = 0; particle < 5; particle++) {
            var size = Math.abs(_random.random.nextGaussian(props.size.mean, props.size.stdev));
            var speed = Math.abs(_random.random.nextGaussian(props.speed.mean, props.speed.stdev));
            var color = _random.random.coinFlip() ? {
              r: props.fromColor.r,
              g: props.fromColor.g,
              b: props.fromColor.b,
              a: props.fromColor.a
            } : {
              r: 239,
              g: 242,
              b: 191,
              a: props.fromColor.a
            };
            var p = new _Particle.default({
              center: center,
              size: {
                x: size,
                y: size
              },
              rotation: 0,
              speed: speed,
              direction: _random.random.nextAngleInCone(Math.PI),
              lifetime: _random.random.nextGaussian(props.lifetime.mean, props.lifetime.stdev),
              fromColor: color
            });

            _this2._particles.push(p);
          }
        }
      });
    }
  }, {
    key: "froggerBlood",
    value: function froggerBlood(deathCenter, props) {
      console.log('hello');

      for (var particle = 0; particle < 500; particle++) {
        var size = Math.abs(_random.random.nextGaussian(props.size.mean, props.size.stdev));
        var speed = Math.abs(_random.random.nextGaussian(props.speed.mean, props.speed.stdev));
        var color = _random.random.coinFlip() ? {
          r: props.fromColor.r,
          g: props.fromColor.g,
          b: props.fromColor.b,
          a: props.fromColor.a
        } : {
          r: 51,
          g: 204,
          b: 51,
          a: 1
        };
        var p = new _Particle.default({
          center: (0, _Vec.expand)(deathCenter),
          size: {
            x: size,
            y: size
          },
          rotation: 0,
          speed: speed,
          direction: _random.random.nextCircleVector(),
          lifetime: _random.random.nextGaussian(props.lifetime.mean, props.lifetime.stdev),
          fromColor: color
        });

        this._particles.push(p);
      }
    }
  }, {
    key: "splash",
    value: function splash(center, props) {
      for (var particle = 0; particle < 1000; particle++) {
        var size = Math.abs(_random.random.nextGaussian(props.size.mean, props.size.stdev));
        var speed = Math.abs(_random.random.nextGaussian(props.speed.mean, props.speed.stdev));
        var p = new _Particle.default({
          center: (0, _Vec.expand)(center),
          size: {
            x: size,
            y: size
          },
          rotation: 0,
          speed: speed,
          direction: _random.random.nextCircleVector(),
          lifetime: _random.random.nextGaussian(props.lifetime.mean, props.lifetime.stdev),
          fromColor: props.fromColor
        });

        this._particles.push(p);
      }
    }
  }]);

  return ParticleSystem;
}(_BaseParticleSystem2.default);

exports.default = ParticleSystem;
},{"../../Engine/Systems/BaseParticleSystem":"src/Engine/Systems/BaseParticleSystem.ts","../../Engine/Math/Vec2":"src/Engine/Math/Vec2.ts","../../Engine/Math/random":"src/Engine/Math/random.ts","../../Engine/Graphics/Particle":"src/Engine/Graphics/Particle.ts","../Objects/PathedParticle":"src/Game/Objects/PathedParticle.ts","../Objects/Path":"src/Game/Objects/Path.ts"}],"src/Engine/Renderers/ParticleSystemRenderer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ParticleSystemRenderer = function ParticleSystemRenderer(particleSystem) {
  return function (cr) {
    var particles = particleSystem.particles;

    for (var i = particles.length - 1; i >= 0; i--) {
      var _particles$i = particles[i],
          center = _particles$i.center,
          rotation = _particles$i.rotation,
          size = _particles$i.size,
          fill = _particles$i.fill;
      cr.drawRectangle(center.x, center.y, size.x, size.y, rotation, fill, '#ff3300');
    }
  };
};

var _default = ParticleSystemRenderer;
exports.default = _default;
},{}],"src/Game/Systems/ScoringSystem.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScoringSystem = /*#__PURE__*/function () {
  function ScoringSystem() {
    var numRows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 13;

    _classCallCheck(this, ScoringSystem);

    Object.defineProperty(this, "numRows", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: numRows
    });
    Object.defineProperty(this, "_visitedArray", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
    Object.defineProperty(this, "_currentRow", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "_score", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    this.resetForNewFrog();
  }

  _createClass(ScoringSystem, [{
    key: "gotFly",
    value: function gotFly() {
      this._score += 200;
    }
  }, {
    key: "landOnPad",
    value: function landOnPad() {
      this._score += 50;
    }
  }, {
    key: "beatLevel",
    value: function beatLevel() {
      this._score += 1000;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this._currentRow++;

      if (!this._visitedArray[this._currentRow]) {
        this._visitedArray[this._currentRow] = true;
        this._score += 10;
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this._currentRow--;
    }
  }, {
    key: "resetForNewFrog",
    value: function resetForNewFrog() {
      for (var i = 0; i < this.numRows; i++) {
        this._visitedArray[i] = false;
      }

      this._currentRow = 0;
    }
    /**
     * Scores left over time
     * @param time Time in ms
     */

  }, {
    key: "accountForTime",
    value: function accountForTime(time) {
      var scoreTime = Math.round(time / 100);
      this._score += scoreTime;
    }
  }, {
    key: "resetScore",
    value: function resetScore() {
      this._score = 0;
    }
  }, {
    key: "score",
    get: function get() {
      return this._score;
    }
  }]);

  return ScoringSystem;
}();

exports.default = ScoringSystem;
},{}],"src/Engine/Input/Keyboard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    var _this = this;

    var clearBuffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Keyboard);

    Object.defineProperty(this, "clearBuffer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: clearBuffer
    });
    Object.defineProperty(this, "inputBuffer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    Object.defineProperty(this, "handlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {}
    });
    /**
     * Assigns a handler to fire when a key is pressed
     * @param key The key to register
     * @param handler Command to execute when key is pressed
     */

    Object.defineProperty(this, "register", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(key, handler) {
        if (!_this.handlers[key]) {
          _this.handlers[key] = [];
        }

        _this.handlers[key].push(handler);
      }
    });
    Object.defineProperty(this, "addToInputBuffer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(event) {
        _this.inputBuffer[event.key] = event.key;
      }
    });
    Object.defineProperty(this, "removeKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(event) {
        delete _this.inputBuffer[event.key];
      }
    });
    window.addEventListener('keydown', this.addToInputBuffer);
    window.addEventListener('keyup', this.removeKey);
  }

  _createClass(Keyboard, [{
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('keydown', this.addToInputBuffer);
      window.removeEventListener('keyup', this.removeKey);
      this.inputBuffer = {};
      this.handlers = {};
    }
    /**
     * Process elapsed time and pass it into any commands that depends on time
     * @param elapsedTime Time elapsed since the last update
     */

  }, {
    key: "process",
    value: function process(elapsedTime) {
      for (var key in this.inputBuffer) {
        if (this.inputBuffer.hasOwnProperty(key)) {
          for (var i = 0; this.handlers[key] && i < this.handlers[key].length; i++) {
            this.handlers[key][i](elapsedTime);
          }
        }
      }

      if (this.clearBuffer) {
        this.inputBuffer = {};
      }
    }
    /**
     * Assigns multiple keys to the same handler.
     * @param keys Array of keys to assign the handler to
     * @param handler A command to call when the passed in key is pressed
     */

  }, {
    key: "registerMultiple",
    value: function registerMultiple(keys, handler) {
      for (var i = 0; i < keys.length; i++) {
        this.register(keys[i], handler);
      }
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;
},{}],"src/Game/Helpers/character.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genCharArray = genCharArray;

// https://stackoverflow.com/a/24597663
function genCharArray(charA, charZ) {
  var a = [],
      i = charA.charCodeAt(0),
      j = charZ.charCodeAt(0);

  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }

  return a;
}
},{}],"src/Game/GameModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventSystem = _interopRequireDefault(require("../Engine/Systems/EventSystem"));

var _AudioSystem = require("../Engine/Systems/AudioSystem");

var _HighScoreManager = _interopRequireDefault(require("../Engine/Managers/HighScoreManager"));

var _Player = _interopRequireDefault(require("./Objects/Player"));

var _SpriteSheet = _interopRequireDefault(require("../Engine/Graphics/SpriteSheet"));

var _Rectangle = _interopRequireDefault(require("../Engine/Geometry/Rectangle"));

var _PathedObjectSystem = _interopRequireDefault(require("./Systems/PathedObjectSystem"));

var _HomePadSystem = _interopRequireDefault(require("./Systems/HomePadSystem"));

var _ParticleSystem = _interopRequireDefault(require("./Systems/ParticleSystem"));

var _ParticleSystemRenderer = _interopRequireDefault(require("../Engine/Renderers/ParticleSystemRenderer"));

var _ScoringSystem = _interopRequireDefault(require("./Systems/ScoringSystem"));

var _GameSettings = _interopRequireDefault(require("../Engine/Settings/GameSettings"));

var _Keyboard = _interopRequireDefault(require("../Engine/Input/Keyboard"));

var _character = require("./Helpers/character");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameModel = /*#__PURE__*/function () {
  function GameModel(onGameOver) {
    var _this = this;

    _classCallCheck(this, GameModel);

    Object.defineProperty(this, "onGameOver", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: onGameOver
    });
    Object.defineProperty(this, "scoreManager", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _ScoringSystem.default()
    });
    /**
     * The player has 30 seconds to guide the frog to its home.
     *
     * This resets on every death or reset.
     */

    Object.defineProperty(this, "time", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 30000
    });
    Object.defineProperty(this, "lives", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 7
    });
    Object.defineProperty(this, "rowImages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ['bush-tile', 'water-tile', 'water-tile', 'water-tile', 'water-tile', 'water-tile', 'grass-tile', 'street-tile', 'street-tile', 'street-tile', 'street-tile', 'street-tile', 'grass-tile']
    });
    Object.defineProperty(this, "requiredOnHomePads", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5
    });
    Object.defineProperty(this, "currentOnHomePad", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "countDownTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "numRows", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.rowImages.length
    });
    Object.defineProperty(this, "tileHeight", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _GameSettings.default.width / this.numRows
    });
    Object.defineProperty(this, "tileWidth", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _GameSettings.default.width / this.numRows
    });
    Object.defineProperty(this, "internalUpdate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalRender", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalMoveLeft", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalMoveRight", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalMoveUp", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalMoveDown", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalPlayerRender", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalDetectCollisions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "internalMouseClick", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {}
    });
    Object.defineProperty(this, "eventSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _EventSystem.default()
    });
    Object.defineProperty(this, "audioSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _AudioSystem.AudioSystem()
    });
    Object.defineProperty(this, "pathedObjectSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _PathedObjectSystem.default()
    });
    Object.defineProperty(this, "homePadSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "particleSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _ParticleSystem.default()
    });
    Object.defineProperty(this, "particleSystemRenderer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "crashParticleParams", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        size: {
          mean: 5,
          stdev: 2
        },
        speed: {
          mean: 20 / 1000,
          stdev: 9 / 1000
        },
        lifetime: {
          mean: 2000,
          stdev: 500
        },
        fromColor: {
          r: 51,
          g: 204,
          b: 51,
          a: 1
        }
      }
    });
    Object.defineProperty(this, "sparkParams", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        size: {
          mean: 2,
          stdev: 0
        },
        speed: {
          mean: 4 / 1000,
          stdev: 1 / 1000
        },
        lifetime: {
          mean: 2000,
          stdev: 200
        },
        fromColor: {
          r: 235,
          g: 247,
          b: 4,
          a: 1
        }
      }
    });
    Object.defineProperty(this, "aligatorDeathParams", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        size: {
          mean: 2,
          stdev: 1
        },
        speed: {
          mean: 25 / 1000,
          stdev: 25 / 1000
        },
        lifetime: {
          mean: 250,
          stdev: 200
        },
        fromColor: {
          r: 234,
          g: 25,
          b: 25,
          a: 1
        }
      }
    });
    Object.defineProperty(this, "splashParams", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        size: {
          mean: 1,
          stdev: 1
        },
        speed: {
          mean: 20 / 1000,
          stdev: 20 / 1000
        },
        lifetime: {
          mean: 250,
          stdev: 200
        },
        fromColor: {
          r: 0,
          g: 153,
          b: 115,
          a: 1
        }
      }
    });
    Object.defineProperty(this, "explosionParams", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        size: {
          mean: 1,
          stdev: 1
        },
        speed: {
          mean: 20 / 1000,
          stdev: 20 / 1000
        },
        lifetime: {
          mean: 250,
          stdev: 200
        },
        fromColor: {
          r: 51,
          g: 204,
          b: 51,
          a: 1
        }
      }
    });
    Object.defineProperty(this, "_spriteSheet", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _SpriteSheet.default('graphics/frogger-game-sprites.png', {
        // Frogger
        'frogger-idle': new _Rectangle.default(0, 2, 51, 73),
        'frogger-1': new _Rectangle.default(54, 2, 57, 73),
        'frogger-2': new _Rectangle.default(114, 2, 56, 73),
        'frogger-3': new _Rectangle.default(173, 2, 53, 73),
        'frogger-4': new _Rectangle.default(230, 2, 54, 73),
        // Tiles
        'grass-tile': new _Rectangle.default(135, 158, 82, 82),
        'water-tile': new _Rectangle.default(226, 158, 82, 82),
        'street-tile': new _Rectangle.default(316, 158, 82, 82),
        'bush-tile': new _Rectangle.default(407, 158, 82, 82),
        'pad-tile': new _Rectangle.default(497, 158, 82, 82),
        // Cars
        'yellow-car': new _Rectangle.default(305, 482, 134, 71),
        'green-car': new _Rectangle.default(155, 483, 135, 71),
        'blue-car': new _Rectangle.default(12, 483, 127, 69),
        'fire-truck': new _Rectangle.default(9, 407, 178, 66),
        'semi-truck': new _Rectangle.default(203, 406, 285, 66),
        // Logs
        'big-log': new _Rectangle.default(13, 258, 353, 59),
        'med-log': new _Rectangle.default(14, 328, 273, 59),
        'sml-log': new _Rectangle.default(387, 258, 185, 59),
        // Other
        fly: new _Rectangle.default(84, 171, 43, 48),
        // Turtle
        'turtle-1': new _Rectangle.default(403, 11, 71, 57),
        'turtle-2': new _Rectangle.default(480, 9, 70, 61),
        'turtle-3': new _Rectangle.default(7, 83, 71, 67),
        'turtle-4': new _Rectangle.default(80, 82, 71, 68),
        'turtle-5': new _Rectangle.default(154, 84, 70, 66),
        'turtle-6': new _Rectangle.default(229, 89, 71, 56),
        'turtle-7': new _Rectangle.default(301, 88, 71, 57),
        // Turtle Diving
        'turtle-dive-1': new _Rectangle.default(377, 92, 60, 50),
        'turtle-dive-2': new _Rectangle.default(453, 98, 49, 39),
        'turtle-dive-3': new _Rectangle.default(517, 102, 36, 28),
        'turtle-dive-4': new _Rectangle.default(570, 104, 20, 20),
        // Aligator
        'aligator-idle': new _Rectangle.default(299, 317, 180, 61),
        'aligator-chomp': new _Rectangle.default(520, 345, 61, 180),
        'aligator-head': new _Rectangle.default(455, 499, 37, 43)
      })
    });
    Object.defineProperty(this, "player", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "start", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        console.log('Starting Game');

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-background.mp3', 0, true, 0.5);

        _this.eventSystem.clear();

        _this.homePadSystem = new _HomePadSystem.default(_this._spriteSheet, _this.tileWidth, _this.tileHeight);

        _this.initializePlayer();

        _this.pathedObjectSystem.initializeObjects(_this.numRows, _this.tileHeight, _this._spriteSheet);

        _this.particleSystem.clear();

        _this.internalUpdate = _this.gameUpdate;
        _this.internalRender = _this.gameRender;
        _this.internalDetectCollisions = _this.gameDetectCollisions;
        _this.time = 30000;
        _this.lives = 7;
        _this.countDownTime = true;

        _this.scoreManager.resetScore();
      }
    });
    Object.defineProperty(this, "update", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this.internalUpdate(elapsedTime);
      }
    });
    Object.defineProperty(this, "render", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        _this.internalRender(cr);
      }
    });
    Object.defineProperty(this, "destroy", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.eventSystem.destroy();

        _this.audioSystem.destroy();
      }
    });
    Object.defineProperty(this, "reset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.audioSystem.clearAllSounds();

        _this.particleSystem.clear();

        _this.clearPlayerInternals();

        _this.currentOnHomePad = 0;
      }
    });
    Object.defineProperty(this, "moveLeft", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalMoveLeft();
      }
    });
    Object.defineProperty(this, "moveRight", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalMoveRight();
      }
    });
    Object.defineProperty(this, "moveUp", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalMoveUp();
      }
    });
    Object.defineProperty(this, "moveDown", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalMoveDown();
      }
    });
    Object.defineProperty(this, "initializePlayer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.player = new _Player.default({
          center: {
            x: _GameSettings.default.width / 2,
            y: _GameSettings.default.width - _this.tileHeight / 2
          },
          collisionRadius: 20,
          width: _this.tileWidth,
          spriteSheet: _this._spriteSheet,
          delta: _this.tileWidth
        }, _this.audioSystem);

        _this.setPlayerInternals();
      }
    });
    Object.defineProperty(this, "setPlayerInternals", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalMoveLeft = _this.player.moveLeft;
        _this.internalMoveRight = _this.player.moveRight;

        _this.internalMoveUp = function () {
          _this.scoreManager.moveUp();

          _this.player.moveUp();
        };

        _this.internalMoveDown = function () {
          _this.scoreManager.moveDown();

          _this.player.moveDown();
        };

        _this.internalPlayerRender = _this.player.render;
      }
    });
    Object.defineProperty(this, "clearPlayerInternals", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalMoveLeft = function () {};

        _this.internalMoveRight = function () {};

        _this.internalMoveUp = function () {};

        _this.internalMoveDown = function () {};

        _this.internalPlayerRender = function () {};
      }
    });
    Object.defineProperty(this, "gameRender", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        cr.clear();

        _this.drawBackground(cr);

        _this.homePadSystem.render(cr);

        _this.pathedObjectSystem.render(cr);

        _this.drawGameStatus(cr);

        _this.internalPlayerRender(cr);

        _this.particleSystemRenderer(cr);
      }
    });
    Object.defineProperty(this, "drawBackground", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(cr) {
        cr.drawRectangle(0, 0, 1024, 1024, 0, '#000');

        for (var row = 0; row < _this.numRows; row++) {
          var newY = _this.tileHeight * row;

          for (var col = 0; col < _this.numRows; col++) {
            var newX = _this.tileWidth * col;
            cr.drawSubTexture(_this._spriteSheet, _this.rowImages[row], {
              x: newX + _this.tileWidth / 2,
              y: newY + _this.tileWidth / 2
            }, 0, true);
          }
        }
      }
    });
    Object.defineProperty(this, "gameUpdate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(elapsedTime) {
        _this.audioSystem.update(elapsedTime);

        _this.eventSystem.update(elapsedTime);

        _this.particleSystem.update(elapsedTime);

        _this.pathedObjectSystem.update(elapsedTime);

        _this.homePadSystem.update(elapsedTime);

        _this.player.update(elapsedTime);

        _this.updateTime(elapsedTime);

        _this.detectCollisions();
      }
    });
    Object.defineProperty(this, "playerExplosionAndMoveOn", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalDetectCollisions = function () {};

        _this.particleSystem.splash(_this.player.center, _this.explosionParams);

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-plunk.mp3', 0, false, 0.5);

        _this.internalPlayerRender = function () {};

        _this.startTimedTransition(_this.loseALifeAndReset);
      }
    });
    Object.defineProperty(this, "detectCollisions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalDetectCollisions();
      }
    });
    Object.defineProperty(this, "gameDetectCollisions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        // It looked like collision happened when the player was idle
        // 1:28 in the video
        if (!_this.player.idle) {
          return;
        }

        if (_this.player.center.y < _this.tileHeight * 2) {
          var pads = _this.homePadSystem.pads;

          for (var i = 0; i < pads.length; i++) {
            if (pads[i].inBounds(_this.player.center)) {
              _this.handleLandedOnHomePad(pads[i]);

              return;
            }
          }
        }

        var objs = _this.pathedObjectSystem.objects;

        for (var _i = 0; _i < objs.length; _i++) {
          if (objs[_i].testPoint(_this.player.center)) {
            switch (objs[_i].type) {
              case 'car':
                _this.handleCollisionWithCar(objs[_i].goingLeft);

                break;

              case 'log':
                _this.handleOnLog(objs[_i]);

                break;

              case 'tur':
                _this.handleOnTurtle(objs[_i]);

                break;

              case 'alligator':
                _this.handleAlligator(objs[_i]);

                break;

              default:
                console.error('NOT IMPLEMENT YET FOR', objs[_i].type);
                break;
            }

            return;
          }
        }

        if (_this.player.center.y < _GameSettings.default.width / 2) {
          // console.log('Water');
          _this.handleDrown();
        } //  else {
        //     console.log('Land');
        // }

      }
    });
    Object.defineProperty(this, "handleLandedOnHomePad", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(homePad) {
        _this.internalDetectCollisions = function () {};

        console.log('LANDED ON HOME PAD'); // handle if there is an aligator

        if (homePad.hasAligator) {
          homePad.hasAligator = false;

          _this.handleAlligator();

          return;
        } // handle if there is already a frog there.


        if (homePad.hasFrog) {
          _this.handleDrown();

          return;
        }

        _this.internalPlayerRender = function () {};

        homePad.hasFrog = true;

        _this.particleSystem.showerSparks(homePad.bounds, _this.sparkParams);

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-coin-in.mp3', 0, false, 0.5); // update score


        _this.scoreManager.landOnPad(); // handle if there is a fly


        if (homePad.hasFly) {
          homePad.hasFly = false;

          _this.scoreManager.gotFly();
        }

        _this.currentOnHomePad++;

        if (_this.currentOnHomePad >= _this.requiredOnHomePads) {
          _this.handleBeatLevel();
        } else {
          _this.startTimedTransition(_this.resetWithNewFrog);
        }
      }
    });
    Object.defineProperty(this, "handleBeatLevel", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.countDownTime = false; // player gets 1000 points

        _this.scoreManager.beatLevel();

        _this.scoreManager.accountForTime(_this.time); // show score screen,


        _this.beatGameScreen();
      }
    });
    Object.defineProperty(this, "resetWithNewFrog", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.scoreManager.resetForNewFrog();

        _this.resetPlayer();

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-background.mp3', 0, true, 0.5);

        _this.scoreManager.accountForTime(_this.time);

        _this.countDownTime = true;
        _this.time = 30000;
      }
    });
    Object.defineProperty(this, "handleOnLog", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(pathedObject) {
        _this.player.speedX = pathedObject.speed * (pathedObject.goingLeft ? -1 : 1);
      }
    });
    Object.defineProperty(this, "handleOnTurtle", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(pathedObject) {
        // if the turtle is not diving, keep up with it
        if (pathedObject.canStandOn) {
          _this.player.speedX = pathedObject.speed * (pathedObject.goingLeft ? -1 : 1);
        } else {
          _this.handleDrown();
        }
      }
    });
    Object.defineProperty(this, "handleCollisionWithCar", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(goingLeft) {
        _this.internalDetectCollisions = function () {};

        console.log('Crashed!');

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-squash.mp3', 0, false, 0.5);

        _this.particleSystem.carCrash(_this.player.center, goingLeft ? Math.PI / 2 : -Math.PI / 2, _this.crashParticleParams);

        _this.internalPlayerRender = function () {};

        _this.startTimedTransition(_this.loseALifeAndReset);
      }
    });
    Object.defineProperty(this, "handleDrown", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalDetectCollisions = function () {};

        console.log('Drown');

        _this.particleSystem.splash(_this.player.center, _this.splashParams);

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-plunk.mp3', 0, false, 0.5);

        _this.internalPlayerRender = function () {};

        _this.startTimedTransition(_this.loseALifeAndReset);
      }
    });
    Object.defineProperty(this, "handleAlligator", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(pathedObject) {
        if (pathedObject && pathedObject.canStandOn) {
          _this.player.speedX = pathedObject.speed * (pathedObject.goingLeft ? -1 : 1);
          return;
        }

        _this.internalDetectCollisions = function () {};

        _this.audioSystem.clearAllSounds();

        _this.audioSystem.addAudio('audio/sound-frogger-plunk.mp3', 0, false, 0.5);

        _this.internalPlayerRender = function () {};

        _this.particleSystem.froggerBlood(_this.player.center, _this.aligatorDeathParams);

        _this.startTimedTransition(_this.loseALifeAndReset);
      }
    });
    Object.defineProperty(this, "startTimedTransition", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(callback) {
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

        _this.eventSystem.addEvent(duration, 1, callback);
      }
    });
    Object.defineProperty(this, "loseALifeAndReset", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.lives--;

        if (_this.lives <= 0) {
          _this.lostGameScreen();

          return;
        }

        _this.time = 30000;
        _this.countDownTime = true;

        _this.resetPlayer();

        _this.audioSystem.addAudio('audio/sound-frogger-background.mp3', 0, true, 0.5);
      }
    });
    Object.defineProperty(this, "mouseClick", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(ev) {
        _this.internalMouseClick(ev);
      }
    });
    Object.defineProperty(this, "endGame", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value(userName, topFiveScore) {
        // Add score to high score manager
        if (topFiveScore) {
          _HighScoreManager.default.addScore(userName === '' ? 'Default_User' : userName, _this.scoreManager.score);
        }

        _this.reset();

        _this.onGameOver();
      }
    });
    Object.defineProperty(this, "beatGameScreen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.internalDetectCollisions = function () {};

        _this.clearPlayerInternals();

        var topFiveScore = _HighScoreManager.default.isHighScore(_this.scoreManager.score);

        var userName = '';

        if (topFiveScore) {
          var typingKeyboard = new _Keyboard.default(true);

          var registerLetter = function registerLetter(letter) {
            typingKeyboard.register(letter, function () {
              if (userName.length < 20) {
                userName += letter;
              }
            });
          };

          (0, _character.genCharArray)('a', 'z').forEach(registerLetter);
          (0, _character.genCharArray)('A', 'Z').forEach(registerLetter);
          typingKeyboard.register('Backspace', function () {
            if (userName.length > 0) {
              userName = userName.slice(0, userName.length - 1);
            } else {
              userName = '';
            }
          });

          _this.internalUpdate = function (elapsedTime) {
            typingKeyboard.process(elapsedTime);

            _this.gameUpdate(elapsedTime);
          };
        }

        var buttonW = 350;
        var buttonH = 100;
        var bounds = new _Rectangle.default((_GameSettings.default.width - buttonW) / 2, (_GameSettings.default.width - buttonH) / 2 + 100, buttonW, buttonH);

        _this.internalMouseClick = function (ev) {
          if (bounds.inBounds(ev.pos)) {
            _this.endGame(userName, topFiveScore);
          }
        };

        var bgWidth = 550;
        var bgHeight = 500;

        _this.internalRender = function (cr) {
          _this.gameRender(cr);

          cr.drawRectangle((_GameSettings.default.width - bgWidth) / 2, (_GameSettings.default.width - bgHeight) / 2, bgWidth, bgHeight, 0, '#fff');
          cr.drawText({
            x: 512,
            y: (_GameSettings.default.width - bgHeight) / 2 + 40
          }, 'Game Over, You Won! :)', 0, true, '#ffaa00', '48px arial');
          cr.drawText({
            x: 512,
            y: (_GameSettings.default.width - bgHeight) / 2 + 100
          }, "Your Score: ".concat(_this.scoreManager.score), 0, true, '#000', '40px arial');

          if (topFiveScore) {
            cr.drawText({
              x: 512,
              y: (_GameSettings.default.width - bgHeight) / 2 + 160
            }, "Enter Username:", 0, true, '#000', '40px arial');
            cr.drawText({
              x: 512,
              y: (_GameSettings.default.width - bgHeight) / 2 + 200
            }, "".concat(userName), 0, true, '#000', '40px arial');
          } else {
            cr.drawText({
              x: 512,
              y: (_GameSettings.default.width - bgHeight) / 2 + 160
            }, "You didn't get a top 5 score.", 0, true, '#000', '40px arial');
            cr.drawText({
              x: 512,
              y: (_GameSettings.default.width - bgHeight) / 2 + 200
            }, "Better luck next time!", 0, true, '#000', '40px arial');
          }

          cr.drawRectangle(bounds.x, bounds.y, bounds.w, bounds.h, 0, '#000');
          cr.drawText({
            x: 512,
            y: bounds.y + 30
          }, 'Back To Menu', 0, true, '#ffaa00', '48px arial');
        };
      }
    });
    Object.defineProperty(this, "lostGameScreen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.countDownTime = false;

        _this.internalDetectCollisions = function () {};

        _this.clearPlayerInternals();

        var buttonW = 350;
        var buttonH = 100;
        var bounds = new _Rectangle.default((_GameSettings.default.width - buttonW) / 2, (_GameSettings.default.width - buttonH) / 2, buttonW, buttonH);

        _this.internalMouseClick = function (ev) {
          if (bounds.inBounds(ev.pos)) {
            _this.reset();

            _this.onGameOver();
          }
        };

        var bgWidth = 550;
        var bgHeight = 500;

        _this.internalRender = function (cr) {
          _this.gameRender(cr);

          cr.drawRectangle((_GameSettings.default.width - bgWidth) / 2, (_GameSettings.default.width - bgHeight) / 2, bgWidth, bgHeight, 0, '#fff');
          cr.drawText({
            x: 512,
            y: (_GameSettings.default.width - bgHeight) / 2 + 40
          }, 'Game Over, You Lost :(', 0, true, '#ffaa00', '48px arial');
          cr.drawRectangle(bounds.x, bounds.y, bounds.w, bounds.h, 0, '#000');
          cr.drawText({
            x: 512,
            y: bounds.y + 30
          }, 'Back To Menu', 0, true, '#ffaa00', '48px arial');
        };
      }
    });
    Object.defineProperty(this, "resetPlayer", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.initializePlayer();

        _this.internalDetectCollisions = _this.gameDetectCollisions;
      }
    });
    this.particleSystemRenderer = (0, _ParticleSystemRenderer.default)(this.particleSystem);
  }

  _createClass(GameModel, [{
    key: "drawGameStatus",
    value: function drawGameStatus(cr) {
      cr.drawRectangle(0, _GameSettings.default.width, _GameSettings.default.width, _GameSettings.default.width + 100, 0, '#000');
      this.drawTime(cr);
      this.drawScore(cr);
      this.drawLifes(cr);
    }
  }, {
    key: "drawTime",
    value: function drawTime(cr) {
      var width = 800;
      var padding = 10;
      var height = 50 - padding;
      cr.drawText({
        x: padding / 2,
        y: _GameSettings.default.width + 50 + padding
      }, 'TIME', 0, false, '#fff', '32px arial');
      var x = 100;
      var y = _GameSettings.default.width + 50 + padding / 2;

      for (var i = 0; i < this.time / 1000; i++) {
        cr.drawRectangle(x + i * (width / 30), y, width / 30 + 1, height, 0, '#00ffcc');
      }
    }
  }, {
    key: "drawScore",
    value: function drawScore(cr) {
      cr.drawText({
        x: _GameSettings.default.width / 2,
        y: _GameSettings.default.width + 5
      }, "Score: ".concat(this.scoreManager.score), 0, true, '#fff', '32px arial');
    }
  }, {
    key: "drawLifes",
    value: function drawLifes(cr) {
      for (var i = 0; i < this.lives - 1; i++) {
        cr.drawSubTexture(this._spriteSheet, 'frogger-idle', {
          x: i * 50,
          y: _GameSettings.default.width - 20
        }, 0);
      }
    }
  }, {
    key: "updateTime",
    value: function updateTime(elapsedTime) {
      if (!this.countDownTime) {
        return;
      }

      this.time -= elapsedTime;

      if (this.time <= 0) {
        this.playerExplosionAndMoveOn();
        this.countDownTime = false;
      }
    }
  }]);

  return GameModel;
}();

exports.default = GameModel;
},{"../Engine/Systems/EventSystem":"src/Engine/Systems/EventSystem.ts","../Engine/Systems/AudioSystem":"src/Engine/Systems/AudioSystem.ts","../Engine/Managers/HighScoreManager":"src/Engine/Managers/HighScoreManager.ts","./Objects/Player":"src/Game/Objects/Player.ts","../Engine/Graphics/SpriteSheet":"src/Engine/Graphics/SpriteSheet.ts","../Engine/Geometry/Rectangle":"src/Engine/Geometry/Rectangle.ts","./Systems/PathedObjectSystem":"src/Game/Systems/PathedObjectSystem.ts","./Systems/HomePadSystem":"src/Game/Systems/HomePadSystem.ts","./Systems/ParticleSystem":"src/Game/Systems/ParticleSystem.ts","../Engine/Renderers/ParticleSystemRenderer":"src/Engine/Renderers/ParticleSystemRenderer.ts","./Systems/ScoringSystem":"src/Game/Systems/ScoringSystem.ts","../Engine/Settings/GameSettings":"src/Engine/Settings/GameSettings.ts","../Engine/Input/Keyboard":"src/Engine/Input/Keyboard.ts","./Helpers/character":"src/Game/Helpers/character.ts"}],"src/Game/GamePlay.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CanvasRenderer = require("../Engine/Renderers/CanvasRenderer");

var _Mouse = _interopRequireDefault(require("../Engine/Input/Mouse"));

var _AudioSystem = require("../Engine/Systems/AudioSystem");

var _GameLoop2 = _interopRequireDefault(require("../Engine/BaseComponents/GameLoop"));

var _Menu = _interopRequireDefault(require("./Screens/Menu"));

var _GameModel = _interopRequireDefault(require("./GameModel"));

var _Keyboard = _interopRequireDefault(require("../Engine/Input/Keyboard"));

var _ControlsManager = _interopRequireDefault(require("../Engine/Managers/ControlsManager"));

var _GameSettings = _interopRequireDefault(require("../Engine/Settings/GameSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GamePlay = /*#__PURE__*/function (_GameLoop) {
  _inherits(GamePlay, _GameLoop);

  var _super = _createSuper(GamePlay);

  function GamePlay(canvas) {
    var _this;

    _classCallCheck(this, GamePlay);

    _this = _super.call(this, canvas, _CanvasRenderer.CanvasRenderer);
    Object.defineProperty(_assertThisInitialized(_this), "mouse", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "playerKeyboard", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "internalMouseClick", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "internalMouseMove", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "menu", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "gameModel", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(_assertThisInitialized(_this), "audioSystem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new _AudioSystem.AudioSystem()
    });
    Object.defineProperty(_assertThisInitialized(_this), "setupMenu", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.clearAllInternals();

        _this.mouse.clearInputBuffer();

        _this.internalProcessInput = function () {
          _this.mouse.process();
        };

        _this.internalMouseClick = _this.menu.mouseClick;
        _this.internalRender = _this.menu.render;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "setupNewGame", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.clearAllInternals();

        _this.mouse.clearInputBuffer();

        _this.internalRender = _this.gameModel.render;
        _this.internalUpdate = _this.gameModel.update;
        _this.internalMouseClick = _this.gameModel.mouseClick;

        _this.initializeKeyboard();

        _this.internalProcessInput = function (et) {
          _this.playerKeyboard.process(et);

          _this.mouse.process();
        }; // Should this be here? Attaching methods should be enough?
        // How would the game model know it is a new game?


        _this.gameModel.start();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "initializeKeyboard", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.playerKeyboard = new _Keyboard.default(true);

        var controls = _ControlsManager.default.getControls();

        var register = _this.playerKeyboard.register;
        register(controls[0], _this.gameModel.moveLeft);
        register(controls[1], _this.gameModel.moveRight);
        register(controls[2], _this.gameModel.moveUp);
        register(controls[3], _this.gameModel.moveDown);
        register('Escape', _this.handleGameEscape);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleGameEscape", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.gameModel.reset();

        _this.setupMenu();
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "clearAllInternals", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.clearBaseInternals();

        _this.internalMouseClick = function () {};

        _this.internalMouseMove = function () {};
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "addMouseHandlers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.mouse.register('click', function (gev) {
          _this.internalMouseClick(gev);
        });

        _this.mouse.register('mousemove', function (gev) {
          _this.internalMouseMove(gev);
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "destroy", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function value() {
        _this.mouse.destroy();

        _this.audioSystem.destroy();
      }
    });

    _GameSettings.default.updateWithCanvas(canvas);

    _this.menu = new _Menu.default(_this.setupNewGame);
    _this.gameModel = new _GameModel.default(_this.handleGameEscape);
    _this.mouse = new _Mouse.default(canvas);

    _this.addMouseHandlers();

    return _this;
  }

  _createClass(GamePlay, [{
    key: "play",
    value: function play() {
      this.setupMenu();
      this.start();
    }
  }]);

  return GamePlay;
}(_GameLoop2.default);

exports.default = GamePlay;
},{"../Engine/Renderers/CanvasRenderer":"src/Engine/Renderers/CanvasRenderer.ts","../Engine/Input/Mouse":"src/Engine/Input/Mouse.ts","../Engine/Systems/AudioSystem":"src/Engine/Systems/AudioSystem.ts","../Engine/BaseComponents/GameLoop":"src/Engine/BaseComponents/GameLoop.ts","./Screens/Menu":"src/Game/Screens/Menu.ts","./GameModel":"src/Game/GameModel.ts","../Engine/Input/Keyboard":"src/Engine/Input/Keyboard.ts","../Engine/Managers/ControlsManager":"src/Engine/Managers/ControlsManager.ts","../Engine/Settings/GameSettings":"src/Engine/Settings/GameSettings.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var _GamePlay = _interopRequireDefault(require("./Game/GamePlay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('game-canvas');
var gamePlay = new _GamePlay.default(canvas);
gamePlay.play();

var handleResize = function handleResize(ev) {
  var _ev$target = ev.target,
      innerWidth = _ev$target.innerWidth,
      innerHeight = _ev$target.innerHeight;
  var minSize = (Math.min(innerWidth, innerHeight) - 16).toString();
  canvas.style.width = minSize;
  canvas.style.height = minSize;
};

window.addEventListener('resize', handleResize);
handleResize({
  target: window
});
},{"./Game/GamePlay":"src/Game/GamePlay.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55776" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map