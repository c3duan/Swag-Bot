/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    toArray          = require('./toArray');

/**
 * Returns the immediate siblings of the first occurrence of `value` in `array`.
 *
 * ```js
 * XP.getSiblings([1, 2, 3, 4, 5], 3);
 * // => [2, 4]
 *
 * XP.getSiblings([1, 2, 3, 4, 5], 5);
 * // => [4]
 *
 * XP.getSiblings([1, 2, 3, 4, 5], 6);
 * // => []
 * ```
 *
 * @function getSiblings
 * @since 1.0.0
 * @category array
 * @description Returns the immediate siblings of the first occurrence of `value` in `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getSiblings.js
 *
 * @param {Array} array The target array
 * @param {*} value The value to be found
 * @returns {Array} Returns the array of immediate siblings
 */
module.exports = function getSiblings(array, value) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Let
    let i = array.indexOf(value), result = [];

    // Pushing
    if (i > 0) { result.push(array[i - 1]); }
    if (i < array.length - 1 && i >= 0) { result.push(array[i + 1]); }

    // Returning
    return result;
};
