/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _clamp       = require('lodash/clamp'),
    assertArgument = require('./assertArgument'),
    isNumber       = require('./isNumber'),
    isVoid         = require('./isVoid');

/**
 * Checks if `value` is between `start` and up to `end`.
 * If `end` is not specified, it's set to `start` with `start` then set to `0`.
 *
 * ```js
 * XP.isBetween(3, 2, 4);
 * // => true
 *
 * XP.isBetween(4, 8);
 * // => true
 *
 * XP.isBetween(2, 2);
 * // => true
 *
 * XP.isBetween(4, 2);
 * // => false
 *
 * XP.isBetween(5.2, 4);
 * // => false
 * ```
 *
 * @function isBetween
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is between `start` and up to `end`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isBetween.js
 *
 * @param {*} value The target value
 * @param {number} [min = 0] The min of the range
 * @param {number} [max] The max of the range
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isBetween(value, min, max) {

    // Asserting
    assertArgument(isNumber(min), 2, 'number');
    assertArgument(isVoid(max) || isNumber(max), 3, 'number');

    // Returning
    return isNumber(value) && value === _clamp(value, min, max);
};
