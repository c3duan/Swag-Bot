/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isPrimitive      = require('./isPrimitive'),
    isString         = require('./isString'),
    toBoolean        = require('./toBoolean'),
    toDate           = require('./toDate'),
    toFinite         = require('./toFinite'),
    toString         = require('./toString');

/**
 * Returns a primitive representation of `target`, based on `type`.
 *
 * A 3rd parameter can be provided to avoid casting ambiguity.
 *
 * ```js
 * XP.toPrimitive('true', 'boolean')
 * // => true
 *
 * XP.toPrimitive('2015-12-25', 'date')
 * // => new Date('2015-12-25')
 *
 * XP.toPrimitive('12', 'number')
 * // => 12
 *
 * XP.toPrimitive(12, 'string')
 * // => '12'
 * ```
 *
 * @function toPrimitive
 * @since 1.0.0
 * @category caster
 * @description Returns a primitive representation of `target`, based on `type`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toPrimitive.js
 *
 * @param {*} target The target value
 * @param {string} type The primitive type
 * @param {boolean} [strict = false] Specifies if casting ambiguity should be avoided
 * @returns {*} Returns the casted value
 */
module.exports = function toPrimitive(target, type, strict) {

    // Asserting
    assertArgument(isString(type, true), 2, 'string');

    // Returning
    if (target === 'null' || target === null) { return null; }
    if (type === 'boolean') { return toBoolean(target, strict); }
    if (type === 'date') { return toDate(target); }
    if (type === 'number') { return toFinite(target, strict); }
    if (type === 'string' && isPrimitive(target)) { return toString(target); }
};
