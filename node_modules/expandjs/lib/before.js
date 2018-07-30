/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _before      = require('lodash/before'),
    assertArgument = require('./assertArgument'),
    isIndex        = require('./isIndex'),
    isFunction     = require('./isFunction');

/**
 * Returns a function that invokes `func`, with the `this` binding and `arguments` of the created function, while it's called less than `n` times.
 * Subsequent calls to the created function return the result of the last `func` invocation.
 *
 * ```js
 * jQuery(element).on('click', XP.before(5, addContactToList));
 * // => allows adding up to 4 contacts to the list.
 * ```
 *
 * @function before
 * @since 1.0.0
 * @category function
 * @description Returns a function that invokes `func`, with the `this` binding and `arguments` of the created function, while it's called less than `n` times
 * @source https://github.com/expandjs/expandjs/blog/master/lib/before.js
 *
 * @param {number} n The number of calls at which `func` is no longer invoked
 * @param {Function} func The target function
 * @returns {Function} Returns the new restricted function
 */
module.exports = function before(n, func) {

    // Asserting
    assertArgument(isIndex(n), 1, 'number');
    assertArgument(isFunction(func), 2, 'Function');

    // Returning
    return _before(n, func);
};
