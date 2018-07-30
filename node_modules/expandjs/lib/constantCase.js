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
 * Returns `string` converted to [constant case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * ```js
 * XP.constantCase('Foo Bar');
 * // => 'FOO_BAR'
 *
 * XP.constantCase('fooBar');
 * // => 'FOO_BAR'
 *
 * XP.constantCase('--foo-bar');
 * // => 'FOO_BAR'
 * ```
 *
 * @function constantCase
 * @since 1.2.0
 * @category string
 * @description Returns `string` converted to constant case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/constantCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the constant cased string
 */
module.exports = function constantCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _snakeCase(string).toUpperCase() || '';
};
