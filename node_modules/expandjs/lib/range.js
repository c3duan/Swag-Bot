/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _range       = require('lodash/range'),
    assertArgument = require('./assertArgument'),
    isFinite       = require('./isFinite'),
    isVoid         = require('./isVoid');

/**
 * Returns an array of numbers (positive and/or negative) progressing from `start` up to, but not including, `end`.
 * A step of `-1` is used if a negative `start` is provided without an `end` or `step`.
 * If `end` is not provided, it's set to `start` with `start` then set to `0`.
 *
 * ```js
 * XP.range(4);
 * // => [0, 1, 2, 3]
 *
 * XP.range(-4);
 * // => [0, -1, -2, -3]
 *
 * XP.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * XP.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * XP.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * XP.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * XP.range(0);
 * // => []
 * ```
 *
 * @function range
 * @since 1.0.0
 * @category number
 * @description Returns an array of numbers (positive and/or negative) progressing from `start` up to, but not including, `end`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/range.js
 *
 * @param {number} [start = 0] The start of the range
 * @param {number} end The end of the range
 * @param {number} [step = 1] The value to increment or decrement by
 * @returns {Array} Returns the new array of numbers
 */
module.exports = function range(start, end, step) {

    // Asserting
    assertArgument(isFinite(start), 1, 'number');
    assertArgument(isVoid(end) || isFinite(end), 2, 'number');
    assertArgument(isVoid(step) || isFinite(step), 3, 'number');

    // Returning
    return _range(start, end, step);
};
