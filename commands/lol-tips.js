const Discord = require('discord.js');

module.exports = {
    name: 'lol-tips',
    description: 'Display tips for playing or playing against a League of Legends champion',
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

                let allyTips = '';

                let lable = 1;
                for(const i in data.allytips) {
                    allyTips = allyTips + `${lable}. ${data.allytips[i]}\n`;
                    lable++;
                }

                let enemyTips = '';
                lable = 1;
                for(const i in data.enemytips) {
                    enemyTips = enemyTips + `${lable}. ${data.enemytips[i]}\n`;
                    lable++;
                }

                const embed = new Discord.RichEmbed()
                    .setAuthor('Tips about ' + data.name + ':')
                    .setTitle(data.name)
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/champion/${data.name.replace(/ /g, '')}.png`)
                    .addField('**Ally Tips**', allyTips, true)
                    .addBlankField(false)
                    .addField('**Enemy Tips**', enemyTips, true);

                message.channel.send(embed);
            })
            .then(console.log('finished'))
            .catch(error => {
                console.error(error);
                return message.reply(', the champion name you typed does not exist, please try again.');
            });
    },
};