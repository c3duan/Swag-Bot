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
 * Adds a boolean attribute to `element`, returning the modified `element`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.addAttribute(el, 'foo');
 *     // => <div id="target" foo></div>
 * </script>
 * ```
 *
 * @function addAttribute
 * @since 1.0.0
 * @category dom
 * @description Adds a boolean attribute to `element`, returning the modified `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/addAttribute.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The attribute to add
 * @returns {Element} Returns `element`
 */
module.exports = function addAttribute(element, name) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Setting
    if (element && name) { element.setAttribute(name, ''); }

    // Returning
    return element;
};
