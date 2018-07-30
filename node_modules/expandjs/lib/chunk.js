/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _chunk       = require('lodash/chunk'),
    assertArgument = require('./assertArgument'),
    isIndex        = require('./isIndex'),
    isVoid         = require('./isVoid'),
    toArray        = require('./toArray');

/**
 * Returns an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * ```js
 * XP.chunk([1, 2, 3, 4], 2);
 * // => [[1, 2], [3, 4]]
 *
 * XP.chunk([1, 2, 3, 4], 3);
 * // => [[1, 2, 3], [4]]
 * ```
 *
 * @function chunk
 * @since 1.0.0
 * @category array
 * @description Returns an array of elements split into groups the length of `size`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/chunk.js
 *
 * @param {Array} array The target array
 * @param {number} [size = 1] The length of each chunk
 * @returns {Array} Returns the new array containing chunks
 */
module.exports = function chunk(array, size) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');
    assertArgument(isVoid(size) || isIndex(size), 2, 'number');

    // Returning
    return _chunk(array, size);
};
