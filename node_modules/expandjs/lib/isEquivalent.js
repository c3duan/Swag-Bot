/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isFalse = require('./isFalse'),
    isObject  = require('./isObject'),
    isUseful  = require('./isUseful');

/**
 * Performs a JSON comparison between two values to determine if they are equivalent.
 *
 * ```js
 * let object = {name: 'fred', age: undefined},
 *     other  = {name: 'fred', age: null};
 *
 * object === other;
 * // => false
 *
 * XP.isEqual(object, other);
 * // => false
 *
 * XP.isEquivalent(object, other);
 * // => true
 * ```
 *
 * @function isEquivalent
 * @since 1.0.0
 * @category tester
 * @description Performs a JSON comparison between two values to determine if they are equivalent
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isEquivalent.js
 *
 * @param {*} value The target value
 * @param {*} other The other value to compare
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isEquivalent(value, other) {

    // Polisher
    function polish(key, val) {
        if (isFalse(val) || !isUseful(val)) { return; }
        if (isObject(val)) { return Object.keys(val).sort().reduce((obj, key) => { obj[key] = val[key]; return obj; }, {}); }
        return val;
    }

    // Returning
    return JSON.stringify(value, polish) === JSON.stringify(other, polish);
};
