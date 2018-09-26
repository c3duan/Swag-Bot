const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log(mongoose);
});
const Money = require('../models/money.js');

module.exports = {
    name: 'gamble',
    description: 'gamble a certain amount of coins, the users might lost some or all of the capital, but they can also win extra',
    usage: '[xp/coin amount]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        if (!args) {
            return message.reply(`please use ${config.prefix}${this.name} ${this.usage}: ${this.description}`);
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('please enter a valid number for the amount of xp/coin you want to gamble.');
        }

        if (amount > 1000) {
            return message.reply('the maximum gamble amount is 1000 coins!')
        }

        const result = ((Math.floor(Math.random() * 2.5 + 0) * Math.floor(amount)));

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

                return message.reply('you can\'t participat since you do not have any coins associated with your account');
            }
            else {
                if (amount > money.money) {
                    return message.reply('you do not have enough coins to gamble!');
                }

                money.money = money.money - amount + result;
                money.save().catch(err => console.error(err));

                if (result === amount) {
                    return message.reply(' have your captial back with no profit.');
                }
                else if (result > amount) {
                    return message.reply(` have gained a profit of ${result - amount} xp, congrats!`);
                }
                else {
                    return message.reply(` RIP, you have lost ${amount - result}`);
                }
            }
        });
    },
};