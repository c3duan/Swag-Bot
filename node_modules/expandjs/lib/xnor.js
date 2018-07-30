/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * XNOR logical operator.
 *
 * ```js
 * XP.xnor(1, 'a')
 * // => true
 *
 * XP.xnor(0, 'a')
 * // => false
 *
 * XP.xnor(0, '')
 * // => true
 * ```
 *
 * @function xnor
 * @since 1.0.0
 * @category operator
 * @description XNOR logical operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/xnor.js
 *
 * @param {*} a First value
 * @param {*} b Second value
 * @returns {boolean}
 */
module.exports = function xnor(a, b) {

    // Returning
    return Boolean(a) === Boolean(b);
};
