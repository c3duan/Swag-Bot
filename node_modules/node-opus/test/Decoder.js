
var ogg = require( 'ogg' );
var util = require( 'util' );
var opus = require( '../' );
var path = require( 'path' );
var streamEqual = require( 'stream-equal' );
var fs = require( 'fs' );

describe( 'Decoder', function() {

    var SERIALNO = 1;

    [ 'random', 'sine' ].forEach( function( file ) {
    [ 8000, 48000 ].forEach( function( hzEncode ) {
    [ 1, 2 ].forEach( function( chanEncode ) {
    [ 8000, 48000 ].forEach( function( hzDecode ) {
    [ 1, 2 ].forEach( function( chanDecode ) {

            it( util.format(
                    'should decode %d:%d %s audio in %d:%d Hz',
                    hzEncode, chanEncode, file, hzDecode, chanDecode ),
                function( done ) {


                var inputPath = path.join(
                        path.basename( __dirname ),
                        'data',
                        util.format( '%s-%d-%d-%d.opus',
                            file, hzEncode, chanEncode, 20 ) );
                var input = fs.createReadStream( inputPath );

                var refPath = path.join(
                        path.basename( __dirname ),
                        'data',
                        util.format( '%s-%d-%d-%d-%d-%d.raw',
                            file, hzEncode, chanEncode, 20,
                            hzDecode, chanDecode ) );
                var reference = fs.createReadStream( refPath );

                var decoder = new opus.Decoder( hzDecode, chanDecode );
                var oggDecoder = new ogg.Decoder();
                oggDecoder.on( 'stream', function( stream ) {
                    stream.pipe( decoder );
                });

                input.pipe( oggDecoder )

                streamEqual( decoder, reference, function( err, equal ) {
                    if( err )
                        throw err;

                    if( ! equal ) {
                        throw new Error( util.format(
                                "Streams not equal (%s, %d:%d, %d:%d)",
                                file, hzEncode, chanEncode,
                                hzDecode, chanDecode ) );
                    }

                    done();
                } );

        } );
    } ) } ) } ) } ) } );
} );
