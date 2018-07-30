/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isRegExp = require('lodash/isRegExp');

/**
 * Checks if `value` is a `RegExp`.
 *
 * ```js
 * XP.isRegExp(/abc/);
 * // => true
 *
 * XP.isRegExp('/abc/');
 * // => false
 * ```
 *
 * @function isRegExp
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `RegExp`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isRegExp.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isRegExp(value) {

    // Returning
    return _isRegExp(value);
};
