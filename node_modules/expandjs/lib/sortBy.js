/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _sortBy      = require('lodash/sortBy'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * Returns an array of elements, sorted in ascending order by the results of running each element in `collection` through `iteratee`.
 * This method performs a stable sort, that is, it preserves the original sort order of equal elements.
 * The `iteratee` is invoked with one argument: (value).
 *
 * ```js
 * let users = [
 *     {name: 'fred',   age: 48},
 *     {name: 'barney', age: 36},
 *     {name: 'fred',   age: 40},
 *     {name: 'barney', age: 34}
 * ];
 *
 * XP.sortBy(users, user => user.name);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 * ```
 *
 * @function sortBy
 * @since 1.0.0
 * @category collection
 * @description Returns an array of elements, sorted in ascending order by the results of running each element in `collection` through `iteratee`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/sortBy.js
 *
 * @param {Array | Object} collection The target collection
 * @param {Function} iteratee The function invoked per iteration
 * @returns {Array} Returns the new sorted array
 */
module.exports = function sortBy(collection, iteratee) {

    // Asserting
    assertArgument(isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _sortBy(collection, iteratee);
};
