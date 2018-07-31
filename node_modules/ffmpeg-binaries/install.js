const { get } = require('https');
const { cursorTo } = require('readline');
const decompress = require('decompress');
const tarxz = require('decompress-tarxz');
const unzip = require('decompress-unzip');

function callback(res) {
  let last;
  let complete = 0;
  const total = parseInt(res.headers['content-length'], 10);

  let index = 0;
  const buf = Buffer.alloc(total);

  res.on('data', (chunk) => {
    chunk.copy(buf, index);
    index += chunk.length;

    complete += chunk.length;
    const progress = Math.round((complete / total) * 20);

    if (progress !== last) {
      cursorTo(process.stdout, 0, null);

      process.stdout.write(`Downloading binary: [${'='.repeat(progress)}${[' '.repeat(20 - progress)]}] ${Math.round((complete / total) * 100)}%`);

      last = progress;
    }
  });

  res.on('end', () => {
    cursorTo(process.stdout, 0, null);
    console.log(`Downloading binary: [${'='.repeat(20)}] 100%`);

    decompress(buf, 'bin', {
      plugins: process.platform === 'linux' ? [tarxz()] : [unzip()],
      strip: process.platform === 'linux' ? 1 : 2,
      filter: x => x.path === (process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'),
    });
  });
}

if (process.platform === 'win32') {
  switch (process.arch) {
    case 'x64':
      get('https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-latest-win64-static.zip', callback);
      break;
    case 'ia32':
      get('https://ffmpeg.zeranoe.com/builds/win32/static/ffmpeg-latest-win32-static.zip', callback);
      break;
    default:
      throw new Error('unsupported platform');
  }
} else if (process.platform === 'linux') {
  switch (process.arch) {
    case 'x64':
      get('https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz', callback);
      break;
    case 'ia32':
      get('https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-32bit-static.tar.xz', callback);
      break;
    case 'arm':
      get('https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-armhf-32bit-static.tar.xz', callback);
      break;
    case 'arm64':
      get('https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-arm64-64bit-static.tar.xz', callback);
      break;
    default:
      throw new Error('unsupported platform');
  }
} else if (process.platform === 'darwin') {
  switch (process.arch) {
    case 'x64':
      get('https://ffmpeg.zeranoe.com/builds/macos64/static/ffmpeg-latest-macos64-static.zip', callback);
      break;
    default:
      throw new Error('unsupported platform');
  }
} else {
  throw new Error('unsupported platform');
}
