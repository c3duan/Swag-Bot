/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isString         = require('./isString'),
    toBase64         = require('./toBase64');

/**
 * Returns a `Basic` authorization header from `username` and `password`.
 *
 * ```js
 * XP.authBasic('root', '123456');
 * // => 'Basic cm9vdDoxMjM0NTY='
 * ```
 *
 * @function authBasic
 * @since 1.0.0
 * @category string
 * @description Returns a `Basic` authorization header from `username` and `password`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/authBasic.js
 *
 * @param {string} username The username
 * @param {string} password The password
 * @returns {string} Returns the authorization header
 */
module.exports = function authBasic(username, password) {

    // Asserting
    assertArgument(isString(username, true), 1, 'string');
    assertArgument(isString(password, true), 2, 'string');

    // Returning
    return `Basic ${toBase64(`${username}:${password}`)}`;
};
