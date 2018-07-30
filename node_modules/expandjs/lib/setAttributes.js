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
    isVoid           = require('./isVoid'),
    setAttribute     = require('./setAttribute');

/**
 * Sets a list of attributes on the provided `element`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.setAttributes(el, {foo: 'bar'});
 *     // => <div id="target" foo="bar"></div>
 * </script>
 * ```
 *
 * @function setAttributes
 * @since 1.0.0
 * @category dom
 * @description Sets a list of attributes on the provided `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/setAttributes.js
 *
 * @param {Element} [element] The target element
 * @param {Object} [attributes] The map of attributes to set
 * @returns {Element} Returns `element`
 */
module.exports = function setAttributes(element, attributes) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(attributes) || isObject(attributes), 2, 'Object');

    // Setting
    if (element && attributes) { Object.keys(attributes).forEach(name => setAttribute(element, name, attributes[name])); }

    // Returning
    return element;
};
