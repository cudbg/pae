(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pae", [], factory);
	else if(typeof exports === 'object')
		exports["pae"] = factory();
	else
		root["pae"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apen.js":
/*!*********************!*\
  !*** ./src/apen.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApEn =
/*#__PURE__*/
function () {
  function ApEn(m, r) {
    _classCallCheck(this, ApEn);

    this.m = m;
    this.r = r;
  }

  _createClass(ApEn, [{
    key: "apen",
    value: function apen(U) {
      var m = this.m;
      var r = this.r;
      var N = U.length;

      function _maxdist(x_i, x_j) {
        var max = 0;

        for (var i = 0; i < x_i.length; i++) {
          var dist = Math.abs(x_i[i] - x_j[i]);

          if (dist > max) {
            max = dist;
          }
        }

        return max; // return max([abs(ua - va) for ua, va in zip(x_i, x_j)]);
      }

      function _phi(m) {
        var x = [];

        for (var i = 0; i < N - m + 1; i++) {
          var sub = [];

          for (var j = i; j < i + m; j++) {
            sub.push(U[j]);
          }

          x.push(sub);
        }

        var C = [];

        for (var _i = 0; _i < x.length; _i++) {
          var _sub = [];

          for (var _j = 0; _j < x.length; _j++) {
            if (_maxdist(x[_i], x[_j]) <= r) {
              _sub.push(1);
            }
          }

          C.push(_sub.length / (N - m + 1));
        }

        return 1 / (N - m + 1) * C.map(Math.log).reduce(function (acc, val) {
          return acc + val;
        });
      }

      return Math.abs(_phi(m + 1) - _phi(m));
    }
  }]);

  return ApEn;
}();

exports.default = ApEn;
module.exports = exports["default"];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Scale", {
  enumerable: true,
  get: function get() {
    return _scale.default;
  }
});
Object.defineProperty(exports, "ApEn", {
  enumerable: true,
  get: function get() {
    return _apen.default;
  }
});
Object.defineProperty(exports, "PAE", {
  enumerable: true,
  get: function get() {
    return _pae.default;
  }
});

var _scale = _interopRequireDefault(__webpack_require__(/*! ./scale.js */ "./src/scale.js"));

var _apen = _interopRequireDefault(__webpack_require__(/*! ./apen.js */ "./src/apen.js"));

var _pae = _interopRequireDefault(__webpack_require__(/*! ./pae.js */ "./src/pae.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/pae.js":
/*!********************!*\
  !*** ./src/pae.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apen = _interopRequireDefault(__webpack_require__(/*! ./apen.js */ "./src/apen.js"));

var _scale = _interopRequireDefault(__webpack_require__(/*! ./scale.js */ "./src/scale.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PAE =
/*#__PURE__*/
function () {
  function PAE(width, height) {
    var m = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20.0;

    _classCallCheck(this, PAE);

    this.apen = new _apen.default(m, r);
    this.scale = new _scale.default(width, height);
  }

  _createClass(PAE, [{
    key: "pae",
    value: function pae(U) {
      U = this.scale.scale(U);
      return this.apen.apen(U);
    }
  }]);

  return PAE;
}();

exports.default = PAE;
module.exports = exports["default"];

/***/ }),

/***/ "./src/scale.js":
/*!**********************!*\
  !*** ./src/scale.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* copied from https://stackoverflow.com/questions/26941168/javascript-interpolate-an-array-of-numbers */
function interp(data, fitCount) {
  var linearInterpolate = function linearInterpolate(before, after, atPoint) {
    return before + (after - before) * atPoint;
  };

  var newData = [];
  var springFactor = (data.length - 1) / (fitCount - 1);
  newData[0] = data[0];

  for (var i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor;
    var before = Math.floor(tmp);
    var after = Math.ceil(tmp);
    var atPoint = tmp - before;
    newData[i] = linearInterpolate(data[before], data[after], atPoint);
  }

  newData[fitCount - 1] = data[data.length - 1]; // for new allocation

  return newData;
}

;

var Scale =
/*#__PURE__*/
function () {
  function Scale(width, height) {
    _classCallCheck(this, Scale);

    this.width = width;
    this.height = height;
  }

  _createClass(Scale, [{
    key: "scale",
    value: function scale(y) {
      var y2 = interp(y, this.width);
      var min = Math.min.apply(Math, _toConsumableArray(y2));
      var y3 = y2.map(function (val) {
        return val - min;
      });
      var max = Math.max.apply(Math, _toConsumableArray(y3));
      var factor = 1;

      if (max) {
        factor = this.height / max;
      }

      var y4 = y3.map(function (val) {
        return val * factor;
      });
      return y4;
    }
  }]);

  return Scale;
}();

exports.default = Scale;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=pae.js.map