/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArray          = require('./isArray'),
    isCollection     = require('./isCollection'),
    isVoid           = require('./isVoid'),
    isFunction       = require('./isFunction'),
    toArray          = require('./toArray');

/**
 * Invokes `iteratee` against each value in `collection`, in parallel.
 *
 * A 3rd parameter can be provided as a final `callback`, which will be invoked after the iteration is over.
 *
 * ```js
 * let names = ['Bob', 'Emma', 'John'];
 *
 * XP.each(names, (next, name) => next(null, console.log(`${name} says "Hello!"`)));
 * // => 'Bob says "Hello!"'
 * // => 'Emma says "Hello!"'
 * // => 'John says "Hello!"'
 * ```
 *
 * @function each
 * @since 1.0.0
 * @category collection
 * @description Invokes `iteratee` against each value in `collection`, in parallel
 * @source https://github.com/expandjs/expandjs/blog/master/lib/each.js
 *
 * @param {Array | Object} collection The target collection
 * @param {Function} iteratee The function invoked per iteration
 * @param {Function} [callback] Final callback after iteration is over
 */
module.exports = function each(collection, iteratee, callback) {

    // Asserting
    assertArgument(isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');
    assertArgument(isFunction(iteratee), 2, 'Function');
    assertArgument(isVoid(callback) || isFunction(callback), 3, 'Function');

    // Let
    let i      = 0,
        error  = null,
        cb     = callback || function () {},
        keys   = !isArray(collection) && Object.keys(collection),
        length = (keys || collection).length;

    // Functions
    let resolve = function (err) { if (((i += 1) === length || err) && !error) { cb(error = err, collection); } };
    let array = function (value, i) { iteratee(resolve, value, i, collection); };
    let object = function (key) { iteratee(resolve, collection[key], key, collection); };

    // Starting
    if (i < length) { Array.from(keys || collection).forEach(keys ? object : array); } else { cb(null, collection); }
};
