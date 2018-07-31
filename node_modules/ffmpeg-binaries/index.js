const { join } = require('path');

module.exports = join(__dirname, 'bin', `ffmpeg${process.platform === 'win32' ? '.exe' : ''}`);
