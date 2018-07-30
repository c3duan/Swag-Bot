/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const kebabCaseRegex = require('./kebabCaseRegex'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    xnor             = require('./xnor');

/**
 * Checks if `value` is a kebab cased `string`.
 *
 * ```js
 * XP.isKebabCase('hello-world');
 * // => true
 *
 * XP.isKebabCase('Hello world');
 * // => false
 * ```
 *
 * @function isKebabCase
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a kebab cased `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isKebabCase.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isKebabCase(value, notEmpty) {

    // Returning
    return isString(value) && kebabCaseRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
