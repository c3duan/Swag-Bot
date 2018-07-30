/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isObject         = require('./isObject');

/**
 * Checks if the element defined by the `boundings` and `margin` bleeds out on the top side of the viewport.
 *
 * ```html
 * <style>
 *     .item {
 *         position: absolute;
 *         height: 100vh;
 *         width: 100vw;
 *     }
 *     .item.two {
 *         margin-top: -10vw;
 *     }
 * </style>
 *
 * <div class="item one"></div>
 * <div class="item two"></div>
 *
 * <script>
 *     let list    = XP.getElements('.item'),
 *         bounds  = list.map(el => XP.getBoundings(el)),
 *         margins = list.map(el => XP.getMargin(el));
 *
 *     XP.willBleedTop(bounds[0], margins[0]);
 *     // => false
 *
 *     XP.willBleedTop(bounds[1], margins[1]);
 *     // => true
 * </script>
 * ```
 *
 * @function willBleedTop
 * @since 1.0.0
 * @category dom
 * @description Checks if the element defined by the `boundings` and `margin` bleeds out on the top side of the viewport
 * @source https://github.com/expandjs/expandjs/blog/master/lib/willBleedTop.js
 *
 * @param {Object} boundings The bounding rect of the element
 * @param {Object} margin The margins rect of the element
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function willBleedTop(boundings, margin) {

    // Asserting
    assertArgument(isObject(boundings), 1, 'Object');
    assertArgument(isObject(margin), 2, 'Object');

    // Returning
    return boundings.top < 0;
};
