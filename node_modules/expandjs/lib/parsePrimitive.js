/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isNumeric        = require('./isNumeric'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    toDefined        = require('./toDefined'),
    toFinite         = require('./toFinite');

/**
 * Returns the primitive representation of `string`.
 *
 * ```js
 * XP.parsePrimitive('false')
 * // => false
 *
 * XP.parsePrimitive('null')
 * // => null
 *
 * XP.parsePrimitive('0')
 * // => 0
 *
 * XP.parsePrimitive('a')
 * // => 'a'
 *
 * XP.parsePrimitive('{}')
 * // => '{}'
 * ```
 *
 * @function parsePrimitive
 * @since 1.0.0
 * @category string
 * @description Returns the primitive representation of `string`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/parsePrimitive.js
 *
 * @param {string} string The target string
 * @returns {*} Returns the parsed value as primitive
 */
module.exports = function parsePrimitive(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Switching
    switch (string) {
        case 'false': return false;
        case 'true': return true;
        case 'null': return null;
    }

    // Returning
    return isNumeric(string) ? toFinite(string) : toDefined(string);
};
