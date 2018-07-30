/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const BadRequestError   = require('./BadRequestError'),
    ConflictError       = require('./ConflictError'),
    CustomError         = require('./CustomError'),
    ForbiddenError      = require('./ForbiddenError'),
    InternalServerError = require('./InternalServerError'),
    NotFoundError       = require('./NotFoundError'),
    UnauthorizedError   = require('./UnauthorizedError');

/**
 * Returns the right error based on the provided `code`.
 *
 * @function error
 * @since 1.0.0
 * @category object
 * @description Returns the right error based on the provided `code`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/error.js
 *
 * @param {number} code The error's code
 * @param {string} [message = ""] The error's message
 * @returns {*} Returns a new error.
 */
module.exports = function error(code, message) {

    // Let
    let Errors = {
        '400': BadRequestError,
        '401': UnauthorizedError,
        '403': ForbiddenError,
        '404': NotFoundError,
        '409': ConflictError,
        '500': InternalServerError
    };

    // Returning
    return Errors[code] ? new Errors[code](message) : new CustomError(message, code);
};
