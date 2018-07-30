/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDefined = require('./isDefined'),
    isVoid      = require('./isVoid'),
    toNumber    = require('./toNumber'),
    xnor        = require('./xnor');

/**
 * Checks if `value` is a `number` or numeric `string`.
 *
 * ```js
 * XP.isNumeric(1);
 * // => true
 *
 * XP.isNumeric('1');
 * // => true
 *
 * XP.isNumeric('1b');
 * // => false
 *
 * XP.isNumeric(NaN);
 * // => false
 * ```
 *
 * @function isNumeric
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `number` or numeric `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isNumeric.js
 *
 * @param {*} value The target value
 * @param {boolean} [notNegative] Specifies if `value` must be not negative
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isNumeric(value, notNegative) {

    // Returning
    return isDefined(value = toNumber(value, true)) && (isVoid(notNegative) || xnor(value >= 0, notNegative));
};
