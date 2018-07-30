/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isHex            = require('./isHex'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns the hexadecimal representation of `string`.
 *
 * ```js
 * XP.parseHex('a')
 * // => 10
 *
 * XP.parseHex('')
 * // => undefined
 * ```
 *
 * @function parseHex
 * @since 1.0.0
 * @category string
 * @description Returns the hexadecimal representation of `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parseHex.js
 *
 * @param {string} string The target string
 * @returns {number} Returns the parsed value as integer
 */
module.exports = function parseHex(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    if (isHex(string, true)) { return parseInt(string, 16); }
};
