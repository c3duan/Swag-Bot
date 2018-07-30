/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _locales = require('./locales'),
    isArray    = require('./isArray'),
    isLanguage = require('./isLanguage'),
    isLocale   = require('./isLocale'),
    isString   = require('./isString');

/**
 * Returns a regional locale `string` representation of `target`.
 *
 * ```js
 * XP.toLocale('en');
 * // => 'en_US'
 *
 * XP.toLocale('en_US');
 * // => 'en_US'
 *
 * XP.toLocale('xx');
 * // => undefined
 * ```
 *
 * @function toLocale
 * @since 1.0.0
 * @category caster
 * @description Returns a regional locale `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toLocale.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toLocale(target) {

    // Overriding
    if (isString(target)) { target = target.replace(/-/g, '_').split('_'); }
    if (isArray(target) && target[1]) { target[1] = target[1].toUpperCase(); }
    if (isArray(target)) { target = target.join('_'); }

    // Returning
    if (isLanguage(target)) { return _locales[target]; }
    if (isLocale(target)) { return target; }
};
