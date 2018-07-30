/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString     = require('./isString'),
    isVoid         = require('./isVoid'),
    lowerCaseRegex = require('./lowerCaseRegex'),
    xnor           = require('./xnor');

/**
 * Checks if `value` is a lower cased `string`.
 *
 * ```js
 * XP.isLowerCase('hello world');
 * // => true
 *
 * XP.isLowerCase('Hello world');
 * // => false
 * ```
 *
 * @function isLowerCase
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a lower cased `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isLowerCase.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isLowerCase(value, notEmpty) {

    // Returning
    return isString(value) && lowerCaseRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
