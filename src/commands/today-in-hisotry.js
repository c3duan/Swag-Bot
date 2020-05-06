const request = require('node-superfetch');
const Discord = require('discord.js');

module.exports = {
    name: 'today-in-history',
    description: 'gives info about what important event happend today in hisotry',
    cooldown: 3,
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const month = parseInt(args[0]);
        const day = parseInt(args[1]);

        if(isNaN(month)) {
            return message.reply('please enter a valid month');
        }

        if(isNaN(day)) {
            return message.reply('please enter a valid date');
        }

        const date = month && day ? `/${month}/${day}` : '';
		try {
			const { text } = await request.get(`http://history.muffinlabs.com/date${date}`);
			const body = JSON.parse(text);
			const events = body.data.Events;
			const event = events[Math.floor(Math.random() * events.length)];
			const embed = new Discord.RichEmbed()
				.setColor(0x9797FF)
				.setURL(body.url)
				.setTitle(`On this day (${body.date})...`)
				.setTimestamp()
				.setDescription(`${event.year}: ${event.text}`)
				.addField('❯ See More',
					event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join(', '));
            
            return message.channel.send(embed);
        } 
        catch (err) {
			if (err.status === 404 || err.status === 500) return message.reply('Invalid date.');
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
    }
}