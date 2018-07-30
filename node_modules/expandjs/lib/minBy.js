/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _minBy       = require('lodash/minBy'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * This method is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 * The `iteratee` is invoked with one argument: (`value`).
 *
 * ```js
 * let objects = [{n: 1}, {n: 2}];
 *
 * XP.minBy(objects, object => object.n);
 * // => {n: 1}
 * ```
 *
 * @function minBy
 * @since 1.0.0
 * @category array
 * @description This method is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked
 * @source https://github.com/expandjs/expandjs/blog/master/lib/minBy.js
 *
 * @param {Array} array The target array
 * @param {Function} iteratee The iteratee invoked per element
 * @returns {*} Returns the minimum value
 */
module.exports = function minBy(array, iteratee) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _minBy(array, iteratee);
};
