/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    getAttributes    = require('./getAttributes'),
    getNodes         = require('./getNodes'),
    isElement        = require('./isElement'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid'),
    replaceNode      = require('./replaceNode'),
    setAttributes    = require('./setAttributes'),
    setNodes         = require('./setNodes');

/**
 * Returns a new element, based on the provided `element`, with a new name.
 *
 * ```html
 * <div id="target" class="foo" bar>
 *     <span>Inner text.</span>
 * </div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target" class="foo" bar>...</div>
 *
 *     XP.renameElement(el, 'span');
 *     // => <span id="target" class="foo" bar>...</span>
 * </script>
 * ```
 *
 * @function renameElement
 * @since 1.0.0
 * @category dom
 * @description Returns a new element, based on the provided `element`, with a new name
 * @source https://github.com/expandjs/expandjs/blog/master/lib/renameElement.js
 *
 * @param {Element} [element] The target element
 * @param {string} [name] The name of the new element
 * @returns {Node} Returns the newly created element
 */
module.exports = function renameElement(element, name) {

    // Asserting
    assertArgument(isVoid(element) || isElement(element), 1, 'Element');
    assertArgument(isVoid(name) || isString(name), 2, 'string');

    // Preventing
    if (!element || !name) { return element; }

    // Creating
    let renamed = global.document.createElement(name);

    // Setting
    setAttributes(renamed, getAttributes(element));
    setNodes(renamed, getNodes(element));

    // Replacing
    return replaceNode(element, renamed);
};
