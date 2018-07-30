/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _trimEnd     = require('lodash/trimEnd'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns `string` without trailing `chars`.
 *
 * ```js
 * XP.trimEnd('  abc  ');
 * // => '  abc'
 *
 * XP.trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 * ```
 *
 * @function trimEnd
 * @since 1.0.0
 * @category string
 * @description Returns `string` without trailing `chars`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/trimEnd.js
 *
 * @param {string} [string = ""] The target string
 * @param {string} [chars = " "] The characters to trim
 * @returns {string} Returns the trimmed string
 */
module.exports = function trimEnd(string, chars) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');
    assertArgument(isVoid(chars) || isString(chars), 2, 'string');

    // Returning
    return string && _trimEnd(string, chars) || '';
};
