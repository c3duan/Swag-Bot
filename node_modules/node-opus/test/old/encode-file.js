
var ogg = require( 'ogg' );
var opus = require( '../../' );

var oggEncoder = new ogg.Encoder();
var opusEncoder = new opus.Encoder();

process.stdin.pipe( opusEncoder );
opusEncoder.pipe( oggEncoder.stream() );
oggEncoder.pipe( process.stdout );


