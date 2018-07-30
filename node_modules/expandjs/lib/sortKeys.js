/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isObject         = require('./isObject');

/**
 * Returns a shallow clone of `object` with own enumerable properties sorted alphabetically.
 *
 * @function sortKeys
 * @since 1.0.0
 * @category object
 * @description Returns a shallow clone of `object` with own enumerable properties sorted alphabetically
 * @source https://github.com/expandjs/expandjs/blog/master/lib/sortKeys.js
 *
 * @param {Object} object
 * @returns {object}
 */
module.exports = function sortKeys(object) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');

    // Returning
    return JSON.parse(JSON.stringify(object, (key, val) => {
        if (isObject(val)) { return Object.keys(val).sort().reduce((obj, key) => Object.assign(obj, {[key]: val[key]}), {}); }
        return val;
    }));
};
