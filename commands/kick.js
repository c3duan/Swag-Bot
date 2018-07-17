module.exports = {
    name: 'kick',
    description: 'fake kick someone off the channel',
    guildOnly: true,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!');
        }
        else {
            // grab the "first" mentioned user from the message
            // this will return a `User` object, just like `message.author`
            const taggedUser = message.mentions.users.first();

            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    },
};