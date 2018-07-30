/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Removes an attribute from the provided `element`.
 *
 * ```html
 * <div id="target" foo></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" foo></div>
 *
 *     XP.removeAttribute(el, 'foo');
 *     // => <div id="target"></div>
 * </script>
 * ```
 *
 * @function removeAttribute
 * @since 1.0.0
 * @category dom
 * @description Removes an attribute from the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/removeAttribute.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the attribute to remove
 * @returns {Element} Returns `element`
 */
module.exports = function removeAttribute(element, name) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Removing
    if (element && name) { element.removeAttribute(name); }

    // Returning
    return element;
};
