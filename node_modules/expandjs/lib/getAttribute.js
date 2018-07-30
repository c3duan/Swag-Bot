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
 * Returns the value of an `element`'s attribute.
 * If the given attribute doesn't exist, returns `null`.
 *
 * ```html
 * <div id="target" foo="bar"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" foo="bar"></div>
 *
 *     XP.getAttribute(el, 'foo');
 *     // => 'bar'
 *
 *     XP.getAttribute(el, 'bar');
 *     // => null
 * </script>
 * ```
 *
 * @function getAttribute
 * @since 1.0.0
 * @category dom
 * @description Returns the value of an `element`'s attribute
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getAttribute.js
 *
 * @param {Element} element The target element
 * @param {string} name The attribute's name
 * @returns {string} Returns the attribute's value
 */
module.exports = function getAttribute(element, name) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');
    assertArgument(isString(name, true), 2, 'string');

    // Returning
    return element.getAttribute(name);
};
