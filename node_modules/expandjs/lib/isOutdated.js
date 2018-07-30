/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const isVersion = require('./isVersion');

/**
 * Checks if `value` is an outdated version based on `latest`.
 *
 * ```js
 * XP.isOutdated('1.0.0', '1.5.0');
 * // => true
 *
 * XP.isOutdated('2.0.0', '1.5.0');
 * // => false
 * ```
 *
 * @function isOutdated
 * @since 1.0.0
 * @category tester
 * @description Checks if `value` is an outdated version based on `latest`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/isOutdated.js
 *
 * @param {string} value The target value
 * @param {string} latest The latest version
 * @returns {boolean} Returns `true` or `false` based on the check
 */
module.exports = function isOutdated(value, latest) {

    // Let
    let a = isVersion(value, true) && value.split('.'), b = isVersion(latest, true) && latest.split('.');

    // Checking
    if (a && b && Number(a[0]) !== Number(b[0])) { return Number(a[0]) < Number(b[0]); }
    if (a && b && Number(a[1]) !== Number(b[1])) { return Number(a[1]) < Number(b[1]); }
    if (a && b && Number(a[2]) !== Number(b[2])) { return Number(a[2]) < Number(b[2]); }

    // Returning
    return false;
};
