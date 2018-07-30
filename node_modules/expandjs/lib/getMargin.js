/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    toFinite         = require('./toFinite');

/**
 * Returns the map of `element`'s margin.
 *
 * ```html
 * <style>
 *     #target {margin: 10px}
 * </style>
 *
 * <div id="target"></div>
 *
 * <script>
 *     XP.getMargin(document.querySelector('#target'));
 *     // => {bottom: 10, left: 10, right: 10, top: 10}}
 * </script>
 * ```
 *
 * @function getMargin
 * @since 1.0.0
 * @category dom
 * @description Returns the map of `element`'s margin
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getMargin.js
 *
 * @param {Element} element The target element
 * @returns {Object} Returns the map of `element`'s margin
 */
module.exports = function getMargin(element) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');

    // Let
    let keys  = ['bottom', 'left', 'right', 'top'],
        style = global.getComputedStyle(element);

    // Returning
    return keys.reduce((result, key) => Object.assign(result, {[key]: toFinite(style[`margin-${key}`])}), {});
};
