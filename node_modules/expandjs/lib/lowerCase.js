/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _lowerCase   = require('lodash/lowerCase'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` trimmed and converted to lower case.
 *
 * ```js
 * XP.lowerCase('FRED');
 * // => 'fred'
 * ```
 *
 * @function lowerCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to lower case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/lowerCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the lower cased string
 */
module.exports = function lowerCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _lowerCase(string) || '';
};
