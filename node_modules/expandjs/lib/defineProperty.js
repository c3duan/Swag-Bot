/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    callback         = require('./callback'),
    isFunction       = require('./isFunction'),
    isObject         = require('./isObject'),
    isString         = require('./isString');

/**
 * Defines a new own property, or reconfigure existing one, on `object` and returns it.
 * If a function is provided as `object`, its prototype will be used as target.
 *
 * ```js
 * let object = {};
 *
 * XP.defineProperty(object, 'a', {
 *     value: 12
 * });
 * // => {a: 12}
 *
 * XP.defineProperty(obj, 'b', {
 *     set(val) { return val; },
 *     then() { console.log('The value has been set.'); }
 * });
 * // => {a: 12, b: (...)}
 *
 * obj.b = 34;
 * // => 'The value has been set.'
 * // => 34
 * ```
 *
 * @function defineProperty
 * @since 1.0.0
 * @category object
 * @description Defines a new own property, or reconfigure existing one, on `object` and returns it
 * @source https://github.com/expandjs/expandjs/blog/master/lib/defineProperty.js
 *
 * @param {Function | Object} target The target object
 * @param {string} name The property name
 * @param {Function | Object} opt The options to be set on the property
 *   @param {Function} [opt.get] The property's getter
 *   @param {*} [opt.value] The value of the property
 *   @param {Function} [opt.set] The property's setter
 *   @param {Function} [opt.then] A callback called after the property has been set
 *   @param {Function} [opt.validate] A function called to validate the value before being set
 *   @param {boolean} [opt.frozen = false] Specifies if the property value should be automatically frozen
 *   @param {boolean} [opt.callback = false] Specifies if the property will be a function with callback support
 *   @param {boolean} [opt.promise = false] Specifies if the property will be a function with callback and promise support
 *   @param {boolean} [opt.sealed = false] Specifies if the property value should be automatically sealed
 *   @param {boolean} [opt.static = false] Specifies if the property should be static
 *   @param {boolean} [opt.writable = true] Specifies if the property will not be writable
 * @returns {Function | Object} Returns the modified object
 */
module.exports = function defineProperty(target, name, opt) {

    // Preparing
    if (isFunction(opt)) { opt = {value: opt}; }

    // Asserting
    assertArgument(isFunction(target) || isObject(target), 1, 'Function or Object');
    assertArgument(isString(name, true), 2, 'string');
    assertArgument(isObject(opt), 3, 'Object');

    // Let
    let plain       = opt.value,
        isGetter    = isFunction(opt.get),
        isSetter    = isFunction(opt.set),
        isValidated = isFunction(opt.validate),
        isConstant  = !isGetter && !isSetter;

    // Overriding
    if (!opt.hasOwnProperty('writable')) { opt.writable = true; }
    if (isGetter && !isSetter) { opt.set = function () {}; }
    if (isSetter && !isGetter && !isValidated) { opt.validate = function () {}; }
    if (isFunction(target) && !opt.static) { target = target.prototype; }

    // Wrapping (callback)
    if (isConstant && opt.callback && !opt.promise) {
        opt.value = function (...args) {
            args = callback(args, plain);
            return plain.call(this, ...args);
        };
    }

    // Wrapping (promise)
    if (isConstant && opt.promise) {
        opt.value = function (...args) {
            args = callback(args, plain);
            return new Promise((resolve, reject) => {
                plain.call(this, ...args.slice(0, -1), (...results) => {
                    if (results[0]) { reject(results[0]); } else { resolve(results[1]); }
                    if (args[args.length - 1]) { args[args.length -1](...results); }
                });
            });
        };
    }

    // Defining
    Object.defineProperty(target, name, isConstant ? {
        configurable: true,
        value: opt.value,
        writable: opt.writable
    } : {
        configurable: true,
        get: isGetter ? opt.get : function () { return this[`${name}_`]; },
        set: isGetter ? opt.set : function (val) {
            let key = `${name}_`, pre = this[key], post = opt.set.call(this, val), type = opt.validate.call(this, post);
            if (type) { throw new Error(`"${name}" must be ${type}`); } else { this[key] = post; }
            if (opt.sealed) { Object.seal(post); }
            if (opt.frozen) { Object.freeze(post); }
            if (opt.then) { opt.then.call(this, post, pre); }
        }
    });

    // Freezing
    if (isConstant && opt.sealed) { Object.seal(target[name]); }
    if (isConstant && opt.frozen) { Object.freeze(target[name]); }

    // Returning
    return target;
};
