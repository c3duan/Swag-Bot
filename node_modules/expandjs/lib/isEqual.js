/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _isEqualWith = require('lodash/isEqualWith'),
    assertArgument = require('./assertArgument'),
    isVoid         = require('./isVoid'),
    isFunction     = require('./isFunction');

/**
 * Performs a deep comparison between two values to determine if they are equivalent.

 * If `customizer` is provided, it is invoked to compare values.

 * If `customizer` returns `undefined`, comparisons are handled by the method instead.

 * The `customizer` is invoked with up to six arguments: (`objValue`, `othValue`, [`index|key`, `object`, `other`, `stack`]).
 *
 * ```js
 * let object = {name: 'fred'},
 *     other  = {name: 'fred'};
 *
 * object === other;
 * // => false
 *
 * XP.isEqual(object, other);
 * // => true
 *
 * let array = ['hi', 'goodbye'],
 *     other = ['hello', 'goodbye'];
 *
 * XP.isEqual(array, other, (a, b) => [a, b].every(val => /^h(?:i|ello)$/.test(val)) || undefined);
 * // => true
 * ```
 *
 * @function isEqual
 * @since 1.0.0
 * @category tester
 * @description Performs a deep comparison between two values to determine if they are equivalent
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isEqual.js
 *
 * @param {*} value The target value
 * @param {*} other The other value to compare
 * @param {Function} [customizer] The function to customize comparisons
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isEqual(value, other, customizer) {

    // Asserting
    assertArgument(isVoid(customizer) || isFunction(customizer), 3, 'Function');

    // Returning
    return _isEqualWith(value, other, customizer);
};
