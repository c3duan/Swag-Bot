/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isBoolean = require('lodash/isBoolean');

/**
 * Checks if `value` is a `boolean`.
 *
 * ```js
 * XP.isBoolean(false);
 * // => true
 *
 * XP.isBoolean('false');
 * // => false
 * ```
 *
 * @function isBoolean
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `boolean`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isBoolean.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isBoolean(value) {

    // Returning
    return _isBoolean(value);
};
