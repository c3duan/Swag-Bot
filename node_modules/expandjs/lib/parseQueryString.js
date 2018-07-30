/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _querystring = require('querystring'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns the object representation a query `string`.
 *
 * ```js
 * XP.parseQueryString('foo=bar&baz=qux&baz=quux');
 * // => {foo: 'bar', baz: ['qux', 'quux']}
 *
 * XP.parseQueryString('');
 * // => {}
 * ```
 *
 * @function parseQueryString
 * @since 1.0.0
 * @category string
 * @description Returns the object representation a query `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parseQueryString.js
 *
 * @param {string} string The target string
 * @returns {Object} Returns the parsed value as object
 */
module.exports = function parseQueryString(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return _querystring.parse(string || '');
};
