module.exports = {
    name: 'prune',
    usage: '[number of messages]',
    description: 'deleted specified number of messages',
    execute(client, api, config, message, args, con, guilds) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number');
        }

        else if (amount < 1 || amount > 99) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.log(err);
            message.channel.send('there was an error trying to prune messages in this channel');
        });
    },
};