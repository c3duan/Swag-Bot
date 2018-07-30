/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isBoolean = require('./isBoolean'),
    isDate      = require('./isDate'),
    isFinite    = require('./isFinite'),
    isNull      = require('./isNull'),
    isString    = require('./isString');

/**
 * Checks if `value` is `null`, `boolean`, `number`, `string` or `Date`.
 *
 * ```js
 * XP.isPrimitive(false);
 * // => true
 *
 * XP.isPrimitive(null);
 * // => true
 *
 * XP.isPrimitive(0);
 * // => true
 *
 * XP.isPrimitive('Hello world');
 * // => true
 *
 * XP.isPrimitive(new Date());
 * // => true
 *
 * XP.isPrimitive([]);
 * // => false
 * ```
 *
 * @function isPrimitive
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is `null`, `boolean`, `number`, `string` or `Date`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isPrimitive.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty = false] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isPrimitive(value, notEmpty) {

    // Returning
    return !notEmpty && isNull(value) || isBoolean(value) || isFinite(value) || isString(value, notEmpty) || isDate(value);
};
