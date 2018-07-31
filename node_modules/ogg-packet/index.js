
/**
 * Module dependencies.
 */

var Struct = require('ref-struct');

/**
 * `ogg_packet` is used to encapsulate the data and metadata belonging
 * to a single raw Ogg/Vorbis packet.
 *
 * typedef struct {
 *   unsigned char *packet;
 *   long  bytes;
 *   long  b_o_s;
 *   long  e_o_s;
 *
 *   ogg_int64_t  granulepos;
 *
 *   ogg_int64_t  packetno;       sequence number for decode; the framing
 *                                knows where there's a hole in the data,
 *                                but we need coupling so that the codec
 *                                (which is in a separate abstraction
 *                                layer) also knows about the gap
 * } ogg_packet;
 */

module.exports = Struct({
  packet: 'uchar *',
  bytes: 'long',
  b_o_s: 'long',
  e_o_s: 'long',
  granulepos: 'int64',
  packetno: 'int64'
});
