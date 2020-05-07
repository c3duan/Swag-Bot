const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log(mongoose);
});
const Money = require('../models/money.js');

module.exports = {
    name: 'pay',
    description: 'user uses coins to pay another user for various reason',
    usage: '[recipient] [payment amount] [reason]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {

        const recipient = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!recipient) {
            return message.reply('Please specifiy who you want tp pay!');
        }

        const amount = parseInt(args[1]);

        if (isNaN(amount)) {
            return message.reply('Please provide a valid number for payment amount!');
        }

        const reason = args.slice(2).join(' ');
        console.log(reason);

        if (!reason) {
            return message.reply('Please give a reason for this payment');
        }

        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id,
        }, (err, money) => {
            if (err) {
                console.error(err);
                return message.reply('sorry, an error occurred!');
            }
            if (!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: 0,
                });

                newMoney.save().catch(err => console.error(err));

                return message.reply('you can\'t make a payment since you do not have any coins associated with your account');
            }
            else {
                if (money.momey < amount) {
                    return message.reply('you do not have enough coins to complete the payment.');
                }

                money.money = money.money - amount;
                money.save().catch(err => console.error(err));
            }
        });

        Money.findOne({
            userID: recipient.id,
            serverID: recipient.id,
        }, (err, money) => {
            if (err) {
                console.error(err);
                return message.reply('sorry, an error occurred!');
            }
            if (!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: amount,
                });

                newMoney.save().catch(err => console.error(err));
            }
            else {
                money.money = money.money + amount;
                money.save().catch(err => console.error(err));
            }
        });

        const payEmbed = new Discord.RichEmbed()
                .setTitle(':money_with_wings: **Transcation Details**')
                .addField('Recipient', recipient)
                .addField('Payer', message.guild.members.get(message.author.id))
                .addField('Payemnt Amount', amount)
                .addField('Payment Reason', reason)
                .setTimestamp(new Date())
                .setFooter('Coins Payment');

        const banChannel = message.guild.channels.find('name', 'incidents');
        if (!banChannel) {
            return message.channel.send('Can\'t find incidents channel');
        }
        banChannel.send(payEmbed);
    },
};