/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _difference  = require('lodash/difference'),
    assertArgument = require('./assertArgument'),
    isArrayLike    = require('./isArrayLike'),
    toArray        = require('./toArray');

/**
 * Returns an array excluding all the values found in `values` from `array`, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons.
 *
 * ```js
 * XP.difference([2, 1], [2, 3]);
 * // => [1]
 * ```
 *
 * @function difference
 * @since 1.0.0
 * @category array
 * @description Returns an array excluding all the values found in `values` from `array`, using `SameValueZero` for equality comparisons
 * @source https://github.com/expandjs/expandjs/blog/master/lib/difference.js
 *
 * @param {Array} array The target array
 * @param {...Array} [values] The arrays of values to exclude
 * @returns {Array} Returns the new array of filtered values
 */
module.exports = function difference(array, ...values) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _difference(array, ...values.filter(value => isArrayLike(value)));
};
