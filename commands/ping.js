module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Ping!',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        message.channel.send('Pong.');
    },
};
