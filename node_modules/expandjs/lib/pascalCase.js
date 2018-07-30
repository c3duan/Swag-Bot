/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _camelCase   = require('lodash/camelCase'),
    _upperFirst    = require('lodash/upperFirst'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to [pascal case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * ```js
 * XP.pascalCase('Foo Bar');
 * // => 'FooBar'
 *
 * XP.pascalCase('--foo-bar');
 * // => 'FooBar'
 *
 * XP.pascalCase('__foo_bar__');
 * // => 'FooBar'
 * ```
 *
 * @function pascalCase
 * @since 1.0.0
 * @category string
 * @description Returns `string` converted to pascal case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/pascalCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the pascal cased string
 */
module.exports = function pascalCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _upperFirst(_camelCase(string)) || '';
};
