/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isObject         = require('./isObject'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    setAttribute     = require('./setAttribute'),
    setStyle         = require('./setStyle');

/**
 * Sets a list of inline styles to the provided `element`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.setStyles(el, {height: '10px', width: '10px'});
 *     // => <div id="target" style="height: 10px; width: 10px;"></div>
 *
 *     XP.setStyles(el, 'margin: 10px; padding: 10px;');
 *     // => <div id="target" style="height: 10px; width: 10px; margin: 10px; padding: 10px;"></div>
 * </script>
 * ```
 *
 * @function setStyles
 * @since 1.0.0
 * @category dom
 * @description Sets a list of inline styles to the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/setStyles.js
 *
 * @param {Element} [element] The target element
 * @param {Object | string} [styles] The list of styles to set
 * @returns {Element} Returns `element`
 */
module.exports = function setStyles(element, styles) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(styles) || isObject(styles) || isString(styles), 2, 'Object or string');

    // Let
    let dummy = element ? global.document.createElement('div') : null;

    // Setting
    if (element && isObject(styles)) { Object.keys(styles).forEach(name => setStyle(element, name, styles[name])); }
    if (element && isString(styles)) { Object.keys(setAttribute(dummy, 'style', styles).style).forEach(name => element.style[name] = dummy.style[name]); }

    // Returning
    return element;
};
