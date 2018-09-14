module.exports = {
    name: 'react-custom',
    description: 'custom emoji reaction toward specific comments',
    usage: '[custom emoji]',
    cooldown: 5,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const emoji = client.emojis.get(config.emojiID);
        message.react(emoji);
    },
};