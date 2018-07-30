/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    fit              = require('./fit'),
    isArrayLike      = require('./isArrayLike'),
    isDefined        = require('./isDefined'),
    isFunction       = require('./isFunction');

/**
 * Returns a new `args` array, fitted according to the `func` length, ensuring that the last argument is a callback.
 *
 * @function callback
 * @since 1.0.0
 * @category function
 * @description Returns a new `args` array, fitted according to the `func` length, ensuring that the last argument is a callback
 * @source https://github.com/expandjs/expandjs/blog/master/lib/callback.js
 *
 * @param {Array} args The arguments to fit
 * @param {Function} func The target function
 * @returns {Array} Returns the fitted arguments
 */
module.exports = function (args, func) {

    // Asserting
    assertArgument(isArrayLike(args), 1, 'ArrayLike');
    assertArgument(isFunction(func), 2, 'Function');

    // Preparing
    args = fit(args, func.length);

    // Let
    let i, n;

    // Shifting
    for (n = i = args.length - 1; i >= 0; i -= 1) {
        if (!isDefined(args[i])) { continue; }
        args[n] = isFunction(args[i]) ? args[i] : args[n];
        args[i] = args[i] !== args[n] || i === n ? args[i] : undefined;
        break;
    }

    // Ensuring
    if (!isDefined(args[n])) { args[n] = function () {}; }

    // Returning
    return args;
};
