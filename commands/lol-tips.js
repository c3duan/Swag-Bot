const snekfetch = require('snekfetch');
const Discord = require('discord.js');

module.exports = {
    name: 'lol-tips',
    description: 'Display tips for playing or playing against a League of Legends champion',
    usage: '[Champion Name]',
    cooldown: 3,
    execute(client, api, config, message, args, con, guilds) {
        let champName = '';

        for(let i = 0; i < args.length; i++) {
            champName = champName + args[i].charAt(0).toUpperCase() + args[i].slice(1).toLowerCase();
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
                    .setThumbnail('http://ddragon.leagueoflegends.com/cdn/8.2.1' + '/img/champion/' + data.name.replace(/ /g, '') + '.png')
                    .addField('**Ally Tips**', allyTips, true)
                    .addBlankField(false)
                    .addField('**Enemy Tips**', enemyTips, true);

                message.channel.send(embed);
                console.log('finished');
            });
        });
    },
};