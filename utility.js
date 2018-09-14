/*
 * creadit @dragonfire535 github: https://github.com/dragonfire535/xiao/blob/45dfdb0ccda888ecc5398fb4207265d44b69b3cc/util/Util.js
 */

const request = require('node-superfetch');
const crypto = require('crypto');
const Discord = require('discord.js');

module.exports = {
	delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	},

	list(arr, conj = 'and') {
		const len = arr.length;
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
	},

	shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	},

	duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
		return `${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
	},

	randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	},

	base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
		throw new TypeError(`${mode} is not a supported base64 mode.`);
	},

	hash(text, algorithm) {
		return crypto.createHash(algorithm).update(text).digest('hex');
	},

	checkRole(newXP, role, message, config) {
		const user = message.member;
		const level = Math.floor(newXP / config.levelXP);

		if (newXP >= config.VIP * config.levelXP && !user.roles.has(role.id)) {

			user.addRole(role);

			let VIPembed = new Discord.RichEmbed()
				.setTitle('**Congratulations**, you are offically a **VIP**!!!')
				.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
				.setDescription('VIP are granted extra permission to manage some parts of the server.')
				.setThumbnail(`${message.author.displayAvatarURL}`)
				.addField('XP', newXP, true)
				.addField('Level', level, true)
				.addField('New Role', 'VIP', true)
				.setTimestamp(new Date())
				.setFooter('VIP Announcement');

			return message.channel.send(VIPembed);
		}
	},

	parseComplexLastArgs(args, maxLength, standard) {
		let length = maxLength;
		if(args.length < maxLength + 1) {
			length -= (maxLength + 1 - args.length);
		}
		const possibleArgs = args.slice(-1 * length);
		for(let i = 0; i < length; i++) {
			const arg = possibleArgs.slice(i).join('_').toUpperCase();
			if (standard[arg]) {
				return { 'value': arg , 'index': args.length - (length - i) };
			}
		}
		return null;
	}
}