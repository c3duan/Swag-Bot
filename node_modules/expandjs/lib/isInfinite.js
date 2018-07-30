/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Checks if `value` is `Infinity`.
 *
 * ```js
 * XP.isInfinite(Infinity);
 * // => true
 *
 * XP.isInfinite('Infinity');
 * // => false
 *
 * XP.isInfinite(0);
 * // => false
 * ```
 *
 * @function isInfinite
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is `Infinity`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isInfinite.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isInfinite(value) {

    // Returning
    return value === Infinity || value === -Infinity;
};
