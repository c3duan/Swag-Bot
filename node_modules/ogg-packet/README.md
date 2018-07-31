node-ogg-packet
===============
### Manually construct `ogg_packet` struct instances

This module lets you construct your own `ogg_packet` struct instances using
JavaScript and Buffers. You'll most likely not need to use this module for any
practical purposes, but it is useful for testing purposes.

The more common way to get _proper_ `ogg_packet` structs is via a decoded OGG file
and node-ogg's `ogg.Decoder` class, or one of the codec's encoder classes like
node-vorbis' `vorbis.Encoder` class.


Installation
------------

``` bash
$ npm install ogg-packet
```


Example
-------

``` javascript
var ogg_packet = require('ogg-packet');

// create an `ogg_packet` struct instance
var packet = new ogg_packet();

// the contents of the "packet"
var buf = new Buffer('hello world');
packet.packet = buf;
packet.bytes = buf.length;

// this will be the first packet in the ogg stream
packet.b_o_s = 1;

// there will be more `ogg_packet`s after this one in the ogg stream
packet.e_o_s = 0;

// the "granulepos" is a time-constant value used by the codec decoder
packet.granulepos = 12345;

// the "packetno" should increment by one for each packet in the ogg stream
packet.packetno = 0;

// now send the packet off to an `ogg.Encoder` or
// a codec-specific decoder like `vorbis.Decoder`...
```


API
---

### ogg_packet class

A `ref-struct` class that mirrors the `ogg_packet` fields in the `ogg.h` file.

``` c
typedef struct {
  unsigned char *packet;
  long  bytes;
  long  b_o_s;
  long  e_o_s;
  ogg_int64_t  granulepos;
  ogg_int64_t  packetno;
} ogg_packet;
 ```
