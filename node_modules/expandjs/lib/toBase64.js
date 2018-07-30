/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isString = require('./isString');

/**
 * Returns a [base64](https://it.wikipedia.org/wiki/Base64) `string` representation of `target`.
 *
 * ```js
 * XP.toBase64('test')
 * // => 'dGVzdA=='
 *
 * XP.toBase64(null)
 * // => undefined
 * ```
 *
 * @function toBase64
 * @since 1.0.0
 * @category caster
 * @description Returns a base64 `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toBase64.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toBase64(target) {

    // Returning
    if (typeof window !== "undefined" && isString(target)) { return global.btoa(global.encodeURIComponent(target)); }
    if (isString(target)) { return new Buffer(target).toString('base64'); }
};
