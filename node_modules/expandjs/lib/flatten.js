/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _flatten     = require('lodash/flatten'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Flattens array a single level deep.
 *
 * ```js
 * XP.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 * ```
 *
 * @function flatten
 * @since 1.0.0
 * @category array
 * @description Flattens array a single level deep
 * @source https://github.com/expandjs/expandjs/blog/master/lib/flatten.js
 *
 * @param {Array} array The target array
 * @returns {Array} Returns the new flattened array
 */
module.exports = function flatten(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _flatten(array);
};
