/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns the base 64 representation of `string`.
 *
 * ```js
 * XP.parseBase64('dGVzdA==')
 * // => 'test'
 *
 * XP.parseBase64(null)
 * // => undefined
 * ```
 *
 * @function parseBase64
 * @since 1.0.0
 * @category string
 * @description Returns the base 64 representation of `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parseBase64.js
 *
 * @param {string} string The target string
 * @returns {string} Returns the parsed value as string
 */
module.exports = function parseBase64(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    if (typeof window !== "undefined" && isString(string)) { try { return global.decodeURIComponent(global.atob(string)); } catch (ignore) {} }
    if (isString(string)) { try { return new Buffer(string, 'base64').toString(); } catch (ignore) {} }
};
