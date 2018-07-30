/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    delay            = require('./delay'),
    isFunction       = require('./isFunction'),
    isObject         = require('./isObject'),
    isNode           = require('./isNode'),
    isVoid           = require('./isVoid');

/**
 * Is a one time MutationObserver, used to receive notifications of DOM mutations on the provided `node`.
 * Once the dom has sustained a mutation and the `callback` has been called, the observer self-destructs.
 *
 * ```html
 * <div id="target"></div>
 *
 * <script>
 *     let el = document.querySelector('#target');
 *     // => <div id="target"></div>
 *
 *     XP.onMutation(target, () => console.log('Mutation happened.'), {attributes: true});
 *
 *     XP.addAttribute(target, 'foo');
 *     // => <div id="target" foo></div>
 *     // => 'Mutation happened.'
 * </script>
 * ```
 *
 * @function onMutation
 * @since 1.0.0
 * @category dom
 * @description Is a one time MutationObserver, used to receive notifications of DOM mutations on the provided `node`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/onMutation.js
 *
 * @param {Node} node The target node
 * @param {Function} callback The callback to be invoked
 * @param {Object} [opt] The mutation observer's options
 * @returns {Object} Returns a mutation observer object
 */
module.exports = function onMutation(node, callback, opt) {

    // Asserting
    assertArgument(isNode(node), 1, 'Node');
    assertArgument(isFunction(callback), 2, 'Function');
    assertArgument(isVoid(opt) || isObject(opt), 3, 'Object');

    // Let
    let observer = new global.MutationObserver(mutations => { delay(() => callback(mutations)); observer.disconnect(); });

    // Observing
    observer.observe(node, opt || {attributes: false, characterData: false, childList: true, subtree: true});

    // returning
    return observer;
};
