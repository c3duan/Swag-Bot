/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isArrayLike = require('./isArrayLike'),
    isObject      = require('./isObject'),
    isUseful      = require('./isUseful');

/**
 * Checks if `value` is empty.
 *
 * ```js
 * XP.isEmpty('');
 * // => true
 *
 * XP.isEmpty([]);
 * // => true
 *
 * XP.isEmpty({});
 * // => true
 *
 * XP.isEmpty(0);
 * // => false
 * ```
 *
 * @function isEmpty
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is empty
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isEmpty.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isEmpty(value) {

    // Returning
    return !isUseful(value) || isArrayLike(value, false) || isObject(value, false);
};
