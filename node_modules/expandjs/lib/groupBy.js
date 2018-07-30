/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _groupBy     = require('lodash/groupBy'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * Returns an object composed of keys generated from the results of running each element of `array` through `iteratee`.
 * The order of grouped values is determined by the order they occur in `array`.
 * The corresponding value of each key is an array of elements responsible for generating the key.
 *
 * ```js
 * XP.groupBy([6.1, 4.2, 6.3], Math.floor);
 // => {'4': [4.2], '6': [6.1, 6.3]}
 * ```
 *
 * @function groupBy
 * @since 1.0.0
 * @category array
 * @description Returns an object composed of keys generated from the results of running each element of `array` through `iteratee`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/groupBy.js
 *
 * @param {Array} array The target array
 * @param {Function} iteratee The function invoked per iteration
 * @returns {Object} Returns the composed aggregate object
 */
module.exports = function groupBy(array, iteratee) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'Array');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _groupBy(array, iteratee);
};
