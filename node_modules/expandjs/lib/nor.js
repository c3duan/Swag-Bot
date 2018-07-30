/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * NOR logical operator.
 *
 * ```js
 * XP.nor(1, 'a')
 * // => false
 *
 * XP.nor(0, 'a')
 * // => false
 *
 * XP.nor(0, '')
 * // => true
 * ```
 *
 * @function nor
 * @since 1.0.0
 * @category operator
 * @description NOR logical operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/nor.js
 *
 * @param {*} a First value.
 * @param {*} b Second value.
 * @returns {boolean}
 */
module.exports = function nor(a, b) {

    // Returning
    return !(a || b);
};
