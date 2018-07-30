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
    toDOMPredicate  = require('./toDOMPredicate');

/**
 * Returns a DOM identity representation of `target`.
 *
 * ```html
 * <div class="food" data-type"candy">
 * <div class="food" data-type="apples">
 * <div class="drink" data-type="beer">
 *
 * <script type="module">
 *     let elements = document.querySelectorAll('.food'),
 *         identity = XP.toDOMIdentity(el => el.dateset.type === 'candy');
 *
 *     Array.from(elements).find(identity);
 *     // => <div class="food" data-type="candy">
 * </script>
 * ```
 *
 * @function toDOMIdentity
 * @since 1.0.0
 * @category caster
 * @description Returns a DOM identity representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toDOMIdentity.js
 *
 * @param {Element | Function | string} target The target value
 * @returns {Function} Returns the casted value
 */
module.exports = function toDOMIdentity(target) {

    // Returning
    if (isElement(target)) { return function (element) { return element === target; }; }
    if (isString(target, true) || isFunction(target)) { return toDOMPredicate(target); }
    if (isString(target) || isVoid(target)) { return function () {}; }

    // Throwing
    throw new ArgumentError(1, 'Element, Function or string');
};
