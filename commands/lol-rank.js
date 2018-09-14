const utility = require('../utility.js');

module.exports = {
    name: 'lol-rank',
    usage: '[Summoner Name]',
    description: 'display rank info of a League of Legends Summoner',
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

        kayn.Summoner.by.name(summonerName)
            .region(REGIONS[region])
            .then(summoner => {
                const id = summoner.id;
                kayn.LeaguePositions.by.summonerID(id)
                    .then(rank => {
                        let rank_indexes = [
                            -1, // Solo/Duo index
                            -1, // Flex 5v5 index
                            -1, // Flex 3v3 index
                        ];
        
                        rank.find(function(item, i) {
                            console.log(item.queueType);
                            if (item.queueType === 'RANKED_SOLO_5x5') {
                                rank_indexes[0] = i;
                            }
                        });
            
                        if (!rank[rank_indexes[0]]) {
                            message.channel.send({ embed: { color: 0x2c3e50, title: 'Solo/Duo', description: 'Unranked' } });
                        }
                        else {
                            message.channel.send({
                                embed: {
                                    color: (rank[rank_indexes[0]].tier === 'BRONZE') ? 0xcd7f32 : ((rank[rank_indexes[0]].tier === 'SILVER') ? 0x95a5a6 : ((rank[rank_indexes[0]].tier === 'GOLD') ? 0xf1c40f : ((rank[rank_indexes[0]].tier === 'PLATINUM') ? 0x1abc9c : (rank[rank_indexes[0]].tier === 'DIAMOND') ? 0x3498db : 0xf39c12))),
                                    thumbnail: {
                                        url: (rank[rank_indexes[0]].tier === 'MASTER' || rank[rank_indexes[0]].tier === 'CHALLENGER') ? `attachment://${rank[rank_indexes[0]].tier.toLowerCase()}.png` : `attachment://${rank[rank_indexes[0]].tier.toLowerCase()}_${rank[rank_indexes[0]].rank.toLowerCase()}.png`,
                                    },
                                    author: {
                                        name: '🏆 Rank info:',
                                    },
                                    description: '[' + rank[rank_indexes[0]].playerOrTeamName + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (rank[rank_indexes[0]].playerOrTeamName.indexOf(' ') ? rank[rank_indexes[0]].playerOrTeamName.replace(/ /g, '+') + ')' : rank[rank_indexes[0]].playerOrTeamName + ')'),
                                    fields: [
                                        {
                                            name: 'Solo/Duo',
                                            value: '**Rank:** ' + rank[rank_indexes[0]].tier + ' ' + rank[rank_indexes[0]].rank + ' ' + rank[rank_indexes[0]].leaguePoints + ' LP' + '\n' + '**League name:** ' + rank[rank_indexes[0]].leagueName + '\n' + '**Wins/Looses:** ' + rank[rank_indexes[0]].wins + ' / ' + rank[rank_indexes[0]].losses,
                                        },
                                    ],
                                },
                                files: [{ attachment: (rank[rank_indexes[0]].tier === 'MASTER' || rank[rank_indexes[0]].tier === 'CHALLENGER') ? `./tier-icons/base-icons/${rank[rank_indexes[0]].tier.toLowerCase()}.png` : `./tier-icons/tier-icons/${rank[rank_indexes[0]].tier.toLowerCase()}_${rank[rank_indexes[0]].rank.toLowerCase()}.png`, name: (rank[rank_indexes[0]].tier === 'MASTER' || rank[rank_indexes[0]].tier === 'CHALLENGER') ? `${rank[rank_indexes[0]].tier.toLowerCase()}.png` : `${rank[rank_indexes[0]].tier.toLowerCase()}_${rank[rank_indexes[0]].rank.toLowerCase()}.png` }],
                            });
                        }
            
                        rank.find(function(item, i) {
                            console.log(item.queueType);
                            if (item.queueType === 'RANKED_FLEX_SR') {
                                rank_indexes[1] = i;
                                // if(rank_indexes[0] === 0 || rank_indexes[0] === 1) rank_indexes[1] = rank_indexes[1] + 1;
                            }
                        });
            
                        if (!rank[rank_indexes[1]]) {
                            message.channel.send({ embed: { color: 0x2c3e50, title: 'Flex 5v5', description: 'Unranked' } });
                        }
                        else {
                            message.channel.send({
                                embed: {
                                    color: (rank[rank_indexes[1]].tier === 'BRONZE') ? 0xcd7f32 : ((rank[rank_indexes[1]].tier === 'SILVER') ? 0x95a5a6 : ((rank[rank_indexes[1]].tier === 'GOLD') ? 0xf1c40f : ((rank[rank_indexes[1]].tier === 'PLATINUM') ? 0x1abc9c : (rank[rank_indexes[1]].tier === 'DIAMOND') ? 0x3498db : 0xf39c12))),
                                    thumbnail: {
                                        url: (rank[rank_indexes[1]].tier === 'MASTER' || rank[rank_indexes[1]].tier === 'CHALLENGER') ? `attachment://${rank[rank_indexes[1]].tier.toLowerCase()}.png` : `attachment://${rank[rank_indexes[1]].tier.toLowerCase()}_${rank[rank_indexes[1]].rank.toLowerCase()}.png`,
                                    },
                                    author: {
                                        name: '🏆 Rank info:'
                                    },
                                    description: '[' + rank[rank_indexes[1]].playerOrTeamName + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (rank[rank_indexes[1]].playerOrTeamName.indexOf(' ') ? rank[rank_indexes[1]].playerOrTeamName.replace(/ /g, '+') + ')' : rank[rank_indexes[1]].playerOrTeamName + ')'),
                                    fields: [
                                        {
                                            name: 'Flex 5v5',
                                            value: '**Rank:** ' + rank[rank_indexes[1]].tier + ' ' + rank[rank_indexes[1]].rank + ' ' + rank[rank_indexes[1]].leaguePoints + ' LP' + '\n' + '**League name:** ' + rank[rank_indexes[1]].leagueName + '\n' + '**Wins/Looses:** ' + rank[rank_indexes[1]].wins + ' / ' + rank[rank_indexes[1]].losses
                                        },
                                    ],
                                },
                                files: [{ attachment: (rank[rank_indexes[1]].tier === 'MASTER' || rank[rank_indexes[1]].tier === 'CHALLENGER') ? `./tier-icons/base-icons/${rank[rank_indexes[1]].tier.toLowerCase()}.png` : `./tier-icons/tier-icons/${rank[rank_indexes[1]].tier.toLowerCase()}_${rank[rank_indexes[1]].rank.toLowerCase()}.png`, name: (rank[rank_indexes[1]].tier === 'MASTER' || rank[rank_indexes[1]].tier === 'CHALLENGER') ? `${rank[rank_indexes[1]].tier.toLowerCase()}.png` : `${rank[rank_indexes[1]].tier.toLowerCase()}_${rank[rank_indexes[1]].rank.toLowerCase()}.png` }],
        
                            });
                        }
                
            
                        rank.find(function(item, i) {
                            console.log(item.queueType);
                            if (item.queueType === 'RANKED_FLEX_TT') {
                                rank_indexes[2] = i;
                                // if(rank_indexes[1] === 1 || rank_indexes[1] === 0) rank_indexes[2] = rank_indexes[2] + 1;
                            }
                        });
            
                        if (!rank[rank_indexes[2]]) {
                            message.channel.send({ embed: { color: 0x2c3e50, title: 'Flex 3v3', description: 'Unranked' } });
                        }
                        else {
                            message.channel.send({
                                embed: {
                                    color: (rank[rank_indexes[2]].tier === 'BRONZE') ? 0xcd7f32 : ((rank[rank_indexes[2]].tier === 'SILVER') ? 0x95a5a6 : ((rank[rank_indexes[2]].tier === 'GOLD') ? 0xf1c40f : ((rank[rank_indexes[2]].tier === 'PLATINUM') ? 0x1abc9c : (rank[rank_indexes[2]].tier === 'DIAMOND') ? 0x3498db : 0xf39c12))),
                                    thumbnail: {
                                        url: (rank[rank_indexes[2]].tier === 'MASTER' || rank[rank_indexes[2]].tier === 'CHALLENGER') ? `attachment://${rank[rank_indexes[2]].tier.toLowerCase()}.png` : `attachment://${rank[rank_indexes[2]].tier.toLowerCase()}_${rank[rank_indexes[2]].rank.toLowerCase()}.png`,
                                    },
                                    author: {
                                        name: '🏆 Rank info:',
                                    },
                                    description: '[' + rank[rank_indexes[2]].playerOrTeamName + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (rank[rank_indexes[2]].playerOrTeamName.indexOf(' ') ? rank[rank_indexes[2]].playerOrTeamName.replace(/ /g, '+') + ')' : rank[rank_indexes[2]].playerOrTeamName + ')'),
                                    fields: [
                                        {
                                            name: 'Flex 3v3',
                                            value: '**Rank:** ' + rank[rank_indexes[2]].tier + ' ' + rank[rank_indexes[2]].rank + ' ' + rank[rank_indexes[2]].leaguePoints + ' LP' + '\n' + '**League name:** ' + rank[rank_indexes[2]].leagueName + '\n' + '**Wins/Looses:** ' + rank[rank_indexes[2]].wins + ' / ' + rank[rank_indexes[2]].losses
                                        },
                                    ],
                                },
                                files: [{ attachment: (rank[rank_indexes[2]].tier === 'MASTER' || rank[rank_indexes[2]].tier === 'CHALLENGER') ? `./tier-icons/base-icons/${rank[rank_indexes[2]].tier.toLowerCase()}.png` : `./tier-icons/tier-icons/${rank[rank_indexes[2]].tier.toLowerCase()}_${rank[rank_indexes[2]].rank.toLowerCase()}.png`, name: (rank[rank_indexes[2]].tier === 'MASTER' || rank[rank_indexes[2]].tier === 'CHALLENGER') ? `${rank[rank_indexes[2]].tier.toLowerCase()}.png` : `${rank[rank_indexes[2]].tier.toLowerCase()}_${rank[rank_indexes[2]].rank.toLowerCase()}.png` }],
                            });
                        }
        
                        console.log(rank_indexes[0], rank_indexes[1], rank_indexes[2]);
                    })
                    .then(console.log('finished rank rank'))
                    .catch(error => {
                        console.error(error);
                        return message.reply('An error has occurred:' + error.code + ' ' + error.message);
                    });
            })
            .then(console.log('finished summoner rank'))
            .catch(error => {
                console.error(error);
                return message.reply('An error has occurred:' + error.code + ' ' + error.message);
            });
    },
};