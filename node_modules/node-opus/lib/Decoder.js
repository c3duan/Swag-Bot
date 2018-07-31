
var util = require( 'util' );
var Transform = require( 'stream' ).Transform;
var ogg_packet = require( 'ogg-packet' );

var OpusEncoder = require( './OpusEncoder' );

var Decoder = function( rate, channels, frameSize ) {
    Transform.call( this, { writableObjectMode: true } );

    this.rate = rate || 48000;
    this.channels = channels || 1;
    this.frameSize = frameSize || this.rate * 0.04;

    this.encoder = null;

	this.header = {};
	this.tags = null;
    this.pos = 0;
    this.samplesWritten = 0;

	this.packetBuffer = [];
};
util.inherits( Decoder, Transform );

/**
 * Transform stream callback
 */
Decoder.prototype._transform = function( packet, encoding, done ) {

	// Write the header if it hasn't been written yet
    if( !this.encoder ) {
		this._parseHeader( packet );
    } else if( !this.tags ) {
		// TODO: Not implemented
		// this._parseTags( packet );
		this.tags = {};
	} else {
		this._processInput( packet );
	}

    done();
};

Decoder.prototype._parseHeader = function( packet ) {

	var header = packet.packet;

	var signature = header.slice( 0, 8 );
	if( signature.toString( 'ascii' ) !== 'OpusHead' ) {
		return this.emit( 'error', 'Bad header' );
	}

	this.header.version = header.readUInt8( 8 );
	this.header.channels = header.readUInt8( 9 );
	this.header.preSkip = header.readUInt16LE( 10 );
	this.header.rate = header.readUInt32LE( 12 );
	this.header.gain = header.readUInt16LE( 16 );
	this.header.channelMap = header.readUInt8( 18 );

	this.emit( 'format', {
        channels: this.channels,
        sampleRate: this.rate,
        bitDepth: 16,
        float: false,
        signed: true,

        gain: this.header.gain,
        preSkip: this.header.preSkip,
        version: this.header.version
    });

	this.encoder = new OpusEncoder( this.rate, this.channels );
};

Decoder.prototype._processInput = function( packet ) {

	var frame = packet.packet;

	var pcm = this.encoder.decode( frame );
	this.push( pcm );
};

module.exports = Decoder;


