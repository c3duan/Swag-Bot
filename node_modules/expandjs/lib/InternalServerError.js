/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates an `InternalServerError` with code 500 and a default message.
 *
 * ```js
 * console.log(new XP.InternalServerError());
 * // => InternalServerError{message: 'Internal server error.', code: 500, stack: '...'}
 * ```
 *
 * @function InternalServerError
 * @since 1.0.0
 * @category error
 * @description Creates an `InternalServerError` with code 500 and a default message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/InternalServerError.js
 *
 * @param {string} [message = "Internal server error."] The error's message
 */
module.exports = function InternalServerError(message) {

    // Let
    let error = new Error(message || 'Internal server error.');

    // Setting
    error.name = 'InternalServerError';
    error.code = 500;

    // Returning
    return error;
};
