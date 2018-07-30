/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isNode = require('./isNode');

/**
 * Checks if `value` is an `HTMLElement`.
 *
 * ```js
 * XP.isElement(document.body);
 * // => true
 *
 * XP.isElement('<body>');
 * // => false
 * ```
 *
 * @function isElement
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an `HTMLElement`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isElement.js
 *
 * @param {*} value The target value
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isElement(value) {

    // Returning
    return isNode(value, 1);
};
