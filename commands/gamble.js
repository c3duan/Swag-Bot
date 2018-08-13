const Discord = require('discord.js');

exports.module = {
    name: 'gamble',
    description: 'gamble a certain amount of xp/coins, if might lost all of it or win extra',
    usage: '[xp/coin amount]',
    execute(client, api, config, message, args, con) {
        if (!args) {
            return message.reply(` please use ${config.prefix}${this.name} ${this.usage}: ${this.description}`);
        }

        let amount = parseInt(args[0]);

        if (!amount) {
            return message.reply(' please enter a valid number for the amount of xp/coin you want to gamble.');
        }

        let result = ((Math.floor(Math.random() * 2.5 + 0) * Math.floor(amount)));

        con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
            if (err) {
                throw err;
            }

            let sql;
            let level;
            let newXP;

            if(rows.length < 1) {
                sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${amount})`;
            }
            else {
                let xp = rows[0].xp;
                newXP = xp - amount + result;
                sql = `UPDATE xp SET xp = ${newXP} WHERE id = '${message.author.id}'`;
            }

            con.query(sql);
            
            if (result === amount) {
                message.reply(' have your captial back with no profit.');
            }
            else if (result > amount) {
                message.reply(` have gained a profit of ${result - amount} xp, congrats!`);
            }
            else {
                message. reply(` RIP, you have lost ${amount - result}`);
            }
 
            let VIProle = message.guild.roles.find(role => role.name === 'VIP');
            let user = message.member;

            if (newXP >= config.VIP * config.levelXP && !user.roles.has(VIProle.id)) {
                console.log('In here');
                user.addRole(VIProle);

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