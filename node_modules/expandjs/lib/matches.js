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
    isVoid           = require('./isVoid');

/**
 * Checks for the identity of the provided `node`, based on the query `selector`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.matches(elem, '#target');
 *     // => true
 *
 *     XP.matches(elem, '.target');
 *     // => false
 * </script>
 * ```
 *
 * @function matches
 * @since 1.0.0
 * @category dom
 * @description Checks for the identity of the provided `node`, based on the query `selector`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/matches.js
 *
 * @param {Node} node The target node
 * @param {string} selector The query selector to match against
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function matches(node, selector) {

    // Asserting
    assertArgument(isNode(node, 1), 1, 'Element');
    assertArgument(isVoid(selector) || isString(selector), 2, 'string');

    // Let
    let matched = node.node || node,
        matcher = matched.matches || matched.msMatchesSelector;

    // Returning
    return !selector || matcher.call(matched, selector);
};
