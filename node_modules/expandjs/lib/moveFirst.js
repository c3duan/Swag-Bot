/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArray          = require('./isArray'),
    isInt            = require('./isInt'),
    isVoid           = require('./isVoid');

/**
 * Moves one or more elements to the beginning of `array` and returns the modified `array`.
 *
 * ```js
 * let array = [1, 2, 3, 4, 5];
 *
 * XP.moveFirst(array, 2);
 * // => [3, 1, 2, 4, 5];
 *
 * console.log(array);
 * // => [3, 1, 2, 4, 5]
 *
 * XP.moveFirst(array, 2, 3);
 * // => [2, 4, 5, 3, 1]
 * ```
 *
 * @function moveFirst
 * @since 1.0.0
 * @category array
 * @description Moves one or more elements to the beginning of `array` and returns the modified `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/moveFirst.js
 *
 * @param {Array} array The target array
 * @param {number} start The start position
 * @param {number} [howMany = 1] The number of items to be moved
 * @returns {Array} Returns `array`
 */
module.exports = function moveFirst(array, start, howMany) {

    // Asserting
    assertArgument(isArray(array), 1, 'ArrayLike');
    assertArgument(isInt(start), 2, 'number');
    assertArgument(isVoid(howMany) || isInt(howMany, true), 3, 'number');

    // Shifting
    if (start >= 0) { array.unshift(...array.splice(start, howMany || 1)); }

    // Returning
    return array;
};
