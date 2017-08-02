(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mojs-util-class-proto"] = factory();
	else
		root["mojs-util-class-proto"] = factory();
})(this, function() {
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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /*
     * Imitate `class` with wrapper.
     *
     * @param {Object} Options object.
     * @returns {Object} Tween instance.
     */
    var createClass = exports.createClass = function (module) {
      var w = function (o) {
        var instance = Object.create(module);
        instance.init(o);

        return instance;
      };
      w.__mojsClass = module;
      return w;
    };

    /*
     * Imitate `class` extend.
     *
     * @param {Object} `mojs` class to extend.
     * @returns {Object} Successor.
     */
    var extendClass = exports.extendClass = function (Super) {
      return Object.create(Super.__mojsClass);
    };

    /**
     * ClassProto - base class for module.
     * It is needed to:
     *   - declare `_defaults`
     *   - extend `_defaults` by `options` and save result to `_props`
     *   - declare `_vars` after extention
     *   - call `_render` eventually
     */
    var ClassProto = {};

    /**
     * `get` - Method to get a property from `_props`.
     *
     * @public
     * @param {String} Key.
     * @returns {Any} Value from the `_props` by `key`.
     */
    ClassProto.get = function (key) {
      return this._props[key];
    };

    /**
     * `set` - Method to set a property to `_props`.
     *
     * @public
     * @param {String} Key.
     * @param {Any} Value.
     */
    ClassProto.set = function (key, value) {
      this._props[key] = value;

      return this;
    };

    /**
     * `setBatch` - Method to set a batch of properties to `_props`.
     *
     * @public
     * @param {Object} Batch properties to set.
     * @return {Object} `this` instance.
     */
    ClassProto.setBatch = function () {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        this._props[key] = obj[key];
      }

      return this;
    };

    /**
     * `setIfNotSet` - function to set a property if it isn't
     *                 present in the initialization options.
     *
     * @public
     * @param {String} Key.
     * @param {Any} Value.
     * @returns {Object} This instance.
     */
    ClassProto.setIfNotSet = function (key, value) {
      if (this._o[key] === undefined) {
        this.set(key, value);
      }

      return this;
    };

    /**
     * `init` - lifecycle initialization function.
     *
     * @private
     */
    ClassProto.init = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // save options
      this._o = _extends({}, o);

      // parse index and delete it from options
      this.index = this._o.index || 0;
      delete this._o.index;
      // parse total items and delete it from options
      this._totalItemsInStagger = this._o.totalItemsInStagger || 1;
      delete this._o.totalItemsInStagger;

      this._declareDefaults();
      this._extendDefaults();
      this._vars();
    };

    /**
     * _declareDefaults - function to declare `_defaults` object.
     *
     * @private
     */
    ClassProto._declareDefaults = function () {
      this._defaults = {};
    };

    /**
     * _extendDefaults - Method to copy `_o` options to `_props` object
     *                  with fallback to `_defaults`.
     * @private
     */
    ClassProto._extendDefaults = function () {
      this._props = _extends({}, this._defaults);

      var keys = Object.keys(this._o);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = this._o[key];
        // only if value is defined
        if (value !== undefined) {
          this._props[key] = value;
        }
      }
    };

    /**
     * _vars - function do declare `variables` after `_defaults` were extended
     *         by `options` and saved to `_props`
     *
     * @private
     */
    ClassProto._vars = function () {};

    var ClassProtoClass = createClass(ClassProto);
    exports.ClassProto = ClassProtoClass;
  });
});

/***/ })
/******/ ]);
});