
var ogg = require( 'ogg' );
var opus = require( '../../' );

var oggDecoder = new ogg.Decoder();

oggDecoder.on( 'stream', function( stream ) {

	var opusDecoder = new opus.Decoder();
	opusDecoder.on( 'format', function( format ) {
		opusDecoder.pipe( process.stdout );
	});
	opusDecoder.on( 'error', function( err ) {
		console.log( err );
	});

	stream.pipe( opusDecoder );
});

process.stdin.pipe( oggDecoder );


