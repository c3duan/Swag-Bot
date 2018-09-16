module.exports = {
    name: 'roles',
    description: 'Information regarding the role of the user in current channel',
    usage: '[tagged user]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!args[0]) {
            return message.reply('You need to tag a user in order to see their role!');
        }
        else {
            // grab the "first" mentioned user from the message
            // this will return a `User` object, just like `message.author`
            const taggedUser = message.mentions.members.first() || message.guild.members.get(args[0]);
            const userRoles = taggedUser.roles.filter(role => role.name.charAt(0) !== '#').map(role => role.toString());
            userRoles.shift();

            message.channel.send(`${taggedUser}'s roles: ${userRoles.join(' ')}`);

        }
    },
};