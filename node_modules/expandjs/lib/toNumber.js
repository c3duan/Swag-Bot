/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isNumber = require('./isNumber');

/**
 * Returns a `number` representation of `target`.
 *
 * A 2nd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toNumber('1')
 * // => 1
 *
 * XP.toNumber('1b')
 * // => 1
 *
 * XP.toNumber('1b', true)
 * // => undefined
 *
 * XP.toNumber('Infinity')
 * // => Infinity
 * ```
 *
 * @function toNumber
 * @since 1.0.0
 * @category caster
 * @description Returns a `number` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toNumber.js
 *
 * @param {*} target The target value
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {number} Returns the casted value
 */
module.exports = function toNumber(target, strict) {

    // Let
    let result = parseFloat(target);

    // Returning
    if (isNumber(result) && (!strict || result === target * 1)) { return result; }
};
