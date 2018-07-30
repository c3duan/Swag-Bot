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
    toArray          = require('./toArray');

/**
 * Returns a key-value map of the provided `element`'s attributes.
 *
 * ```html
 * <div id="target" foo="bar" bar="foo"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" foo="bar" bar="foo"></div>
 *
 *     XP.getAttributes(el);
 *     // => {foo: 'bar', bar: 'foo'}
 *
 *     XP.getAttributes(el, ['foo']);
 *     // => {foo: 'bar'}
 *
 *     XP.getAttributes(el, ['foobar']);
 *     // => {}
 * </script>
 * ```
 *
 * @function getAttributes
 * @since 1.0.0
 * @category dom
 * @description Returns a key-value map of the provided `element`'s attributes
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getAttributes.js
 *
 * @param {Element} element The target element
 * @param {Array} [names] The list of attribute names
 * @returns {Object} Returns a key-value map of the provided attributes
 */
module.exports = function getAttributes(element, names) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');
    assertArgument(isVoid(names) || (names = toArray(names)), 2, 'ArrayLike');

    // Returning
    return Array.from(names || element.attributes).reduce((result, attr) => {
        result[names ? attr : attr.name] = names ? element.getAttribute(attr) : attr.value;
        return result;
    }, {});
};
