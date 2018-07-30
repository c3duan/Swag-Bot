/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _pick        = require('lodash/pick'),
    assertArgument = require('./assertArgument'),
    isElement      = require('./isElement');

/**
 * Returns an object representing the size of `element` and its position relative to the viewport.
 *
 * ```html
 * <style>
 *     #target {
 *         height: 100px;
 *         left: 0;
 *         margin: 10px;
 *         position: absolute;
 *         top: 0;
 *         width: 100px;
 *     }
 * </style>
 *
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.getBoundings(el);
 *     // => {bottom: 110, height: 100, left: 10, right: 110, top: 10, width: 100}
 * </script>
 * ```
 *
 * @function getBoundings
 * @since 1.0.0
 * @category dom
 * @description Returns an object representing the size of `element` and its position relative to the viewport
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getBoundings.js
 *
 * @param {Element} element The target element
 * @returns {Object} Returns the `element`'s bounding client rectangle
 */
module.exports = function getBoundings(element) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');

    // Returning
    return _pick(element.getBoundingClientRect(), ['bottom', 'height', 'left', 'right', 'top', 'width']);
};
