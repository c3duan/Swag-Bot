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
 * Invokes the provided `funcs` parallel, without waiting until the previous function has completed.
 * If any of the functions pass an error to its callback, the main `callback` is immediately called with the error.
 * Once the tasks have completed and no error occurred, `callback` is called with the array of results.
 *
 * ```js
 *  XP.parallel([
 *      next => setTimeout(() => next(null, console.log('1st'), 32),
 *      next => setTimeout(() => next(null, console.log('2nd'), 16),
 *      next => setTimeout(() => next(null, console.log('3rd'), 24)
 *  ], () => console.log('Done!'));
 * // => '2nd'
 * // => '3rd'
 * // => '1st'
 * // => 'Done!'
 * ```
 *
 * @function parallel
 * @since 1.0.0
 * @category function
 * @description Invokes the provided `funcs` parallel, without waiting until the previous function has completed
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parallel.js
 *
 * @param {Array} funcs The target functions
 * @param {Function} [callback] The callback to be called after all invokations
 */
module.exports = function parallel(funcs, callback) {

    // Asserting
    assertArgument(isArrayLike(funcs), 1, 'ArrayLike');
    assertArgument(isVoid(callback) || isFunction(callback), 2, 'Function');

    // Let
    let cb     = callback || function () {},
        result = new Array(funcs.length),
        left   = result.length,
        ended  = !left;

    // Checking
    if (ended) { cb(null, result); return; }

    // Cycling functions
    Array.from(funcs).forEach((func, i) => {

        // Preventing
        if (ended || !isFunction(func)) {
            left -= 1;
            result[i] = undefined;
            return;
        }

        // Invoking
        func((error, data) => {
            left -= 1;
            result[i] = data;
            if (ended) { return; }
            if (error) { return cb(ended = error, null); }
            if (!left) { return cb(null, result); }
        });
    });
};
