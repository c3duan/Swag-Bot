/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _set         = require('lodash/set'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isString       = require('./isString');

/**
 * Sets the value at `path` of `collection`.
 * If a portion of `path` doesn't exist, it's created.
 * Arrays are created for missing index properties, while objects are created for all other missing properties.
 *
 * ```js
 * let collection = {a: [{b: {c: 3}}]};
 *
 * XP.set(collection, 'a[0].b.c', 4);
 * console.log(collection.a[0].b.c);
 * // => 4
 *
 * XP.set(collection, ['x', '0', 'y', 'z'], 5);
 * console.log(collection.x[0].y.z);
 * // => 5
 * ```
 *
 * @function set
 * @since 1.0.0
 * @category collection
 * @description Sets the value at `path` of `collection`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/set.js
 *
 * @param {Array | Object} collection The target collection
 * @param {string} path The path of the property to set
 * @param {*} value The value to set
 * @returns {Array | Object} Returns `collection`
 */
module.exports = function set(collection, path, value) {

    // Asserting
    assertArgument(isCollection(collection), 1, 'Array or Object');
    assertArgument(isString(path), 2, 'string');

    // Returning
    return _set(collection, path, value);
};
