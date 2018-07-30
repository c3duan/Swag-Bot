/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isSymbol = require('lodash/isSymbol');

/**
 * Checks if `value` is a `Symbol`.
 *
 * ```js
 * XP.isSymbol(Symbol('abc'));
 * // => true
 *
 * XP.isSymbol('abc');
 * // => false
 * ```
 *
 * @function isSymbol
 * @since 1.2.0
 * @category tester
 * @description Checks if `value` is a `Symbol`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isSymbol.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isSymbol(value) {

    // Returning
    return _isSymbol(value);
};
