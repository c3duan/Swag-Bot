/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isArray   = require('./isArray'),
    isArrayLike = require('./isArrayLike');

/**
 * Returns an `Array` representation of `target`.
 *
 * ```js
 * XP.toArray(arguments);
 * // => XP.slice(arguments)
 *
 * XP.toArray([1, 2, 3]);
 * // => [1, 2, 3]
 *
 * XP.toArray(1, 2, 3);
 * // => undefined
 * ```
 *
 * @function toArray
 * @since 1.0.0
 * @category caster
 * @description Returns an `Array` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toArray.js
 *
 * @param {*} target The target value
 * @returns {Array} Returns the casted value
 */
module.exports = function toArray(target) {

    // Returning
    if (isArray(target)) { return target; }
    if (isArrayLike(target)) { return Array.from(target); }
};
