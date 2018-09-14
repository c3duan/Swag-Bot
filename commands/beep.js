module.exports = {
    name: 'beep',
    description: 'Beep!',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        message.channel.send('Boop.');
    },
};