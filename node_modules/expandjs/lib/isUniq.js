/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isArray = require('./isArray'),
    isVoid    = require('./isVoid'),
    uniq      = require('./uniq'),
    xnor      = require('./xnor');

/**
 * Checks if `value` is a duplicate-free `Array`.
 *
 * ```js
 * XP.isUniq([0, 1, 2, 3]);
 * // => true
 *
 * XP.isUniq([1, 1, 2, 3]);
 * // => false
 *
 * XP.isUniq([], true);
 * // => false
 * ```
 *
 * @function isUniq
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a duplicate-free `Array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isUniq.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isUniq(value, notEmpty) {

    // Returning
    return isArray(value) && value.length === uniq(value).length && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
