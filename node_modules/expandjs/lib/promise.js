/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    callback         = require('./callback'),
    delay            = require('./delay'),
    isArrayLike      = require('./isArrayLike'),
    isFunction       = require('./isFunction');

/**
 * Adjusts the provided `args` using XP.callback and returns a promise.
 *
 * @function promise
 * @since 1.0.0
 * @category function
 * @description Adjusts the provided `args` using XP.callback and returns a promise
 * @source https://github.com/expandjs/expandjs/blog/master/lib/promise.js
 *
 * @param {Array} args The arguments to adjust
 * @param {Function} func The target function
 * @returns {Object} Returns the generated promise
 */
module.exports = function (args, func) {

    // Asserting
    assertArgument(isArrayLike(args), 1, 'ArrayLike');
    assertArgument(isFunction(func), 2, 'Function');

    // Preparing
    args = callback(args, func);

    // Let
    let caught   = false,
        resolved = false,
        last     = func.length ? func.length - 1 : 0,
        lastArg  = args[last],
        promise  = new global.Promise((resolve, reject) => {
            args[last] = (error, data) => {
                if (!resolved) { resolved = true; } else { return delay(() => lastArg && lastArg(error, data)); }
                if (!error) { resolve(data); } else { reject(error); }
            };
        });

    // Handlers
    function cbCatch(err) { caught = true; lastArg(err, null); }
    function cbThen(data) { return caught || lastArg(null, data); }

    // Callback
    if (lastArg) { promise.catch(cbCatch).then(cbThen); }

    // Invoking
    func(...args);

    // Returning
    return promise;
};
