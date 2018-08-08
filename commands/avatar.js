module.exports = {
    name: 'avatar',
    aliases: ['icon', 'logo'],
    description: 'display the image and url of users\' avatar',
    usage: '[tagged users]',
    execute(client, api, config, message, args, con) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    },
};