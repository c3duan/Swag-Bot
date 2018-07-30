/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _partition   = require('lodash/partition'),
    assertArgument = require('./assertArgument'),
    isArray        = require('./isArray'),
    isFunction     = require('./isFunction');

/**
 * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for.
 * The `predicate` is invoked with one argument: (`value`).
 *
 * ```js
 * let users = [
 *     {user: barney,  age: 36, active: false},
 *     {user: fred,    age: 40, active: true},
 *     {user: pebbles, age: 18, active: false}
 * ];
 *
 * XP.partition(users, user => user.active);
 // => objects for [['fred'], ['barney', 'pebbles']]
 * ```
 *
 * @function partition
 * @since 1.0.0
 * @category array
 * @description Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/partition.js
 *
 * @param {Array} array The target array
 * @param {Function} [predicate] The function invoked per iteration
 * @returns {Array} Returns the array of grouped elements
 */
module.exports = function partition(array, predicate) {

    // Asserting
    assertArgument(isArray(array), 1, 'Array');
    assertArgument(isFunction(predicate), 1, 'Function');

    // Returning
    return _partition(array, predicate);
};
