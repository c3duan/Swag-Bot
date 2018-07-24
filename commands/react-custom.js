module.exports = {
    name: 'react-custom',
    description: 'custom emoji reaction toward specific comments',
    usage: '<react-custom>',
    cooldown: 5,
    execute(client, message, args) {
        const emoji = client.emojis.get(config.emojiID);
        message.react(emoji);
    },
};