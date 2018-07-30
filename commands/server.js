module.exports = {
    name: 'server',
    description: 'server info',
    execute(client, api, config, message, args) {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    },
};