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
 * Returns all the siblings of the first occurrence of `value` in `array`.
 *
 * ```js
 * XP.getAllSiblings([1, 2, 3, 4, 5], 3);
 * // => [1, 2, 4, 5]
 *
 * XP.getAllSiblings([1, 2, 3, 4, 5], 6);
 * // => []
 * ```
 *
 * @function getAllSiblings
 * @since 1.0.0
 * @category array
 * @description Returns all the siblings of the first occurrence of `value` in `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getAllSiblings.js
 *
 * @param {Array} array The target array
 * @param {*} value The value to be found
 * @returns {Array} Returns the array of siblings
 */
module.exports = function getAllSiblings(array, value) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Let
    let i = array.indexOf(value);

    // Returning
    return i >= 0 ? array.slice(0, i).concat(array.slice(i + 1)) : [];
};
