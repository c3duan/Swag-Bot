/**
 * @license
 * Copyright (c) 2017 The expand.js authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://expandjs.github.io/LICENSE.txt
 * The complete set of authors may be found at https://expandjs.github.io/AUTHORS.txt
 * The complete set of contributors may be found at https://expandjs.github.io/CONTRIBUTORS.txt
 */

const assertArgument    = require('./assertArgument'),
    defineProperty      = require('./defineProperty'),
    defineProperties    = require('./defineProperties'),
    isDefined           = require('./isDefined'),
    isFunction          = require('./isFunction'),
    isObject            = require('./isObject'),
    isString            = require('./isString'),
    isVoid              = require('./isVoid'),
    promise             = require('./promise'),
    withdraw            = require('./withdraw');

/**
 * A class constructor that uses `defineProperties` to define the prototype.
 *
 * @class Class
 * @since 1.0.0
 * @category object
 * @description A class constructor that uses `defineProperties` to define the prototype
 * @param {String} name The class name
 * @param {Object} [opt] The class prototype
 *   @param {Function} [opt.extends] The extended constructor
 *   @param {Function} [opt.initialize] The instance constructor
 *   @param {Object} [opt.options] The default instance's options
 */
module.exports = function (name, opt) {

    // Asserting
    assertArgument(isString(name, true), 1, 'string');
    assertArgument(isVoid(opt) || isObject(opt), 2, 'Object');

    // Default
    opt = opt || {};

    // Let
    let Constructor = null,
        Super       = withdraw(opt, 'extends') || Function,
        initialize  = withdraw(opt, 'initialize') || Super,
        options     = withdraw(opt, 'options');

    // Evaluating
    eval(
`Constructor = function ${name}() {
let promised = this.promise;
this.options = this.options || Constructor.options;
this.plugins = this.plugins || {};
this.promise = this.promise || initialize.promise && promise(arguments, initialize.value.bind(this)) || undefined;
return initialize !== Function && (promised || !initialize.promise) ? initialize.apply(this, arguments) : this;
};`);

    // Extending
    Constructor.prototype = Object.create(Super.prototype, {constructor: {configurable: true, value: Constructor, writable: true}});

    // Static
    defineProperty(Constructor, 'options', {'static': true, value: Object.assign({}, Super.options, options)});

    // Prototype
    defineProperties(Constructor, {

        /**
         * When promise is resolved or rejected, `callback` will be called.
         *
         * @method ready
         * @param {Function} callback The callback to call after resolve or reject
         * @returns {Object}
         */
        ready(callback) {

            // Asserting
            assertArgument(isVoid(callback) || isFunction(callback), 1, 'Function');

            // Let
            let caught = false;

            // Handlers
            function cbCatch(err) { caught = true; callback(err, null); }
            function cbThen(data) { if (!caught) { callback(null, data); } }

            // Callback
            if (callback && this.promise) { this.promise.catch(cbCatch).then(cbThen); }

            // Returning
            return this;
        },

        /*********************************************************************/

        /**
         * The instance's options.
         *
         * @property options
         * @type Object
         */
        options: {
            set(val) { return Object.assign(this.options || {}, val); }
        },

        /**
         * The instance's promise.
         *
         * @property promise
         * @type Object
         */
        promise: {
            set(val) { return isDefined(this.promise) ? this.promise : val; },
            validate(val) { return !isVoid(val) && !isObject(val) && 'Object'; }
        }
    });

    // Defining (custom)
    return defineProperties(Constructor, opt);
};
