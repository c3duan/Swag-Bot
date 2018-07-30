/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates a `NotFoundError` with code 404 and a default message.
 *
 * ```js
 * console.log(new NotFoundError());
 * // => NotFoundError{message: 'Not found.', code: 404, stack: '...'}
 * ```
 *
 * @function ConflictError
 * @since 1.0.0
 * @category error
 * @description Creates a `NotFoundError` with code 404 and a default message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/ConflictError.js
 *
 * @param {string} [message = "Not found."] The error's message
 */
module.exports = function NotFoundError(message) {

    // Let
    let error = new Error(message || 'Not found.');

    // Setting
    error.name = 'NotFoundError';
    error.code = 404;

    // Returning
    return error;
};
