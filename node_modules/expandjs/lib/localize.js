/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isObject         = require('./isObject'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    mapValues        = require('./mapValues'),
    template         = require('./template'),
    toString         = require('./toString');

/**
 * Returns `string` localized, using `i18n` as the localization map.
 *
 * A 3rd parameter can be provided to specify a replacements map.
 *
 * ```js
 * let it_IT = {
 *     hello: 'Ciao ${user}!'
 *     start: 'Inizio',
 *     end:   'Fine'
 * };
 *
 * XP.localize(it_IT, 'hello');
 * // => 'Ciao ${user}!'
 *
 * XP.localize(it_IT, 'hello', {user: 'Mario'});
 * // => 'Ciao Mario!'
 *
 * XP.localize(it_IT, ['start', 'end']);
 * // => ['Inizio', 'Fine']
 *
 * XP.localize(it_IT, {start: '', end: ''});
 * // => {start: 'Inizio', end: 'Fine'}
 * ```
 *
 * @function localize
 * @since 1.0.0
 * @category string
 * @description Returns `string` localized, using `i18n` as the localization map
 * @source https://github.com/expandjs/expandjs/blog/master/lib/localize.js
 *
 * @param {Object} i18n The localization map
 * @param {string} string The target string
 * @param {Object} [replacements] The replacements map
 * @returns {Array | Object | string} Returns the localized entity
 */
module.exports = function localize(i18n, string, replacements) {

    // Asserting
    assertArgument(isVoid(i18n) || isObject(i18n), 1, 'Object');
    assertArgument(isVoid(string) || isString(string), 2, 'string');
    assertArgument(isVoid(replacements) || isObject(replacements), 3, 'Object');

    // Preventing
    if (!i18n || !i18n[string] && i18n[string] !== '') { return string || ''; }

    // Returning
    return template(i18n[string])(mapValues(replacements || {}, value => toString(value)));
};
