const Discord = require('discord.js');
const request = require('superagent');

module.exports = {
    name: 'fifa-player',
    description: 'Returns stats for a football player',
    usage: '[team name] [player name]',
    cooldown: 5,
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const teamName = args[0].toLowerCase();
        const playerName = args[1].toLowerCase();
        let teamId = null;

        try {
            const options = {
                method: 'GET',
                url: 'https://api.football-data.org/v2/teams',
                headers: {
                    'X-Auth-Token':  config.football_key,
                },
            };
            await request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    try {
                        const stats = JSON.parse(body);
                        const teams = stats.teams;
                        const team = teams.find(team => team.name.toLowerCase() === teamName || team.shortName.toLowerCase() === teamName || team.tla.toLowerCase() === teamName);
                        teamId = team.id;
                    }
                    catch(err) {
                        return message.reply(`, sorry we encountered an error: ${err}`);
                    }
                }
            });
            
            const teamOptions = {
                method: 'GET',
                url: `https://api.football-data.org/v2/teams/${teamId}`,
                headers: {
                    'X-Auth-Token': config.football_key,
                },
            };

            await request(teamOptions, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    try {
                        const stats = JSON.parse(body);
                        const squad = stats.squad;
                        const player = squad.find(p => p.name.toLowerCase() === playerName);

                        /*
https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/200px-Cristiano_Ronaldo_2018.jpg" 
                        */
                        // Formats the statistics into an embed to return to the user
                        const statsText = new Discord.RichEmbed()
                            .setColor(3447003)
                            .setTitle(player.name)
                            .setDescription('FIFA Player Info')
                            .addField('Current Team', stats.name, true)
                            .addField('Position', player.position, true)
                            .addField('Date of Birth', player.dateOfBirth, true)
                            .addField('Country of Birth', player.countryOfBirth, true)
                            .addField('Nationality', player.nationality, true)
                            .setTimestamp(new Date())
                            .setFooter('FIFA Player Stats');

                        return message.channel.send(statsText);
                    }

                    // Error catching if API returns undefined
                    catch (err) {
                        console.log(err);
                        return message.reply('I am unable to retrieve FIFA statistics');
                    }
                }
            });
        }
        // Error catching for non-API related issues
        catch (error) {
            console.log(error);
            return message.reply('I am unable to retrieve Fortnite statistics');
        }
    },
};