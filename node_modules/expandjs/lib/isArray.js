/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isArray = require('lodash/isArray'),
    isVoid     = require('./isVoid'),
    xnor       = require('./xnor');

/**
 * Checks if `value` is an instance of `Array`.
 *
 * ```js
 * XP.isArray([1, 2, 3]);
 * // => true
 *
 * XP.isArray([], true);
 * // => false
 *
 * XP.isArray(function () { return arguments; }());
 * // => false
 * ```
 *
 * @function isArray
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an instance of `Array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isArray.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isArray(value, notEmpty) {

    // Returning
    return _isArray(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
