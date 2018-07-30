/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _pullAt      = require('lodash/pullAt'),
    assertArgument = require('./assertArgument'),
    isArray        = require('./isArray'),
    isIndex        = require('./isIndex');

/**
 * Removes an element from `array` corresponding to `index` and returns the removed element.
 *
 * ```js
 * let array = [1, 2, 3, 4, 5];
 *
 * XP.pullAt(array, 2);
 * // => 3
 *
 * console.log(array);
 * // => [1, 2, 4, 5]
 *
 * XP.pullAt(array, 5);
 * // => undefined
 * ```
 *
 * @function pullAt
 * @since 1.0.0
 * @category array
 * @description Removes an element from `array` corresponding to `index` and returns the removed element
 * @source https://github.com/expandjs/expandjs/blog/master/lib/pullAt.js
 *
 * @param {Array} array The target array
 * @param {number} index The index of the element to remove
 * @returns {*} Returns the removed element
 */
module.exports = function pullAt(array, index) {

    // Asserting
    assertArgument(isArray(array), 1, 'Array');
    assertArgument(isIndex(index), 2, 'number');

    // Returning
    return _pullAt(array, index)[0];
};
