/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDate   = require('./isDate'),
    isDefined  = require('./isDefined'),
    isError    = require('./isError'),
    isFunction = require('./isFunction'),
    isRegExp   = require('./isRegExp'),
    isString   = require('./isString');

/**
 * Returns a `string` representation of `target`.
 *
 * ```js
 * XP.toString(true);
 * // => 'true'
 *
 * XP.toString(2015);
 * // => '2015'
 *
 * XP.toString(new Date());
 * // => '2015-12-25T00:00:00.000Z'
 *
 * XP.toString({first: 1, second: 2});
 * // => '{first: 1, second: 2}'
 *
 * XP.toString(undefined);
 * // => ''
 * ```
 *
 * @function toString
 * @since 1.0.0
 * @category caster
 * @description Returns a `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toString.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toString(target) {

    // Returning
    if (isString(target)) { return target; }
    if (isError(target)) { return target.toString(); }
    if (isFunction(target)) { return target.toString(); }
    if (isRegExp(target)) { return target.toString(); }
    if (isDate(target)) { return target.toISOString(); }
    if (isDefined(target)) { return JSON.stringify(target); }

    // Default
    return '';
};
