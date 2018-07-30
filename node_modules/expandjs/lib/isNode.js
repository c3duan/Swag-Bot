/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDefined = require('./isDefined'),
    isVoid      = require('./isVoid');

/**
 * Checks if `value` is a `Node`.
 *
 * ```js
 * XP.isNode(document.body);
 * // => true
 *
 * XP.isNode(document.body, 9);
 * // => false
 * ```
 *
 * @function isNode
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is a `Node`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isNode.js
 *
 * @param {*} value The target value
 * @param {number} [type] 1:element, 3:text, 8:comment, 9:document, 10:documentType, 11:documentFragment
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isNode(value, type) {

    // Let
    let node = value && Object.prototype.hasOwnProperty.call(value, 'node') && Object.getPrototypeOf(value).hasOwnProperty('innerHTML') ? value.node : value;

    // Returning
    return Boolean(node && (node.__impl4cf1e782hg__ || node.__wrapper8e3dd93a60__ || (isDefined(node.nodeType) && isDefined(node.ownerDocument))) && (isVoid(type) || node.nodeType === type));
};
