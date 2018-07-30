/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _endsWith    = require('lodash/endsWith'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Checks if `string` ends with the given target string.
 *
 * A 3rd parameter can be provided to specify a `prefix` that must precedes `target`.
 *
 * ```js
 * XP.endsWith('hello_world', 'world');
 * // => true
 *
 * XP.endsWith('hello_world', 'world', ' ');
 * // => false
 * ```
 *
 * @function endsWith
 * @since 1.0.0
 * @category string
 * @description Checks if `string` ends with the given target string
 * @source https://github.com/expandjs/expandjs/blog/master/lib/endsWith.js
 *
 * @param {string} [string = ""] The target string
 * @param {string} [target = ""] The string to search for
 * @param {string} [prefix = ""] The string to that must precedes `target`
 * @returns {boolean} Returns `true` if `string` ends with `target`
 */
module.exports = function endsWith(string, target, prefix) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(target) || isString(target), 2, 'string');
    assertArgument(isVoid(prefix) || isString(prefix), 3, 'string');

    // Returning
    return _endsWith(string || ``, `${prefix || ``}${target || ``}`);
};
