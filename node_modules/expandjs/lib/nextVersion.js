/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument = require('./assertArgument'),
    isVersion        = require('./isVersion');

/**
 * Returns the successor of `version` based on `type`.
 *
 * ```js
 * XP.nextVersion('1.1.1', 'major');
 * // => '2.0.0'
 *
 * XP.nextVersion('1.1.1', 'minor');
 * // => '1.2.0'
 *
 * XP.nextVersion('1.1.1', 'patch');
 * // => '1.1.2'
 * ```
 *
 * @function nextVersion
 * @since 1.0.0
 * @category string
 * @description Returns the successor of `version` based on `type`
 * @source https://github.com/expandjs/expandjs/blog/master/lib/nextVersion.js
 *
 * @param {string} version The target version
 * @param {string} type The next version's type
 * @returns {string} Returns the next version based on `type`
 */
module.exports = function nextVersion(version, type) {

    // Let
    let index = ['major', 'minor', 'patch'].indexOf(type);

    // Asserting
    assertArgument(isVersion(version), 1, 'string');
    assertArgument(index >= 0, 2, '"major", "minor", "patch"');

    // Computing
    let result = version && version.split('.').map((value, i) => i < index ? value : (i > index ? 0 : Number(value) + 1));

    // Returning
    return result ? result.join('.') : null;
};
