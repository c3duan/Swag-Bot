/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _upperFirst  = require('lodash/upperFirst'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` trimmed and with the first character converted to upper case.
 *
 * ```js
 * XP.capitalize('fred');
 * // => 'Fred'
 * ```
 *
 * @function capitalize
 * @since 1.0.0
 * @category string
 * @description Returns `string` trimmed and with the first character converted to upper case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/capitalize.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the capitalized string
 */
module.exports = function capitalize(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _upperFirst(string.trim()) || '';
};
