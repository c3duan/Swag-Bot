const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban someone off the channel',
    usage: '[tagged user] [ban reason]',
    guildOnly: true,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to ban them!');
        }
        else {
            // grab the "first" mentioned user from the message
            // this will return a `User` object, just like `message.author`
            const taggedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

            if (!taggedUser) {
                message.channel.send('Can\'t find user!');
            }

            let reason = args.join(' ').slice(22);

            if (!message.member.hasPermission('MANAGE_MEMBERS')) {
                return message.channel.send('No, can\'t do it pal!');
            }
            if (taggedUser.hasPermission('MANAGE_MESSAGES')) {
                return message.channel.send('The person can\'t be baned!');
            }

            let banEmbed = new Discord.RichEmbed()
                .setTitle('~Ban~')
                .setColor(0xbc0000)
                .addField('Baned User', `${taggedUser} with ID: ${taggedUser.id}`)
                .addField('Baned By', `<@${message.author.id}> with ID: ${message.author.id}`)
                .addField('Baned From', `${message.channel}`)
                .addField('Reason', reason)
                .setTimestamp(new Date())
                .setFooter('RIP');
            
            let banChannel = message.guild.channels.find('name', 'incidents');
            if (!banChannel) {
                return message.channel.send('Can\'t find incidents channel');
            }

            message.guild.member(taggedUser).ban(reason);
            banChannel.send(banEmbed);
        }
    },
};