/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _locales = require('./locales'),
    isString   = require('./isString');

/**
 * Checks if `value` is an ISO 639-1 `string`.
 *
 * ```js
 * XP.isLanguage('en');
 * // => true
 *
 * XP.isLanguage('xx');
 * // => false
 *
 * XP.isLanguage('en_US');
 * // => false
 * ```
 *
 * @function isLanguage
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an ISO 639-1 `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isLanguage.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isLanguage(value) {

    // Returning
    return isString(value) && Boolean(_locales[value]);
};
