/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _url         = require('url'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid'),
    toIndex        = require('./toIndex');

/**
 * Returns the object representation of a URL `string`.
 *
 * A 2nd parameter can be provided to specify if the query string should be parsed too.
 *
 * A 3rd parameter can be provided to specify if `//foo/bar` should be treated as `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`.
 *
 * ```js
 * XP.parseURL('http://www.example.com:3000/path?name=Bear&surname=Grylls#hash');
 * // => {
 *     auth: null,
 *     hash: '#hash',
 *     host: 'www.example.com:3000',
 *     hostname: 'www.example.com',
 *     href: 'http://www.example.com:3000/path?name=Bear&surname=Grylls#hash',
 *     path: '/path?name=Bear&surname=Grylls',
 *     pathname: '/path',
 *     port: '3000',
 *     protocol: 'http:',
 *     query: 'name=Bear&surname=Grylls',
 *     search: '?name=Bear&surname=Grylls',
 *     slashes: true
 * }
 *
 * XP.parseURL('http://www.example.com:3000/path?name=Bear&surname=Grylls#hash', true);
 * // => {
 *     auth: null,
 *     hash: '#hash',
 *     host: 'example.com:3000',
 *     hostname: 'example.com',
 *     href: 'http://www.example.com:3000/path#hash',
 *     path: '/path',
 *     pathname: '/path',
 *     port: '3000',
 *     protocol: 'http:',
 *     query: {name: 'Bear', surname: 'Grylls'},
 *     search: '',
 *     slashes: true
 * }
 *
 * XP.parseURL('');
 * // => undefined
 * ```
 *
 * @function parseURL
 * @since 1.0.0
 * @category string
 * @description Returns the object representation of a URL `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parseURL.js
 *
 * @param {string} string The target string
 * @param {boolean} [parseQuery = false] Specifies if the query string should be parsed too
 * @param {boolean} [slashesDenoteHost = false] Specifies if `//foo/bar` should be treated as `{host: 'foo', pathname: '/bar'}` rather than `{pathname: '//foo/bar'}`
 * @returns {Object} Returns the parsed value as object
 */
module.exports = function parseURL(string, parseQuery, slashesDenoteHost) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Let
    let result = string && _url.parse(string, Boolean(parseQuery), Boolean(slashesDenoteHost)) || undefined;

    // Returning
    return result && Object.assign(result, {port: toIndex(result.port, true) || null});
};
