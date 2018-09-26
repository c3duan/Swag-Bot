const math = require('mathjs');

module.exports = {
    name: 'unit',
    description: 'unit converter',
    usage: '[amount] [base unit] [taget unit]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const amount = parseFloat(args[0]);
        if (!amount) {
            return message.reply(' please enter a valid number (float) for amount.');
        }

        const base = args[1].toLowerCase();
        if (!base) {
            return message.reply(' pleae enter the base currency.');
        }

        const target = args[2].toLowerCase();
        if (!target) {
            return message.reply(' please enter the target currency.');
        }

        try {
			const value = math.unit(amount, base).toNumber(target);
			return message.reply(`${amount} ${base} is ${value} ${target}.`);
		} catch (err) {
			return message.reply('Either an invalid unit type was provided or the unit types do not match.');
		}
    },
};