/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const capitalizeRegex = require('./capitalizeRegex'),
    isString          = require('./isString'),
    isVoid            = require('./isVoid'),
    xnor              = require('./xnor');

/**
 * Checks if `value` is a capitalized `string`.
 *
 * ```js
 * XP.isCapitalize('Hello world');
 * // => true
 *
 * XP.isCapitalize('helloWorld');
 * // => false
 * ```
 *
 * @function isCapitalize
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a capitalized `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isCapitalize.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isCapitalize(value, notEmpty) {

    // Returning
    return isString(value) && capitalizeRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
