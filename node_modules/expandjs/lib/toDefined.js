/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Returns a defined representation of `target`.
 *
 * ```js
 * XP.toDefined('abc');
 * // => 'abc'
 *
 * XP.toDefined(undefined);
 * // => null
 * ```
 *
 * @function toDefined
 * @since 1.0.0
 * @category caster
 * @description Returns a defined representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toDefined.js
 *
 * @param {*} target The target value
 * @returns {*} Returns the casted value
 */
module.exports = function toDefined(target) {

    // Returning
    return target === undefined ? null : target;
};
