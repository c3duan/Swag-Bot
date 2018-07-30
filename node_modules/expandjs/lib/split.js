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
 * Returns an array with the split parts of `string`, based on `separator`.
 *
 * A 3rd parameter can be provided to specify if `string` should be split only once.
 *
 * ```js
 * XP.split('abc', 'b')
 * // => ['a', 'c']
 *
 * XP.split('abcabc', 'b')
 * // => ['a', 'ca', 'c']
 *
 * XP.split('abcabc', 'b', true)
 * // => ['a', 'cabc']
 * ```
 *
 * @function strip
 * @since 1.0.0
 * @category string
 * @description Returns an array with the split parts of `string`, based on `separator`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/strip.js
 *
 * @param {string} [string = ""] The target string
 * @param {string | RegExp} [separator = ""] The string to look for
 * @param {boolean} [once = false] Specifies if `string` should be split only once
 * @returns {Array} Returns an array with the split parts of `string`
 */
module.exports = function split(string, separator, once) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(separator) || isString(separator) || isRegExp(separator), 2, 'string or RegExp');

    // Let
    let result = string && string.split(separator || '').map(part => part.trim()).filter(part => part) || [];

    // Returning
    return once && result.length > 1 ? [result.shift(), result.join(separator || '')] : result;
};
