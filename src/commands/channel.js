const Discord = require('discord.js');
const channelTypes = {
    dm: 'DM',
    group: 'Group DM',
    text: 'Text Channel',
    voice: 'Voice Channel',
    category: 'Category',
    unknown: 'Unknown',
};

module.exports = {
    name: 'channel',
    description: 'provides detailed infos about a particular channel in the guild',
    usage: '[channel name | optional]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const channel = message.channel || message.guild.channels.get(args[0]);

        if (!channel) {
            return message.reply('please enter a valid channel.');
        }
       
        const channelEmbed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setThumbnail(message.guild.iconURL)
                .setTitle('Channel Info')
                .addField(':arrow_right: Name', channel.type === 'dm' ? `<@${channel.recipient.username}>` : channel.name, true)
                .addField(':arrow_right: ID', channel.id, true)
                .addField(':arrow_right: Creation Date', channel.createdAt.toDateString(), true)
                .addField(':arrow_right: NSFW', channel.nsfw ? 'Yes' : 'No', true)
                .addField(':arrow_right: Category', channel.parent ? channel.parent.name : 'None', true)
                .addField(':arrow_right: Type', channelTypes[channel.type], true)
                .addField(':arrow_right: Topic', channel.topic || 'None', true);

        message.channel.send(channelEmbed);
    },
};