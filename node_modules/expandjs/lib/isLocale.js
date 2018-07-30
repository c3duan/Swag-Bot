/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _languages = require('./languages'),
    isString     = require('./isString');

/**
 * Checks if `value` is a regional locale `string`.
 *
 * ```js
 * XP.isLocale('en_US');
 * // => true
 *
 * XP.isLocale('xx_XX');
 * // => false
 *
 * XP.isLocale('en');
 * // => false
 * ```
 *
 * @function isLocale
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a regional locale `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isLocale.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isLocale(value) {

    // Returning
    return isString(value) && Boolean(_languages[value]);
};
