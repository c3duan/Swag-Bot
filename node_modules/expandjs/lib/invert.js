/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _invert      = require('lodash/invert'),
    assertArgument = require('./assertArgument'),
    isObject       = require('./isObject');

/**
 * Returns an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite property assignments of previous values.
 *
 * ```js
 * XP.invert({a: 1, b: 2, c: 1});
 * // => {1: 'c', 2: 'b'}
 * ```
 *
 * @function invert
 * @since 1.0.0
 * @category object
 * @description Returns an object composed of the inverted keys and values of `object`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/invert.js
 *
 * @param {Object} object The target object
 * @returns {Object} Returns the new inverted object
 */
module.exports = function invert(object) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');

    // Returning
    return _invert(object);
};
