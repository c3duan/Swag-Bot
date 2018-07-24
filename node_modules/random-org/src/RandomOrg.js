var Promise = require('bluebird');
var url = require('url');
var makeRpcRequest = require('./rpc').makeRpcRequest;

function RandomOrg(opts) {
  this.apiKey = opts.apiKey;
  if (typeof this.apiKey !== 'string') {
    throw new Error('options.apiKey is required & must be a String');
  }

  this.endpoint = opts.endpoint || 'https://api.random.org/json-rpc/1/invoke';
  this.endpoint = url.parse(this.endpoint);

  // For testing.
  this._makeRpcRequest = makeRpcRequest;
}

[
  // Basic api methods
  'generateIntegers',
  'generateDecimalFractions',
  'generateGaussians',
  'generateStrings',
  'generateUUIDs',
  'generateBlobs',
  'getUsage',
  // Signed api methods
  'generateSignedIntegers',
  'generateSignedDecimalFractions',
  'generateSignedGaussians',
  'generateSignedStrings',
  'generateSignedUUIDs',
  'generateSignedBlobs',
  'verifySignature'
].forEach(function(methodName) {
  RandomOrg.prototype[methodName] = createInvocation(methodName);
});

RandomOrg.prototype._enrichParams = function(method, params) {
  if (method === 'verifySignature') {
    /* The verifySignature method requires no api key (so that anyone
     * can verify the authenticity of some response). */
    return params;
  }

  var requestParams = { apiKey: this.apiKey };
  Object.keys(params || {}).forEach(function(property) {
    requestParams[property] = params[property];
  });
  return requestParams;
}

function createInvocation(methodName) {
  return Promise.method(function(params) {
    var requestOpts = {
      endpoint: this.endpoint,
      method: methodName,
      params: this._enrichParams(methodName, params)
    }
    return this._makeRpcRequest(requestOpts)
    .then(function (response) {
      if (response.error) {
        var error = new Error(response.error.message);
        error.code = response.error.code;
        throw error;
      } else {
        return response.result;
      }
    });
  });
}

module.exports = RandomOrg;
