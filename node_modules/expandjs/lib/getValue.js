/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isElement        = require('./isElement'),
    isIndex          = require('./isIndex'),
    isVoid           = require('./isVoid'),
    toFinite         = require('./toFinite'),
    toString         = require('./toString');

/**
 * Returns the value of an input `element`.
 *
 * @function getValue
 * @since 1.0.0
 * @category dom
 * @description Returns the value of an input `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/getValue.js
 *
 * @param {Element} element The target element
 * @param {number} [index] The element's index
 * @returns {*} Returns the element's value
 */
module.exports = function getValue(element, index) {

    // Asserting
    assertArgument(isElement(element), 1, 'Element');
    assertArgument(isVoid(index) || isIndex(index), 2, 'number');

    // Switching
    switch (element.type) {
        case 'checkbox': return index >= 0 ? (element.checked ? element.value || null : undefined) : Boolean(element.checked);
        case 'radio': return element.checked ? element.value || null : undefined;
        case 'number': return element.value ? toFinite(element.value) : null;
        case 'range': return element.value ? toFinite(element.value) : null;
        case 'file': return null;
    }

    // Returning
    return toString(element.value) || null;
};
