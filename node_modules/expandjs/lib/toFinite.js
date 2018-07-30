/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isFinite = require('./isFinite');

/**
 * Returns a finite `number` representation of `target`.
 *
 * A 2nd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toFinite('1')
 * // => 1
 *
 * XP.toFinite('1b', 1)
 * // => 1
 *
 * XP.toFinite('1b', true)
 * // => undefined
 *
 * XP.toFinite('Infinity')
 * // => undefined
 * ```
 *
 * @function toFinite
 * @since 1.0.0
 * @category caster
 * @description Returns a finite `number` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toFinite.js
 *
 * @param {*} target The target value
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {number} Returns the casted value
 */
module.exports = function toFinite(target, strict) {

    // Let
    let result = parseFloat(target);

    // Returning
    if (isFinite(result) && (!strict || result === target * 1)) { return result; }
};
