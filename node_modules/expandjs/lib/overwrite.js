/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArray          = require('./isArray'),
    isArrayLike      = require('./isArrayLike');

/**
 * Substitutes all items of `array` with ones from `other` and returns the modified `array`.
 * The substitution happens only if necessary.
 *
 * ```js
 * XP.overwrite([1, 2, 3], ['one', 'two', 'three']);
 * // => ['one', 'two', 'three']
 * ```
 *
 * @function overwrite
 * @since 1.0.0
 * @category array
 * @description Substitutes all items of `array` with ones from `other` and returns the modified `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/overwrite.js
 *
 * @param {Array} array The target array
 * @param {Array} other The source array
 * @returns {Array} Returns `array`
 */
module.exports = function overwrite(array, other) {

    // Asserting
    assertArgument(isArray(array), 1, 'Array');
    assertArgument(isArrayLike(other), 2, 'ArrayLike');

    // Let
    let differs = array.length !== other.length || array.some((val, i) => val !== other[i]);

    // Splicing
    if (differs) { array.splice(...[0, array.length].concat(other)); }

    // Returning
    return array;
};
