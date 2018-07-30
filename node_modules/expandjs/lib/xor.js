/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * XOR logical operator.
 *
 * ```js
 * XP.xor(1, 'a')
 * // => false
 *
 * XP.xor(0, 'a')
 * // => true
 *
 * XP.xor(0, '')
 * // => false
 * ```
 *
 * @function xor
 * @since 1.0.0
 * @category operator
 * @description XOR logical operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/xor.js
 *
 * @param {*} a First value
 * @param {*} b Second value
 * @returns {boolean}
 */
module.exports = function xor(a, b) {

    // Returning
    return Boolean(a) !== Boolean(b);
};
