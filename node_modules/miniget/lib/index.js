const http        = require('http');
const https       = require('https');
const urlParse    = require('url').parse;
const PassThrough = require('stream').PassThrough;


const httpLibs = { 'http:': http, 'https:': https };
const redirectCodes = { 301: true, 302: true, 303: true, 307: true };

/**
* @param {String} url
* @param {!Object} options
* @param {!Function(Error, http.IncomingMessage, String)} callback
* @return {stream.Readable}
*/
module.exports = (url, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  } else if (!options) {
    options = {};
  }
  const maxRedirects = options.maxRedirects || 3;
  const stream = new PassThrough({ highWaterMark: options.highWaterMark });
  let req, aborted = false;

  function onError(err) {
    if (callback) {
      callback(err);
    } else {
      stream.emit('error', err);
    }
  }

  function doDownload(url, tryCount) {
    if (aborted) { return; }
    let parsed = urlParse(url);
    let httpLib = httpLibs[parsed.protocol];
    if (!httpLib) {
      setImmediate(() => {
        onError(new Error('Invalid URL: ' + url));
      });
      return stream;
    }

    for (let key in options) {
      parsed[key] = options[key];
    }
    delete parsed.maxRedirects;
    delete parsed.highWaterMark;
    delete parsed.transform;
    if (options.transform) {
      let transform = options.transform;
      parsed = transform(parsed);
    }

    req = httpLib.get(parsed, (res) => {
      if (redirectCodes[res.statusCode] === true) {
        if (tryCount >= maxRedirects) {
          onError(new Error('Too many redirects'));
        } else {
          doDownload(res.headers.location, tryCount + 1);
        }
        return;
      } else if (res.statusCode < 200 || 400 <= res.statusCode) {
        onError(new Error('Status code: ' + res.statusCode));
        return;
      }
      if (callback) {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          callback(null, res, body);
        });
      } else {
        stream.emit('response', res);
        res.on('error', onError);
        res.pipe(stream);
      }
    });
    req.on('error', onError);
    stream.emit('request', req);
  }

  stream.abort = () => {
    aborted = true;
    stream.emit('abort');
    if (req) { req.abort(); }
  };

  process.nextTick(() => { doDownload(url, 1); });
  return callback ? null : stream;
};
