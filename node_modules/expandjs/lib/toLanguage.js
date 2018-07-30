/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _languages = require('./languages'),
    isArray      = require('./isArray'),
    isLanguage   = require('./isLanguage'),
    isLocale     = require('./isLocale'),
    isString     = require('./isString');

/**
 * Returns an ISO 639-1 `string` representation of `target`.
 *
 * ```js
 * XP.toLanguage('en');
 * // => 'en'
 *
 * XP.toLanguage('en_US');
 * // => 'en'
 *
 * XP.toLanguage('xx_XX');
 * // => undefined
 * ```
 *
 * @function toLanguage
 * @since 1.0.0
 * @category caster
 * @description Returns an ISO 639-1 `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toLanguage.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toLanguage(target) {

    // Overriding
    if (isString(target)) { target = target.replace(/-/g, '_'); }
    if (isArray(target) && target[1]) { target[1] = target[1].toUpperCase(); }
    if (isArray(target)) { target = target.join('_'); }

    // Returning
    if (isLocale(target)) { return _languages[target]; }
    if (isLanguage(target)) { return target; }
};
