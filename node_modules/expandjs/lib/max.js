/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _max         = require('lodash/max'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Returns the maximum value of `array`.
 * If `array` is empty or falsy, `undefined` is returned.
 *
 * ```js
 * XP.max([4, 2, 8, 6]);
 // => 8
 *
 * XP.max([]);
 * // => undefined
 * ```
 *
 * @function max
 * @since 1.0.0
 * @category array
 * @description Returns the maximum value of `array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/max.js
 *
 * @param {Array} array The target array
 * @returns {*} Returns the maximum value
 */
module.exports = function max(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _max(array);
};
