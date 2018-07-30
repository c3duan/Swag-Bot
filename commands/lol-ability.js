const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: 'lol-ability',
    description: 'gives info about inquired champion ability',
    usage: 'lol-ability <Summoner Name> <ability P/p/passive or Q/q or W/w or E/e or R/r or A/a/all>',
    cooldown: 3,
    execute(client, api, config, message, args) {
        if (args.length > 3 || args.legnth < 2) {
            return message.channel.send(`${this.usage}`);
        }

        const champName1 = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();
        const champName2 = champName1 + args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
        let ability = '';

        snekfetch.get(config.lol_champ_json).then(r => {
            const body = r.body;
            let entry = null;
            const entry1 = body.data[champName1];
            const entry2 = body.data[champName2];

            if (!entry1 && !entry2) {
                return message.channel.send('This champion does not exist.');
            }
            if (entry1) {
                entry = entry1;
                ability = args[1];
            }
            if (entry2) {
                entry = entry2;
                ability = args[2];
            }

            const champion = {
                name: entry.name,
                id: entry.key,
                dataById: true,
                champData: 'all',
            };

            console.log(entry)
            api.getChampionsStaticData(champion, (err, data) => {
                if (err) return message.channel.send('# An error has occurred :(\n' + err.code + ' ' + err.message);

                switch(ability.toLowerCase()) {
                    case 'p':
                    case 'passive':
                        const passiveText = new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.passive.name + ':')
                            .setTitle(data.passive.name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/passive/${data.passive.image.full}`)
                            .setDescription(data.passive.description)
                            .setFooter(`${data.name} Passive: ${data.passive.name}`);

                        message.channel.send(passiveText);
                        break;

                    case 'q':
                        const qText = new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.spells[0].name + ':')
                            .setTitle(data.spells[0].name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/spell/${data.spells[0].key}.png`)
                            .setDescription(data.spells[0].description)
                            .addField('Tips', data.spells[0].sanitizedTooltip)
                            .addField('Cost', data.spells[0].cost.toString())
                            .addField('Cool Down', data.spells[0].cooldown.toString())
                            .addField('Effect', data.spells[0].effect.toString())
                            .addField('Range', data.spells[0].range.toString())
                            .setFooter(`${data.name} Q: ${data.spells[0].name}`);

                        message.channel.send(qText);
                        break;

                    case 'w':
                        const wText = new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.spells[1].name + ':')
                            .setTitle(data.spells[1].name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/spell/${data.spells[1].key}.png`)
                            .setDescription(data.spells[1].description)
                            .addField('Tips', data.spells[1].sanitizedTooltip)
                            .addField('Cost', data.spells[1].cost.toString())
                            .addField('Cool Down', data.spells[1].cooldown.toString())
                            .addField('Effect', data.spells[1].effect.toString())
                            .addField('Range', data.spells[1].range.toString())
                            .setFooter(`${data.name} W: ${data.spells[1].name}`);

                        message.channel.send(wText);
                        break;

                    case 'e':
                        const eText = new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.spells[2].name + ':')
                            .setTitle(data.spells[2].name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/spell/${data.spells[2].key}.png`)
                            .setDescription(data.spells[2].description)
                            .addField('Tips', data.spells[2].sanitizedTooltip)
                            .addField('Cost', data.spells[2].cost.toString())
                            .addField('Cool Down', data.spells[2].cooldown.toString())
                            .addField('Effect', data.spells[2].effect.toString())
                            .addField('Range', data.spells[2].range.toString())
                            .setFooter(`${data.name} E: ${data.spells[2].name}`);

                        message.channel.send(eText);
                        break;

                    case 'r':
                        const rText = new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.spells[3].name + ':')
                            .setTitle(data.spells[3].name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/spell/${data.spells[3].key}.png`)
                            .setDescription(data.spells[3].description)
                            .addField('Tips', data.spells[3].sanitizedTooltip)
                            .addField('Cost', data.spells[3].cost.toString())
                            .addField('Cool Down', data.spells[3].cooldown.toString())
                            .addField('Effect', data.spells[3].effect.toString())
                            .addField('Range', data.spells[3].range.toString())
                            .setFooter(`${data.name} R: ${data.spells[3].name}`);

                        message.channel.send(rText);
                        break;

                    case 'a':
                    case 'all':
                        const passive = new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.passive.name + ':')
                            .setTitle(data.passive.name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/passive/${data.passive.image.full}`)
                            .setDescription(data.passive.description)
                            .setFooter(`${data.name} Passive: ${data.passive.name}`);

                        message.channel.send(passive);

                        const keys = ['Q', 'W', 'E', 'R'];

                        for (let i = 0; i < 4; i++) {
                            const spells = new Discord.RichEmbed()
                                .setAuthor('Info about ' + data.spells[i].name + ':')
                                .setTitle(data.spells[i].name)
                                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/8.2.1/img/spell/${data.spells[i].key}.png`)
                                .setDescription(data.spells[i].description)
                                .addField('Tips', data.spells[i].sanitizedTooltip)
                                .addField('Cost', data.spells[i].cost.toString())
                                .addField('Cool Down', data.spells[i].cooldown.toString())
                                .addField('Effect', data.spells[i].effect.toString())
                                .addField('Range', data.spells[i].range.toString())
                                .setFooter(`${data.name} ${keys[i]}: ${data.spells[i].name}`);

                            message.channel.send(spells);
                        }
                        break;

                    default:
                        return message.channel.send(`Invalid Ability Option\n${this.usage}`);

                }
            });
        });

    },
};