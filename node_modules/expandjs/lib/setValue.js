/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArray          = require('./isArray'),
    isElement        = require('./isElement'),
    isVoid           = require('./isVoid'),
    toBoolean        = require('./toBoolean'),
    toFinite         = require('./toFinite'),
    toString         = require('./toString');

/**
 * Set the value of an input `element`.
 *
 * @function setValue
 * @since 1.0.0
 * @category dom
 * @description Set the value of an input `element`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/setValue.js
 *
 * @param {Element} element The target element
 * @param {*} value The value to set
 * @returns {Element} Returns `element`
 */
module.exports = function setValue(element, value) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');

    // Switching
    switch (element && element.type) {
        case 'checkbox': return Object.assign(element, {checked: isArray(value) ? value.includes(element.value) : toBoolean(value)});
        case 'radio': return Object.assign(element, {checked: element.value === toString(value)});
        case 'number': return Object.assign(element, {value: toString(toFinite(value))});
        case 'range': return Object.assign(element, {value: toString(toFinite(value))});
        case 'file': return element;
    }

    // Returning
    return Object.assign(element, {value: isVoid(value) ? '' : toString(value)});
};
