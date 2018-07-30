/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _keyBy       = require('lodash/keyBy'),
    assertArgument = require('./assertArgument'),
    isCollection   = require('./isCollection'),
    isFunction     = require('./isFunction'),
    toArray        = require('./toArray');

/**
 * Returns an object composed of keys generated from the results of running each element of `collection` through `iteratee`.
 * The corresponding value of each key is the last element responsible for generating the key.
 * The `iteratee` is invoked with one argument: (value).
 *
 * ```js
 * let keyData = [
 *     {dir: 'left', code: 97},
 *     {dir: 'right', code: 100}
 * ];
 *
 * XP.keyBy(array, item => item.dir);
 * // => {left: {dir: 'left', code: 97}, right: {dir: 'right', code: 100}}
 * ```
 *
 * @function keyBy
 * @since 1.0.0
 * @category collection
 * @description Returns an object composed of keys generated from the results of running each element of `collection` through `iteratee`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/keyBy.js
 *
 * @param {Array | Object} collection The target collection
 * @param {Function} iteratee The function invoked per iteration
 * @returns {Object} Returns the composed aggregate object
 */
module.exports = function keyBy(collection, iteratee) {

    // Asserting
    assertArgument(isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');
    assertArgument(isFunction(iteratee), 2, 'Function');

    // Returning
    return _keyBy(collection, iteratee);
};
