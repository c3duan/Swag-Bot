/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _round       = require('lodash/round'),
    assertArgument = require('./assertArgument'),
    isFinite       = require('./isFinite'),
    isIndex        = require('./isIndex'),
    isVoid         = require('./isVoid');

/**
 * Returns `number` rounded to `precision`.
 *
 * ```js
 * XP.round(4.006);
 * // => 4
 *
 * XP.round(4.006, 2);
 * // => 4.01
 *
 * XP.round(4060, -2);
 * // => 4100
 * ```
 *
 * @function round
 * @since 1.0.0
 * @category number
 * @description Returns `number` rounded to `precision`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/round.js
 *
 * @param {number} number The target number
 * @param {number} [precision = 0] The precision to round to
 * @returns {number} Returns the rounded number
 */
module.exports = function round(number, precision) {

    // Asserting
    assertArgument(isFinite(number), 1, 'number');
    assertArgument(isVoid(precision) || isIndex(precision), 2, 'number');

    // Returning
    return _round(number, precision);
};
