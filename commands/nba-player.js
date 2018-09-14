const request = require('superagent');
const Discord = require('discord.js');

module.exports = {
    name: 'nba-player',
    description: 'Provides stats and profile for a current active NBA player',
    usage: '[player Name]',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        console.log('in here');
        try {
            const year = new Date().getFullYear();
            console.log(year);
            const firstName = args[0].toLowerCase();
            const lastName = args[1].toLowerCase();

            if (!firstName || !lastName) return message.reply('Please provide a player name to search!');

            await request
                .get(`http://data.nba.net/10s/prod/v1/${year}/players.json`)
                .then(async res => {
                    const body = res.body;
                    const data = body.league.standard;

                    const players = data.filter(player => player.firstName.toLowerCase() === firstName && player.lastName.toLowerCase() === lastName);

                    if (players.length < 1) return message.reply('Sorry no such player exists, please check your spelling!');
                    
                    for(let i = 0; i < players.length; i++) {
                        const playerId = players[i].personId;
                        const teamId = players[i].teamId;
                        const teams = players[i].teams;
                        const prevTeamId = teams[teams.length - 2].teamId;
                        const jersey = players[i].jersey;
                        const postion = players[i].pos;
                        const feet = players[i].heightFeet;
                        const inches = players[i].heightInches;
                        const meters = players[i].heightMeters;
                        const pounds = players[i].weightPounds;
                        const kg = players[i].weightKilograms;
                        const birth = players[i].dateOfBirthUTC;
                        const pick = players[i].draft.pickNum;
                        const round = players[i].draft.roundNum;
                        const collegeName = players[i].collegeName;
                        const years = players[i].yearsPro;
                        const country = players[i].country;

                        let career = null;
                        await request
                            .get(`http://data.nba.net/prod/v1/2018/players/${playerId}_profile.json`)
                            .then(res1 => {
                                career = res1.body.league.standard.stats.careerSummary;
                            });

                        const ppg = career.ppg;
                        const rpg = career.rpg;
                        const apg = career.apg;
                        const bpg = career.bpg;
                        const mpg = career.mpg;
                        const spg = career.spg;
                        const points = career.points;
                        const games = career.gamesPlayed;
                        const assists = career.assists;
                        const blocks = career.blocks;
                        const steals = career.steals;
                        const reb = career.totReb;
    
                        let currTeam = null;
                        let prevTeam = null;
                        await request
                            .get(`http://data.nba.net//prod/v2/${year}/teams.json`)
                            .then(res2 => {
                                const teams = res2.body.league.standard;
                                currTeam = teams.find(team => team.teamId === teamId).nickname; 
                                prevTeam = teams.find(team => team.teamId === prevTeamId).nickname;
                            });
                        
                        const embed = new Discord.RichEmbed()
                            .setTitle(':basketball: NBA Player Stats')
                            .setAuthor(`${players[i].firstName} ${players[i].lastName}`)
                            .setThumbnail(`https://nba-players.herokuapp.com/players/${lastName}/${firstName}`)
                            .addField('Jersey Number', jersey, true)
                            .addField('Position', `${postion}`, true)
                            .addField('Height', `${feet}Ft. ${inches}in. / ${meters}m`, true)
                            .addField('Weight', `${pounds}lb. / ${kg} kg`, true)
                            .addField('Birth Date', birth, true)
                            .addField('Draft', `${round} round ${pick}${(pick % 10 === 1) ? 'st' : (pick % 10 === 2) ? 'nd' : (pick % 10 === 3) ? 'rd' : 'th'} pick`, true)
                            .addField('Current Team', currTeam, true)
                            .addField('Previous Team', prevTeam, true)
                            .addField('Years Pro', years, true)
                            .addField('Country', country, true)
                            .addField('College', collegeName, true)
                            .addBlankField()
                            .addField(':basketball_player: Career Summary', 'Average and Total Stats')
                            .addField('ppg', ppg, true)
                            .addField('rpg', rpg, true)
                            .addField('apg', apg, true)
                            .addField('bpg', bpg, true)
                            .addField('mpg', mpg, true)
                            .addField('spg', spg, true)
                            .addField('Total Points', points, true)
                            .addField('Total Game Played', games, true)
                            .addField('Total Rebounds', reb, true)
                            .addField('Total Assists', assists, true)
                            .addField('Total Blocks', blocks, true)
                            .addField('Total Steals', steals, true)
                            .setFooter('NBA Player Stats')
                            .setTimestamp(new Date());

                        message.channel.send(embed);
                    }
                });
        }
        catch(err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    },
};