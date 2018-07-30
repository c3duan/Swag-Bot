/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _zipObjectDeep = require('lodash/zipObjectDeep'),
    assertArgument   = require('./assertArgument'),
    toArray          = require('./toArray');

/**
 * This method is like `zipObject` except that it supports property paths.
 *
 * ```js
 * XP.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
 // => {a: {b: [{c: 1}, {d: 2}]}}
 * ```
 *
 * @function zipObjectDeep
 * @since 1.0.0
 * @category array
 * @description This method is like `zipObject` except that it supports property paths
 * @source https://github.com/expandjs/expandjs/blog/master/lib/zipObjectDeep.js
 *
 * @param {Array | string} props The property identifiers
 * @param {Array | *} [values = []] The property values
 * @returns {Object} Returns the new object
 */
module.exports = function zipObjectDeep(props, values) {

    // Asserting
    assertArgument(props = toArray(props), 1, 'ArrayLike');
    assertArgument(values = toArray(values), 2, 'ArrayLike');

    // Returning
    return _zipObjectDeep(props, values);
};
