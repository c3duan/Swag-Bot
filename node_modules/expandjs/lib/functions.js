/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _functions   = require('lodash/functions'),
    assertArgument = require('./assertArgument'),
    isObject       = require('./isObject');

/**
 * Returns an array of function property names from own enumerable properties of `object`.
 *
 * ```js
 * XP.functions({a: function () {}, b: 1);
 * // => ['a']
 * ```
 *
 * @function functions
 * @since 1.0.0
 * @category object
 * @description Returns an array of function property names from own enumerable properties of `object`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/functions.js
 *
 * @param {Object} object The target object
 * @returns {Array} Returns the array of function names
 */
module.exports = function functions(object) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');

    // Returning
    return _functions(object);
};
