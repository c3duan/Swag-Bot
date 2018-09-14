const request = require('node-superfetch');
let currencies = null;
let rates = new Map();

module.exports = {
    name: 'currency',
    description: 'currency converter',
    usage: '[amount] [base currency] [target currency]',
    async fetchCurrencies() {
		const { body } = await request.get('https://free.currencyconverterapi.com/api/v5/currencies');
		currencies = body.results;
		return body.results;
    },
    async fetchRate(base, target) {
        const query = `${base.id}_${target.id}`;
		if (rates.has(query)) return this.rates.get(query);
		const { body } = await request
			.get('https://free.currencyconverterapi.com/api/v5/convert')
			.query({
				q: query,
				compact: 'ultra'
			});
		rates.set(query, body[query]);
		setTimeout(() => rates.delete(query), 1.8e+6);
		return body[query];
    },
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (args.length < 3) {
            message.reply(`, follow this format: ${config.prefix}${this.name} ${this.usage}.`);
        }

        let amount = parseInt(args[0]);
        if (!amount) {
            message.reply(' please enter a valid number for amount.');
        }

        let base = args[1].toUpperCase();
        if (!base) {
            message.reply(' pleae enter the base currency.');
        }

        let target = args[2].toUpperCase();
        if (!target) {
            message.reply(' please enter the target currency.');
        }

        try {
			if (!currencies) await this.fetchCurrencies();
			base = currencies[base];
			if (!base) return message.reply('Invalid base.');
			target = currencies[target];
			if (!target) return message.reply('Invalid target.');
			if (base.id === target.id) return message.reply(`Converting ${base.id} to ${target.id} is the same value, dummy.`);
			const rate = await this.fetchRate(base, target);
			return message.reply(`${amount} ${base.id} is ${(amount * rate).toFixed(2)} ${target.id}.`);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    },
};