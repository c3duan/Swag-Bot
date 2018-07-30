/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isObject = require('lodash/isObject'),
    isArray     = require('./isArray'),
    isDate      = require('./isDate'),
    isVoid      = require('./isVoid'),
    isFunction  = require('./isFunction'),
    xnor        = require('./xnor');

/**
 * Checks if `value` is an instance of `Object` (excluding `Array`, `Date`, `Function`).
 *
 * ```js
 * XP.isObject({});
 * // => true
 *
 * XP.isObject(/abc/);
 * // => true
 *
 * XP.isObject(new Date());
 * // => false
 *
 * XP.isObject([1, 2, 3]);
 * // => false
 *
 * XP.isObject(function () {});
 * // => false
 * ```
 *
 * @function isObject
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an instance of `Object` (excluding `Array`, `Date`, `Function`)
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isObject.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isObject(value, notEmpty) {

    // Returning
    return _isObject(value) && !isArray(value) && !isDate(value) && !isFunction(value) && (isVoid(notEmpty) || xnor(Object.keys(value).length, notEmpty));
};
