/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isNode           = require('./isNode'),
    isString         = require('./isString');

/**
 * Returns the first element matching the provided `id`.
 *
 * ```html
 * <div id="target">
 *     <div id="item1"></div>
 *     <div id="item2"></div>
 * </div>
 *
 * <script>
 *     let el = XP.getElementById('target');
 *     // => <div id="target">...</div>
 *
 *     XP.getElementById(el, 'item2');
 *     // => <div id="item2"></div>
 * </script>
 * ```
 *
 * @function getElementById
 * @since 1.0.0
 * @category dom
 * @description Returns the first element matching the provided `id`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getElementById.js
 *
 * @param {Node | string} [root = document] The root element
 * @param {string} [id] The id to match
 * @returns {Element} Returns the found element
 */
module.exports = function getElementById(root, id) {

    // Preparing
    if (isString(root, true)) { id = root; root = global.document; }

    // Asserting
    assertArgument(isNode(root, 9), 1, 'HTMLDocument');
    assertArgument(isString(id, true), 2, 'string');

    // Getting
    return root.getElementById(id) || undefined;
};
