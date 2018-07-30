/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _find        = require('lodash/find'),
    _reduce        = require('lodash/reduce'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isFunction     = require('./isFunction'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Iterates over elements of `collection`, returning the first element `predicate` returns truthy for.
 *
 * A 3rd parameter can be provided to specify a scope.
 *
 * ```js
 * let blog = {
 *     users: [
 *         {name: 'barney',  age: 36, active: true},
 *         {name: 'fred',    age: 40, active: false},
 *         {name: 'pebbles', age: 18, active: true}
 *     ],
 *     posts: [
 *         {title: 'first',  name: 'fred',   views: 123},
 *         {title: 'second', name: 'barney', views: 456},
 *         {title: 'third',  name: 'barney', views: 789}
 *     ]
 * };
 *
 * XP.findDeep(blog, item => item.name === 'fred'});
 * // => {name: 'fred', age: 36, active: true}
 *
 * XP.findDeep(blog, item => item.name === 'fred', 'posts');
 * // => {title: 'first', name: 'fred', views: 123}
 * ```
 *
 * @function findDeep
 * @since 1.0.0
 * @category collection
 * @description Iterates over elements of `collection`, returning the first element `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findDeep.js
 *
 * @param {Array | Object} collection The target collection
 * @param {Function} predicate The function invoked per iteration
 * @param {string} [wrapper] The key used to look for nested children
 * @returns {*} Returns the matched element, else `undefined`
 */
module.exports = function findDeep(collection, predicate, wrapper) {

    // Asserting
    assertArgument(isCollection(collection), 1, 'Array or Object');
    assertArgument(isFunction(predicate), 2, 'Function');
    assertArgument(isVoid(wrapper) || isString(wrapper), 3, 'string');

    // Overriding
    if (wrapper) { collection = collection[wrapper]; }

    // Preventing
    if (wrapper && !isCollection(collection)) { return; }

    // Returning
    return _find(collection, predicate) || _reduce(collection, (found, val) => found || (isCollection(val) ? findDeep(val, predicate, wrapper) : undefined), undefined);
};
