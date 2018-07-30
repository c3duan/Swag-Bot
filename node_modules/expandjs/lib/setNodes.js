/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isVoid           = require('./isVoid'),
    toArray          = require('./toArray');

/**
 * Replaces the `element`'s children with the new `nodes`.
 *
 * ```html
 * <div id="target">
 *     <div id="first"></div>
 * </div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target">...</div>
 *
 *     let nodes = [];
 *     nodes.push(document.createElement('div'));
 *     nodes.push(document.createElement('div'));
 *     nodes[0].id = 'second';
 *     nodes[0].id = 'third';
 *
 *     XP.setNodes(el, nodes);
 *     // => <div id="target">
 *               <div id="second"></div>
 *               <div id="third"></div>
 *           </div>
 * </script>
 * ```
 *
 * @function setNodes
 * @since 1.0.0
 * @category dom
 * @description Replaces the `element`'s children with the new `nodes`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/setNodes.js
 *
 * @param {Element} [element] The target element
 * @param {Array} [nodes] The child nodes that will replace the actual children
 * @returns {Element} Returns `element`
 */
module.exports = function setNodes(element, nodes) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(nodes) || (nodes = toArray(nodes)), 2, 'ArrayLike');

    // Resetting
    if (element) { element.innerHTML = ''; }

    // Appending
    if (element && nodes) { nodes.forEach(node => element.appendChild(node)); }

    // Returning
    return element;
};
