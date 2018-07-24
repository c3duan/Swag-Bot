module.exports = {
    name: 'invite',
    description: 'create an invite link',
    usage: '<invite>',
    execute(client, message, args) {
        message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`);
    },
};