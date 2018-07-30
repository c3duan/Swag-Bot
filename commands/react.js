module.exports = {
    name: 'react',
    description: 'emoji reaction toward specific comments',
    usage: '<react>',
    cooldown: 5,
    execute(client, api, config, message, args) {
        message.react('😄');
    },
};