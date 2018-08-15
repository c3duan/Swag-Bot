module.exports = {
    name: 'beep',
    description: 'Beep!',
    execute(client, api, config, message, args, con, guilds) {
        message.channel.send('Boop.');
    },
};