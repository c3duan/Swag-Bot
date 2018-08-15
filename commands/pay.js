const Discord = require('discord.js');

module.exports = {
    name: 'pay',
    description: 'user uses its xp as coins to pay another user for various reason',
    usage: '[recipient] [payment amount] [reason]',
    execute(client, api, config, message, args, con, guilds) {

        let recipient = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!recipient) {
            return message.reply('Please specifiy who you want tp pay!');
        }

        let amount = parseInt(args[1]);

        if (!amount) {
            return message.reply('Please provide a valid number for payment amount!');
        }

        let reason = args.slice(2).join(' ');
        console.log(reason);

        if (!reason) {
            return message.reply('Please give a reason for this payment');
        }

        con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
            if (err) {
                throw err;
            }

            let sql;

            if(rows.length < 1) {
                return message.reply('You don\'t have any xp, gain xp by being active in the server!');
            }
            else {
                let xp = rows[0].xp;
             
                if (amount > xp) {
                    return message.reply('You don\'t have enough xp to complete the payment!');
                }

                sql = `UPDATE xp SET xp = ${xp - amount} WHERE id = '${message.author.id}'`;
            }

            con.query(sql);

        });

        con.query(`SELECT * FROM xp WHERE id = '${recipient.id}'`, (err, rows) => {
            if (err) {
                throw err;
            }

            let sql;
            let level;
            let newXP;

            if(rows.length < 1) {
                sql = `INSERT INTO xp (id, xp) VALUES ('${recipient.id}', ${amount})`;
            }
            else {
                let xp = rows[0].xp;
                newXP = xp + amount;
                sql = `UPDATE xp SET xp = ${newXP} WHERE id = '${recipient.id}'`;
            }

            con.query(sql);
            
            let payEmbed = new Discord.RichEmbed()
                .setTitle(':money_with_wings: **Transcation Details**')
                .addField('Recipient', recipient)
                .addField('Payer', message.guild.members.get(message.author.id))
                .addField('Payemnt Amount', amount)
                .addField('Payment Reason', reason)
                .setTimestamp(new Date())
                .setFooter('XP Payment');

            message.channel.send(payEmbed);
 
            let VIProle = message.guild.roles.find(role => role.name === 'VIP');

            if (newXP >= config.VIP * config.levelXP && !recipient.roles.has(VIProle.id)) {
                console.log('In here');
                recipient.addRole(VIProle);

                let VIPembed = new Discord.RichEmbed()
                    .setTitle('**Congratulations**, you are offically a **VIP**!!!')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
                    .setDescription('VIP are granted extra permission to manage some parts of the server.')
                    .setThumbnail(`${message.author.displayAvatarURL}`)
                    .addField('XP', newXP, true)
                    .addField('Level', level, true)
                    .addField('New Role', 'VIP', true)
                    .setTimestamp(new Date())
                    .setFooter('VIP Announcement');

                message.channel.send(VIPembed);
            }
        });
    },
};