#!/usr/bin/env node

"use strict";

var opus = require('../');
var ogg = require('ogg');
var fs = require('fs');
var program = require('commander');
var packagejson = require('../package.json');

function toInt( n ) { return parseInt( n ); }

program
    .version( packagejson.version )
    .option('--serial [serialno]',
        'Set the serial number for the stream instead of using random. Meant for debugging.',
        toInt, null )
    .option('--framesize [size]',
        'Set maximum frame size in milliseconds (2.5, 5, 10, 20, 40, 60, default: 20)',
        toInt, 20 )
    .option('--raw-rate [N]',
        'Set sampling rate for raw input (default: 48000)',
        toInt, 48000 )
    .option('--raw-chan [N]',
        'Set number of channels for raw input (default: 2)',
        toInt, 2 )
    .arguments( '<input> <output>' )
    .parse( process.argv );

if( program.args.length !== 2 )
    program.help();

// Create the encoder based on the command parameters.
var framebytes = program.rawRate * program.framesize / 1000;
var encoder = new opus.Encoder( program.rawRate, program.rawChan, framebytes );

// Open the output streams.
var input_raw = fs.createReadStream( program.args[ 0 ] );
var output = fs.createWriteStream( program.args[ 1 ] );

var oggEncoder = new ogg.Encoder();
input_raw.pipe( encoder ).pipe( oggEncoder.stream( program.serial ) )
oggEncoder.pipe( output )
