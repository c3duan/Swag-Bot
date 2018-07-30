/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _unzip       = require('lodash/unzip'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * This method is like `zip` except that it accepts an array of grouped elements
 * and returns an array regrouping the elements to their pre-zip configuration.
 *
 * ```js
 * let zipped = XP.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * XP.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 * ```
 *
 * @function unzip
 * @since 1.0.0
 * @category array
 * @description This method is like `zip` except that it accepts an array of grouped elements and returns an array regrouping the elements to their pre-zip configuration
 * @source https://github.com/expandjs/expandjs/blog/master/lib/unzip.js
 *
 * @param {Array} array The target array
 * @returns {Array} Returns the new array of regrouped elements
 */
module.exports = function unzip(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _unzip(array);
};
