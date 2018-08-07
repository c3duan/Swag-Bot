module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    execute(client, api, config, message, args, con) {
        message.channel.send('Pong.');
    },
};
