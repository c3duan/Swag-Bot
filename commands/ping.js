module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    execute(client, message, args) {
        message.channel.send('Pong.');
    },
};
