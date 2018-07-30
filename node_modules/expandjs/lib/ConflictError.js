/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates a `ConflictError` with a code 409 and a default message.
 *
 * ```js
 * console.log(new XP.ConflictError());
 * // => ConflictError{message: 'Conflict.', code: 409, stack: '...'}
 * ```
 *
 * @function ConflictError
 * @since 1.0.0
 * @category error
 * @description Creates a `ConflictError` with a code 409 and a default message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/ConflictError.js
 *
 * @param {string} [message = "Conflict."] The error's message.
 */
module.exports = function ConflictError(message) {

    // Let
    let error = new Error(message || 'Conflict.');

    // Setting
    error.name = 'ConflictError';
    error.code = 409;

    // Returning
    return error;
};
