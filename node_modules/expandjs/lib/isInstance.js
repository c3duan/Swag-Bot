/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isFunction       = require('./isFunction');

/**
 * Checks if `value` is an instance of `Constructor`.
 *
 * ```js
 * XP.isInstance(/abc/, RegExp);
 * // => true
 *
 * XP.isInstance('abc', String);
 * // => false
 * ```
 *
 * @function isInstance
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an instance of `Constructor`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isInstance.js
 *
 * @param {*} value The target value
 * @param {Function} Constructor The constructor to check for
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isInstance(value, Constructor) {

    // Asserting
    assertArgument(isFunction(Constructor), 2, 'Function');

    // Returning
    return value instanceof Constructor;
};
