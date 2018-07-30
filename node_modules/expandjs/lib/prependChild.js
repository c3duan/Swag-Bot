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
 * Prepend a `child` to the provided `element`, returning the newly created node.
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
 *     XP.prependChild(el, document.createElement('p'));
 *     // => <p></p>
 *
 *     console.log(el);
 *     // => <div id="target">
 *               <p></p>
 *               <div id="inner"></div>
 *           </div>
 * </script>
 * ```
 *
 * @function prependChild
 * @since 1.0.0
 * @category dom
 * @description Prepend a `child` to the provided `element`, returning the newly created node
 * @source https://github.com/expandjs/expandjs/blog/master/lib/prependChild.js
 *
 * @param {Element} [element] The target element
 * @param {Node} [child] The node to prepend
 * @returns {Node} Returns the prepended node
 */
module.exports = function prependChild(element, child) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(child) || isNode(child), 2, 'Node');

    // Inserting
    if (element && child) { element.insertBefore(child, element.firstChild); }

    // Returning
    return child;
};
