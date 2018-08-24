const music = require('../music.js');

module.exports = {
    name: 'resume',
    description: 'resume playing the paused song',
    usage: '[volume]',
    execute(client, api, config, message, args, con, guilds) {
        let server = guilds[message.guild.id];
        let volume = parseInt(args[0]);
        music.setVolume(volume, server);
    },
};