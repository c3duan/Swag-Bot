module.exports = {
    name: 'beep',
    description: 'Beep!',
    execute(client, api, config, message, args) {
        message.channel.send('Boop.');
    },
};