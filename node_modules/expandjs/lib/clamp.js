/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _clamp       = require('lodash/clamp'),
    assertArgument = require('./assertArgument'),
    isNumber       = require('./isNumber');

/**
 * Returns number clamped within the inclusive lower and upper bounds.
 *
 * ```js
 * XP.clamp(-10, -5, 5);
 * // => -5
 *
 * XP.clamp(10, -5, 5);
 * // => 5
 * ```
 *
 * @function clamp
 * @since 1.0.0
 * @category number
 * @description Returns number clamped within the inclusive lower and upper bounds
 * @source https://github.com/expandjs/expandjs/blog/master/lib/clamp.js
 *
 * @param {number} number The target number
 * @param {number} min The lower bound
 * @param {number} max The upper bound
 * @returns {number} Returns the clamped number
 */
module.exports = function clamp(number, min, max) {

    // Asserting
    assertArgument(isNumber(number), 1, 'number');
    assertArgument(isNumber(min), 2, 'number');
    assertArgument(isNumber(max), 3, 'number');

    // Returning
    return _clamp(number, min, max);
};
