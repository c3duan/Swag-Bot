/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates an `UnauthorizedError` with code 401 and a default message.
 *
 * ```js
 * console.log(new UnauthorizedError());
 * // => UnauthorizedError{message: 'Access denied.', code: 401, stack: '...'}
 * ```
 *
 * @function UnauthorizedError
 * @since 1.0.0
 * @category error
 * @description Creates an `UnauthorizedError` with code 401 and a default message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/UnauthorizedError.js
 *
 * @param {string} [message = "Access denied."] The error's message
 */
module.exports = function ForbiddenError(message) {

    // Let
    let error = new Error(message || 'Access denied.');

    // Setting
    error.name = 'UnauthorizedError';
    error.code = 401;

    // Returning
    return error;
};
