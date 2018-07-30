/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isVoid           = require('./isVoid'),
    isElement        = require('./isElement');

/**
 * Returns the `element`'s height, including the padding and excluding the scrollbars.
 * If no `element` is provided, returns the window's height.
 *
 * ```html
 * <style>
 *     #target {padding: 10px}
 *     #inner  {height: 50px}
 * </style>
 *
 * <div id="target">
 *     <div id="inner"></div>
 * </div>
 *
 * <script>
 *     XP.getHeight(document.querySelector('#target'));
 *     // => 70
 *
 *     XP.getHeight(document.querySelector('#inner'));
 *     // => 50
 * </script>
 * ```
 *
 * @function getHeight
 * @since 1.0.0
 * @category dom
 * @description Returns the `element`'s height, including the padding and excluding the scrollbars
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getHeight.js
 *
 * @param {Element} [element] The target element
 * @returns {number} Returns the `element`'s height
 */
module.exports = function getHeight(element) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');

    // Returning
    return Math.floor(element ? element.getBoundingClientRect().height : global.innerHeight);
};
