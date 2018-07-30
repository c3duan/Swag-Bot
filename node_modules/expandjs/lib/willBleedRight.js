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
 * Checks if the element defined by the `boundings` and `margin` bleeds out on the right side of the viewport.
 *
 * ```html
 * <style>
 *     .item {
 *         position: absolute;
 *         height: 100vh;
 *         width: 100vw;
 *     }
 *     .item.two {
 *         margin-top: 10vw;
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
 *     XP.willBleedRight(bounds[0], margins[0]);
 *     // => false
 *
 *     XP.willBleedRight(bounds[1], margins[1]);
 *     // => true
 * </script>
 * ```
 *
 * @function willBleedRight
 * @since 1.0.0
 * @category dom
 * @description Checks if the element defined by the `boundings` and `margin` bleeds out on the right side of the viewport
 * @source https://github.com/expandjs/expandjs/blog/master/lib/willBleedRight.js
 *
 * @param {Object} boundings The bounding rect of the element
 * @param {Object} margin The margins rect of the element
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function willBleedRight(boundings, margin) {

    // Asserting
    assertArgument(isObject(boundings), 1, 'Object');
    assertArgument(isObject(margin), 2, 'Object');

    // Returning
    return boundings.left + margin.left + boundings.width + margin.right > Math.floor(global.innerWidth);
};
