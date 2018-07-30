/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _memoize     = require('lodash/memoize'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    isVoid         = require('./isVoid');

/**
 * Returns a function that memoizes the result of `func`.
 * If `resolver` is provided, it determines the cache key for storing the result based on the `arguments` provided to the memoized function.
 * By default, the first argument provided to the memoized function is used as the map cache key.
 * The `func` is invoked with the `this` binding of the memoized function.
 *
 * ```js
 * let object = {a: 1, b: 2},
 *     other  = {c: 3, d: 4},
 *     values = XP.memoize(XP.values);
 *
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 * ```
 *
 * @function memoize
 * @since 1.0.0
 * @category function
 * @description Returns a function that memoizes the result of `func`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/memoize.js
 *
 * @param {Function} func The target function
 * @param {Function} [resolver] The function to resolve the cache key
 * @returns {Function} Returns the new memoizing function
 */
module.exports = function memoize(func, resolver) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');
    assertArgument(isVoid(resolver) || isFunction(resolver), 2, 'Function');

    // Returning
    return _memoize(func, resolver);
};
