/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isNode           = require('./isNode'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    findElement      = require('./findElement');

/**
 * Returns the first descendant element matching the provided `selector`.
 *
 * ```html
 * <div id="target">
 *     <div class="item one"></div>
 *     <div class="item two"></div>
 * </div>
 *
 * <script>
 *     let el = XP.getElement('#target');
 *     // => <div id="target">...</div>
 *
 *     XP.getElement(el, '.one');
 *     // => <div class="item one"></div>
 * </script>
 * ```
 *
 * @function getElement
 * @since 1.0.0
 * @category dom
 * @description Returns the first descendant element matching the provided `selector`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getElement.js
 *
 * @param {Element | HTMLDocument | string} [root = document] The root element
 * @param {string} [selector] The query selector to match
 * @returns {Element} Returns the found element
 */
module.exports = function getElement(root, selector) {

    // Preparing
    if (isString(root, true)) { selector = root; root = global.document; }

    // Asserting
    assertArgument(isElement(root) || isNode(root, 9) || isNode(root, 10), 1, 'Element or HTMLDocument');
    assertArgument(isVoid(selector) || isString(selector, true), 2, 'string');

    // Finding
    if (isVoid(selector)) { return findElement(isNode(root, 9) ? root.body : root, selector); }

    // Querying
    return root[root.queryEffectiveChildren ? 'queryEffectiveChildren' : 'querySelector'](selector) || undefined;
};
