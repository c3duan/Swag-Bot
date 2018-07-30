/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _random      = require('lodash/random'),
    assertArgument = require('./assertArgument'),
    isFinite       = require('./isFinite'),
    isVoid         = require('./isVoid');

/**
 * Returns a random number between the inclusive lower and upper bounds.
 * If only one argument is provided a number between `0` and the given number is returned.
 * If `floating` is true, or either lower or upper are floats, a floating-point number is returned.
 *
 * ```js
 * XP.random(0, 5);
 * // => an integer between 0 and 5
 *
 * XP.random(5);
 * // => also an integer between 0 and 5
 *
 * XP.random(5, true);
 * // => a floating-point number between 0 and 5
 *
 * XP.random(1.2, 5.2);
 * // => a floating-point number between 1.2 and 5.2
 * ```
 *
 * @function random
 * @since 1.0.0
 * @category number
 * @description Returns a random number between the inclusive lower and upper bounds
 * @source https://github.com/expandjs/expandjs/blog/master/lib/random.js
 *
 * @param {number} [min = 0] The minimum possible value
 * @param {number} [max = 1] The maximum possible value
 * @param {boolean} [floating = false] Specify returning a floating-point number
 * @returns {number} Returns the random number
 */
module.exports = function random(min, max, floating) {

    // Asserting
    assertArgument(isVoid(min) || isFinite(min), 1, 'number');
    assertArgument(isVoid(max) || isFinite(max), 2, 'number');

    // Returning
    return _random(min, max, Boolean(floating));
};
