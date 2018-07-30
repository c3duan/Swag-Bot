/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isString         = require('./isString');

/**
 * Returns a `Bearer` authorization header from `token`.
 *
 * ```js
 * XP.authBearer('123456');
 * // => 'Bearer 123456'
 * ```
 *
 * @function authBearer
 * @since 1.0.0
 * @category string
 * @description Returns a `Bearer` authorization header from `token`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/authBearer.js
 *
 * @param {string} token The token
 * @returns {string} Returns the authorization header
 */
module.exports = function authBearer(token) {

    // Asserting
    assertArgument(isString(token, true), 1, 'string');

    // Returning
    return `Bearer ${token}`;
};
