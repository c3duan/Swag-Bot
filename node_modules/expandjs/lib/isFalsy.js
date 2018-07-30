/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Checks if `value` can be casted to `false`.
 *
 * ```js
 * XP.isFalsy(false);
 * // => true
 *
 * XP.isFalsy('false');
 * // => false
 *
 * XP.isFalsy(0);
 * // => true
 * ```
 *
 * @function isFalsy
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` can be casted to `false`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isFalsy.js
 *
 * @param {*} value The target value
 * @param {boolean} [defined] Specifies if `value` must be defined
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isFalsy(value, defined) {

    // Returning
    return !value && (!defined || value !== undefined);
};
