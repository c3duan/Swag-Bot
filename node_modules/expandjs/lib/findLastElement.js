/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    getNodes         = require('./getNodes'),
    isNode           = require('./isNode'),
    toDOMIdentity    = require('./toDOMIdentity');

/**
 * Iterates over `node`'s children, returning the last child `identity` returns truthy for.
 * The `identity` is invoked with three arguments: (`value`, `index|key`, `children`).
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
 *     let el = document.querySelector('#list');
 *     // => <ul id="list">...</ul>
 *
 *     XP.findLastElement(el, '.item');
 *     // => <li class="item seven disabled"></li>
 *
 *     XP.findLastElement(el, '.item', '.active');
 *     // => <li class="item four active"></li>
 * </script>
 * ```
 *
 * @function findLastElement
 * @since 1.0.0
 * @category dom
 * @description Iterates over `node`'s children, returning the last child `identity` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findLastElement.js
 *
 * @param {Node} node The target node
 * @param {Element | Function | string} identity The identity of the node to find
 * @returns {Element} Returns the last found child
 */
module.exports = function findLastElement(node, identity) {

    // Asserting
    assertArgument(isNode(node), 1, 'Node');
    assertArgument(identity = toDOMIdentity(identity), 2, 'Element, Function, Object or string');

    // Returning
    return getNodes(node).reverse().find(identity);
};
