/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

/**
 * The [camel case](https://en.wikipedia.org/wiki/Camel_case) validation regex.
 *
 * @object camelCaseRegex
 * @since 1.0.0
 * @category regex
 * @description The camel case validation regex
 */
module.exports = /^[a-z]+([A-Z]*([a-z]|[\d](?![a-z]))*)+$|^$/;
