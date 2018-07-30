/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isNode           = require('./isNode'),
    isVoid           = require('./isVoid');

/**
 * Replaces the provided `node` with `other`.
 *
 * ```html
 * <div class="foo" bar>
 *     <div class="first item"></div>
 *     <div class="second item"></div>
 * </div>
 *
 * <script>
 *     let el = document.querySelector('.first');
 *     // => <div class="foo" bar>...</div>
 *
 *     XP.replaceNode(el, document.createTextNode('Replaced node'));
 *     // => 'Replaced node'
 *
 *     console.log(el);
 *     // => <div class="foo" bar>
 *               "Replaced node"
 *               <div class="second item"></div>
 *           </div>
 * </script>
 * ```
 *
 * @function replaceElement
 * @since 1.0.0
 * @category dom
 * @description Replaces the provided `node` with `other`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/replaceElement.js
 *
 * @param {Node} [node] The target node
 * @param {Node} [other] The node that will replace `node`
 * @returns {Node} Returns the newly added node
 */
module.exports = function replaceNode(node, other) {

    // Asserting
    assertArgument(isVoid(node) || isNode(node), 1, 'Node');
    assertArgument(isVoid(other) || isNode(other), 2, 'Node');

    // Returning
    if (node && other) { return node.parentNode.replaceChild(other, node); }
};
