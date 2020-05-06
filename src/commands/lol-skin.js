const Discord = require('discord.js');

module.exports = {
    name: 'lol-skin',
    description: 'Display all the skins for a League of Legends champion',
    usage: '[Champion Name]',
    cooldown: 3,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let champName = '';

        for(let i = 0; i < args.length; i++) {
            champName = champName + args[i].charAt(0).toUpperCase() + args[i].slice(1).toLowerCase();
        }

        kayn.DDragon.Champion
            .get(champName)
            .version(config.riot_api_version)
            .then(champion => {
                const data = champion.data[champName];
                console.log(data.skins);
                for(let i in data.skins) {
                    const embed = new Discord.RichEmbed()
                        .setAuthor(data.skins[i].name)
                        .setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.id}_${data.skins[i].num}.jpg`)
                        .setFooter(`${data.name} skin`, `http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/champion/${data.id}.png`);

                    message.channel.send(embed);
                }
            })
            .then(console.log('finished'))
            .catch(error => {
                console.error(error);
                return message.reply(', the champion name you typed does not exist, please try again.');
            });
    },
};
