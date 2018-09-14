const Discord = require('discord.js');

module.exports = {
    name: 'lol-ability',
    description: 'gives info about inquired champion ability',
    usage: '[Champion Name] [ability P/p/passive or Q/q or W/w or E/e or R/r or A/a/all]',
    cooldown: 3,
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (args.length > 3 || args.legnth < 2) {
            return message.channel.send(`${this.usage}`);
        }

        const champName = args.slice(0, args.length - 1).join('');
        const ability = args[args.length - 1];

        kayn.DDragon.Champion
            .get(champName)
            .version(config.riot_api_version)
            .then(async (champion) => {
                const data = champion.data[champName];
                console.log(champion);
                console.log(data.spells);
                console.log(data.spells[3].effect);
                switch(ability.toLowerCase()) {
                    case 'p':
                    case 'passive':
                        const passiveText = await new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.passive.name + ':')
                            .setTitle(data.passive.name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/passive/${data.passive.image.full}`)
                            .setDescription(data.passive.description)
                            .setFooter(`${data.name} Passive: ${data.passive.name}`);

                        await message.channel.send(passiveText);
                        break;

                    case 'q':
                    case 'w':
                    case 'e':
                    case 'r':
                        const keys = ['Q', 'W', 'E', 'R'];
                        const rText = await new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].name + ':')
                            .setTitle(data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/spell/${data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].image.full}`)
                            .setURL(`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${data.key.padStart(4, '0')}/ability_${data.key.padStart(4, '0')}_${ability.charAt(0).toUpperCase()}1.webm`)
                            .setDescription(data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].description)
                            .addField('Video Link', `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${data.key.padStart(4, '0')}/ability_${data.key.padStart(4, '0')}_${ability.charAt(0).toUpperCase()}1.webm`)
                            .addField('Cost', data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].costBurn)
                            .addField('Cool Down', data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].cooldownBurn)
                            .addField('Effect', data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].effectBurn)
                            .addField('Range', data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].rangeBurn)
                            .setFooter(`${data.name} ${ability.charAt(0).toUpperCase()}: ${data.spells[keys.indexOf(ability.charAt(0).toUpperCase())].name}`);

                        await message.channel.send(rText);
                        await message.channel.send(`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${data.key.padStart(4, '0')}/ability_${data.key.padStart(4, '0')}_${ability.charAt(0).toUpperCase()}1.webm`);
                        break;

                    case 'a':
                    case 'all':
                        const passive = await new Discord.RichEmbed()
                            .setAuthor('Info about ' + data.passive.name + ':')
                            .setTitle(data.passive.name)
                            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/passive/${data.passive.image.full}`)
                            .setDescription(data.passive.description)
                            .setFooter(`${data.name} Passive: ${data.passive.name}`);

                        await message.channel.send(passive);

                        const options = ['Q', 'W', 'E', 'R'];

                        for (let i = 0; i < 4; i++) {
                            const spells = await new Discord.RichEmbed()
                                .setAuthor('Info about ' + data.spells[i].name + ':')
                                .setTitle(data.spells[i].name)
                                .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/spell/${data.spells[i].image.full}`)
                                .setURL(`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${data.key.padStart(4, '0')}/ability_${data.key.padStart(4, '0')}_${options[i]}1.webm`)
                                .setDescription(data.spells[i].description)
                                .addField('Video Link', `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${data.key.padStart(4, '0')}/ability_${data.key.padStart(4, '0')}_${options[i]}1.webm`)
                                .addField('Cost', data.spells[i].costBurn)
                                .addField('Cool Down', data.spells[i].cooldownBurn)
                                .addField('Effect', data.spells[i].effectBurn)
                                .addField('Range', data.spells[i].rangeBurn)
                                .setFooter(`${data.name} ${options[i]}: ${data.spells[i].name}`);

                            await message.channel.send(spells);
                            await message.channel.send(`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${data.key.padStart(4, '0')}/ability_${data.key.padStart(4, '0')}_${options[i]}1.webm`);
                        }
                        break;

                    default:
                        return message.channel.send(`Invalid Ability Option\n${this.usage}`);

                }
            })
            .then(console.log('finished'))
            .catch(error => {
                console.error(error);
                return message.reply(', the champion name you typed does not exist or you did not provide an ability option, please try again.');
            });
    },
};