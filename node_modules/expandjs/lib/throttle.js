/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _throttle    = require('lodash/throttle'),
    assertArgument = require('./assertArgument'),
    isVoid         = require('./isVoid'),
    isFunction     = require('./isFunction'),
    isIndex        = require('./isIndex'),
    isObject       = require('./isObject');

/**
 * Returns a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 * The throttled function comes with a cancel method to cancel delayed `func` invocations and a flush method to immediately invoke them.
 * Provide options to indicate whether `func` should be invoked on the leading and/or trailing edge of the `wait` timeout.
 * The `func` is invoked with the last `arguments` provided to the throttled function.
 * Subsequent calls to the throttled function return the result of the last `func` invocation.
 *
 * ```js
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', XP.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * let throttled = XP.throttle(renewToken, 300000, {trailing: false});
 * jQuery(element).on('click', throttled);
 * ```
 *
 * @function throttle
 * @since 1.0.0
 * @category function
 * @description Returns a throttled function that only invokes `func` at most once per every `wait` milliseconds
 * @source https://github.com/expandjs/expandjs/blog/master/lib/throttle.js
 *
 * @param {Function} func The target function
 * @param {number} [wait = 0] The number of milliseconds to throttle invocations to
 * @param {Object} [opt] The options object
 *   @param {boolean} [opt.leading = true] Specify invoking on the leading edge of the timeout
 *   @param {boolean} [opt.trailing = true] Specify invoking on the trailing edge of the timeout
 * @returns {Function} Returns the new throttled function
 */
module.exports = function throttle(func, wait, opt) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');
    assertArgument(isVoid(wait) || isIndex(wait), 2, 'number');
    assertArgument(isVoid(opt) || isObject(opt), 3, 'Object');

    // Returning
    return _throttle(func, wait, opt);
};
