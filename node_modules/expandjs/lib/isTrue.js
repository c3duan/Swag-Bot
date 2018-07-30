/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Checks if `value` is `true`.
 *
 * ```js
 * XP.isTrue(true);
 * // => true
 *
 * XP.isTrue('true');
 * // => false
 *
 * XP.isTrue(1);
 * // => false
 * ```
 *
 * @function isTrue
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is `true`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isTrue.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isTrue(value) {

    // Returning
    return value === true;
};
