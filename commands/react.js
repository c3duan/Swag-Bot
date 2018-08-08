module.exports = {
    name: 'react',
    description: 'emoji reaction toward specific comments',
    usage: 'react <emoji>',
    cooldown: 5,
    execute(client, api, config, message, args, con) {
        message.react('😄');
    },
};