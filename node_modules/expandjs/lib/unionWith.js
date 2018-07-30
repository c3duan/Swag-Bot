/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _unionWith   = require('lodash/unionWith'),
    assertArgument = require('./assertArgument'),
    isArrayLike    = require('./isArrayLike'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * This method is like `union` except that it accepts `comparator` which is invoked to compare elements of `arrays`.
 * Result values are chosen from the first array in which the value occurs.
 * The `comparator` is invoked with two arguments: (`arrVal`, `othVal`).
 *
 * ```js
 * let objects = [{x: 1, y: 2}, {x: 2, y: 1}],
 *     others  = [{x: 1, y: 1}, {x: 1, y: 2}];
 *
 * XP.unionWith(objects, others, XP.isEqual);
 * // => [{x: 1, y: 2}, {x: 2, y: 1}, {x: 1, y: 1}]
 * ```
 *
 * @function unionWith
 * @since 1.0.0
 * @category array
 * @description This method is like `union` except that it accepts `comparator` which is invoked to compare elements of `arrays`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/unionWith.js
 *
 * @param {Array} array The target array
 * @param {...Array} [arrays] The other arrays
 * @param {Function} [comparator] The comparator invoked per element
 * @returns {Array} Returns the new array of combined values
 */
module.exports = function unionWith(array, ...arrays) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Let
    let last = arrays[arrays.length - 1];

    // Returning
    return _unionWith(array, ...arrays.filter(array => isArrayLike(array)).concat(isFunction(last) ? [last] : []));
};
