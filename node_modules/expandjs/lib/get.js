/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _get         = require('lodash/get'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isString       = require('./isString');

/**
 * Returns the value at `path` of `collection`.
 * If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 *
 * ```js
 * let collection = {a: [{b: {c: 3}}]};
 *
 * XP.get(collection, 'a[0].b.c');
 * // => 3
 *
 * XP.get(collection, 'a.0.b.c');
 * // => 3
 *
 * XP.get(collection, 'a.b.c', 'default');
 * // => 'default'
 * ```
 *
 * @function get
 * @since 1.0.0
 * @category collection
 * @description Returns the value at `path` of `collection`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/get.js
 *
 * @param {Array | Object} collection The target collection
 * @param {string} path The path of the property to get
 * @param {*} [defaultValue] The value returned for `undefined` resolved values
 * @returns {*} Returns the resolved value
 */
module.exports = function get(collection, path, defaultValue) {

    // Asserting
    assertArgument(isCollection(collection), 1, 'Array or Object');
    assertArgument(isString(path), 2, 'string');

    // Returning
    return _get(collection, path, defaultValue);
};
