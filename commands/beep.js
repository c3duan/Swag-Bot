module.exports = {
    name: 'beep',
    description: 'Beep!',
    execute(client, api, config, message, args, con) {
        message.channel.send('Boop.');
    },
};