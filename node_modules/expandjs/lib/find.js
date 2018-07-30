/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _find        = require('lodash/find'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * Iterates over elements of `collection`, returning the first element `predicate` returns truthy for.
 * The `predicate` is invoked with three arguments: (`value`, `index|key`, `collection`).
 *
 * ```js
 * XP.find([1, 2, 3, 4], n => n % 2);
 * // => 1
 * ```
 *
 * @function find
 * @since 1.0.0
 * @category collection
 * @description Iterates over elements of `collection`, returning the first element `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/find.js
 *
 * @param {Array | Object} collection The target collection
 * @param {Function} predicate The function invoked per iteration
 * @returns {*} Returns the matched element, else `undefined`
 */
module.exports = function find(collection, predicate) {

    // Asserting
    assertArgument(isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');
    assertArgument(isFunction(predicate), 2, 'Function');

    // Returning
    return _find(collection, predicate);
};
