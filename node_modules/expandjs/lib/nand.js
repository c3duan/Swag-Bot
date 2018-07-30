/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * NAND logical operator.
 *
 * ```js
 * XP.nand(1, 'a')
 * // => false
 *
 * XP.nand(0, 'a')
 * // => true
 *
 * XP.nand(0, '')
 * // => true
 * ```
 *
 * @function nand
 * @since 1.0.0
 * @category operator
 * @description NAND logical operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/nand.js
 *
 * @param {*} a First value
 * @param {*} b Second value
 * @returns {boolean}
 */
module.exports = function nand(a, b) {

    // Returning
    return !(a && b);
};
