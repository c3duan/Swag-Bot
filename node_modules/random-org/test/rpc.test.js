var url = require('url');
var expect = require('chai').expect;
var nock = require('nock');

var makeRpcRequest = require('../src/rpc').makeRpcRequest;

describe('makeRpcRequest', function() {

  var jsonRpcResponse;
  var server;
  var endpoint = url.parse('https://api.example.com/json-rpc/1/invoke');
  var request; // The request made by makeRpcRequest
  var requestBody; // Data received by nock
  var requestOptions;

  beforeEach(function() {
    jsonRpcResponse = {
      jsonrpc: '2.0',
      result: {
        hello: 'world'
      },
      id: 1
    };

    // Default request options
    requestOptions = {
      method: 'exampleMethod',
      endpoint: endpoint,
      params: {
        foo: 'bar',
        some: 'unicode characters: → ⇒ ⇄ ↑ ↩ ↱ ↷ ↻ ► ☛'
      }
    };

    server = nock(endpoint.protocol + '//' + endpoint.hostname)
    .post(endpoint.path)
    .reply(200, function(uri, reqBody) {
      // Store the request object & body to assert about later.
      request = this.req;
      requestBody = reqBody
      return jsonRpcResponse;
    });
  });

  afterEach(function() {
    // Remove all mocked endpoints.
    nock.cleanAll();
    request = null;
    server = null;
  });

  after(function() {
    nock.restore();
  });

  it('should send an https request to the correct endpoint', function() {
    return makeRpcRequest(requestOptions)
    .then(function() {
      expect(server.isDone()).to.be.true;
    });
  });

  it('should return the response body, parsed as JSON', function() {
    return makeRpcRequest(requestOptions)
    .then(function(response) {
      expect(response).to.be.an('object');
      expect(response).to.deep.equal(jsonRpcResponse);
    });
  });

  it('should set the Content-Type header to application/json-rpc', function() {
    return makeRpcRequest(requestOptions)
    .then(function() {
      expect(request.headers['content-type']).to.equal('application/json-rpc');
    });
  });

  it('should set the Content-Length header to the byte length of the post body',
  function() {
    return makeRpcRequest(requestOptions)
    .then(function() {
      var contentLength = Buffer.byteLength(requestBody, 'utf8');
      expect(request.headers['content-length']).to.equal(contentLength);
    });
  });

  it('should send a valid json-rpc 2.0 request object', function() {
    return makeRpcRequest(requestOptions)
    .then(function() {
      var body = JSON.parse(requestBody);
      expect(body.jsonrpc).to.equal('2.0');
      expect(body.method).to.exist;
      expect(body.params).to.exist;
      expect(body.id).to.exist;
    });
  });

  it("should send options.params in the request object's `params` property",
  function() {
    return makeRpcRequest(requestOptions)
    .then(function() {
      var body = JSON.parse(requestBody);
      expect(body.params).to.deep.equal(requestOptions.params);
    });
  });

  it("should send options.method in the request object's `method` property",
  function() {
    return makeRpcRequest(requestOptions)
    .then(function() {
      var body = JSON.parse(requestBody);
      expect(body.method).to.equal(requestOptions.method);
    });
  });

  it('should return an Error if the response is not valid JSON',
  function(done) {
    endpoint.path = 'json-rpc/1/bad-invoke';

    nock(endpoint.protocol + '//' + endpoint.hostname)
    .post(endpoint.path)
    .reply(200, 'INVALID JSON!!');

    // Using the callback style here, since the `.catch()` would catch any
    // errors thrown in the `.then()` block
    makeRpcRequest(requestOptions)
    .then(function() {
      done(new Error("makeRpcRequest didn't throw on invalid JSON response"));
    })
    .catch(function(error) {
      expect(error).to.be.instanceof(Error);
      expect(error.message).to.match(/invalid JSON/i);
      done();
    });
  });

});
