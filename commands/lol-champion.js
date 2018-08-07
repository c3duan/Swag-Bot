const snekfetch = require('snekfetch');

module.exports = {
    name: 'lol-champion',
    description: 'Display basic info and stats of a League of Legends champion',
    usage: 'lol-champion <Champion Name>',
    cooldown: 3,
    execute(client, api, config, message, args, con) {
        let champName = '';

        for(let i = 0; i < args.length; i++) {
            args[i].charAt(0).toUpperCase();
            champName = champName + args[i];
        }

        snekfetch.get(config.lol_champ_json).then(r => {
            const body = r.body;
            const entry = body.data[champName];
            if (!entry) {
                return message.channel.send('This champion does not exist.');
            }
            else {
                console.log(entry);
            }

            const champion = {
                name: entry.name,
                id: entry.key,
                dataById: true,
                champData: 'all',
            };

            api.getChampionsStaticData(champion, (err, data) => {
                if (err) return message.channel.send('# An error has occurred :(\n' + err.code + ' ' + err.message);
                console.log(data);
                message.channel.send({
                    
                    embed: {
                        title: data.name,
                        author: {
                            name: 'Info about ' + data.name + ':',
                        },
                        thumbnail: {
                            url: 'http://ddragon.leagueoflegends.com/cdn/8.2.1' + '/img/champion/' + data.name.replace(/ /g, '') + '.png',
                        },
                        description: data.title,
                        fields: [
                            {
                                name: 'Lore: ',
                                value: data.lore,
                            },
                            {
                                name: 'info: ',
                                value: `Attack: ${data.info.attack}\nDefense: ${data.info.attack}\nMagic: ${data.info.magic}\nDifficulty: ${data.info.difficulty}`,
                            },
                            {
                                name: 'Statiscits: ',
                                value: 'Armor: ' + data.stats.armor.toString() + '\n' + 'Attack Damage: ' + data.stats.attackdamage + '\n' + 'Attack Range: ' + data.stats.attackrange + '\n' + 'Health: ' + data.stats.hp + '\n' + 'Mana: ' + data.stats.mp,
                            },
                            {
                                name: 'Abilities: ',
                                value: '**Q** ' + data.spells[0].name + '\n' + '**W**' + ' ' + data.spells[1].name + '\n' + '**E**  ' + data.spells[2].name + '\n' + '**R**   ' + data.spells[3].name,
                            },
                        ],
                    },
                });
                console.log('finished');
            });
        });
    },
};