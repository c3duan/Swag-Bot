/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _pickBy      = require('lodash/pickBy'),
    assertArgument = require('./assertArgument'),
    isFunction     = require('./isFunction'),
    isObject       = require('./isObject');

/**
 * Returns an object composed of the `object` properties `predicate` returns truthy for.
 * The `predicate` is invoked with two arguments: (`value`, `key`).
 *
 * ```js
 * XP.pickBy({a: 1, b: 2, c: 3}, n => n % 2);
 * // => {a: 1, c: 3}
 * ```
 *
 * @function pickBy
 * @since 1.0.0
 * @category object
 * @description Returns an object composed of the `object` properties `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/pickBy.js
 *
 * @param {Object} object The target object
 * @param {Function} predicate The function invoked per property
 * @returns {Object} Returns the new object
 */
module.exports = function pickBy(object, predicate) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');
    assertArgument(isFunction(predicate), 2, 'Function');

    // Returning
    return _pickBy(object, predicate);
};
