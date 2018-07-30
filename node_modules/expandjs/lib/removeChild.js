/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isNode           = require('./isNode'),
    isVoid           = require('./isVoid');

/**
 * Removes a child from the provided `element`.
 *
 * ```html
 * <div id="target">
 *     <div class="inner"></div>
 * </div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target">...</div>
 *
 *     XP.removeChild(el, document.querySelector('.inner'));
 *     // => <div class="inner"></div>
 * </script>
 * ```
 *
 * @function removeChild
 * @since 1.0.0
 * @category dom
 * @description Removes a child from the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/removeChild.js
 *
 * @param {Element} [element] The target node
 * @param {Node} [child] The child node to remove
 * @returns {Node} The removed child
 */
module.exports = function removeChild(element, child) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(child) || isNode(child), 2, 'Node');

    // Removing
    if (element && child) { element.removeChild(child); }

    // Returning
    return child;
};
