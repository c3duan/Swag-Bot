/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * Creates an `InvalidError` with a predefined message.
 *
 * ```js
 * console.log(new InvalidError('myVar'));
 * // => InvalidError{message: '"myVar" is not valid.', stack: '...'}
 * ```
 *
 * @function InvalidError
 * @since 1.0.0
 * @category error
 * @description Creates an `InvalidError` with a predefined message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/InvalidError.js
 *
 * @param {string} key The key to be used in the error's message
 * @param {number} [code] The error's code
 */
module.exports = function InvalidError(key, code) {

    // Let
    let error = new Error(`"${key}" is not valid.`);

    // Setting
    error.name = 'InvalidError';
    error.code = code;

    // Returning
    return error;
};
