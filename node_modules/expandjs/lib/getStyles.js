/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isVoid           = require('./isVoid'),
    isElement        = require('./isElement'),
    pick             = require('./pick'),
    toArray          = require('./toArray');

/**
 * Returns the values of the specified `element`'s CSS properties.
 * If not specified, all the properties will be returned.
 *
 * ```html
 * <style>
 *     #target {width: 50px}
 * </style>
 *
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.getStyles(el, ['width', 'position']);
 *     // => {position: 'static, width: '50px'}
 *
 *     XP.getStyles(el);
 *     // => {alignContent: 'stretch', alignItems: 'start', ...}
 * </script>
 * ```
 *
 * @function getStyles
 * @since 1.0.0
 * @category dom
 * @description Returns the values of the specified `element`'s CSS properties
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getStyles.js
 *
 * @param {Element} element The target element
 * @param {Array} [names] The names of the specified CSS properties
 * @returns {Object} Returns a key-value map of the specified CSS properties
 */
module.exports = function getStyles(element, names) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');
    assertArgument(isVoid(names) || (names = toArray(names)), 2, 'ArrayLike');

    // Let
    let styles = global.getComputedStyle(element);

    // Returning
    return names ? pick(styles, names) : Object.assign({}, styles);
};
