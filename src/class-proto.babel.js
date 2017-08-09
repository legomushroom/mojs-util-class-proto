/*
 * Imitate `class` with wrapper.
 *
 * @param {Object} Options object.
 * @returns {Object} Tween instance.
 */
export const createClass = (module) => {
  const w = (o) => {
    const instance = Object.create(module);
    const result = instance.init(o);

    return (result !== undefined) ? result : instance;
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
export const extendClass = (Super) => {
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
const ClassProtoClass = {};

/**
 * `get` - Method to get a property from `_props`.
 *
 * @public
 * @param {String} Key.
 * @returns {Any} Value from the `_props` by `key`.
 */
ClassProtoClass.get = function (key) {
  return this._props[key];
};

/**
 * `set` - Method to set a property to `_props`.
 *
 * @public
 * @param {String} Key.
 * @param {Any} Value.
 */
ClassProtoClass.set = function (key, value) {
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
ClassProtoClass.setBatch = function (obj = {}) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
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
ClassProtoClass.setIfNotSet = function (key, value) {
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
ClassProtoClass.init = function (o = {}) {
  // save options
  this._o = { ...o };

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
ClassProtoClass._declareDefaults = function () { this._defaults = {}; };

/**
 * _extendDefaults - Method to copy `_o` options to `_props` object
 *                  with fallback to `_defaults`.
 * @private
 */
ClassProtoClass._extendDefaults = function () {
  this._props = { ...this._defaults };

  const keys = Object.keys(this._o);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = this._o[key];
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
ClassProtoClass._vars = function () {};

const ClassProto = createClass(ClassProtoClass);

export default ClassProto;
export { ClassProto };
