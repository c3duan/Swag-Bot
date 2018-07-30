/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _unescape    = require('lodash/unescape'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` with the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` converted their corresponding characters.
 *
 * ```js
 * XP.unescape('fred, barney, &amp; pebbles');
 * // => 'fred, barney, & pebbles'
 * ```
 *
 * @function unescape
 * @since 1.0.0
 * @category string
 * @description Returns `string` with the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` converted their corresponding characters
 * @source https://github.com/expandjs/expandjs/blog/master/lib/unescape.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the unescaped string
 */
module.exports = function unescape(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _unescape(string) || '';
};
