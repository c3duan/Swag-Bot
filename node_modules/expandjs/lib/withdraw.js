/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isObject         = require('./isObject'),
    isString         = require('./isString');

/**
 * Removes an own enumerable property from `object` and returns it.
 *
 * ```js
 * let object = {a: 1, b: 2}
 *
 * XP.withdraw(object, 'a');
 * // => 1
 *
 * console.log(object);
 * // => {b: 2}
 *
 * XP.withdraw(object, 'c')
 * // => undefined
 * ```
 *
 * @function withdraw
 * @since 1.0.0
 * @category object
 * @description Removes an own enumerable property from `object` and returns it
 * @source https://github.com/expandjs/expandjs/blog/master/lib/withdraw.js
 *
 * @param {Object} object The target object
 * @param {string} prop The property identifier to withdraw.
 * @returns {*} Returns the withdrew property
 */
module.exports = function withdraw(object, prop) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');
    assertArgument(isString(prop, true), 2, 'string');

    // Preventing
    if (!object.hasOwnProperty(prop)) { return; }

    // Let
    let value = object[prop];

    // Delete
    delete object[prop];

    // Returning
    return value;
};
