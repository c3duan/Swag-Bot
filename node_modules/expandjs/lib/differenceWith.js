/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _differenceWith = require('lodash/differenceWith'),
    assertArgument    = require('./assertArgument'),
    isArrayLike       = require('./isArrayLike'),
    isFunction        = require('./isFunction'),
    toArray           = require('./toArray');

/**
 * This method is like `difference` except that it accepts `comparator` which is invoked to compare elements of `array` to `values`.
 * The order and references of result values are determined by the first `array`.
 * The `comparator` is invoked with two arguments: (`arrVal`, `othVal`).
 *
 * ```js
 * let objects = [{x: 1, y: 2}, {x: 2, y: 1}],
 *     others  = [{x: 1, y: 1}, {x: 1, y: 2}];
 *
 * XP.differenceWith(objects, others, XP.isEqual);
 * // => [{x: 2, y: 1}]
 * ```
 *
 * @function differenceWith
 * @since 1.0.0
 * @category array
 * @description This method is like `difference` except that it accepts `comparator` which is invoked to compare elements of `array` to `values`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/differenceWith.js
 *
 * @param {Array} array The target array
 * @param {...Array} [values] The arrays of values to exclude
 * @param {Function} [comparator] The comparator invoked per element
 * @returns {Array} Returns the new array of filtered values
 */
module.exports = function difference(array, ...values) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Let
    let last = values[values.length - 1];

    // Returning
    return _differenceWith(array, ...values.filter(value => isArrayLike(value)).concat(isFunction(last) ? [last] : []));
};
