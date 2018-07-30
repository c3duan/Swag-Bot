/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isFalse          = require('./isFalse'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    removeAttribute  = require('./removeAttribute'),
    toString         = require('./toString');

/**
 * Sets an attribute on the provided `element`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.setAttribute(el, 'foo', '');
 *     // => <div id="target" foo></div>
 *
 *     XP.setAttribute(el, 'foo', 'bar');
 *     // => <div id="target" foo="bar"></div>
 *
 *     XP.setAttribute(el, 'foo', null);
 *     // => <div id="target"></div>
 * </script>
 * ```
 *
 * @function setAttribute
 * @since 1.0.0
 * @category dom
 * @description Sets an attribute on the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/setAttribute.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the attribute to set
 * @param {string} [value] The value of the attribute to set
 * @returns {Element} Returns `element`
 */
module.exports = function setAttribute(element, name, value) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Removing
    if (isVoid(value) || isFalse(value)) { return removeAttribute(element, name); }

    // Setting
    if (element && name) { element.setAttribute(name, value === true ? '' : toString(value)); }

    // Returning
    return element;
};
