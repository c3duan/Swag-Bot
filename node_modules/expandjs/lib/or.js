/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * OR logical operator.
 *
 * ```js
 * XP.or(1, 'a')
 * // => true
 *
 * XP.or(0, 'a')
 * // => true
 *
 * XP.or(0, '')
 * // => false
 * ```
 *
 * @function or
 * @since 1.0.0
 * @category operator
 * @description OR logical operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/or.js
 *
 * @param {*} a First value
 * @param {*} b Second value
 * @returns {boolean}
 */
module.exports = function or(a, b) {

    // Returning
    return Boolean(a || b);
};
