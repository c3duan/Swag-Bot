/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArrayLike      = require('./isArrayLike'),
    isFunction       = require('./isFunction'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    toArray          = require('./toArray');

/**
 * Invokes a `method` of `target`, passing the provided `args` as arguments.
 *
 * ```js
 * let object = {};
 *
 * object.greetings = function (sender, receiver) {
 *     console.log(`${sender} says "Hello!" to ${receiver}`);
 * };
 *
 * XP.apply(object, 'greetings', ['Bob', 'Emma']);
 * // => 'Bob says "Hello!" to Emma'
 * ```
 *
 * @function apply
 * @since 1.0.0
 * @category function
 * @description Invokes a `method` of `target`, passing the provided `args` as arguments
 * @source https://github.com/expandjs/expandjs/blog/master/lib/apply.js
 *
 * @param {*} target The method's owner
 * @param {string} method The method to be called
 * @param {Array} [args] The arguments to be passed
 * @returns {*} Returns the result of the call
 */
module.exports = function apply(target, method, args) {

    // Asserting
    assertArgument(isString(method, true), 2, 'string');
    assertArgument(isVoid(args) || isArrayLike(args), 3, 'ArrayLike');

    // Preventing
    if (isVoid(target) || !isFunction(target[method])) { return; }

    // Returning
    return target[method].apply(target, toArray(args) || []);
};
