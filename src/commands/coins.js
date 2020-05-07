const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log(mongoose);
});
const Money = require('../models/money.js');

module.exports = {
    name: 'coins',
    description: 'dsiplays coin infos about a particular user',
    cooldown: 3,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id,
        }, (err, money) => {
            if (err) console.error(err);
            const memberInfo = new Discord.RichEmbed()
                    .setTitle(':moneybag: Coins Info')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
                    .setDescription('Participant in channels under the help category, and win coins to buy roles or additional xp')
                    .setThumbnail(`${message.author.displayAvatarURL}`)
                    .setTimestamp(new Date())
                    .setFooter(':dollar: Coins System');

            if (!money) {
                memberInfo.addField('Total Coins', 0);
            }
            else {
                memberInfo.addField('Total Coins', money.money);
            }

            return message.channel.send(memberInfo);
        });
    }
}