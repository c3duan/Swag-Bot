/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isFunction       = require('./isFunction'),
    isNode           = require('./isNode'),
    isObject         = require('./isObject'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Adds a one-time event listener to `emitter`.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector("#target");
 *     // => <div id="target"></div>
 *
 *     let listener = event => el.appendChild(document.createTextNode('This is a text node.\n'));
 *     // A new text line is added every time the div is clicked
 *
 *     XP.listenOnce(elem, 'click', listener);
 *     // => <div id="target"></div>
 * </script>
 * ```
 *
 * @function listenOnce
 * @since 1.2.0
 * @category function
 * @description Adds a one-time event listener to `emitter`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/listenOnce.js
 *
 * @param {Object} emitter The target emitter
 * @param {string} event The event to listen for
 * @param {Function} listener The listener to add
 * @returns {Object} Returns `emitter`
 */
module.exports = function listenOnce(emitter, event, listener) {

    // Asserting
    assertArgument(isObject(emitter), 1, 'Object');
    assertArgument(isString(event, true), 2, 'string');
    assertArgument(isFunction(listener), 3, 'Function');

    // Wrapping
    let wrapper = function () {

        // Removing listener
        emitter.removeEventListener(event, wrapper);

        // Forwarding
        return listener(...arguments);
    };

    // Listening
    emitter.addEventListener(event, wrapper);

    // Returning
    return emitter;
};
