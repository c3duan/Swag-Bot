/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const camelCaseRegex = require('./camelCaseRegex'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    xnor             = require('./xnor');

/**
 * Checks if `value` is a camel cased `string`.
 *
 * ```js
 * XP.isCamelCase('helloWorld');
 * // => true
 *
 * XP.isCamelCase('Hello world');
 * // => false
 * ```
 *
 * @function isCamelCase
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a camel cased `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isCamelCase.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isCamelCase(value, notEmpty) {

    // Returning
    return isString(value) && camelCaseRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
