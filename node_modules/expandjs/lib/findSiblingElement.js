/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    getAllSiblings   = require('./getAllSiblings'),
    isNode           = require('./isNode'),
    toDOMIdentity    = require('./toDOMIdentity');

/**
 * Iterates over `node`'s siblings, returning the first node `identity` returns truthy for.
 * The `identity` is invoked with three arguments: (`value`, `index|key`, `siblings`).
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
 *     XP.findPreviousElement(el, '.item');
 *     // => <li class="item six"></li>
 *
 *     XP.findPreviousElement(el, '.item', '.disabled');
 *     // => <li class="item five disabled"></li>
 * </script>
 * ```
 *
 * @function findPreviousElement
 * @since 1.0.0
 * @category dom
 * @description Iterates over `node`'s siblings, returning the first node `identity` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findPreviousElement.js
 *
 * @param {Node} node The target node
 * @param {Element | Function | string} identity The identity of the node to find
 * @returns {Element} Returns the found sibling
 */
module.exports = function findPreviousElement(node, identity) {

    // Asserting
    assertArgument(isNode(node), 1, 'Element');
    assertArgument(identity = toDOMIdentity(identity), 2, 'Element, Function, Object or string');

    // Returning
    return getAllSiblings(node.parentNode.children, node).find(identity);
};
