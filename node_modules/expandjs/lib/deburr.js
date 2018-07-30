/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _deburr      = require('lodash/deburr'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` deburred by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table) and
 * [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A) letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * ```js
 * XP.deburr('déjà vu');
 * // => 'deja vu'
 * ```
 *
 * @function deburr
 * @since 1.0.0
 * @category string
 * @description Returns `string` deburred by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks
 * @source https://github.com/expandjs/expandjs/blog/master/lib/deburr.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the deburred string
 */
module.exports = function deburr(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return string ? _deburr(string) : '';
};
