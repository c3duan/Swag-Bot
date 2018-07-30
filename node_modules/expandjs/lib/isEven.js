/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isFinite = require('./isFinite'),
    isVoid     = require('./isVoid'),
    xnor       = require('./xnor');

/**
 * Checks if `value` is an even finite `number`.
 *
 * ```js
 * XP.isEven(2);
 * // => true
 *
 * XP.isEven(-2);
 * // => true
 *
 * XP.isEven(-2, true);
 * // => false
 *
 * XP.isEven('2');
 * // => false
 *
 * XP.isEven(2.5);
 * // => false
 * ```
 *
 * @function isEven
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an even finite `number`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isEven.js
 *
 * @param {*} value The target value
 * @param {boolean} [notNegative] Specifies if `value` must be not negative
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isEven(value, notNegative) {

    // Returning
    return isFinite(value) && value % 2 === 0 && (isVoid(notNegative) || xnor(value >= 0, notNegative));
};
