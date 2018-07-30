/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _min         = require('lodash/min'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Returns the minimum value of `array`.
 * If `array` is empty or falsy, `undefined` is returned.
 *
 * ```js
 * XP.min([4, 2, 8, 6]);
 // => 2
 *
 * XP.min([]);
 * // => undefined
 * ```
 *
 * @function min
 * @since 1.0.0
 * @category array
 * @description Returns the minimum value of `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/min.js
 *
 * @param {Array} array The target array
 * @returns {*} Returns the minimum value
 */
module.exports = function min(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _min(array);
};
