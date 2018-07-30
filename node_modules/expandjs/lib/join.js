/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArrayLike      = require('./isArrayLike'),
    isInput          = require('./isInput'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns a string with the `array` parts joined, based on `separator`.
 *
 * ```js
 * ['a', '', 'b'].join(', ')
 * // => 'a, , b'
 *
 * XP.join('a', '', 'b', ', ')
 * // => 'a, b'
 * ```
 *
 * @function join
 * @since 1.2.0
 * @category array
 * @description Returns a string with the `array` parts joined, based on `separator`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/join.js
 *
 * @param {Array} [array] The target array
 * @param {string} [separator = ""] The string to put between parts
 * @returns {string} Returns a string with the `array` parts joined
 */
module.exports = function split(array, separator) {

    // Asserting
    assertArgument(isVoid(array) || isArrayLike(array), 1, 'array');
    assertArgument(isVoid(separator) || isString(separator), 2, 'string');

    // Returning
    return Array.from(array || []).filter(val => isInput(val, true)).join(separator);
};
