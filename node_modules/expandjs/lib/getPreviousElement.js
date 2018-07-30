/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    getPrevious      = require('./getPrevious'),
    isNode           = require('./isNode');

/**
 * Returns the immediate left sibling of the provided `node`.
 *
 * ```html
 * <ul id="list">
 *     <li class="item one disabled"></li>
 *     <li class="item two active"></li>
 *     <li class="item three"></li>
 *     <li class="item four active"></li>
 *     <li class="item five disabled"></li>
 *     <li class="item six"></li>
 *     <li class="item seven disabled"></li>
 * </ul>
 *
 * <script>
 *     let el = document.querySelector('.seven');
 *     // => <li class="item seven disabled"></li>
 *
 *     XP.getPreviousElement(el);
 *     // => <li class="item six"></li>
 * </script>
 * ```
 *
 * @function getPreviousElement
 * @since 1.0.0
 * @category dom
 * @description Returns the immediate left sibling of the provided `node`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getPreviousElement.js
 *
 * @param {Node} node The target node
 * @returns {Node} Returns the `node`'s previous sibling
 */
module.exports = function getPreviousElement(node) {

    // Asserting
    assertArgument(isNode(node), 1, 'Element');

    // Returning
    return getPrevious(node.parentNode.children, node);
};
