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
 * Returns the file extension from `string`.
 *
 * ```js
 * XP.fileExtension('index.html');
 * // => 'html'
 *
 * XP.fileExtension('expandjs.min.js');
 * // => 'js'
 * ```
 *
 * @function fileExtension
 * @since 1.0.0
 * @category string
 * @description Returns the file extension from `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/fileExtension.js
 *
 * @param {string} [string = ""] The target string
 * @returns {string} Returns the file extension
 */
module.exports = function fileExtension(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Let
    let i = string ? string.lastIndexOf('.') : -1;

    // Returning
    return i > 0 && string.slice(i + 1) || '';
};
