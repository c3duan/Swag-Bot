/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString     = require('./isString'),
    isVoid         = require('./isVoid'),
    startCaseRegex = require('./startCaseRegex'),
    xnor           = require('./xnor');

/**
 * Checks if `value` is a start cased `string`.
 *
 * ```js
 * XP.isStartCase('Hello World');
 * // => true
 *
 * XP.isStartCase('Hello world');
 * // => false
 * ```
 *
 * @function isStartCase
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a start cased `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isStartCase.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isStartCase(value, notEmpty) {

    // Returning
    return isString(value) && startCaseRegex.test(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
