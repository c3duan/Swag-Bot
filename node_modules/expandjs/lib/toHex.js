/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isIndex = require('./isIndex');

/**
 * Returns an hexadecimal `string` representation of `target`.
 *
 * ```js
 * XP.toHex(2748)
 * // => 'ABC'
 *
 * XP.toHex('2748')
 * // => undefined
 * ```
 *
 * @function toHex
 * @since 1.0.0
 * @category caster
 * @description Returns an hexadecimal `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toHex.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toHex(target) {

    // Returning
    if (isIndex(target)) { return target.toString(16).toUpperCase(); }
};
