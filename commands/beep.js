module.exports = {
    name: 'beep',
    description: 'Beep!',
    execute(client, message, args) {
        message.channel.send('Boop.');
    },
};