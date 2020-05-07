module.exports = {
    name: 'colors',
    description: 'gives all avaliable colors in the current channel',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let colors = message.guild.roles.filter(role => role.name.startsWith('#'));

        if (colors.size < 1) {
            return message.channel.send('There are no colors in this channel');
        }

        let data = [];

        if (args.length < 1) {
            data.push('Here\'s a list of all the colors:');
            data.push(colors.map(role => role.toString()).join(' '));
            data.push(`\nTo have one, type \`${config.prefix}color [color name]\`. For example: \`${config.prefix}color fire\``);

            return message.channel.send(data, { split: true })
        }
        else {
            return message.channel.send(`See all colors, type \`${config.prefix}colors\`\nTo have one sepcific color, type \`${config.prefix}color [color name]\`. For example: \`${config.prefix}color fire\``);
        }
    }
}