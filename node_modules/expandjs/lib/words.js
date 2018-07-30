/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _words       = require('lodash/words'),
    assertArgument = require('./assertArgument'),
    isRegExp       = require('./isRegExp'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns the array of words in `string`.
 *
 * ```js
 * XP.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * XP.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 * ```
 *
 * @function words
 * @since 1.0.0
 * @category string
 * @description Returns the array of words in `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/words.js
 *
 * @param {string} [string = ""] The target string
 * @param {RegExp | string} [pattern] The pattern to match words
 * @returns {Array} Returns the words of `string`
 */
module.exports = function words(string, pattern) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(pattern) || isRegExp(pattern) || isString(pattern), 2, 'RegExp or string');

    // Returning
    return string ? _words(string, pattern) : [];
};
