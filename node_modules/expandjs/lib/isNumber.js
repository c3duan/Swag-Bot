/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isNumber = require('lodash/isNumber'),
    isNaN       = require('./isNaN'),
    isVoid      = require('./isVoid'),
    xnor        = require('./xnor');

/**
 * Checks if `value` is a `number`.
 *
 * ```js
 * XP.isNumber(1);
 * // => true
 *
 * XP.isNumber('1');
 * // => false
 *
 * XP.isNumber(NaN);
 * // => false
 * ```
 *
 * @function isNumber
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `number`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isNumber.js
 *
 * @param {*} value The target value
 * @param {boolean} [notNegative] Specifies if `value` must be not negative
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isNumber(value, notNegative) {

    // Returning
    return _isNumber(value) && !isNaN(value) && (isVoid(notNegative) || xnor(value >= 0, notNegative));
};
