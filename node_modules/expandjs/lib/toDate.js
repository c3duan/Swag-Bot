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
 * Returns a `Date` representation of `target`.
 *
 * ```js
 * XP.toDate('2015-12-25')
 * // => new Date('2015-12-25')
 *
 * XP.toDate('')
 * // => undefined
 * ```
 *
 * @function toDate
 * @since 1.0.0
 * @category caster
 * @description Returns a `Date` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toDate.js
 *
 * @param {*} target The target value
 * @returns {Date} Returns the casted value
 */
module.exports = function toDate(target) {

    // Overriding
    if (isInput(target, true)) { target = new Date(target); }

    // Returning
    if (isDate(target)) { return target; }
};
