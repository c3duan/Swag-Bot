/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _omit        = require('lodash/omit'),
    assertArgument = require('./assertArgument'),
    isArrayLike    = require('./isArrayLike'),
    isObject       = require('./isObject'),
    isString       = require('./isString');

/**
 * Returns an object composed of the own and inherited enumerable properties of `object` that are not omitted.
 *
 * ```js
 * XP.omit({name: 'fred', age: 40}, 'age');
 * // => {name: 'fred'}
 *
 * XP.omit({name: 'fred', age: 40}, ['name', 'age']);
 * // => {}
 * ```
 *
 * @function omit
 * @since 1.0.0
 * @category object
 * @description Returns an object composed of the own and inherited enumerable properties of `object` that are not omitted
 * @source https://github.com/expandjs/expandjs/blog/master/lib/omit.js
 *
 * @param {Object} object The target object
 * @param {Array | string} props The property identifiers to omit.
 * @returns {Object} Returns the new object
 */
module.exports = function omit(object, props) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');
    assertArgument(isString(props) || isArrayLike(props), 2, 'string or ArrayLike');

    // Returning
    return _omit(object, props);
};
