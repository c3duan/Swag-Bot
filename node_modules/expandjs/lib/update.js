/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _update      = require('lodash/update'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isFunction     = require('./isFunction'),
    isString       = require('./isString');

/**
 * This method is like `set` except that accepts `updater` to produce the value to set.
 * The `updater` is invoked with one argument: (`value`).
 *
 * ```js
 * let collection = {a: [{b: {c: 3}}]};
 *
 * XP.update(collection, 'a[0].b.c', n => n * n);
 * console.log(collection.a[0].b.c);
 * // => 9
 *
 * XP.update(collection, 'x[0].y.z', n => n ? n + 1 : 0);
 * console.log(collection.x[0].y.z);
 * // => 0
 * ```
 *
 * @function set
 * @since 1.0.0
 * @category collection
 * @description This method is like `set` except that accepts `updater` to produce the value to set
 * @source https://github.com/expandjs/expandjs/blog/master/lib/set.js
 *
 * @param {Array | Object} collection The target collection
 * @param {string} path The path of the property to set
 * @param {Function} updater The function to produce the updated value
 * @returns {Array | Object} Returns `collection`
 */
module.exports = function update(collection, path, updater) {

    // Asserting
    assertArgument(isCollection(collection), 1, 'Array or Object');
    assertArgument(isString(path), 2, 'string');
    assertArgument(isFunction(updater), 3, 'Function');

    // Returning
    return _update(collection, path, updater);
};
