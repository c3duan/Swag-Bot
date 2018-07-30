/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const hexRegex = require('./hexRegex'),
    isString   = require('./isString'),
    isVoid     = require('./isVoid'),
    xnor       = require('./xnor');

/**
 * Checks if `value` is an hexadecimal `string`.
 *
 * ```js
 * XP.isHex('FF3300');
 * //=> true
 *
 * XP.isHex('test');
 * //=> false
 * ```
 *
 * @function isHex
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an hexadecimal `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isHex.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isHex(value, notEmpty) {

    // Returning
    return isString(value) && hexRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
