const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'server info',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!message.guild.members.has(message.guild.ownerID)) await message.guild.members.fetch(message.guild.ownerID);
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.addField(':arrow_right: Name', message.guild.name, true)
			.addField(':arrow_right: ID', message.guild.id, true)
			.addField(':arrow_right: Region', message.guild.region.toUpperCase(), true)
			.addField(':arrow_right: Creation Date', message.guild.createdAt.toDateString(), true)
			.addField(':arrow_right: Owner', message.guild.owner.user.tag, true)
			.addField(':arrow_right: Members', message.guild.memberCount, true)
			.addField(':arrow_right: Roles', message.guild.roles.map(role => role.toString()).join(' **|** '), true)
            .addField(':arrow_right: Categories', message.guild.channels.filter(channel => channel.type === 'category').map(category => category.toString()).join(' **|** '), true)
            .addField(':arrow_right: Channels', message.guild.channels.filter(channel => channel.type !== 'category').map(channel => channel.toString()).join(' **|** '), true);
        
        return message.channel.send(embed);
    },
};