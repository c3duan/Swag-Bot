/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isDate = require('lodash/isDate'),
    isNaN     = require('./isNaN');

/**
 * Checks if `value` is an instance of `Date` and is a valid one.
 *
 * ```js
 * XP.isDate(new Date());
 * // => true
 *
 * XP.isDate('Mon April 23 2012');
 * // => false
 * ```
 *
 * @function isDate
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an instance of `Date` and is a valid one
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isDate.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isDate(value) {

    // Returning
    return _isDate(value) && !isNaN(value.getTime());
};
