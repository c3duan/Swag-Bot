/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString = require('./isString'),
    isVoid     = require('./isVoid');

/**
 * Checks if `value` is not `null`, `undefined`, `NaN` or empty `string`.
 *
 * ```js
 * XP.isUseful(false);
 * // => true
 *
 * XP.isUseful(0);
 * // => true
 *
 * XP.isUseful(null);
 * // => false
 *
 * XP.isUseful(NaN);
 * // => false
 *
 * XP.isUseful('');
 * // => false
 * ```
 *
 * @function isUseful
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is not `null`, `undefined`, `NaN` or empty `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isUseful.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isUseful(value) {

    // Returning
    return !isVoid(value) && !isString(value, false);
};
