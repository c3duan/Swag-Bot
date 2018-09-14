const fs = require('fs');

module.exports = {
    name: 'mute',
    description: 'mute a specific user',
    usage: '[tagged user] [mute time]',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('You cannot manage messages.');
        }

        let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toMute) {
            return message.channel.send('You did not specifc a user mention ID!');
        }

        if (toMute.id == message.author.id) {
            return message.channel.send('You cannot mute yourself!');
        }

        if (toMute.highestRole.position >= message.member.highestRole.position) {
            return message.channel.send('You cannot mute a member who is higher or has the same role as you!');
        }

        let role = message.guild.roles.find(r => r.name == 'Swag Muted');

        if (!role) {
            try {
                role = await message.guild.createRole({
                    name: 'Swag Muted',
                    color: '#000000',
                    permissions: [],
                });

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    });
                });
            }
            catch (e) {
                console.log(e.stack);
            }
        }

        if (toMute.roles.has(role.id)) {
            return message.channel.send('This user is already muted!');
        }

        if (isNaN(args[1])) {
            return message.reply('Mute time doesn\'t seem to be a valid number');
        }

        client.mutes[toMute.id] = {
            guild: message.guild.id,
            time: Date.now() + parseInt(args[1]) * 1000,
        };

        fs.writeFile('./mute.json', JSON.stringify(client.mutes, null, 4), err => {
            if (err) {
                throw err;
            }
            message.channel.send('I have muted this user!');
        });

        await toMute.addRole(role);
    },
};