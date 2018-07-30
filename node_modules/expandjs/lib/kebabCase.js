/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _kebabCase   = require('lodash/kebabCase'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * ```js
 * XP.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * XP.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * XP.kebabCase('__foo_bar__');
 * // => 'foo-bar'
 * ```
 *
 * @function kebabCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to kebab case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/kebabCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the kebab cased string
 */
module.exports = function kebabCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _kebabCase(string) || '';
};
