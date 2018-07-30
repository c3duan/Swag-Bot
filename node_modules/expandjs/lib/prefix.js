/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    startsWith       = require('./startsWith');

/**
 * Returns `string` preceded by `prefix`.
 *
 * A 3rd parameter can ben provided to specify a `spacer` between `string` and `prefix`.
 *
 * ```js
 * XP.prefix('world', 'hello_');
 * // => 'hello_world'
 *
 * XP.prefix('world', 'hello', '_');
 * // => 'hello_world'
 * ```
 *
 * @function prefix
 * @since 1.0.0
 * @category string
 * @description Returns `string` preceded by `prefix`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/prefix.js
 *
 * @param {string} [string = ""] The target string
 * @param {string} [prefix = ""] The prefix to use
 * @param {string} [spacer = ""] The spacer between `string` and `prefix`
 * @returns {string} Returns the prefixed string
 */
module.exports = function prefix(string, prefix, spacer) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(prefix) || isString(prefix), 2, 'string');
    assertArgument(isVoid(spacer) || isString(spacer), 3, 'string');

    // Let
    let prefixed = startsWith(string ? string.toLowerCase() : '', prefix ? prefix.toLowerCase() : '', spacer ? spacer.toLowerCase() : '');

    // Returning
    return prefixed ? string || `` : `${prefix || ``}${prefix && spacer || ``}${string || ``}`;
};
