/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _zipWith     = require('lodash/zipWith'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * This method is like `zip` except that it accepts `iteratee` to specify how grouped values should be combined.
 * The `iteratee` is invoked with the elements of each group: (`...group`).
 *
 * ```js
 * XP.zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c);
 * // => [111, 222]
 * ```
 *
 * @function zipWith
 * @since 1.0.0
 * @category array
 * @description This method is like `zip` except that it accepts `iteratee` to specify how grouped values should be combined
 * @source https://github.com/expandjs/expandjs/blog/master/lib/zipWith.js
 *
 * @param {Array} array The target array
 * @param {Function} iteratee The function to combine grouped values
 * @returns {Array} Returns the new array of grouped elements
 */
module.exports = function zipWith(array, iteratee) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _zipWith(array, iteratee);
};
