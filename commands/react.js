module.exports = {
    name: 'react',
    description: 'emoji reaction toward specific comments',
    usage: '[emoji]',
    cooldown: 5,
    execute(client, api, config, message, args, con, guilds) {
        message.react('😄');
    },
};