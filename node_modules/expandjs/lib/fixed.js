/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isFinite         = require('./isFinite'),
    isIndex          = require('./isIndex'),
    isVoid           = require('./isVoid'),
    repeat           = require('./repeat'),
    round            = require('./round');

/**
 * Returns `number` formatted using fixed-point notation.
 *
 * A 2nd parameter can be provided to specify how many digits should be used after the decimal point.
 *
 * ```js
 * XP.fixed(1, 3)
 * // => 1.000
 * ```
 *
 * @function fixed
 * @since 1.0.0
 * @category number
 * @description Returns `number` formatted using fixed-point notation
 * @source https://github.com/expandjs/expandjs/blog/master/lib/fixed.js
 *
 * @param {number} number The target number
 * @param {number} [precision = 0] The number of digits to be used after the decimal point
 * @returns {string} Returns a string representation of the reference number
 */
module.exports = function fixed(number, precision) {

    // Asserting
    assertArgument(isFinite(number), 1, 'number');
    assertArgument(isVoid(precision) || isIndex(precision), 2, 'number');

    // Let
    let result = round(number, precision).toString();

    // Concatenating
    if (precision) { result += result.includes('.') ? '' : '.'; }
    if (precision) { result += repeat('0', precision + result.indexOf('.') - result.length + 1); }

    // Returning
    return result;
};
