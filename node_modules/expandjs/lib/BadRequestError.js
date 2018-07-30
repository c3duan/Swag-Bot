/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates a `BadRequestError` with code 400 and a default message.
 *
 * ```js
 * console.log(new XP.BadRequestError());
 * // => BadRequestError{message: 'Bad request.', code: 400, stack: '...'}
 * ```
 *
 * @function BadRequestError
 * @since 1.0.0
 * @category error
 * @description Creates a `BadRequestError` with code 400 and a default message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/BadRequestError.js
 *
 * @param {string} [message = "Bad request."] The error's message
 */
module.exports = function BadRequestError(message) {

    // Let
    let error = new Error(message || 'Bad request.');

    // Setting
    error.name = 'BadRequestError';
    error.code = 400;

    // Returning
    return error;
};
