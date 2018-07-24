var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('bluebird');

var RandomOrg = require('../src/RandomOrg');

describe('RandomOrg', function() {

  var apiKey = '123456exampleAp1K3y';
  var random;

  beforeEach(function() {
    random = new RandomOrg({ apiKey: apiKey });
  });

  it('should be a Function', function() {
    expect(RandomOrg).to.be.a('function');
  });

  it('should be instantiable', function() {
    var random = new RandomOrg({ apiKey: '' });
    expect(random).to.be.instanceOf(RandomOrg);
  });

  it('should require `options.apiKey`', function() {
    expect(function createRandomOrgWithoutApiKey() {
      new RandomOrg({});
    }).to.throw(/options.apiKey is required/i);
  });

  it('should require `options.apiKey` to be a String', function() {
    expect(function createRandomOrgWithBadApiKey() {
      new RandomOrg({ apiKey: 123145 });
    }).to.throw(/must be a String/i);
  });

  it('should provide methods for all the basic api methods', function() {
    [
      'generateIntegers',
      'generateDecimalFractions',
      'generateGaussians',
      'generateStrings',
      'generateUUIDs',
      'generateBlobs',
      'getUsage'
    ].forEach(function(basicMethod) {
      expect(random[basicMethod]).to.be.a('function');
    });
  });

  it('should provide methods for all the signed api methods', function() {
    [
      'generateSignedIntegers',
      'generateSignedDecimalFractions',
      'generateSignedGaussians',
      'generateSignedStrings',
      'generateSignedUUIDs',
      'generateSignedBlobs',
      'verifySignature'
    ].forEach(function(basicMethod) {
      expect(random[basicMethod]).to.be.a('function');
    });

  });

  it('should call makeRpcRequest with the correct method name', function() {
    sinon.stub(random, '_makeRpcRequest', function () {
      return Promise.resolve({ result: { random: { data: 1 } } });
    });

    random.getUsage();
    expect(random._makeRpcRequest.args[0][0].method).to.equal('getUsage');
  });

  it('should add apiKey to the passed in parameters', function() {
    var response = {
      jsonrpc: '2.0',
      result:{
        random: {
          data: 10
        }
      },
      id: 1
    };
    sinon.stub(random, '_makeRpcRequest', function () {
      return Promise.resolve(response);
    });

    random.generateIntegers({
      min: 0,
      max: 15,
      n: 1
    });
    expect(random._makeRpcRequest.args[0][0].params).to.deep.equal({
      min: 0,
      max: 15,
      n: 1,
      apiKey: apiKey
    });
  });

  it('should not include the apiKey in the verifySignature call', function() {
    var response = {
      jsonrpc: '2.0',
      result: {
        authenticity: true
      },
      id: 1
    };
    sinon.stub(random, '_makeRpcRequest', function () {
      return Promise.resolve(response);
    });

    random.verifySignature({ /* Response from a signed method call */ });

    expect(random._makeRpcRequest.args[0][0].params).to.not.have.property('apiKey');
  });

  it('should return an error if rpc response has an `error` property',
  function(done) {
    var response = {
      jsonrpc: '2.0',
      error: {
        message: 'An error occured!',
        code: 1234
      },
      id: 1
    }
    sinon.stub(random, '_makeRpcRequest', function () {
      return Promise.resolve(response);
    });

    random.generateIntegers({ min: 1, max: 2, n: 15 })
    .then(function() {
      done(new Error("RandomOrg didn't return an error on bad rpc response"));
    })
    .catch(function(error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(response.error.message);
      expect(error.code).to.equal(response.error.code);
      done();
    });
  });

  it('should return `response.result`', function() {
    var response = {
      jsonrpc: '2.0',
      result: {
        random: {
          data: [10, 11, 12],
          completionTime: '01-01-2015 00:13:37Z'
        },
        bitsUsed: 1234,
        bitsLeft: 1234,
        requestsLeft: 50000,
        advisoryDelay: 30000
      },
      id: 1
    };
    sinon.stub(random, '_makeRpcRequest', function () {
      return Promise.resolve(response);
    });

    random.generateIntegers({ min: 10, max: 12, n: 3 })
    .then(function(result) {
      expect(result).to.deep.equal(response.result);
    });
  });

});
