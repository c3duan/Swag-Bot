/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    defineProperty   = require('./defineProperty'),
    isFunction       = require('./isFunction'),
    isObject         = require('./isObject');

/**
 * Defines new properties, or reconfigure existing ones, on `object` and returns it.
 *
 * ```js
 * let object = {};
 *
 * XP.defineProperties(obj, {
 *     a: {
 *         value: 12,
 *         enumerable: true,
 *         configurable: true
 *     },
 *     b: {
 *         set(val) { return val; },
 *         then() { console.log('The value has been set.'); },
 *         enumerable: true,
 *         configurable: true
 *     }
 * });
 * // => {a: 12, b: (...)}
 *
 * obj.b = 34;
 * // => 'The value has been set.'
 * // => 34
 * ```
 *
 * @function defineProperties
 * @since 1.0.0
 * @category object
 * @description Defines new properties, or reconfigure existing ones, on `object` and returns it
 * @source https://github.com/expandjs/expandjs/blog/master/lib/defineProperties.js
 *
 * @param {Function | Object} target The target object
 * @param {Object} props The properties map
 * @returns {Function | Object} Returns the modified object
 */
module.exports = function defineProperties(target, props) {

    // Asserting
    assertArgument(isFunction(target) || isObject(target), 1, 'Function or Object');
    assertArgument(isObject(props), 2, 'Object');

    // Defining
    Object.keys(props).forEach(key => defineProperty(target, key, props[key]));

    // Returning
    return target;
};
