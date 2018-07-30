// Const
const Uglify = require('uglifyjs-webpack-plugin');

// Exporting
module.exports = {
    entry: './index.js',
    output: {filename: 'expand.js', path: `${__dirname}/dist`},
    node: {Buffer: false},
    plugins: [new Uglify({uglifyOptions: {output: {comments: /^$/}}})]
};
