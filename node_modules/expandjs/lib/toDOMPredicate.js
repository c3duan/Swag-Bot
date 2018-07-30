/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const ArgumentError = require('./ArgumentError'),
    isElement       = require('./isElement'),
    isFunction      = require('./isFunction'),
    isString        = require('./isString'),
    isVoid          = require('./isVoid'),
    matches         = require('./matches');

/**
 * Returns a DOM filter representation of `target`.
 *
 * ```html
 * <div class="food" data-type"candy">
 * <div class="food" data-type="apples">
 * <div class="drink" data-type="beer">
 *
 * <script type="module">
 *     let elements  = document.querySelectorAll('.food'),
 *         predicate = XP.toDOMPredicate(el => el.dateset.type === 'candy');
 *
 *     Array.from(elements).find(predicate);
 *     // => <div class="food" data-type="candy">
 * </script>
 * ```
 *
 * @function toDOMPredicate
 * @since 1.0.0
 * @category caster
 * @description Returns a DOM filter representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toDOMPredicate.js
 *
 * @param {Function | string} target The target value
 * @returns {Function} Returns the casted value
 */
module.exports = function toDOMPredicate(target) {

    // Returning
    if (isFunction(target)) { return function (element) { return isElement(element) && target(...arguments); }; }
    if (isString(target, true)) { return function (element) { return isElement(element) && matches(element, target); }; }
    if (isString(target) || isVoid(target)) { return function (element) { return isElement(element); }; }

    // Throwing
    throw new ArgumentError(1, 'Function or string');
};
