/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const _uuid = require('uuid/v4');

/**
 * Returns a random [Version 4 UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier).
 *
 * ```js
 * XP.uuid();
 * // => 'de305d54-75b4-431b-adb2-eb6b9e546014'
 * ```
 *
 * @function uuid
 * @since 1.0.0
 * @category string
 * @description Returns a random Version 4 UUID
 * @source https://github.com/expandjs/expandjs/blog/master/lib/uuid.js
 *
 * @returns {string} Returns the generated UUID
 */
module.exports = function uuid() {

    // Returning
    return _uuid();
};
