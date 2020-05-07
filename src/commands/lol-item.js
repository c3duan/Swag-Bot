const Discord = require('discord.js');

module.exports = {
    name: 'lol-item',
    description: 'provides info about an item/weapon',
    usage: '[item name]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!args) {
            return message.reply('please provide an item name.');
        }
        console.log(args);
        const itemName = args.join(' ').toLowerCase();
        
        kayn.DDragon.Item
            .list()
            .version(config.riot_api_version)
            .callback((error, list) => {
                if (error) {
                    console.error(error);
                    return message.reply('sorry an api error occurred, please try again.');
                }

                const items = list.data;
                const item = Object.values(items).find(weapon => weapon.name.toLowerCase() === itemName);
                if (!item) {
                    return message.reply('sorry no such item exists, please try again.');
                }
                const embed = new Discord.RichEmbed()
                    .setTitle(item.name)
                    .setDescription(item.description.replace(/\s*\<.*?\>\s*/g, ' '))
                    .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${config.riot_api_version}/img/item/${item.image.full}`)
                    .addField(`${item.plaintext} ${(item.into) ? 'into' : ''}`, `${(item.into) ? `${item.into.join('/')}` : 'Base Item'}`)
                    .addField('Purchase Price', item.gold.total, true)
                    .addField('Sell Price', item.gold.sell, true);
                    
                message.channel.send(embed);
            });
    },
};