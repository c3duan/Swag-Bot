/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isUseful = require('./isUseful');

/**
 * Returns a useful representation of `target`.
 *
 * A 2nd parameter can be provided to force a defined representation.
 *
 * ```js
 * XP.toUseful(false);
 * // => false
 *
 * XP.toUseful(0);
 * // => 0
 *
 * XP.toUseful('');
 * // => undefined
 *
 * XP.toUseful(null);
 * // => undefined
 *
 * XP.toUseful(NaN);
 * // => undefined
 *
 * XP.toUseful(NaN, true);
 * // => null
 * ```
 *
 * @function toUseful
 * @since 1.0.0
 * @category caster
 * @description Returns a useful representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toUseful.js
 *
 * @param {*} target The target value
 * @param {boolean} [defined = false] Specifies if the casted value should be forced to defined
 * @returns {*} Returns the casted value
 */
module.exports = function toUseful(target, defined) {

    // Returning
    if (isUseful(target)) { return target; }
    if (defined) { return null; }
};
