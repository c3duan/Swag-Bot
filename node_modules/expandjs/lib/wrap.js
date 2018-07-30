/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _wrap        = require('lodash/wrap'),
    assertArgument = require('./assertArgument'),
    isVoid         = require('./isVoid'),
    isFunction     = require('./isFunction');

/**
 * Returns a function that provides value to `wrapper` as its first argument.
 * Any additional arguments provided to the function are appended to those provided to the `wrapper`.
 * The `wrapper` is invoked with the this binding of the created function.
 *
 * ```js
 * let p = XP.wrap(XP.escape, (func, text) => `${<p>}func(text)${</p>}`);
 *
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 * ```
 *
 * @function wrap
 * @since 1.0.0
 * @category function
 * @description Returns a function that provides value to `wrapper` as its first argument
 * @source https://github.com/expandjs/expandjs/blog/master/lib/wrap.js
 *
 * @param {Function} func The target function
 * @param {Function} wrapper The wrapper function
 * @returns {Function} Returns the new function
 */
module.exports = function wrap(func, wrapper) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');
    assertArgument(isVoid(wrapper) || isFunction(wrapper), 2, 'Function');

    // Returning
    return _wrap(func, wrapper);
};
