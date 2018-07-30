/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns the file basename from `string`.
 *
 * ```js
 * XP.fileBasename('index.html');
 * // => 'index'
 *
 * XP.fileBasename('expandjs.min.js');
 * // => 'expandjs.min'
 * ```
 *
 * @function fileBasename
 * @since 1.0.0
 * @category string
 * @description Returns the file basename from `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/fileBasename.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the file basename
 */
module.exports = function fileBasename(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Let
    let i = string ? string.lastIndexOf('.') : -1;

    // Returning
    return i > 0 && string.slice(0, i) || '';
};
