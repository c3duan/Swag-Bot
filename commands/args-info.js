module.exports = {
    name: 'args-info',
    description: 'argument information',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Command name: ${message.name}\nArguments: ${args}`);
        message.channel.send(`First Argument: ${args[0]}`);
    },
};