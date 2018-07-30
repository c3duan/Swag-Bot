/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isIndex          = require('./isIndex'),
    toArray          = require('./toArray');

/**
 * Returns a new array, shrunk or stretched according to the provided `size`.
 *
 * ```js
 * XP.fit([1, 2, 3], 4);
 * // => [1, 2, 3, undefined]
 *
 * XP.fit([1, 2, 3], 4, 4);
 * // => [1, 2, 3, 4]
 *
 * XP.fit([1, 2, 3], 2);
 * // => [1, 2]
 * ```
 *
 * @function fit
 * @since 1.0.0
 * @category array
 * @description Returns a new array, shrunk or stretched according to the provided `size`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/fit.js
 *
 * @param {Array} array The target array
 * @param {number} size The desired length for the new array
 * @param {*} [filler] The value to push in the new array
 * @returns {Array} Returns the fitted array
 */
module.exports = function fit(array, size, filler) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');
    assertArgument(isIndex(size), 2, 'number');

    // Returning
    return array.length < size ? array.concat(new Array(size - array.length).fill(filler)) : array.slice(0, size);
};
