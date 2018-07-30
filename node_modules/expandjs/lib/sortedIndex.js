/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _sortedIndex = require('lodash/sortedIndex'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Uses a binary search to determine the lowest index at which `value` should be inserted into `array` in order to maintain its sort order.
 *
 * ```js
 * XP.sortedIndex([30, 50], 40);
 // => 1
 * ```
 *
 * @function sortedIndex
 * @since 1.0.0
 * @category array
 * @description Uses a binary search to determine the lowest index at which `value` should be inserted into `array` in order to maintain its sort order
 * @source https://github.com/expandjs/expandjs/blog/master/lib/sortedIndex.js
 *
 * @param {Array} array The target array
 * @param {*} value The value to evaluate
 * @returns {Array} Returns the index at which `value` should be inserted
 */
module.exports = function sortedIndex(array, value) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'Array');

    // Returning
    return _sortedIndex(array, value);
};
