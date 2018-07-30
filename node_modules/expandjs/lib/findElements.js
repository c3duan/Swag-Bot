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
    toDOMPredicate   = require('./toDOMPredicate');

/**
 * Iterates over `node`'s children, returning the children `predicate` returns truthy for.
 * The `predicate` is invoked with three arguments: (`value`, `index|key`, `children`).
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

 *     XP.findElements(el, '.item');
 *     // => [<li class="item one disabled"></li>, ...]
 *
 *     XP.findElements(el, '.item', '.disabled');
 *     // => [<li class="item one disabled"></li>, <li class="item four disabled"></li>, <li class="item seven disabled"></li>]
 * </script>
 * ```
 *
 * @function findElements
 * @since 1.0.0
 * @category dom
 * @description Iterates over `node`'s children, returning the children `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findElements.js
 *
 * @param {Node} node The target node
 * @param {Function | string} [predicate] The filter to apply
 * @returns {Array} Returns the found children
 */
module.exports = function findElements(node, predicate) {

    // Asserting
    assertArgument(isNode(node), 1, 'Element');
    assertArgument(predicate = toDOMPredicate(predicate), 2, 'Function or string');

    // Returning
    return getNodes(node).filter(predicate);
};
