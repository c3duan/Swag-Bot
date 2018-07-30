/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isDefined = require('./isDefined'),
    toDate      = require('./toDate');

/**
 * Returns an elapsed time `string` representation of `target`.
 *
 * ```js
 * XP.toElapsedTime(new Date())
 * // => 'now'
 *
 * XP.toElapsedTime(Date.now() - 10000)
 * // => '10 seconds ago'
 *
 * XP.toElapsedTime(Date.now() - 60000)
 * // => '1 minute ago'
 * ```
 *
 * @function toElapsedTime
 * @since 1.0.0
 * @category caster
 * @description Returns an elapsed time `string` representation of `target`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/toElapsedTime.js
 *
 * @param {*} target The target value
 * @returns {string} Returns the casted value
 */
module.exports = function toElapsedTime(target) {

    // Let
    let date    = toDate(target),
        elapsed = isDefined(date) ? Math.floor((Date.now() - date.getTime()) / 1000) : -1;

    // Preparing times
    let times = [
        {value: 31536000, label: 'year'},
        {value: 2592000, label: 'month'},
        {value: 86400, label: 'day'},
        {value: 3600, label: 'hour'},
        {value: 60, label: 'minute'},
        {value: 1, label: 'second'}
    ];

    // Returning
    return elapsed < 1 ? (elapsed ? undefined : 'now') : times.reduce((reduced, time) => {
        let current = !reduced && Math.floor(elapsed / time.value);
        return reduced || (current && `${current} ${time.label}${current > 1 ? `s` : ``} ago`);
    });
};
