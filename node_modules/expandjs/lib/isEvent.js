/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isVoid = require('./isVoid');

/**
 * Checks if `value` is an `Event`.
 *
 * @function isEvent
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an `Event`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isEvent.js
 *
 * @param {*} value The target value
 * @param {string} [type] Specifies the event type to check
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isEvent(value, type) {

    // Returning
    return Boolean(value && value.type && value.preventDefault && value.stopPropagation && (isVoid(type) || value.type === type));
};
