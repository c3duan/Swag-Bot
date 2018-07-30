/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isError = require('lodash/isError');

/**
 * Checks if `value` is an instance of `Error`.
 *
 * ```js
 * XP.isError(new Error());
 * // => true
 *
 * XP.isError(Error);
 * // => false
 * ```
 *
 * @function isError
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an instance of `Error`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isError.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isError(value) {

    // Returning
    return _isError(value);
};
