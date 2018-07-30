/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDate = require('./isDate'),
    isInput  = require('./isInput');

/**
 * Returns an ISO 8601 `string` representation of `target`.
 *
 * ```js
 * XP.toISODate('2015-12-25')
 * // => '2015-12-25T00:00:00.000Z'
 *
 * XP.toISODate('')
 * // => undefined
 * ```
 *
 * @function toISODate
 * @since 1.0.0
 * @category caster
 * @description Returns an ISO 8601 `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toISODate.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toISODate(target) {

    // Let
    if (isInput(target, true)) { target = new Date(target); }

    // Returning
    if (isDate(target)) { return target.toISOString(); }
};
