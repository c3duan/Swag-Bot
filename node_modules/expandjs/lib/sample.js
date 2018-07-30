/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _sample      = require('lodash/sample'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Returns a random element from `array`.
 *
 * ```js
 * XP.sample([1, 2, 3, 4]);
 * // => 2
 * ```
 *
 * @function sample
 * @since 1.0.0
 * @category array
 * @description Returns a random element from `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/sample.js
 *
 * @param {Array} array The target array
 * @returns {*} Returns a random element
 */
module.exports = function sample(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _sample(array);
};
