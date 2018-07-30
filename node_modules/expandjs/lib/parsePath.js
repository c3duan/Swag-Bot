/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _pathToRegexp = require('path-to-regexp'),
    assertArgument  = require('./assertArgument'),
    isDefined       = require('./isDefined'),
    isString        = require('./isString'),
    isVoid          = require('./isVoid');

/**
 * Returns the object representation of `string`, matching it against `route`.
 *
 * ```js
 * XP.parsePath('/news/123', '/news/:id');
 * // => {id: '123'}
 *
 * XP.parsePath('/news/123', '/news');
 * // => null
 * ```
 *
 * @function parsePath
 * @since 1.0.0
 * @category string
 * @description Returns the object representation of `string`, matching it against `route`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parsePath.js
 *
 * @param {string} string The target string
 * @param {string} route The route to match against
 * @returns {Object} Returns the parsed value as object
 */
module.exports = function parsePath(string, route) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isString(route), 2, 'string');

    // Let
    let keys   = [],
        result = {},
        values = _pathToRegexp(route, keys).exec(string === '*' ? '(.*)' : string || '');

    // Checking
    if (values) { values.shift(); } else { return null; }

    // Reducing
    values.forEach((val, i) => isDefined(val) ? result[keys[i].name] = val : null);

    // Returning
    return result;
};
