const fs = require('fs');

module.exports = {
    name: 'unmute',
    description: 'unmute a specific user',
    usage: '[tagged user]',
    async execute(client, api, config, message, args, con, guilds) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('You cannot manage messages.');
        }

        let toUnmute = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toUnmute) {
            return message.channel.send('You did not specifc a user mention ID!');
        }

        if (toUnmute.id == message.author.id) {
            return message.channel.send('You cannot Unmute yourself!');
        }

        if (toUnmute.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send('You cannot unmute a member who is higher or has the same role as you!');
        }

        let role = message.guild.roles.find(r => r.name === 'Swag Muted');

        if (!role || !toUnmute.roles.has(role.id)) {
            return message.channel.send('This user is not muted!');
        }

        await toUnmute.removeRole(role);

        delete client.mutes[toUnmute.id];

        fs.writeFile('./mute.json', JSON.stringify(client.mutes), err => {
            if (err) {
                throw err;
            }
            message.client.send(`I have unmuted ${toUnmute.user.tag}.`);
        });
    },
};