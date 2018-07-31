
"use strict";

var OpusEncoder = require( './lib/OpusEncoder' );
exports.OpusEncoder = OpusEncoder;

var oggPacket = true;
try {
    require( "ogg-packet" );
} catch( ex ) {
    oggPacket = false;
}

// Check if the ogg packet loaded successfully.
if( oggPacket ) {

    // ogg packet loaded successfully. Encoder and Decoder can be used.

    exports.Encoder = require( './lib/Encoder' );
    exports.Decoder = require( './lib/Decoder' );

} else {

    // ogg packet not available.
    exports.Encoder = exports.Decoder = function() {
        throw new Error(
                "ogg-packet is not available. " +
                "Only the raw OpusEncoder can be used. " +
                "Install ogg-packet package to use the Encoder and Decoder" );
    } ;
}

