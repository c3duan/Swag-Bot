const Discord = require('discord.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];

module.exports = {
    name: 'xp-leader',
    description: 'display the top 10 users that have the most xp',
    cooldown: 5,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        con.query('SELECT id, xp FROM xp ORDER BY xp DESC', (err, rows) => {
            if (err) {
                throw err;
            }

            const embed = new Discord.RichEmbed()
                .setColor('#800080')
                .setTitle(':money_with_wings: Top 10 Coins Leaderboard')
                .setFooter('Coins System', message.guild.iconURL);

            let order = 0;
            for(let i = 0; i < 10; i++) {
                if(i > rows.length - 1) {
                    break;
                }
                
                if (message.guild.members.get(rows[i].id)) {
                    const user = message.guild.members.get(rows[i].id).user;
                    if(!user.bot) {
                        embed.addField(`${numbers[order]} Username`, user.username, true)
                        .addField('Total Coins', rows[i].xp, true);
                        order++;
                    }
                }
            }
            
            message.channel.send(embed);
        });
    },
};