/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument      = require('./assertArgument'),
    getBoundings          = require('./getBoundings'),
    getHeight             = require('./getHeight'),
    getMargin             = require('./getMargin'),
    getWidth              = require('./getWidth'),
    isElement             = require('./isElement'),
    isString              = require('./isString'),
    isVoid                = require('./isVoid'),
    setStyles             = require('./setStyles'),
    willBleedBottom       = require('./willBleedBottom'),
    willBleedHorizontally = require('./willBleedHorizontally'),
    willBleedLeft         = require('./willBleedLeft'),
    willBleedRight        = require('./willBleedRight'),
    willBleedTop          = require('./willBleedTop');

/**
 * Aligns the provided `element` relative to the `target` one.
 *
 * A 3rd parameter can be provided with the position's behavior: `aside`, `baseline`, `over`.
 *
 * A 4th parameter can be provided if `element` should be centered on its axis.
 *
 * @function align
 * @since 1.0.0
 * @category dom
 * @description Aligns the provided `element` relative to the `target` one
 * @source https://github.com/expandjs/expandjs/blog/master/lib/align.js
 *
 * @param {Element} [element] The target element
 * @param {Element} [target] The relative target
 * @param {string} [position = "over"] The position's behavior
 * @param {boolean} [autoCenter = false] Specifies if the element should be centered on its axis
 * @returns {Element} Returns `element`
 */
module.exports = function alignElement(element, target, position, autoCenter) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(target) || isElement(target), 2, 'Element');
    assertArgument(isVoid(position) || isString(position), 3, 'string');

    // Preventing
    if (!element) { return; }

    // Styling
    setStyles(element, {contain: 'layout', position: 'fixed', bottom: null, left: 0, right: null, top: 0});

    // Let
    let domHeight       = getHeight(),
        domWidth        = getWidth(),
        margin          = getMargin(element),
        boundings       = getBoundings(element),
        targetBoundings = getBoundings(target || global.document.documentElement),
        newBoundings    = null;

    // Calculating
    boundings.left = targetBoundings.left + (position === 'aside' ? targetBoundings.width : (autoCenter || !target ? (targetBoundings.width / 2) - (boundings.width / 2) : 0)) - margin.left;
    boundings.top  = targetBoundings.top + (position === 'baseline' ? targetBoundings.height : (!target ? (targetBoundings.height / 2) - (boundings.height / 2) : 0)) - margin.top;

    // Recalculating
    if (willBleedRight(boundings, margin)) { boundings.left = position === 'aside' ? boundings.left - (targetBoundings.width + boundings.width) : domWidth - (margin.left + boundings.width + margin.right); }
    if (willBleedLeft(boundings, margin)) { boundings.left = position === 'aside' && !willBleedHorizontally(boundings, margin) ? domWidth - (margin.left + boundings.width + margin.right) : 0; }
    if (willBleedBottom(boundings, margin)) { boundings.top = domHeight - (margin.top + boundings.height + margin.bottom); }
    if (willBleedTop(boundings, margin)) { boundings.top = 0; }

    // Styling
    setStyles(element, {left: boundings.left + 'px', right: willBleedRight(boundings, margin) ? '0px' : null});
    setStyles(element, {top: boundings.top + 'px', bottom: willBleedBottom(boundings, margin) ? '0px' : null});

    // Getting
    newBoundings = getBoundings(element);

    // Fixing ("position: fixed" bug)
    if ((newBoundings.left -= margin.left) !== boundings.left) { setStyles(element, {left: ((boundings.left * 2) - newBoundings.left) + 'px', right: willBleedRight(boundings, margin) ? (boundings.left - newBoundings.left) + 'px' : null}); }
    if ((newBoundings.top -= margin.top) !== boundings.top) { setStyles(element, {top: ((boundings.top * 2) - newBoundings.top) + 'px', bottom: willBleedBottom(boundings, margin) ? (boundings.top - newBoundings.top) + 'px' : null}); }

    // Returning
    return element;
};
