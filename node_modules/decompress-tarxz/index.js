'use strict';
const decompressTar = require('decompress-tar');
const fileType = require('file-type');
const isStream = require('is-stream');
const lzmaNative = require('lzma-native');

module.exports = () => input => {
	if (!Buffer.isBuffer(input) && !isStream(input)) {
		return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
	}

	if (Buffer.isBuffer(input) && (!fileType(input) || fileType(input).ext !== 'xz')) {
		return Promise.resolve([]);
	}

	const decompressor = lzmaNative.createDecompressor();
	const result = decompressTar()(decompressor);

	if (Buffer.isBuffer(input)) {
		decompressor.end(input);
	} else {
		input.pipe(decompressor);
	}

	return result;
};
