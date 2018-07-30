/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _url   = require('url'),
    isObject = require('./isObject');

/**
 * Returns a URL `string` representation of `target`.
 *
 * ```js
 * XP.toURL({protocol: 'http:', hostname: 'localhost', port: 3000, pathname: '/news', query: {id: 'test'}});
 * // => "http://localhost:3000/news?id=test"
 *
 * XP.toURL({protocol: 'http:', host: 'localhost:3000', pathname: '/news', search: 'id=test'});
 * // => "http://localhost:3000/news?id=test"
 * ```
 *
 * @function toURL
 * @since 1.0.0
 * @category caster
 * @description Returns a URL `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toURL.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toURL(target) {

    // Returning
    if (isObject(target)) { return _url.format(target); }
};
