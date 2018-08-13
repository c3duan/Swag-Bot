const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYouTuberID = require('get-youtube-id');
const fetchViedoInfo = require('youtube-info');
const config = require('../config.json');
const yt_api_key = config.youtube_api_key;

let queue = [];
let isPlaying = false;
let dispatcher = null;
let voiceChannel = null;
let skipReq = 0;
let skippers = [];

module.exports = {
    name: 'play',
    description: 'plays a specific music from youtube',
    usage: '[youtube video link]',
    isYoutube(str) {
        return str.toLowerCase().indexOf('youtube.com') > -1;
    },
    searchVideo(query, callback) {
        request('https://www.googleapis.com/youtube/v3/search?part=id&type=viedo&q=' + encodeURIComponent(query) + '&key=' + yt_api_key, (error, response, body) => {
            if (error) {
                throw error;
            }
            let json = JSON.parse(body);
            if (!json.items[0]) {
                callback('3_-a9nVZYjk');
            }
            else {
                console.log(json.items[0].id);
                callback(json.items[0].id.videoId);
            }
        });
    },
    getID(str, cb) {
        if (this.isYoutube(str)) {
            cb(getYouTuberID(str));
        }
        else {
            this.searchVideo(str, (id) => {
                cb(id);
            });
        }
    },
    addToQueue(strID) {
        if (this.isYoutube(strID)) {
            queue.push(getYouTuberID(strID));
        }
        else {
            queue.push(strID);
        }
    },
    playMusic(id, message) {
        voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) {
            return message.reply(' please join a voice channel first!');
        }
        
        voiceChannel.join().then(connection => {
            console.log(id);
            const stream = ytdl('https://www.youtube.com/watch?v=' + id, { filter: 'audioonly' });
            dispatcher = connection.playStream(stream);
            console.log(dispatcher);
            skipReq = 0;
            skippers = [];
            
            dispatcher.on('end', () => {
                skipReq = 0;
                skippers = [];
                queue.shift();
                if (queue.length === 0) {
                    queue = [];
                    isPlaying = false;
                }
                else {
                    this.playMusic(queue[0], message);
                }
            });
            console.log('music ready!');
        });
    },
    execute(client, api, config, message, args, con) {
        if (message.channel.type !== 'text') return;

        const member = message.member;

        if (!member) {
            return message.reply('please join a voice channel first!');
        }

        let videoName = args.join(' ');

        if (queue.length > 0 || isPlaying) {
            this.getID(videoName, (id) => {
                if (!id) {
                    return message.reply(', no video include that name!');
                }
                this.addToQueue(id);
                fetchViedoInfo(id, (err, videoInfo) => {
                    if (err) {
                        throw new Error(err);
                    }
                    message.reply(' added to queue: **' + videoInfo.title + '**');
                });
            });
        }
        else {
            isPlaying = true;
            this.getID(videoName, (id) => {
                if (!id) {
                    return message.reply(', no video include that name!');
                }
                queue.push(id);
                this.playMusic(id, message);
                fetchViedoInfo(id, (err, videoInfo) => {
                    if (err) {
                        throw new Error(err);
                    }
                    message.reply(' added to queue: **' + videoInfo.title + '**');
                });
            });
        }
    },
};