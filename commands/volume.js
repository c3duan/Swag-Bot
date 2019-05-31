const music = require('../music.js');

module.exports = {
    name: 'volume',
    description: 'resume playing the paused song',
    usage: '[volume]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let server = guilds[message.guild.id];
        let volume = parseInt(args[0]);
        music.setVolume(volume, server);
    },
};