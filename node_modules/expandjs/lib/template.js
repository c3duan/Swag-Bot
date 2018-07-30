/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _template    = require('lodash/template'),
    assertArgument = require('./assertArgument'),
    isString       = require('./isString'),
    isVoid         = require('./isVoid');

/**
 * Returns a compiled template function.
 *
 * ```js
 * let compiled = XP.template('Hello ${name}');
 * compiled({name: 'Mario'});
 * // => 'Hello Mario!'
 * ```
 *
 * @function template
 * @since 1.2.0
 * @category string
 * @description Returns a compiled template function
 * @source https://github.com/expandjs/expandjs/blog/master/lib/template.js
 *
 * @param {string} string The target string
 * @returns {Function} Returns the compiled template function
 */
module.exports = function template(string) {

    // Asserting
    assertArgument(isVoid(string) || isString(string), 1, 'string');

    // Returning
    return _template(string || '');
};
