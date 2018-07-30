/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isFinite = require('./isFinite'),
    isString   = require('./isString');

/**
 * Checks if `value` is a finite `number` or `string`.
 *
 * ```js
 * XP.isInput('Hello world');
 * // => true
 *
 * XP.isInput(0);
 * // => true
 *
 * XP.isInput(false);
 * // => false
 * ```
 *
 * @function isInput
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a finite `number` or `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isInput.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isInput(value, notEmpty) {

    // Returning
    return isString(value, notEmpty) || isFinite(value);
};
