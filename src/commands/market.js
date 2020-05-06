const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'market',
    description: 'provides a list of all the items in market',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const embed = new Discord.RichEmbed()
            .setColor('#DAA520')
            .setTitle(':convenience_store: Market Place') 
            .setFooter('Market', message.guild.iconURL);

        const file_content = fs.readFileSync('./data/Items/items.json', 'utf-8');
        const items = JSON.parse(file_content);
        const entries = Object.entries(items)

        for(let i = 0; i < entries.length; i++) {
            if (entries[i][0] === 'xp') {
                embed.addField(entries[i][0], `${entries[i][1]} coins for each`, true);
            }
            else {
                embed.addField(`${entries[i][0]} role`, `${entries[i][1]} coins`, true);
            }
        }
        
        message.channel.send(embed);
    },
};