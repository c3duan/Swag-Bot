/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _size        = require('lodash/size'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isString       = require('./isString'),
    toArray        = require('./toArray');

/**
 * Returns the size of `collection`, which is length for array-like values and the number of own enumerable properties for objects.
 *
 * ```js
 * XP.size([1, 2, 3]);
 * // => 3
 *
 * XP.size({a: 1, b: 2});
 * // => 2
 *
 * XP.size('pebbles');
 * // => 7
 * ```
 *
 * @function size
 * @since 1.0.0
 * @category collection
 * @description Returns the size of `collection`, which is length for array-like values and the number of own enumerable properties for objects
 * @source https://github.com/expandjs/expandjs/blog/master/lib/size.js
 *
 * @param {Array | Object | string} collection The target collection
 * @returns {number} Returns the size of `collection`
 */
module.exports = function size(collection) {

    // Asserting
    assertArgument(isString(collection) || isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');

    // Returning
    return _size(collection);
};
