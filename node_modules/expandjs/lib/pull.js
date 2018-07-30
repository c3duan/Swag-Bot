/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _pull        = require('lodash/pull'),
    assertArgument = require('./assertArgument'),
    isArray        = require('./isArray');

/**
 * Returns `array` without all given `values`, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons.
 *
 * ```js
 * let array = [1, 2, 3, 2, 5];
 *
 * XP.pull(array, 2);
 * // => [1, 3, 5]
 *
 * console.log(array);
 * // => [1, 3, 5];
 * ```
 *
 * @function pull
 * @since 1.0.0
 * @category array
 * @description Returns `array` without all given `values`, using `SameValueZero` for equality comparisons
 * @source https://github.com/expandjs/expandjs/blog/master/lib/pull.js
 *
 * @param {Array} array The target array
 * @param {...*} [values] The values to remove
 * @returns {Array} Returns `array` without all given `values`
 */
module.exports = function pull(array, ...values) {

    // Asserting
    assertArgument(isArray(array), 1, 'Array');

    // Returning
    return _pull(array, ...values);
};
