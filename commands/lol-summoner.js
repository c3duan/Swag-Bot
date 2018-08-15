const Discord = require('discord.js');

module.exports = {
    name: 'lol-summoner',
    description: 'Gives info about a league of legend summoner',
    usage: '[Summoner Name]',
    cooldown: 7,
    execute(client, api, config, message, args, con, guilds) {
        if (!args[0]) {
            return message.channel.send('Please supply a summnor name');
        }
        const summoner = { name: args.join(' ') };

        api.getSummoner(summoner, (err, data) => {
            console.log(summoner);
            if (err) {
                return message.channel.send('# An error has occurred:' + err.code + ' ' + err.message);
            }

            const embed = new Discord.RichEmbed()
                .setColor(0x2ecc71)
                .setTitle('📋 Summoner info.')
                .setDescription('Info about: [' + data.name + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (summoner.name.indexOf(' ') ? summoner.name.replace(/ /g, '+') + ')' : summoner.name + ')'))
                .setThumbnail('http://opgg-static.akamaized.net/images/profile_icons/profileIcon' + data.profileIconId + '.jpg')
                .addField('Summoner Level', data.summonerLevel)
                .addField('Summoner ID', data.id)
                .addField('Account ID', data.accountId)
                .addField('Icon ID', data.profileIconId)
                .setTimestamp(new Date())
                .setFooter('League of Legends');

            return message.channel.send(embed);
        });
    },
};
