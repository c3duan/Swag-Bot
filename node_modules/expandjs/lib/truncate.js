/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _truncate    = require('lodash/truncate'),
    assertArgument = require('./assertArgument'),
    isObject       = require('./isObject'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` truncated if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission string which defaults to "...".
 *
 * ```js
 * XP.truncate('hi-diddly-ho there, neighborino');
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * XP.truncate('hi-diddly-ho there, neighborino', {'length': 24, 'separator': ' '});
 * // => 'hi-diddly-ho there,...'
 *
 * XP.truncate('hi-diddly-ho there, neighborino', {'length': 24, 'separator': /,? +/});
 * // => 'hi-diddly-ho there...'
 *
 * XP.truncate('hi-diddly-ho there, neighborino', {'omission': ' [...]'});
 * // => 'hi-diddly-ho there, neig [...]'
 * ```
 *
 * @function truncate
 * @since 1.0.0
 * @category string
 * @description Returns `string` truncated if it's longer than the given maximum string length
 * @source https://github.com/expandjs/expandjs/blog/master/lib/truncate.js
 *
 * @param {string} [string = ""] The target string
 * @param {Object} [opt] The options object
 *   @param {number} [opt.length = 30] The maximum string length
 *   @param {string} [opt.omission = "..."] The string to indicate text is omitted
 *   @param {RegExp | string} [opt.separator] The separator pattern to truncate to
 * @returns {string} Returns the truncated string
 */
module.exports = function truncate(string, opt) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(opt) || isObject(opt), 2, 'Object');

    // Returning
    return string ? _truncate(string, opt) : '';
};
