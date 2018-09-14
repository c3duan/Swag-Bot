const request = require('node-superfetch');
const Discord = require('discord.js');

module.exports = {
    name: 'translate',
    description: 'translate a specific string or body of text from a base language into a traget language',
    usage: '[text] [target language] [base language]',
    list(arr, conj = 'and') {
		const len = arr.length;
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
	},
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
		const filter = res => {
			return res.author.id === message.author.id;
		};

		let text, target, base = null;

		await message.reply('What text would you like to translate? (please answer this question in 30 seconds)')
			.then(async () => {
				await message.channel.awaitMessages(filter, {
					max: 500,
					time: 30000,
				})
				.then(collected => {
					text = collected.first().content;
				})
				.catch(() => {
					return message.channel.send('You didn\'t write any text');
				})
			});

		await message.reply(`Which language would you like to translate to? Either ${this.list(Object.keys(config.translate), 'or')}.\n(please answer this question in 10 seconds)`)
			.then(async () => {
				await message.channel.awaitMessages(filter, {
					max: 3,
					time: 10000,
				})
				.then(collected => {
					target = collected.first().content.toLowerCase();
				})
				.catch(() => {
					return message.channel.send('You didn\'t write anything');
				})
			});

		if (config.translate[target] || Object.keys(config.translate).find(key => config.translate[key].toLowerCase() === target)) console.log(target);
		else return message.author.send(`Invalid target, please enter either ${this.list(Object.keys(config.translate), 'or')}.`);

		await message.reply(`Which language would you like to use as the base? Either ${this.list(Object.keys(config.translate), 'or')}.\n(please answer this question in 10 seconds)`)
			.then(async () => {
				await message.channel.awaitMessages(filter, {
					max: 3,
					time: 10000,
				})
				.then(collected => {
					base = collected.first().content.toLowerCase();
				})
				.catch(() => {
					return message.channel.send('You didn\'t write anything');
				})
			});

		if (config.translate[base] || Object.keys(config.translate).find(key => config.translate[key].toLowerCase() === base)) console.log(base);
		else return message.author.send(`Invalid base, please enter either ${this.list(Object.keys(config.translate), 'or')}.`);

		try {
			const { body } = await request
				.get('https://translate.yandex.net/api/v1.5/tr.json/translate')
				.query({
					key: config.yandex_key,
					text,
					lang: base ? `${base}-${target}` : target,
				});
			const lang = body.lang.split('-');
			
			const embed = new Discord.RichEmbed()
				.setColor(0xFF0000)
				.setFooter('Powered by Yandex.Translate', 'https://i.imgur.com/HMpH9sq.png')
				.addField(`❯ From: ${config.translate[lang[0]]}`, text)
				.addField(`❯ To: ${config.translate[lang[1]]}`, body.text[0]);
			
				return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    },
};