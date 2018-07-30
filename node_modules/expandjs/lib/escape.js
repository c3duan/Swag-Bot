/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _escape      = require('lodash/escape'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` with the characters "&", "<", ">", '"', "'", and "\`" converted to their corresponding HTML entities.
 *
 * ```js
 * XP.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 * ```
 *
 * @function escape
 * @since 1.0.0
 * @category string
 * @description Returns `string` with the characters "&", "<", ">", '"', "'", and "\`" converted to their corresponding HTML entities
 * @source https://github.com/expandjs/expandjs/blog/master/lib/escape.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the escaped string
 */
module.exports = function escape(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string && _escape(string) || '';
};
