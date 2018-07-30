/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const ArgumentError = require('./ArgumentError');

/**
 * Throws an ArgumentError if `value` is falsy.
 *
 * ```js
 * let a = 1;
 *
 * XP.assertArgument(a > 0, 1, 'greater than 0');
 * // => undefined
 *
 * XP.assertArgument(a < 0, 1, 'lower than 0');
 * // => ArgumentError: 1st argument must be must be lower than 0
 * ```
 *
 * @function assertArgument
 * @since 1.0.0
 * @category assert
 * @description Throws an ArgumentError if `value` is falsy
 * @source https://github.com/expandjs/expandjs/blog/master/lib/assertArgument.js
 *
 * @param {*} value The value to be checked
 * @param {number} position The argument's position
 * @param {string} type The argument's type
 */
module.exports = function assertArgument(value, position, type) {

    // Throwing
    if (!value) { throw new ArgumentError(position, type); }
};
