module.exports = {
    name: 'lol-champion',
    description: 'Display basic info and stats of a League of Legends champion',
    usage: '[Champion Name]',
    cooldown: 3,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let champName = '';

        for(let i = 0; i < args.length; i++) {
            args[i].charAt(0).toUpperCase();
            champName = champName + args[i];
        }

        kayn.DDragon.Champion
            .get(champName)
            .version(config.riot_api_version)
            .then(champion => {
                console.log(champion);
                const data = champion.data[champName];
                message.channel.send({
                    embed: {
                        title: data.name,
                        author: {
                            name: 'Info about ' + data.name + ':',
                        },
                        thumbnail: {
                            url: `http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/champion/${data.name.replace(/ /g, '')}.png`,
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
            })
            .then(console.log('finished'))
            .catch(error => {
                console.error(error);
                return message.reply(', the champion name you typed does not exist, please try again.');
            });
    },
};