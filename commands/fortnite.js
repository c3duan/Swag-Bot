const Discord = require('discord.js');

module.exports = {
    name: 'fortnite',
    description: 'Returns Fortnite statistics for a player',
    usage: 'fortnite <player name>',
    cooldown: 5,
    execute(client, api, config, message, args, con) {
        try {
            const config = require('../config.json');

            const request = require('request');

            const options = {
                method: 'GET',
                url: `https://fortnite.y3n.co/v2/player/${args[0]}`,
                headers: {
                    'User-Agent': 'nodejs request',
                    'X-Key':  process.env.FORTNITE || config.fortnite,
                },
            };

            // Performs a request to a Fortnite API in order to retrieve user info
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const stats = JSON.parse(body);

                    try {
                        // Formats the statistics into an embed to return to the user
                        const statsText = new Discord.RichEmbed()
                            .setColor(3447003)
                            .setTitle(stats.displayName)
                            .addBlankField(true)
                            .addField(':trophy: Victory Royales', stats.br.stats.pc.all.wins)
                            .addField(':chart_with_upwards_trend: Win Rate:', stats.br.stats.pc.all.winRate + '%')
                            .addField(':gun: Kills', stats.br.stats.pc.all.kills)
                            .addField(':skull: Deaths', stats.br.stats.pc.all.deaths)
                            .addField(':black_heart: K/D', stats.br.stats.pc.all.kpd)
                            .addField(':clock1: Time played', stats.br.stats.pc.all.minutesPlayed + ' minutes')
                            .setTimestamp(new Date())
                            .setFooter('Fortnite Battle Royale');

                        message.channel.send(statsText);
                    }

                    // Error catching if API returns undefined
                    catch (error) {
                        message.reply('I am unable to retrieve Fortnite statistics');
                    }
                }
            });
        }

        // Error catching for non-API related issues
        catch (error) {
            console.log(error);
            message.reply('I am unable to retrieve Fortnite statistics');
        }
    },
};