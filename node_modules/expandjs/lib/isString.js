/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isString = require('lodash/isString'),
    isVoid      = require('./isVoid'),
    xnor        = require('./xnor');

/**
 * Checks if `value` is a `string`.
 *
 * ```js
 * XP.isString('abc');
 * // => true
 *
 * XP.isString(0);
 * // => false
 * ```
 *
 * @function isString
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isString.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isString(value, notEmpty) {

    // Returning
    return _isString(value) && (_isString(notEmpty) ? value.includes(notEmpty) : isVoid(notEmpty) || xnor(value.length, notEmpty));
};
