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
 * Returns `array` with each instance of `target` replaced by `value`.
 *
 * ```js
 * XP.replace(['barney', 'fred'], 'fred', 'tom');
 * // => ['barney', 'tom']
 * ```
 *
 * @function replace
 * @since 1.0.0
 * @category array
 * @description Returns `array` with each instance of `target` replaced by `value`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/replace.js
 *
 * @param {Array} array The target array
 * @param {*} target The value that will be replaced
 * @param {*} value The value that will replace
 * @returns {Array} Returns the new array with replaced values
 */
module.exports = function replace(array, target, value) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return array.reduce((array, val, i) => { if (val === target) { array[i] = value; } return array; }, array);
};
