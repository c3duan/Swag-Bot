const Discord = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'show the remaing queue of songs waiting to be played',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const server = guilds[message.guild.id];
        const queue = server.queueNames;
        if (queue.length < 1) {
            return message.channel.send('No songs remain in the queue.');
        }

        let embed = new Discord.RichEmbed()
            .setTitle('Current PlayList');
            
        for(let i = 0; i < queue.length; i++) {
            embed = embed.addField('❯ Video/Song Name:', queue[i]);
        }
        return message.channel.send(embed);
    }
}