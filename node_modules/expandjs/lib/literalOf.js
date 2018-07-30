/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isArray          = require('./isArray'),
    isCollection     = require('./isCollection'),
    isDefined        = require('./isDefined'),
    isString         = require('./isString'),
    isVoid           = require('./isVoid');

/**
 * Gets the literal at which the first occurrence of `value` is found in `collection` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) for equality comparisons.
 *
 * ```js
 * let blog = {
 *     users: [
 *         {name: 'barney',  age: 36, active: true,  posts: []},
 *         {name: 'fred',    age: 40, active: false, posts: [
 *             {title: 'first',  views: 1524, active: true}
 *         ]},
 *         {name: 'pebbles', age: 18, active: true,  posts: [
 *             {title: 'second', views: 2342, active: false},
 *             {title: 'third',  views: 1217, active: true}
 *         ]}
 *     ]
 * };
 *
 * XP.literalOf(blog, 'second');
 * // => 'users[2].posts[0].title'
 *
 * XP.literalOf(blog, 'second', '.');
 * // => 'users.2.posts.0.title'
 * ```
 *
 * @function literalOf
 * @since 1.0.0
 * @category collection
 * @description Gets the literal at which the first occurrence of `value` is found in `collection` using `SameValueZero` for equality comparisons
 * @source https://github.com/expandjs/expandjs/blog/master/lib/literalOf.js
 *
 * @param {Array | Object} collection The target collection
 * @param {*} value The value to search for
 * @param {string} [prefix] The prefix to use before each index
 * @returns {string} Returns the literal of the matched value, else `undefined`
 */
module.exports = function literalOf(collection, value, prefix) {

    // Asserting
    assertArgument(isCollection(collection), 1, 'ArrayLike or Object');
    assertArgument(isVoid(prefix) || isString(prefix, true), 3, 'string');

    // Let
    let keys = !isArray(collection) && Object.keys(collection),
        result;

    // Cycling collection
    Array.from(keys || collection).some((v, i) => {

        // Let
        let key = keys ? v : i,
            val = keys ? collection[key] : v,
            sub = val !== value && isCollection(val) ? literalOf(val, value, prefix) : undefined;

        // Preventing
        if (val !== value && !isDefined(sub)) { return; }

        // Concatenating
        result = `${keys ? key : (prefix ? `${prefix}${key}` : `[${key}]`)}${sub && sub[0] !== `[` ? `.` : ``}${sub || ``}`;

        // Breaking
        return true;
    });

    // Returning
    return result;
};
