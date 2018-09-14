module.exports = {
    name: 'invite',
    description: 'create an invite link',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        message.channel.send(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`);
    },
};