const fs = require('fs');
const utility = require('../utility.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log(mongoose);
});
const Money = require('../models/money.js');

module.exports = {
    name: 'buy',
    description: 'buy a specific item from the market',
    usage: '[item type]',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const name = args.join(' ');
        const file_content = fs.readFileSync('./data/Items/items.json', 'utf-8');
        const items = JSON.parse(file_content);
        const itemNames = Object.keys(items);

        if (!itemNames.includes(name.toLowerCase())) {
            return message.reply('sorry we do not have such item in our market.');
        }

        let amount = 0;
        let price = 0;
        let flag = true;
        if (name.toLowerCase() === 'xp') {
            const filter = res => {
                return res.author.id === message.author.id;
            };
            await message.reply('How many xp do you want?')
                .then(async () => {
                    await message.channel.awaitMessages(filter, {
                        max: 500,
                        time: 10000,
                    })
                    .then(collected => {
                        amount = parseInt(collected.first().content);
                        if (isNaN(amount)) {
                            return message.reply('please enter a valid number for xp amount.');
                        }
                        price = amount * items[name];
                    })
                    .catch(() => {
                        return message.channel.send('you did not enter an amount');
                    });
                });
        }
        else {
            price = items[name];
            flag = false;
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
                if (money.momey < price) {
                    return message.reply('you do not have enough coins to complete the payment.');
                }

                money.money = money.money - price;
                money.save().catch(err => console.error(err));
            }
        });

        if (!flag) {
            const roles = message.member.roles;
            const role = message.guild.roles.find(role => role.name.toLowerCase() === name.toLowerCase());
            if (roles.has(role.id)) {
                return message.reply('you already purchased this role');
            }
            await message.member.addRole(role);
            return message.reply(`you now have the role of ${role.name}, congratulations!`);
        }

        con.query(`SELECT * FROM xp WHERE id = ${message.author.id}`, (err, rows) => {
            if (err) {
                throw err;
            }

            let sql;
            let newXP;

            if(rows.length < 1) {
                sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', amount)`;
            }
            else {
                const xp = rows[0].xp;
                newXP = xp + amount;
                sql = `UPDATE xp SET xp = ${newXP} WHERE id = '${message.author.id}'`;
            }

            con.query(sql, message.reply(`you have successfully purchased ${amount}xp.`));

            if (message.guild) {
                const VIProle = message.guild.roles.find(role => role.name === 'VIP');

                if (VIProle) {
                    utility.checkRole(newXP, VIProle, message, config);
                }
            }
            
            return 0;
        });
    },
};