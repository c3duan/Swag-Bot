/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _values      = require('lodash/values'),
    assertArgument = require('./assertArgument'),
    isObject       = require('./isObject');

/**
 * Returns an array of the own enumerable property values of `object`.
 *
 * ```js
 * XP.values({a: 1, b: 2});
 * // => [1, 2]
 * ```
 *
 * @function values
 * @since 1.0.0
 * @category object
 * @description Returns an array of the own enumerable property values of `object`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/values.js
 *
 * @param {Object} object The target object
 * @returns {Array} Returns the array of property values
 */
module.exports = function values(object) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');

    // Returning
    return _values(object);
};
