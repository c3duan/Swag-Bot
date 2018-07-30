/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDefined = require('./isDefined'),
    isNaN       = require('./isNaN'),
    isNull      = require('./isNull');

/**
 * Checks if `value` is `undefined`, `null` or `NaN`.
 *
 * ```js
 * XP.isVoid(undefined);
 * // => true
 *
 * XP.isVoid(null);
 * // => true
 *
 * XP.isVoid(NaN);
 * // => true
 *
 * XP.isVoid('');
 * // => false
 * ```
 *
 * @function isVoid
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is `undefined`, `null` or `NaN`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isVoid.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isVoid(value) {

    // Returning
    return !isDefined(value) || isNull(value) || isNaN(value);
};
