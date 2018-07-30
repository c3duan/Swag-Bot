/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isNode           = require('./isNode'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    matches          = require('./matches');

/**
 * Returns the `node`'s last parent.
 *
 * A 3rd parameter can be provided to specify a `boundary` node, where the search needs to stop.
 *
 * ```html
 * <ul id="list">
 *     <li class="subheader">
 *         <ul id="sublist">
 *             <li class="item-1"></li>
 *             <li class="item-2"></li>
 *             <li class="item-3"></li>
 *             <li class="item-4"></li>
 *             <li class="item-5"></li>
 *             <li class="item-6"></li>
 *             <li class="item-7"></li>
 *         </ul>
 *     </li>
 * </ul>
 *
 * <script>
 *     let el = document.querySelector('.item-4');
 *     // => <li class="item-4"></li>
 *
 *     XP.findLastParentElement(el, 'ul');
 *     // => <ul id="list">...</ul>
 *
 *     XP.findLastParentElement(el, 'ul', document.querySelector('.subheader'));
 *     // => <ul id="sublist">...</ul>
 * </script>
 * ```
 *
 * @function findLastParentElement
 * @since 1.0.0
 * @category dom
 * @description Returns the `node`'s last parent
 * @source https://github.com/expandjs/expandjs/blog/master/lib/findLastParentElement.js
 *
 * @param {Node} node The target node
 * @param {string} selector The query selector that matches the parent
 * @param {Node} [boundary] The boundary node where the search needs to stop
 * @returns {Element} Returns the found parent
 */
module.exports = function findLastParentElement(node, selector, boundary) {

    // Asserting
    assertArgument(isNode(node), 1, 'Node');
    assertArgument(isString(selector, true), 2, 'string');
    assertArgument(isVoid(boundary) || isNode(boundary), 3, 'Node');

    // Let
    let result;

    // Cycling DOM
    while (node && node !== boundary) {
        node   = node.parentNode || node.host;
        result = node && node.nodeType === 1 && matches(node, selector) ? node : result;
    }

    // Returning
    return result;
};
