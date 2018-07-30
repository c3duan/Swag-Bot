/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isCollection     = require('./isCollection');

/**
 * Freezes `collection` entirely:
 * - prevents new properties from being added to it;
 * - prevents existing properties from being removed;
 * - prevents existing properties, or their enumerability, configurability, or writability, from being changed.
 *
 * ```js
 * let object = {a: {b: 1, c: 2}};
 *
 * XP.freezeDeep(object);
 * // => {a: {b: 1, c: 2}}
 *
 * object.a.d = 3;
 *
 * console.log(object);
 * // => {a: {b: 1, c: 2}}
 * ```
 *
 * @function freezeDeep
 * @since 1.0.0
 * @category collection
 * @description Freezes `collection` entirely
 * @source https://github.com/expandjs/expandjs/blog/master/lib/freezeDeep.js
 *
 * @param {Array | Object} collection The target collection
 * @returns {Array | Object} Returns the frozen `collection`
 */
module.exports = function freezeDeep(collection) {

    // Asserting
    assertArgument(isCollection(collection), 1, 'Array or Object');

    // Recursion
    Object.keys(collection).forEach(key => isCollection(collection[key]) && freezeDeep(collection[key]));

    // Returning
    return Object.freeze(collection);
};
