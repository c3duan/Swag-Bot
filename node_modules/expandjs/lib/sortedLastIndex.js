/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _sortedLastIndex = require('lodash/sortedLastIndex'),
    assertArgument     = require('./assertArgument'),
    toArray            = require('./toArray');

/**
 * Uses a binary search to determine the highest index at which `value` should be inserted into `array` in order to maintain its sort order.
 *
 * ```js
 * XP.sortedLastIndex([30, 50], 40);
 // => 1
 * ```
 *
 * @function sortedLastIndex
 * @since 1.0.0
 * @category array
 * @description Uses a binary search to determine the highest index at which `value` should be inserted into `array` in order to maintain its sort order
 * @source https://github.com/expandjs/expandjs/blog/master/lib/sortedLastIndex.js
 *
 * @param {Array} array The target array
 * @param {*} value The value to evaluate
 * @returns {Array} Returns the index at which `value` should be inserted
 */
module.exports = function sortedLastIndex(array, value) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'Array');

    // Returning
    return _sortedLastIndex(array, value);
};
