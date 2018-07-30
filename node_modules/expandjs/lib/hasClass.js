/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isString         = require('./isString');

/**
 * Checks for the presence of a class on the provided `element`.
 *
 * ```html
 * <div id="target" class="foo"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" class="foo"></div>
 *
 *     XP.hasClass(elem, 'foo');
 *     // => true
 *
 *     XP.hasClass(elem, 'bar');
 *     // => false
 * </script>
 * ```
 *
 * @function hasClass
 * @since 1.0.0
 * @category dom
 * @description Checks for the presence of a class on the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/hasClass.js
 *
 * @param {Element} element The target element
 * @param {string} name The name of the specified class
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function hasClass(element, name) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');
    assertArgument(isString(name, true), 2, 'string');

    // Returning
    return element.classList.contains(name);
};
