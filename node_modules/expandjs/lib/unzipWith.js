/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _unzipWith   = require('lodash/unzipWith'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * This method is like `unzip` except that it accepts `iteratee` to specify how regrouped values should be combined.
 * The `iteratee` is invoked with the elements of each group: (`...group`).
 *
 * ```js
 * let zipped = XP.zip([1, 2], [10, 20], [100, 200]);
 * // => [[1, 10, 100], [2, 20, 200]]
 *
 * XP.unzipWith(zipped, (a, b) => a + b);
 * // => [3, 30, 300]
 * ```
 *
 * @function unzipWith
 * @since 1.0.0
 * @category array
 * @description This method is like `unzip` except that it accepts `iteratee` to specify how regrouped values should be combined
 * @source https://github.com/expandjs/expandjs/blog/master/lib/unzipWith.js
 *
 * @param {Array} array The target array
 * @param {Function} iteratee The function to combine regrouped values
 * @returns {Array} Returns the new array of regrouped elements
 */
module.exports = function unzipWith(array, iteratee) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _unzipWith(array, iteratee);
};
