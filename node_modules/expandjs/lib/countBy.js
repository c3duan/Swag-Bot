/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _countBy     = require('lodash/countBy'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * Returns an object composed of keys generated from the results of running each element of `array` through `iteratee`.
 * The corresponding value of each key is the number of times the key was returned by `iteratee`.
 *
 * ```js
 * XP.countBy([4.3, 6.1, 6.4], Math.floor);
 * // => {'4': 1, '6': 2}
 * ```
 *
 * @function countBy
 * @since 1.0.0
 * @category array
 * @description Returns an object composed of keys generated from the results of running each element of `array` through `iteratee`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/countBy.js
 *
 * @param {Array} array The target array
 * @param {Function} iteratee The function invoked per iteration
 * @returns {Object} Returns the composed aggregate object
 */
module.exports = function countBy(array, iteratee) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'Array');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _countBy(array, iteratee);
};
