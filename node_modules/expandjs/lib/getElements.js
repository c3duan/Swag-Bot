/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    findElements     = require('./findElements'),
    isElement        = require('./isElement'),
    isNode           = require('./isNode'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Returns the descendant elements matching the provided `selector`.
 *
 * ```html
 * <div id="target">
 *     <div class="item one"></div>
 *     <div class="item two"></div>
 * </div>
 *
 * <script>
 *     let list = XP.getElements('#target');
 *     // => [<div id="target">...</div>]
 *
 *     XP.getElements(list[0], '.item');
 *     // => [<div class="item one"></div>, <div class="item two"></div>]
 * </script>
 * ```
 *
 * @function getElements
 * @since 1.0.0
 * @category dom
 * @description Returns the descendant elements matching the provided `selector`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getElements.js
 *
 * @param {Node | string} [root = document] The root element
 * @param {string} [selector] The query selector to match
 * @returns {Array} Returns the found elements
 */
module.exports = function getElements(root, selector) {

    // Preparing
    if (isString(root, true)) { selector = root; root = document; }

    // Asserting
    assertArgument(isNode(root), 1, 'Node');
    assertArgument(isVoid(selector) || isString(selector, true), 2, 'string');

    // Finding
    if (isVoid(selector)) { return findElements(isElement(root) ? root : root.body, selector); }

    // Querying
    return Array.from(root[root.queryAllEffectiveChildren ? 'queryAllEffectiveChildren' : 'querySelectorAll'](selector));
};
