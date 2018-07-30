/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isFinite         = require('./isFinite'),
    isNumber         = require('./isNumber');

/**
 * Returns the ratio of the given `number` based on the provided `min` - `max` range.
 *
 * A 4th parameter can be provided to force `number` inside the range.
 *
 * ```js
 * XP.ratio(8, 0, 50)
 * // => 0.16
 *
 * XP.ratio(64, 0, 50)
 * // => 1.28
 *
 * XP.ratio(64, 0, 50, true)
 * // => 1
 * ```
 *
 * @function ratio
 * @since 1.0.0
 * @category number
 * @description Returns the ratio of the given `number` based on the provided `min` - `max` range
 * @source https://github.com/expandjs/expandjs/blog/master/lib/ratio.js
 *
 * @param {number} number The target number
 * @param {number} min The minimum possible value
 * @param {number} max The maximum possible value
 * @param {boolean} [clamp = false] Specifies if `number` should be forced inside the range
 * @returns {number} Returns the ratio
 */
module.exports = function ratio(number, min, max, clamp) {

    // Asserting
    assertArgument(isNumber(number), 1, 'number');
    assertArgument(isFinite(min), 2, 'number');
    assertArgument(isFinite(max), 3, 'number');

    // Returning
    return ((clamp ? Math.max(Math.min(number, max), min) : number) - min) / (max - min);
};
