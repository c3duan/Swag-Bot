/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * NOT logical operator.
 *
 * ```js
 * XP.not(1)
 * // => false
 *
 * XP.not(0)
 * // => true
 * ```
 *
 * @function not
 * @since 1.0.0
 * @category operator
 * @description NOT logical operator
 * @source https://github.com/expandjs/expandjs/blog/master/lib/not.js
 *
 * @param {*} a Value
 * @returns {boolean}
 */
module.exports = function not(a) {

    // Returning
    return !a;
};
