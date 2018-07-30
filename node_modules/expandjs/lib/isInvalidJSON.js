/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString = require('./isDefined');

/**
 * Checks if `value` is an invalid JSON string.
 *
 * ```js
 * XP.isInvalidJSON('{"x": }');
 * // => true
 *
 * XP.isInvalidJSON('{"x": 1}');
 * // => false
 * ```
 *
 * @function isInvalidJSON
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an invalid JSON string
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isInvalidJSON.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isInvalidJSON(value) {

    // Returning
    try { if (isString(value, true)) { JSON.parse(value); } return false; } catch (err) { return true; }
};
