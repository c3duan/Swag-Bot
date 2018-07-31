#!/usr/bin/env node

"use strict";

var opus = require('../');
var ogg = require('ogg');
var fs = require('fs');
var program = require('commander');
var packagejson = require('../package.json');

function toInt( n ) { return parseInt( n ); }

program
    .version( packagejson.version )
    .option('--bitrate [N.nnn]',
        'Set target bitrate in kbit/sec (6-256 per channel, default: 64)',
        toInt, 64 )
    .option('--rate [N]',
        'Set sampling rate for raw input (default: 48000)',
        toInt, 48000 )
    .option('--channels [N]',
        'Set sampling channels for raw input (default: 2)',
        toInt, 48000 )
    .arguments( '<input> <output>' )
    .parse( process.argv );

if( program.args.length !== 2 )
    program.help();

// Open the output streams.
var input_raw = fs.createReadStream( program.args[ 0 ] );
var output = fs.createWriteStream( program.args[ 1 ] );

var oggDecoder = new ogg.Decoder();
oggDecoder.on( 'stream', function( stream ) {

    // Create the decoder based on the command parameters.
    var decoder = new opus.Decoder( program.rate, program.channels );
	decoder.on( 'format', function( format ) {
		decoder.pipe( output );
	});
	decoder.on( 'error', function( err ) {
		console.error( err );
	});

	stream.pipe( decoder );
});

input_raw.pipe( oggDecoder )

