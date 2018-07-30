/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _debounce    = require('lodash/debounce'),
    assertArgument = require('./assertArgument'),
    isVoid         = require('./isVoid'),
    isFunction     = require('./isFunction'),
    isIndex        = require('./isIndex'),
    isObject       = require('./isObject');

/**
 * Returns a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.
 * The debounced function comes with a cancel method to cancel delayed `func` invocations and a flush method to immediately invoke them.
 * Provide options to indicate whether `func` should be invoked on the leading and/or trailing edge of the `wait` timeout.
 * The `func` is invoked with the last `arguments` provided to the debounced function.
 * Subsequent calls to the debounced function return the result of the `last` func invocation.
 *
 * ```js
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', XP.debounce(calculateLayout, 150));
 *
 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
 * jQuery(element).on('click', XP.debounce(sendMail, 300, {leading: true, trailing: false}));
 * ```
 *
 * @function debounce
 * @since 1.0.0
 * @category function
 * @description Returns a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked
 * @source https://github.com/expandjs/expandjs/blog/master/lib/debounce.js
 *
 * @param {Function} func The target function
 * @param {number} [wait = 0] The number of milliseconds to delay
 * @param {Object} [opt] The options object
 *   @param {boolean} [opt.leading = false] Specify invoking on the leading edge of the timeout
 *   @param {number} [opt.maxWait] The maximum time `func` is allowed to be delayed before it is invoked
 *   @param {boolean} [opt.trailing = true] Specify invoking on the trailing edge of the timeout
 * @returns {Function} Returns the new debounced function
 */
module.exports = function debounce(func, wait, opt) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');
    assertArgument(isVoid(wait) || isIndex(wait), 2, 'number');
    assertArgument(isVoid(opt) || isObject(opt), 3, 'Object');

    // Returning
    return _debounce(func, wait, opt);
};
