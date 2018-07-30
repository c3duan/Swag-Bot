/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _shuffle     = require('lodash/shuffle'),
    assertArgument = require('./assertArgument'),
    toArray        = require('./toArray');

/**
 * Returns an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * ```js
 * XP.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 * ```
 *
 * @function shuffle
 * @since 1.0.0
 * @category array
 * @description Returns an array of shuffled values, using a version of the Fisher-Yates shuffle
 * @source https://github.com/expandjs/expandjs/blog/master/lib/shuffle.js
 *
 * @param {Array} array The target array
 * @returns {Array} Returns the new shuffled array
 */
module.exports = function shuffle(array) {

    // Asserting
    assertArgument(array = toArray(array), 1, 'Array');

    // Returning
    return _shuffle(array);
};
