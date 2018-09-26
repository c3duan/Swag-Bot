const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log(mongoose);
});
const Money = require('../models/money.js');
const numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];



module.exports = {
    name: 'coins-leader',
    aliases: ['money-leader'],
    description: 'displays the top 10 users that have the most coins',
    cooldown: 5,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const cursor = Money.find({ 'serverID': message.guild.id }).sort({ 'money': -1 });
        const embed = new Discord.RichEmbed()
            .setColor('#DAA520')
            .setTitle(':money_with_wings: Top 10 Coins Leaderboard')
            .setFooter('Coins System', message.guild.iconURL);

        cursor.exec((err, result) => {
            if (err) {
                console.error(err);
                return message.reply('sorry an error has occurred!');
            }

            let order = 0;
            for(let i = 0; i < 10; i++) {
                if(i > result.length - 1) {
                    break;
                }
                const user = message.guild.members.get(result[i].userID).user;

                if(!user.bot) {
                    embed.addField(`${numbers[order]} Username`, user.username, true)
                    .addField('Total Coins', result[i].money, true);
                    order++;
                }
            }

            message.channel.send(embed);
        });
    },
};