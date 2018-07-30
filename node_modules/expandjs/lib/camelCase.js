/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _camelCase   = require('lodash/camelCase'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to [camel case](https://en.wikipedia.org/wiki/Camel_case).
 *
 * ```js
 * XP.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * XP.camelCase('--foo-bar');
 * // => 'fooBar'
 *
 * XP.camelCase('__foo_bar__');
 * // => 'fooBar'
 * ```
 *
 * @function camelCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to camel case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/camelCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the camel cased string
 */
module.exports = function camelCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _camelCase(string) || '';
};
