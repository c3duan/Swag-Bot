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
 * Returns the immediate right sibling of the first occurrence of `value` in `array`.
 *
 * ```js
 * XP.getNext([1, 2, 3, 4, 5], 3);
 * // => 4
 *
 * XP.getNext([1, 2, 3, 4, 5], 5);
 * // => undefined
 * ```
 *
 * @function getNext
 * @since 1.0.0
 * @category array
 * @description Returns the immediate right sibling of the first occurrence of `value` in `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getNext.js
 *
 * @param {Array} array The target array
 * @param {*} value The value to be found
 * @returns {*} Returns the immediate right sibling
 */
module.exports = function getNext(array, value) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Let
    let i = array.indexOf(value);

    // Returning
    return i >= 0 ? array[i + 1] : undefined;
};
