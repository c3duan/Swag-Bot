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
 * Appends a `child` to the provided `element`, returning the newly created node.
 *
 * ```html
 * <div id="target">
 *     <div id="inner"></div>
 * </div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target">...</div>
 *
 *     XP.appendChild(el, document.createElement('p'));
 *     // => <p></p>
 *
 *     console.log(el);
 *     // => <div id="target">
 *               <div id="inner"></div>
 *               <p></p>
 *           </div>
 * </script>
 * ```
 *
 * @function appendChild
 * @since 1.0.0
 * @category dom
 * @description Appends a `child` to the provided `element`, returning the newly created node
 * @source https://github.com/expandjs/expandjs/blog/master/lib/appendChild.js
 *
 * @param {Element} [element] The target element
 * @param {Node} [child] The node to append
 * @returns {Node} Returns the appended node
 */
module.exports = function appendChild(element, child) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(child) || isNode(child), 2, 'Node');

    // Preventing
    if (!element || !child) { return; }

    // Returning
    return element.appendChild(child);
};
