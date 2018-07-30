/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _snakeCase   = require('lodash/snakeCase'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * ```js
 * XP.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * XP.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * XP.snakeCase('--foo-bar');
 * // => 'foo_bar'
 * ```
 *
 * @function snakeCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to snake case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/snakeCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the snake cased string
 */
module.exports = function snakeCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _snakeCase(string) || '';
};
