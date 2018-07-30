/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _escapeRegExp = require('lodash/escapeRegExp'),
    assertArgument  = require('./assertArgument'),
    isString        = require('./isString'),
    isVoid          = require('./isVoid');

/**
 * Returns `string` with the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*", "+", "(", ")", "[", "]", "{" and "}" escaped.
 *
 * ```js
 * XP.escapeRegExp('[google](https://www.google.com)');
 * // => '\[google\]\(https://google\.com\)'
 * ```
 *
 * @function escapeRegExp
 * @since 1.0.0
 * @category string
 * @description Returns `string` with the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*", "+", "(", ")", "[", "]", "{" and "}" escaped
 * @source https://github.com/expandjs/expandjs/blog/master/lib/escapeRegExp.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the escaped string
 */
module.exports = function escapeRegExp(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _escapeRegExp(string) || '';
};
