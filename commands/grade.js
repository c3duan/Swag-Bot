const { above100, above92, above88, above80, below80 } = require('../Data/Grade/grade.json');

module.exports = {
    name: 'grade',
    description: 'calculates the score you must get on the next assessment/assignment in order to have your desired grade based on your current grade',
    usage: '[current grade] [next assessment weight] [desired grade]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {

        if (args.length < 3) {
            message.reply(`, please follow the format: ${config.prefix}${this.name} ${this.usage}`);
        }

        const current = parseFloat(args[0]);
        if (!current) {
            return message.reply(', please enter a valid number for current grade!');
        }

        const weight = parseFloat(args[1]);
        if (!weight) {
            return message.reply(', please enter a valid number for the weight of next assessment/assignment!');
        }
        const desired = parseFloat(args[2]);
        if (!desired) {
            return message.reply(', please enter a valid number for your desired grade!');
        }

        const required = Math.round((((desired / 100) - ((current / 100) * (1 - (weight / 100)))) / (weight / 100)) * 100);
		const diff = desired - current;
		let text;
		if (required > 100) {
            text = above100[Math.floor(Math.random() * above100.length)];
        }
		else if (required > 92 || diff > weight * 0.3) {
            text = above92[Math.floor(Math.random() * above92.length)];
        }
		else if (required > 88 || diff > 0) {
            text = above88[Math.floor(Math.random() * above88.length)];
        }
		else if (required > 80 || diff > weight * -0.3) {
            text = above80[Math.floor(Math.random() * above80.length)];
        }
		else {
            text = below80[Math.floor(Math.random() * below80.length)];
        }
		return message.reply(`You will need to score at least ${required}% on your final to get a ${desired}% overall. ${text}`);

    },
};