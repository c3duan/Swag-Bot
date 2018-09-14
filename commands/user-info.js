module.exports = {
    name: 'user-info',
    description: 'user information',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    },
};