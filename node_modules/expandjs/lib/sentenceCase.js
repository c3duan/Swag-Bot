/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _upperFirst  = require('lodash/upperFirst'),
    assertArgument = require('./assertArgument'),
    clean          = require('./clean'),
    deburr         = require('./deburr'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` converted to [sentence case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * ```js
 * XP.sentenceCase('fooBar');
 * // => 'FooBar'
 *
 * XP.sentenceCase('--foo-bar');
 * // => 'Foo bar'
 *
 * XP.sentenceCase('__foo_bar__');
 * // => 'Foo bar'
 * ```
 *
 * @function sentenceCase
 * @since 1.2.0
 * @category string
 * @description Returns `string` converted to sentence case
 * @source https://github.com/expandjs/expandjs/blog/master/lib/sentenceCase.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the sentence cased string
 */
module.exports = function sentenceCase(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _upperFirst(clean(deburr(string).replace(/[^a-zA-Z0-9]/g, ' '))) || '';
};
