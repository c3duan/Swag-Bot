/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const toPosition = require('./toPosition');

/**
 * Creates an `ArgumentError` with a predefined message.
 *
 * ```js
 * console.log(new XP.ArgumentError(1, 'Object or string'));
 * // => ArgumentError{message: '1st argument must be Object or string.', stack: '...'}
 * ```
 *
 * @function ArgumentError
 * @since 1.0.0
 * @category error
 * @description Creates an `ArgumentError` with a predefined message
 * @source https://github.com/expandjs/expandjs/blog/master/lib/ArgumentError.js
 *
 * @param {number} position The argument's position
 * @param {string} type The argument's type
 * @param {number} [code] The error's code
 */
module.exports = function ArgumentError(position, type, code) {

    // Let
    let error = new Error(`${toPosition(position) || `Unknown`} argument must be ${type}.`);

    // Setting
    error.name = 'ArgumentError';
    error.code = code;

    // Returning
    return error;
};
