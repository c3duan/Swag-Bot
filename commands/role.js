module.exports = {
    name: 'role',
    description: 'Information regarding the role of the user in current channel',
    execute(client, api, config, message, args, con) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to see their role!');
        }
        else {
            // grab the "first" mentioned user from the message
            // this will return a `User` object, just like `message.author`
            const taggedUser = message.mentions.users.first();
            const userRole = message.guild.roles.find(taggedUser.username);

            message.channel.send(`${taggedUser.username}'s role: ${userRole}`);
        }
    },
};