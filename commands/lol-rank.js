module.exports = {
    name: 'lol-rank',
    usage: 'lol-rank <Summoner Name>',
    description: 'display rank info of a League of Legends Summoner',
    cooldown: 5,
    execute(client, api, config, message, args) {
        if (!args[0]) {
            return message.channel.send('Please supply a summnor name.');
        }
        
        let rank_summoner = { name: args.join(' ') };
        let rank = {};
        api.getSummoner(rank_summoner, (err, data) => {
            if (err) {
                return message.channel.send('# An error has occurred :(\n' + err.code + ' ' + err.message);
            }
            rank = { summonerId: data.id };
            api.getSummonerLeaguePositions(rank, (err, data) => {
                if (err) return message.channel.send('# An error has occurred :(\n' + err.code + ' ' + err.message);
    
                let rank_indexes = [
                    -1, // Solo/Duo index
                    -1, // Flex 5v5 index
                    -1, // Flex 3v3 index
                ];

                data.find(function(item, i) {
                    console.log(item.queueType);
                    if (item.queueType === 'RANKED_SOLO_5x5') {
                        rank_indexes[0] = i;
                    }
                });
    
                if (!data[rank_indexes[0]]) {
                    message.channel.send({ embed: { color: 0x2c3e50, title: 'Solo/Duo', description: 'Unranked' } });
                }
                else {
                    message.channel.send({
                        embed: {
                            color: (data[rank_indexes[0]].tier === 'BRONZE') ? 0xcd7f32 : ((data[rank_indexes[0]].tier === 'SILVER') ? 0x95a5a6 : ((data[rank_indexes[0]].tier === 'GOLD') ? 0xf1c40f : ((data[rank_indexes[0]].tier === 'PLATINUM') ? 0x1abc9c : (data[rank_indexes[0]].tier === 'DIAMOND') ? 0x3498db : 0xf39c12))),
                            thumbnail: {
                                url: (data[rank_indexes[0]].tier === 'MASTER' || data[rank_indexes[0]].tier === 'CHALLENGER') ? `attachment://${data[rank_indexes[0]].tier.toLowerCase()}.png` : `attachment://${data[rank_indexes[0]].tier.toLowerCase()}_${data[rank_indexes[0]].rank.toLowerCase()}.png`,
                            },
                            author: {
                                name: '🏆 Rank info:',
                            },
                            description: '[' + data[rank_indexes[0]].playerOrTeamName + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (data[rank_indexes[0]].playerOrTeamName.indexOf(' ') ? data[rank_indexes[0]].playerOrTeamName.replace(/ /g, '+') + ')' : data[rank_indexes[0]].playerOrTeamName + ')'),
                            fields: [
                                {
                                    name: 'Solo/Duo',
                                    value: '**Rank:** ' + data[rank_indexes[0]].tier + ' ' + data[rank_indexes[0]].rank + ' ' + data[rank_indexes[0]].leaguePoints + ' LP' + '\n' + '**League name:** ' + data[rank_indexes[0]].leagueName + '\n' + '**Wins/Looses:** ' + data[rank_indexes[0]].wins + ' / ' + data[rank_indexes[0]].losses,
                                },
                            ],
                        },
                        files: [{ attachment: (data[rank_indexes[0]].tier === 'MASTER' || data[rank_indexes[0]].tier === 'CHALLENGER') ? `./tier-icons/base-icons/${data[rank_indexes[0]].tier.toLowerCase()}.png` : `./tier-icons/tier-icons/${data[rank_indexes[0]].tier.toLowerCase()}_${data[rank_indexes[0]].rank.toLowerCase()}.png`, name: (data[rank_indexes[0]].tier === 'MASTER' || data[rank_indexes[0]].tier === 'CHALLENGER') ? `${data[rank_indexes[0]].tier.toLowerCase()}.png` : `${data[rank_indexes[0]].tier.toLowerCase()}_${data[rank_indexes[0]].rank.toLowerCase()}.png` }],
                    });
                }
    
                data.find(function(item, i) {
                    console.log(item.queueType);
                    if (item.queueType === 'RANKED_FLEX_SR') {
                        rank_indexes[1] = i;
                        // if(rank_indexes[0] === 0 || rank_indexes[0] === 1) rank_indexes[1] = rank_indexes[1] + 1;
                    }
                });
    
                if (!data[rank_indexes[1]]) {
                    message.channel.send({ embed: { color: 0x2c3e50, title: 'Flex 5v5', description: 'Unranked' } });
                }
                else {
                    message.channel.send({
                        embed: {
                            color: (data[rank_indexes[1]].tier === 'BRONZE') ? 0xcd7f32 : ((data[rank_indexes[1]].tier === 'SILVER') ? 0x95a5a6 : ((data[rank_indexes[1]].tier === 'GOLD') ? 0xf1c40f : ((data[rank_indexes[1]].tier === 'PLATINUM') ? 0x1abc9c : (data[rank_indexes[1]].tier === 'DIAMOND') ? 0x3498db : 0xf39c12))),
                            thumbnail: {
                                url: (data[rank_indexes[1]].tier === 'MASTER' || data[rank_indexes[1]].tier === 'CHALLENGER') ? `attachment://${data[rank_indexes[1]].tier.toLowerCase()}.png` : `attachment://${data[rank_indexes[1]].tier.toLowerCase()}_${data[rank_indexes[1]].rank.toLowerCase()}.png`,
                            },
                            author: {
                                name: '🏆 Rank info:'
                            },
                            description: '[' + data[rank_indexes[1]].playerOrTeamName + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (data[rank_indexes[1]].playerOrTeamName.indexOf(' ') ? data[rank_indexes[1]].playerOrTeamName.replace(/ /g, '+') + ')' : data[rank_indexes[1]].playerOrTeamName + ')'),
                            fields: [
                                {
                                    name: 'Flex 5v5',
                                    value: '**Rank:** ' + data[rank_indexes[1]].tier + ' ' + data[rank_indexes[1]].rank + ' ' + data[rank_indexes[1]].leaguePoints + ' LP' + '\n' + '**League name:** ' + data[rank_indexes[1]].leagueName + '\n' + '**Wins/Looses:** ' + data[rank_indexes[1]].wins + ' / ' + data[rank_indexes[1]].losses
                                },
                            ],
                        },
                        files: [{ attachment: (data[rank_indexes[1]].tier === 'MASTER' || data[rank_indexes[1]].tier === 'CHALLENGER') ? `./tier-icons/base-icons/${data[rank_indexes[1]].tier.toLowerCase()}.png` : `./tier-icons/tier-icons/${data[rank_indexes[1]].tier.toLowerCase()}_${data[rank_indexes[1]].rank.toLowerCase()}.png`, name: (data[rank_indexes[1]].tier === 'MASTER' || data[rank_indexes[1]].tier === 'CHALLENGER') ? `${data[rank_indexes[1]].tier.toLowerCase()}.png` : `${data[rank_indexes[1]].tier.toLowerCase()}_${data[rank_indexes[1]].rank.toLowerCase()}.png` }],

                    });
                }
        
    
                data.find(function(item, i) {
                    console.log(item.queueType);
                    if (item.queueType === 'RANKED_FLEX_TT') {
                        rank_indexes[2] = i;
                        // if(rank_indexes[1] === 1 || rank_indexes[1] === 0) rank_indexes[2] = rank_indexes[2] + 1;
                    }
                });
    
                if (!data[rank_indexes[2]]) {
                    message.channel.send({ embed: { color: 0x2c3e50, title: 'Flex 3v3', description: 'Unranked' } });
                }
                else {
                    message.channel.send({
                        embed: {
                            color: (data[rank_indexes[2]].tier === 'BRONZE') ? 0xcd7f32 : ((data[rank_indexes[2]].tier === 'SILVER') ? 0x95a5a6 : ((data[rank_indexes[2]].tier === 'GOLD') ? 0xf1c40f : ((data[rank_indexes[2]].tier === 'PLATINUM') ? 0x1abc9c : (data[rank_indexes[2]].tier === 'DIAMOND') ? 0x3498db : 0xf39c12))),
                            thumbnail: {
                                url: (data[rank_indexes[2]].tier === 'MASTER' || data[rank_indexes[2]].tier === 'CHALLENGER') ? `attachment://${data[rank_indexes[2]].tier.toLowerCase()}.png` : `attachment://${data[rank_indexes[2]].tier.toLowerCase()}_${data[rank_indexes[2]].rank.toLowerCase()}.png`,
                            },
                            author: {
                                name: '🏆 Rank info:',
                            },
                            description: '[' + data[rank_indexes[2]].playerOrTeamName + '](' + 'http://' + config.riot_api_region + '.op.gg/summoner/userName=' + (data[rank_indexes[2]].playerOrTeamName.indexOf(' ') ? data[rank_indexes[2]].playerOrTeamName.replace(/ /g, '+') + ')' : data[rank_indexes[2]].playerOrTeamName + ')'),
                            fields: [
                                {
                                    name: 'Flex 3v3',
                                    value: '**Rank:** ' + data[rank_indexes[2]].tier + ' ' + data[rank_indexes[2]].rank + ' ' + data[rank_indexes[2]].leaguePoints + ' LP' + '\n' + '**League name:** ' + data[rank_indexes[2]].leagueName + '\n' + '**Wins/Looses:** ' + data[rank_indexes[2]].wins + ' / ' + data[rank_indexes[2]].losses
                                },
                            ],
                        },
                        files: [{ attachment: (data[rank_indexes[2]].tier === 'MASTER' || data[rank_indexes[2]].tier === 'CHALLENGER') ? `./tier-icons/base-icons/${data[rank_indexes[2]].tier.toLowerCase()}.png` : `./tier-icons/tier-icons/${data[rank_indexes[2]].tier.toLowerCase()}_${data[rank_indexes[2]].rank.toLowerCase()}.png`, name: (data[rank_indexes[2]].tier === 'MASTER' || data[rank_indexes[2]].tier === 'CHALLENGER') ? `${data[rank_indexes[2]].tier.toLowerCase()}.png` : `${data[rank_indexes[2]].tier.toLowerCase()}_${data[rank_indexes[2]].rank.toLowerCase()}.png` }],
                    });
                }

                console.log(rank_indexes[0], rank_indexes[1], rank_indexes[2]);
            });
        });
    },
};