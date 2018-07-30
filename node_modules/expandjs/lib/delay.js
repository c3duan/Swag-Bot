/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _defer       = require('lodash/defer'),
    _delay         = require('lodash/delay'),
    assertArgument = require('./assertArgument'),
    isVoid         = require('./isVoid'),
    isFunction     = require('./isFunction'),
    isIndex        = require('./isIndex');

/**
 * Invokes `func` after `wait` milliseconds.
 *
 * A 3rd parameter can be provided to use ticks instead of milliseconds.
 *
 * ```js
 * XP.delay(() => console.log('later'));
 * // logs 'later' on the next tick
 *
 * XP.delay(() => console.log('later'), 1000);
 * // logs 'later' after one second
 *
 * XP.delay(() => console.log('later'), 2, true);
 * // logs 'later' after two ticks
 * ```
 *
 * @function delay
 * @since 1.0.0
 * @category function
 * @description Invokes `func` after `wait` milliseconds
 * @source https://github.com/expandjs/expandjs/blog/master/lib/delay.js
 *
 * @param {Function} func The target function
 * @param {number} [wait = 0] The number of milliseconds to delay invocation
 * @param {boolean} [ticks = false] Specifies if should be wait for ticks instead of milliseconds
 * @returns {number} Returns the timer id
 */
module.exports = function delay(func, wait, ticks) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');
    assertArgument(isVoid(wait) || isIndex(wait), 2, 'number');

    // Delaying
    if (wait > 0 && !ticks) { return _delay(func, wait); }

    // Returning
    return _defer(() => wait > 1 ? delay(func, wait - 1, ticks) : func());
};
