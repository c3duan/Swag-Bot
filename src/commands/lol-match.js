const utility = require('../utility.js');
const Discord = require('discord.js');

module.exports = {
    name: 'lol-match',
    alias: ['lol-matchList', 'lol-history'],
    description: 'provides an overview for the past ten games of an account',
    usage: '[Summoner Name] [Region] | [Number of Matches] [Match Type (rank/flex/blind/aram/all)]',
    cooldown: 50,
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (args.length < 2) {
            return message.reply('please supply a summoner name and its region.');
        }

        const pipInd = args.indexOf('|');
        let region = null;
        let summonerName = null;
        let numMatches = null;
        let matchType = null;

        if (!pipInd || !args[pipInd + 1]) {
            const lastArgument = utility.parseComplexLastArgs(args, 3, REGIONS);
            region = lastArgument.value;
            console.log(region);
            const lastIndex = lastArgument.index;
            console.log(lastIndex);
            summonerName = args.slice(0, lastIndex).join(' ');
            console.log(summonerName);
            numMatches = 5;
            matchType = 'all';
        }
        else {
            if (pipInd < 2) {
                return message.reply('please supply a summoner name and its region.');
            }

            const halfArgs = args.slice(0, pipInd);
            const lastArgument = utility.parseComplexLastArgs(halfArgs, 3, REGIONS);
            region = lastArgument.value;
            const lastIndex = lastArgument.index;
            summonerName = args.slice(0, lastIndex).join(' ');
            numMatches = parseInt(args[pipInd + 1]);
            if (isNaN(numMatches)) {
                numMatches = 5;
                matchType = args[pipInd + 1];
            }
            else if (!args[pipInd + 2]) {
                matchType = 'all';
            }
            else {
                matchType = args[pipInd + 2];
            } 
        }

        if (numMatches > 5) {
            message.reply('sorry, the maximum number of matches you can see at once is 5.');
            numMatches = 5;
        }

        const matchConfig = {
            query: 420,
            season: 11,
        }

        let typeId = 0;
        switch(matchType.toLowerCase()) {
            case 'rank':
                typeId = 420;
                break;
            case 'flex':
                typeId = 440;
                break;
            case 'blind':
                typeId = 420;
                break;
            case 'aram':
                typeId = 100;
                break;
            case 'all':
                typeId = 325;
                break;
            default:
                return message.reply('please provide a valid match type.');
        }

        matchConfig.query = typeId;
        matchConfig.season = (new Date().getUTCFullYear() - 2013) * 2 + 1;
        
        kayn.Summoner.by
            .name(summonerName)
            .region(REGIONS[region])
            .callback((error, summoner) => {
                if (error) {
                    console.error(error);
                    return message.reply('please provide a valid summoner name.');
                }
    
                const accountId = summoner.accountId;

                kayn.Matchlist.by
                    .accountID(accountId)
                    .region(REGIONS[region])
                    .query(matchConfig)
                    .callback((err, matchlist) => {
                        if (err) {
                            console.error(err);
                            return message.reply('an error occured while fetching recent matches data.');
                        }
                        const matches = matchlist.matches.slice(0, numMatches);
                        for(let i = 0; i < matches.length; i++) {
                            const role = matches[i].role;
                            const lane = matches[i].lane;
                            const matchId = matches[i].gameId;
                            const champId = matches[i].champion;

                            let champName = null;

                            kayn.DDragon.Champion
                                .list()
                                .version(config.riot_api_version)
                                .then(champions => {
                                    champName = Object.values(champions.data).find(champ => parseInt(champ.key) === champId).name;
                                });

                            kayn.Match
                                .get(matchId)
                                .region(REGIONS[region])
                                .callback(async(errM, match) => {
                                    if (errM) {
                                        console.error(errM);
                                        return message.reply('unconventional respond for a specific match, please try again later.');
                                    }

                                    const player = match.participantIdentities.find(participant => participant.player.accountId === accountId);
                                    const profile = player.player.profileIcon;
                                    const participantId = player.participantId;
                                    const playerStats = match.participants.find(participant => participant.participantId === participantId);
                                    const kills = playerStats.stats.kills;
                                    const largKillSpree = playerStats.stats.largestKillingSpree;
                                    const assists = playerStats.stats.assists;
                                    const win = playerStats.stats.win;
                                    const deaths = playerStats.stats.deaths;
                                    const doubleKills = playerStats.stats.doubleKills;
                                    const tripleKills = playerStats.stats.tripleKills;
                                    const quadraKills = playerStats.stats.quadraKills;
                                    const pentaKills = playerStats.stats.pentaKills;
                                    const totalMinionsKilled = playerStats.stats.totalMinionsKilled;
                                    const turretKills = playerStats.stats.turretKills;
                                    const wards = playerStats.stats.wardsPlaced;
                                    
                                    const embed = await new Discord.RichEmbed()
                                        .setColor((win) ? '#33C4ff' : '#FF3333')
                                        .setTitle(`${matchType.charAt(0).toUpperCase() + matchType.slice(1).toLowerCase()} Match ${i + 1}: ${(win) ? ':trophy: **Victory**' : ':x: **Defeat**'} `)
                                        .setAuthor(summonerName, `http://opgg-static.akamaized.net/images/profile_icons/profileIcon${profile}.jpg`)
                                        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/champion/${champName.replace(/ /g, '')}.png`)
                                        .addField('K/D/A', `${kills}/${deaths}/${assists}`, true)
                                        .addField('Double Kill', doubleKills, true)
                                        .addField('Tiple Kill', tripleKills, true)
                                        .addField('Quadra Kill', quadraKills, true)
                                        .addField('Penta Kill', pentaKills, true)
                                        .addField('Largest Killing Spree', largKillSpree, true)
                                        .addField('CS', totalMinionsKilled, true)
                                        .addField('Turret Kills', turretKills, true)
                                        .addField('Wards Placed', wards, true)
                                        .setTimestamp(new Date())
                                        .setFooter('Match History', `http://opgg-static.akamaized.net/images/profile_icons/profileIcon${profile}.jpg`);

                                    await message.channel.send(embed);
                                })
                        }
                    })
            })
    }
}