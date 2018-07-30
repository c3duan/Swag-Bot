/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    findElement      = require('./findElement'),
    isNode           = require('./isNode'),
    trim             = require('./trim');

/**
 * Check for the presence of an effective child on the provided `element`.
 *
 * ```html
 * <ul id="target">
 *     <li class="one"></li>
 *     This is a text node
 *     <li class="two"></li>
 * </ul>
 *
 * <script>
 *     XP.hasChildren(document.querySelector('#target'));
 *     // => true
 *
 *     XP.hasChildren(document.querySelector('.one'))
 *     // => false
 * </script>
 * ```
 *
 * @function hasChildren
 * @since 1.0.0
 * @category dom
 * @description Check for the presence of an effective child on the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/hasChildren.js
 *
 * @param {Node} node The target node
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function hasChildren(node) {

    // Asserting
    assertArgument(isNode(node), 1, 'Element');

    // Returning
    return Boolean(findElement(node, node => {
        if (node.nodeType === 1 && node.tagName === 'TEMPLATE') { return false; }
        if (node.nodeType === 3 && !trim(node.textContent, '\r\n ')) { return false; }
        return true;
    }));
};
