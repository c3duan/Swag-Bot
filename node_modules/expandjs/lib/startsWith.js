/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _startsWith  = require('lodash/startsWith'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Checks if `string` starts with the given target string.
 *
 * A 3rd parameter can be provided to specify a `suffix` that must succeeds `target`.
 *
 * ```js
 * XP.startsWith('hello_world', 'hello');
 * // => true
 *
 * XP.startsWith('hello_world', 'hello', ' ');
 * // => false
 * ```
 *
 * @function startsWith
 * @since 1.0.0
 * @category string
 * @description Checks if `string` starts with the given target string
 * @source https://github.com/expandjs/expandjs/blog/master/lib/startsWith.js
 *
 * @param {string} [string = ""] The target string
 * @param {string} [target = ""] The string to search for
 * @param {string} [spacer = ""] The string to that must succeeds `target`
 * @returns {boolean} Returns `true` if `string` starts with `target`
 */
module.exports = function startsWith(string, target, spacer) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(target) || isString(target), 2, 'string');
    assertArgument(isVoid(spacer) || isString(spacer), 3, 'string');

    // Returning
    return _startsWith(string || ``, `${spacer || ``}${target || ``}`);
};
