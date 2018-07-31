node-opus
=========
### NodeJS native bindings to libopus

This module implements bindings for Opus v1.1 for Node.js.

```js
var opus = require('node-opus');

// Create the encoder.
// Specify 48kHz sampling rate and 10ms frame size.
// NOTE: The decoder must use the same values when decoding the packets.
var rate = 48000;
var encoder = new opus.OpusEncoder( rate );

// Encode and decode.
var frame_size = rate/100;
var encoded = encoder.encode( buffer, frame_size );
var decoded = encoder.decode( encoded, frame_size );

// or create streams
var channels = 2;
var opusEncodeStream = new opus.Encoder(rate, channels, frame_size);
var opusDecodeStream = new opus.Decoder(rate, channels, frame_size);
// see examples folder for a more complete example
```

Platform support
----------------

Supported platforms:
- Linux x64 & ia32
- Linux ARM (Raspberry Pi 1 & 2)
- Linux ARM64 (Raspberry Pi 3)
- Mac OS X x64
- Windows x64


Add new supported platforms by running ./autogen.sh and ./configure in
deps/opus and copying the resulting config.h to deps/config/opus/[os]/[arch].

Use the following flags with configure:

    ./configure --enable-static --disable-shared --with-pic

On a clean debian-based system, the full flow looks approximately like:

	sudo apt-get update
	sudo apt-get install autoconf
	sudo apt-get install libtool
	cd deps/opus
	./autogen.sh
	./configure --enable-static --disable-shared --with-pic
	mkdir -p ../config/opus/[os]/[arch]
	cp config.h ../config/opus/[os]/[arch]

And, then, the last step is to add the OS/Arch to `package.json`.
