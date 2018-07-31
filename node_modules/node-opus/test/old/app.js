
"use strict";

var opus = require('../../');
var fs = require('fs');

//
// Generate a sin tone.
//
var freq = 123;
var time = 5;
var rate = 48000;

// Allocate a buffer for the tone. We use 16-bit samples.
var samples = rate*time;
var length = samples*2;
var b = new Buffer(length);

// Generate the tone.
for( var i = 0; i < rate*time; i++ ) {
	var value = Math.round( Math.sin( 2*Math.PI*i*freq/rate ) * Math.pow( 2, 14 ) );
	b.writeInt16LE( value, i*2 );
}

//
// Create the encoder.
//

// Use 20ms frames.
var frame_size = rate * 0.02;
var encoder = new opus.OpusEncoder( rate );

// Open the output streams.
var output = fs.createWriteStream( 'out.opus' );
var input_raw = fs.createWriteStream( 'in.pcm' );
var output_raw = fs.createWriteStream( 'out.pcm' );

var read = 0;
while( b.length > 0 ) {
    var size = Math.min( b.length, frame_size );
    
    // If the input buffer is smaller than the frame_size, copy it into a new 0-padded buffer.
	if( size < frame_size ) {
		var temp = new Buffer( frame_size );
        temp.fill(0);
        b.copy( temp );
        b = temp;
	}

    // We encode frame_size 16-bit samples. This requires a frame_size*2 buffer of bytes.
	var bufferSize = frame_size * 2;
	var toEncode = b.slice(0, bufferSize);
    console.log( frame_size );

    // Encode and decode.
	var encoded = encoder.encode( toEncode );
	var decoded = encoder.decode( encoded );

    // Write the results in the output files.
    input_raw.write( toEncode );
    output.write( encoded );
	output_raw.write( decoded );

    // Move the buffer forward by the buffer size.
    b = b.slice( bufferSize );
}

output.end();
input_raw.end();
output_raw.end();

console.log( 'Wrote following files.' );
console.log( 'in.pcm   : Input PCM signal' );
console.log( 'out.opus : OPUS encoded input signal' );
console.log( 'out.pcm  : Decoded PCM signal' );

