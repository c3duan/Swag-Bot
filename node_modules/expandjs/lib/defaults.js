/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _defaults    = require('lodash/defaults'),
    assertArgument = require('./assertArgument'),
    isObject       = require('./isObject');

/**
 * Assigns own and inherited enumerable properties of source objects to the destination `object` for all destination properties that resolve to `undefined`.
 * Once a property is set, additional values of the same property are ignored.
 * Source objects are applied from left to right.
 *
 * ```js
 * XP.defaults({a: 1}, {b: 2}, {a: 3});
 // => {a: 1, b: 2}
 * ```
 *
 * @function defaults
 * @since 1.0.0
 * @category object
 * @description Assigns own and inherited enumerable properties of source objects to the destination `object` for all destination properties that resolve to `undefined`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/defaults.js
 *
 * @param {Object} object The target object
 * @param {...Object} [sources] The source objects
 * @returns {Object} Returns `object`
 */
module.exports = function defaults(object, ...sources) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');

    // Returning
    return _defaults(object, ...sources.filter(source => isObject(source)));
};
