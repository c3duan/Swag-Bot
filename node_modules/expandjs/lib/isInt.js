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
 * Checks if `value` is an integer `number`.
 *
 * ```js
 * XP.isInt(1);
 * // => true
 *
 * XP.isInt(-1);
 * // => true
 *
 * XP.isInt('1');
 * // => false
 *
 * XP.isInt(1.5);
 * // => false
 * ```
 *
 * @function isInt
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an integer `number`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isInt.js
 *
 * @param {*} value The target value
 * @param {boolean} [notNegative] Specifies if `value` must be not negative
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isInt(value, notNegative) {

    // Returning
    return isFinite(value) && value % 1 === 0 && (isVoid(notNegative) || xnor(value >= 0, notNegative));
};
