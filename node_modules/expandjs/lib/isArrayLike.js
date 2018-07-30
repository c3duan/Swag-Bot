/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isArrayLikeObject = require('lodash/isArrayLikeObject'),
    isVoid               = require('./isVoid'),
    xnor                 = require('./xnor');

/**
 * Checks if `value` is an object that can be casted to `Array`.
 *
 * ```js
 * XP.isArrayLike([1, 2, 3]);
 * // => true
 *
 * XP.isArrayLike(function () { return arguments; }());
 * // => true
 *
 * XP.isArrayLike([], true);
 * // => false
 * ```
 *
 * @function isArrayLike
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an object that can be casted to `Array`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isArrayLike.js
 *
 * @param {*} value The target value
 * @param {boolean} [notEmpty] Specifies if `value` must be not empty
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isArrayLike(value, notEmpty) {

    // Returning
    return _isArrayLikeObject(value) && (isVoid(notEmpty) || xnor(value.length, notEmpty));
};
