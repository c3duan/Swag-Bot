const Discord = require('discord.js');
const utility = require('../utility.js');

module.exports = {
    name: 'lol-summoner',
    description: 'Gives info about a league of legend summoner',
    usage: '[Summoner Name] [Region]',
    cooldown: 5,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (args.length < 2) {
            return message.channel.send('Please supply a summnor name and its region.');
        }
        const lastArgument = utility.parseComplexLastArgs(args, 3, REGIONS);
        
        if (!lastArgument) {
            return message.replay(', please enter a valid region.');
        }

        const region = lastArgument.value;
        console.log(region);
        const lastIndex = lastArgument.index;
        console.log(lastIndex);
        const summonerName = args.slice(0, lastIndex).join(' ');
        console.log(summonerName);
        
        if (!summonerName) {
            return message.reply(', please provide a summoner name.');
        }

        kayn.Summoner.by
            .name(summonerName)
            .region(REGIONS[region])
            .then(summoner => {
                console.log(summoner);
                const embed = new Discord.RichEmbed()
                    .setColor(0x2ecc71)
                    .setTitle('📋 Summoner info.')
                    .setDescription('Info about: [' + summoner.name + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (summoner.name.indexOf(' ') ? summoner.name.replace(/ /g, '+') + ')' : summoner.name + ')'))
                    .setThumbnail('http://opgg-static.akamaized.net/images/profile_icons/profileIcon' + summoner.profileIconId + '.jpg')
                    .addField('Summoner Level', summoner.summonerLevel)
                    .addField('Summoner ID', summoner.id)
                    .addField('Account ID', summoner.accountId)
                    .addField('Icon ID', summoner.profileIconId)
                    .setTimestamp(new Date())
                    .setFooter('League of Legends');

                return message.channel.send(embed);
            })
            .then(console.log('finished'))
            .catch(error => {
                console.error(error);
                return message.channel.send('An error has occurred:' + error.code + ' ' + error.message)
            });
    },
};
