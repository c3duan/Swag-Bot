module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    execute(client, api, config, message, args) {
        message.channel.send('Pong.');
    },
};
