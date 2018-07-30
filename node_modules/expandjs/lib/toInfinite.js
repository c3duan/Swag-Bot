/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const toNumber = require('./toNumber');

/**
 * Returns an `Infinity` representation of `target`.
 *
 * A 2nd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toInfinite('Infinity')
 * // => Infinity
 *
 * XP.toInfinite(-1)
 * // => -Infinity
 *
 * XP.toInfinite(-1, true)
 * // => undefined
 * ```
 *
 * @function toInfinite
 * @since 1.0.0
 * @category caster
 * @description Returns an `Infinity` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toInfinite.js
 *
 * @param {*} target The target value
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {number} Returns the casted value
 */
module.exports = function toInfinite(target, strict) {

    // Returning
    if (target === 'Infinity' || target === Infinity) { return Infinity; }
    if (target === '-Infinity' || target === -Infinity) { return -Infinity; }
    if (!strict && toNumber(target) > 0) { return Infinity; }
    if (!strict && toNumber(target) < 0) { return -Infinity; }
};
