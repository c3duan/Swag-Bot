/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString = require('./isString'),
    isVoid     = require('./isVoid'),
    uuidRegex  = require('./uuidRegex'),
    xnor       = require('./xnor');

/**
 * Checks if `value` is an uuid `string`.
 *
 * ```js
 * XP.isUUID('de305d54-75b4-431b-adb2-eb6b9e546014');
 * // => true
 *
 * XP.isUUID('de305d5475b4431badb2eb6b9e546014');
 * // => false
 * ```
 *
 * @function isUUID
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an uuid `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isUUID.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isUUID(value, notEmpty) {

    // Returning
    return isString(value) && uuidRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
