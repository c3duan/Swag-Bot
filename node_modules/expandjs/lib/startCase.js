/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _startCase   = require('lodash/startCase'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * ```js
 * XP.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * XP.startCase('--foo-bar');
 * // => 'Foo Bar'
 *
 * XP.startCase('__foo_bar__');
 * // => 'Foo Bar'
 * ```
 *
 * @function startCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to start case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/startCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the start cased string
 */
module.exports = function startCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _startCase(string) || '';
};
