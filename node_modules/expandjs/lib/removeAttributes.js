/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isVoid           = require('./isVoid'),
    toArray          = require('./toArray');

/**
 * Removes a list of attributes from the provided `element`.
 *
 * ```html
 * <div id="target" foo bar></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" foo bar></div>
 *
 *     XP.removeAttribute(el, ['foo', 'bar']);
 *     // => <div id="target"></div>
 * </script>
 * ```
 *
 * @function removeAttributes
 * @since 1.0.0
 * @category dom
 * @description Removes a list of attributes from the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/removeAttributes.js
 *
 * @param {Element} [element] The target element
 * @param {Array} [names] The list of attributes to remove
 * @returns {Element} Returns `element`
 */
module.exports = function removeAttributes(element, names) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(names) || (names = toArray(names)), 2, 'ArrayLike');

    // Removing
    if (element && names) { names.forEach(name => element.removeAttribute(name)); }

    // Returning
    return element;
};
