const request = require('node-superfetch');
const Discord = require('discord.js');
const utility = require('../utility.js');


module.exports = {
    name: 'kitsu-anime',
    aliases: ['kanime', 'anime', 'kitsu-a'],
    description: 'provides info about an anime',
    usage: '[Anime Name]',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const query = args.join(' ');

        try {
			const { text } = await request
				.get('https://kitsu.io/api/edge/anime')
				.query({ 'filter[text]': query });
			const body = JSON.parse(text);
			if (!body.data.length) return message.reply('Could not find any results.');
			const data = body.data[0].attributes;
			const embed = new Discord.RichEmbed()
				.setColor(0xF75239)
				.setAuthor('Kitsu.io', 'https://i.imgur.com/lVqooyd.png', 'https://kitsu.io/explore/anime')
				.setURL(`https://kitsu.io/anime/${data.slug}`)
				.setThumbnail(data.posterImage ? data.posterImage.original : null)
				.setTitle(data.canonicalTitle)
				.setDescription(utility.shorten(data.synopsis))
				.addField('❯ Type', `${data.showType} - ${data.status}`, true)
				.addField('❯ Episodes', data.episodeCount || '???', true)
				.addField('❯ Start Date', data.startDate ? new Date(data.startDate).toDateString() : '???', true)
				.addField('❯ End Date', data.endDate ? new Date(data.endDate).toDateString() : '???', true);
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

    },
};