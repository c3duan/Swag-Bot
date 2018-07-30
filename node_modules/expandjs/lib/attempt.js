/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    delay            = require('./delay'),
    isFunction       = require('./isFunction'),
    isVoid           = require('./isVoid');

/**
 * Invokes a `function` within a try-catch block. After that, `callback` is invoked to handle the error.
 *
 * ```js
 * let passed  = false,
 *     oneTime = function () {
 *         if (passed) { throw new Error('Already passed once!'); }
 *         passed = true;
 *     };
 *
 * XP.attempt(oneTime, err => console.log(err || 'Good to go!'));
 * // => 'Good to go!'
 *
 * XP.attempt(oneTime, err => console.log(err || 'Good to go!'));
 * // => Error: Already passed once!
 * ```
 *
 * @function attempt
 * @since 1.0.0
 * @category function
 * @description Invokes a `function` within a try-catch block. After that, `callback` is invoked to handle the error
 * @source https://github.com/expandjs/expandjs/blog/master/lib/attempt.js
 *
 * @param {Function} func The target function
 * @param {Function} [callback] The callback invoked to handle the error
 */
module.exports = function attempt(func, callback) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');
    assertArgument(isVoid(callback) || isFunction(callback), 2, 'Function');

    // Let
    let cb = callback || function () {};

    // Function
    let next = function () { delay(() => cb(...arguments)); };

    // Starting
    try { func(next); } catch (error) { cb(error, null); }
};
