/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isIndex = require('./isIndex');

/**
 * Returns a position `string` representation of `target`.
 *
 * ```js
 * XP.toPosition(1)
 * // => '1st'
 *
 * XP.toPosition(2)
 * // => '2nd'
 *
 * XP.toPosition(3)
 * // => '3rd'
 *
 * XP.toPosition(4)
 * // => '4th'
 * ```
 *
 * @function toPosition
 * @since 1.0.0
 * @category caster
 * @description Returns a position `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toPosition.js
 *
 * @param {number} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toPosition(target) {

    // Let
    let result = isIndex(target) ? target.toString() : '',
        end    = result[result.length - 1];

    // Returning
    if (end === '1' && target !== 11) { return `${result}st`; }
    if (end === '2' && target !== 12) { return `${result}nd`; }
    if (end === '3' && target !== 13) { return `${result}rd`; }
    if (result) { return `${result}th`; }
};
