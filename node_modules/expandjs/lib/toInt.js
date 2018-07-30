/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDefined = require('./isDefined'),
    toFinite    = require('./toFinite');

/**
 * Returns an integer `number` representation of `target`.
 *
 * A 2nd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toInt('1')
 * // => 1
 *
 * XP.toInt('1b')
 * // => 1
 *
 * XP.toInt('1b', true)
 * // => undefined
 *
 * XP.toInt('1.5')
 * // => 1
 * ```
 *
 * @function toInt
 * @since 1.0.0
 * @category caster
 * @description Returns an integer `number` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toInt.js
 *
 * @param {*} target The target value
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {number} Returns the casted value
 */
module.exports = function toInt(target, strict) {

    // Let
    let result = toFinite(target, strict);

    // Returning
    if (isDefined(result)) { return Math.floor(result); }
};
