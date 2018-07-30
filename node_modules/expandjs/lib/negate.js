/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _negate      = require('lodash/negate'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction');

/**
 * Returns a function that negates the result of `func`, which is invoked with the `this` binding and `arguments` of the created function.
 *
 * ```js
 * [1, 2, 3, 4, 5, 6].filter(XP.negate(n => n % 2));
 * // => [2, 4, 6]
 * ```
 *
 * @function negate
 * @since 1.0.0
 * @category function
 * @description Returns a function that negates the result of `func`, which is invoked with the `this` binding and `arguments` of the created function
 * @source https://github.com/expandjs/expandjs/blog/master/lib/negate.js
 *
 * @param {Function} func The target function
 * @returns {Function} Returns the new function
 */
module.exports = function negate(func) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');

    // Returning
    return _negate(func);
};
