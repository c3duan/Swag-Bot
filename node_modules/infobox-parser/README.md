[![NPM Version](https://img.shields.io/npm/v/infobox-parser.svg)](https://www.npmjs.com/package/infobox-parser)
[![Build Status](https://travis-ci.org/dijs/infobox-parser.svg)](https://travis-ci.org/dijs/infobox-parser)

## Infobox Parser

This was originally written as a companion module for `wikijs`. But it can work great on it's own as well. The main function of this module is parsing wikipedia article's infobox data. The infobox source is in wikitext format and
difficult to parse. This module analyzes it and outputs JSON for you.

#### How to use

```js
var parseInfo = require("infobox-parser")

parseInfo(`
{{Infobox Batman
|name      = Bruce Wayne
|hero      = y
}}`);
// Outputs { hero: true, name: 'Bruce Wayne' }
```

#### Support

It supports many of wikipedia features, but not all yet. If there is a feature you need it to support, but it does not. Please create an issue and I will add the functionality.
