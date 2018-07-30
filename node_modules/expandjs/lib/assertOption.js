/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const ValidationError = require('./ValidationError');

/**
 * Throws a ValidationError if `value` is falsy.
 *
 * ```js
 * let user = {name: 'Fred', age: 17};
 *
 * XP.assertArgument(user.age >= 16, 'user.age', 'greater than or equal to 16');
 * // => undefined
 *
 * XP.assertArgument(user.age >= 18, 'user.age', 'greater than or equal to 18');
 * // => ValidationError: "user.age" must be must be greater than or equal to 18
 * ```
 *
 * @function assertOption
 * @since 1.0.0
 * @category assert
 * @description Throws a ValidationError if `value` is falsy
 * @source https://github.com/expandjs/expandjs/blog/master/lib/assertOption.js
 *
 * @param {*} value The value to be checked
 * @param {string} key The option's name
 * @param {string} type The option's type
 */
module.exports = function assertOption(value, key, type) {

    // Throwing
    if (!value) { throw new ValidationError(key, type); }
};
