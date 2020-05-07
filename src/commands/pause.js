const music = require('../music.js');

module.exports = {
    name: 'pause',
    description: 'pause the current song that is playing',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let server = guilds[message.guild.id];
        music.pauseSong(message, server);
    },
};