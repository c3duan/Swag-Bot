/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isRegExp = require('./isRegExp'),
    isString   = require('./isString');

/**
 * Returns a `RegExp` representation of `target`.
 *
 * ```js
 * XP.toRegExp('abc');
 * // => /abc/
 *
 * XP.toRegExp(/abc/g);
 * // => /abc/g
 * ```
 *
 * @function toRegExp
 * @since 1.0.0
 * @category caster
 * @description Returns a `RegExp` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toRegExp.js
 *
 * @param {*} target The target value
 * @returns {RegExp} Returns the casted value
 */
module.exports = function toRegExp(target) {

    // Let
    let end, esc, i, string;

    // Checking
    if (!isString(target)) { return isRegExp(target) ? target : undefined; }
    if (target[0] !== '/') { return target ? new RegExp(target) : null; }

    // Preparing
    for (end = esc = false, i = 1, string = ''; i < target.length; i += 1) {
        end = !esc && target[i] === '/';
        esc = !esc && target[i] === '\\';
        if (end) { break; }
        string += target[i];
    }

    // Returning
    try { return end && string ? new RegExp(string, target.slice(i + 1)) : null; } catch (ignore) { return null; }
};
