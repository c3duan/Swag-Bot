const music = require('../music.js');

module.exports = {
    name: 'resume',
    description: 'resume playing the paused song',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let server = guilds[message.guild.id];
        music.resumeSong(message, server);
    },
};