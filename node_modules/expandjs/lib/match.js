/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isRegExp         = require('./isRegExp'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns the matched values of `string` against `regExp`.
 *
 * ```js
 * XP.match('abc', /a/);
 * // => ['a']
 *
 * XP.match('abc abc abc', /abc/g);
 * // => ['abc', 'abc', 'abc']
 *
 * XP.match('abc 123', /(\w+)\s+(\d+)/);
 * // => ['abc 123', 'abc', '123']
 * ```
 *
 * @function match
 * @since 1.0.0
 * @category string
 * @description Returns the matched values of `string` against `regExp`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/match.js
 *
 * @param {string} [string = ""] The target string
 * @param {RegExp} [regExp] The RegExp matcher
 * @returns {Array} Returns the found matches
 */
module.exports = function match(string, regExp) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(regExp) || isRegExp(regExp), 2, 'RegExp');

    // Returning
    return string && regExp ? string.match(regExp) || [] : [];
};
