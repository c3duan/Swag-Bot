const Discord = require('discord.js');

module.exports = {
    name: 'creator',
    description: 'gives info about the creator of this super awesome discord bot',
    execute(client, api, config, message, args) {

        const creator = new Discord.RichEmbed()
            .setColor(0xf1c40f)
            .setTitle('Software Engineer')
            .setAuthor('Arnold_Duan#1888', 'https://cdn.discordapp.com/avatars/465817882929004544/e2ae1c6930cb5716e11faa2253d4939b.png?size=2048')
            .setThumbnail('https://cdn.discordapp.com/avatars/465817882929004544/e2ae1c6930cb5716e11faa2253d4939b.png?size=2048')
            .setDescription('Best coder in this channel, respect him under any circumstances. His almght codes give me (swag-bot) enormous amount of power.')
            .setTimestamp(new Date())
            .setFooter('Arnold Duan', 'https://cdn.discordapp.com/avatars/465817882929004544/e2ae1c6930cb5716e11faa2253d4939b.png?size=2048');

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(creator);
    },
};