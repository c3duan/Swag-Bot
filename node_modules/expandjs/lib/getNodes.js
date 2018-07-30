/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isNode           = require('./isNode');

/**
 * Returns the children of `node`.
 *
 * ```html
 * <ul id="target">
 *     <li class="one"></li>
 *     This is a text node
 *     <li class="two"></li>
 * </ul>
 *
 * <script>
 *     XP.getNodes(document.querySelector('#target'));
 *     // => [<li class="one"></li>, "This is a text node", <li class="two"></li>]
 * </script>
 * ```
 *
 * @function getNodes
 * @since 1.0.0
 * @category dom
 * @description Returns the children of `node`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getNodes.js
 *
 * @param {Node} node The target node
 * @returns {Array} Returns the array of children
 */
module.exports = function getNodes(node) {

    // Asserting
    assertArgument(isNode(node), 1, 'Element');

    // Returning
    return Array.from(node.assignedNodes ? node.assignedNodes({flatten: true}) : (node.getEffectiveChildNodes ? node.getEffectiveChildNodes() : node.childNodes));
};
