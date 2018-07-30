/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isFunction       = require('./isFunction'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Invokes a `method` of `target`, passing the provided `args` as arguments individually.
 *
 * ```js
 * let object = {};
 *
 * object.greetings = function(sender, receiver) {
 *     console.log(`${sender} says "Hello!" to ${receiver}`);
 * };
 *
 * XP.call(object, 'greetings', 'Bob', 'Emma');
 * // => 'Bob says "Hello!" to Emma'
 * ```
 *
 * @function call
 * @since 1.0.0
 * @category function
 * @description Invokes a `method` of `target`, passing the provided `args` as arguments individually
 * @source https://github.com/expandjs/expandjs/blog/master/lib/call.js
 *
 * @param {*} target The method's owner
 * @param {string} method The method to be called
 * @param {...*} [args] The arguments to be passed
 * @returns {*} Returns the result of the call
 */
module.exports = function call(target, method, ...args) {

    // Asserting
    assertArgument(isString(method, true), 2, 'string');

    // Preventing
    if (isVoid(target) || !isFunction(target[method])) { return; }

    // Returning
    return target[method].call(target, ...args);
};
