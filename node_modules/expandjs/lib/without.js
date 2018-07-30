/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _without     = require('lodash/without'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Returns an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons.
 *
 * ```js
 * XP.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 * ```
 *
 * @function without
 * @since 1.0.0
 * @category array
 * @description Returns an array excluding all given values using `SameValueZero` for equality comparisons
 * @source https://github.com/expandjs/expandjs/blog/master/lib/without.js
 *
 * @param {Array} array The target array
 * @param {...*} [values] The values to exclude
 * @returns {Array} Returns the new array of filtered values
 */
module.exports = function without(array, ...values) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _without(array, ...values);
};
