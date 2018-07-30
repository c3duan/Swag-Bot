/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates a custom error.
 *
 * ```js
 * console.log(new XP.CustomError('Unknown error.', 500));
 * // => Error{message: 'Unknown error.', code: 500, stack: '...'}
 * ```
 *
 * @function CustomError
 * @since 1.0.0
 * @category error
 * @description Creates a custom error
 * @source https://github.com/expandjs/expandjs/blog/master/lib/CustomError.js
 *
 * @param {string} [message = ""] The error's message
 * @param {number} [code] The error's code
 */
module.exports = function CustomError(message, code) {

    // Let
    let error = new Error(message || '');

    // Setting
    error.code = code;

    // Returning
    return error;
};
