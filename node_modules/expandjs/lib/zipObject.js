/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArrayLike      = require('./isArrayLike'),
    toArray          = require('./toArray');

/**
 * Returns an object composed from an array property identifiers and one of corresponding values.
 *
 * ```js
 * XP.zipObject(['a', 'b'], [1, 2]);
 * // => {a: 1, b: 2}
 *
 * XP.zipObject(['a', 'b'], 1);
 * // => {a: 1, b: 1}
 * ```
 *
 * @function zipObject
 * @since 1.0.0
 * @category array
 * @description Returns an object composed from an array property identifiers and one of corresponding values
 * @source https://github.com/expandjs/expandjs/blog/master/lib/zipObject.js
 *
 * @param {Array | string} props The property names
 * @param {Array | *} [values = []] The property values
 * @returns {Object} Returns the new object
 */
module.exports = function zipObject(props, values) {

    // Asserting
    assertArgument(props = toArray(props), 1, 'ArrayLike');

    // Let
    let multi = isArrayLike(values);

    // Returning
    return props.reduce((result, key, i) => { result[key] = multi ? values[i] : values; return result; }, {});
};
