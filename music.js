const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYouTuberID = require('get-youtube-id');
const Circular = require('circular-json');
const config = require('./config.json');
const yt_api_key = config.youtube_api_key;

module.exports = {
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
    addToQueue(strID, GuildQueue) {
        if (this.isYoutube(strID)) {
            GuildQueue.queue.push(getYouTuberID(strID));
        }
        else {
            GuildQueue.queue.push(strID);
        }
    },
    playMusic(id, message, GuildQueue) {
        GuildQueue.voiceChannel = message.member.voiceChannel;

        console.log('in here');

        if (!GuildQueue.voiceChannel) {
            return message.reply(' please join a voice channel first!');
        }
        
        GuildQueue.voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=' + id, { filter: 'audioonly' });
            GuildQueue.dispatcher = connection.playStream(stream);
            GuildQueue.skipReq = 0;
            GuildQueue.skippers = [];
            
            GuildQueue.dispatcher.on('end', () => {
                GuildQueue.skipReq = 0;
                GuildQueue.skippers = [];
                GuildQueue.queue.shift();
                GuildQueue.queueNames.shift();
                if (GuildQueue.queue.length === 0) {
                    GuildQueue.queue = [];
                    GuildQueue.queueNames = [];
                    GuildQueue.isPlaying = false;
                }
                else {
                    this.playMusic(GuildQueue.queue[0], message, GuildQueue);
                }
            });
            console.log('music ready!');
        });
    },
    skipSong(message, GuildQueue) {
        GuildQueue.dispatcher.end();
        if (GuildQueue.queue.length > 1) {
            this.playMusic(GuildQueue.queue[0], message, GuildQueue);
        }
        else {
            GuildQueue.skipReq++;
            GuildQueue.skippers = [];
        }
    },
    pauseSong(message, GuildQueue) {
        if (GuildQueue.isPlaying) {
            GuildQueue.dispatcher.pause();
            GuildQueue.isPlaying = false;
        }
        else {
            message.channel.reply(', someone has already paused the queue.');
        }
    },
    resumeSong(message, GuildQueue) {
        if (!GuildQueue) {
            GildQueue.dispatcher.resume();
            GuildQueue.isPlaying = true;
        }
        else {
            message.channel.reply(', the queue is already playing.');
        }
    },
    setVolume(volume, GuildQueue) {
        GuildQueue.dispatcher.setBitrate(volume);
    },
    writeGuilds(guilds) {
        fs.writeFile('./guilds.json', Circular.stringify(guilds, null, 4), err => {
            if (err) {
                throw err;
            }
        });
    },
};
