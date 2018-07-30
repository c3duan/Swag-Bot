/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _clone       = require('lodash/clone'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    toArray        = require('./toArray');

/**
 * Returns a shallow clone of `collection`.
 *
 * ```js
 * let objects = [{a: 1}, {b: 2}],
 *     clones  = XP.clone(objects);
 *
 * clones === objects;
 * // => false
 *
 * clones[0] === objects[0];
 * // => true
 * ```
 *
 * @function clone
 * @since 1.0.0
 * @category collection
 * @description Returns a shallow clone of `collection`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/clone.js
 *
 * @param {Array | Object} collection The target collection
 * @returns {Array | Object} Return a shallow clone of `collection`
 */
module.exports = function clone(collection) {

    // Asserting
    assertArgument(isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');

    // Returning
    return _clone(collection);
};
