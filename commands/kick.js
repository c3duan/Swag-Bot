const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'kick someone off the channel',
    usage: '[tagged user] [kick reason]',
    guildOnly: true,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!');
        }
        else {
            // grab the "first" mentioned user from the message
            // this will return a `User` object, just like `message.author`
            const taggedUser = message.mentions.users.first() || message.guild.members.get(args[0]);

            if (!taggedUser) {
                message.channel.send('Can\'t find user!');
            }

            let reason = args.join(' ').slice(22);

            if (!message.member.hasPermission('MANAGE_MESSAGES')) {
                return message.channel.send('No, can\'t do it pal!');
            }
            if (taggedUser.hasPermission('MANAGE_MESSAGES')) {
                return message.channel.send('The person can\'t be kicked!');
            }

            let kickEmbed = new Discord.RichEmbed()
                .setTitle('~Kick~')
                .setColor(0x15f153)
                .addField('Kicked User', `${taggedUser} with ID: ${taggedUser.id}`)
                .addField('Kicked By', `<@${message.author.id}> with ID: ${message.author.id}`)
                .addField('Kicked From', `${message.channel}`)
                .addField('Reason', reason)
                .setTimestamp(new Date())
                .setFooter('RIP');
            
            let kickChannel = message.guild.channels.find('name', 'incidents');

            if (!kickChannel) {
                return message.channel.send('Can\'t find incidents channel');
            }

            message.guild.member(taggedUser).kick(reason);
            kickChannel.send(kickEmbed);
        }
    },
};