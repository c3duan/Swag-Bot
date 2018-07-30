/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDefined = require('./isDefined');

/**
 * Returns a JSON `string` representation of `target`.
 *
 * A 2nd parameter can be provided to get a pretty printed JSON.
 *
 * ```js
 * XP.toJSON({first: 1, second: null, third: undefined});
 * // => '{"first": 1, "second": null}'
 *
 * XP.toJSON({first: 1, second: null, third: undefined}, true);
 * // => '{
 *          "first": 1,
 *          "second": null
 *        }'
 *
 * XP.toJSON(null);
 * // => 'null'
 *
 * XP.toJSON(undefined);
 * // => ''
 * ```
 *
 * @function toJSON
 * @since 1.0.0
 * @category caster
 * @description Returns a JSON `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toJSON.js
 *
 * @param {*} target The target value
 * @param {boolean} [pretty = false] Specifies if the JSON should be pretty printed
 * @returns {string} Returns the casted value
 */
module.exports = function toJSON(target, pretty) {

    // Returning
    return isDefined(target) ? JSON.stringify(target, null, pretty ? 2 : undefined) : '';
};
