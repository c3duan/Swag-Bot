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
 * Removes an inline style from the provided `element`.
 *
 * ```html
 * <div id="target" style="height: 100px; background: red;"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" style="height: 100px; background: red;"></div>
 *
 *     XP.removeStyle(el, 'background');
 *     // => <div id="target" style="height: 100px"></div>
 * </script>
 * ```
 *
 * @function removeStyle
 * @since 1.0.0
 * @category dom
 * @description Removes an inline style from the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/removeStyle.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the style to remove
 * @returns {Element} Returns `element`
 */
module.exports = function removeStyle(element, name) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name, true), 2, 'string');

    // Removing
    if (element && name) { element.style[name] = ''; }

    // Returning
    return element;
};
