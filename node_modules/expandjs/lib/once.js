/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _once        = require('lodash/once'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction');

/**
 * Returns a function that is restricted to invoking `func` once.
 * Repeat calls to the function return the value of the first invocation.
 * The `func` is invoked with the `this` binding and `arguments` of the created function.
 *
 * ```js
 * let initialize = XP.once(createApplication);
 * initialize();
 * initialize();
 * // `createApplication` is invoked once
 * ```
 *
 * @function once
 * @since 1.0.0
 * @category function
 * @description Returns a function that is restricted to invoking `func` once
 * @source https://github.com/expandjs/expandjs/blog/master/lib/once.js
 *
 * @param {Function} func The target function
 * @returns {Function} Returns the new restricted function
 */
module.exports = function once(func) {

    // Asserting
    assertArgument(isFunction(func), 1, 'Function');

    // Returning
    return _once(func);
};
