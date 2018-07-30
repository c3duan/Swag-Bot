/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _ceil        = require('lodash/ceil'),
    assertArgument = require('./assertArgument'),
    isFinite       = require('./isFinite'),
    isIndex        = require('./isIndex'),
    isVoid         = require('./isVoid');

/**
 * Returns `number` rounded up to `precision`.
 *
 * ```js
 * XP.ceil(4.006);
 * // => 5
 *
 * XP.ceil(6.004, 2);
 * // => 6.01
 *
 * XP.ceil(6040, -2);
 * // => 6100
 * ```
 *
 * @function ceil
 * @since 1.0.0
 * @category number
 * @description Returns `number` rounded up to `precision`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/ceil.js
 *
 * @param {number} number The target number
 * @param {number} [precision = 0] The precision to round up to
 * @returns {number} Returns the rounded number
 */
module.exports = function round(number, precision) {

    // Asserting
    assertArgument(isFinite(number), 1, 'number');
    assertArgument(isVoid(precision) || isIndex(precision), 2, 'number');

    // Returning
    return _ceil(number, precision);
};
