/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const toInt = require('./toInt');

/**
 * Returns a not negative integer representation of `target`.

 * A 2nd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toIndex('1')
 * // => 1
 *
 * XP.toIndex('1b')
 * // => 1
 *
 * XP.toIndex('1b', true)
 * // => undefined
 *
 * XP.toIndex('1.5')
 * // => undefined
 * ```
 *
 * @function toIndex
 * @since 1.0.0
 * @category caster
 * @description Returns a not negative integer representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toIndex.js
 *
 * @param {*} target The target value
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {number} Returns the casted value
 */
module.exports = function toIndex(target, strict) {

    // Let
    let result = toInt(target, strict);

    // Returning
    if (result >= 0) { return result; }
};
