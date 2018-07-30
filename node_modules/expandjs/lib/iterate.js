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
 * Invokes `iteratee` against each value in `collection`, in sequence.
 *
 * A 3rd parameter can be provided as a final `callback`, which will be invoked after the iteration is over.
 *
 * ```js
 * let names = ['Bob', 'Emma', 'John'];
 *
 * XP.iterate(names, (next, name) => next(null, console.log(`${name} says "Hello!"`)));
 * // => 'Bob says "Hello!"'
 * // => 'Emma says "Hello!"'
 * // => 'John says "Hello!"'
 * ```
 *
 * @function iterate
 * @since 1.0.0
 * @category function
 * @description Invokes `iteratee` against each value in `collection`, in sequence
 * @source https://github.com/expandjs/expandjs/blog/master/lib/iterate.js
 *
 * @param {Array | Object} collection The target collection
 * @param {Function} iteratee The function invoked per iteration
 * @param {Function} [callback] The callback invoked after the iteration is over
 */
module.exports = function iterate(collection, iteratee, callback) {

    // Asserting
    assertArgument(isCollection(collection = toArray(collection) || collection), 1, 'Array or Object');
    assertArgument(isFunction(iteratee), 2, 'Function');
    assertArgument(isVoid(callback) || isFunction(callback), 3, 'Function');

    // Let
    let i      = -1,
        cb     = callback || function () {},
        keys   = !isArray(collection) && Object.keys(collection),
        length = (keys || collection).length;

    // Function
    let next = function (err) {
        if ((i += 1) === length || err) { cb(err, collection); return; }
        iteratee(next, collection[keys ? keys[i] : i], keys ? keys[i] : i, collection);
    };

    // Starting
    next();
};
