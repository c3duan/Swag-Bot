/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _querystring = require('querystring'),
    assertArgument = require('./assertArgument'),
    isArray        = require('./isArray'),
    isBoolean      = require('./isBoolean'),
    isDate         = require('./isDate'),
    isInput        = require('./isInput'),
    isNull         = require('./isNull'),
    isObject       = require('./isObject'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid'),
    toString       = require('./toString');

/**
 * Returns a query `string` representation of `target`.
 *
 * ```js
 * XP.toQueryString({first: 1, second: 2})
 * // => 'first=1&second=2'
 *
 * XP.toQueryString('test')
 * // => undefined
 * ```
 *
 * @function toQueryString
 * @since 1.0.0
 * @category caster
 * @description Returns a query `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toQueryString.js
 *
 * @param {*} target The target value
 * @param {boolean} [question = false] Specifies if the string should be prefixed with a question mark
 * @returns {string} Returns the casted value
 */
module.exports = function toQueryString(target, question) {

    // Asserting
    assertArgument(isVoid(target) || isObject(target), 1, 'Object');

    // Caster
    let cast = value => {
        if (isInput(value, true) || isBoolean(value) || isNull(value) || isDate(value)) { return toString(value); }
        if (isArray(value)) { return value.map(val => cast(val)).filter(val => isString(val)); }
    };

    // Stringify
    let result = _querystring.stringify(Object.keys(target || {}).reduce((result, key) => Object.assign(result, {[key]: cast(target[key])}), {}));

    // Returning
    return `${question && result ? `?` : ``}${result || ``}`;
};
