/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _remove      = require('lodash/remove'),
    assertArgument = require('./assertArgument'),
    isArray        = require('./isArray'),
    isFunction     = require('./isFunction');

/**
 * Removes all elements from `array` that `predicate` returns truthy for and returns an array of the removed elements.
 * The `predicate` is invoked with three arguments: (`value`, `index`, `array`).
 *
 * ```js
 * XP.remove([1, 2, 3, 4], n => n % 2);
 * // => [1, 3]
 * ```
 *
 * @function remove
 * @since 1.0.0
 * @category array
 * @description Removes all elements from `array` that `predicate` returns truthy for and returns an array of the removed elements
 * @source https://github.com/expandjs/expandjs/blog/master/lib/remove.js
 *
 * @param {Array} array The target array
 * @param {Function} predicate The function invoked per iteration
 * @returns {Array} Returns an array with the removed elements
 */
module.exports = function remove(array, predicate) {

    // Asserting
    assertArgument(isArray(array), 1, 'Array');
    assertArgument(isFunction(predicate), 2, 'Function');

    // Returning
    return _remove(array, predicate);
};
