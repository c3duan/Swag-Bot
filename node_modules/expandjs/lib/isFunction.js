/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isFunction = require('lodash/isFunction'),
    isVoid        = require('./isVoid'),
    xor           = require('./xor');

/**
 * Checks if `value` is a `Function`.
 *
 * ```js
 * XP.isFunction(function () {});
 * // => true
 *
 * XP.isFunction(function () {}.bind({}), true);
 * // => false
 *
 * XP.isFunction({});
 * // => false
 * ```
 *
 * @function isFunction
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `Function`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isFunction.js
 *
 * @param {*} value The target value
 * @param {boolean} [notBound] Specifies if `value` must be not bound
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isFunction(value, notBound) {

    // Returning
    return _isFunction(value) && (isVoid(notBound) || xor(value.name.startsWith('bound '), notBound));
};
