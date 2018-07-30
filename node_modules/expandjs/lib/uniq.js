/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _uniq        = require('lodash/uniq'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Returns a duplicate free version of `array`, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons.
 *
 * ```js
 * XP.uniq([2, 1, 2]);
 * // => [2, 1]
 * ```
 *
 * @function uniq
 * @since 1.0.0
 * @category array
 * @description Returns a duplicate free version of `array`, using `SameValueZero` for equality comparisons
 * @source https://github.com/expandjs/expandjs/blog/master/lib/uniq.js
 *
 * @param {Array} array The target array
 * @returns {Array} Returns the new duplicate free array
 */
module.exports = function uniq(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'ArrayLike');

    // Returning
    return _uniq(array);
};
