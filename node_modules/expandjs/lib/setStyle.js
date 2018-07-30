/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isBoolean        = require('./isBoolean'),
    isElement        = require('./isElement'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    removeStyle      = require('./removeStyle'),
    toString         = require('./toString');

/**
 * Sets an inline style on the provided `element`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.setStyle(el, 'height', '10px');
 *     // => <div id="target" style="height: 10px;"></div>
 *
 *     XP.setStyle(el, 'height', null);
 *     // => <div id="target" style=""></div>
 * </script>
 * ```
 *
 * @function setStyle
 * @since 1.0.0
 * @category dom
 * @description Sets an inline style on the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/setStyle.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the style to set
 * @param {*} [value] The value for the style to set
 * @returns {Element} Returns `element`
 */
module.exports = function setStyle(element, name, value) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Removing
    if (isVoid(value) || isBoolean(value)) { return removeStyle(element, name); }

    // Setting
    if (element && name) { element.style[name] = toString(value); }

    // Returning
    return element;
};
