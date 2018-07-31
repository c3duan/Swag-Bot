
"use strict";

var fs = require( 'fs' );
var lame = require( 'lame' );
var opus = require( '../' );
var ogg = require( 'ogg' );

var opusFile = fs.createWriteStream( 'test.opus' );

var mp3Decoder = new lame.Decoder();
var opusEncoder = new opus.Encoder( 48000, 2 );
var oggEncoder = new ogg.Encoder();

process.stdin.pipe( mp3Decoder ).pipe( opusEncoder ).pipe( oggEncoder.stream() );
oggEncoder.pipe( process.stdout );

