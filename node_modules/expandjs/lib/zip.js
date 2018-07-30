/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _zip      = require('lodash/zip'),
    isArrayLike = require('./isArrayLike');

/**
 * Returns an array of grouped elements, the first of which contains the first
 * elements of the given `arrays`, the second of which contains the second
 * elements of the given `arrays`, and so on.
 *
 * ```js
 * XP.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 * ```
 *
 * @function zip
 * @since 1.0.0
 * @category array
 * @description Returns an array of grouped elements, the first of which contains the first elements of the given `arrays`, the second of which contains the second elements of the given `arrays`, and so on
 * @source https://github.com/expandjs/expandjs/blog/master/lib/zip.js
 *
 * @param {...Array} [arrays] The target arrays
 * @returns {Array} Returns the new array of grouped elements
 */
module.exports = function zip(...arrays) {

    // Returning
    return _zip(...arrays.filter(array => isArrayLike(array)));
};
