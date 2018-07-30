/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    endsWith         = require('./endsWith'),
    isVoid           = require('./isVoid'),
    isString         = require('./isString');

/**
 * Returns `string` succeeded by `suffix`.
 *
 * A 3rd parameter can ben provided to specify a `spacer` between `string` and `suffix`.
 *
 * ```js
 * XP.suffix('hello', '_world');
 * // => 'hello_world'
 *
 * XP.suffix('hello', 'world', '_');
 * // => 'hello_world'
 * ```
 *
 * @function suffix
 * @since 1.0.0
 * @category string
 * @description Returns `string` succeeded by `suffix`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/suffix.js
 *
 * @param {string} [string = ""] The target string
 * @param {string} [suffix = ""] The suffix to use
 * @param {string} [spacer = ""] The spacer between `string` and `suffix`
 * @returns {string} Returns the suffixed string
 */
module.exports = function suffix(string, suffix, spacer) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(suffix) || isString(suffix), 2, 'string');
    assertArgument(isVoid(spacer) || isString(spacer), 3, 'string');

    // Let
    let suffixed = endsWith(string ? string.toLowerCase() : '', suffix ? suffix.toLowerCase() : '', spacer ? spacer.toLowerCase() : '');

    // Returning
    return suffixed ? string || `` : `${string || ``}${suffix && spacer || ``}${suffix || ``}`;
};
