/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * AND logic operator.
 *
 * ```js
 * XP.and(1, 'a')
 * // => true
 *
 * XP.and(0, 'a')
 * // => false
 *
 * XP.and(0, '')
 * // => false
 * ```
 *
 * @function and
 * @since 1.0.0
 * @category operator
 * @description AND logic operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/and.js
 *
 * @param {*} a First value
 * @param {*} b Second value
 * @returns {boolean}
 */
module.exports = function and(a, b) {

    // Returning
    return Boolean(a && b);
};
