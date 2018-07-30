/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates a `ValidationError` with a predefined message.
 *
 * ```js
 * console.log(new ValidationError('myVar', 'Object or string'));
 * // => ValidationError{message: '"myVar" must be Object or string.', stack: '...'}
 * ```
 *
 * @function ValidationError
 * @since 1.0.0
 * @category error
 * @description Creates a `ValidationError` with a predefined message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/ValidationError.js
 *
 * @param {string} key The key to be used in the error's message
 * @param {string} type The type needed for the validation to succeed
 * @param {number} [code] The error's code
 */
module.exports = function ValidationError(key, type, code) {

    // Let
    let error = new Error(`"${key}" must be ${type}.`);

    // Setting
    error.name = 'ValidationError';
    error.code = code;

    // Returning
    return error;
};
