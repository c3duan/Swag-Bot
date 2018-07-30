/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const ratio = require('./ratio');

/**
 * Returns the percentage of the given `number` based on the provided `min` - `max` range.
 *
 * A 4th parameter can be provided to force `number` inside the range.
 *
 * ```js
 * XP.ratio(8, 0, 50)
 * // => 16
 *
 * XP.ratio(64, 0, 50)
 * // => 128
 *
 * XP.ratio(64, 0, 50, true)
 * // => 100
 * ```
 *
 * @function percentage
 * @since 1.0.0
 * @category number
 * @description Returns the percentage of the given `number` based on the provided `min` - `max` range
 * @source https://github.com/expandjs/expandjs/blog/master/lib/percentage.js
 *
 * @param {number} number The target number
 * @param {number} min The minimum possible value
 * @param {number} max The maximum possible value
 * @param {boolean} [clamp = false] Specifies if `number` should be forced inside the range
 * @returns {number} Returns the percentage
 */
module.exports = function percentage(number, min, max, clamp) {

    // Returning
    return ratio(number, min, max, clamp) * 100;
};
