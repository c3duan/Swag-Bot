
require( 'chai' ).should();
var ogg = require( 'ogg' );
var util = require( 'util' );
var opus = require( '../' );
var path = require( 'path' );
var streamEqual = require( 'stream-equal' );
var fs = require( 'fs' );

describe( 'Encoder', function() {

    var SERIALNO = 1;

    [ 'random', 'sine' ].forEach( function( file ) {
    [ 8000, 48000 ].forEach( function( hz ) {
    [ 1, 2 ].forEach( function( channels ) {

            it( util.format(
                    'should encode %d Hz, %d channel %s audio',
                    hz, channels, file ),
                function( done ) {


                var inputPath = path.join(
                        path.basename( __dirname ),
                        'data',
                        util.format( '%s.raw', file ) );
                var input = fs.createReadStream( inputPath );

                var refPath = path.join(
                        path.basename( __dirname ),
                        'data',
                        util.format( '%s-%d-%d-%d.opus',
                            file, hz, channels, 20 ) );
                var reference = fs.createReadStream( refPath );

                var bytes = hz * 20 / 1000;
                var encoder = new opus.Encoder( hz, channels, bytes );
                var oggEncoder = new ogg.Encoder();

                input.pipe( encoder ).pipe( oggEncoder.stream( SERIALNO ) );

                streamEqual( oggEncoder, reference, function( err, equal ) {
                    if( err )
                        throw err;
                    equal.should.be.true;
                    done();
                } );

        } );
    } ) } ) } );
} );
