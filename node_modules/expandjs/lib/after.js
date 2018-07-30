/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _after       = require('lodash/after'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    isIndex        = require('./isIndex');

/**
 * Returns a function that invokes `func` once it's called `n` or more times.
 *
 * ```js
 * let pages = ['profile', 'settings'],
 *     done  = XP.after(pages.length, () => console.log('Done loading.'));
 *
 * pages.forEach(page => asyncLoad({page: page, complete: done}));
 * // => logs 'Done saving.' after the two async loads have completed
 * ```
 *
 * @function after
 * @since 1.0.0
 * @category function
 * @description Returns a function that invokes `func` once it's called `n` or more times
 * @source https://github.com/expandjs/expandjs/blog/master/lib/after.js
 *
 * @param {number} n The number of calls before `func` is invoked
 * @param {Function} func The target function
 * @returns {Function} Returns the new restricted function
 */
module.exports = function after(n, func) {

    // Asserting
    assertArgument(isIndex(n), 1, 'number');
    assertArgument(isFunction(func), 2, 'Function');

    // Returning
    return _after(n, func);
};
