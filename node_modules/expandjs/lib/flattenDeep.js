/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _flattenDeep = require('lodash/flattenDeep'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Recursively flattens array.
 *
 * ```js
 * XP.flattenDeep([1, [2, 3, [4]]]);
 * // => [1, 2, 3, 4];
 * ```
 *
 * @function flattenDeep
 * @since 1.0.0
 * @category array
 * @description Recursively flattens array
 * @source https://github.com/expandjs/expandjs/blog/master/lib/flattenDeep.js
 *
 * @param {Array} array The target array
 * @returns {Array} Returns the new flattened array
 */
module.exports = function flattenDeep(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _flattenDeep(array);
};
