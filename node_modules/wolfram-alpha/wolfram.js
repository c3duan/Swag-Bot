var xml = require('libxmljs')
  , qs = require('querystring')
  , request = require('request');

function Client(appKey, opts) {
  var qp = this.qp = {};
  qp.units = 'metric';
  // Not all formats are supported yet. Needs work in pod mappers below.
  // http://products.wolframalpha.com/docs/WolframAlpha-API-Reference.pdf
  qp.format = 'plaintext,image'; // same as not setting format parameter
  qp.primary = true; // set primary result bool per pod

  // merge in options
  Object.keys(opts || {}).forEach(function (key) {
    qp[key] = opts[key];
  });

  // ensure format is sanely set lest it breaks the parser's expectations
  if (!qp.format || 'string' !== typeof qp.format) {
    throw new Error("cannot unset/change format completely");
  }

  // ensure appKey overrides opts
  qp.appid = appKey;
}

Client.prototype.query = function (input, debug) {
  return new Promise((resolve, reject) => {
    this.queryCb(input, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    }, debug);
  });
}

Client.prototype.queryCb = function (input, cb, debug) {
  var qp = this.qp;

  if(!qp.appid) {
    return cb(new Error("Application key not set"), null);
  }
  if (!input) {
    return cb(null, []);
  }

  // TODO: perhaps other attributes should be set on a per query basis as well
  // at the moment everything but input is global
  qp.input = input;
  var uri = 'http://api.wolframalpha.com/v2/query?' + qs.stringify(this.qp);

  if (debug) {
    request(uri).pipe(process.stdout);
    return;
  }

  var parseImg = qp.format.indexOf('image') >= 0
    , parseText = qp.format.indexOf('plaintext') >= 0
    , parseSound = qp.format.indexOf('sound') >= 0
    , parseMathml = qp.format.indexOf('mathml') >= 0
    ;

  request(uri, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return cb(error, null);
    }

    var doc = xml.parseXml(body);
    var root = doc.root();

    if (root.attr('error').value() !== 'false') {
      var message = root.get('//error/msg').text();
      return cb(message, null);
    }

    var pods = root.find('pod').map(function (pod) {
      var o = {};
      if (qp.primary) {
        o.primary = (pod.attr('primary') && pod.attr('primary').value() === 'true');
      }
      o.title = pod.attr('title').value();

      // sound elements are inside sounds
      if (parseSound && pod.get('sounds')) {
        // we just return a flat list of urls
        o.sounds = pod.get('sounds').find('sound').map(function (s) {
          return s.attr('url').value();
        });
      }

      // image and plaintext are found in the subpods
      o.subpods = pod.find('subpod').map(function (node) {
        var i = {};

        if (parseText) {
          i.text = node.get('plaintext').text();
        }
        if (parseImg) {
          // often just a link to an image of the above text
          // but will be useful if !i.text (e.g. psy curve)
          i.image = node.get('img').attr('src').value();
        }
        if (parseMathml && node.get('mathml')) {
          // even if we request mathml it is not always there
          // if it is, we parse through the raw mathml string
          i.mathml = node.get('mathml').toString();
        }
        return i;
      });

      return o;
    });
    cb(null, pods);
  });
};

exports.createClient = function (appKey, opts) {
  return new Client(appKey, opts);
};
