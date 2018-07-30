/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArrayLike      = require('./isArrayLike'),
    isFunction       = require('./isFunction'),
    isVoid           = require('./isVoid');

/**
 * Invokes the provided `funcs` in series, each passing their results to the next.
 * However, if any of the functions pass an error to its callback, the next function is not executed and the main callback is immediately called with the error.
 *
 * ```js
 * XP.waterfall([
 *     next => setTimeout(() => next(null, console.log('1st'), 32),
 *     next => setTimeout(() => next(null, console.log('2nd'), 16),
 *     next => setTimeout(() => next(null, console.log('3rd'), 24)
 * ], () => console.log('Done!'));
 * // => '1st'
 * // => '2nd'
 * // => '3rd'
 * // => 'Done!'
 * ```
 *
 * @function waterfall
 * @since 1.0.0
 * @category function
 * @description Invokes the provided `funcs` in series, each passing their results to the next
 * @source https://github.com/expandjs/expandjs/blog/master/lib/waterfall.js
 *
 * @param {Array} funcs The target functions
 * @param {Function} [callback] The callback to be called after all invokations
 */
module.exports = function waterfall(funcs, callback) {

    // Asserting
    assertArgument(isArrayLike(funcs), 1, 'ArrayLike');
    assertArgument(isVoid(callback) || isFunction(callback), 2, 'Function');

    // Let
    let cb = callback || function () {};

    // Function
    let next = function () {

        // Let
        let i    = this + 1,
            args = Array.from(arguments),
            err  = args.splice(0, 1, funcs[i] ? next.bind(i) : null)[0],
            func = err || !funcs[i] ? cb : funcs[i];

        // Checking
        if (err) { func(err); return; }

        // Invoking
        func(...args);
    };

    // Invoking
    next.call(-1);
};
