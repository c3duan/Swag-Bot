#!/bin/sh

OPUSENC="../../bin/opusenc-js.js --serial 1"
OPUSDEC="../../bin/opusdec-js.js"

sox -n -c 1 -b 16 -e unsigned -r 48000 sine.raw synth 0.1 sine 500 gain -0.01
dd if=/dev/urandom bs=1024 count=64 of=random.raw

$OPUSENC --raw-chan 1 --raw-rate 48000 random.raw random-48000-1-20.opus
$OPUSENC --raw-chan 2 --raw-rate 48000 random.raw random-48000-2-20.opus

$OPUSENC --raw-chan 1 --raw-rate 8000 random.raw random-8000-1-20.opus
$OPUSENC --raw-chan 2 --raw-rate 8000 random.raw random-8000-2-20.opus

$OPUSENC --raw-chan 1 --raw-rate 48000 sine.raw sine-48000-1-20.opus
$OPUSENC --raw-chan 2 --raw-rate 48000 sine.raw sine-48000-2-20.opus

$OPUSENC --raw-chan 1 --raw-rate 8000 sine.raw sine-8000-1-20.opus
$OPUSENC --raw-chan 2 --raw-rate 8000 sine.raw sine-8000-2-20.opus


$OPUSDEC --rate 48000 --channels 2 random-48000-1-20.opus random-48000-1-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 2 random-48000-2-20.opus random-48000-2-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 2 random-8000-1-20.opus random-8000-1-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 2 random-8000-2-20.opus random-8000-2-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 1 random-48000-1-20.opus random-48000-1-20-48000-1.raw
$OPUSDEC --rate 48000 --channels 1 random-48000-2-20.opus random-48000-2-20-48000-1.raw
$OPUSDEC --rate 48000 --channels 1 random-8000-1-20.opus random-8000-1-20-48000-1.raw
$OPUSDEC --rate 48000 --channels 1 random-8000-2-20.opus random-8000-2-20-48000-1.raw

$OPUSDEC --rate 8000 --channels 2 random-48000-1-20.opus random-48000-1-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 2 random-48000-2-20.opus random-48000-2-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 2 random-8000-1-20.opus random-8000-1-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 2 random-8000-2-20.opus random-8000-2-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 1 random-48000-1-20.opus random-48000-1-20-8000-1.raw
$OPUSDEC --rate 8000 --channels 1 random-48000-2-20.opus random-48000-2-20-8000-1.raw
$OPUSDEC --rate 8000 --channels 1 random-8000-1-20.opus random-8000-1-20-8000-1.raw
$OPUSDEC --rate 8000 --channels 1 random-8000-2-20.opus random-8000-2-20-8000-1.raw

$OPUSDEC --rate 48000 --channels 2 sine-48000-1-20.opus sine-48000-1-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 2 sine-48000-2-20.opus sine-48000-2-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 2 sine-8000-1-20.opus sine-8000-1-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 2 sine-8000-2-20.opus sine-8000-2-20-48000-2.raw
$OPUSDEC --rate 48000 --channels 1 sine-48000-1-20.opus sine-48000-1-20-48000-1.raw
$OPUSDEC --rate 48000 --channels 1 sine-48000-2-20.opus sine-48000-2-20-48000-1.raw
$OPUSDEC --rate 48000 --channels 1 sine-8000-1-20.opus sine-8000-1-20-48000-1.raw
$OPUSDEC --rate 48000 --channels 1 sine-8000-2-20.opus sine-8000-2-20-48000-1.raw

$OPUSDEC --rate 8000 --channels 2 sine-48000-1-20.opus sine-48000-1-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 2 sine-48000-2-20.opus sine-48000-2-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 2 sine-8000-1-20.opus sine-8000-1-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 2 sine-8000-2-20.opus sine-8000-2-20-8000-2.raw
$OPUSDEC --rate 8000 --channels 1 sine-48000-1-20.opus sine-48000-1-20-8000-1.raw
$OPUSDEC --rate 8000 --channels 1 sine-48000-2-20.opus sine-48000-2-20-8000-1.raw
$OPUSDEC --rate 8000 --channels 1 sine-8000-1-20.opus sine-8000-1-20-8000-1.raw
$OPUSDEC --rate 8000 --channels 1 sine-8000-2-20.opus sine-8000-2-20-8000-1.raw
