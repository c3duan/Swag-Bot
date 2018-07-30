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
 * Removes a class from the provided `element`.
 *
 * ```html
 * <div id="target" class="foo"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" class="foo"></div>
 *
 *     XP.removeClass(el, 'foo');
 *     // => <div id="target"></div>
 * </script>
 * ```
 *
 * @function removeClass
 * @since 1.0.0
 * @category dom
 * @description Removes a class from the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/removeClass.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the class to remove
 * @returns {Element} Returns `element`
 */
module.exports = function removeClass(element, name) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Removing
    if (element && name) { element.classList.remove(name); }

    // Returning
    return element;
};
