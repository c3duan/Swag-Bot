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
    toDOMPredicate   = require('./toDOMPredicate');

/**
 * Iterates over `node`'s siblings, returning the nodes `predicate` returns truthy for.
 * The `predicate` is invoked with three arguments: (`value`, `index|key`, `siblings`).
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
 *     let el = document.querySelector('.five');
 *     // => <li class="item five disabled"></li>
 *
 *     XP.findSiblingElements(el, '.item');
 *     // => [<li class="item one disabled"></li>, ...]
 *
 *     XP.findSiblingElements(el, '.item', '.disabled');
 *     // => [<li class="item one disabled"></li>, <li class="item seven disabled"></li>]
 * </script>
 * ```
 *
 * @function findSiblingElements
 * @since 1.0.0
 * @category dom
 * @description Iterates over `node`'s siblings, returning the nodes `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findSiblingElements.js
 *
 * @param {Node} node The target node
 * @param {Function | string} [predicate] The filter to apply
 * @returns {Array} Returns the found siblings
 */
module.exports = function findSiblingElements(node, predicate) {

    // Asserting
    assertArgument(isNode(node), 1, 'Element');
    assertArgument(predicate = toDOMPredicate(predicate), 3, 'Function or string');

    // Returning
    return getAllSiblings(node.parentNode.children, node).filter(predicate);
};
