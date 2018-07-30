/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _union       = require('lodash/union'),
    assertArgument = require('./assertArgument'),
    isArrayLike    = require('./isArrayLike'),
    toArray        = require('./toArray');

/**
 * Returns an array of unique values, in order, from all given `arrays` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons.
 *
 * ```js
 * XP.union([2], [1, 2]);
 * // => [2, 1]
 * ```
 *
 * @function union
 * @since 1.0.0
 * @category array
 * @description Returns an array of unique values, in order, from all given `arrays` using `SameValueZero` for equality comparisons
 * @source https://github.com/expandjs/expandjs/blog/master/lib/union.js
 *
 * @param {Array} array The target array
 * @param {...Array} [arrays] The other arrays
 * @returns {Array} Returns the new array of combined values
 */
module.exports = function union(array, ...arrays) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _union(array, ...arrays.filter(array => isArrayLike(array)));
};
