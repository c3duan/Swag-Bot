/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _mergeWith   = require('lodash/mergeWith'),
    assertArgument = require('./assertArgument'),
    isArray        = require('./isArray'),
    isDefined      = require('./isDefined'),
    isFunction     = require('./isFunction'),
    isObject       = require('./isObject');

/**
 * Recursively merges own and inherited enumerable properties of source objects into the destination `object`.
 * Source properties that resolve to `undefined` are skipped if a destination value exists.
 * Array and plain object properties are merged recursively.
 * Other objects and value types are overridden by assignment.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * A function can be provided as last parameter to specify a `customizer`, which is invoked to produce the merged values of the destination and source properties.
 * If `customizer` returns `undefined`, merging is handled by the method instead.
 * The `customizer` is invoked with six arguments: (`objValue`, `srcValue`, `key`, `object`, `source`, `stack`).
 *
 * ```js
 * let object = {a: [{b: 2}, {d: 4}]},
 *     other  = {a: [{c: 3}, {e: 5}]};
 *
 * XP.merge(object, other);
 * // => {a: [{b: 2, c: 3}, {d: 4, e: 5}]}
 * ```
 *
 * @function merge
 * @since 1.0.0
 * @category object
 * @description Recursively merges own and inherited enumerable properties of source objects into the destination `object`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/merge.js
 *
 * @param {Object} object The target object
 * @param {...Object} [sources] The source objects
 * @returns {Object} Returns `object`
 */
module.exports = function merge(object, ...sources) {

    // Asserting
    assertArgument(isObject(object), 1, 'Object');

    // Let
    let customizer = sources[sources.length - 1],
        custom     = Number(isFunction(customizer));

    // Preparing
    sources.splice(sources.length - custom, custom, (pre, post) => {
        let result = custom ? customizer(...arguments) : undefined;
        return isDefined(result) ? result : (isArray(post) ? post : undefined);
    });

    // Merging
    return _mergeWith(object, ...sources);
};
