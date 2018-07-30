/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArray          = require('./isArray');

/**
 * Appends `value` at the end of `array`, if it's not already included, and returns it.
 *
 * ```js
 * let array = [1, 2, 3];
 *
 * XP.append(array, 4);
 * // => 4
 *
 * console.log(array);
 * // => [1, 2, 3, 4]
 *
 * XP.append(array, 1);
 * // => 1
 *
 * console.log(array);
 * // => [1, 2, 3, 4]
 * ```
 *
 * @function append
 * @since 1.0.0
 * @category array
 * @description Appends `value` at the end of `array`, if it's not already included, and returns it
 * @source https://github.com/expandjs/expandjs/blog/master/lib/append.js
 *
 * @param {Array} array The target array
 * @param {*} value The value to be appended
 * @returns {*} Returns `value`
 */
module.exports = function append(array, value) {

    // Asserting
    assertArgument(isArray(array), 1, 'Array');

    // Preventing
    if (array.includes(value)) { return value; }

    // Returning
    return array[array.push(value) - 1];
};
