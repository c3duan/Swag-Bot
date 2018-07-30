/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const ipv4Regex = require('./ipv4Regex'),
    isString    = require('./isString'),
    isVoid      = require('./isVoid'),
    xnor        = require('./xnor');

/**
 * Checks if `value` is an ipv4 `string`.
 *
 * ```js
 * XP.isIPV4('127.0.0.1');
 * //=> true
 *
 * XP.isIPV4('127.0.0.256');
 * //=> false
 * ```
 *
 * @function isIPV4
 * @since 1.1.0
 * @category tester
 * @description Checks if `value` is an ipv4 `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isIPV4.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isIPV4(value, notEmpty) {

    // Returning
    return isString(value) && ipv4Regex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
