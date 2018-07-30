/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isUseful = require('./isUseful');

/**
 * Returns a `boolean` representation of `target`.
 *
 * A 2nd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toBoolean(false)
 * // => false
 *
 * XP.toBoolean('false')
 * // => false
 *
 * XP.toBoolean('false', true)
 * // => false
 *
 * XP.toBoolean(0)
 * // => false
 *
 * XP.toBoolean('0')
 * // => false
 *
 * XP.toBoolean('0', true)
 * // => undefined
 * ```
 *
 * @function toBoolean
 * @since 1.0.0
 * @category caster
 * @description Returns a `boolean` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toBoolean.js
 *
 * @param {*} target The target value
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {boolean} Returns the casted value
 */
module.exports = function toBoolean(target, strict) {

    // Returning
    if (target === 'true' || target === true) { return true; }
    if (target === 'false' || target === false) { return false; }
    if (!strict) { return isUseful(target) && target !== '0'; }
};
