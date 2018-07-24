# wolfram-alpha
[![npm status](http://img.shields.io/npm/v/wolfram-alpha.svg)](https://www.npmjs.org/package/wolfram-alpha)
[![build status](https://secure.travis-ci.org/clux/wolfram-alpha.svg)](http://travis-ci.org/clux/wolfram-alpha)
[![dependency status](https://david-dm.org/clux/wolfram-alpha.svg)](https://david-dm.org/clux/wolfram-alpha)
[![coverage status](http://img.shields.io/coveralls/clux/wolfram-alpha.svg)](https://coveralls.io/r/clux/wolfram-alpha)

This is a Wolfram|Alpha API wrapper for Node.js.

All the query parameters are fully customizable as per the [API reference](http://products.wolframalpha.com/docs/WolframAlpha-API-Reference.pdf), and the normal `'plaintext,image,sound,mathml'` formats are all parsed properly.

## Usage
Register for a Wolfram|Alpha application ID. The Wolfram|Alpha® API is available for free for non-commercial experimental use with a low monthly cap on queries.  For more information, visit [http://products.wolframalpha.com/developers/](http://products.wolframalpha.com/developers/). Wolfram is a registered trademark of the Wolfram Group of Companies.

Install the module with npm, and (possibly) install the libxml dependency in your OS first:

```sh
$ sudo apt-get install libxml2-dev
$ npm install wolfram-alpha
```

Example usage:

```js
var wolfram = require('wolfram-alpha').createClient("APIKEY-HERE", opts);

var results = yield wolfram.query("integrate 2x")
console.log("Result: %j", results);
```

## Output
The results calls back with a result array of pods (each pod is typically one of the result blocks on the web interface). An empty results array corresponds to results found.

When results exist, each pod will have the following format:

```js
results[0];
{
  title: "some title",
  subpods: [
    {
      text: "text found in the <plaintext> element",
      image: "link found in the <img src=> attribute",
      mathml: "mathml string found in the <mathml> element"
    },
    // maybe more subpods (but often not)
  ],
  primary: Boolean("was the primary attribute set on the pod?"),
  sounds: [
    "link found in the first <sound url=> attribute",
    // maybe more sounds
  ]
}
```

Sounds and mathml will only exist when you request them in the createClient opts.format string, and they are not guaranteed to exist. Text and images can be removed from the opts.format string as well which will likely mean you get much fewer pods.

Having a quick look at the [API reference](http://products.wolframalpha.com/docs/WolframAlpha-API-Reference.pdf) and the [short source](./wolfram.js) will prove useful for providing guarantees of what kind of data is available when.

Note that `results[0]` seems to always be the "Input Interpretation", while `results[1]` is the most relevant answers (but it will not always have `results[1].primary === true` despite this).

## Running tests
Set the API key as an environment variable, then run the library's test command:

```bash
$ export WOLFRAM_APPID=APIKEY-HERE
$ npm test
```

## License
MIT-Licensed. See LICENSE file for details.
