module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    execute(client, api, config, message, args, con, guilds) {
        message.channel.send('Pong.');
    },
};
