
#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <node_object_wrap.h>
#include "../deps/opus/include/opus.h"
#include "common.h"
#include <nan.h>

#include <string.h>

using namespace node;
using namespace v8;

#define FRAME_SIZE 960
#define MAX_FRAME_SIZE 6*960
#define MAX_PACKET_SIZE (3*1276)
#define BITRATE 64000

const char* getDecodeError( int decodedSamples ) {
	switch( decodedSamples ) {
		case OPUS_BAD_ARG:
			return "One or more invalid/out of range arguments";
		case OPUS_BUFFER_TOO_SMALL:
			return "The mode struct passed is invalid";
		case OPUS_INTERNAL_ERROR:
			return "An internal error was detected";
		case OPUS_INVALID_PACKET:
			return "The compressed data passed is corrupted";
		case OPUS_UNIMPLEMENTED:
			return "Invalid/unsupported request number.";
		case OPUS_INVALID_STATE:
			return "An encoder or decoder structure is invalid or already freed.";
		case OPUS_ALLOC_FAIL:
			return "Memory allocation has failed";
		default:
			return "Unknown OPUS error";
	}
}

class OpusEncoder : public ObjectWrap {
	private:
		OpusEncoder* encoder;
		OpusDecoder* decoder;

		opus_int32 rate;
		int channels;
		int application;

		unsigned char outOpus[ MAX_PACKET_SIZE ];
		opus_int16* outPcm;

	protected:
		int EnsureEncoder() {
			if( encoder != NULL ) return 0;
			int error;
			encoder = opus_encoder_create( rate, channels, application, &error );
			return error;
		}
		int EnsureDecoder() {
			if( decoder != NULL ) return 0;
			int error;
			decoder = opus_decoder_create( rate, channels, &error );
			return error;
		}

	public:
	   	OpusEncoder( opus_int32 rate, int channels, int application ):
			encoder( NULL ), decoder( NULL ),
			rate( rate ), channels( channels ), application( application ) {

			outPcm = new opus_int16[ channels * MAX_FRAME_SIZE ];
		}

		~OpusEncoder() {
			if( encoder != NULL )
				opus_encoder_destroy( encoder );
			if( decoder != NULL )
				opus_decoder_destroy( decoder );

			encoder = NULL;
			decoder = NULL;

			delete outPcm;
			outPcm = NULL;
		}

		static void Encode( const Nan::FunctionCallbackInfo< v8::Value >& info ) {

			// Unwrap the encoder.
			OpusEncoder* self = ObjectWrap::Unwrap<OpusEncoder>( info.This() );
			if( self->EnsureEncoder() != OPUS_OK ) {
				Nan::ThrowError( "Could not create encoder. Check the encoder parameters" );
				return;
			}


			// Read the function arguments
			REQ_OBJ_ARG( 0, pcmBuffer );
			OPT_INT_ARG( 1, maxPacketSize, MAX_PACKET_SIZE );

			// Read the PCM data.
			char* pcmData = Buffer::Data(pcmBuffer);
			opus_int16* pcm = reinterpret_cast<opus_int16*>( pcmData );
			int frameSize = Buffer::Length( pcmBuffer ) / 2 / self->channels;

			// Encode the samples.
			int compressedLength = opus_encode( self->encoder, pcm, frameSize, &(self->outOpus[0]), maxPacketSize );

			// Create a new result buffer.
			Nan::MaybeLocal<Object> actualBuffer = Nan::CopyBuffer(reinterpret_cast<char*>(self->outOpus), compressedLength );
			if( !actualBuffer.IsEmpty() )
				info.GetReturnValue().Set( actualBuffer.ToLocalChecked() );
		}

		static void Decode( const Nan::FunctionCallbackInfo< v8::Value >& info ) {

			REQ_OBJ_ARG( 0, compressedBuffer );

			// Read the compressed data.
			unsigned char* compressedData = (unsigned char*)Buffer::Data( compressedBuffer );
			size_t compressedDataLength = Buffer::Length( compressedBuffer );

			OpusEncoder* self = ObjectWrap::Unwrap<OpusEncoder>( info.This() );
			if( self->EnsureDecoder() != OPUS_OK ) {
				Nan::ThrowError( "Could not create decoder. Check the decoder parameters" );
				return;
			}

			// Encode the samples.
			int decodedSamples = opus_decode(
					self->decoder,
					compressedData,
					compressedDataLength,
					&(self->outPcm[0]),
				   	MAX_FRAME_SIZE, /* decode_fex */ 0 );

			if( decodedSamples < 0 ) {
				return Nan::ThrowTypeError( getDecodeError( decodedSamples ) );
			}

			// Create a new result buffer.
			int decodedLength = decodedSamples * 2 * self->channels;
			Nan::MaybeLocal<Object> actualBuffer = Nan::CopyBuffer( reinterpret_cast<char*>(self->outPcm), decodedLength );
			if( !actualBuffer.IsEmpty() )
				info.GetReturnValue().Set( actualBuffer.ToLocalChecked() );
		}

		static void ApplyEncoderCTL( const Nan::FunctionCallbackInfo< v8::Value >&info ) {

			REQ_INT_ARG( 0, ctl );
			REQ_INT_ARG( 1, value );
			
			OpusEncoder* self = ObjectWrap::Unwrap<OpusEncoder>( info.This() );
			if ( self->EnsureEncoder() != OPUS_OK ) {
				Nan::ThrowError( "Could not create encoder. Check the encoder parameters" );
				return;
			}

			if( opus_encoder_ctl( self->encoder, ctl, value ) != OPUS_OK )
				return Nan::ThrowError( "Invalid ctl/value" );
		}

		static void ApplyDecoderCTL( const Nan::FunctionCallbackInfo< v8::Value >&info ) {

			REQ_INT_ARG( 0, ctl );
			REQ_INT_ARG( 1, value );

			OpusEncoder* self = ObjectWrap::Unwrap<OpusEncoder>( info.This() );
			if ( self->EnsureDecoder() != OPUS_OK ) {
				Nan::ThrowError( "Could not create decoder. Check the decoder parameters" );
				return;
			}

			if ( opus_decoder_ctl( self->decoder, ctl, value ) != OPUS_OK)
				return Nan::ThrowError( "Invalid ctl/value" );
		}

		static void SetBitrate( const Nan::FunctionCallbackInfo< v8::Value >& info ) {

			REQ_INT_ARG( 0, bitrate );

			OpusEncoder* self = ObjectWrap::Unwrap<OpusEncoder>( info.This() );
			if( self->EnsureEncoder() != OPUS_OK ) {
				Nan::ThrowError( "Could not create encoder. Check the encoder parameters" );
				return;
			}

			if( opus_encoder_ctl( self->encoder, OPUS_SET_BITRATE( bitrate ) ) != OPUS_OK )
				return Nan::ThrowError( "Invalid bitrate" );
		}

		static void GetBitrate( const Nan::FunctionCallbackInfo< v8::Value >& info ) {

			OpusEncoder* self = ObjectWrap::Unwrap<OpusEncoder>( info.This() );
			if( self->EnsureEncoder() != OPUS_OK ) {
				Nan::ThrowError( "Could not create encoder. Check the encoder parameters" );
				return;
			}

			opus_int32 bitrate;
			opus_encoder_ctl( self->encoder, OPUS_GET_BITRATE( &bitrate ) );

			info.GetReturnValue().Set( Nan::New<v8::Integer>( bitrate ) );
		}

		static void New( const Nan::FunctionCallbackInfo< v8::Value >& info ) {

			if( !info.IsConstructCall() ) {
				return Nan::ThrowTypeError("Use the new operator to construct the OpusEncoder.");
			}

			OPT_INT_ARG( 0, rate, 48000 );
			OPT_INT_ARG( 1, channels, 1 );
			OPT_INT_ARG( 2, application, OPUS_APPLICATION_AUDIO );

			OpusEncoder* encoder = new OpusEncoder( rate, channels, application );

			encoder->Wrap( info.This() );
			info.GetReturnValue().Set( info.This() );
		}

		static void Init( Local<Object> exports ) {
			Nan::HandleScope scope;

			Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>( New );
			tpl->SetClassName(Nan::New("OpusEncoder").ToLocalChecked());
			tpl->InstanceTemplate()->SetInternalFieldCount( 1 );

			Nan::SetPrototypeMethod( tpl, "encode", Encode );
			Nan::SetPrototypeMethod( tpl, "decode", Decode );
			Nan::SetPrototypeMethod( tpl, "applyEncoderCTL", ApplyEncoderCTL );
			Nan::SetPrototypeMethod( tpl, "applyDecoderCTL", ApplyDecoderCTL );
			Nan::SetPrototypeMethod( tpl, "setBitrate", SetBitrate );
			Nan::SetPrototypeMethod( tpl, "getBitrate", GetBitrate );

			//v8::Persistent<v8::FunctionTemplate> constructor;
			//Nan::AssignPersistent(constructor, tpl);
			exports->Set( Nan::New("OpusEncoder").ToLocalChecked(), tpl->GetFunction() );
		}
};


void NodeInit( Local< Object > exports ) {
	OpusEncoder::Init( exports );
}

NODE_MODULE(node_opus, NodeInit)
