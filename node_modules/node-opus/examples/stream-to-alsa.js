'use strict';
// replace username and password with speech to text credentials
// audio.wav can be found here: https://github.com/watson-developer-cloud/nodejs-wrapper/blob/master/test/resources/audio.wav?raw=true

var fs = require('fs');
var opus = require('node-opus');
var ogg = require('ogg');
var cp = require('child_process');

var oggDecoder = new ogg.Decoder();

oggDecoder.on('stream', function (stream) {

    var opusDecoder = new opus.Decoder();

    // the "format" event contains the raw PCM format
    opusDecoder.on('format', function (format) {

        // format example:
        //{
        //    channels: 1,
        //    sampleRate: 24000,
        //    bitDepth: 16,
        //    float: false,
        //    signed: true,
        //    gain: 0,
        //    preSkip: 156,
        //    version: 1
        //}

        // convert the signed & bitDepth to an alsa compatible format (`aplay --help format` for full list)
        var alsaFormat;
        if (format.signed && format.bitDepth == 16) {
            alsaFormat = 'S16_LE'; // assume Little Endian
        } else {
            throw new Error('unexpected format: ' + JSON.stringify(format));
        }

	// set up aplay to accept data from stdin
        var aplay = cp.spawn('aplay',['--format=' + alsaFormat, '--rate=' + format.sampleRate, '--channels='+format.channels, '--']);
        
        // send the raw PCM data to aplay
	opusDecoder.pipe(aplay.stdin);

        // or pipe to node-speaker, a file, etc
    });

    // an "error" event will get emitted if the stream is not a Vorbis stream
    // (i.e. it could be a Theora video stream instead)
    opusDecoder.on('error', console.error);

    stream.pipe(opusDecoder);
});


fs.createReadStream('input.opus').pipe(oggDecoder);
