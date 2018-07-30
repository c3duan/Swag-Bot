/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _findLastKey = require('lodash/findLastKey'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    isObject       = require('./isObject');

/**
 * Returns the key of the last element `predicate` returns truthy for.
 *
 * ```js
 * let users = {
 *     barney:  {age: 36, active: true},
 *     fred:    {age: 40, active: false},
 *     pebbles: {age: 18, active: true}
 * };
 *
 * XP.findLastKey(users, user => user.age < 40);
 * // => 'pebbles' (iteration order is not guaranteed)
 * ```
 *
 * @function findLastKey
 * @since 1.0.0
 * @category object
 * @description Returns the key of the last element `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findLastKey.js
 *
 * @param {Object} object The target object
 * @param {Function} predicate The function invoked per iteration
 * @returns {string} Returns the key of the matched element, else `undefined`
 */
module.exports = function findLastKey(object, predicate) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');
    assertArgument(isFunction(predicate), 2, 'Function');

    // Returning
    return _findLastKey(object, predicate);
};
