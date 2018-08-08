module.exports = {
    name: 'react-custom',
    description: 'custom emoji reaction toward specific comments',
    usage: 'react-custom <costume emoji>',
    cooldown: 5,
    execute(client, api, config, message, args, con) {
        const emoji = client.emojis.get(config.emojiID);
        message.react(emoji);
    },
};