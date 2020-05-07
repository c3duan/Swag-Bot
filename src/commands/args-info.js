module.exports = {
    name: 'args-info',
    description: 'Information about the arguments provided',
    args: true,
    usage: '[arguments]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Arguments: ${args}`);
        message.channel.send(`First Argument: ${args[0]}`);
    },
};