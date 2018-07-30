/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isIndex          = require('./isIndex'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns `string` repeated `howMany` times.
 *
 * A 3rd parameter can be provided to specify a `spacer` between each repetition.
 *
 * ```js
 * XP.repeat('*', 3);
 * // => '***'
 *
 * XP.repeat('abc', 2, ' ');
 * // => 'abc abc'
 *
 * XP.repeat('abc', 0);
 * // => ''
 * ```
 *
 * @function repeat
 * @since 1.0.0
 * @category string
 * @description Returns `string` repeated `howMany` times
 * @source https://github.com/expandjs/expandjs/blog/master/lib/repeat.js
 *
 * @param {string} [string = ""] The target string
 * @param {number} [howMany = 0] The number of times to repeat the string
 * @param {string} [spacer = ""] The spacer between repetitions
 * @returns {string} Returns the repeated string
 */
module.exports = function repeat(string, howMany, spacer) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(howMany) || isIndex(howMany), 2, 'number');
    assertArgument(isVoid(spacer) || isString(spacer), 3, 'string');

    // Returning
    return string && howMany ? `${string}${`${spacer || ``}${string}`.repeat(howMany - 1)}` : ``;
};
