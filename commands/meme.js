const request = require('node-superfetch');

module.exports = {
    name: 'meme',
    description: 'generates a costume meme',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const filter = res => {
			return res.author.id === message.author.id;
		};

		let type, top, bottom = null;

		await message.reply('What meme type do want to use? (please answer this question in 10 seconds)')
			.then(async () => {
				await message.channel.awaitMessages(filter, {
					max: 500,
					time: 10000,
				})
				.then(collected => {
					type = encodeURIComponent(collected.first().content);
				});
			});

		await message.reply('What do you want to write on the top row of the meme ? (please answer this question in 20 seconds)')
			.then(async () => {
				await message.channel.awaitMessages(filter, {
					max: 500,
					time: 20000,
				})
				.then(collected => {
					top = encodeURIComponent(collected.first().content);
				});
			});

		await message.reply('What do you want to write on the bottom row of the meme? (please answer this question in 20 seconds)')
			.then(async () => {
				await message.channel.awaitMessages(filter, {
					max: 3,
					time: 20000,
				})
				.then(collected => {
					bottom = encodeURIComponent(collected.first().content);
				});
			});

        try {
			const search = await request.get(`https://memegen.link/api/search/${type}`);
			if (!search.body.length) return message.reply('Could not find any results.');
			const { body } = await request.get(search.body[0].template.blank.replace(/\/_/, `/${top}/${bottom}`));
			return message.channel.send({ files: [{ attachment: body, name: 'meme.jpg' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    }

}