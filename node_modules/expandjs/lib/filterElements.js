/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    toArray          = require('./toArray'),
    toDOMPredicate   = require('./toDOMPredicate');

/**
 * Iterates over `elements`, returning the elements `predicate` returns truthy for.
 * The `predicate` is invoked with three arguments: (`value`, `index|key`, `elements`).
 *
 * ```html
 * <ul id="list">
 *     <li class="item one disabled"></li>
 *     <li class="item two active"></li>
 *     <li class="item three"></li>
 *     <li class="item four active"></li>
 *     <li class="item five disabled"></li>
 *     <li class="item six"></li>
 *     <li class="item seven disabled"></li>
 * </ul>
 *
 * <script>
 *     let list = document.querySelectorAll('item');
 *     // => [<li class="item one disabled"></li>, ...]
 *
 *     XP.filterElements(list, '.disabled');
 *     // => [<li class="item one disabled"></li>, <li class="item five disabled"></li>, <li class="item seven disabled"></li>]
 *
 *     XP.filterElements(list, el => el.classList.contains('disabled'));
 *     // => [<li class="item one disabled"></li>, <li class="item five disabled"></li>, <li class="item seven disabled"></li>]
 * </script>
 * ```
 *
 * @function filterElements
 * @since 1.0.0
 * @category dom
 * @description Iterates over `elements`, returning the elements `predicate` returns truthy for
 * @source https://github.com/expandjs/expandjs/blog/master/lib/filterElements.js
 *
 * @param {Array} elements The target elements
 * @param {Function | string} predicate The function invoked per iteration
 * @returns {Array} Returns an array with the filtered elements
 */
module.exports = function filterElements(elements, predicate) {

    // Asserting
    assertArgument(elements = toArray(elements), 1, 'ArrayLike');
    assertArgument(predicate = toDOMPredicate(predicate), 2, 'Function or string');

    // Returning
    return elements.filter(predicate);
};
