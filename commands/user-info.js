const Discord = require('discord.js');

module.exports = {
    name: 'user-info',
    aliases: ['user'],
    description: 'user information',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        const user = message.author;

        const roles = member.roles.map(role => role.toString());
        const color = member.roles.find(role => role.name.charAt(0) === '#');
        const embed = new Discord.RichEmbed()
            .setTitle(`${user.username}`)
            .setColor(color.hexColor)
            .setThumbnail(user.displayAvatarURL)
            .addField('Username', user.username, true)
            .addField('Nickname', member.username, true)
            .addField('ID', user.id, true)
            .addField('Account Created', user.createdAt.toDateString(), true)
            .addField('Joined Server', member.joinedAt.toDateString(), true)
            .addField('Roles', roles.join(' **|** '), true)
            .setFooter('User Info', user.displayAvatarURL);

        message.channel.send(embed);
    },
};