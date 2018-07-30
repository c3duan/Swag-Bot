/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isInt = require('./isInt');

/**
 * Checks if `value` is a not negative integer.
 *
 * ```js
 * XP.isIndex(1);
 * // => true
 *
 * XP.isIndex(-1);
 * // => false
 *
 * XP.isIndex('1');
 * // => false
 *
 * XP.isIndex(1.5);
 * // => false
 * ```
 *
 * @function isIndex
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a not negative integer
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isIndex.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isIndex(value) {

    // Returning
    return isInt(value, true);
};
