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
 * Adds or removes a boolean attribute from the provided `element`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.toggleAttribute(el, 'foo');
 *     // => <div id="target" foo></div>
 *
 *     XP.toggleAttribute(el, 'foo');
 *     // => <div id="target"></div>
 * </script>
 * ```
 *
 * @function toggleAttribute
 * @since 1.0.0
 * @category dom
 * @description Adds or removes a boolean attribute from the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toggleAttribute.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the attribute to toggle
 * @returns {Element} Returns `element`
 */
module.exports = function toggleAttribute(element, name) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Toggling
    if (element && name) { element[element.hasAttribute(name) ? 'removeAttribute' : 'setAttribute'](name, ''); }

    // Returning
    return element;
};
