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
 * Returns the actual byte length of `string`.
 * This is not the same as `String.prototype.length` since that returns the number of characters in a string.
 *
 * ```js
 * Buffer.byteLength('Hello');
 * // => 5
 * ```
 *
 * @function byteLength
 * @since 1.2.0
 * @category string
 * @description Returns the actual byte length of `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/byteLength.js
 *
 * @param {string} string The target string
 * @param {string} [encoding = "utf8"] The target's encoding
 * @returns {number} Returns the number of bytes contained within `string`
 */
module.exports = function byteLength(string, encoding) {

    // Asserting
    assertArgument(isVoid(encoding) || isString(encoding), 2, 'string');

    // Returning
    return Buffer.byteLength(string, encoding);
};
