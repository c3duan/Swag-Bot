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
 * Returns the value of an `element`'s CSS property.
 *
 * ```html
 * <style>
 *     #target {width: 50px}
 * </style>
 *
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.getStyle(el, 'width');
 *     // => '50px'
 *
 *     XP.getStyle(el, 'position');
 *     // => 'static'
 * </script>
 * ```
 *
 * @function getStyle
 * @since 1.0.0
 * @category dom
 * @description Returns the value of an `element`'s CSS property
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getStyle.js
 *
 * @param {Element} element The target element
 * @param {string} name The name of the CSS property
 * @returns {string} Returns the value of the provided CSS property
 */
module.exports = function getStyle(element, name) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');
    assertArgument(isString(name, true), 2, 'string');

    // Returning
    return global.getComputedStyle(element)[name];
};
