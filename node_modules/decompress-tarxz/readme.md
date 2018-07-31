# decompress-tarxz [![Build Status](https://travis-ci.org/kevva/decompress-tarxz.svg?branch=master)](https://travis-ci.org/kevva/decompress-tarxz)

> tar.xz decompress plugin


## Install

```
$ npm install --save decompress-tarxz
```


## Usage

```js
const decompress = require('decompress');
const decompressTarxz = require('decompress-tarxz');

decompress('unicorn.tar.xz', 'dist', {
	plugins: [
		decompressTarxz()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTarxz()(input)

Returns both a Promise for a Buffer and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer or stream to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
