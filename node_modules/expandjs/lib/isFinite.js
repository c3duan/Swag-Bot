/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isFinite = require('lodash/isFinite'),
    isVoid      = require('./isVoid'),
    xnor        = require('./xnor');

/**
 * Checks if `value` is a finite `number`.
 *
 * ```js
 * XP.isFinite(10);
 * // => true
 *
 * XP.isFinite('10');
 * // => false
 *
 * XP.isFinite(Infinity);
 * // => false
 * ```
 *
 * @function isFinite
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a finite `number`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isFinite.js
 *
 * @param {*} value The target value
 * @param {boolean} [notNegative] Specifies if `value` must be not negative
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isFinite(value, notNegative) {

    // Returning
    return _isFinite(value) && (isVoid(notNegative) || xnor(value >= 0, notNegative));
};
