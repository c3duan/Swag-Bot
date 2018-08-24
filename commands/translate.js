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
    async execute(client, api, config, message, args, con, guilds) {
		message.reply('What text would you like to translate?');
		
		const collector = new Discord.MessageCollector(message.channel, m => m.channel.id === message.channel.id, {time: 10000 });
		let text;
		let base;
		let target;

		setTimeout(() => {
			collector.on('collect', m => {
				text = m.toString();
			});
		}, 50000);

		setTimeout(() => {
			message.reply(`Which language would you like to translate to? Either ${this.list(Object.keys(config.translate), 'or')}`);
			collector.on('collect', m => {
				target = m.toString().toLowerCase();
				if (config.translate[target] || Object.keys(config.translate).find(key => config.translate[key].toLowerCase() === target)) console.log(target);
				return message.author.send(`Invalid target, please enter either ${this.list(Object.keys(config.translate), 'or')}.`);
			});
		}, 70000);
		
		setTimeout(() => {
			message.reply(`Which language would you like to use as the base? Either ${this.list(Object.keys(config.translate), 'or')}.`);
			collector.on('collect', m => {
				base = m.toString().toLowerCase();
				if (config.translate[base] || Object.keys(config.translate).find(key => config.translate[key].toLowerCase() === base)) console.log(base);
				return message.author.send(`Invalid base, please enter either ${this.list(Object.keys(config.translate), 'or')}.`);
			});
		}, 90000);

        setTimeout(async () => {
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
				
					return message.embed(embed);
			} catch (err) {
				return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
			}
		}, 110000);
    },
};