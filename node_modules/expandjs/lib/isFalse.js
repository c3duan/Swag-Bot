/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Checks if `value` is `false`.
 *
 * ```js
 * XP.isFalse(false);
 * // => true
 *
 * XP.isFalse('false');
 * // => false
 *
 * XP.isFalse(0);
 * // => false
 * ```
 *
 * @function isFalse
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is `false`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isFalse.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isFalse(value) {

    // Returning
    return value === false;
};
