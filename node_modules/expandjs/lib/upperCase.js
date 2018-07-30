/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _upperCase   = require('lodash/upperCase'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to upper case.
 *
 * ```js
 * XP.upperCase('fred');
 * // => 'FRED'
 * ```
 *
 * @function upperCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to upper case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/upperCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the upper cased string
 */
module.exports = function upperCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _upperCase(string) || '';
};
