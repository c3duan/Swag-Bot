/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _uniqWith    = require('lodash/unionWith'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * This method is like `uniq` except that it accepts `comparator` which is invoked to compare elements of `array`.
 * The order of result values is determined by the order they occur in the `array`.
 * The `comparator` is invoked with two arguments: (`arrVal`, `othVal`).
 *
 * ```js
 * let objects = [{x: 1, y: 2}, {x: 2, y: 1}, {x: 1, y: 2}];
 *
 * XP.uniqWith(objects, XP.isEqual);
 * // => [{x: 1, y: 2}, {x: 2, y: 1}]
 * ```
 *
 * @function uniqWith
 * @since 1.0.0
 * @category array
 * @description This method is like `uniq` except that it accepts `comparator` which is invoked to compare elements of `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/uniqWith.js
 *
 * @param {Array} array The target array
 * @param {Function} [comparator] The comparator invoked per element
 * @returns {Array} Returns the new duplicate free array
 */
module.exports = function uniqWith(array, comparator) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _uniqWith(array, comparator);
};
